import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/**
 * Verify the request is from an authenticated admin user.
 * Uses the Supabase anon key + user's auth cookie to check identity,
 * NOT the service role key (which bypasses RLS and has no user context).
 *
 * Returns the user object if admin, or a NextResponse error to return early.
 */
export async function requireAdmin(): Promise<
  | { user: { id: string; email?: string }; error?: never }
  | { user?: never; error: NextResponse }
> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return {
      error: NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      ),
    };
  }

  // Create a client that reads the user's auth cookie
  const cookieStore = await cookies();
  const supabase = createClient(url, anonKey, {
    global: {
      headers: {
        cookie: cookieStore.toString(),
      },
    },
  });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  const isAdmin = user.app_metadata?.role === "admin";
  if (!isAdmin) {
    return {
      error: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return { user: { id: user.id, email: user.email } };
}
