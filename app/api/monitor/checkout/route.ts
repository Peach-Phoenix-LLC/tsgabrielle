import { NextResponse } from "next/server";
import { monitor } from "@/lib/monitor";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event, error, data } = body;

    if (event === "checkout_error") {
      await monitor.checkoutError(error, data);
    } else if (event === "checkout_started") {
      await monitor.checkoutStarted(data);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
