import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { withRoleAuth } from '@/app/utils/authMiddleware';

const prisma = new PrismaClient();

export const GET = withRoleAuth(['librarian'])(
    async (req) => {
        try {
            console.log('Fetching all fines for librarian dashboard');
            
            // Get all fines with user and transaction history details
            const allFines = await prisma.fines.findMany({
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
            
            console.log('All fines found:', allFines.length);

            const formattedFines = allFines.map((fine) => {
                try {
                    const dateDue = fine.item_tran_history?.date_due || null;
                    const dateReturned = fine.item_tran_history?.date_returned || null;

                    return {
                        fine_id: fine.fine_id,
                        user: fine.users?.name || 'Unknown User',
                        book: fine.item_tran_history?.library_items?.title || 'Unknown Item',
                        amount: fine.amount || 0,
                        reason: fine.reason || 'No reason provided',
                        status: fine.status || 'unknown',
                        date_due: dateDue,
                        date_returned: dateReturned,
                        created_at: fine.created_at,
                        paid_at: fine.paid_at,
                    };
                } catch (error) {
                    console.error('Error formatting fine:', error, fine);
                    return {
                        fine_id: fine.fine_id || 0,
                        user: fine.users?.name || 'Unknown User',
                        book: 'Unknown Item',
                        amount: fine.amount || 0,
                        reason: fine.reason || 'No reason provided',
                        status: fine.status || 'unknown',
                        date_due: null,
                        date_returned: null,
                        created_at: fine.created_at || new Date().toISOString(),
                        paid_at: fine.paid_at,
                    };
                }
            });

            console.log('Formatted fines:', formattedFines.length);
            return NextResponse.json({ success: true, data: formattedFines });
        } catch (error) {
            console.error('Error fetching fines:', error);
            
            // Return empty array with success to prevent page crash
            return NextResponse.json({ 
                success: true, 
                data: [],
                message: 'No fines found or database connection issue'
            });
        } finally {
            try {
                await prisma.$disconnect();
            } catch (disconnectError) {
                console.error('Error disconnecting Prisma:', disconnectError);
            }
        }
    }
);

// Mark fine as paid
export const PATCH = withRoleAuth(['librarian'])(async (req) => {
    const librarianId = req.user!.userId;
    const librarianEmail = req.user!.email;

    try {
        const { fineId, status } = await req.json();

        if (!fineId) {
            return NextResponse.json({ message: 'Fine ID is required' }, { status: 400 });
        }

        if (status !== 'paid') {
            return NextResponse.json({ message: 'Invalid status' }, { status: 400 });
        }

        // Update the fine status
        const updatedFine = await prisma.fines.update({
            where: { fine_id: fineId },
            data: {
                status: 'paid',
                paid_at: new Date(),
            },
            include: {
                users: true,
                item_tran_history: {
                    include: {
                        library_items: true,
                    },
                },
            },
        });

        // Log the action
        await prisma.logs.create({
            data: {
                description: `Librarian (${librarianEmail}) marked fine #${fineId} as paid for user ${updatedFine.users?.name || 'Unknown'}`,
                user_id: librarianId,
            },
        });

        return NextResponse.json({ 
            success: true, 
            message: 'Fine marked as paid successfully',
            data: updatedFine 
        });
    } catch (error) {
        console.error('Error updating fine:', error);
        
        // Log the error
        await prisma.logs.create({
            data: {
                description: `Failed to mark fine as paid by ${librarianEmail} - Reason: ${error instanceof Error ? error.message : 'Unknown error'}`,
                user_id: librarianId,
            },
        });

        return NextResponse.json(
            { message: error instanceof Error ? error.message : 'Error updating fine' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
});