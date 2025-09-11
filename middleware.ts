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

  if (!authToken) {
    // Block access and redirect to login if no auth
    if (
      pathname.startsWith("/admin") ||
      pathname.startsWith("/librarian") ||
      pathname.startsWith("/patron")
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    // Verify JWT token
    const payload = await verifyToken(authToken);
    console.log(payload)

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

    // Redirect authenticated users away from login/register pages
    if (pathname === "/login" || pathname === "/register") {
      return NextResponse.redirect(new URL(getDashboardPath(payload.role), request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/librarian/:path*",
    "/patron/items/:path*",
    "/login",
    "/register",
  ],
};
