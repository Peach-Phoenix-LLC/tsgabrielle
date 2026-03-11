"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const exchange = async () => {
      const code = searchParams.get("code");
      const nextPath = searchParams.get("next");
      
      if (!code) {
        router.replace("/auth/sign-in");
        return;
      }
      
      const supabase = getSupabaseBrowserClient();
      await supabase.auth.exchangeCodeForSession(code);
      
      const { data: { user } } = await supabase.auth.getUser();
      const isAdmin = user?.email?.toLowerCase() === "contact@tsgabrielle.us" || user?.app_metadata?.role === "admin";
      
      if (nextPath) {
        router.replace(nextPath);
      } else if (isAdmin) {
        router.replace("/admin");
      } else {
        router.replace("/account");
      }
      
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
