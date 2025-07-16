import { NextResponse } from "next/server";

// Allowed countries (Japan, South Korea, North Korea, China)
const ALLOWED_COUNTRIES = new Set(['JP', 'KR', 'KP', 'CN']);
const WEBSITE_URL = 'https://www.inspire-asset.com';

export async function middleware(request) {
    const url = request.nextUrl;
    const pathname = url.pathname;

    console.log(`🌐 [${request.method}] ${pathname} | Middleware triggered`);

    // Skip middleware for essential resources and API routes
    if (pathname.startsWith('/api/') ||
        pathname.startsWith('/_next/') ||
        pathname.startsWith('/static/') ||
        pathname === '/404' ||
        pathname.includes('favicon.ico') ||
        pathname.includes('robots.txt')) {
        return NextResponse.next();
    }

    // Geo-restriction logic
    const apiKey = process.env.IPINFO_API_KEY;
    if (!apiKey) {
        console.error("❌ Critical: IPINFO_API_KEY is missing");
        return process.env.NODE_ENV === 'production'
            ? NextResponse.rewrite(new URL('/404', request.url))
            : NextResponse.next();
    }

    let ip = request.headers.get('x-real-ip') ||
        request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
        request.ip ||
        '8.8.8.8';

    // Skip geo check for local/private IPs in development
    if (process.env.NODE_ENV !== 'production' &&
        (ip === '127.0.0.1' || ip === '::1' ||
            ip.startsWith('192.168.') ||
            ip.startsWith('10.') ||
            (ip.startsWith('172.') && parseInt(ip.split('.')[1]) >= 16 && parseInt(ip.split('.')[1]) <= 31))) {
        console.log('🏠 Skipping geo check for local/private IP in development');
        return NextResponse.next();
    }

    try {
        const apiUrl = `https://ipinfo.io/${ip}?token=${apiKey}`;
        const response = await fetch(apiUrl, {
            headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) throw new Error(`IP API responded with ${response.status}`);

        const geoData = await response.json();
        const countryCode = geoData.country || 'Unknown';

        console.log(`📍 Detected country: ${countryCode}`);

        if (!ALLOWED_COUNTRIES.has(countryCode)) {
            console.log(`🚫 Blocking access from ${countryCode}`);
            // Use the current request URL as base for the rewrite
            return NextResponse.rewrite(new URL('/404', request.url));
        }

        // For allowed countries, check if the requested page exists
        try {
            const pageResponse = await fetch(new URL(pathname, request.url), {
                method: 'HEAD'
            });

            if (pageResponse.status === 404) {
                console.log(`❌ 404 Not Found: ${pathname}`);
                return NextResponse.rewrite(new URL('/404', request.url));
            }
        } catch (error) {
            console.error('⚠️ Error checking page existence:', error);
        }

        console.log(`✅ Allowing access from ${countryCode}`);
        return NextResponse.next();
    } catch (error) {
        console.error('⚠️ Geo lookup error:', error);
        // Use request.url instead of WEBSITE_URL for local development
        return process.env.NODE_ENV === 'production'
            ? NextResponse.rewrite(new URL('/404', request.url))
            : NextResponse.next();
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for:
         * - API routes (/api/)
         * - Static files (_next/static, _next/image, static/)
         * - Special pages (404, favicon, robots.txt)
         */
        '/((?!api|_next/static|_next/image|static|404|favicon.ico|robots.txt).*)',
    ],
};