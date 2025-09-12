import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/app/utils/jwt";

// Helper: Maps role to dashboard path
const getDashboardPath = (role: string) => {
  if (role === "patron") return "/patron/items";
  if (role === "admin") return "/admin";
  if (role === "librarian") return "/librarian";
  return "/";
};

export default async function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken")?.value;
  const { pathname } = request.nextUrl;

  // Define public routes that don't require authentication
  const publicRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];
  const isPublicRoute = publicRoutes.includes(pathname);

  if (!authToken) {
    // If no auth token and trying to access protected routes, redirect to login
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    // Verify JWT token
    const payload = await verifyToken(authToken);

    if (!payload) {
      // Invalid token, clear it and redirect to login
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.set('authToken', '', {
        path: '/',
        httpOnly: true,
        maxAge: 0,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      return response;
    }

    // Prevent dashboard switching by URL manipulation
    if (pathname.startsWith("/admin") && payload.role !== "admin") {
      return NextResponse.redirect(new URL(getDashboardPath(payload.role), request.url));
    }
    
    if (pathname.startsWith("/librarian") && payload.role !== "librarian") {
      return NextResponse.redirect(new URL(getDashboardPath(payload.role), request.url));
    }
    
    if (pathname.startsWith("/patron") && payload.role !== "patron") {
      return NextResponse.redirect(new URL(getDashboardPath(payload.role), request.url));
    }

    // Redirect authenticated users away from auth pages
    if (isPublicRoute) {
      return NextResponse.redirect(new URL(getDashboardPath(payload.role), request.url));
    }

    // Redirect root path to appropriate dashboard
    if (pathname === "/") {
      return NextResponse.redirect(new URL(getDashboardPath(payload.role), request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
