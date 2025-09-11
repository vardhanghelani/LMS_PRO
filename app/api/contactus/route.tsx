// /api/contact-us/route.ts (or index.ts)
import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

// GET method to retrieve contact messages
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;

        // Get total count for pagination
        const totalContacts = await prisma.contact_us.count();

        // Get paginated contacts
        const contacts = await prisma.contact_us.findMany({
            skip,
            take: limit,
            orderBy: {
                created_at: 'desc' // Assuming you have a createdAt field
            }
        });

        const totalPages = Math.ceil(totalContacts / limit);

        return NextResponse.json({
            success: true,
            data: contacts,
            pagination: {
                currentPage: page,
                totalPages,
                totalContacts,
                hasNext: page < totalPages,
                hasPrev: page > 1
            }
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch contact messages.' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}

// POST method to create contact message
export async function POST(req: Request) {
    try {
        const { name, email, subject, message } = await req.json();

        if (!email || !message) {
            return NextResponse.json({ error: 'Email and message are required.' }, { status: 400 });
        }

        const newContact = await prisma.contact_us.create({
            data: {
                name,
                email,
                subject,
                message,
            }
        });

        return NextResponse.json({
            success: true,
            contact: newContact
        });
    } catch (error) {
        console.error('Error creating contact:', error);
        return NextResponse.json(
            { error: 'Failed to submit contact message.' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}