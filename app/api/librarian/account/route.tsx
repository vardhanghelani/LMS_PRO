import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { withRoleAuth } from '@/app/utils/authMiddleware';

const prisma = new PrismaClient();

export const GET = withRoleAuth(['librarian'])(async (req) => {
    try {
        const librarianId = req.user!.userId;

        const user = await prisma.users.findUnique({
            where: { user_id: librarianId, role: 'librarian' },
            select: {
                user_id: true,
                name: true,
                email: true,
                gender: true,
                birth_date: true,
                phone_number: true,
                role: true,
                address: true,
                status: true,
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'Librarian not found' }, { status: 404 });
        }

        // Count genres of items managed by this librarian
        const genreCounts = await prisma.library_items.groupBy({
            by: ['genre'],
            where: {
                librarian_id: librarianId,
                genre: { not: null },
                record_status: 'active',
            },
            _count: {
                genre: true,
            },
            orderBy: {
                _count: {
                    genre: 'desc',
                },
            },
        });

        const genresWithCount = genreCounts.map(item => ({
            genre: item.genre ?? 'Unknown',
            count: item._count.genre,
        }));

        return NextResponse.json({
            user,
            genresWithCount,
        });
    } catch (error) {
        console.error('Error fetching librarian data:', error);
        return NextResponse.json(
            { error: 'Failed to load librarian data' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
});
