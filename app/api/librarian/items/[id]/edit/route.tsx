/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { withRoleAuth } from '@/app/utils/authMiddleware';
import { library_item_type, item_tran_status, record_status } from '@/generated/prisma';

export const PUT = withRoleAuth(['librarian'])(async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const prisma = new PrismaClient();
    const librarianId = (req as any).user?.userId;
    const librarianEmail = (req as any).user?.email;
    const { id } = await params;
    const itemId = parseInt(id);

    try {
        if (isNaN(itemId)) {
            return NextResponse.json({ success: false, message: 'Invalid item ID' }, { status: 400 });
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
            keywords,
            quantity, // new_quantity to handle copies count
        } = body;

        // Validate required fields
        if (!title || !author || !item_type || quantity === undefined) {
            return NextResponse.json(
                { success: false, message: 'Title, author, item type, and quantity are required fields.' },
                { status: 400 }
            );
        }

        // Validate year if provided
        let yearValue = null;
        if (year) {
            yearValue = Number(year);
            if (isNaN(yearValue) || yearValue < 1800 || yearValue > new Date().getFullYear() + 1) {
                return NextResponse.json(
                    { success: false, message: 'Year must be a valid year between 1800 and next year.' },
                    { status: 400 }
                );
            }
        }

        // Validate quantity
        const newQuantity = Number(quantity);
        if (isNaN(newQuantity) || newQuantity < 1) {
            return NextResponse.json(
                { success: false, message: 'Quantity must be a positive number.' },
                { status: 400 }
            );
        }

        // Validate item type
        if (!Object.values(library_item_type).includes(item_type)) {
            return NextResponse.json({ success: false, message: 'Invalid item type.' }, { status: 400 });
        }

        // Validate multimedia-specific fields
        if (item_type === library_item_type.multimedia && !duration) {
            return NextResponse.json(
                { success: false, message: 'Duration is required for multimedia items.' },
                { status: 400 }
            );
        }

        // Check if item exists and belongs to this librarian
        const existingItem = await prisma.library_items.findFirst({
            where: { item_id: itemId, librarian_id: librarianId, record_status: record_status.active },
        });

        if (!existingItem) {
            return NextResponse.json(
                { success: false, message: 'Item not found or you do not have permission to edit it.' },
                { status: 404 }
            );
        }

        // Check for duplicate items (excluding current item)
        const duplicateItem = await prisma.library_items.findFirst({
            where: {
                title: title.trim(),
                author: author.trim(),
                item_type: item_type,
                item_id: { not: itemId },
                record_status: record_status.active,
            },
        });

        if (duplicateItem) {
            return NextResponse.json(
                { success: false, message: 'An item with this title, author, and type already exists.' },
                { status: 409 }
            );
        }

        // Start transaction to update item and adjust copies accordingly
        const updatedResult = await prisma.$transaction(async (tx) => {
            // Fetch existing copies of the item
            const existingCopies = await tx.item_tran.findMany({
                where: { item_id: itemId, record_status: record_status.active },
                orderBy: { tran_id: 'asc' },
            });

            const oldQuantity = existingCopies.length;

            if (newQuantity === oldQuantity) {
                // Quantity unchanged, just update item metadata
                const updatedItem = await tx.library_items.update({
                    where: { item_id: itemId },
                    data: {
                        title: title.trim(),
                        author: author.trim(),
                        isbn: isbn ? isbn.trim() : null,
                        year: yearValue,
                        genre: genre ? genre.trim() : null,
                        image_url: image_url ? image_url.trim() : null,
                        description: description ? description.trim() : null,
                        item_type: item_type,
                        location: location ? location.trim() : null,
                        publisher: publisher ? publisher.trim() : null,
                        language: language ? language.trim() : null,
                        pages: pages ? parseInt(pages) : null,
                        duration: duration ? parseInt(duration) : null,
                        format: format ? format.trim() : null,
                        subject: subject ? subject.trim() : null,
                        keywords: keywords ? keywords.trim() : null,
                        updated_at: new Date(),
                    },
                });

                return { updatedItem, copiesAdded: 0, copiesInactivated: 0 };
            }

            // Quantity has changed
            if (newQuantity > oldQuantity) {
                // Need to add copies
                const copiesToAdd = newQuantity - oldQuantity;
                const updatedItem = await tx.library_items.update({
                    where: { item_id: itemId },
                    data: {
                        title: title.trim(),
                        author: author.trim(),
                        isbn: isbn ? isbn.trim() : null,
                        year: yearValue,
                        genre: genre ? genre.trim() : null,
                        image_url: image_url ? image_url.trim() : null,
                        description: description ? description.trim() : null,
                        item_type: item_type,
                        location: location ? location.trim() : null,
                        publisher: publisher ? publisher.trim() : null,
                        language: language ? language.trim() : null,
                        pages: pages ? parseInt(pages) : null,
                        duration: duration ? parseInt(duration) : null,
                        format: format ? format.trim() : null,
                        subject: subject ? subject.trim() : null,
                        keywords: keywords ? keywords.trim() : null,
                        updated_at: new Date(),
                    },
                });

                // Create new copies
                const itemCopies = Array.from({ length: copiesToAdd }, () => ({
                    item_id: itemId,
                    status: item_tran_status.available,
                    user_id: null,
                    record_status: record_status.active,
                }));

                await tx.item_tran.createMany({ data: itemCopies });

                return { updatedItem, copiesAdded: copiesToAdd, copiesInactivated: 0 };

            } else {
                // newQuantity < oldQuantity, need to inactivate copies
                const copiesToRemove = oldQuantity - newQuantity;

                // Check how many copies are available (status = available)
                const availableCopies = existingCopies.filter(copy => copy.status === item_tran_status.available);

                if (availableCopies.length < copiesToRemove) {
                    // Not enough available copies to reduce by desired amount
                    throw new Error(
                        `Cannot reduce quantity to ${newQuantity}: at least ${copiesToRemove} copies must be available to inactivate.`
                    );
                }

                // IDs of copies to inactivate - select from available copies, ascending order
                const copiesToInactivateIds = availableCopies.slice(0, copiesToRemove).map(copy => copy.tran_id);

                const updatedItem = await tx.library_items.update({
                    where: { item_id: itemId },
                    data: {
                        title: title.trim(),
                        author: author.trim(),
                        isbn: isbn ? isbn.trim() : null,
                        year: yearValue,
                        genre: genre ? genre.trim() : null,
                        image_url: image_url ? image_url.trim() : null,
                        description: description ? description.trim() : null,
                        item_type: item_type,
                        location: location ? location.trim() : null,
                        publisher: publisher ? publisher.trim() : null,
                        language: language ? language.trim() : null,
                        pages: pages ? parseInt(pages) : null,
                        duration: duration ? parseInt(duration) : null,
                        format: format ? format.trim() : null,
                        subject: subject ? subject.trim() : null,
                        keywords: keywords ? keywords.trim() : null,
                        updated_at: new Date(),
                    },
                });

                // Inactivate the excess copies by setting record_status to inactive
                await tx.item_tran.updateMany({
                    where: { tran_id: { in: copiesToInactivateIds } },
                    data: {
                        record_status: record_status.inactive,
                        status: item_tran_status.not_available,
                    },
                });

                return { updatedItem, copiesAdded: 0, copiesInactivated: copiesToRemove };
            }
        });

        // Logging success
        let logDescription = `Librarian (${librarianEmail}) updated ${updatedResult.updatedItem?.item_type} "${updatedResult.updatedItem?.title}".`;

        if (updatedResult.copiesAdded > 0) {
            logDescription += ` Added ${updatedResult.copiesAdded} copies.`;
        } else if (updatedResult.copiesInactivated > 0) {
            logDescription += ` Inactivated ${updatedResult.copiesInactivated} copies.`;
        }

        await prisma.logs.create({
            data: {
                description: logDescription,
                user_id: librarianId,
            },
        });

        return NextResponse.json({
            success: true,
            message: `Item updated successfully.${updatedResult.copiesAdded > 0 ? ` ${updatedResult.copiesAdded} copies added.` : ''}${updatedResult.copiesInactivated > 0 ? ` ${updatedResult.copiesInactivated} copies inactivated.` : ''
                }`,
            item: updatedResult.updatedItem,
        });

    } catch (error) {
        console.error('Error updating library item:', error);

        if (librarianId) {
            await prisma.logs.create({
                data: {
                    description: `Library item update failed by ${librarianEmail} — Reason: ${error instanceof Error ? error.message : 'Unknown error'
                        }`,
                    user_id: librarianId,
                },
            });
        }

        let errorMessage = 'Server error occurred while updating library item';
        let statusCode = 500;

        if (error instanceof Error) {
            if (error.message.includes('foreign key constraint')) {
                errorMessage = 'Invalid librarian ID provided.';
                statusCode = 400;
            } else if (error.message.includes('Cannot reduce quantity')) {
                errorMessage = error.message;
                statusCode = 400;
            }
        }

        return NextResponse.json({ success: false, message: errorMessage }, { status: statusCode });
    } finally {
        await prisma.$disconnect();
    }
});
