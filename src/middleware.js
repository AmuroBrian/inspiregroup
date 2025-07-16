import { NextResponse } from "next/server";

// Set of allowed country codes (ISO 3166-1 alpha-2)
const ALLOWED_COUNTRIES = new Set(['JP', 'KR', 'KP', 'CN']);

export async function middleware(request) {
    console.log("🌐 Middleware triggered");

    const apiKey = process.env.IPINFO_API_KEY;
    if (!apiKey) {
        console.error("❌ IPINFO_API_KEY is missing from environment variables");
        // Fail open - allow access if we can't check location
        return NextResponse.next();
    }

    // Get client IP with proper fallbacks
    let ip = request.headers.get("x-forwarded-for") || request.ip || "";
    ip = ip.split(",")[0].trim() || "8.8.8.8"; // Fallback to Google DNS IP
    console.log("🔍 Client IP:", ip);

    // Skip geo check for local development and private networks
    if (
        ip === "127.0.0.1" || 
        ip === "::1" || 
        ip.startsWith("192.168.") || 
        ip.startsWith("10.") ||
        ip.startsWith("172.16.")
    ) {
        console.log("🏠 Skipping geo check for local/private IP");
        return NextResponse.next();
    }

    const apiUrl = `https://ipinfo.io/${ip}?token=${apiKey}`;
    console.log("📡 Fetching geo data from:", apiUrl);

    try {
        const response = await fetch(apiUrl, {
            headers: { "Accept": "application/json" },
            next: { revalidate: 0 } // Always fresh data
        });

        if (!response.ok) {
            throw new Error(`API responded with ${response.status}`);
        }

        const geoData = await response.json();
        console.log("🌍 Geo data:", JSON.stringify(geoData, null, 2));

        const countryCode = geoData.country || "Unknown";
        console.log("📍 Detected country code:", countryCode);

        if (!ALLOWED_COUNTRIES.has(countryCode)) {
            console.log("🚫 Access denied for country:", countryCode);
            return NextResponse.redirect(new URL('/not-legal', request.url), {
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate',
                    'Pragma': 'no-cache'
                }
            });
        }

        console.log("✅ Access granted for country:", countryCode);
        return NextResponse.next();
    } catch (error) {
        console.error("⚠️ Geo lookup error:", error);
        // Fail open - allow access if geo check fails
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for:
         * - _next static files
         * - API routes
         * - static files
         * - the not-legal page
         * - favicon
         */
        '/((?!api|_next/static|_next/image|not-legal|favicon.ico).*)',
    ],
};