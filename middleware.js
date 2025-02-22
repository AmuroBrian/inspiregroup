import { NextRequest, NextResponse } from "next/server";

const ALLOWED_COUNTRY = "JP";
const IP_API_URL = "http://api.ipapi.com";
const ACCESS_KEY = "fee8501efaa8bced666278f96ec2ad60";

export const config = {
    matcher: "/((?!not-legal).*)",
};

export default async function middleware(request) {
    let country = "Unknown";

    // Get client IP from headers
    const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for") || request.ip;

    if (ip) {
        try {
            // Fetch country data from ipapi.com
            const response = await fetch(`${IP_API_URL}/${ip}?access_key=${ACCESS_KEY}`);
            const data = await response.json();

            // Extract country code
            if (data && data.country_code) {
                country = data.country_code.toUpperCase();
            }
        } catch (error) {
            console.error("Error fetching country data:", error);
        }
    }

    console.log(`Visitor IP: ${ip}, Country: ${country}`);

    // Block users not in Japan
    if (country !== ALLOWED_COUNTRY) {
        return NextResponse.rewrite(new URL("/not-legal", request.url));
    }

    return NextResponse.next();
}
