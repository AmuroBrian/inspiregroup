// middleware.js (Located at the project root)
import { NextResponse } from "next/server";

// Define the set of allowed country codes (ISO 3166-1 alpha-2)
const ALLOWED_COUNTRIES = new Set(['JP', 'KR', 'KP', 'CN']);

// Define the path to your not-legal page relative to the base URL
const NOT_LEGAL_PAGE_PATH = '/not-legal';

export async function middleware(request) {
  const url = request.nextUrl;
  const pathname = url.pathname;
  const requestIp = request.ip || 'Unknown IP'; // Get original IP for logging

  // 1. Crucial check to prevent infinite redirect loops:
  // If the request is already for the not-legal page, let it pass through.
  if (pathname === NOT_LEGAL_PAGE_PATH) {
    console.log(`Middleware: Allowing access to ${NOT_LEGAL_PAGE_PATH}`);
    return NextResponse.next();
  }

  // 2. Skip middleware for essential Next.js internal paths and public assets.
  if (pathname.startsWith('/api/') ||
      pathname.startsWith('/_next/static/') ||
      pathname.startsWith('/_next/image/') ||
      pathname.startsWith('/static/') ||
      pathname.includes('favicon.ico') ||
      pathname.includes('robots.txt') ||
      pathname.includes('/logo.svg')) { // Example: if you have specific public images like a logo you want always accessible
    console.log(`Middleware: Bypassing for essential resource: ${pathname}`);
    return NextResponse.next();
  }

  // 3. Check for the IPINFO_API_KEY environment variable.
  const apiKey = process.env.IPINFO_API_KEY;
  if (!apiKey) {
    console.error("Middleware Error: IPINFO_API_KEY is missing. Please set it in your .env.local file.");
    return process.env.NODE_ENV === 'production'
      ? NextResponse.redirect(new URL(NOT_LEGAL_PAGE_PATH, request.url))
      : NextResponse.next(); // Allow in dev for easier debugging if key isn't set
  }

  // 4. Determine the client's IP address.
  let ip = request.headers.get('x-real-ip') ||
           request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
           request.ip ||
           '8.8.8.8'; // Default to a public IP to ensure geo-check runs if no IP is found

  // 5. In development, skip geo-location checks for local/private IP addresses.
  if (process.env.NODE_ENV !== 'production') {
    const isPrivateIP = ip === '127.0.0.1' ||
                        ip === '::1' ||
                        ip.startsWith('192.168.') ||
                        ip.startsWith('10.') ||
                        (ip.startsWith('172.') &&
                         parseInt(ip.split('.')[1], 10) >= 16 &&
                         parseInt(ip.split('.')[1], 10) <= 31);
    
    if (isPrivateIP) {
      console.log(`Middleware: Dev mode - Bypassing geo-check for private IP: ${ip}`);
      return NextResponse.next();
    }
    // TEMPORARY: Force a specific IP for testing non-allowed countries in dev
    // ip = '1.1.1.1'; // Example: Cloudflare DNS, typically US
    // console.log(`Middleware: DEV TEST - FORCING IP to ${ip}`);
  }

  // 6. Attempt to fetch geo-location data from ipinfo.io.
  try {
    console.log(`Middleware: Checking geo-location for IP: ${ip} (Original: ${requestIp})`);
    const apiUrl = `https://ipinfo.io/${ip}?token=${apiKey}`;
    const response = await fetch(apiUrl, { headers: { 'Accept': 'application/json' } });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Middleware Error: IP info API call failed with status ${response.status} for IP ${ip}. Response: ${errorText}`);
      return process.env.NODE_ENV === 'production'
        ? NextResponse.redirect(new URL(NOT_LEGAL_PAGE_PATH, request.url))
        : NextResponse.next();
    }

    const geoData = await response.json();
    const countryCode = geoData.country || 'Unknown'; // Get country code, default to 'Unknown'

    console.log(`Middleware: Detected country for IP ${ip}: ${countryCode}. Allowed countries: ${Array.from(ALLOWED_COUNTRIES).join(', ')}`);

    // 7. Check if the determined country code is in the allowed list.
    if (!ALLOWED_COUNTRIES.has(countryCode)) {
      console.log(`Middleware: Access denied for country: ${countryCode} (IP: ${ip}). Redirecting to ${NOT_LEGAL_PAGE_PATH}.`);
      return NextResponse.redirect(new URL(NOT_LEGAL_PAGE_PATH, request.url));
    }

    // 8. If the country is allowed, allow the request to proceed.
    console.log(`Middleware: Access allowed for country: ${countryCode} (IP: ${ip}).`);
    return NextResponse.next();

  } catch (error) {
    // 9. Catch any other unexpected errors during the geo-location process.
    console.error(`Middleware Error: Unexpected error during geo-check for IP ${ip} and path ${pathname}:`, error);
    return process.env.NODE_ENV === 'production'
      ? NextResponse.redirect(new URL(NOT_LEGAL_PAGE_PATH, request.url))
      : NextResponse.next();
  }
}

// 10. Configure the matcher to specify which paths the middleware should run on.
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|static|favicon.ico|robots.txt|not-legal|logo.svg).*)'],
};