"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

const ADMIN_EMAILS = ["contact@tsgabrielle.us"];

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const exchange = async () => {
      const code = searchParams.get("code");
      if (!code) {
        router.replace("/auth/sign-in");
        return;
      }
      const supabase = getSupabaseBrowserClient();
      await supabase.auth.exchangeCodeForSession(code);
      const { data: { user } } = await supabase.auth.getUser();
      const isAdmin =
        user?.app_metadata?.role === "admin" ||
        ADMIN_EMAILS.includes(user?.email ?? "");
      router.replace(isAdmin ? "/admin" : "/account");
      router.refresh();
    };
    exchange();
  }, [router, searchParams]);

  return (
    <section className="container-luxe py-14">
      <h1 className="font-display text-4xl">Signing you in...</h1>
    </section>
  );
}
