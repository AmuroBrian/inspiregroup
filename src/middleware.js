import { NextResponse } from "next/server";

const RESTRICTED_COUNTRY = 'PH'; // Only Philippines is blocked

export async function middleware(request) {
  const { nextUrl: url, headers } = request;
  const NOT_LEGAL_PAGE = '/not-legal';
  
  // Skip middleware for non-page requests & not-legal page itself
  if (
    url.pathname === NOT_LEGAL_PAGE ||
    url.pathname.startsWith('/_next/') ||
    url.pathname.startsWith('/api/') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 1. Get IP (with fallback for local testing)
  let ip = headers.get('x-real-ip') || 
           headers.get('x-forwarded-for')?.split(',')[0].trim() || 
           '8.8.8.8'; // Default to a US IP for testing

  // 2. Skip geo-check in development (optional)
  if (process.env.NODE_ENV === 'development') {
    const isLocalIP = ip === '127.0.0.1' || ip === '::1';
    if (isLocalIP) return NextResponse.next();
  }

  // 3. Fetch country from IP
  try {
    const apiKey = process.env.IPINFO_API_KEY;
    if (!apiKey) throw new Error("IPINFO_API_KEY missing");

    const apiUrl = `https://ipinfo.io/${ip}?token=${apiKey}`;
    const res = await fetch(apiUrl, { headers: { 'Accept': 'application/json' } });
    const { country } = await res.json();

    // 4. BLOCK PHILIPPINES (Rewrite to /not-legal)
    if (country === RESTRICTED_COUNTRY) {
      return NextResponse.rewrite(new URL(NOT_LEGAL_PAGE, url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Geo-block error:", error);
    return NextResponse.next(); // Allow access if API fails
  }
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|robots.txt|not-legal).*)'],
};