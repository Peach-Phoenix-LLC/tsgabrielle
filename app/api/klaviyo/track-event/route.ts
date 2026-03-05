import { NextResponse } from "next/server";
import { trackClientEvent } from "@/lib/klaviyo";

export async function POST(req: Request) {
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
  } catch (error: any) {
    console.error("Error in track-event API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
