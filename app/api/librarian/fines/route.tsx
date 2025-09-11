import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { withRoleAuth } from '@/app/utils/authMiddleware';

const prisma = new PrismaClient();

export const GET = withRoleAuth(['librarian'])(
    async (req) => {
        const userId = req.user!.userId;

        try {
            const fines = await prisma.fines.findMany({
                where:
                {
                    item_tran_history: {
                        library_items: {
                            librarian_id: userId,
                        },
                    },
                },
                include: {
                    users: true,
                    item_tran_history: {
                        include: {
                            library_items: true,
                        },
                    },
                },
                orderBy: {
                    created_at: 'desc',
                },
            });

            const formattedFines = fines.map((fine) => {
                const dateDue = fine.item_tran_history?.date_due || null;
                const dateReturned = fine.item_tran_history?.date_returned || null;

                return {
                    fine_id: fine.fine_id,
                    user: fine.users?.name || null,
                    book: fine.item_tran_history?.library_items?.title || null,
                    amount: fine.amount,
                    reason: fine.reason,
                    status: fine.status,
                    date_due: dateDue,
                    date_returned: dateReturned,
                    created_at: fine.created_at,
                    paid_at: fine.paid_at,
                };
            });

            return NextResponse.json({ success: true, data: formattedFines });
        } catch (error) {
            console.error('Error fetching fines:', error);
            return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
        } finally {
            await prisma.$disconnect();
        }
    }
);
