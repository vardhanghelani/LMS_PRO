import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma'; // Adjust if needed

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const librarianId = parseInt(id);
    const prisma = new PrismaClient();

    if (isNaN(librarianId)) {
        return NextResponse.json({ success: false, message: 'Invalid user ID' }, { status: 400 });
    }

    try {
        const user = await prisma.users.findUnique({
            where: { user_id: librarianId },
        });

        if (!user || user.role !== 'librarian') {
            return NextResponse.json({ success: false, message: 'Librarian not found' }, { status: 404 });
        }

        // Items managed by the librarian
        const itemsManaged = await prisma.library_items.findMany({
            where: { librarian_id: librarianId },
            select: {
                item_id: true,
                title: true,
                author: true,
                genre: true,
                year: true,
                _count: {
                    select: {
                        item_tran: true, // Count transactions for each item
                    },
                },
            },
        });

        // Item transactions approved by the librarian
        const approvedTransactions = await prisma.item_tran_history.findMany({
            where: { approved_by: librarianId },
            include: {
                users_item_tran_history_requested_byTousers: {
                    select: { name: true },
                },
                library_items: {
                    select: { title: true },
                },
            },
            take: 10,
        });

        // Logs for librarian
        const logs = await prisma.logs.findMany({
            where: { user_id: librarianId },
            take: 10,
        });

        // Notifications sent by librarian
        const notificationsSent = await prisma.notifications.findMany({
            where: { from_user_id: librarianId },
            orderBy: { created_at: 'desc' },
            take: 5,
        });

        // Notifications received by librarian
        const notificationsReceived = await prisma.notifications.findMany({
            where: { to_user_id: librarianId },
            orderBy: { created_at: 'desc' },
            take: 5,
        });

        // Summary stats
        const summary = {
            totalItemsManaged: itemsManaged.length,
            totalApprovedTransactions: approvedTransactions.length,
            totalLogs: logs.length,
            totalNotifications: notificationsSent.length + notificationsReceived.length,
        };

        return NextResponse.json({
            success: true,
            user: {
                user_id: user.user_id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            summary,
            itemsManaged,
            approvedTransactions,
            logs,
            notifications: {
                sent: notificationsSent,
                received: notificationsReceived,
            },
        });
    } catch (error) {
        console.error('Librarian fetch error:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
