// app/api/librarian/issue/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient, item_tran_history_status } from '@/generated/prisma';
import { withRoleAuth } from '@/app/utils/authMiddleware';

const prisma = new PrismaClient();

export const GET = withRoleAuth(['librarian'])(
    async (req) => {
        const userId = req.user!.userId;

        try {
            const issuedItems = await prisma.item_tran_history.findMany({
                where: {
                    status: item_tran_history_status.issued,
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
                    date_issued: 'desc',
                },
            });

            return NextResponse.json({ success: true, data: issuedItems });
        } catch (error) {
            console.error('Error fetching issued items:', error);
            return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
        } finally {
            await prisma.$disconnect();
        }
    }
);
