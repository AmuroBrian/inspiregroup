import { NextResponse } from "next/server";

const BLACKLISTED_COUNTRY = 'PH';

export async function middleware(request) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  // Skip middleware for these paths
  if (pathname.startsWith('/_next/') ||
      pathname.startsWith('/static/') ||
      pathname.includes('.') || // Skip files
      pathname === '/not-legal') {
    return NextResponse.next();
  }

  // Skip API routes (if you want to allow API access)
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // In production, immediately redirect if we already know it's PH
  if (process.env.NODE_ENV === 'production' && 
      request.geo?.country === BLACKLISTED_COUNTRY) {
    return NextResponse.redirect(new URL('/not-legal', request.url));
  }

  const apiKey = process.env.IPINFO_API_KEY;
  if (!apiKey) {
    console.error("IPINFO_API_KEY is missing");
    return process.env.NODE_ENV === 'production'
      ? NextResponse.redirect(new URL('/not-legal', request.url))
      : NextResponse.next();
  }

  let ip = request.headers.get('x-real-ip') ||
           request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
           request.ip ||
           '8.8.8.8';

  console.log(`Checking IP: ${ip}`);

  // Skip geo check for private IPs in development
  if (process.env.NODE_ENV !== 'production') {
    const isPrivateIP = ip === '127.0.0.1' || 
                       ip === '::1' ||
                       ip.startsWith('192.168.') ||
                       ip.startsWith('10.') ||
                       (ip.startsWith('172.') && 
                        parseInt(ip.split('.')[1], 10) >= 16 && 
                        parseInt(ip.split('.')[1], 10) <= 31);
    
    if (isPrivateIP) {
      console.log(`Skipping geo check for private IP: ${ip}`);
      return NextResponse.next();
    }
  }

  try {
    const apiUrl = `https://ipinfo.io/${ip}?token=${apiKey}`;
    const response = await fetch(apiUrl, { 
      headers: { 'Accept': 'application/json' },
      // Add timeout for production reliability
      signal: AbortSignal.timeout(2000)
    });

    if (!response.ok) {
      throw new Error(`IP API error: ${response.status}`);
    }

    const geoData = await response.json();
    const countryCode = geoData.country || 'Unknown';

    if (countryCode === BLACKLISTED_COUNTRY) {
      console.warn(`Blocking access from ${countryCode}`);
      return NextResponse.redirect(new URL('/not-legal', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Geo check failed:', error);
    // In production, be strict and block if we can't verify
    return process.env.NODE_ENV === 'production'
      ? NextResponse.redirect(new URL('/not-legal', request.url))
      : NextResponse.next();
  }
}

export const config = {
  // Match all paths except specific excluded ones
  matcher: [
    '/((?!_next/static|_next/image|static|favicon.ico|robots.txt|not-legal).*)'
  ],
};