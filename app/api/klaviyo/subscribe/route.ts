import { NextResponse } from "next/server";
import { subscribeProfileToList } from "@/lib/klaviyo";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limiter = rateLimit(`subscribe:${ip}`, { maxRequests: 5, windowMs: 60_000 });
  if (!limiter.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limiter.resetInSeconds) } }
    );
  }
  try {
    const { email } = await req.json();
    const listId = process.env.NEXT_PUBLIC_KLAVIYO_LIST_ID;

    if (!email || !listId) {
      return NextResponse.json(
        { error: "Email and List ID are required" },
        { status: 400 }
      );
    }

    const response = await subscribeProfileToList(email, listId);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Klaviyo API Error:", errorData);
      return NextResponse.json(
        { error: "Failed to subscribe to newsletter" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error in subscribe API:", error);
    return NextResponse.json({ error: "An internal error occurred" }, { status: 500 });
  }
}
