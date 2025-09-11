import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
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
    }
}
