import { NextRequest, NextResponse } from 'next/server';
import { geolocation } from '@vercel/functions';

// The country to block from accessing the secret page
const BLOCKED_COUNTRY = 'PH';

// Trigger this middleware to run on the `/secret-page` route
export const config = {
    matcher: "/((?!not-legal).*)",
};

export default function middleware(request) {
    // Extract country. Default to US if not found.
    const { country = 'US' } = geolocation(request);

    console.log(`Visitor from ${country}`);

    // Specify the correct route based on the requests location
    if (country === BLOCKED_COUNTRY) {
        request.nextUrl.pathname = '/not-legal';
    }

    // Rewrite to URL
    return NextResponse.rewrite(request.nextUrl);
}