import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
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
        return NextResponse.json({ success: false, message: "Failed to fetch librarians" }, { status: 500 });
    }
}
