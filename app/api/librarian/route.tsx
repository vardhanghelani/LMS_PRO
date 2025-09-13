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
    console.log('Librarian dashboard request for user ID:', userId);

    try {
        // Test database connection first
        await prisma.$connect();
        console.log('Database connected successfully');

        const daysBack = 30;
        const startDate = getDateNDaysAgo(daysBack);
        console.log('Fetching data from:', startDate);

        // Prepare labels for last 30 days
        const last30Days = Array.from({ length: daysBack }).map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (daysBack - 1 - i));
            return formatDate(d);
        });
        console.log('Last 30 days range:', last30Days[0], 'to', last30Days[last30Days.length - 1]);

        console.log('Starting main queries...');
        
        // Try each query individually with error handling
        let available = 0;
        let issued = 0;
        let pending = 0;
        let overdueCount = 0;
        
        try {
            console.log('Querying available items...');
            available = await prisma.item_tran.count({
                where: {
                    status: item_tran_status.available,
                    record_status: record_status.active,
                    library_items: {
                        record_status: record_status.active
                    }
                }
            });
            console.log('Available items count:', available);
        } catch (error) {
            console.error('Error querying available items:', error);
        }

        try {
            console.log('Querying issued items...');
            issued = await prisma.item_tran.count({
                where: {
                    status: item_tran_status.not_available,
                    record_status: record_status.active,
                    library_items: {
                        record_status: record_status.active
                    }
                }
            });
            console.log('Issued items count:', issued);
        } catch (error) {
            console.error('Error querying issued items:', error);
        }

        try {
            console.log('Querying pending requests...');
            pending = await prisma.item_tran_history.count({
                where: {
                    OR: [
                        {
                            status: item_tran_history_status.pending,
                            library_items: {
                                record_status: record_status.active
                            }
                        },
                        {
                            status: item_tran_history_status.returned,
                            library_items: {
                                record_status: record_status.active
                            },
                            approved_at: null
                        }
                    ]
                }
            });
            console.log('Pending requests count:', pending);
        } catch (error) {
            console.error('Error querying pending requests:', error);
        }

        try {
            console.log('Querying overdue items...');
            overdueCount = await prisma.item_tran_history.count({
                where: {
                    status: item_tran_history_status.issued,
                    date_due: { lt: new Date() },
                    date_returned: null,
                    library_items: {
                        record_status: record_status.active
                    }
                }
            });
            console.log('Overdue items count:', overdueCount);
        } catch (error) {
            console.error('Error querying overdue items:', error);
        }

        // Get distinct genres for items managed by librarian
        let genres: string[] = [];
        try {
            console.log('Querying genres...');
            const genresRaw = await prisma.library_items.findMany({
                where: {
                    genre: { not: null },
                    record_status: record_status.active,
                },
                distinct: ['genre'],
                select: { genre: true },
            });
            genres = genresRaw.map(g => g.genre).filter(Boolean) as string[];
            console.log('Found genres:', genres);
        } catch (error) {
            console.error('Error querying genres:', error);
        }

        // Initialize fines data with fallbacks
        let finesUnpaid = 0;
        let finesCollected = 0;
        
        try {
            console.log('Querying fines data...');
            // Get all item transaction history IDs
            const itemHistoryIdsRaw = await prisma.item_tran_history.findMany({
                where: {
                    library_items: {
                        record_status: record_status.active,
                    }
                },
                select: { id: true }
            });

            const itemHistoryIds = itemHistoryIdsRaw.map(h => h.id);
            console.log('Found history IDs count:', itemHistoryIds.length);

            if (itemHistoryIds.length > 0) {
                // Aggregate fines for those history records
                const finesUnpaidAgg = await prisma.fines.aggregate({
                    where: {
                        status: 'unpaid',
                        item_tran_historyId: { in: itemHistoryIds },
                    },
                    _sum: { amount: true },
                });
                
                const finesCollectedAgg = await prisma.fines.aggregate({
                    where: {
                        status: 'paid',
                        paid_at: { gte: startDate },
                        item_tran_historyId: { in: itemHistoryIds },
                    },
                    _sum: { amount: true },
                });
                
                finesUnpaid = Number(finesUnpaidAgg._sum.amount ?? 0);
                finesCollected = Number(finesCollectedAgg._sum.amount ?? 0);
            }
            
            console.log('Fines - Unpaid:', finesUnpaid, 'Collected:', finesCollected);
        } catch (error) {
            console.error('Error querying fines:', error);
        }

        // Top borrowed items in last 30 days
        let topBorrowedItems: any[] = [];
        try {
            console.log('Querying top borrowed items...');
            
            // Get all item transaction history
            const itemHistory = await prisma.item_tran_history.findMany({
                where: {
                    library_items: {
                        record_status: record_status.active,
                    },
                    status: {
                        in: [item_tran_history_status.issued, item_tran_history_status.returned],
                    },
                    date_issued: { gte: startDate }
                },
                select: {
                    item_id: true,
                    library_items: {
                        select: {
                            item_id: true,
                            title: true,
                            author: true,
                            genre: true,
                            image_url: true,
                            location: true,
                            record_status: true,
                        }
                    }
                }
            });
            
            console.log('Found item history records:', itemHistory.length);

            // Group by item_id and count occurrences
            const itemCounts: Record<number, { count: number; item: any }> = {};
            
            itemHistory.forEach(record => {
                if (record.item_id && record.library_items) {
                    if (!itemCounts[record.item_id]) {
                        itemCounts[record.item_id] = {
                            count: 0,
                            item: record.library_items
                        };
                    }
                    itemCounts[record.item_id].count++;
                }
            });

            // Convert to array and sort by count
            topBorrowedItems = Object.entries(itemCounts)
                .map(([itemId, data]) => ({
                    item: data.item,
                    borrowCount: data.count,
                }))
                .sort((a, b) => b.borrowCount - a.borrowCount)
                .slice(0, 10); // Take top 10
            
            console.log('Top borrowed items processed:', topBorrowedItems.length);
            console.log('Sample item:', topBorrowedItems[0]);
        } catch (error) {
            console.error('Error querying top borrowed items:', error);
            console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
        }

        // Initialize chart data
        const issuedCounts: Record<string, number> = {};
        const returnedCounts: Record<string, number> = {};

        last30Days.forEach(day => {
            issuedCounts[day] = 0;
            returnedCounts[day] = 0;
        });

        try {
            console.log('Querying notifications for chart data...');
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

            console.log('Found notifications for chart:', notifications.length);

            notifications.forEach(note => {
                if (note.created_at) {
                    const day = formatDate(note.created_at);
                    if (day in issuedCounts) {
                        if (note.type === notifications_type.issue) issuedCounts[day]++;
                        if (note.type === notifications_type.return) returnedCounts[day]++;
                    }
                }
            });
        } catch (error) {
            console.error('Error querying notifications:', error);
        }

        // Total managed items count
        let totalItems = 0;
        try {
            console.log('Querying total items...');
            totalItems = await prisma.library_items.count({
                where: {
                    record_status: record_status.active,
                }
            });
            console.log('Total items:', totalItems);
        } catch (error) {
            console.error('Error querying total items:', error);
        }

        console.log('Preparing response...');
        const responseData = {
            success: true,
            summary: {
                available,
                issued,
                pending,
                overdueCount,
                totalItems,
                finesUnpaid,
                finesCollected,
            },
            genres,
            topBorrowedItems,
            chartData: {
                days: last30Days,
                issued: last30Days.map(d => issuedCounts[d]),
                returned: last30Days.map(d => returnedCounts[d]),
            }
        };
        
        console.log('Response prepared successfully');
        return NextResponse.json(responseData);

    } catch (error) {
        console.error('Dashboard API error:', error);
        console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
        
        // More detailed error logging
        if (error instanceof Error) {
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
        }
        
        return NextResponse.json({
            success: false,
            message: 'Internal Server Error',
            error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            stack: process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined,
        }, { status: 500 });
    } finally {
        try {
            await prisma.$disconnect();
        } catch (disconnectError) {
            console.error('Error disconnecting from database:', disconnectError);
        }
    }
});
