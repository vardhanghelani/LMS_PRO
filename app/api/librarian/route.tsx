import { NextResponse } from 'next/server';
import { PrismaClient, item_tran_status, item_tran_history_status, record_status, notifications_type, notifications_status } from '@/generated/prisma';
import { withRoleAuth } from '@/app/utils/authMiddleware';

const prisma = new PrismaClient();

function formatDate(date: Date) {
    return date.toISOString().slice(0, 10); // YYYY-MM-DD
}

function getDateNDaysAgo(days: number) {
    const d = new Date();
    d.setDate(d.getDate() - days);
    d.setHours(0, 0, 0, 0);
    return d;
}

export const GET = withRoleAuth(['librarian'])(async (req) => {
    const userId = req.user!.userId;

    try {
        const daysBack = 30;
        const startDate = getDateNDaysAgo(daysBack);

        // Prepare labels for last 30 days
        const last30Days = Array.from({ length: daysBack }).map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (daysBack - 1 - i));
            return formatDate(d);
        });

        const [available, issued, pending, overdueCount] = await Promise.all([
            // Count available item copies managed by librarian
            prisma.item_tran.count({
                where: {
                    status: item_tran_status.available,
                    record_status: record_status.active,
                    library_items: {
                        librarian_id: userId,
                        record_status: record_status.active
                    }
                }
            }),

            // Count issued items managed by librarian
            prisma.item_tran.count({
                where: {
                    status: item_tran_status.not_available,
                    record_status: record_status.active,
                    library_items: {
                        librarian_id: userId,
                        record_status: record_status.active
                    }
                }
            }),

            // Count pending requests and returns awaiting approval
            prisma.item_tran_history.count({
                where: {
                    OR: [
                        {
                            status: item_tran_history_status.pending,
                            library_items: {
                                librarian_id: userId,
                                record_status: record_status.active
                            }
                        },
                        {
                            status: item_tran_history_status.returned,
                            library_items: {
                                librarian_id: userId,
                                record_status: record_status.active
                            },
                            approved_at: null
                        }
                    ]
                }
            }),

            // Count overdue items
            prisma.item_tran_history.count({
                where: {
                    status: item_tran_history_status.issued,
                    date_due: { lt: new Date() },
                    date_returned: null,
                    library_items: {
                        librarian_id: userId,
                        record_status: record_status.active
                    }
                }
            }),
        ]);

        // Get distinct genres for items managed by librarian
        const genresRaw = await prisma.library_items.findMany({
            where: {
                librarian_id: userId,
                genre: { not: null },
                record_status: record_status.active,
            },
            distinct: ['genre'],
            select: { genre: true },
        });

        const genres = genresRaw.map(g => g.genre);

        // Get all item transaction history IDs for items managed by librarian
        const librarianItemHistoryIdsRaw = await prisma.item_tran_history.findMany({
            where: {
                library_items: {
                    librarian_id: userId,
                    record_status: record_status.active,
                }
            },
            select: { id: true }
        });

        const librarianItemHistoryIds = librarianItemHistoryIdsRaw.map(h => h.id);

        // Aggregate fines for those history records
        const [finesUnpaidAgg, finesCollectedAgg] = await Promise.all([
            prisma.fines.aggregate({
                where: {
                    status: 'unpaid',
                    item_tran_history_id: { in: librarianItemHistoryIds },
                },
                _sum: { amount: true },
            }),
            prisma.fines.aggregate({
                where: {
                    status: 'paid',
                    paid_at: { gte: startDate },
                    item_tran_history_id: { in: librarianItemHistoryIds },
                },
                _sum: { amount: true },
            }),
        ]);

        // Top borrowed items in last 30 days
        const topBorrowedRaw = await prisma.item_tran_history.groupBy({
            by: ['item_id'],
            where: {
                library_items: {
                    librarian_id: userId,
                    record_status: record_status.active,
                },
                status: {
                    in: [item_tran_history_status.issued, item_tran_history_status.returned],
                },
                date_issued: { gte: startDate }
            },
            _count: {
                item_id: true
            },
            orderBy: {
                _count: {
                    item_id: 'desc'
                }
            },
            take: 5,
        });

        // Fetch detailed info for top borrowed items
        const topBorrowedItems = await Promise.all(topBorrowedRaw.map(async (entry) => {
            const item = await prisma.library_items.findUnique({
                where: { item_id: entry.item_id! },
                select: {
                    item_id: true,
                    title: true,
                    author: true,
                    genre: true,
                    image_url: true,
                    location: true,
                    record_status: true,
                }
            });
            return {
                item,
                borrowCount: entry._count.item_id,
            };
        }));

        // Fetch issuance and return notifications for chart data
        const notifications = await prisma.notifications.findMany({
            where: {
                from_user_id: userId,
                type: { in: [notifications_type.issue, notifications_type.return] },
                created_at: { gte: startDate },
                status: notifications_status.approved,
            },
            select: {
                type: true,
                created_at: true,
            }
        });

        const issuedCounts: Record<string, number> = {};
        const returnedCounts: Record<string, number> = {};

        last30Days.forEach(day => {
            issuedCounts[day] = 0;
            returnedCounts[day] = 0;
        });

        notifications.forEach(note => {
            const day = formatDate(note.created_at!);
            if (day in issuedCounts) {
                if (note.type === notifications_type.issue) issuedCounts[day]++;
                if (note.type === notifications_type.return) returnedCounts[day]++;
            }
        });

        // Total managed items count
        const totalItems = await prisma.library_items.count({
            where: {
                librarian_id: userId,
                record_status: record_status.active,
            }
        });

        return NextResponse.json({
            success: true,
            summary: {
                available,
                issued,
                pending,
                overdueCount,
                totalItems,
                finesUnpaid: Number(finesUnpaidAgg._sum.amount ?? 0),
                finesCollected: Number(finesCollectedAgg._sum.amount ?? 0),
            },
            genres,
            topBorrowedItems,

            chartData: {
                days: last30Days,
                issued: last30Days.map(d => issuedCounts[d]),
                returned: last30Days.map(d => returnedCounts[d]),
            }
        });

    } catch (error) {
        console.error('Dashboard API error:', error);
        return NextResponse.json({
            success: false,
            message: 'Internal Server Error',
            error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
});
