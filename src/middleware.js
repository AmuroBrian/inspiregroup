import { NextResponse } from "next/server";

const ALLOWED_COUNTRIES = new Set(['JP', 'KR', 'KP', 'CN']);

export async function middleware(request) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  // Skip middleware for essential resources and the not-legal page itself
  if (pathname.startsWith('/api/') ||
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/static/') ||
      pathname.includes('favicon.ico') ||
      pathname.includes('robots.txt') ||
      pathname === '/not-legal') {
    return NextResponse.next();
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

    if (!response.ok) throw new Error(`IP API error: ${response.status}`);

    const geoData = await response.json();
    const countryCode = geoData.country || 'Unknown';

    if (!ALLOWED_COUNTRIES.has(countryCode)) {
      return NextResponse.redirect(new URL('/not-legal', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Geo check failed:', error);
    return process.env.NODE_ENV === 'production'
      ? NextResponse.redirect(new URL('/not-legal', request.url))
      : NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|static|favicon.ico|robots.txt|not-legal).*)'],
};