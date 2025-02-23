import { NextResponse } from "next/server";

export async function middleware(req) {
    console.log("Middleware triggered 🚀");

    const apiKey = process.env.IPINFO_API_KEY;
    if (!apiKey) {
        console.error("❌ API key is missing!");
        return NextResponse.next();
    }

    const ip = req.headers.get("x-forwarded-for") || req.ip || "8.8.8.8";

    // 🚀 Skip API call on localhost (127.0.0.1, ::1, 192.168.x.x)
    if (ip === "127.0.0.1" || ip.startsWith("192.168.") || ip === "::1") {
        console.log("🛑 Skipping API call for localhost.");
        return NextResponse.next();
    }

    const apiUrl = `https://ipinfo.io/${ip}?token=${apiKey}`;
    console.log(`Fetching Geo Data from: ${apiUrl}`);

    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        console.log("Geo Data Response:", data);

        const country = data.country || "Unknown";

        if (country === "PH") {
            console.log(`🚫 Access denied for country: ${country}`);
            return NextResponse.redirect(new URL("/not-legal", req.url));
        }

        console.log(`✅ Access granted for country: ${country}`);
        return NextResponse.next();
    } catch (error) {
        console.error("❌ Error fetching geo data:", error);
        return NextResponse.next();
    }
}

// Apply middleware to all routes except "/not-legal"
export const config = {
    matcher: "/((?!not-legal).*)",
};
