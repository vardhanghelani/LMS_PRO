import { NextResponse } from 'next/server';
import { withRoleAuth } from '@/app/utils/authMiddleware';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export const GET = withRoleAuth(['patron'])(async (req) => {
    if (!req.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.users.findUnique({
        where: { user_id: req.user.userId },
        select: {
            user_id: true,
            name: true,
            email: true,
            role: true,
            birth_date: true,
            phone_number: true,
            gender: true,
            address:true,
        },
    });

    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({user});
});
