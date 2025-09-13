import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
    try {
        console.log('Testing database connection...');
        
        // Test basic connection
        await prisma.$connect();
        console.log('Database connection successful');
        
        // Test a simple query
        const result = await prisma.$queryRaw`SELECT 1 as test`;
        console.log('Query result:', result);
        
        // Test users table
        const userCount = await prisma.users.count();
        console.log('User count:', userCount);
        
        return NextResponse.json({
            success: true,
            message: 'Database connection successful',
            data: {
                queryResult: result,
                userCount,
                timestamp: new Date().toISOString()
            }
        });
        
    } catch (error) {
        console.error('Database test error:', error);
        console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
        
        return NextResponse.json({
            success: false,
            message: 'Database connection failed',
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined,
        }, { status: 500 });
        
    } finally {
        try {
            await prisma.$disconnect();
        } catch (disconnectError) {
            console.error('Error disconnecting from database:', disconnectError);
        }
    }
}
