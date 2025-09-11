import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { withRoleAuth } from '@/app/utils/authMiddleware';

const prisma = new PrismaClient();

export const GET = withRoleAuth(['admin'])(async (req) => {
    try {
        const configs = await prisma.system_config.findMany({
            orderBy: {
                config_key: 'asc'
            }
        });

        const formattedConfigs = configs.reduce((acc, config) => {
            acc[config.config_key] = {
                value: config.config_value,
                description: config.description,
                updated_at: config.updated_at
            };
            return acc;
        }, {} as any);

        return NextResponse.json({ success: true, configs: formattedConfigs });
    } catch (error) {
        console.error('Error fetching system configuration:', error);
        return NextResponse.json({ 
            success: false, 
            message: 'Failed to fetch system configuration',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
});

export const POST = withRoleAuth(['admin'])(async (req) => {
    try {
        const adminId = req.user!.userId;
        const adminEmail = req.user!.email;
        const body = await req.json();

        const { config_key, config_value, description } = body;

        if (!config_key || config_value === undefined) {
            return NextResponse.json(
                { success: false, message: 'Config key and value are required' },
                { status: 400 }
            );
        }

        const config = await prisma.system_config.upsert({
            where: { config_key },
            update: {
                config_value,
                description: description || null,
                updated_at: new Date()
            },
            create: {
                config_key,
                config_value,
                description: description || null
            }
        });

        await prisma.logs.create({
            data: {
                description: `Admin (${adminEmail}) updated system configuration: ${config_key}`,
                user_id: adminId,
            },
        });

        return NextResponse.json({
            success: true,
            message: 'System configuration updated successfully',
            config
        });

    } catch (error) {
        console.error('Error updating system configuration:', error);
        return NextResponse.json({ 
            success: false, 
            message: 'Failed to update system configuration',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
});
