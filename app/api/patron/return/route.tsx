import { NextResponse } from 'next/server';
import { PrismaClient, item_tran_history_status } from '@/generated/prisma';
import { withRoleAuth } from '@/app/utils/authMiddleware';

const prisma = new PrismaClient();

export const GET = withRoleAuth(['patron'])(async (req) => {
    try {
        if (!req.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const currentlyBorrowedItems = await prisma.item_tran_history.findMany({
            where: {
                status: item_tran_history_status.issued,
                requested_by: req.user.userId,
                // Optionally filter active records only if applicable:
                // AND: { item_tran: { record_status: 'active' } }
            },
            include: {
                library_items: true,
                users_item_tran_history_requested_byTousers: {
                    select: {
                        user_id: true,
                        name: true,
                        email: true,
                    },
                },
                users_item_tran_history_approved_byTousers: {
                    select: {
                        user_id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                date_issued: 'desc',
            },
        });

        return NextResponse.json({ success: true, data: currentlyBorrowedItems });
    } catch (error) {
        console.error('Error fetching currently borrowed items:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch currently borrowed items' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
});
