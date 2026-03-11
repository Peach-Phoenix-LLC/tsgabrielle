"use client";

import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function SignOutPage() {
  const router = useRouter();

  const signOut = async () => {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <section className="container-luxe py-14">
      <h1 className="font-display text-4xl">Sign Out</h1>
      <p className="mt-3 text-night/80">End your current session.</p>
      <button
        type="button"
        onClick={signOut}
        className="mt-6 rounded-full bg-phoenix px-6 py-3 text-sm font-semibold text-white"
      >
        Sign Out
      </button>
    </section>
  );
}
