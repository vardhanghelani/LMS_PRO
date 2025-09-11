import { NextResponse } from 'next/server';
import { PrismaClient, library_item_type } from '@/generated/prisma';
import { withRoleAuth } from '@/app/utils/authMiddleware';

const prisma = new PrismaClient();

export const GET = withRoleAuth(['patron'])(async (req) => {
    try {
        const url = new URL(req.url);
        const searchTerm = url.searchParams.get('q') || '';
        const itemType = url.searchParams.get('type') || '';
        const genre = url.searchParams.get('genre') || '';
        const author = url.searchParams.get('author') || '';
        const year = url.searchParams.get('year') || '';
        const page = parseInt(url.searchParams.get('page') || '1');
        const limit = parseInt(url.searchParams.get('limit') || '20');
        const sortBy = url.searchParams.get('sortBy') || 'title';
        const sortOrder = url.searchParams.get('sortOrder') || 'asc';

        const skip = (page - 1) * limit;

        // Build search conditions
        const whereConditions: any = {
            record_status: 'active'
        };

        if (searchTerm) {
            whereConditions.OR = [
                { title: { contains: searchTerm, mode: 'insensitive' } },
                { author: { contains: searchTerm, mode: 'insensitive' } },
                { isbn: { contains: searchTerm, mode: 'insensitive' } },
                { subject: { contains: searchTerm, mode: 'insensitive' } },
                { keywords: { contains: searchTerm, mode: 'insensitive' } },
                { publisher: { contains: searchTerm, mode: 'insensitive' } }
            ];
        }

        if (itemType && Object.values(library_item_type).includes(itemType as library_item_type)) {
            whereConditions.item_type = itemType;
        }

        if (genre) {
            whereConditions.genre = { contains: genre, mode: 'insensitive' };
        }

        if (author) {
            whereConditions.author = { contains: author, mode: 'insensitive' };
        }

        if (year) {
            const yearNum = parseInt(year);
            if (!isNaN(yearNum)) {
                whereConditions.year = yearNum;
            }
        }

        // Build order by
        const orderBy: any = {};
        if (sortBy === 'title') {
            orderBy.title = sortOrder;
        } else if (sortBy === 'author') {
            orderBy.author = sortOrder;
        } else if (sortBy === 'year') {
            orderBy.year = sortOrder;
        } else if (sortBy === 'created_at') {
            orderBy.created_at = sortOrder;
        } else {
            orderBy.title = 'asc';
        }

        const [items, totalCount] = await Promise.all([
            prisma.library_items.findMany({
                where: whereConditions,
                include: {
                    item_tran: {
                        where: { record_status: 'active' },
                        select: {
                            status: true
                        }
                    }
                },
                orderBy,
                skip,
                take: limit
            }),
            prisma.library_items.count({
                where: whereConditions
            })
        ]);

        const formattedItems = items.map(item => {
            const activeCopies = item.item_tran.filter(copy => copy.status?.toLowerCase() === 'active');
            const totalCopies = activeCopies.length;
            const availableCopies = activeCopies.filter(copy => copy.status === 'available').length;
            const issuedCopies = activeCopies.filter(copy => copy.status === 'not_available').length;
            const reservedCopies = activeCopies.filter(copy => copy.status === 'reserved').length;

            return {
                item_id: item.item_id,
                title: item.title || 'Untitled',
                author: item.author || 'Unknown Author',
                isbn: item.isbn,
                year: item.year,
                genre: item.genre,
                item_type: item.item_type,
                location: item.location,
                publisher: item.publisher,
                language: item.language,
                pages: item.pages,
                duration: item.duration,
                format: item.format,
                subject: item.subject,
                keywords: item.keywords,
                description: item.description,
                image_url: item.image_url,
                availability: {
                    totalCopies,
                    availableCopies,
                    issuedCopies,
                    reservedCopies,
                    isAvailable: availableCopies > 0
                },
                created_at: item.created_at,
                updated_at: item.updated_at
            };
        });

        const totalPages = Math.ceil(totalCount / limit);

        return NextResponse.json({
            success: true,
            items: formattedItems,
            pagination: {
                currentPage: page,
                totalPages,
                totalCount,
                limit,
                hasNext: page < totalPages,
                hasPrev: page > 1
            },
            searchParams: {
                searchTerm,
                itemType,
                genre,
                author,
                year,
                sortBy,
                sortOrder
            }
        });

    } catch (error) {
        console.error('Error searching library items:', error);
        return NextResponse.json({ 
            success: false, 
            message: 'Failed to search library items',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
});
