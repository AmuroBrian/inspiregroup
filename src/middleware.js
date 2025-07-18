import { NextResponse } from "next/server";

const BLACKLISTED_COUNTRY = 'PH';
const NOT_LEGAL_URL = '/not-legal';

// 1. FIRST LAYER - Edge Function Immediate Block (Vercel)
export const config = {
  matcher: ["/((?!not-legal|_next/static|_next/image|favicon.ico).*)"],
  runtime: 'experimental-edge', // Critical for instant blocking
};

export default async function middleware(request) {
  const url = request.nextUrl;

  // 2. SECOND LAYER - Vercel GeoIP (Instant)
  if (request.geo?.country === BLACKLISTED_COUNTRY) {
    return fullBlockRedirect(url);
  }

  // 3. THIRD LAYER - Manual IP Check (Non-Vercel)
  try {
    const ip = getClientIP(request);
    const country = await getCountryFromIP(ip);
    
    if (country === BLACKLISTED_COUNTRY) {
      return fullBlockRedirect(url);
    }
  } catch (error) {
    console.error('Geo check failed:', error);
    return process.env.NODE_ENV === 'production' 
      ? fullBlockRedirect(url)
      : NextResponse.next();
  }

  return NextResponse.next();
}

// Nuclear redirect - prevents ANY content loading
function fullBlockRedirect(url) {
  const blockedUrl = new URL(NOT_LEGAL_URL, url.origin);
  
  // Critical headers to prevent any rendering
  const headers = new Headers();
  headers.set('x-middleware-rewrite', blockedUrl.toString());
  headers.set('Cache-Control', 'no-store, max-age=0');
  
  return new NextResponse(null, {
    status: 307,
    headers
  });
}

// IP extraction with all possible headers
function getClientIP(request) {
  const headers = [
    'cf-connecting-ip', // Cloudflare
    'x-real-ip',
    'x-forwarded-for',
    'x-vercel-forwarded-for'
  ];

  for (const header of headers) {
    const ip = request.headers.get(header);
    if (ip) return header === 'x-forwarded-for' ? ip.split(',')[0].trim() : ip;
  }

  return request.ip || '8.8.8.8';
}

// IP lookup with multiple fallbacks
async function getCountryFromIP(ip) {
  const services = [
    `https://ipinfo.io/${ip}/json?token=${process.env.IPINFO_API_KEY}`,
    `https://ipapi.co/${ip}/json/`,
    `https://geolocation-db.com/json/${ip}`
  ];

  for (const url of services) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        const data = await res.json();
        return data.country || data.country_code;
      }
    } catch (_) { continue; }
  }

  throw new Error('All geo services failed');
}