import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { withRoleAuth } from '@/app/utils/authMiddleware';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// GET - Fetch all librarians
export const GET = withRoleAuth(['admin'])(async (req: NextRequest) => {
    try {
        const librarians = await prisma.users.findMany({
            where: {
                role: "librarian",
            },
            select: {
                user_id: true,
                name: true,
                email: true,
                status: true,
                created_at: true,
            },
            orderBy: {
                created_at: "desc",
            },
        });

        return NextResponse.json({ success: true, librarians });
    } catch (error) {
        console.error("Error fetching librarians:", error);
        console.error("Error details:", error instanceof Error ? error.message : 'Unknown error');
        return NextResponse.json({ 
            success: false, 
            message: "Failed to fetch librarians",
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

// POST - Add new librarian
export const POST = withRoleAuth(['admin'])(async (req: NextRequest) => {
    try {
        const { name, email, password } = await req.json();

        // Validation
        if (!name || !email || !password) {
            return NextResponse.json({ 
                success: false, 
                message: "Name, email, and password are required" 
            }, { status: 400 });
        }

        if (password.length < 6) {
            return NextResponse.json({ 
                success: false, 
                message: "Password must be at least 6 characters long" 
            }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await prisma.users.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json({ 
                success: false, 
                message: "A user with this email already exists" 
            }, { status: 409 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new librarian
        const newLibrarian = await prisma.users.create({
            data: {
                name,
                email,
                password_hash: hashedPassword,
                role: 'librarian',
                status: 'active'
            },
            select: {
                user_id: true,
                name: true,
                email: true,
                status: true,
                created_at: true,
            }
        });

        // Log the action (optional - skip if logs table has issues)
        try {
            await prisma.logs.create({
                data: {
                    description: `Admin added new librarian: ${name} (${email})`,
                    user_id: req.user!.userId,
                },
            });
        } catch (logError) {
            console.warn('Failed to log action:', logError);
            // Continue without logging
        }

        return NextResponse.json({ 
            success: true, 
            message: "Librarian added successfully",
            librarian: newLibrarian 
        });

    } catch (error) {
        console.error("Error adding librarian:", error);
        console.error("Error details:", error instanceof Error ? error.message : 'Unknown error');
        return NextResponse.json({ 
            success: false, 
            message: "Failed to add librarian",
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