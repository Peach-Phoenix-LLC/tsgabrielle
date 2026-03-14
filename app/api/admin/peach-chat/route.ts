import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin-auth";

export async function POST(req: Request) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const { message } = await req.json();
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();

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
      return NextResponse.json({ 
        reply: "Peach is thinking deeply on your local PC... If this takes too long, make sure the 'Peach Bridge' script is running in your terminal." 
      });
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
