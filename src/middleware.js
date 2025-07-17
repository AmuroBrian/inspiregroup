import { NextResponse } from "next/server";

const ALLOWED_COUNTRIES = new Set(['JP', 'KR', 'KP', 'CN']);

export async function middleware(request) {
  const { nextUrl: url } = request;
  const { pathname } = url;

  // Skip middleware for these paths
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.') || // static files
    pathname === '/not-legal'
  ) {
    return NextResponse.next();
  }

  // For testing: Force allow/disallow certain IPs
  const testIp = request.headers.get('x-test-ip');
  if (testIp) {
    const testCountry = testIp.split('-')[1];
    if (!ALLOWED_COUNTRIES.has(testCountry)) {
      url.pathname = '/not-legal';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Get real IP
  const ip = request.headers.get('x-real-ip') || 
             request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
             request.ip || 
             '8.8.8.8';

  // Allow localhost in development
  if (process.env.NODE_ENV === 'development' && 
      (ip === '127.0.0.1' || ip === '::1')) {
    return NextResponse.next();
  }

  try {
    const apiKey = process.env.IPINFO_API_KEY;
    if (!apiKey) throw new Error('IPINFO_API_KEY missing');

    const response = await fetch(`https://ipinfo.io/${ip}?token=${apiKey}`, {
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) throw new Error(`IP API error: ${response.status}`);

    const geoData = await response.json();
    const countryCode = geoData.country || 'XX';

    if (!ALLOWED_COUNTRIES.has(countryCode)) {
      url.pathname = '/not-legal';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Geo check failed:', error);
    // In production, block access if we can't verify country
    if (process.env.NODE_ENV === 'production') {
      url.pathname = '/not-legal';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|not-legal|.*\\..*).*)',
  ],
};