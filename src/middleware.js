import { NextResponse } from "next/server";

export async function middleware(req) {
    console.log("Middleware triggered 🚀");

    const apiKey = process.env.IPINFO_API_KEY;
    if (!apiKey) {
        console.error("❌ API key is missing!");
        return NextResponse.next();
    }

    const ip = req.headers.get("x-forwarded-for") || req.ip || "8.8.8.8";
    console.log("🔍 Detected IP:", ip);

    // Skip local IPs
    if (ip === "127.0.0.1" || ip.startsWith("192.168.") || ip === "::1") {
        console.log("🛑 Skipping API call for localhost.");
        return NextResponse.next();
    }

    const apiUrl = `https://ipinfo.io/${ip}?token=${apiKey}`;
    console.log(`Fetching Geo Data from: ${apiUrl}`);

    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        const country = data.country || "Unknown";
        console.log("🌍 Detected Country:", country);

        if (country === "PH") {
            console.log(`🚫 Returning 404 for: ${country}`);
           return NextResponse.rewrite(new URL('/not-legal', req.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error("❌ Error fetching geo data:", error);
        return NextResponse.next();
    }
}

// Match everything
export const config = {
    matcher: '/not-legal',
};
