import { NextResponse } from "next/server";

const ALLOWED_COUNTRIES = new Set(['JP', 'KR', 'KP', 'CN']);

export async function middleware(request) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  // Define the path to your not-legal page
  const NOT_LEGAL_PAGE_PATH = '/not-legal';

  // If the request is already for the not-legal page, let it pass to avoid infinite redirects
  if (pathname === NOT_LEGAL_PAGE_PATH) {
    return NextResponse.next();
  }

  // Skip middleware for essential resources
  if (pathname.startsWith('/api/') ||
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/static/') ||
      pathname.includes('favicon.ico') ||
      pathname.includes('robots.txt')) {
    return NextResponse.next();
  }

  const apiKey = process.env.IPINFO_API_KEY;
  if (!apiKey) {
    console.error("IPINFO_API_KEY is missing");
    // In production, if API key is missing, redirect to not-legal or handle gracefully
    return process.env.NODE_ENV === 'production'
      ? NextResponse.redirect(new URL(NOT_LEGAL_PAGE_PATH, request.url))
      : NextResponse.next();
  }

  let ip = request.headers.get('x-real-ip') ||
           request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
           request.ip ||
           '8.8.8.8';

  // Skip geo check for local/private IPs in development
  if (process.env.NODE_ENV !== 'production') {
    const isPrivateIP = ip === '127.0.0.1' ||
                        ip === '::1' ||
                        ip.startsWith('192.168.') ||
                        ip.startsWith('10.') ||
                        (ip.startsWith('172.') &&
                         parseInt(ip.split('.')[1], 10) >= 16 &&
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
      // If IP API fails, redirect to not-legal in production
      return process.env.NODE_ENV === 'production'
        ? NextResponse.redirect(new URL(NOT_LEGAL_PAGE_PATH, request.url))
        : NextResponse.next();
    }

    const geoData = await response.json();
    const countryCode = geoData.country || 'Unknown';

    if (!ALLOWED_COUNTRIES.has(countryCode)) {
      // Redirect to the not-legal page
      return NextResponse.redirect(new URL(NOT_LEGAL_PAGE_PATH, request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    // In case of any other error, redirect to not-legal in production
    return process.env.NODE_ENV === 'production'
      ? NextResponse.redirect(new URL(NOT_LEGAL_PAGE_PATH, request.url))
      : NextResponse.next();
  }
}

export const config = {
  // Ensure that the not-legal page itself is not caught in the matcher,
  // although we have an explicit check for it at the beginning of the middleware.
  matcher: ['/((?!api|_next/static|_next/image|static|favicon.ico|robots.txt|not-legal).*)'],
};