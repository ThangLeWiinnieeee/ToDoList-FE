import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Public routes (không cần auth)
  const publicRoutes = ['/login', '/register', '/'];

  // Protected routes (cần auth)
  const protectedRoutes = ['/todos'];

  // Nếu user có token và đang ở trang auth → redirect đến /todos
  if (token && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/todos', request.url));
  }

  // Nếu user không có token và đang ở protected route → redirect đến /login
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
