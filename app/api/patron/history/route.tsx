import { NextResponse } from 'next/server';
import { withRoleAuth } from '@/app/utils/authMiddleware';
import { PrismaClient } from '@/generated/prisma';

export const GET = withRoleAuth(['patron'])(async (req) => {
    const prisma = new PrismaClient();
    try {
        const userId = req.user!.userId;

        const borrowHistory = await prisma.item_tran_history.findMany({
            where: {
                requested_by: userId
            },
            include: {
                library_items: {
                    select: {
                        item_id: true,
                        title: true,
                        author: true,
                        item_type: true,
                        image_url: true,
                        location: true
                    }
                },
                users_item_tran_history_approved_byTousers: {
                    select: {
                        name: true,
                        email: true
                    }
                },
                fines:true
            },
            orderBy: {
                requested_at: 'desc'
            }
        });

        const formattedHistory = borrowHistory.map(history => ({
            id: history.id,
            item: {
                item_id: history.library_items?.item_id,
                title: history.library_items?.title,
                author: history.library_items?.author,
                item_type: history.library_items?.item_type,
                image_url: history.library_items?.image_url,
                location: history.library_items?.location
            },
            status: history.status,
            requested_at: history.requested_at,
            approved_at: history.approved_at,
            date_issued: history.date_issued,
            date_due: history.date_due,
            date_returned: history.date_returned,
            approved_by: history.users_item_tran_history_approved_byTousers ? {
                name: history.users_item_tran_history_approved_byTousers.name,
                email: history.users_item_tran_history_approved_byTousers.email
            } : null,
            remarks: history.remarks
        }));

        return NextResponse.json({ success: true, borrowHistory: formattedHistory });
    } catch (error) {
        console.error('Error fetching borrow history:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to fetch borrow history',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
});
