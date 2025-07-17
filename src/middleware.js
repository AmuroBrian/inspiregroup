// middleware.js
import { NextResponse } from "next/server";

// Define the set of allowed country codes (ISO 3166-1 alpha-2)
const ALLOWED_COUNTRIES = new Set(['JP', 'KR', 'KP', 'CN']);

// Define the path to your not-legal page relative to the base URL
const NOT_LEGAL_PAGE_PATH = '/not-legal';

export async function middleware(request) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  // 1. Crucial check to prevent infinite redirect loops:
  // If the request is already for the not-legal page, let it pass through.
  if (pathname === NOT_LEGAL_PAGE_PATH) {
    return NextResponse.next();
  }

  // 2. Skip middleware for essential Next.js internal paths and public assets.
  // These resources should always be accessible regardless of geo-location.
  if (pathname.startsWith('/api/') ||
      pathname.startsWith('/_next/static/') || // Next.js static files (JS, CSS, images)
      pathname.startsWith('/_next/image/') ||  // Next.js optimized images
      pathname.startsWith('/static/') ||      // Your custom static assets if any (e.g., /public/static)
      pathname.includes('favicon.ico') ||     // Favicon
      pathname.includes('robots.txt') ||      // robots.txt
      pathname.includes('/logo.svg')) {       // Example: if you have specific public images like a logo you want always accessible
    return NextResponse.next();
  }

  // 3. Check for the IPINFO_API_KEY environment variable.
  const apiKey = process.env.IPINFO_API_KEY;
  if (!apiKey) {
    console.error("IPINFO_API_KEY is missing in middleware. Please set it in your .env.local file.");
    // In production, if the API key is missing, redirect to the not-legal page.
    // In development, allow access to simplify local testing without API key setup.
    return process.env.NODE_ENV === 'production'
      ? NextResponse.redirect(new URL(NOT_LEGAL_PAGE_PATH, request.url))
      : NextResponse.next();
  }

  // 4. Determine the client's IP address.
  let ip = request.headers.get('x-real-ip') ||
           request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
           request.ip ||
           '8.8.8.8'; // Defaulting to a public IP to ensure geo-check runs

  // 5. In development, skip geo-location checks for local/private IP addresses.
  if (process.env.NODE_ENV !== 'production') {
    const isPrivateIP = ip === '127.0.0.1' ||
                        ip === '::1' || // IPv6 localhost
                        ip.startsWith('192.168.') ||
                        ip.startsWith('10.') ||
                        (ip.startsWith('172.') &&
                         parseInt(ip.split('.')[1], 10) >= 16 &&
                         parseInt(ip.split('.')[1], 10) <= 31); // 172.16.0.0/12 range
    
    if (isPrivateIP) {
      console.log(`Development mode: Bypassing geo-check for private IP: ${ip}`);
      return NextResponse.next();
    }
  }

  // 6. Attempt to fetch geo-location data from ipinfo.io.
  try {
    const apiUrl = `https://ipinfo.io/${ip}?token=${apiKey}`;
    const response = await fetch(apiUrl, { headers: { 'Accept': 'application/json' } });

    // If the IP info API call fails (e.g., rate limit, invalid token, network issue).
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`IP API error: ${response.status} for IP: ${ip}. Response: ${errorText}`);
      // In production, redirect to not-legal page on API errors.
      // In development, allow to proceed for debugging.
      return process.env.NODE_ENV === 'production'
        ? NextResponse.redirect(new URL(NOT_LEGAL_PAGE_PATH, request.url))
        : NextResponse.next();
    }

    const geoData = await response.json();
    const countryCode = geoData.country || 'Unknown'; // Get country code, default to 'Unknown'

    // 7. Check if the determined country code is in the allowed list.
    if (!ALLOWED_COUNTRIES.has(countryCode)) {
      console.log(`Access denied for country: ${countryCode} (IP: ${ip}) accessing ${pathname}`);
      // If not allowed, redirect the user to the not-legal page.
      return NextResponse.redirect(new URL(NOT_LEGAL_PAGE_PATH, request.url));
    }

    // 8. If the country is allowed, allow the request to proceed to its destination.
    console.log(`Access allowed for country: ${countryCode} (IP: ${ip}) accessing ${pathname}`);
    return NextResponse.next();

  } catch (error) {
    // 9. Catch any other unexpected errors during the geo-location process (e.g., network issues).
    console.error(`Unexpected error in middleware for IP ${ip} and path ${pathname}:`, error);
    // In production, redirect to not-legal page on any uncaught error.
    // In development, allow to proceed for debugging.
    return process.env.NODE_ENV === 'production'
      ? NextResponse.redirect(new URL(NOT_LEGAL_PAGE_PATH, request.url))
      : NextResponse.next();
  }
}

// 10. Configure the matcher to specify which paths the middleware should run on.
// This regex ensures the middleware processes all routes EXCEPT:
// - API routes (/api/*)
// - Next.js internal static assets (/_next/static/*, /_next/image/*)
// - Any custom /static/ folder you might have in /public
// - Common root files (favicon.ico, robots.txt)
// - And most importantly, your /not-legal page itself, to prevent redirects on the destination page.
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|static|favicon.ico|robots.txt|not-legal|logo.svg).*)'],
};