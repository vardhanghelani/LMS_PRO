import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, item_tran_status } from '@/generated/prisma';
import { withAuth } from '@/app/utils/authMiddleware';

const prisma = new PrismaClient();

export const GET = withAuth(async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const { id } = await params;
        const itemId = parseInt(id);

        if (isNaN(itemId)) {
            return NextResponse.json({ error: 'Invalid item ID' }, { status: 400 });
        }

        // Get library item with full details including transactions
        const item = await prisma.library_items.findUnique({
            where: { item_id: itemId },
            include: {
                item_tran: true,
            },
        });

        if (!item) {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }

        // Calculate availability information
        const activeCopies = item.item_tran.filter(copy => copy.record_status === 'active');
        const totalCopies = activeCopies.length;
        const availableCopies = activeCopies.filter(copy => copy.status === item_tran_status.available).length;
        const issuedCopies = activeCopies.filter(copy => copy.status === item_tran_status.not_available).length;
        const reservedCopies = activeCopies.filter(copy => copy.status === item_tran_status.reserved).length;

        // Format item with full details for frontend
        const formattedItem = {
            item_id: item.item_id,
            title: item.title,
            author: item.author,
            isbn: item.isbn,
            year: item.year,
            genre: item.genre,
            item_type: item.item_type,
            publisher: item.publisher,
            language: item.language,
            pages: item.pages,
            duration: item.duration,
            format: item.format,
            subject: item.subject,
            keywords: item.keywords,
            description: item.description,
            location: item.location,
            created_at: item.created_at,
            updated_at: item.updated_at,
            total_copies: totalCopies,
            available_copies: availableCopies,
            issued_copies: issuedCopies,
            reserved_copies: reservedCopies
        };

        return NextResponse.json({
            success: true,
            item: formattedItem
        });

    } catch (error) {
        console.error('Error fetching item details:', error);
        return NextResponse.json(
            { error: 'Failed to fetch item details' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
});
