import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import bcrypt from 'bcryptjs';

const Prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { 
            name, 
            email, 
            password, 
            role, 
            gender, 
            phone_number, 
            birth_date, 
            address 
        } = await req.json();

        // Validate required fields
        if (!name || !email || !password || !role) {
            return NextResponse.json({ 
                error: 'Name, email, password, and role are required' 
            }, { status: 400 });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ 
                error: 'Please enter a valid email address' 
            }, { status: 400 });
        }

        // Validate password strength (at least 6 characters)
        if (password.length < 6) {
            return NextResponse.json({ 
                error: 'Password must be at least 6 characters long' 
            }, { status: 400 });
        }

        // Validate role
        if (!['patron', 'librarian'].includes(role)) {
            return NextResponse.json({ 
                error: 'Invalid role. Must be either patron or librarian' 
            }, { status: 400 });
        }

        // Validate gender if provided
        if (gender && !['male', 'female', 'other'].includes(gender)) {
            return NextResponse.json({ 
                error: 'Invalid gender. Must be male, female, or other' 
            }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await Prisma.users.findUnique({ 
            where: { email: email.toLowerCase() } 
        });
        
        if (existingUser) {
            return NextResponse.json({ 
                error: 'An account with this email already exists' 
            }, { status: 409 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Prepare user data
        const userData: any = {
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password_hash: hashedPassword,
            role: role,
            status: 'active', // Set default status
        };

        // Add optional fields if provided
        if (gender) {
            userData.gender = gender;
        }
        
        if (phone_number && phone_number.trim()) {
            userData.phone_number = phone_number.trim();
        }
        
        if (birth_date) {
            // Convert string to Date object
            userData.birth_date = new Date(birth_date);
        }
        
        if (address && address.trim()) {
            userData.address = address.trim();
        }

        // Create the new user
        const newUser = await Prisma.users.create({
            data: userData,
            select: {
                user_id: true,
                name: true,
                email: true,
                role: true,
                gender: true,
                phone_number: true,
                birth_date: true,
                address: true,
                status: true,
                created_at: true,
            }
        });

        // Create log entry
        await Prisma.logs.create({
            data: {
                description: `New ${role} account created for: ${email}`,
                user_id: newUser.user_id,
            },
        });

        // Return success response without token/cookies
        return NextResponse.json({
            success: true,
            message: `${role.charAt(0).toUpperCase() + role.slice(1)} account created successfully! Please login to continue.`,
            user: {
                id: newUser.user_id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                status: newUser.status,
                created_at: newUser.created_at,
            },
        }, { status: 201 });

    } catch (error) {
        console.error('[REGISTER ERROR]', error);
        
        // Handle Prisma-specific errors
        if (error instanceof Error) {
            if (error.message.includes('Unique constraint')) {
                return NextResponse.json({ 
                    error: 'An account with this email already exists' 
                }, { status: 409 });
            }
        }
        
        return NextResponse.json({ 
            error: 'Something went wrong. Please try again later.' 
        }, { status: 500 });
    } finally {
        // Clean up Prisma connection
        await Prisma.$disconnect();
    }
}