import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET() {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  const cookieStore = await cookies();
  const builderEnabled = cookieStore.get("builder_mode")?.value === "1";

  return NextResponse.json({ isAdmin: true, builderEnabled });
}
