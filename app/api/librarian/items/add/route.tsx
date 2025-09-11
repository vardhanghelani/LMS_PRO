/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { withRoleAuth } from '@/app/utils/authMiddleware';
import { item_tran_status, record_status, library_item_type } from '@/generated/prisma';

export const POST = withRoleAuth(['librarian'])(async (req: Request) => {
    const prisma = new PrismaClient();
    const librarianId = (req as any).user?.userId;
    const librarianEmail = (req as any).user?.email;

    try {
        const body = await req.json();

        const {
            title,
            author,
            isbn,
            year,
            genre,
            image_url,
            description,
            quantity,
            item_type,
            location,
            publisher,
            language,
            pages,
            duration,
            format,
            subject,
            keywords,
        } = body;

        // ✅ Validate required fields
        if (!title || !author || !librarianId || !quantity || !item_type) {
            return NextResponse.json(
                { success: false, message: 'Title, author, quantity, and item type are required fields.' },
                { status: 400 }
            );
        }

        // ✅ Validate quantity
        const quantityNum = Number(quantity);
        if (isNaN(quantityNum) || quantityNum < 1) {
            return NextResponse.json(
                { success: false, message: 'Quantity must be a positive number.' },
                { status: 400 }
            );
        }

        // ✅ Validate year if provided
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

        // ✅ Validate item type
        if (!Object.values(library_item_type).includes(item_type)) {
            return NextResponse.json(
                { success: false, message: 'Invalid item type.' },
                { status: 400 }
            );
        }

        // ✅ Validate multimedia-specific fields
        if (item_type === library_item_type.multimedia && !duration) {
            return NextResponse.json(
                { success: false, message: 'Duration is required for multimedia items.' },
                { status: 400 }
            );
        }

        const result = await prisma.$transaction(async (tx) => {
            // Step 1: Check if an item exists
            const existingItem = await tx.library_items.findFirst({
                where: {
                    title: title.trim(),
                    author: author.trim(),
                    item_type: item_type,
                },
            });

            if (existingItem) {
                if (existingItem.record_status === record_status.inactive) {
                    // ✅ Reactivate
                    const updatedItem = await tx.library_items.update({
                        where: { item_id: existingItem.item_id },
                        data: {
                            record_status: record_status.active,
                            librarian_id: parseInt(librarianId),
                            updated_at: new Date(),
                        },
                    });

                    const existingCopies = await tx.item_tran.findMany({
                        where: { item_id: existingItem.item_id },
                        orderBy: { tran_id: 'asc' },
                    });

                    const existingCopiesCount = existingCopies.length;
                    let addedCopies = 0;

                    if (existingCopiesCount < quantityNum) {
                        const copiesToAdd = quantityNum - existingCopiesCount;
                        const itemCopies = Array.from({ length: copiesToAdd }, () => ({
                            item_id: existingItem.item_id,
                            status: item_tran_status.available,
                            user_id: null,
                        }));

                        await tx.item_tran.createMany({ data: itemCopies });
                        addedCopies = copiesToAdd;

                        await tx.item_tran.updateMany({
                            where: { item_id: existingItem.item_id },
                            data: { status: item_tran_status.available, record_status: 'active' }
                        });

                    } else if (existingCopiesCount > quantityNum) {
                        const copiesToActivate = existingCopies.slice(0, quantityNum).map(c => c.tran_id);

                        await tx.item_tran.updateMany({
                            where: { tran_id: { in: copiesToActivate } },
                            data: { status: item_tran_status.available }
                        });

                    } else {
                        await tx.item_tran.updateMany({
                            where: { item_id: existingItem.item_id },
                            data: { status: item_tran_status.available }
                        });
                    }

                    return {
                        updatedItem,
                        reactivated: true,
                        addedCopies,
                        totalCopies: Math.max(quantityNum, existingCopiesCount)
                    };
                }
                else {
                    throw new Error('Item already exists in the inventory.');
                }
            }

            // Step 2: Create new item
            const newItem = await tx.library_items.create({
                data: {
                    title: title.trim(),
                    author: author.trim(),
                    isbn: isbn ? isbn.trim() : null,
                    year: yearValue,
                    genre: genre ? genre.trim() : null,
                    image_url: image_url ? image_url.trim() : null,
                    description: description ? description.trim() : null,
                    librarian_id: parseInt(librarianId),
                    item_type: item_type,
                    location: location ? location.trim() : null,
                    publisher: publisher ? publisher.trim() : null,
                    language: language ? language.trim() : null,
                    pages: pages ? parseInt(pages) : null,
                    duration: duration ? parseInt(duration) : null,
                    format: format ? format.trim() : null,
                    subject: subject ? subject.trim() : null,
                    keywords: keywords ? keywords.trim() : null,
                    created_at: new Date(),
                    updated_at: new Date(),
                    record_status: record_status.active,
                },
            });

            // Step 3: Create copies
            const itemCopies = Array.from({ length: quantityNum }, () => ({
                item_id: newItem.item_id,
                status: item_tran_status.available,
                user_id: null,
            }));

            await tx.item_tran.createMany({
                data: itemCopies,
            });

            return { newItem, reactivated: false, totalCopies: quantityNum };
        });

        // ✅ Success logging
        if (result.reactivated) {
            await prisma.logs.create({
                data: {
                    description: `Librarian (${librarianEmail}) reactivated ${result.updatedItem?.item_type} "${result.updatedItem?.title}" — added ${result.addedCopies} copies`,
                    user_id: librarianId,
                },
            });

            return NextResponse.json({
                success: true,
                message: `Inactive item reactivated. ${(result.addedCopies ?? 0) > 0 ? `${result.addedCopies ?? 0} copies added.` : 'No new copies added.'}`,
                item: result.updatedItem,
                totalCopies: result.totalCopies
            });
        }

        await prisma.logs.create({
            data: {
                description: `Librarian (${librarianEmail}) added ${result.newItem?.item_type} "${result.newItem?.title}" with ${result.totalCopies} copies`,
                user_id: librarianId,
            },
        });

        return NextResponse.json({
            success: true,
            message: `${result.newItem!.item_type.charAt(0).toUpperCase() + result.newItem?.item_type.slice(1)} "${result.newItem?.title}" added successfully with ${result.totalCopies} copies.`,
            item: result.newItem,
            quantity: result.totalCopies
        });

    } catch (error) {
        console.error('Error adding/updating library item:', error);

        // ❌ Failure logging
        if (librarianId) {
            await prisma.logs.create({
                data: {
                    description: `Library item add failed by ${librarianEmail} — Reason: ${error instanceof Error ? error.message : 'Unknown error'}`,
                    user_id: librarianId,
                },
            });
        }

        let errorMessage = 'Server error occurred while adding library item';
        let statusCode = 500;

        if (error instanceof Error) {
            if (error.message === 'Item already exists in the inventory.') {
                errorMessage = 'An item with this title, author, and type already exists.';
                statusCode = 409;
            } else if (error.message.includes('foreign key constraint')) {
                errorMessage = 'Invalid librarian ID provided.';
                statusCode = 400;
            }
        }

        return NextResponse.json(
            { success: false, message: errorMessage },
            { status: statusCode }
        );

    } finally {
        await prisma.$disconnect();
    }
});
