"use client";

import Link from "next/link";
import { useState } from "react";
import { MENU_GROUPS } from "@/lib/menu";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-peach/50 bg-champagne/95 backdrop-blur">
      <div className="container-luxe flex items-center justify-between py-4">
        <Link href="/" className="font-display text-xl text-phoenix">
          tsgabrielle
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {MENU_GROUPS.map((group) => (
            <div key={group.label} className="group relative">
              <Link href={group.href} className="text-sm font-medium hover:text-phoenix">
                {group.label}
              </Link>
              {"children" in group && (
                <div className="invisible absolute left-0 top-full w-72 rounded-xl border border-peach bg-white p-4 opacity-0 shadow-luxe transition group-hover:visible group-hover:opacity-100">
                  <ul className="space-y-2">
                    {group.children.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className="text-sm hover:text-phoenix">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        <button
          className="rounded border border-peach px-3 py-1 text-sm lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open menu"
        >
          Menu
        </button>
      </div>

      {open && (
        <div className="border-t border-peach/60 bg-white lg:hidden">
          <div className="container-luxe py-4">
            <ul className="space-y-3">
              {MENU_GROUPS.map((group) => (
                <li key={group.label}>
                  <Link href={group.href} className="font-medium" onClick={() => setOpen(false)}>
                    {group.label}
                  </Link>
                  {"children" in group && (
                    <ul className="mt-2 space-y-1 pl-4">
                      {group.children.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href} className="text-sm" onClick={() => setOpen(false)}>
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
