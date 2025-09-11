import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { withRoleAuth } from '@/app/utils/authMiddleware';

export const GET = withRoleAuth(['librarian'])(
    async (req) => {
        const userId = req.user!.userId;
        const prisma = new PrismaClient();

        try {
            // Find all patrons who have ever requested an item from this librarian
            const patrons = await prisma.users.findMany({
                where: {
                    item_tran_history_item_tran_history_requested_byTousers: {
                        some: {
                            library_items: {
                                librarian_id: userId,
                            },
                        },
                    },
                },
                select: {
                    user_id: true,
                    name: true,
                    email: true,
                    item_tran_history_item_tran_history_requested_byTousers: {
                        where: {
                            library_items: {
                                librarian_id: userId,
                            },
                        },
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
