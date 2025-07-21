import { NextResponse } from "next/server";

const BLACKLISTED_COUNTRY = 'PH';

export async function middleware(request) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  if (pathname.startsWith('/api/') ||
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/static/') ||
      pathname.includes('favicon.ico') ||
      pathname.includes('robots.txt')) {
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
    // TESTING: Force block for all users as if from PH
    const countryCode = 'PH'; // <-- Remove this after testing
    // const countryCode = geoData.country || 'Unknown';

    console.log(`Geo data received for IP ${ip}:`, JSON.stringify(geoData));
    console.log(`Detected Country Code: ${countryCode}`);

    if (countryCode === BLACKLISTED_COUNTRY) {
      console.warn(`Blacklisted country detected (${countryCode}). Redirecting to 404`);
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
  matcher: ['/((?!api|_next/static|_next/image|static|favicon.ico|robots.txt).*)'],
};