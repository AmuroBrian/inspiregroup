import { NextResponse } from "next/server";

export async function middleware(req) {
  const apiKey = process.env.IPINFO_API_KEY;
  const ip = req.headers.get("x-forwarded-for") || req.ip || "8.8.8.8";

  // Skip local IPs
  if (ip === "127.0.0.1" || ip.startsWith("192.168.") || ip === "::1") {
    return NextResponse.next();
  }

  try {
    const res = await fetch(`https://ipinfo.io/${ip}?token=${apiKey}`);
    const data = await res.json();
    const country = data.country || "Unknown";

    if (country === "PH") {
      // 👇 Internally rewrite to your custom page (DOES NOT change URL)
      return NextResponse.rewrite(new URL("/not-legal", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("❌ Error fetching geo data:", error);
    return NextResponse.next();
  }
}

// Match all paths except the not-legal page itself to avoid loop
export const config = {
  matcher: [
    '/((?!not-legal).*)', // exclude /not-legal from middleware to prevent infinite loop
  ],
};
