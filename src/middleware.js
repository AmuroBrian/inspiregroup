import { NextResponse } from "next/server";

export function middleware(req) {
    console.log("Geo Data:", req.geo); // Debugging

    const country = req.geo?.country || "UNKNOWN"; // Handle undefined case
    console.log("Country: ", country);
    if (country !== "PH") {
        return NextResponse.redirect(new URL("/not-legal", req.url));
    }

    return NextResponse.next();
}

// Apply middleware to all routes except "/not-legal"
export const config = {
    runtime: "edge",
    matcher: "/((?!not-legal).*)", // Matches everything except /not-legal
};
