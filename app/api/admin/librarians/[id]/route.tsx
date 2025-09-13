import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { withRoleAuth } from '@/app/utils/authMiddleware';

const prisma = new PrismaClient();

// GET - Get librarian details with comprehensive data
export const GET = withRoleAuth(['admin'])(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const resolvedParams = await params;
        const librarianId = parseInt(resolvedParams.id);

        if (isNaN(librarianId)) {
            return NextResponse.json({ 
                success: false, 
                message: "Invalid librarian ID" 
            }, { status: 400 });
        }

        // Get librarian basic info
        const librarian = await prisma.users.findUnique({
            where: { user_id: librarianId },
            select: {
                user_id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                created_at: true
            }
        });

        if (!librarian) {
            return NextResponse.json({ 
                success: false, 
                message: "Librarian not found" 
            }, { status: 404 });
        }

        if (librarian.role !== 'librarian') {
            return NextResponse.json({ 
                success: false, 
                message: "User is not a librarian" 
            }, { status: 400 });
        }

        // Get items managed by this librarian
        const itemsManaged = await prisma.library_items.findMany({
            where: {
                librarian_id: librarianId,
                record_status: 'active'
            },
            select: {
                item_id: true,
                title: true,
                author: true,
                genre: true,
                year: true,
                _count: {
                    select: {
                        item_tran: {
                            where: {
                                record_status: 'active'
                            }
                        }
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        // Get approved transactions by this librarian
        const approvedTransactions = await prisma.item_tran_history.findMany({
            where: {
                approved_by: librarianId,
                status: 'issued'
            },
            select: {
                id: true,
                status: true,
                approved_at: true,
                library_items: {
                    select: {
                        title: true
                    }
                },
                users_item_tran_history_requested_byTousers: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                approved_at: 'desc'
            },
            take: 20
        });

        // Get activity logs for this librarian
        const logs = await prisma.logs.findMany({
            where: {
                user_id: librarianId
            },
            select: {
                log_id: true,
                description: true,
                created_at: true
            },
            orderBy: {
                created_at: 'desc'
            },
            take: 20
        });

        // Get notifications sent by this librarian
        const notificationsSent = await prisma.notifications.findMany({
            where: {
                from_user_id: librarianId
            },
            select: {
                notification_id: true,
                message: true,
                created_at: true
            },
            orderBy: {
                created_at: 'desc'
            },
            take: 10
        });

        // Get notifications received by this librarian
        const notificationsReceived = await prisma.notifications.findMany({
            where: {
                to_user_id: librarianId
            },
            select: {
                notification_id: true,
                message: true,
                created_at: true
            },
            orderBy: {
                created_at: 'desc'
            },
            take: 10
        });

        // Calculate summary statistics
        const summary = {
            totalItemsManaged: itemsManaged.length,
            totalApprovedTransactions: approvedTransactions.length,
            totalLogs: logs.length,
            totalNotifications: notificationsSent.length + notificationsReceived.length
        };

        return NextResponse.json({
            success: true,
            user: librarian,
            librarian: librarian, // Add this for compatibility
            summary,
            itemsManaged,
            approvedTransactions,
            logs,
            notifications: {
                sent: notificationsSent,
                received: notificationsReceived
            }
        });

    } catch (error) {
        console.error("Error fetching librarian details:", error);
        return NextResponse.json({ 
            success: false, 
            message: "Failed to fetch librarian details" 
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
});

// DELETE - Remove librarian
export const DELETE = withRoleAuth(['admin'])(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const resolvedParams = await params;
        const librarianId = parseInt(resolvedParams.id);
        const adminId = req.user!.userId;

        if (isNaN(librarianId)) {
            return NextResponse.json({ 
                success: false, 
                message: "Invalid librarian ID" 
            }, { status: 400 });
        }

        // Check if librarian exists
        const librarian = await prisma.users.findUnique({
            where: { user_id: librarianId },
            select: { 
                user_id: true, 
                name: true, 
                email: true, 
                role: true,
                library_items: {
                    where: {
                        record_status: 'active'
                    },
                    select: { item_id: true, title: true }
                }
            }
        });

        if (!librarian) {
            return NextResponse.json({ 
                success: false, 
                message: "Librarian not found" 
            }, { status: 404 });
        }

        if (librarian.role !== 'librarian') {
            return NextResponse.json({ 
                success: false, 
                message: "User is not a librarian" 
            }, { status: 400 });
        }

        // Check if librarian has any active library items
        if (librarian.library_items.length > 0) {
            return NextResponse.json({ 
                success: false, 
                message: `Cannot remove librarian. They are managing ${librarian.library_items.length} library items. Please reassign these items first.` 
            }, { status: 400 });
        }

        // Prevent admin from removing themselves
        if (librarianId === adminId) {
            return NextResponse.json({ 
                success: false, 
                message: "You cannot remove yourself" 
            }, { status: 400 });
        }

        // Soft delete - set status to inactive instead of hard delete
        await prisma.users.update({
            where: { user_id: librarianId },
            data: { status: 'inactive' }
        });

        // Log the action (optional - skip if logs table has issues)
        try {
            await prisma.logs.create({
                data: {
                    description: `Admin removed librarian: ${librarian.name} (${librarian.email})`,
                    user_id: adminId,
                },
            });
        } catch (logError) {
            console.warn('Failed to log action:', logError);
            // Continue without logging
        }

        return NextResponse.json({ 
            success: true, 
            message: "Librarian removed successfully" 
        });

    } catch (error) {
        console.error("Error removing librarian:", error);
        return NextResponse.json({ 
            success: false, 
            message: "Failed to remove librarian" 
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
});

// PUT - Update librarian information (name, email, status)
export const PUT = withRoleAuth(['admin'])(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const resolvedParams = await params;
        const librarianId = parseInt(resolvedParams.id);
        const { name, email, status } = await req.json();

        if (isNaN(librarianId)) {
            return NextResponse.json({ 
                success: false, 
                message: "Invalid librarian ID" 
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
        if (status && !['active', 'inactive'].includes(status)) {
            return NextResponse.json({ 
                success: false, 
                message: "Invalid status. Must be 'active' or 'inactive'" 
            }, { status: 400 });
        }

        // Check if librarian exists
        const librarian = await prisma.users.findUnique({
            where: { user_id: librarianId },
            select: { 
                user_id: true, 
                name: true, 
                email: true, 
                role: true,
                status: true
            }
        });

        if (!librarian) {
            return NextResponse.json({ 
                success: false, 
                message: "Librarian not found" 
            }, { status: 404 });
        }

        if (librarian.role !== 'librarian') {
            return NextResponse.json({ 
                success: false, 
                message: "User is not a librarian" 
            }, { status: 400 });
        }

        // Check if email is already taken by another user (only if email is being updated)
        if (email !== undefined && email !== librarian.email) {
            const existingUser = await prisma.users.findFirst({
                where: { 
                    email: email,
                    user_id: { not: librarianId }
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

        // Update librarian
        const updatedLibrarian = await prisma.users.update({
            where: { user_id: librarianId },
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
            if (librarian.name !== updatedLibrarian.name) changes.push(`name: ${librarian.name} → ${updatedLibrarian.name}`);
            if (librarian.email !== updatedLibrarian.email) changes.push(`email: ${librarian.email} → ${updatedLibrarian.email}`);
            if (status && librarian.status !== updatedLibrarian.status) changes.push(`status: ${librarian.status} → ${updatedLibrarian.status}`);
            
            if (changes.length > 0) {
                await prisma.logs.create({
                    data: {
                        description: `Admin updated librarian: ${updatedLibrarian.name} (${updatedLibrarian.email}) - ${changes.join(', ')}`,
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
            message: "Librarian updated successfully",
            librarian: updatedLibrarian
        });

    } catch (error) {
        console.error("Error updating librarian status:", error);
        return NextResponse.json({ 
            success: false, 
            message: "Failed to update librarian status" 
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
});