import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

export async function POST(req: Request) {
  try {
    // 1. Verify the user is an admin
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // 2. Forward the request to the local OpenClaw Gateway (assuming default port 18789)
    // We use the local HTTP API endpoint for OpenClaw to inject the message.
    // Replace with your actual gateway token if you have one configured.
    const OPENCLAW_URL = "http://127.0.0.1:18789/api/v1/agent/turn";
    
    const response = await fetch(OPENCLAW_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${process.env.OPENCLAW_GATEWAY_TOKEN}` // Uncomment if needed
      },
      body: JSON.stringify({
        agentId: "main", // Your Qwen 3.5 brain
        message: message,
        // Identify this as coming from the internal web dashboard
        channel: "web-dashboard",
        sourceId: auth.user.email || "admin"
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenClaw Gateway Error:", errText);
      return NextResponse.json(
        { reply: "Peach encountered an error communicating with the local Gateway. Is it running?" },
        { status: 502 }
      );
    }

    const data = await response.json();
    
    // OpenClaw usually streams or returns a structured turn response. 
    // We'll extract the final text reply. This assumes a simple synchronous response for now.
    // If OpenClaw streams, you might need a more complex stream handler here.
    const finalReply = data.text || data.message || "Done. Check the OpenClaw terminal for details.";

    return NextResponse.json({ reply: finalReply });
  } catch (error: any) {
    console.error("Error communicating with Peach:", error);
    return NextResponse.json(
      { reply: "Critical error connecting to the AI brain. Please check server logs." },
      { status: 500 }
    );
  }
}
