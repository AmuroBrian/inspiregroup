import { NextResponse } from "next/server";

export async function middleware(req) {
    console.log("Middleware triggered 🚀");

    const apiKey = process.env.NEXT_PUBLIC_IPINFO_API_KEY; // Read from env
    if (!apiKey) {
        console.error("❌ API key is missing!");
        return NextResponse.next(); // Allow request if no API key
    }

    const ip = req.headers.get("x-forwarded-for") || req.ip || "8.8.8.8"; // Fallback IP for testing
    const apiUrl = `https://ipinfo.io/${ip}?token=${apiKey}`;

    console.log(`Fetching Geo Data from: ${apiUrl}`);

    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        console.log("Geo Data Response:", data);

        const country = data.country || "Unknown";

        // Block users only from the Philippines (PH)
        if (country === "PH") {
            console.log(`🚫 Access denied for country: ${country}`);
            return NextResponse.redirect(new URL("/not-legal", req.url));
        }

        console.log(`✅ Access granted for country: ${country}`);
        return NextResponse.next();
    } catch (error) {
        console.error("❌ Error fetching geo data:", error);
        return NextResponse.next(); // Allow request to proceed if API fails
    }
}

// Apply middleware to all routes except "/not-legal"
export const config = {
    matcher: "/((?!not-legal).*)", // Matches everything except /not-legal
};
