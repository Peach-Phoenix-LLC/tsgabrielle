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
    <div className="bg-white dark:bg-white font-sans text-slate-100 min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Nebula Shimmer Effect */}
      <div className="fixed inset-0 nebula-bg z-0"></div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[400px] px-6 flex flex-col items-center">
        {/* Header / Logo */}
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-extrabold tracking-[0.2em] uppercase text-white drop-shadow-lg">
            tsgabrielle<span className="text-[0.5em] align-top">®</span>
          </h1>
          <p className="text-[#a932bd] font-medium mt-2 tracking-widest text-xs uppercase opacity-80">
            Atelier Experience
          </p>
        </header>

        {/* Glassmorphism Auth Card */}
        <main className="w-full glass-card rounded-xl p-8 iridescent-border">
          <h2 className="text-2xl font-bold text-center text-white mb-2">Welcome Back</h2>
          <p className="text-slate-400 text-sm text-center mb-8 font-light tracking-wide">
            Enter the realm of exclusivity
          </p>

          {/* Social Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full google-glass h-14 rounded-lg flex items-center justify-center gap-3 mb-6 transition-all group overflow-hidden"
          >
            <svg className="shrink-0" height="20" viewBox="0 0 24 24" width="20">
              <path d="M24 12.27c0-.86-.08-1.74-.22-2.6H12.25v4.92h6.6a5.64 5.64 0 0 1-2.44 3.7v3.08h3.94c2.31-2.12 3.65-5.24 3.65-9.1z" fill="#EA4335"></path>
              <path d="M12.25 24c3.24 0 5.96-1.07 7.95-2.91l-3.94-3.08c-1.1.74-2.5 1.18-4.01 1.18-3.09 0-5.7-2.09-6.64-4.89H1.54v3.18A12.003 12.003 0 0 0 12.25 24z" fill="#4285F4"></path>
              <path d="M5.61 14.3c-.24-.74-.38-1.53-.38-2.3 0-.77.14-1.56.38-2.3V6.52H1.54a12.003 12.003 0 0 0 0 10.96l4.07-3.18z" fill="#FBBC05"></path>
              <path d="M12.25 4.81c1.76 0 3.34.61 4.59 1.8l3.44-3.44C18.21 1.14 15.49 0 12.25 0 7.45 0 3.32 2.74 1.54 6.75l4.07 3.18c.94-2.8 3.55-4.89 6.64-4.89z" fill="#34A853"></path>
            </svg>
            <span className="text-white font-semibold text-sm">Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] flex-1 bg-white/10"></div>
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Secure Access</span>
            <div className="h-[1px] flex-1 bg-white/10"></div>
          </div>

          {/* Login Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2 group">
              <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">Identity</label>
              <div className="relative input-glow rounded-lg border border-white/10 bg-white/20 flex items-center px-4 transition-all duration-300">
                <span className="material-symbols-outlined text-slate-500 text-lg mr-3">alternate_email</span>
                <input className="bg-transparent border-none text-white text-sm w-full py-4 focus:ring-0 placeholder:text-slate-600 font-light tracking-wide outline-none" placeholder="Email Address" type="email" />
              </div>
            </div>
            <div className="space-y-2 group">
              <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">Passkey</label>
              <div className="relative input-glow rounded-lg border border-white/10 bg-white/20 flex items-center px-4 transition-all duration-300">
                <span className="material-symbols-outlined text-slate-500 text-lg mr-3">lock</span>
                <input className="bg-transparent border-none text-white text-sm w-full py-4 focus:ring-0 placeholder:text-slate-600 font-light tracking-wide outline-none" placeholder="Password" type="password" />
              </div>
            </div>
            <div className="flex justify-end">
              <Link className="text-[11px] text-slate-400 hover:text-[#a932bd] transition-colors tracking-wide font-medium" href="/contact">Recovery Options?</Link>
            </div>

            <button className="w-full holographic-button h-14 rounded-lg text-white font-bold text-base tracking-widest uppercase mt-4 flex items-center justify-center gap-2 group" type="submit">
              Sign In
            </button>
          </form>
        </main>

        {/* Footer Links */}
        <footer className="mt-10 text-center space-y-4 relative z-10 block">
          <p className="text-slate-400 text-xs tracking-wide">
            New to the atelier?
            <Link className="text-[#a932bd] font-bold ml-1 hover:brightness-125 transition-all drop-shadow-[0_0_8px_rgba(169,50,189,0.4)]" href="/login">
              Create Account
            </Link>
          </p>
          <div className="flex items-center justify-center gap-6 pt-4 opacity-40">
            <Link className="text-[10px] uppercase tracking-widest text-white hover:opacity-100 transition-opacity" href="/privacy">Privacy</Link>
            <Link className="text-[10px] uppercase tracking-widest text-white hover:opacity-100 transition-opacity" href="/terms">Terms</Link>
            <Link className="text-[10px] uppercase tracking-widest text-white hover:opacity-100 transition-opacity" href="/contact">Support</Link>
          </div>
        </footer>

        {/* Decorative Elements */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[#a932bd]/30 to-transparent z-0"></div>
      </div>

      {/* Background Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-[5]"
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCckTS-odGLaTWmu0IlTefS3yhSKzSlXDsoQIBmuJ1jRf7gUZm9XuzGOCWhlO13s9C5BDBH8cx656FeqmOR3UKsCofxQZkw46OU0uURtPP2btfdV7sTfEfCo9LFCiiTplE92wYF4l8lJq98SpFu4tp0lIaesn1GIc-CpYh5a5cvUICg6eqiaOF5DgFR_BNyA2A3VbN7v8oXphza2LgfnyB2LkLLx_RNmDJjYR_oPWsPG5T-zZ6MR3MAtllBc4EKVjcbxt6FU9w1ldLr')" }}
      ></div>
    </div>
  );
}

