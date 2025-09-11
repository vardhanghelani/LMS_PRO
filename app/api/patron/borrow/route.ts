import { NextResponse } from 'next/server';
import { PrismaClient, item_tran_status, item_tran_history_status } from '@/generated/prisma';
import { withRoleAuth } from '@/app/utils/authMiddleware';

const prisma = new PrismaClient();

export const POST = withRoleAuth(['patron'])(async (req) => {
    try {
        const userId = req.user!.userId;
        const userEmail = req.user!.email;
        const body = await req.json();

        const { item_id } = body;

        if (!item_id) {
            return NextResponse.json(
                { success: false, message: 'Item ID is required' },
                { status: 400 }
            );
        }

        // Check if item exists and is available
        const item = await prisma.library_items.findFirst({
            where: {
                item_id: parseInt(item_id),
                record_status: 'active'
            },
            include: {
                item_tran: {
                    where: {
                        status: item_tran_status.available,
                        record_status: 'active'
                    }
                }
            }
        });

        if (!item) {
            return NextResponse.json(
                { success: false, message: 'Item not found' },
                { status: 404 }
            );
        }

        if (item.item_tran.length === 0) {
            return NextResponse.json(
                { success: false, message: 'No copies of this item are currently available' },
                { status: 400 }
            );
        }

        const unpaidFine = await prisma.fines.findFirst({
            where: { user_id: userId, status: 'unpaid' }
            });
            if (unpaidFine) {
            return NextResponse.json(
                { success: false, message: 'You have unpaid fines. Please clear them before borrowing.' },
                { status: 403 }
            );
        }

        // Check if user already has an active borrow request for this item
        const existingBorrowRequest = await prisma.item_tran_history.findFirst({
            where: {
                item_id: parseInt(item_id),
                requested_by: userId,
                status: {
                    in: [item_tran_history_status.pending, item_tran_history_status.issued]
                }
            }
        });

        if (existingBorrowRequest) {
            return NextResponse.json(
                { success: false, message: 'You already have an active borrow request for this item' },
                { status: 409 }
            );
        }

        const maxBorrowDaysConfig = await prisma.system_config.findUnique({ where: { config_key: 'max_borrow_days' } });
        const maxBorrowDays = maxBorrowDaysConfig ? parseInt(maxBorrowDaysConfig.config_value) : 10;

        const reservationExpiryConfig = await prisma.system_config.findUnique({ where: { config_key: 'reservation_expiry_days' } });
        const reservationExpiryDays = reservationExpiryConfig ? parseInt(reservationExpiryConfig.config_value) : 3;

        const maxReservationsConfig = await prisma.system_config.findUnique({ where: { config_key: 'max_reservations_per_user' } });
        const maxReservationsPerUser = maxReservationsConfig ? parseInt(maxReservationsConfig.config_value) : 5;

        // Check user's current active reservations
        const activeReservationsCount = await prisma.item_tran_history.count({
        where: {
            requested_by: userId,
            status: { in: [item_tran_history_status.pending, item_tran_history_status.issued] }
        }
        });
        if (activeReservationsCount >= maxReservationsPerUser) {
        return NextResponse.json(
            { success: false, message: 'You have reached the maximum allowed active reservations.' },
            { status: 409 }
        );
        }


        // Get the first available copy
        const availableCopy = item.item_tran[0];

        // Create a borrow request in item_tran_history
        const borrowRequest = await prisma.$transaction(async (tx) => {
            // Create the borrow history record
            const history = await tx.item_tran_history.create({
                data: {
                    item_id: parseInt(item_id),
                    tran_id: availableCopy.tran_id,
                    status: item_tran_history_status.pending,
                    requested_by: userId,
                    requested_at: new Date(),
                    remarks: 'Borrow request initiated by patron'
                }
            });

            // Update the item_tran status to reserved
            await tx.item_tran.update({
                where: { tran_id: availableCopy.tran_id },
                data: { status: item_tran_status.reserved, user_id: userId }
            });

            // Create notification for librarian
            await tx.notifications.create({
                data: {
                    type: 'issue',
                    item_id: parseInt(item_id),
                    from_user_id: userId,
                    to_user_id: item.librarian_id,
                    // Remove tran_id field as it's not related to item_tran
                    status: 'pending',
                    message: `Patron ${userEmail} has requested to borrow "${item.title}"`
                }
            });

            return history;
        });

        // Create log entry
        await prisma.logs.create({
            data: {
                description: `Patron (${userEmail}) requested to borrow ${item.item_type} "${item.title}"`,
                user_id: userId,
            },
        });

        return NextResponse.json({
            success: true,
            message: 'Borrow request submitted successfully',
            borrowRequest: {
                id: borrowRequest.id,
                status: borrowRequest.status,
                requested_at: borrowRequest.requested_at,
                item: {
                    item_id: item.item_id,
                    title: item.title,
                    author: item.author,
                    item_type: item.item_type
                }
            }
        });

    } catch (error) {
        console.error('Error creating borrow request:', error);
        return NextResponse.json({ 
            success: false, 
            message: 'Failed to create borrow request',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
});