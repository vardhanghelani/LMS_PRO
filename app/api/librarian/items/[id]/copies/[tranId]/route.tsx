import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { withRoleAuth } from '@/app/utils/authMiddleware';

const prisma = new PrismaClient();

// Remove a specific copy from an item
export const DELETE = withRoleAuth(['librarian'])(async (req: NextRequest, { params }: { params: { id: string, tranId: string } }) => {
    const itemId = parseInt(params.id);
    const tranId = parseInt(params.tranId);
    const userId = req.user!.userId;

    try {
        // Verify the item exists and belongs to the librarian
        const item = await prisma.library_items.findFirst({
            where: {
                item_id: itemId,
                librarian_id: userId,
                record_status: 'active'
            }
        });

        if (!item) {
            return NextResponse.json({
                success: false,
                message: 'Item not found or you do not have permission to manage it.'
            }, { status: 404 });
        }

        // Find the copy to remove
        const copy = await prisma.item_tran.findFirst({
            where: {
                tran_id: tranId,
                item_id: itemId,
                record_status: 'active'
            }
        });

        if (!copy) {
            return NextResponse.json({
                success: false,
                message: 'Copy not found.'
            }, { status: 404 });
        }

        // Check if the copy is currently issued or reserved
        if (copy.status !== 'available') {
            return NextResponse.json({
                success: false,
                message: 'Cannot remove a copy that is currently issued or reserved.'
            }, { status: 400 });
        }

        // Remove the copy (soft delete by setting record_status to inactive)
        await prisma.item_tran.update({
            where: { tran_id: tranId },
            data: {
                record_status: 'inactive'
            }
        });

        // Update the item's updated_at timestamp
        await prisma.library_items.update({
            where: { item_id: itemId },
            data: {
                updated_at: new Date()
            }
        });

        return NextResponse.json({
            success: true,
            message: 'Copy removed successfully'
        });

    } catch (error) {
        console.error('Error removing copy:', error);
        console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
        return NextResponse.json({
            success: false,
            message: 'Failed to remove copy',
            error: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : undefined
        }, { status: 500 });
    } finally {
        try {
            await prisma.$disconnect();
        } catch (disconnectError) {
            console.error('Error disconnecting from database:', disconnectError);
        }
    }
});
