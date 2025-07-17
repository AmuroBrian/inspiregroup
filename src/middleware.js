import { NextResponse } from "next/server";

// Only Philippines is restricted
const RESTRICTED_COUNTRIES = new Set(['PH']);

export async function middleware(request) {
  const url = request.nextUrl;
  const pathname = url.pathname;
  const NOT_LEGAL_PAGE_PATH = '/not-legal';

  // Skip middleware for essential resources and not-legal page itself
  if (pathname === NOT_LEGAL_PAGE_PATH || 
      pathname.startsWith('/api/') ||
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/static/') ||
      pathname.includes('favicon.ico') ||
      pathname.includes('robots.txt')) {
    return NextResponse.next();
  }

  const apiKey = process.env.IPINFO_API_KEY;
  if (!apiKey) {
    console.error("IPINFO_API_KEY is missing");
    return NextResponse.next(); // Allow access if API key is missing
  }

  let ip = request.headers.get('x-real-ip') ||
           request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
           request.ip ||
           '8.8.8.8';

  // Skip geo check for local/private IPs in development
  if (process.env.NODE_ENV !== 'production') {
    const isPrivateIP = ip === '127.0.0.1' || ip === '::1' || 
                        ip.startsWith('192.168.') || ip.startsWith('10.') ||
                        (ip.startsWith('172.') && parseInt(ip.split('.')[1], 10) >= 16 && 
                         parseInt(ip.split('.')[1], 10) <= 31);
    if (isPrivateIP) {
      return NextResponse.next();
    }
  }

  try {
    const apiUrl = `https://ipinfo.io/${ip}?token=${apiKey}`;
    const response = await fetch(apiUrl, { headers: { 'Accept': 'application/json' } });

    if (!response.ok) {
      console.error(`IP API error: ${response.status} for IP: ${ip}`);
      return NextResponse.next(); // Allow access if API fails
    }

    const geoData = await response.json();
    const countryCode = geoData.country || 'Unknown';

    // Only redirect if country is Philippines
    if (RESTRICTED_COUNTRIES.has(countryCode)) {
      // For root path, rewrite instead of redirect to avoid flash of homepage
      if (pathname === '/') {
        return NextResponse.rewrite(new URL(NOT_LEGAL_PAGE_PATH, request.url));
      }
      return NextResponse.redirect(new URL(NOT_LEGAL_PAGE_PATH, request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.next(); // Allow access if any error occurs
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|static|favicon.ico|robots.txt|not-legal).*)'],
};