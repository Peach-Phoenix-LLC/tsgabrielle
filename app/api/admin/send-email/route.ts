import { NextResponse } from "next/server";
import { Resend } from "resend";
import { requireAdmin } from "@/lib/admin-auth";

export async function POST(req: Request) {
  try {
    // 1. Verify user is admin
    const auth = await requireAdmin();
    if (auth instanceof NextResponse) return auth;

    // 2. Parse request
    const { to, subject, body } = await req.json();

    if (!to || !subject || !body) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 3. Initialize Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json({ error: "Resend API key not configured on server" }, { status: 500 });
    }

    const resend = new Resend(resendApiKey);

    // 4. Send email
    const { data, error } = await resend.emails.send({
      from: "tsgabrielle® <contact@tsgabrielle.us>",
      to,
      subject,
      html: body,
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error: any) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
