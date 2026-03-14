'use client';

import React from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import './login.css';

export default function LoginPage() {
  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <div className="bg-white font-sans text-[#1a1a1a] min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 relative">
      {/* Background Subtle Gradient */}
      <div className="fixed inset-0 bg-neutral-50/50 z-0"></div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[400px] px-6 flex flex-col items-center">
        {/* Header / Logo */}
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-extrabold tracking-[0.2em] uppercase text-[#1a1a1a]">
            tsgabrielle<span className="text-[0.5em] align-top">®</span>
          </h1>
          <p className="text-[#a932bd] font-medium mt-2 tracking-widest text-xs uppercase opacity-80">
            Atelier Experience
          </p>
        </header>

        {/* Auth Card */}
        <main className="w-full bg-white rounded-sm border border-black/5 p-8 shadow-2xl shadow-black/[0.02]">
          <h2 className="text-2xl font-bold text-center text-[#1a1a1a] mb-2">Welcome Back</h2>
          <p className="text-[#1a1a1a]/40 text-sm text-center mb-8 font-light tracking-wide uppercase">
            Exclusive Client Access
          </p>

          {/* Social Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-white border border-black/10 h-14 rounded-sm flex items-center justify-center gap-3 mb-6 hover:bg-neutral-50 transition-all group"
          >
            <svg className="shrink-0" height="20" viewBox="0 0 24 24" width="20">
              <path d="M24 12.27c0-.86-.08-1.74-.22-2.6H12.25v4.92h6.6a5.64 5.64 0 0 1-2.44 3.7v3.08h3.94c2.31-2.12 3.65-5.24 3.65-9.1z" fill="#EA4335"></path>
              <path d="M12.25 24c3.24 0 5.96-1.07 7.95-2.91l-3.94-3.08c-1.1.74-2.5 1.18-4.01 1.18-3.09 0-5.7-2.09-6.64-4.89H1.54v3.18A12.003 12.003 0 0 0 12.25 24z" fill="#4285F4"></path>
              <path d="M5.61 14.3c-.24-.74-.38-1.53-.38-2.3 0-.77.14-1.56.38-2.3V6.52H1.54a12.003 12.003 0 0 0 0 10.96l4.07-3.18z" fill="#FBBC05"></path>
              <path d="M12.25 4.81c1.76 0 3.34.61 4.59 1.8l3.44-3.44C18.21 1.14 15.49 0 12.25 0 7.45 0 3.32 2.74 1.54 6.75l4.07 3.18c.94-2.8 3.55-4.89 6.64-4.89z" fill="#34A853"></path>
            </svg>
            <span className="text-[#1a1a1a] font-bold text-[10px] uppercase tracking-widest">Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] flex-1 bg-black/5"></div>
            <span className="text-[8px] uppercase tracking-widest text-[#1a1a1a]/30 font-bold">Secure Verification</span>
            <div className="h-[1px] flex-1 bg-black/5"></div>
          </div>

          {/* Login Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2 group">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/40 font-bold ml-1">Identity</label>
              <div className="relative border-b border-black/10 focus-within:border-[#a932bd] flex items-center transition-all duration-300">
                <input
                  className="bg-transparent border-none text-[#1a1a1a] text-sm w-full py-4 focus:ring-0 placeholder:text-neutral-300 font-light tracking-wide outline-none"
                  placeholder="Email Address"
                  type="email"
                />
              </div>
            </div>
            <div className="space-y-2 group">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/40 font-bold ml-1">Passkey</label>
              <div className="relative border-b border-black/10 focus-within:border-[#a932bd] flex items-center transition-all duration-300">
                <input
                  className="bg-transparent border-none text-[#1a1a1a] text-sm w-full py-4 focus:ring-0 placeholder:text-neutral-300 font-light tracking-wide outline-none"
                  placeholder="Password"
                  type="password"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Link className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 hover:text-[#a932bd] transition-colors font-bold" href="/contact">Forgotten identity?</Link>
            </div>

            <button className="w-full bg-[#1a1a1a] h-14 rounded-sm text-white font-bold text-[10px] uppercase tracking-[0.3em] mt-8 hover:bg-[#a932bd] transition-all duration-500 shadow-xl shadow-black/5" type="submit">
              Grant Access
            </button>
          </form>
        </main>

        {/* Footer info */}
        <footer className="mt-12 text-center space-y-4 relative z-10">
          <p className="text-[#1a1a1a]/40 text-[10px] uppercase tracking-widest font-bold">
            New to tsgabrielle?
            <Link className="text-[#a932bd] ml-2 hover:underline" href="/login">
              Explore Membership
            </Link>
          </p>
        </footer>
      </div>

      {/* Background Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-[5]"
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCckTS-odGLaTWmu0IlTefS3yhSKzSlXDsoQIBmuJ1jRf7gUZm9XuzGOCWhlO13s9C5BDBH8cx656FeqmOR3UKsCofxQZkw46OU0uURtPP2btfdV7sTfEfCo9LFCiiTplE92wYF4l8lJq98SpFu4tp0lIaesn1GIc-CpYh5a5cvUICg6eqiaOF5DgFR_BNyA2A3VbN7v8oXphza2LgfnyB2LkLLx_RNmDJjYR_oPWsPG5T-zZ6MR3MAtllBc4EKVjcbxt6FU9w1ldLr')" }}
      ></div>
    </div>
  );
}
