import { NextResponse } from "next/server";
import { PrismaClient, record_status, } from "@/generated/prisma";
import { withRoleAuth } from "@/app/utils/authMiddleware";

const prisma = new PrismaClient();

const parseId = (idStr: string) => {
    const idNum = parseInt(idStr, 10);
    return isNaN(idNum) ? null : idNum;
};

// GET item details by ID (only active, authorized to librarian)
export const GET = withRoleAuth(["librarian"])(
    async (req: Request, { params }: { params: { id: string } }) => {
        try {
        const id = params.id;
        const itemId = parseId(id);
        if (!itemId) {
            return NextResponse.json(
            { success: false, message: "Invalid item ID" },
            { status: 400 }
            );
        }

        const librarianId = (req as any).user?.userId;

        const item = await prisma.library_items.findFirst({
            where: {
                item_id: itemId,
                librarian_id: librarianId,
                record_status: record_status.active,
            },
            include: {
                item_tran: {
                    where: { record_status: record_status.active },
                    include: {
                        users: {
                            select: { user_id: true, name: true, email: true },
                        },
                    },
                },
                item_tran_history: {
                    include: {
                        users_item_tran_history_requested_byTousers: {
                            select: { user_id: true, name: true, email: true },
                        },
                        users_item_tran_history_approved_byTousers: {
                            select: { user_id: true, name: true, email: true },
                        },
                    },
                    orderBy: { requested_at: "desc" },
                },
            },
        });

        if (!item) {
            return NextResponse.json(
            { success: false, message: "Item not found" },
            { status: 404 }
            );
        }

        const activeCopies = item.item_tran.filter(
            (copy) => copy.record_status === record_status.active
        );
        const totalCopies = activeCopies.length;
        const availableCopies = activeCopies.filter(
            (c) => c.status === 'available'
        ).length;
        const issuedCopies = activeCopies.filter(
            (c) => c.status === 'not_available'
        ).length;

      // Format response
    const formattedItem = {
        id: item.item_id,
        title: item.title ?? "Untitled",
        author: item.author ?? "Unknown Author",
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
        totalCopies,
        availableCopies,
        issuedCopies,
        created_at: item.created_at,
        updated_at: item.updated_at,
        copies: activeCopies.map((copy) => ({
            tran_id: copy.tran_id,
            status: copy.status,
            user: copy.users
                ? {
                    user_id: copy.users.user_id,
                    name: copy.users.name,
                    email: copy.users.email,
                }
                : null,
        })),
        history: item.item_tran_history.map((history) => ({
            id: history.id,
            status: history.status,
            requested_by: history.users_item_tran_history_requested_byTousers
            ? {
                user_id: history.users_item_tran_history_requested_byTousers.user_id,
                name: history.users_item_tran_history_requested_byTousers.name,
                email: history.users_item_tran_history_requested_byTousers.email,
                }
                : null,
            approved_by: history.users_item_tran_history_approved_byTousers
                ? {
                    user_id: history.users_item_tran_history_approved_byTousers.user_id,
                    name: history.users_item_tran_history_approved_byTousers.name,
                    email: history.users_item_tran_history_approved_byTousers.email,
                }
                : null,
            requested_at: history.requested_at,
            approved_at: history.approved_at,
            date_issued: history.date_issued,
            date_due: history.date_due,
            date_returned: history.date_returned,
            remarks: history.remarks,
            })),
        };

        return NextResponse.json({ success: true, item: formattedItem });
        } catch (error) {
        console.error("Error fetching item:", error);
        return NextResponse.json(
            {
            success: false,
            message: "Failed to fetch item",
            error: (error as Error).message || "Unknown error",
            },
            { status: 500 }
        );
        } finally {
        await prisma.$disconnect();
        }
    }
);

// DELETE item if no issued copies or pending related records
export const DELETE = withRoleAuth(["librarian"])(
    async (req: Request, { params }: { params: { id: string } }) => {
        try {
        const librarianId = (req as any).user?.userId;
        const librarianEmail = (req as any).user?.email;
        const id = params.id;
        const itemId = parseId(id);

        if (!itemId) {
            if (librarianId) {
            await prisma.logs.create({
                data: {
                description: `Delete failed: Invalid item ID ${id}`,
                user_id: librarianId,
                },
            });
            }
            return NextResponse.json(
            { success: false, message: "Invalid item ID" },
            { status: 400 }
            );
        }

        // Fetch item for current librarian
        const item = await prisma.library_items.findFirst({
            where: {
            item_id: itemId,
            librarian_id: librarianId,
            record_status: record_status.active,
            },
            include: {
            item_tran: {
                where: {
                status: 'not_available',
                record_status: record_status.active,
                },
            },
            // Optionally include fines lookup if needed to prevent deletion (if you handle fines)
            },
        });

        if (!item) {
            return NextResponse.json(
            { success: false, message: "Item not found" },
            { status: 404 }
            );
        }

        if (item.item_tran.length > 0) {
            if (librarianId) {
            await prisma.logs.create({
                data: {
                description: `Delete failed: Item ${item.title} (ID ${itemId}) has issued copies`,
                user_id: librarianId,
                },
            });
            }
            return NextResponse.json(
            { success: false, message: "Cannot delete item with issued copies" },
            { status: 400 }
            );
        }

        await prisma.$transaction(async (tx) => {
            await tx.library_items.update({
            where: { item_id: itemId },
            data: { record_status: record_status.inactive },
            });
            await tx.item_tran.updateMany({
            where: { item_id: itemId },
            data: { record_status: record_status.inactive },
            });
        });

        if (librarianId) {
            await prisma.logs.create({
            data: {
                description: `Item deleted: ${item.title} (ID ${itemId}) by ${librarianEmail}`,
                user_id: librarianId,
            },
            });
        }

        return NextResponse.json({
            success: true,
            message: `${
            item.item_type.charAt(0).toUpperCase() + item.item_type.slice(1)
            } "${item.title}" deleted successfully`,
        });
        } catch (error) {
        console.error("Error deleting item:", error);
        const librarianId = (req as any).user?.userId;
        const librarianEmail = (req as any).user?.email;
        if (librarianId) {
            await prisma.logs.create({
            data: {
                description: `Delete failed by ${librarianEmail}: ${
                (error as Error).message || "Unknown error"
                }`,
                user_id: librarianId,
            },
            });
        }
        return NextResponse.json(
            {
            success: false,
            message: "Failed to delete item",
            error: (error as Error).message || "Unknown error",
            },
            { status: 500 }
        );
        } finally {
        await prisma.$disconnect();
        }
    }
);
