import { NextResponse } from "next/server";

export function middleware(req) {
    console.log("Middleware triggered!");

    // Log full request headers (sometimes the country might be under a different key)
    console.log("Request Headers:", Object.fromEntries(req.headers));

    console.log("Geo Data:", req.geo);

    const country = req.geo?.country || "UNKNOWN";
    console.log("Detected Country:", country);

    if (country !== "PH") {
        return NextResponse.redirect(new URL("/not-legal", req.url));
    }

    return NextResponse.next();
}

export const config = {
    runtime: "experimental-edge",
    matcher: "/((?!not-legal).*)",
};
