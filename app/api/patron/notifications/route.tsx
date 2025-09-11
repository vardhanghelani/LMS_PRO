import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { withRoleAuth } from '@/app/utils/authMiddleware';

const prisma = new PrismaClient();

export const GET = withRoleAuth(['patron'])(async (req) => {
    if (!req.user) {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

        const notifications = await prisma.notifications.findMany({
            where: {
                to_user_id: req.user.userId,
                created_at: {
                    gte: startOfToday,
                    lt: endOfToday,
                },
            },
            include: {
                library_items: {
                    select: { title: true },
                },
            },
            orderBy: {
                created_at: 'desc',
            },
        });

        return NextResponse.json({ success: true, notifications });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return NextResponse.json({ success: false, message: 'Error fetching notifications' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
});
