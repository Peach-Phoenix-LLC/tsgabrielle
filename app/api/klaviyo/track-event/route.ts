import { NextResponse } from "next/server";
import { trackClientEvent } from "@/lib/klaviyo";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limiter = rateLimit(`track-event:${ip}`, { maxRequests: 30, windowMs: 60_000 });
  if (!limiter.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limiter.resetInSeconds) } }
    );
  }
  try {
    const { email, eventName, properties } = await req.json();

    if (!email || !eventName) {
      return NextResponse.json(
        { error: "Email and Event Name are required" },
        { status: 400 }
      );
    }

    const response = await trackClientEvent(email, eventName, properties || {});

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Klaviyo API Error:", errorData);
      return NextResponse.json(
        { error: "Failed to track event" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error in track-event API:", error);
    return NextResponse.json({ error: "An internal error occurred" }, { status: 500 });
  }
}
