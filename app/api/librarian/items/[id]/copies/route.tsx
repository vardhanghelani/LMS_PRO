import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { withRoleAuth } from '@/app/utils/authMiddleware';

const prisma = new PrismaClient();

// Add new copies to an item
export const POST = withRoleAuth(['librarian'])(async (req: NextRequest, { params }: { params: { id: string } }) => {
    const itemId = parseInt(params.id);
    const userId = req.user!.userId;

    try {
        const { count } = await req.json();

        if (!count || count < 1 || count > 100) {
            return NextResponse.json({
                success: false,
                message: 'Invalid copy count. Must be between 1 and 100.'
            }, { status: 400 });
        }

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

        // Create new copies
        const newCopies = [];
        for (let i = 0; i < count; i++) {
            const newCopy = await prisma.item_tran.create({
                data: {
                    item_id: itemId,
                    status: 'available',
                    record_status: 'active'
                }
            });
            newCopies.push(newCopy);
        }

        // Update the item's updated_at timestamp
        await prisma.library_items.update({
            where: { item_id: itemId },
            data: {
                updated_at: new Date()
            }
        });

        return NextResponse.json({
            success: true,
            message: `Successfully added ${count} copies`,
            copies: newCopies
        });

    } catch (error) {
        console.error('Error adding copies:', error);
        console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
        return NextResponse.json({
            success: false,
            message: 'Failed to add copies',
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
