import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { withRoleAuth, AuthenticatedRequest } from '@/app/utils/authMiddleware';

const prisma = new PrismaClient();

export const POST = withRoleAuth(['patron'])(async (req: AuthenticatedRequest) => {
    try {
        if (!req.user) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const updatedFine = await prisma.fines.updateMany({
            where: { user_id: req.user.userId },
            data: {
                status: 'paid',
                paid_at: new Date(),
            },
        });

        // ✅ Log fine payment success
        await prisma.logs.create({
            data: {
                description: `User (${req.user.email}) paid fine(s) - count: ${updatedFine.count}`,
                user_id: req.user.userId,
            },
        });

        return NextResponse.json({ success: true, fine: updatedFine });

    } catch (error) {
        console.error('Error updating fine status:', error);

        // ❌ Log fine payment failure
        if (req.user) {
            await prisma.logs.create({
                data: {
                    description: `Fine payment failed for ${req.user.email} - Reason: ${error instanceof Error ? error.message : 'Unknown error'}`,
                    user_id: req.user.userId,
                },
            });
        }

        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : 'Failed to update fine' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
});
