import { NextResponse } from 'next/server';
import { PrismaClient, item_tran_history_status, record_status } from '@/generated/prisma';
import { withRoleAuth } from '@/app/utils/authMiddleware';

const prisma = new PrismaClient();

export const POST = withRoleAuth(['patron'])(async (req) => {
    const { user } = req;

    let existingTransaction: any;

    try {
        if (!user) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const url = new URL(req.url);
        const pathParts = url.pathname.split('/');
        const tranId = parseInt(pathParts[pathParts.length - 1], 10);

        if (isNaN(tranId)) {
            return NextResponse.json({ success: false, error: 'Invalid transaction ID' }, { status: 400 });
        }

        existingTransaction = await prisma.item_tran_history.findFirst({
            where: {
                id: tranId,
                requested_by: user.userId,
                status: item_tran_history_status.issued
            },
            include: {
                library_items: true,
                item_tran: true,
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
        });
        console.log(":::: ",tranId ,"\n:::: ",existingTransaction);

        if (!existingTransaction) {
            return NextResponse.json(
                { success: false, error: 'No issued record found for this transaction or unauthorized access' },
                { status: 404 }
            );
        }

        if (!existingTransaction.library_items) {
            return NextResponse.json(
                { success: false, error: 'Item information not found' },
                { status: 404 }
            );
        }

        // Verify librarian availability
        let librarianUserId: number | null = existingTransaction.library_items.librarian_id ?? null;

        if (librarianUserId) {
            const librarianExists = await prisma.users.findFirst({
                where: {
                    user_id: librarianUserId,
                    role: 'librarian',
                    status: 'active',
                },
                select: { user_id: true },
            });
            if (!librarianExists) {
                librarianUserId = null;
            }
        }

        if (!librarianUserId) {
            const anyLibrarian = await prisma.users.findFirst({
                where: {
                    role: 'librarian',
                    status: 'active',
                },
                select: { user_id: true },
            });
            if (anyLibrarian) {
                librarianUserId = anyLibrarian.user_id;
            } else {
                throw new Error('No librarian available');
            }
        }

        const updated = await prisma.$transaction(async (tx) => {
            const updatedHistory = await tx.item_tran_history.update({
                where: { id: existingTransaction.id },
                data: {
                    status: item_tran_history_status.returned,
                    date_returned: new Date(),
                    remarks: 'Return request initiated by patron',
                },
            });

            // Optionally update item_tran status -- depends on your workflow (not in original code)
            await tx.item_tran.update({
                where: { tran_id: existingTransaction.tran_id! },
                data: { status: 'available', user_id: null }, // Reset status and clearance
            });

            await tx.notifications.create({
                data: {
                    type: 'return',
                    item_id: existingTransaction.library_items.item_id,
                    from_user_id: user.userId,
                    to_user_id: librarianUserId,
                    reservation_id: tranId,        // use reservation_id field
                    status: 'pending',
                    message: `Return request for "${existingTransaction.library_items.title}" is pending your approval.`,
                    created_at: new Date(),
                },
            });


            return updatedHistory;
        });

        // Log success
        await prisma.logs.create({
            data: {
                description: `User (${user.email}) initiated return for "${existingTransaction.library_items.title}"`,
                user_id: user.userId,
            },
        });

        return NextResponse.json({
            success: true,
            message: 'Return request submitted successfully',
            data: updated,
        });
    } catch (error) {
        console.error('Error processing return request:', error);

        if (user) {
            await prisma.logs.create({
                data: {
                    description: `Return request failed for ${existingTransaction?.library_items?.title || existingTransaction?.id || 'Unknown'} by ${user.email} - Reason: ${error instanceof Error ? error.message : 'Unknown error'}`,
                    user_id: user.userId,
                },
            });
        }

        let errorMessage = 'Failed to process return';
        let statusCode = 500;

        if (error instanceof Error) {
            if (error.message.includes('No librarian available')) {
                errorMessage = 'No librarian available to process returns currently. Please try later.';
                statusCode = 503;
            } else if (error.message.includes('No issued record found')) {
                errorMessage = 'Return record not found or unauthorized.';
                statusCode = 404;
            } else if (error.message.includes('Item information not found')) {
                errorMessage = 'Item information missing/corrupted.';
                statusCode = 404;
            } else {
                errorMessage = error.message;
            }
        }

        return NextResponse.json({ success: false, error: errorMessage }, { status: statusCode });
    } finally {
        await prisma.$disconnect();
    }
});
