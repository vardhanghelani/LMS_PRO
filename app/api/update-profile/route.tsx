import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { verifyToken } from '@/app/utils/jwt';

const prisma = new PrismaClient();

export async function PUT(req: Request) {
    let userId;
    try {
        // Extract token from httpOnly cookie sent by browser
        const token = req.headers.get('cookie')
            ?.split('; ')
            .find(row => row.startsWith('authToken='))
            ?.split('=')[1];

        if (!token) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        // Verify JWT
        const decoded = await verifyToken(token);
        if (!decoded) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        userId = decoded.userId;
        console.log(userId)
        // Get profile fields from request body
        const {
            name,
            email,
            gender,
            phone_number,
            birth_date,
            address
        } = await req.json();

        // console.log("::::",name,email,"::::")

        // Update user profile in database
        await prisma.users.update({
            where: { user_id: userId },
            data: {
                name,
                email,
                gender,
                phone_number,
                birth_date: birth_date ? new Date(birth_date) : undefined,
                address,
                updated_at: new Date(),
            }
        });

        // Create log entry
        await prisma.logs.create({
            data: {
                description: `Profile updated for user: ${email}`,
                user_id: userId,
            },
        });

        return NextResponse.json({
            success: true,
            message: 'Profile updated successfully!',
        }, { status: 200 });

    } catch (error) {
        await prisma.logs.create({
            data: {
                description: `Failed profile update for user ID ${userId ?? 'unknown'}: ${error instanceof Error ? error.message : 'Unknown error'}`,
                user_id: userId!,
            },
        });
        console.error('[EDIT PROFILE ERROR]', error);
        return NextResponse.json({
            error: 'Something went wrong. Please try again later.'
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
