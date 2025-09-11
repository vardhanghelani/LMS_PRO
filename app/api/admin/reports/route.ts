import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { withRoleAuth } from '@/app/utils/authMiddleware';

const prisma = new PrismaClient();

export const GET = withRoleAuth(['admin'])(async (req) => {
    try {
        const url = new URL(req.url);
        const reportType = url.searchParams.get('type') || 'overview';
        const startDate = url.searchParams.get('startDate');
        const endDate = url.searchParams.get('endDate');

        let dateFilter: any = {};
        if (startDate && endDate) {
            dateFilter = {
                gte: new Date(startDate),
                lte: new Date(endDate)
            };
        }

        switch (reportType) {
            case 'overview':
                return await getOverviewReport(dateFilter);
            case 'popular_items':
                return await getPopularItemsReport(dateFilter);
            case 'overdue_items':
                return await getOverdueItemsReport();
            case 'user_statistics':
                return await getUserStatisticsReport();
            case 'circulation_stats':
                return await getCirculationStatsReport(dateFilter);
            case 'fine_statistics':
                return await getFineStatisticsReport(dateFilter);
            case 'item_type_distribution':
                return await getItemTypeDistributionReport();
            default:
                return NextResponse.json(
                    { success: false, message: 'Invalid report type' },
                    { status: 400 }
                );
        }
    } catch (error) {
        console.error('Error generating report:', error);
        return NextResponse.json({ 
            success: false, 
            message: 'Failed to generate report',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
});

async function getOverviewReport(dateFilter: any) {
    const [
        totalItems,
        totalBooks,
        totalUsers,
        totalLibrarians,
        totalAdmins,
        activeReservations,
        overdueItems,
        totalFines,
        paidFines,
        unpaidFines
    ] = await Promise.all([
        prisma.library_items.count({ where: { record_status: 'active' } }),
        prisma.books.count({ where: { record_status: 'active' } }),
        prisma.users.count({ where: { role: 'patron', status: 'active' } }),
        prisma.users.count({ where: { role: 'librarian', status: 'active' } }),
        prisma.users.count({ where: { role: 'admin', status: 'active' } }),
        prisma.reservations.count({ where: { status: { in: ['pending', 'active'] } } }),
        prisma.item_tran_history.count({ 
            where: { 
                status: 'issued',
                date_due: { lt: new Date() },
                date_returned: null
            } 
        }),
        prisma.fines.aggregate({
            _sum: { amount: true },
            _count: { fine_id: true }
        }),
        prisma.fines.aggregate({
            where: { status: 'paid' },
            _sum: { amount: true },
            _count: { fine_id: true }
        }),
        prisma.fines.aggregate({
            where: { status: 'unpaid' },
            _sum: { amount: true },
            _count: { fine_id: true }
        })
    ]);

    return NextResponse.json({
        success: true,
        report: {
            overview: {
                totalItems: totalItems + totalBooks,
                totalBooks,
                totalLibraryItems: totalItems,
                totalUsers,
                totalLibrarians,
                totalAdmins,
                activeReservations,
                overdueItems,
                totalFines: totalFines._sum.amount || 0,
                totalFineCount: totalFines._count.fine_id,
                paidFines: paidFines._sum.amount || 0,
                paidFineCount: paidFines._count.fine_id,
                unpaidFines: unpaidFines._sum.amount || 0,
                unpaidFineCount: unpaidFines._count.fine_id
            }
        }
    });
}

async function getPopularItemsReport(dateFilter: any) {
    const popularItems = await prisma.library_items.findMany({
        include: {
            item_tran_history: {
                where: dateFilter.created_at ? { requested_at: dateFilter } : {},
                select: { id: true }
            }
        },
        orderBy: {
            item_tran_history: {
                _count: 'desc'
            }
        },
        take: 20
    });

    const formattedItems = popularItems.map(item => ({
        item_id: item.item_id,
        title: item.title,
        author: item.author,
        item_type: item.item_type,
        borrowCount: item.item_tran_history.length,
        image_url: item.image_url
    }));

    return NextResponse.json({
        success: true,
        report: {
            popularItems: formattedItems
        }
    });
}

async function getOverdueItemsReport() {
    const overdueItems = await prisma.item_tran_history.findMany({
        where: {
            status: 'issued',
            date_due: { lt: new Date() },
            date_returned: null
        },
        include: {
            library_items: {
                select: {
                    item_id: true,
                    title: true,
                    author: true,
                    item_type: true
                }
            },
            users_item_tran_history_requested_byTousers: {
                select: {
                    user_id: true,
                    name: true,
                    email: true,
                    phone_number: true
                }
            }
        },
        orderBy: {
            date_due: 'asc'
        }
    });

    const formattedOverdueItems = overdueItems.map(item => ({
        history_id: item.id,
        item: {
            item_id: item.library_items?.item_id,
            title: item.library_items?.title,
            author: item.library_items?.author,
            item_type: item.library_items?.item_type
        },
        user: {
            user_id: item.users_item_tran_history_requested_byTousers?.user_id,
            name: item.users_item_tran_history_requested_byTousers?.name,
            email: item.users_item_tran_history_requested_byTousers?.email,
            phone_number: item.users_item_tran_history_requested_byTousers?.phone_number
        },
        date_issued: item.date_issued,
        date_due: item.date_due,
        daysOverdue: Math.ceil((new Date().getTime() - new Date(item.date_due!).getTime()) / (1000 * 60 * 60 * 24))
    }));

    return NextResponse.json({
        success: true,
        report: {
            overdueItems: formattedOverdueItems
        }
    });
}

async function getUserStatisticsReport() {
    const userStats = await prisma.users.groupBy({
        by: ['role', 'status'],
        _count: {
            user_id: true
        }
    });

    const formattedStats = userStats.reduce((acc, stat) => {
        if (!acc[stat.role!]) {
            acc[stat.role!] = { active: 0, banned: 0 };
        }
        acc[stat.role!][stat.status!] = stat._count.user_id;
        return acc;
    }, {} as any);

    return NextResponse.json({
        success: true,
        report: {
            userStatistics: formattedStats
        }
    });
}

async function getCirculationStatsReport(dateFilter: any) {
    const circulationStats = await prisma.item_tran_history.groupBy({
        by: ['status'],
        where: dateFilter.created_at ? { requested_at: dateFilter } : {},
        _count: {
            id: true
        }
    });

    const formattedStats = circulationStats.reduce((acc, stat) => {
        acc[stat.status] = stat._count.id;
        return acc;
    }, {} as any);

    return NextResponse.json({
        success: true,
        report: {
            circulationStatistics: formattedStats
        }
    });
}

async function getFineStatisticsReport(dateFilter: any) {
    const fineStats = await prisma.fines.groupBy({
        by: ['status'],
        where: dateFilter.created_at ? { created_at: dateFilter } : {},
        _sum: {
            amount: true
        },
        _count: {
            fine_id: true
        }
    });

    const formattedStats = fineStats.reduce((acc, stat) => {
        acc[stat.status!] = {
            count: stat._count.fine_id,
            totalAmount: stat._sum.amount || 0
        };
        return acc;
    }, {} as any);

    return NextResponse.json({
        success: true,
        report: {
            fineStatistics: formattedStats
        }
    });
}

async function getItemTypeDistributionReport() {
    const itemTypeStats = await prisma.library_items.groupBy({
        by: ['item_type'],
        where: { record_status: 'active' },
        _count: {
            item_id: true
        }
    });

    const formattedStats = itemTypeStats.map(stat => ({
        item_type: stat.item_type,
        count: stat._count.item_id
    }));

    return NextResponse.json({
        success: true,
        report: {
            itemTypeDistribution: formattedStats
        }
    });
}
