import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/app/utils/jwt';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { email, password, role } = await req.json();

        if (!email || !password || !role) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const user = await prisma.users.findUnique({
            where: { email },
        });

        if (!user || user.role !== role) {
            return NextResponse.json({ error: 'Invalid email or role' }, { status: 401 });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password_hash || '');
        if (!isPasswordCorrect) {
            return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
        }

        await prisma.logs.create({
            data: {
                description: `User (${user.email}) logged in`,
                user_id: user.user_id,
            },
        });

        // Generate JWT token
        const token = await generateToken({
            userId: user.user_id,
            email: user.email || '',
            role: user.role || 'patron'
        });

        const response = NextResponse.json({
            message: 'Login successful',
            user: { id: user.user_id, name: user.name, role: user.role },
            token: token
        });

        // Set JWT token as httpOnly cookie
        response.cookies.set('authToken', token, {
            path: '/',
            httpOnly: true,
            maxAge: 60 * 60 * 24, // 1 day
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        return response;

    } catch (error) {
        console.error('[LOGIN ERROR]', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
