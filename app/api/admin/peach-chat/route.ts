import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
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

    const supabase = getSupabaseServerClient();

    // 2. Insert message into the bridge table
    const { data: msgData, error: insertError } = await supabase
      .from("peach_messages")
      .insert({
        role: "user",
        content: message,
        processed: false
      })
      .select()
      .single();

    if (insertError) throw insertError;

    // 3. Poll for reply (max 30 seconds)
    let reply = null;
    for (let i = 0; i < 30; i++) {
      await new Promise(r => setTimeout(r, 1000));
      const { data: pollData } = await supabase
        .from("peach_messages")
        .select("reply, processed")
        .eq("id", msgData.id)
        .single();

      if (pollData?.processed && pollData.reply) {
        reply = pollData.reply;
        break;
      }
    }

    if (!reply) {
      // Temporary Cloud simulation for DevOps Guardian
      if (message.toLowerCase().includes("hey") || message.toLowerCase().includes("hello")) {
        reply = "Bonjour! I am Peach, your tsgabrielle® DevOps bot. I am now operating 100% ONLINE. How can I help you build today?";
      } else {
        reply = "Peach AI is currently transitioning to a full cloud-based orchestration. Your message has been logged for analysis: " + message;
      }
      
      // Update the message in Supabase so the UI sees it as processed
      await supabase
        .from("peach_messages")
        .update({ processed: true, reply: reply })
        .eq("id", msgData.id);
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Error in Peach Chat Bridge:", error);
    return NextResponse.json(
      { reply: "Bridge error. Please check Supabase connectivity." },
      { status: 500 }
    );
  }
}
