import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

export async function POST(req: Request) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const OPENCLAW_URL = "http://127.0.0.1:18789/api/v1/agent/turn";
    
    const response = await fetch(OPENCLAW_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        agentId: "main",
        message: message,
        channel: "web-dashboard",
        sourceId: auth.email || "admin"
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { reply: "Peach encountered an error communicating with the local Gateway. Is it running?" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const finalReply = data.text || data.message || "Done. Check the OpenClaw terminal for details.";

    return NextResponse.json({ reply: finalReply });
  } catch (error: any) {
    return NextResponse.json(
      { reply: "Critical error connecting to the AI brain. Please check server logs." },
      { status: 500 }
    );
  }
}
