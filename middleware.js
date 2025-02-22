import { NextResponse } from "next/server";

export function middleware(req) {
    console.log("Detected Geo Data:", req.geo); // Log location details

    const country = req.geo?.country || "PH"; // Default to PH if unknown
    console.log("Detected Country:", country); // Log detected country

    if (country !== "JP") {
        return NextResponse.redirect(new URL("/not-legal", req.url));
    }

    return NextResponse.next();
}

// Apply middleware to all routes except "/not-legal"
export const config = {
    matcher: "/((?!not-legal).*)", // Matches everything except /not-legal
};
