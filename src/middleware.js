import { NextResponse } from 'next/server';

export const config = {
  matcher: '/:path*',
};

export async function middleware(request) {
  const { nextUrl } = request;

  // Skip if already on /not-legal
  if (nextUrl.pathname === '/not-legal') {
    const response = NextResponse.next();
    response.headers.set('x-not-legal', 'true');
    return response;
  }

  // Skip static files and API routes
  if (nextUrl.pathname.startsWith('/_next') || 
      nextUrl.pathname.startsWith('/api') ||
      nextUrl.pathname.startsWith('/favicon.ico')) {
    return NextResponse.next();
  }

  // Force PH IP for testing (remove in production)
  const TEST_IP = '110.54.224.218'; // Philippine IP for testing
  const ip = request.ip || TEST_IP;

  try {
    const response = await fetch(
      `https://ipinfo.io/${ip}/json?token=${process.env.IPINFO_API_KEY}`
    );
    const data = await response.json();
    const country = data.country;

    // BLOCK ONLY PHILIPPINES (PH)
    if (country === 'PH') {
      const blockedResponse = NextResponse.redirect(new URL('/not-legal', request.url));
      blockedResponse.headers.set('x-not-legal', 'true');
      return blockedResponse;
    }

    // ALLOW ALL OTHER COUNTRIES
    return NextResponse.next();

  } catch (error) {
    console.error('Geo-block error:', error);
    // Allow access if geo lookup fails (fail-open)
    return NextResponse.next();
  }
}