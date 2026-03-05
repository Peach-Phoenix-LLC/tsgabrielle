import { NextResponse } from "next/server";
import { subscribeProfileToList } from "@/lib/klaviyo";

export async function POST(req: Request) {
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
  } catch (error: any) {
    console.error("Error in subscribe API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
