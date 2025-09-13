import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { withRoleAuth } from '@/app/utils/authMiddleware';

export const GET = withRoleAuth(['librarian'])(
    async (req) => {
        const userId = req.user!.userId;
        const prisma = new PrismaClient();

        try {
            // Find all patrons who have role 'patron'
            const patrons = await prisma.users.findMany({
                where: {
                    role: 'patron',
                },
                select: {
                    user_id: true,
                    name: true,
                    email: true,
                    item_tran_history_item_tran_history_requested_byTousers: {
                        select: { id: true },
                    },
                },
            });

            const formatted = patrons.map((patron) => ({
                user_id: patron.user_id,
                name: patron.name ?? '',
                email: patron.email ?? '',
                itemsRequested: patron.item_tran_history_item_tran_history_requested_byTousers.length,
            }));

            return NextResponse.json({ success: true, data: formatted });
        } catch (error) {
            console.error("Error fetching patrons:", error);
            return NextResponse.json(
                { success: false, message: 'Failed to fetch patrons', error: (error as Error).message },
                { status: 500 }
            );
        } finally {
            await prisma.$disconnect();
        }
    }
);
