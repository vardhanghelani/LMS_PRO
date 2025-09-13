import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { withRoleAuth } from '@/app/utils/authMiddleware';

const prisma = new PrismaClient();

// GET method to get current user info
export const GET = withRoleAuth(['admin', 'librarian', 'patron'])(async (req: NextRequest) => {
    try {
        const userId = req.user!.userId;

        const user = await prisma.users.findUnique({
            where: { user_id: userId },
            select: { 
                user_id: true, 
                name: true,
                email: true, 
                status: true,
                role: true,
                created_at: true
            },
        });

        if (!user) {
            return NextResponse.json({ 
                success: false,
                message: 'User not found' 
            }, { status: 404 });
        }

        if (user.status === 'banned') {
            return NextResponse.json({ 
                success: false,
                message: 'User is banned' 
            }, { status: 403 });
        }

        return NextResponse.json({ 
            success: true,
            user: {
                id: user.user_id,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
                createdAt: user.created_at
            }
        });

    } catch (error) {
        console.error('[GET USER ERROR]', error);
        return NextResponse.json({ 
            success: false,
            message: 'Internal server error' 
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
});

// POST method to check if user exists (for registration)
export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const user = await prisma.users.findUnique({
            where: { email },
            select: { user_id: true, email: true, status: true },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        if (user.status === 'banned') {
            return NextResponse.json({ error: 'User is banned' }, { status: 403 });
        }

        return NextResponse.json({ message: 'User exists', email: user.email }, { status: 200 });

    } catch (error) {
        console.error('[CHECK USER ERROR]', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
