import { NextResponse } from 'next/server';
import { PrismaClient, card_status } from '@/generated/prisma';
import { withRoleAuth } from '@/app/utils/authMiddleware';

const prisma = new PrismaClient();

export const GET = withRoleAuth(['librarian'])(async (req) => {
    try {
        const librarianId = req.user!.userId;

        const cards = await prisma.library_cards.findMany({
            include: {
                users: {
                    select: {
                        user_id: true,
                        name: true,
                        email: true,
                        phone_number: true,
                        role: true
                    }
                }
            },
            orderBy: {
                issued_at: 'desc'
            }
        });

        const formattedCards = cards.map(card => ({
            card_id: card.card_id,
            card_number: card.card_number,
            user: {
                user_id: card.users?.user_id,
                name: card.users?.name,
                email: card.users?.email,
                phone_number: card.users?.phone_number,
                role: card.users?.role
            },
            status: card.status,
            issued_at: card.issued_at,
            expires_at: card.expires_at
        }));

        return NextResponse.json({ success: true, cards: formattedCards });
    } catch (error) {
        console.error('Error fetching library cards:', error);
        return NextResponse.json({ 
            success: false, 
            message: 'Failed to fetch library cards',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
});

export const POST = withRoleAuth(['librarian'])(async (req) => {
    try {
        const librarianId = req.user!.userId;
        const librarianEmail = req.user!.email;
        const body = await req.json();

        const { user_id, expires_years = 3 } = body;

        if (!user_id) {
            return NextResponse.json(
                { success: false, message: 'User ID is required' },
                { status: 400 }
            );
        }

        // Check if user exists
        const user = await prisma.users.findUnique({
            where: { user_id: parseInt(user_id) }
        });

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        // Check if user already has an active card
        const existingCard = await prisma.library_cards.findFirst({
            where: {
                user_id: parseInt(user_id),
                status: card_status.active
            }
        });

        if (existingCard) {
            return NextResponse.json(
                { success: false, message: 'User already has an active library card' },
                { status: 409 }
            );
        }

        // Generate unique card number
        const cardNumber = `LIB${Date.now()}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

        const expiresAt = new Date();
        expiresAt.setFullYear(expiresAt.getFullYear() + parseInt(expires_years));

        const card = await prisma.library_cards.create({
            data: {
                user_id: parseInt(user_id),
                card_number: cardNumber,
                expires_at: expiresAt,
                status: card_status.active
            }
        });

        await prisma.logs.create({
            data: {
                description: `Librarian (${librarianEmail}) issued library card ${cardNumber} to user ${user.name}`,
                user_id: librarianId,
            },
        });

        return NextResponse.json({
            success: true,
            message: 'Library card issued successfully',
            card: {
                ...card,
                user: {
                    user_id: user.user_id,
                    name: user.name,
                    email: user.email
                }
            }
        });

    } catch (error) {
        console.error('Error issuing library card:', error);
        return NextResponse.json({ 
            success: false, 
            message: 'Failed to issue library card',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
});
