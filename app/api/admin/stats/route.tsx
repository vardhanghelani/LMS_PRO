import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import {
    subMonths,
    startOfMonth,
    endOfMonth,
    subDays,
    startOfDay,
    endOfDay,
} from 'date-fns';

export async function GET() {
    const prisma = new PrismaClient();

    try {
        const now = new Date();

        // ========== EXISTING METRICS (Item-Focused) ==========
        const monthlyActivity: Array<{
            label: string;
            issued: number;
            returned: number;
            pending: number;
            newPatrons: number;
            newLibrarians: number;
            finesCollected: number;
        }> = [];

        for (let i = 5; i >= 0; i--) {
            const monthStart = startOfMonth(subMonths(now, i));
            const monthEnd = endOfMonth(subMonths(now, i));
            const label = monthStart.toLocaleString('default', {
                month: 'short',
                year: 'numeric',
            });

            const [
                issued,
                returned,
                pending,
                newPatrons,
                newLibrarians,
                finesCollected,
            ] = await Promise.all([
                prisma.item_tran_history.count({
                    where: { status: 'issued', date_issued: { gte: monthStart, lte: monthEnd } },
                }),
                prisma.item_tran_history.count({
                    where: { status: 'returned', date_returned: { gte: monthStart, lte: monthEnd } },
                }),
                prisma.item_tran_history.count({
                    where: { status: 'pending', requested_at: { gte: monthStart, lte: monthEnd } },
                }),
                prisma.users.count({
                    where: { role: 'patron', created_at: { gte: monthStart, lte: monthEnd } },
                }),
                prisma.users.count({
                    where: { role: 'librarian', created_at: { gte: monthStart, lte: monthEnd } },
                }),
                prisma.fines
                    .aggregate({
                        where: {
                            status: 'paid',
                            paid_at: { gte: monthStart, lte: monthEnd },
                        },
                        _sum: { amount: true },
                    })
                    .then((res) => res._sum.amount || 0),
            ]);

            monthlyActivity.push({
                label,
                issued,
                returned,
                pending,
                newPatrons,
                newLibrarians,
                finesCollected: Number(finesCollected),
            });
        }

        // Top 5 most borrowed items
        const topItems = await prisma.item_tran_history.groupBy({
            by: ['item_id'],
            _count: { item_id: true },
            orderBy: { _count: { item_id: 'desc' } },
            take: 5,
        });
        const topItemDetails = await prisma.library_items.findMany({
            where: { item_id: { in: topItems.map((b) => b.item_id!) } },
            select: { item_id: true, title: true, author: true, genre: true },
        });
        const topBorrowed = topItems.map((b) => {
            const item = topItemDetails.find((t) => t.item_id === b.item_id);
            return {
                title: item?.title || 'Unknown',
                author: item?.author || 'Unknown',
                genre: item?.genre || 'Unknown',
                count: b._count.item_id,
            };
        });

        // ========== NEW USER ANALYTICS ==========
        const [userStats, userRoleDist, mostActivePatrons] = await Promise.all([
            prisma.users.groupBy({
                by: ['status'],
                _count: { status: true },
            }),
            prisma.users.groupBy({
                by: ['role'],
                _count: { role: true },
            }),
            prisma.item_tran_history
                .groupBy({
                    by: ['requested_by'],
                    _count: { requested_by: true },
                    orderBy: { _count: { requested_by: 'desc' } },
                    take: 10,
                })
                .then(async (results) => {
                    const ids = results.map((r) => r.requested_by!);
                    const users = await prisma.users.findMany({
                        where: { user_id: { in: ids }, role: 'patron' },
                        select: { user_id: true, name: true, email: true },
                    });
                    return results
                        .map((r) => {
                            const u = users.find((u) => u.user_id === r.requested_by);
                            return {
                                name: u?.name || 'Unknown',
                                email: u?.email || 'Unknown',
                                borrowCount: r._count.requested_by,
                            };
                        })
                        .filter((u) => u.name !== 'Unknown');
                }),
        ]);

        // ========== ITEM ANALYTICS ==========
        const [genreDist, mostFavorited, availability, monthlyAdds] =
            await Promise.all([
                prisma.library_items.groupBy({
                    by: ['genre'],
                    _count: { genre: true },
                    orderBy: { _count: { genre: 'desc' } },
                }),
                prisma.user_wishlist
                    .groupBy({
                        by: ['item_id'],
                        _count: { item_id: true },
                        orderBy: { _count: { item_id: 'desc' } },
                        take: 5,
                    })
                    .then(async (res) => {
                        const ids = res.map((r) => r.item_id!);
                        const items = await prisma.library_items.findMany({
                            where: { item_id: { in: ids } },
                            select: { item_id: true, title: true, author: true },
                        });
                        return res.map((r) => {
                            const b = items.find((b) => b.item_id === r.item_id);
                            return {
                                title: b?.title || 'Unknown',
                                author: b?.author || 'Unknown',
                                favoriteCount: r._count.item_id,
                            };
                        });
                    }),
                prisma.item_tran.groupBy({
                    by: ['status'],
                    _count: { status: true },
                }),
                Promise.all(
                    Array.from({ length: 6 }, async (_, i) => {
                        const mStart = startOfMonth(subMonths(now, 5 - i));
                        const mEnd = endOfMonth(subMonths(now, 5 - i));
                        const cnt = await prisma.library_items.count({
                            where: { created_at: { gte: mStart, lte: mEnd } },
                        });
                        return {
                            month: mStart.toLocaleString('default', {
                                month: 'short',
                                year: 'numeric',
                            }),
                            count: cnt,
                        };
                    })
                ),
            ]);

        // ========== NEW FINE ANALYTICS ==========
        const [fineStats, fineReasons, topFineUsers] = await Promise.all([
            prisma.fines.groupBy({
                by: ['status'],
                _count: { status: true },
                _sum: { amount: true },
            }),
            prisma.fines.groupBy({
                by: ['reason'],
                _count: { reason: true },
                _sum: { amount: true },
                orderBy: { _count: { reason: 'desc' } },
            }),
            prisma.fines
                .groupBy({
                    by: ['user_id'],
                    where: { status: 'paid' },
                    _sum: { amount: true },
                    orderBy: { _sum: { amount: 'desc' } },
                    take: 10,
                })
                .then(async (res) => {
                    const ids = res.map((r) => r.user_id!);
                    const users = await prisma.users.findMany({
                        where: { user_id: { in: ids } },
                        select: { user_id: true, name: true, email: true },
                    });
                    return res.map((r) => {
                        const u = users.find((u) => u.user_id === r.user_id);
                        return {
                            name: u?.name || 'Unknown',
                            email: u?.email || 'Unknown',
                            totalFine: Number(r._sum.amount || 0),
                        };
                    });
                }),
        ]);

        // ========== NEW NOTIFICATION ANALYTICS ==========
        const [notifTypes, notifStatus, pendingNotifs] = await Promise.all([
            prisma.notifications.groupBy({
                by: ['type'],
                _count: { type: true },
            }),
            prisma.notifications.groupBy({
                by: ['status'],
                _count: { status: true },
            }),
            prisma.notifications.count({
                where: { status: 'pending' },
            }),
        ]);

        // ========== SYSTEM ACTIVITY ANALYTICS ==========
        const [overdueItems, weeklyActivity, recentLogs] = await Promise.all([
            prisma.item_tran_history.count({
                where: { status: 'issued', date_due: { lt: now } },
            }),
            Promise.all(
                Array.from({ length: 7 }, async (_, i) => {
                    const dStart = startOfDay(subDays(now, 6 - i));
                    const dEnd = endOfDay(subDays(now, 6 - i));
                    const [iss, ret] = await Promise.all([
                        prisma.item_tran_history.count({
                            where: { status: 'issued', date_issued: { gte: dStart, lte: dEnd } },
                        }),
                        prisma.item_tran_history.count({
                            where: { status: 'returned', date_returned: { gte: dStart, lte: dEnd } },
                        }),
                    ]);
                    return { date: dStart.toLocaleDateString(), issued: iss, returned: ret };
                })
            ),
            prisma.logs.count({
                where: { created_at: { gte: subDays(now, 7) } },
            }),
        ]);

        // ========== LIBRARIAN PERFORMANCE ==========
        const librarianStats = await prisma.item_tran_history
            .groupBy({
                by: ['approved_by'],
                where: { approved_by: { not: null } },
                _count: { approved_by: true },
                orderBy: { _count: { approved_by: 'desc' } },
            })
            .then(async (res) => {
                const ids = res.map((r) => r.approved_by!);
                const users = await prisma.users.findMany({
                    where: { user_id: { in: ids }, role: 'librarian' },
                    select: { user_id: true, name: true, email: true },
                });
                return res.map((r) => {
                    const u = users.find((u) => u.user_id === r.approved_by);
                    return {
                        name: u?.name || 'Unknown',
                        email: u?.email || 'Unknown',
                        approvalsCount: r._count.approved_by,
                    };
                });
            });

        // ========== EXISTING CALCULATIONS ==========
        const returnedRecords = await prisma.item_tran_history.findMany({
            where: { status: 'returned', date_issued: { not: null }, date_returned: { not: null } },
            select: { date_issued: true, date_returned: true },
        });
        const totalDays = returnedRecords.reduce((sum, rec) => {
            const diff = rec.date_returned!.getTime() - rec.date_issued!.getTime();
            return sum + diff / (1000 * 60 * 60 * 24);
        }, 0);
        const avgBorrowDuration = returnedRecords.length
            ? totalDays / returnedRecords.length
            : 0;

        const [
            totalItems,
            totalUsers,
            totalFineAggregate,
            activeTransactions,
        ] = await Promise.all([
            prisma.library_items.count({ where: { record_status: 'active' } }),
            prisma.users.count(),
            prisma.fines.aggregate({ _sum: { amount: true } }),
            prisma.item_tran_history.count({ where: { status: 'issued' } }),
        ]);

        // ========== RETURN RESPONSE ==========
        return NextResponse.json({
            monthlyActivity,
            topBorrowed,
            avgBorrowDuration,

            userAnalytics: {
                statusDistribution: userStats,
                roleDistribution: userRoleDist,
                mostActivePatrons,
                totalUsers,
            },

            itemAnalytics: {
                genreDistribution: genreDist,
                mostFavorited,
                availability,
                monthlyAdditions: monthlyAdds,
                totalItems,
            },

            fineManagement: {
                statusBreakdown: fineStats,
                reasonBreakdown: fineReasons,
                topFineUsers,
                totalFineCollected: Number(totalFineAggregate._sum.amount || 0),
            },

            notificationSystem: {
                typeBreakdown: notifTypes,
                statusBreakdown: notifStatus,
                pendingCount: pendingNotifs,
            },

            systemActivity: {
                overdueItems,
                weeklyActivity,
                recentLogsCount: recentLogs,
                activeTransactions,
            },

            librarianPerformance: {
                approvalStats: librarianStats,
            },
        });
    } catch (err) {
        console.error('Statistics API Error:', err);
        return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
