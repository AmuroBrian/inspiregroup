import { NextResponse } from "next/server";

const BLACKLISTED_COUNTRY = 'PH';
const NOT_LEGAL_URL = '/not-legal'; // Single source of truth for the blocked page

export async function middleware(request) {
  const url = request.nextUrl;

  // 1. Skip ONLY the not-legal page itself to prevent infinite redirects
  if (url.pathname === NOT_LEGAL_URL) {
    return NextResponse.next();
  }

  // 2. Immediate blocking if geo info is available (Vercel/Nexthost)
  if (process.env.NODE_ENV === 'production' && request.geo?.country === BLACKLISTED_COUNTRY) {
    return NextResponse.redirect(new URL(NOT_LEGAL_URL, request.url));
  }

  // 3. Fallback to manual IP check for non-Vercel hosts or missing geo
  try {
    const ip = getClientIP(request);
    const country = await getCountryFromIP(ip);
    
    if (country === BLACKLISTED_COUNTRY) {
      return NextResponse.redirect(new URL(NOT_LEGAL_URL, request.url));
    }
  } catch (error) {
    console.error('IP detection failed:', error);
    // Fail securely - block access if we can't verify
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.redirect(new URL(NOT_LEGAL_URL, request.url));
    }
  }

  return NextResponse.next();
}

// Helper: Extract client IP from headers
function getClientIP(request) {
  return (
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.ip ||
    '8.8.8.8' // Fallback IP
  );
}

// Helper: Fetch country from IP
async function getCountryFromIP(ip) {
  const apiKey = process.env.IPINFO_API_KEY;
  if (!apiKey) throw new Error('IPINFO_API_KEY missing');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2000); // 2s timeout

  const response = await fetch(`https://ipinfo.io/${ip}?token=${apiKey}`, {
    headers: { 'Accept': 'application/json' },
    signal: controller.signal
  });

  clearTimeout(timeout);

  if (!response.ok) {
    throw new Error(`IP API error: ${response.status}`);
  }

  const data = await response.json();
  return data.country || 'Unknown';
}

// Apply to ALL routes except NOT_LEGAL_URL
export const config = {
  matcher: ["/((?!not-legal).*)"], 
};