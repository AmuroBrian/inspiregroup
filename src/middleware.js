// middleware.js
import { NextResponse } from "next/server";

// Define the set of allowed country codes (ISO 3166-1 alpha-2)
const ALLOWED_COUNTRIES = new Set(['JP', 'KR', 'KP', 'CN']);

// Define the path to your not-legal page relative to the base URL
const NOT_LEGAL_PAGE_PATH = '/not-legal';

export async function middleware(request) {
  const url = request.nextUrl;
  const pathname = url.pathname;
  // Get the original IP from the request for logging purposes, falling back if not present
  const requestIp = request.ip || request.headers.get('x-forwarded-for') || 'Unknown IP';

  // --- Start of Middleware Logic ---

  // 1. Crucial check to prevent infinite redirect loops:
  // If the request is already for the not-legal page, allow it to proceed.
  if (pathname === NOT_LEGAL_PAGE_PATH) {
    console.log(`[Middleware] Allowing access to the Not Legal Page: ${pathname}`);
    return NextResponse.next();
  }

  // 2. Skip middleware for essential Next.js internal paths and public assets.
  // These resources should always be accessible regardless of geo-location.
  // Add any other specific static paths if you have them (e.g., /public/assets/...)
  if (pathname.startsWith('/api/') ||           // API routes
      pathname.startsWith('/_next/static/') ||  // Next.js static files (JS, CSS, fonts, etc.)
      pathname.startsWith('/_next/image/') ||   // Next.js optimized images
      pathname.startsWith('/static/') ||        // Common custom static assets in 'public/static'
      pathname.includes('favicon.ico') ||       // Favicon
      pathname.includes('robots.txt') ||        // robots.txt
      // Add specific critical public files if they exist and must always be accessible
      pathname.includes('/logo.svg')) {         // Example: a specific logo file in /public
    console.log(`[Middleware] Bypassing geo-check for essential resource: ${pathname}`);
    return NextResponse.next();
  }

  // 3. Check for the IPINFO_API_KEY environment variable.
  // This key is vital for fetching geo-location data.
  const apiKey = process.env.IPINFO_API_KEY;
  if (!apiKey) {
    console.error("[Middleware Error] IPINFO_API_KEY is missing. Please set it in your .env.local file.");
    // In a production environment, if the API key is missing, redirect to the not-legal page.
    // In development, allow access to simplify local testing if the key isn't set yet.
    return process.env.NODE_ENV === 'production'
      ? NextResponse.redirect(new URL(NOT_LEGAL_PAGE_PATH, request.url))
      : NextResponse.next();
  }

  // 4. Determine the client's IP address.
  // Prioritize headers often set by proxies/load balancers, then Next.js's request.ip.
  // '8.8.8.8' is a fallback to ensure the geo-check runs even if no IP is explicitly found,
  // it will default to a public IP that is likely not in your allowed list.
  let ip = request.headers.get('x-real-ip') ||
           request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
           request.ip ||
           '8.8.8.8'; // Fallback public IP

  // 5. In development mode, skip geo-location checks for local/private IP addresses.
  // This prevents unnecessary API calls and makes local development seamless.
  if (process.env.NODE_ENV !== 'production') {
    const isPrivateIP = ip === '127.0.0.1' || // IPv4 localhost
                        ip === '::1' ||      // IPv6 localhost
                        ip.startsWith('192.168.') || // Private network A
                        ip.startsWith('10.') ||      // Private network B
                        (ip.startsWith('172.') &&    // Private network C (172.16.0.0/12)
                         parseInt(ip.split('.')[1], 10) >= 16 &&
                         parseInt(ip.split('.')[1], 10) <= 31);
    
    if (isPrivateIP) {
      console.log(`[Middleware] Development mode: Bypassing geo-check for private/local IP: ${ip}`);
      return NextResponse.next();
    }

    // --- OPTIONAL FOR DEVELOPMENT TESTING: FORCE A SPECIFIC IP ---
    // Uncomment the line below to simulate an IP from an unallowed country
    // (e.g., '1.1.1.1' is Cloudflare DNS, usually in the US, which is not in ALLOWED_COUNTRIES)
    // ip = '1.1.1.1';
    // console.log(`[Middleware] DEV TEST: FORCING IP to ${ip} for unallowed country simulation.`);
    // --- END OPTIONAL DEVELOPMENT TESTING ---
  }

  // 6. Attempt to fetch geo-location data from ipinfo.io.
  try {
    console.log(`[Middleware] Performing geo-check for IP: ${ip} (Original request IP: ${requestIp}) for path: ${pathname}`);
    const apiUrl = `https://ipinfo.io/${ip}?token=${apiKey}`;
    const response = await fetch(apiUrl, { headers: { 'Accept': 'application/json' } });

    // If the IP info API call fails (e.g., rate limit, invalid token, network issue, bad IP).
    if (!response.ok) {
      const errorDetails = await response.text(); // Get response body for more info
      console.error(`[Middleware Error] IP info API call failed with status ${response.status} for IP: ${ip}. Details: ${errorDetails}`);
      // In production, an API failure should lead to the restricted page to be safe.
      // In development, allow the request to proceed for easier debugging of API issues.
      return process.env.NODE_ENV === 'production'
        ? NextResponse.redirect(new URL(NOT_LEGAL_PAGE_PATH, request.url))
        : NextResponse.next();
    }

    const geoData = await response.json();
    const countryCode = geoData.country || 'Unknown'; // Extract country code, default if not found

    console.log(`[Middleware] Detected country for IP ${ip}: ${countryCode}. Requested path: ${pathname}`);

    // 7. Check if the determined country code is in the allowed list.
    if (!ALLOWED_COUNTRIES.has(countryCode)) {
      console.warn(`[Middleware] ACCESS DENIED: Country ${countryCode} (IP: ${ip}) is not allowed. Redirecting to ${NOT_LEGAL_PAGE_PATH}.`);
      // If the country is NOT allowed, immediately redirect the user to the not-legal page.
      return NextResponse.redirect(new URL(NOT_LEGAL_PAGE_PATH, request.url));
    }

    // 8. If the country IS allowed, allow the request to proceed to its original destination.
    console.log(`[Middleware] ACCESS ALLOWED: Country ${countryCode} (IP: ${ip}). Proceeding to ${pathname}.`);
    return NextResponse.next();

  } catch (error) {
    // 9. Catch any other unexpected errors during the entire middleware process (e.g., network errors before fetch completes).
    console.error(`[Middleware Error] An unexpected error occurred for IP ${ip} and path ${pathname}:`, error);
    // In production, any unhandled error should also lead to the restricted page for safety and consistency.
    // In development, allow to proceed for debugging.
    return process.env.NODE_ENV === 'production'
      ? NextResponse.redirect(new URL(NOT_LEGAL_PAGE_PATH, request.url))
      : NextResponse.next();
  }
}

// 10. Configure the matcher to specify which paths the middleware should run on.
// The regex pattern ensures the middleware applies to all routes EXCEPT:
// - API routes (/api/...)
// - Next.js internal static assets (/_next/static/..., /_next/image/...)
// - Any custom '/static/' folder you might have in your 'public' directory
// - Common root files like 'favicon.ico' and 'robots.txt'
// - And critically, the '/not-legal' page itself, to prevent it from being caught in a loop.
// - Add any other specific public files (like '/logo.svg') you want to explicitly exclude from the middleware.
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|static|favicon.ico|robots.txt|not-legal|logo.svg).*)'],
};