import { NextRequest, NextResponse } from "next/server";
import { geolocation } from "@vercel/functions";

// Allow only Japan
const ALLOWED_COUNTRY = "JP";

// Middleware applies to all routes except `/not-legal`
export const config = {
    matcher: "/((?!not-legal).*)",
};

export default function middleware(request) {
    // Get country, default to "Unknown" if not detected
    const { country = "Unknown" } = geolocation(request);

    console.log(`Visitor from ${country}`);

    // Redirect users **not in Japan** to `/not-legal`
    if (country !== ALLOWED_COUNTRY) {
        return NextResponse.redirect(new URL("/not-legal", request.url));
    }

    // Allow access if from Japan
    return NextResponse.next();
}
