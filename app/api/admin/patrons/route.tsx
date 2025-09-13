import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { withRoleAuth } from '@/app/utils/authMiddleware';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// GET - Fetch all patrons
export const GET = withRoleAuth(['admin'])(async (req: NextRequest) => {
    try {
        const patrons = await prisma.users.findMany({
            where: {
                role: "patron",
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

        return NextResponse.json({ success: true, patrons });
    } catch (error) {
        console.error("Error fetching patrons:", error);
        return NextResponse.json({ success: false, message: "Failed to fetch patrons" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
});

// POST - Add new patron
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

        // Create new patron
        const newPatron = await prisma.users.create({
            data: {
                name,
                email,
                password_hash: hashedPassword,
                role: 'patron',
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
                    description: `Admin added new patron: ${name} (${email})`,
                    user_id: req.user!.userId,
                },
            });
        } catch (logError) {
            console.warn('Failed to log action:', logError);
            // Continue without logging
        }

        return NextResponse.json({ 
            success: true, 
            message: "Patron added successfully",
            patron: newPatron 
        });

    } catch (error) {
        console.error("Error adding patron:", error);
        return NextResponse.json({ 
            success: false, 
            message: "Failed to add patron" 
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
});