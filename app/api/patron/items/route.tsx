import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, item_tran_status } from '@/generated/prisma';
import { withAuth } from '@/app/utils/authMiddleware';
import { verifyToken } from '@/app/utils/jwt';

const prisma = new PrismaClient();

export const GET = withAuth(async (req: Request & { user?: any }) => {
    try {
        const { searchParams } = new URL(req.url);
        const search = searchParams.get('search') || '';
        const itemType = searchParams.get('type') || '';
        const genre = searchParams.get('genre') || '';

        // Build where clause for filtering
        const whereClause: any = {
            record_status: 'active'
        };

        // Add search filters
        if (search) {
            whereClause.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { author: { contains: search, mode: 'insensitive' } },
                { subject: { contains: search, mode: 'insensitive' } },
                { keywords: { contains: search, mode: 'insensitive' } }
            ];
        }

        // Add item type filter
        if (itemType) {
            whereClause.item_type = itemType;
        }

        // Add genre filter
        if (genre) {
            whereClause.genre = genre;
        }

        // Get library items with their transactions to calculate availability
        const items = await prisma.library_items.findMany({
            where: whereClause,
            orderBy: {
                created_at: 'desc'
            },
            include: {
                item_tran: true,
            },
        });

        // Format items for frontend with availability information
        const formattedItems = items.map(item => {
            const activeCopies = item.item_tran.filter(copy => copy.record_status === 'active');
            const totalCopies = activeCopies.length;
            const availableCopies = activeCopies.filter(copy => copy.status === item_tran_status.available).length;
            const issuedCopies = activeCopies.filter(copy => copy.status === item_tran_status.not_available).length;
            const reservedCopies = activeCopies.filter(copy => copy.status === item_tran_status.reserved).length;

            return {
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
        });

        return NextResponse.json({
            success: true,
            items: formattedItems,
            total: formattedItems.length
        });

    } catch (error) {
        console.error('Error fetching library items:', error);
        return NextResponse.json(
            { error: 'Failed to fetch library items' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
});
