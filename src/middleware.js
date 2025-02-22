export const config = {
    runtime: "experimental-edge", // Use this instead of "edge"
    matcher: "/((?!not-legal).*)", // Matches everything except /not-legal
};

import { NextResponse } from "next/server";

export function middleware(req) {
    console.log("Full Geo Data:", req.geo); // Debugging

    const country = req.geo?.country || "UNKNOWN";
    console.log("Detected Country:", country);

    if (country !== "PH") {
        return NextResponse.redirect(new URL("/not-legal", req.url));
    }

    return NextResponse.next();
}
