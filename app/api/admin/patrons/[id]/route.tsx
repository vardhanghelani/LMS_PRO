import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const userId = parseInt(id);
    const prisma = new PrismaClient();

    if (isNaN(userId)) {
        return NextResponse.json({ success: false, message: 'Invalid user ID' }, { status: 400 });
    }

    try {
        const user = await prisma.users.findUnique({
            where: { user_id: userId },
            include: {
                item_tran: {
                    include: {
                        library_items: true,
                        item_tran_history: true,
                        // Please do not include `notifications` here, it's not valid on item_tran
                    },
                },
                item_tran_history_item_tran_history_requested_byTousers: {
                    include: {
                        library_items: true,
                        item_tran: true,
                        fines: true,
                    },
                },
                item_tran_history_item_tran_history_approved_byTousers: true,
                fines: true,
                logs: true,
                user_wishlist: {
                    include: {
                        library_items: true,
                    },
                },
                notifications_notifications_from_user_idTousers: true,
                notifications_notifications_to_user_idTousers: true,
            },
        });


        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        if (user.role !== 'patron') {
            return NextResponse.json({ success: false, message: 'Only patron details can be accessed' }, { status: 403 });
        }

        const totalIssued = await prisma.item_tran_history.count({
            where: {
                requested_by: userId,
                status: 'issued',
            },
        });

        const totalReturned = await prisma.item_tran_history.count({
            where: {
                requested_by: userId,
                status: 'returned',
            },
        });

        const totalFines = await prisma.fines.aggregate({
            where: {
                user_id: userId,
            },
            _sum: {
                amount: true,
            },
        });

        const currentIssuedItems = await prisma.item_tran_history.findMany({
            where: {
                requested_by: userId,
                status: 'issued',
                date_returned: null,
            },
            include: {
                library_items: true,
            },
        });

        const response = {
            ...user,
            stats: {
                totalIssued,
                totalReturned,
                totalFines: totalFines._sum.amount || 0,
                currentIssuedItems,
            },
        };

        return NextResponse.json({ success: true, user: response });
    } catch (error) {
        console.error('Error fetching patron details:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
