"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { MENU_GROUPS } from "@/lib/menu";
import { useCart } from "@/hooks/useCart";

export function Header() {
  const [open, setOpen] = useState(false);
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header className="sticky top-0 z-50 flex w-full flex-col justify-center bg-[#a932bd] text-[#ffffff] min-h-[56px] lg:min-h-[64px]">
      <div className="container-luxe flex items-center justify-between py-3">
        {/* Left Nav */}
        <div className="hidden items-center gap-8 lg:flex">
          {MENU_GROUPS.slice(0, 3).map((group) => (
            <div key={group.label} className="group relative">
              <Link href={group.href} className="text-[13px] font-light uppercase tracking-widest text-[#ffffff] transition-opacity hover:opacity-75">
                {group.label}
              </Link>
              {"children" in group && (
                <div className="invisible absolute left-0 top-full mt-4 w-[240px] border border-white/10 bg-[#a932bd] p-6 opacity-0 shadow-2xl transition-all group-hover:visible group-hover:opacity-100">
                  <ul className="space-y-4">
                    {group.children.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className="block text-xs font-light uppercase tracking-widest text-[#ffffff] transition-opacity hover:opacity-75">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Center Logo */}
        <BrandLogo light className="[&_img]:h-10" />

        {/* Right Nav */}
        <div className="hidden items-center gap-8 lg:flex">
          {MENU_GROUPS.slice(3, 6).map((group) => (
            <Link
              key={group.label}
              href={group.href}
              className="text-[13px] font-light uppercase tracking-widest text-[#ffffff] transition-opacity hover:opacity-75"
            >
              {group.label}
            </Link>
          ))}
          
          <Link href="/checkout" className="flex items-center gap-2 text-[13px] font-light uppercase tracking-widest text-[#ffffff] transition-opacity hover:opacity-75">
            <span>Bag</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/50 text-[10px]">
              {itemCount}
            </span>
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-6 lg:hidden">
            <Link href="/checkout" className="relative">
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/50 text-[10px] text-white">
                  {itemCount}
                </span>
            </Link>
            <button className="text-xs font-light uppercase tracking-widest text-[#ffffff]" onClick={() => setOpen((v) => !v)}>
              {open ? "Close" : "Menu"}
            </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {open && (
        <div className="fixed inset-0 top-[56px] z-40 flex flex-col bg-[#a932bd] lg:hidden">
          <div className="flex-1 overflow-y-auto px-6 py-10">
            <ul className="space-y-8">
              {MENU_GROUPS.map((group) => (
                <li key={group.label} className="space-y-4">
                  <Link href={group.href} className="block text-xl font-light tracking-wide text-[#ffffff]" onClick={() => setOpen(false)}>
                    {group.label}
                  </Link>
                  {"children" in group && (
                    <ul className="grid grid-cols-1 gap-4 border-l border-white/10 pl-5">
                      {group.children.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="block text-sm font-light uppercase tracking-widest text-white/70"
                            onClick={() => setOpen(false)}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-white/10 p-6">
             <Link 
                href="/checkout" 
                className="flex w-full items-center justify-center bg-white py-4 text-xs font-light uppercase tracking-widest text-[#a932bd]"
                onClick={() => setOpen(false)}
             >
                View Bag ({itemCount})
             </Link>
          </div>
        </div>
      )}
    </header>
  );
}
