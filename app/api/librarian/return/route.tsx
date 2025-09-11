// app/api/librarian/return/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient, item_tran_history_status } from '@/generated/prisma';
import { withRoleAuth } from '@/app/utils/authMiddleware';

const prisma = new PrismaClient();

export const GET = withRoleAuth(['librarian'])(
    async (req) => {
        const userId = req.user!.userId;

        try {
            const returnedItems = await prisma.item_tran_history.findMany({
                where: {
                    status: item_tran_history_status.returned,
                    library_items: {
                        librarian_id: userId,
                    },
                },
                include: {
                    library_items: true,
                    users_item_tran_history_requested_byTousers: true,
                    users_item_tran_history_approved_byTousers: true,
                },
                orderBy: {
                    date_returned: 'desc',
                },
            });

            return NextResponse.json({ success: true, data: returnedItems });
        } catch (error) {
            console.error('Error fetching returned items:', error);
            return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
        } finally {
            await prisma.$disconnect();
        }
    }
);
