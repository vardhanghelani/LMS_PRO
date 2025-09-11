import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

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
    }
}
