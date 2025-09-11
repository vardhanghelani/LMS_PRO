import { NextResponse } from 'next/server';
import { PrismaClient, record_status } from '@/generated/prisma';
import { withRoleAuth } from '@/app/utils/authMiddleware';

const prisma = new PrismaClient();

export const POST = withRoleAuth(['patron'])(async (req) => {
    try {
        const userId = req.user!.userId;
        const body = await req.json();
        const { item_id } = body;

        if (!item_id) {
            return NextResponse.json({ success: false, message: 'Item ID is required' }, { status: 400 });
        }

        const item = await prisma.library_items.findUnique({
            where: { item_id: parseInt(item_id) },
            select: { item_id: true, record_status: true }
        });

        if (!item || item.record_status !== record_status.active) {
            return NextResponse.json({ success: false, message: 'Item not found or inactive' }, { status: 404 });
        }

        const existingWishlist = await prisma.user_wishlist.findFirst({
            where: { user_id: userId, item_id: parseInt(item_id) }
        });

        if (existingWishlist) {
            return NextResponse.json({ success: false, message: 'Item already in wishlist' }, { status: 409 });
        }

        const wishlistEntry = await prisma.user_wishlist.create({
            data: { user_id: userId, item_id: parseInt(item_id) }
        });

        return NextResponse.json({ success: true, message: 'Item added to wishlist', wishlistEntry });
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        return NextResponse.json({ success: false, message: 'Failed to add item to wishlist', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
});

export const GET = withRoleAuth(['patron'])(async (req) => {
    try {
        const userId = req.user!.userId;

        const wishlistItems = await prisma.user_wishlist.findMany({
            where: { user_id: userId },
            include: {
                library_items: {
                    select: { item_id: true, title: true, author: true, item_type: true, image_url: true, location: true, record_status: true }
                }
            },
            orderBy: { id: 'desc' }
        });

        const filteredItems = wishlistItems.filter(w => w.library_items?.record_status === 'active');

        return NextResponse.json({ success: true, wishlist: filteredItems });
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch wishlist', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
});

export const DELETE = withRoleAuth(['patron'])(async (req) => {
    try {
        const userId = req.user!.userId;
        const body = await req.json();
        const { item_id } = body;

        if (!item_id) {
            return NextResponse.json({ success: false, message: 'Item ID is required to remove from wishlist' }, { status: 400 });
        }

        const wishlistEntry = await prisma.user_wishlist.findFirst({
            where: { user_id: userId, item_id: parseInt(item_id) }
        });

        if (!wishlistEntry) {
            return NextResponse.json({ success: false, message: 'Item not found in wishlist' }, { status: 404 });
        }

        await prisma.user_wishlist.delete({ where: { id: wishlistEntry.id } });

        return NextResponse.json({ success: true, message: 'Item removed from wishlist' });
    } catch (error) {
        console.error('Error removing from wishlist:', error);
        return NextResponse.json({ success: false, message: 'Failed to remove item from wishlist', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
});
