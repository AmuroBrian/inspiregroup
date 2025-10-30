import { NextResponse } from "next/server";

const BLACKLISTED_COUNTRY = 'PH';

export async function middleware(request) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  // Maintenance mode gate (defaults to ON until explicitly disabled)
  const envMaintenance = process.env.MAINTENANCE_MODE === 'true' || process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
  const envExplicitOff = process.env.MAINTENANCE_MODE === 'false' || process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'false';
  const maintenanceOn = envExplicitOff ? false : (envMaintenance || true);

  // Allow bypass via cookie or query (?bypass_maintenance=1)
  const bypassQuery = url.searchParams.get('bypass_maintenance') === '1';
  const bypassCookie = request.cookies.get('bypass_maintenance')?.value === '1';
  if (bypassQuery) {
    const res = NextResponse.next();
    res.cookies.set('bypass_maintenance', '1', { path: '/', httpOnly: false });
    return res;
  }

  if (maintenanceOn && !bypassCookie) {
    const locale = url.locale || 'en';
    const isAssetOrApi =
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/static/') ||
      pathname.startsWith('/api/') ||
      pathname.startsWith('/images/') ||
      pathname.startsWith('/videos/') ||
      pathname.startsWith('/docs/') ||
      pathname.endsWith('.ico') ||
      pathname.endsWith('.svg') ||
      pathname.endsWith('.png') ||
      pathname.endsWith('.jpg') ||
      pathname.endsWith('.jpeg') ||
      pathname.endsWith('.webp') ||
      pathname.endsWith('/robots.txt');

    if (pathname === '/maintenance' || pathname === `/${locale}/maintenance` || isAssetOrApi) {
      return NextResponse.next(); // short-circuit: show maintenance or serve assets
    }

    const maintenanceUrl = new URL(`/${locale}/maintenance`, request.url);
    const response = NextResponse.rewrite(maintenanceUrl);
    response.headers.set('Cache-Control', 'no-store');
    response.headers.set('Retry-After', '3600');
    return response;
  }

  if (pathname.startsWith('/api/') ||
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/static/') ||
      pathname.includes('favicon.ico') ||
      pathname.includes('robots.txt') ||
      pathname === '/not-legal') {
    console.log(`Middleware skipped for path: ${pathname}`);
    return NextResponse.next();
  }

  const apiKey = process.env.IPINFO_API_KEY;
  if (!apiKey) {
    console.error("IPINFO_API_KEY is missing. Please set IPINFO_API_KEY environment variable.");
    return process.env.NODE_ENV === 'production'
      ? NextResponse.rewrite(new URL('/404', request.url))
      : NextResponse.next();
  }

  let ip = request.headers.get('x-real-ip') ||
           request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
           request.ip ||
           '8.8.8.8';

  console.log(`Incoming IP: ${ip}`);

  if (process.env.NODE_ENV !== 'production') {
    const isPrivateIP = ip === '127.0.0.1' || 
                       ip === '::1' ||
                       ip.startsWith('192.168.') ||
                       ip.startsWith('10.') ||
                       (ip.startsWith('172.') && 
                        parseInt(ip.split('.')[1], 10) >= 16 && 
                        parseInt(ip.split('.')[1], 10) <= 31);
    
    if (isPrivateIP) {
      console.log(`Skipping geo check for private IP in development: ${ip}`);
      return NextResponse.next();
    }
  }

  try {
    const apiUrl = `https://ipinfo.io/${ip}?token=${apiKey}`;
    console.log(`Fetching geo data from: ${apiUrl}`);
    const response = await fetch(apiUrl, { headers: { 'Accept': 'application/json' } });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`IP API error: ${response.status} - ${errorText}`);
    }

    const geoData = await response.json();
    const countryCode = geoData.country || 'Unknown';

    console.log(`Geo data received for IP ${ip}:`, JSON.stringify(geoData));
    console.log(`Detected Country Code: ${countryCode}`);

    if (countryCode === BLACKLISTED_COUNTRY) {
      console.warn(`Blacklisted country detected (${countryCode}). Redirecting to `);
      return NextResponse.rewrite(new URL('/404', request.url));
    }

    console.log(`Country (${countryCode}) is allowed. Proceeding.`);
    return NextResponse.next();
  } catch (error) {
    console.error('Geo check failed:', error);
    return process.env.NODE_ENV === 'production'
      ? NextResponse.rewrite(new URL('/404', request.url))
      : NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|static|favicon.ico|robots.txt|not-legal).*)'],
};