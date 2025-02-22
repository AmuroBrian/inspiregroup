import { NextResponse } from "next/server";

export function middleware(req) {
    const country = req.geo?.country; // Default to PH if unknown

    if (country !== "PH") {
        return NextResponse.redirect(new URL("/not-legal", req.url));
    }

    return NextResponse.next();
}

// Apply middleware to all routes except "/not-legal"
export const config = {
    matcher: "/((?!not-legal).*)", // Matches everything except /not-legal
};
