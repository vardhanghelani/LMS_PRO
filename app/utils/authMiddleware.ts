import { verifyToken } from '@/app/utils/jwt';
import { NextResponse } from 'next/server';

export function withAuth(handler: (req: Request & { user?: any }, context?: any) => Promise<NextResponse>) {
    return async (req: any, context?: any) => {
        try {
            const token = req.cookies.get('authToken')?.value;

            if (!token) {
                return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
            }

            const payload = await verifyToken(token);
            if (!payload) {
                return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
            }

            // Attach user info to request
            req.user = payload;

            return handler(req, context);
        } catch (error) {
            console.error('[AUTH MIDDLEWARE ERROR]', error);
            return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
        }
    };
}

export function withRoleAuth(allowedRoles: string[]) {
    return (handler: (req: any, context?: any) => Promise<NextResponse>) => {
        return withAuth(async (req: any, context?: any) => {
            if (!req.user) {
                return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
            }

            if (!allowedRoles.includes(req.user.role)) {
                return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
            }

            return handler(req, context);
        });
    };
}