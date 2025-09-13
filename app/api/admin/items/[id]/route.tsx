import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { withRoleAuth } from '@/app/utils/authMiddleware';

const prisma = new PrismaClient();

// GET - Get item details for admin
export const GET = withRoleAuth(['admin'])(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const resolvedParams = await params;
        const itemId = parseInt(resolvedParams.id);

        if (isNaN(itemId)) {
            return NextResponse.json({ 
                success: false, 
                message: "Invalid item ID" 
            }, { status: 400 });
        }

        // Get item with all related data
        const item = await prisma.library_items.findUnique({
            where: { item_id: itemId },
            select: {
                item_id: true,
                title: true,
                author: true,
                isbn: true,
                year: true,
                genre: true,
                item_type: true,
                location: true,
                publisher: true,
                language: true,
                pages: true,
                duration: true,
                format: true,
                subject: true,
                keywords: true,
                description: true,
                image_url: true,
                created_at: true,
                updated_at: true,
                librarian_id: true,
                record_status: true,
                // Get copies with user information
                item_tran: {
                    where: { record_status: 'active' },
                    select: {
                        tran_id: true,
                        status: true,
                        user_id: true,
                        users: {
                            select: {
                                user_id: true,
                                name: true,
                                email: true
                            }
                        }
                    }
                },
                // Get transaction history
                item_tran_history: {
                    select: {
                        id: true,
                        status: true,
                        requested_at: true,
                        approved_at: true,
                        date_issued: true,
                        date_due: true,
                        date_returned: true,
                        remarks: true,
                        requested_by: true,
                        approved_by: true,
                        users_item_tran_history_requested_byTousers: {
                            select: {
                                user_id: true,
                                name: true,
                                email: true
                            }
                        }
                    },
                    orderBy: {
                        created_at: 'desc'
                    }
                }
            }
        });

        if (!item) {
            return NextResponse.json({ 
                success: false, 
                message: "Item not found" 
            }, { status: 404 });
        }

        // Transform the data to match the expected format
        const transformedItem = {
            id: item.item_id.toString(),
            title: item.title,
            author: item.author,
            isbn: item.isbn,
            year: item.year,
            genre: item.genre,
            item_type: item.item_type,
            location: item.location,
            publisher: item.publisher,
            language: item.language,
            pages: item.pages,
            duration: item.duration,
            format: item.format,
            subject: item.subject,
            keywords: item.keywords,
            description: item.description,
            image_url: item.image_url,
            created_at: item.created_at,
            updated_at: item.updated_at,
            totalCopies: item.item_tran.length,
            availableCopies: item.item_tran.filter(t => t.status === 'available').length,
            issuedCopies: item.item_tran.filter(t => t.status === 'issued').length,
            reservedCopies: item.item_tran.filter(t => t.status === 'reserved').length,
            copies: item.item_tran.map(tran => ({
                tran_id: tran.tran_id,
                status: tran.status,
                user: tran.users ? {
                    user_id: tran.users.user_id,
                    name: tran.users.name,
                    email: tran.users.email
                } : null
            })),
            history: item.item_tran_history.map(hist => ({
                id: hist.id,
                status: hist.status,
                requested_by: hist.users_item_tran_history_requested_byTousers ? {
                    user_id: hist.users_item_tran_history_requested_byTousers.user_id,
                    name: hist.users_item_tran_history_requested_byTousers.name,
                    email: hist.users_item_tran_history_requested_byTousers.email
                } : null,
                approved_by: hist.approved_by,
                requested_at: hist.requested_at,
                approved_at: hist.approved_at,
                date_issued: hist.date_issued,
                date_due: hist.date_due,
                date_returned: hist.date_returned,
                remarks: hist.remarks
            }))
        };

        return NextResponse.json({
            success: true,
            item: transformedItem
        });

    } catch (error) {
        console.error("Error fetching item details:", error);
        return NextResponse.json({ 
            success: false, 
            message: "Failed to fetch item details" 
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
});

// DELETE - Delete item (admin only)
export const DELETE = withRoleAuth(['admin'])(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const resolvedParams = await params;
        const itemId = parseInt(resolvedParams.id);
        const adminId = req.user!.userId;

        if (isNaN(itemId)) {
            return NextResponse.json({ 
                success: false, 
                message: "Invalid item ID" 
            }, { status: 400 });
        }

        // Check if item exists
        const item = await prisma.library_items.findUnique({
            where: { item_id: itemId },
            select: {
                item_id: true,
                title: true,
                item_tran: {
                    where: { record_status: 'active' },
                    select: { tran_id: true, status: true }
                }
            }
        });

        if (!item) {
            return NextResponse.json({ 
                success: false, 
                message: "Item not found" 
            }, { status: 404 });
        }

        // Check if item has active transactions
        const activeTransactions = item.item_tran.filter(t => t.status === 'issued' || t.status === 'reserved');
        if (activeTransactions.length > 0) {
            return NextResponse.json({ 
                success: false, 
                message: `Cannot delete item. It has ${activeTransactions.length} active transactions. Please resolve these first.` 
            }, { status: 400 });
        }

        // Soft delete - set record_status to inactive
        await prisma.library_items.update({
            where: { item_id: itemId },
            data: { record_status: 'inactive' }
        });

        // Log the action (optional - skip if logs table has issues)
        try {
            await prisma.logs.create({
                data: {
                    description: `Admin deleted item: ${item.title} (ID: ${item.item_id})`,
                    user_id: adminId,
                },
            });
        } catch (logError) {
            console.warn('Failed to log action:', logError);
            // Continue without logging
        }

        return NextResponse.json({ 
            success: true, 
            message: "Item deleted successfully" 
        });

    } catch (error) {
        console.error("Error deleting item:", error);
        return NextResponse.json({ 
            success: false, 
            message: "Failed to delete item" 
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
});

// PUT - Update item (admin only)
export const PUT = withRoleAuth(['admin'])(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const resolvedParams = await params;
        const itemId = parseInt(resolvedParams.id);
        const adminId = req.user!.userId;

        if (isNaN(itemId)) {
            return NextResponse.json({ 
                success: false, 
                message: "Invalid item ID" 
            }, { status: 400 });
        }

        const body = await req.json();
        const {
            title,
            author,
            isbn,
            year,
            genre,
            image_url,
            description,
            item_type,
            location,
            publisher,
            language,
            pages,
            duration,
            format,
            subject,
            keywords
        } = body;

        // Validate required fields
        if (!title || !author || !item_type) {
            return NextResponse.json(
                { success: false, message: 'Title, author, and item type are required fields.' },
                { status: 400 }
            );
        }

        // Validate year if provided
        let yearValue = null;
        if (year) {
            yearValue = Number(year);
            if (isNaN(yearValue) || yearValue < 1000 || yearValue > 2100) {
                return NextResponse.json(
                    { success: false, message: 'Invalid year. Must be between 1000 and 2100.' },
                    { status: 400 }
                );
            }
        }

        // Validate pages if provided
        let pagesValue = null;
        if (pages) {
            pagesValue = Number(pages);
            if (isNaN(pagesValue) || pagesValue < 1) {
                return NextResponse.json(
                    { success: false, message: 'Invalid pages. Must be a positive number.' },
                    { status: 400 }
                );
            }
        }

        // Validate duration if provided
        let durationValue = null;
        if (duration) {
            durationValue = Number(duration);
            if (isNaN(durationValue) || durationValue < 1) {
                return NextResponse.json(
                    { success: false, message: 'Invalid duration. Must be a positive number.' },
                    { status: 400 }
                );
            }
        }

        // Check if item exists
        const existingItem = await prisma.library_items.findUnique({
            where: { item_id: itemId },
            select: { item_id: true, title: true }
        });

        if (!existingItem) {
            return NextResponse.json({ 
                success: false, 
                message: "Item not found" 
            }, { status: 404 });
        }

        // Update item
        const updatedItem = await prisma.library_items.update({
            where: { item_id: itemId },
            data: {
                title: title.trim(),
                author: author.trim(),
                isbn: isbn?.trim() || null,
                year: yearValue,
                genre: genre?.trim() || null,
                image_url: image_url?.trim() || null,
                description: description?.trim() || null,
                item_type: item_type,
                location: location?.trim() || null,
                publisher: publisher?.trim() || null,
                language: language?.trim() || null,
                pages: pagesValue,
                duration: durationValue,
                format: format?.trim() || null,
                subject: subject?.trim() || null,
                keywords: keywords?.trim() || null,
                updated_at: new Date()
            },
            select: {
                item_id: true,
                title: true,
                author: true,
                isbn: true,
                year: true,
                genre: true,
                item_type: true,
                location: true,
                publisher: true,
                language: true,
                pages: true,
                duration: true,
                format: true,
                subject: true,
                keywords: true,
                description: true,
                image_url: true,
                created_at: true,
                updated_at: true
            }
        });

        // Log the action (optional - skip if logs table has issues)
        try {
            await prisma.logs.create({
                data: {
                    description: `Admin updated item: ${updatedItem.title} (ID: ${updatedItem.item_id})`,
                    user_id: adminId,
                },
            });
        } catch (logError) {
            console.warn('Failed to log action:', logError);
            // Continue without logging
        }

        return NextResponse.json({ 
            success: true, 
            message: "Item updated successfully",
            item: updatedItem
        });

    } catch (error) {
        console.error("Error updating item:", error);
        return NextResponse.json({ 
            success: false, 
            message: "Failed to update item" 
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
});
