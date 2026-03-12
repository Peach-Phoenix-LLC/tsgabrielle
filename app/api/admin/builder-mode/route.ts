import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { requireAdmin } from "@/lib/admin-auth";

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  const body = await req.json();
  const enabled = Boolean(body?.enabled);

  const cookieStore = await cookies();
  if (enabled) {
    cookieStore.set("builder_mode", "1", {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  } else {
    cookieStore.set("builder_mode", "0", {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
  }

  return NextResponse.json({ success: true, builderEnabled: enabled });
}
