import { NextResponse } from 'next/server';
import { PrismaClient, item_tran_history_status, fines_status } from '@/generated/prisma';
import { withRoleAuth } from '@/app/utils/authMiddleware';

const prisma = new PrismaClient();

export const GET = withRoleAuth(['patron'])(async (req) => {
    try {
        if (!req.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = req.user.userId;

        // Basic stats
        const [itemsRead, currentlyBorrowed, favorites, finesAggregate] = await Promise.all([
            prisma.item_tran_history.count({
                where: {
                    requested_by: userId,
                    status: item_tran_history_status.returned,
                    date_issued: { not: null },
                },
            }),
            prisma.item_tran_history.count({
                where: { requested_by: userId, status: item_tran_history_status.issued },
            }),
            prisma.user_wishlist.count({
                where: { user_id: userId },
            }),
            prisma.fines.aggregate({
                where: { user_id: userId },
                _sum: { amount: true },
            }),
        ]);

        // Paid vs unpaid
        const paid = await prisma.fines.aggregate({
            where: { user_id: userId, status: fines_status.paid },
            _sum: { amount: true },
        });
        const unpaid = await prisma.fines.aggregate({
            where: { user_id: userId, status: fines_status.unpaid },
            _sum: { amount: true },
        });

        return NextResponse.json({
            itemsRead: itemsRead || 0,
            currentlyBorrowed: currentlyBorrowed || 0,
            favorites: favorites || 0,
            totalFines: finesAggregate._sum.amount || 0,
            totalPaid: paid._sum.amount || 0,
            totalUnpaid: unpaid._sum.amount || 0,
        });
    } catch (error) {
        console.error('[STATS_API_ERROR]', error);
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
});
