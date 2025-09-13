import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { withRoleAuth } from '@/app/utils/authMiddleware';

const prisma = new PrismaClient();

// GET - Get patron details
export const GET = withRoleAuth(['admin'])(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const resolvedParams = await params;
        const patronId = parseInt(resolvedParams.id);

        if (isNaN(patronId)) {
            return NextResponse.json({ 
                success: false, 
                message: "Invalid patron ID" 
            }, { status: 400 });
        }

        // Get patron comprehensive info
        const patron = await prisma.users.findUnique({
            where: { user_id: patronId },
            include: {
                fines: {
                    orderBy: { created_at: 'desc' },
                    take: 20
                },
                item_tran_history_item_tran_history_requested_byTousers: {
                    include: {
                        library_items: {
                            select: {
                                title: true,
                                author: true
                            }
                        }
                    },
                    orderBy: { requested_at: 'desc' },
                    take: 50
                },
                user_wishlist: {
                    include: {
                        library_items: {
                            select: {
                                title: true,
                                author: true
                            }
                        }
                    },
                    orderBy: { created_at: 'desc' }
                },
                logs: {
                    orderBy: { created_at: 'desc' },
                    take: 30
                },
                notifications_notifications_to_user_idTousers: {
                    orderBy: { created_at: 'desc' },
                    take: 20
                },
                notifications_notifications_from_user_idTousers: {
                    orderBy: { created_at: 'desc' },
                    take: 20
                }
            }
        });

        if (!patron) {
            return NextResponse.json({ 
                success: false, 
                message: "Patron not found" 
            }, { status: 404 });
        }

        if (patron.role !== 'patron') {
            return NextResponse.json({ 
                success: false, 
                message: "User is not a patron" 
            }, { status: 400 });
        }

        // Calculate statistics
        const totalIssued = patron.item_tran_history_item_tran_history_requested_byTousers.length;
        const totalReturned = patron.item_tran_history_item_tran_history_requested_byTousers.filter(item => item.status === 'returned').length;
        const totalFines = patron.fines.reduce((sum, fine) => sum + parseFloat(fine.amount?.toString() || '0'), 0).toFixed(2);
        const currentIssuedItems = patron.item_tran_history_item_tran_history_requested_byTousers
            .filter(item => item.status === 'issued')
            .map(item => ({
                id: item.id,
                date_due: item.date_due,
                library_items: item.library_items
            }));

        // Add stats to patron object
        const patronWithStats = {
            ...patron,
            stats: {
                totalIssued,
                totalReturned,
                totalFines,
                currentIssuedItems
            }
        };

        return NextResponse.json({
            success: true,
            user: patronWithStats,
            patron: patronWithStats // Add this for compatibility
        });

    } catch (error) {
        console.error("Error fetching patron details:", error);
        return NextResponse.json({ 
            success: false, 
            message: "Failed to fetch patron details" 
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
});

// DELETE - Remove patron
export const DELETE = withRoleAuth(['admin'])(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const resolvedParams = await params;
        const patronId = parseInt(resolvedParams.id);
        const adminId = req.user!.userId;

        if (isNaN(patronId)) {
            return NextResponse.json({ 
                success: false, 
                message: "Invalid patron ID" 
            }, { status: 400 });
        }

        // Check if patron exists
        const patron = await prisma.users.findUnique({
            where: { user_id: patronId },
            select: { 
                user_id: true, 
                name: true, 
                email: true, 
                role: true,
                item_tran_history_item_tran_history_requested_byTousers: {
                    where: {
                        status: {
                            in: ['pending', 'issued']
                        }
                    },
                    select: { id: true }
                }
            }
        });

        if (!patron) {
            return NextResponse.json({ 
                success: false, 
                message: "Patron not found" 
            }, { status: 404 });
        }

        if (patron.role !== 'patron') {
            return NextResponse.json({ 
                success: false, 
                message: "User is not a patron" 
            }, { status: 400 });
        }

        // Check if patron has any active loans
        if (patron.item_tran_history_item_tran_history_requested_byTousers.length > 0) {
            return NextResponse.json({ 
                success: false, 
                message: `Cannot remove patron. They have ${patron.item_tran_history_item_tran_history_requested_byTousers.length} active loans. Please ensure all items are returned first.` 
            }, { status: 400 });
        }

        // Prevent admin from removing themselves
        if (patronId === adminId) {
            return NextResponse.json({ 
                success: false, 
                message: "You cannot remove yourself" 
            }, { status: 400 });
        }

        // Soft delete - set status to banned instead of hard delete
        await prisma.users.update({
            where: { user_id: patronId },
            data: { status: 'banned' }
        });

        // Log the action (optional - skip if logs table has issues)
        try {
            await prisma.logs.create({
                data: {
                    description: `Admin removed patron: ${patron.name} (${patron.email})`,
                    user_id: adminId,
                },
            });
        } catch (logError) {
            console.warn('Failed to log action:', logError);
            // Continue without logging
        }

        return NextResponse.json({ 
            success: true, 
            message: "Patron removed successfully" 
        });

    } catch (error) {
        console.error("Error removing patron:", error);
        return NextResponse.json({ 
            success: false, 
            message: "Failed to remove patron" 
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
});

// PUT - Update patron information (name, email, status)
export const PUT = withRoleAuth(['admin'])(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const resolvedParams = await params;
        const patronId = parseInt(resolvedParams.id);
        const { name, email, status } = await req.json();

        if (isNaN(patronId)) {
            return NextResponse.json({ 
                success: false, 
                message: "Invalid patron ID" 
            }, { status: 400 });
        }

        // Validate required fields only if name or email is provided
        if ((name !== undefined && !name) || (email !== undefined && !email)) {
            return NextResponse.json({ 
                success: false, 
                message: "Name and email cannot be empty" 
            }, { status: 400 });
        }

        // Validate status if provided
        if (status && !['active', 'banned'].includes(status)) {
            return NextResponse.json({ 
                success: false, 
                message: "Invalid status. Must be 'active' or 'banned'" 
            }, { status: 400 });
        }

        // Check if patron exists
        const patron = await prisma.users.findUnique({
            where: { user_id: patronId },
            select: { 
                user_id: true, 
                name: true, 
                email: true, 
                role: true,
                status: true
            }
        });

        if (!patron) {
            return NextResponse.json({ 
                success: false, 
                message: "Patron not found" 
            }, { status: 404 });
        }

        if (patron.role !== 'patron') {
            return NextResponse.json({ 
                success: false, 
                message: "User is not a patron" 
            }, { status: 400 });
        }

        // Check if email is already taken by another user (only if email is being updated)
        if (email !== undefined && email !== patron.email) {
            const existingUser = await prisma.users.findFirst({
                where: { 
                    email: email,
                    user_id: { not: patronId }
                }
            });

            if (existingUser) {
                return NextResponse.json({ 
                    success: false, 
                    message: "Email is already taken by another user" 
                }, { status: 400 });
            }
        }

        // Prepare update data
        const updateData: any = {};

        // Only update fields that are provided
        if (name !== undefined) {
            updateData.name = name.trim();
        }
        if (email !== undefined) {
            updateData.email = email.trim();
        }
        if (status) {
            updateData.status = status;
        }

        // Update patron
        const updatedPatron = await prisma.users.update({
            where: { user_id: patronId },
            data: updateData,
            select: {
                user_id: true,
                name: true,
                email: true,
                status: true
            }
        });

        // Log the action (optional - skip if logs table has issues)
        try {
            const changes = [];
            if (patron.name !== updatedPatron.name) changes.push(`name: ${patron.name} → ${updatedPatron.name}`);
            if (patron.email !== updatedPatron.email) changes.push(`email: ${patron.email} → ${updatedPatron.email}`);
            if (status && patron.status !== updatedPatron.status) changes.push(`status: ${patron.status} → ${updatedPatron.status}`);
            
            if (changes.length > 0) {
                await prisma.logs.create({
                    data: {
                        description: `Admin updated patron: ${updatedPatron.name} (${updatedPatron.email}) - ${changes.join(', ')}`,
                        user_id: req.user!.userId,
                    },
                });
            }
        } catch (logError) {
            console.warn('Failed to log action:', logError);
            // Continue without logging
        }

        return NextResponse.json({ 
            success: true, 
            message: "Patron updated successfully",
            user: updatedPatron,
            patron: updatedPatron // Add this for compatibility
        });

    } catch (error) {
        console.error("Error updating patron status:", error);
        return NextResponse.json({ 
            success: false, 
            message: "Failed to update patron status" 
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
});