"use client";

import { FormEvent, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const supabase = getSupabaseBrowserClient();
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });
      if (signUpError) throw signUpError;
      setMessage("Account created. Check your email to confirm your account.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container-luxe py-14">
      <h1 className="font-display text-4xl">Create Account</h1>
      <form className="mt-6 max-w-md space-y-3" onSubmit={onSubmit}>
        <input
          className="w-full rounded border border-peach bg-white px-3 py-2 text-sm"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full rounded border border-peach bg-white px-3 py-2 text-sm"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
        {message && <p className="text-sm text-green-700">{message}</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-phoenix px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>
    </section>
  );
}

