import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const { email, password } = await req.json();

    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const hashed = await bcrypt.hash(password, 10);

    await prisma.users.update({
        where: { email },
        data: { password_hash: hashed },
    });

    await prisma.logs.create({
        data: {
            description: `User (${email}) reset their password`,
            user_id: user.user_id,
        },
    });

    return NextResponse.json({ message: 'Password reset successful' });
}
