import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { withRoleAuth } from '@/app/utils/authMiddleware';

const prisma = new PrismaClient();

// GET - Fetch all library items for admin
export const GET = withRoleAuth(['admin'])(async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const search = searchParams.get('search') || '';
        const status = searchParams.get('status') || 'all';

        // Build where clause
        const whereClause: any = {
            record_status: 'active'
        };

        // Add search filter
        if (search) {
            whereClause.OR = [
                { title: { contains: search } },
                { author: { contains: search } },
                { isbn: { contains: search } },
                { genre: { contains: search } }
            ];
        }

        // Status filter is handled by item_tran status, not library_items status

        const items = await prisma.library_items.findMany({
            where: whereClause,
            include: {
                item_tran: {
                    where: {
                        record_status: 'active'
                    },
                    select: {
                        tran_id: true,
                        status: true
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        // Calculate statistics for each item
        const itemsWithStats = items.map(item => {
            const totalCopies = item.item_tran.length;
            const availableCopies = item.item_tran.filter(copy => copy.status === 'available').length;
            const issuedCopies = item.item_tran.filter(copy => copy.status === 'not_available').length;
            const reservedCopies = item.item_tran.filter(copy => copy.status === 'reserved').length;

            return {
                ...item,
                totalCopies,
                availableCopies,
                issuedCopies,
                reservedCopies
            };
        });

        return NextResponse.json({ 
            success: true, 
            items: itemsWithStats 
        });

    } catch (error) {
        console.error("Error fetching library items:", error);
        console.error("Error details:", error instanceof Error ? error.message : 'Unknown error');
        return NextResponse.json({ 
            success: false, 
            message: "Failed to fetch library items",
            error: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : undefined
        }, { status: 500 });
    } finally {
        try {
            await prisma.$disconnect();
        } catch (disconnectError) {
            console.error('Error disconnecting from database:', disconnectError);
        }
    }
});

// POST - Add new library item
export const POST = withRoleAuth(['admin'])(async (req: NextRequest) => {
    try {
        const { title, author, isbn, genre, description, year, publisher, language, pages } = await req.json();

        // Validation
        if (!title || !author || !isbn || !genre) {
            return NextResponse.json({ 
                success: false, 
                message: "Title, author, ISBN, and genre are required" 
            }, { status: 400 });
        }

        // Check if item with same ISBN already exists
        const existingItem = await prisma.library_items.findFirst({
            where: { isbn }
        });

        if (existingItem) {
            return NextResponse.json({ 
                success: false, 
                message: "A library item with this ISBN already exists" 
            }, { status: 409 });
        }

        // Create new library item
        const newItem = await prisma.library_items.create({
            data: {
                title: title.trim(),
                author: author.trim(),
                isbn: isbn.trim(),
                genre: genre.trim(),
                description: description?.trim() || null,
                year: year ? parseInt(year) : null,
                publisher: publisher?.trim() || null,
                language: language?.trim() || null,
                pages: pages ? parseInt(pages) : null,
                record_status: 'active'
            },
            include: {
                item_tran: {
                    where: {
                        record_status: 'active'
                    },
                    select: {
                        tran_id: true,
                        status: true
                    }
                }
            }
        });

        // Log the action (optional - skip if logs table has issues)
        try {
            await prisma.logs.create({
                data: {
                    description: `Admin added new library item: ${title} by ${author}`,
                    user_id: req.user!.userId,
                },
            });
        } catch (logError) {
            console.warn('Failed to log action:', logError);
            // Continue without logging
        }

        return NextResponse.json({ 
            success: true, 
            message: "Library item added successfully",
            item: newItem 
        });

    } catch (error) {
        console.error("Error adding library item:", error);
        return NextResponse.json({ 
            success: false, 
            message: "Failed to add library item" 
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
});
