import { NextRequest, NextResponse } from 'next/server';

/**
 * Next.js 16 Proxy (replaces middleware.ts)
 * Runs on Node.js runtime before routes are rendered.
 *
 * Responsibility: Route-level redirect for /admin/* paths.
 * NOTE: Full secret validation is intentionally kept in app/admin/layout.tsx
 * (Server Component / RSC layer) — that is the secure boundary per Next.js 16
 * best practices. This proxy only handles the fast-path redirect when the
 * `secret` query param is completely absent, improving UX by avoiding a
 * full page render for obviously unauthenticated requests.
 *
 * Requirements: 8.1, 8.2, 8.3
 */
export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Only intercept /admin routes (not /api/*)
  if (pathname.startsWith('/admin')) {
    const secret = searchParams.get('secret');

    // If secret param is completely absent, redirect to unauthorized page.
    // The actual secret value comparison is done server-side in layout.tsx —
    // never in proxy, to avoid exposing timing or value information at the
    // network boundary.
    if (!secret) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin';
      url.searchParams.set('error', 'unauthorized');
      // Preserve the original destination so the user can re-auth and return
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all /admin/* paths.
     * Exclude Next.js internals and static files so they are never intercepted.
     */
    '/admin/:path*',
  ],
};
