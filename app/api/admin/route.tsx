import { NextResponse } from 'next/server';
import { PrismaClient, notifications_type, notifications_status, record_status } from '@/generated/prisma';
import { startOfDay, endOfDay } from 'date-fns';

export async function GET() {
    const today = new Date();
    const start = startOfDay(today);
    const end = endOfDay(today);
    const prisma = new PrismaClient();

    try {
        const [totalPatrons, totalLibrarians, totalItems] = await Promise.all([
            prisma.users.count({ where: { role: 'patron' } }),
            prisma.users.count({ where: { role: 'librarian' } }),
            prisma.library_items.count({ where: { record_status: record_status.active } }),
        ]);

        // Issue and return counts for items today
        const [issuedToday, returnedToday] = await Promise.all([
            prisma.notifications.count({
                where: {
                    type: notifications_type.issue,
                    status: notifications_status.approved,
                    created_at: { gte: start, lte: end },
                },
            }),
            prisma.notifications.count({
                where: {
                    type: notifications_type.return,
                    status: notifications_status.approved,
                    created_at: { gte: start, lte: end },
                },
            }),
        ]);

        // Recent approved notifications (activity) for items today
        const recentActivity = await prisma.notifications.findMany({
            where: {
                status: notifications_status.approved,
                created_at: {
                    gte: start,
                    lte: end
                }
            },
            orderBy: { created_at: 'desc' },
            include: {
                library_items: { select: { title: true } },
                users_notifications_from_user_idTousers: { select: { name: true } }, // librarian (issuer)
                users_notifications_to_user_idTousers: { select: { name: true } },   // patron (recipient)
            },
        });

        // Format for UI, fallback to 'Unknown' if data missing
        const formattedActivity = recentActivity.map(act => ({
            itemTitle: act.library_items?.title || 'Unknown Item',
            userName:
                act.users_notifications_to_user_idTousers?.name ||
                act.users_notifications_from_user_idTousers?.name ||
                'Unknown User',
            type: act.type,
            date: act.created_at,
        }));

        return NextResponse.json({
            totalPatrons,
            totalLibrarians,
            totalItems,
            issuedToday,
            returnedToday,
            formattedActivity
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
    }
}
