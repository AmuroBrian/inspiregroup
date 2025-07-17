// middleware.js
import { NextResponse } from "next/server";

// Define the set of allowed country codes (ISO 3166-1 alpha-2)
const ALLOWED_COUNTRIES = new Set(['JP', 'KR', 'KP', 'CN']);

// Define the path to your not-legal page relative to the base URL
const NOT_LEGAL_PAGE_PATH = '/not-legal';

export async function middleware(request) {
  // --- ABSOLUTE FIRST LOG ---
  // This log should ALWAYS appear if the middleware file is found and run by Next.js.
  console.log(`[Middleware Check] Middleware STARTED for path: ${request.nextUrl.pathname} at ${new Date().toISOString()}`);

  const url = request.nextUrl;
  const pathname = url.pathname;
  // Attempt to get the real IP from various headers or request.ip
  const requestIp = request.headers.get('x-real-ip') ||
                    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
                    request.ip ||
                    'Unknown/Fallback IP';

  console.log(`[Middleware] Processing request for: ${pathname} from IP: ${requestIp}`);

  // 1. Prevent infinite redirect loops:
  // If the request is already for the not-legal page, allow it to proceed.
  if (pathname === NOT_LEGAL_PAGE_PATH) {
    console.log(`[Middleware] Allowing direct access to the Not Legal Page: ${pathname}`);
    return NextResponse.next();
  }

  // 2. Skip middleware for essential Next.js internal paths and public assets.
  // This prevents unnecessary API calls and ensures your app's core assets load.
  if (pathname.startsWith('/api/') ||           // API routes
      pathname.startsWith('/_next/static/') ||  // Next.js static files (JS, CSS, fonts)
      pathname.startsWith('/_next/image/') ||   // Next.js optimized images
      pathname.startsWith('/static/') ||        // Common custom static assets (e.g., in 'public/static')
      pathname.includes('favicon.ico') ||       // Favicon
      pathname.includes('robots.txt') ||        // robots.txt
      pathname.includes('/logo.svg') ||         // Example: a specific logo file in /public
      pathname.includes('.woff') ||             // Common font files
      pathname.includes('.woff2') ||
      pathname.includes('.ttf') ||
      pathname.includes('.eot') ||
      pathname.includes('.css') ||              // Explicitly allow CSS, though _next/static should cover
      pathname.includes('.js') ||               // Explicitly allow JS, though _next/static should cover
      pathname.includes('.map')                 // Source maps
      ) {
    console.log(`[Middleware] Bypassing geo-check for essential resource/asset: ${pathname}`);
    return NextResponse.next();
  }

  // 3. Check for the IPINFO_API_KEY environment variable.
  const apiKey = process.env.IPINFO_API_KEY;
  if (!apiKey) {
    console.error("[Middleware Error] IPINFO_API_KEY is missing. Environment variable value: " + process.env.IPINFO_API_KEY + ". Please set it in your .env.local file.");
    // In production, if the API key is missing, redirect to the not-legal page for safety.
    // In development, allow access to simplify local testing if the key isn't set yet.
    return process.env.NODE_ENV === 'production'
      ? NextResponse.redirect(new URL(NOT_LEGAL_PAGE_PATH, request.url))
      : NextResponse.next();
  } else {
    // Log a partial key for security, confirm it's read
    console.log("[Middleware] IPINFO_API_KEY is detected (first 5 chars): " + apiKey.substring(0, 5) + "...");
  }

  // 4. Determine the IP address to use for geo-lookup.
  // Use the derived 'ip' for the API call.
  let ipToLookup = ip; // Start with the determined request IP

  // 5. In development mode, skip geo-location checks for local/private IP addresses.
  if (process.env.NODE_ENV !== 'production') {
    const isPrivateIP = ipToLookup === '127.0.0.1' || // IPv4 localhost
                        ipToLookup === '::1' ||      // IPv6 localhost
                        ipToLookup.startsWith('192.168.') || // Private network A
                        ipToLookup.startsWith('10.') ||      // Private network B
                        (ipToLookup.startsWith('172.') &&    // Private network C (172.16.0.0/12)
                         parseInt(ipToLookup.split('.')[1], 10) >= 16 &&
                         parseInt(ipToLookup.split('.')[1], 10) <= 31);
    
    if (isPrivateIP) {
      console.log(`[Middleware] Development mode: Bypassing geo-check for private/local IP: ${ipToLookup}`);
      return NextResponse.next();
    }

    // --- OPTIONAL FOR DEVELOPMENT TESTING: FORCE A SPECIFIC IP ---
    // Uncomment the line below to simulate an IP from an unallowed country
    // (e.g., '1.1.1.1' is Cloudflare DNS, usually in the US, not in ALLOWED_COUNTRIES)
    // ipToLookup = '1.1.1.1';
    // console.log(`[Middleware] DEV TEST: FORCING IP to ${ipToLookup} for unallowed country simulation.`);
    // --- END OPTIONAL DEVELOPMENT TESTING ---
  }

  // 6. Attempt to fetch geo-location data from ipinfo.io.
  try {
    const apiUrl = `https://ipinfo.io/${ipToLookup}?token=${apiKey}`;
    console.log(`[Middleware] Attempting fetch to IPInfo API for IP: ${ipToLookup}. URL (partial): ${apiUrl.substring(0, apiUrl.indexOf('?'))}?token=...`);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5-second timeout for fetch

    const response = await fetch(apiUrl, {
      headers: { 'Accept': 'application/json' },
      signal: controller.signal // Apply the timeout signal
    });
    clearTimeout(timeoutId); // Clear timeout if fetch completes

    console.log(`[Middleware] Fetch response status from IPInfo: ${response.status}`);

    if (!response.ok) {
      const errorDetails = await response.text(); // Get response body for more info
      console.error(`[Middleware Error] IP info API call failed with status ${response.status} for IP: ${ipToLookup}. Details: ${errorDetails}`);
      // In production, an API failure should lead to the restricted page to be safe.
      return process.env.NODE_ENV === 'production'
        ? NextResponse.redirect(new URL(NOT_LEGAL_PAGE_PATH, request.url))
        : NextResponse.next(); // In dev, allow to proceed for debugging
    }

    const geoData = await response.json();
    const countryCode = geoData.country || 'Unknown'; // Extract country code, default if not found

    console.log(`[Middleware] Detected country: ${countryCode} for IP: ${ipToLookup}. Requested path: ${pathname}`);
    console.log(`[Middleware] Allowed countries: ${Array.from(ALLOWED_COUNTRIES).join(', ')}`);


    // 7. Check if the determined country code is in the allowed list.
    if (!ALLOWED_COUNTRIES.has(countryCode)) {
      console.warn(`[Middleware] ACCESS DENIED: Country ${countryCode} (IP: ${ipToLookup}) is NOT allowed. Redirecting to ${NOT_LEGAL_PAGE_PATH}.`);
      // If the country is NOT allowed, immediately redirect the user to the not-legal page.
      return NextResponse.redirect(new URL(NOT_LEGAL_PAGE_PATH, request.url));
    }

    // 8. If the country IS allowed, allow the request to proceed to its original destination.
    console.log(`[Middleware] ACCESS ALLOWED: Country ${countryCode} (IP: ${ipToLookup}). Proceeding to ${pathname}.`);
    return NextResponse.next();

  } catch (error) {
    console.error(`[Middleware Error] Caught exception during geo-check for IP ${ipToLookup} and path ${pathname}:`, error);
    // Provide more specific error messages for common fetch issues
    if (error.name === 'AbortError') {
        console.error("[Middleware Error Detail] Fetch was aborted (e.g., network timeout).");
    } else if (error.cause && error.cause.code === 'ENOTFOUND') {
        console.error("[Middleware Error Detail] DNS resolution failed or host not found (no internet connection?).");
    } else {
        console.error("[Middleware Error Detail] Generic fetch error:", error.message);
    }
    // In production, any unhandled error should also lead to the restricted page for safety.
    return process.env.NODE_ENV === 'production'
      ? NextResponse.redirect(new URL(NOT_LEGAL_PAGE_PATH, request.url))
      : NextResponse.next(); // In dev, allow to proceed for debugging
  }
}

// 10. Configure the matcher to specify which paths the middleware should run on.
// The regex pattern ensures the middleware applies to all routes EXCEPT:
// - API routes, Next.js internal static assets, common static files/folders.
// - And critically, the '/not-legal' page itself, to prevent it from being caught in a loop.
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|static|favicon.ico|robots.txt|not-legal|logo.svg|.*\\.(?:png|jpg|jpeg|gif|svg|ico|css|js|map|woff|woff2|ttf|eot)).*)'],
};