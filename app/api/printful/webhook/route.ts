import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

type PrintfulWebhook = {
  type: string;
  data?: {
    order?: {
      external_id?: string;
      status?: string;
      shipment?: { tracking_number?: string };
    };
  };
};

export async function POST(request: Request) {
  const secret = process.env.PRINTFUL_WEBHOOK_SECRET;
  const signature = request.headers.get("x-pf-signature");
  if (secret && !signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 401 });
  }

  const body = (await request.json()) as PrintfulWebhook;
  const supabase = getSupabaseServerClient();

  if (body.type.includes("package_shipped")) {
    const externalId = body.data?.order?.external_id;
    const tracking = body.data?.order?.shipment?.tracking_number;
    if (externalId) {
      await supabase
        .from("orders")
        .update({ status: "fulfilled", tracking_number: tracking ?? null })
        .eq("id", externalId);
    }
  }

  return NextResponse.json({ received: true });
}
