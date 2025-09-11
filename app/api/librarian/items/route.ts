import { NextResponse } from 'next/server';
import { PrismaClient, item_tran_status } from '@/generated/prisma';
import { withRoleAuth } from '@/app/utils/authMiddleware';

const prisma = new PrismaClient();

export const GET = withRoleAuth(['librarian'])(async (req) => {
    try {
        const librarianId = req.user!.userId;

        const items = await prisma.library_items.findMany({
            where: {
                librarian_id: librarianId,
                record_status: 'active'
            },
            include: {
                item_tran: true,
            },
        });

        const formattedItems = items.map(item => {
            const activeCopies = item.item_tran.filter(copy => copy.record_status === 'active');
            const totalCopies = activeCopies.length;
            const availableCopies = activeCopies.filter(copy => copy.status === item_tran_status.available).length;
            const issuedCopies = activeCopies.filter(copy => copy.status === item_tran_status.not_available).length;
            const reservedCopies = activeCopies.filter(copy => copy.status === item_tran_status.reserved).length;

            let status: 'Available' | 'Issued' | 'Partially Available' | 'Reserved';
            if (availableCopies === totalCopies) {
                status = 'Available';
            } else if (availableCopies === 0 && reservedCopies === 0) {
                status = 'Issued';
            } else if (reservedCopies > 0) {
                status = 'Reserved';
            } else {
                status = 'Partially Available';
            }

            return {
                id: item.item_id,
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
                status,
                totalCopies,
                availableCopies,
                issuedCopies,
                reservedCopies,
                description: item.description,
                image_url: item.image_url,
                created_at: item.created_at,
                updated_at: item.updated_at,
            };
        });

        return NextResponse.json({ success: true, items: formattedItems });
    } catch (error) {
        console.error('Error fetching library items:', error);
        return NextResponse.json({ 
            success: false, 
            message: 'Failed to fetch library items',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
});
