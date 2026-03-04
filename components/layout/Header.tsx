"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { MENU_GROUPS } from "@/lib/menu";

// Adheres to Lato Light, strict #a932bd, white text, and sticky top-0
export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex w-full flex-col justify-center bg-[#a932bd] text-[#ffffff] min-h-[56px] lg:min-h-[64px]">
      <div className="container-luxe flex items-center justify-between py-3">
        <div className="hidden items-center gap-10 lg:flex">
          {MENU_GROUPS.slice(0, 3).map((group) => (
            <div key={group.label} className="group relative">
              <Link href={group.href} className="text-base font-light tracking-wide text-[#ffffff] transition-opacity hover:opacity-75">
                {group.label}
              </Link>
              {"children" in group && (
                <div className="invisible absolute left-0 top-full mt-4 w-[240px] border border-white/20 bg-[#a932bd] p-4 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <ul className="space-y-3">
                    {group.children.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className="block text-sm font-light text-[#ffffff] transition-opacity hover:opacity-75">
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

        <BrandLogo light className="[&_img]:h-9" />

        <div className="hidden items-center gap-8 lg:flex">
          {MENU_GROUPS.slice(3).map((group) => (
            <Link
              key={group.label}
              href={group.href}
              className="text-base font-light tracking-wide text-[#ffffff] transition-opacity hover:opacity-75"
            >
              {group.label}
            </Link>
          ))}
        </div>

        <button className="font-light text-[#ffffff] transition-opacity hover:opacity-75 lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Open menu">
          Menu
        </button>
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-full max-h-[70vh] overflow-y-auto border-t border-white/20 bg-[#a932bd] lg:hidden">
          <div className="container-luxe py-5">
            <ul className="space-y-5">
              {MENU_GROUPS.map((group) => (
                <li key={group.label}>
                  <Link href={group.href} className="block text-lg font-light text-[#ffffff] hover:opacity-75" onClick={() => setOpen(false)}>
                    {group.label}
                  </Link>
                  {"children" in group && (
                    <ul className="mt-3 space-y-3 border-l border-white/20 pl-4">
                      {group.children.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="block text-sm font-light text-[#ffffff] hover:opacity-75"
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
        </div>
      )}
    </header>
  );
}
