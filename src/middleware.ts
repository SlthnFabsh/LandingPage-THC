import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SESSION_COOKIE = 'thc_cms_session';
const PUBLIC_PATHS = ['/cms/login', '/cms/login/verify'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublic = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );

  if (pathname === '/cms' || pathname.startsWith('/cms/')) {
    if (isPublic) {
      return NextResponse.next();
    }

    const token = request.cookies.get(SESSION_COOKIE)?.value;

    // Asset request (e.g. favicon) should pass through
    if (pathname.startsWith('/cms/') && pathname.includes('.')) {
      return NextResponse.next();
    }

    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = '/cms/login';
      url.search = '';
      return NextResponse.redirect(url);
    }

    const secret = process.env.SESSION_SECRET;
    if (!secret) {
      const url = request.nextUrl.clone();
      url.pathname = '/cms/login';
      url.search = '';
      return NextResponse.redirect(url);
    }

    try {
      await jwtVerify(token, new TextEncoder().encode(secret));
      return NextResponse.next();
    } catch {
      const url = request.nextUrl.clone();
      url.pathname = '/cms/login';
      url.search = '';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cms/:path*'],
};
