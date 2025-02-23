import { NextResponse } from "next/server";

export async function middleware(req) {
    const ip = req.headers.get("x-forwarded-for") || "8.8.8.8"; // Default to Google DNS for testing
    console.log("IPAPI Key:", process.env.IPAPI_ACCESS_KEY); // Should NOT be undefined

    const apiUrl = `http://api.ipapi.com/${ip}?access_key=${process.env.IPAPI_ACCESS_KEY}`;

    console.log("Client IP:", ip);
    console.log("Fetching Geo Data from:", apiUrl);

    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        console.log("Geo API Response:", data);

        const country = data.country_code || "UNKNOWN"; // Fallback
        console.log("Detected Country:", country);

        if (country !== "PH") {
            console.log("Redirecting to /not-legal 🚫");
            return NextResponse.redirect(new URL("/not-legal", req.url));
        }
    } catch (error) {
        console.error("Geo API Error:", error);
    }

    console.log("Access granted ✅");
    return NextResponse.next();
}

export const config = { matcher: "/((?!not-legal).*)" };
