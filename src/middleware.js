import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Public routes (no auth required)
  const publicRoutes = ['/login', '/register', '/'];

  // Protected routes (requires auth)
  const protectedRoutes = ['/todos'];

  // If user has token and is on auth page → redirect to /todos
  if (token && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/todos', request.url));
  }

  // If user has no token and is on protected route → redirect to /login
  if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', request.url));
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
