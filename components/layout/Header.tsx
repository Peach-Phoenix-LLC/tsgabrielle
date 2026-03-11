"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { MENU_GROUPS } from "@/lib/menu";
import { useCart } from "@/hooks/useCart";
import { Search, Heart, ShoppingBag, Menu as MenuIcon } from "lucide-react";

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<{ label: string; image?: string } | null>(null);
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);
  
  const LABEL_MAP: Record<string, string> = {
    "The Universe Of tsgabrielle®": "The Universe",
    "Meet tsgabrielle®": "Meet",
    "Follow tsgabrielle®": "Follow",
    "tsgabrielle® Worldwide": "🌐 Worldwide"
  };

  return (
    <header 
      className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md border-b border-[#a932bd]/10 text-[#a932bd] h-[160px] lg:h-[195px]"
      onMouseLeave={() => {
        setActiveGroup(null);
        setHoveredItem(null);
      }}
    >
      {/* Row 1: Search, Logo (Centered), and Icons */}
      <div className="container-luxe flex items-center justify-between py-6 lg:py-8">
        {/* Left Section: Search & Mobile Menu */}
        <div className="flex items-center gap-6 flex-1">
          <button className="lg:hidden text-[#a932bd] hover:opacity-75 transition-opacity" onClick={() => setOpen((v) => !v)}>
            <MenuIcon size={24} />
          </button>
          <Search size={22} className="cursor-pointer hover:opacity-75 transition-opacity" />
        </div>
        
        {/* Center Section: Logo (Now primary for all screens) */}
        <div className="flex justify-center flex-1">
          <BrandLogo color="purple" className="h-12 lg:h-[75px] w-auto" />
        </div>

        {/* Right Section: Wishlist & Cart */}
        <div className="flex items-center justify-end gap-6 flex-1">
          <Link href="/account/wishlist" className="relative">
            <Heart size={22} className="hover:opacity-75 transition-opacity" />
          </Link>
          <Link href="/checkout" className="relative flex items-center">
            <ShoppingBag size={22} className="hover:opacity-75 transition-opacity" />
            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#a932bd] text-[10px] text-white">
              {itemCount}
            </span>
          </Link>
        </div>
      </div>

      {/* Row 2: Mega Menu Navigation (Desktop Only) */}
      <div className="hidden lg:flex justify-center border-t border-b border-[#a932bd]/10 py-4">
        <nav className="flex items-center gap-12">
          {MENU_GROUPS.map((group) => (
            <div 
              key={group.label} 
              className="relative"
              onMouseEnter={() => setActiveGroup(group.label)}
            >
              <Link 
                href={group.href} 
                className="text-[13px] font-display font-light tracking-[0.4em] transition-all duration-500 hover:opacity-60"
              >
                {LABEL_MAP[group.label] || group.label}
              </Link>
            </div>
          ))}
        </nav>
      </div>

      {/* Mega Menu Overlay */}
      <div 
        className={`
          absolute left-0 top-full w-full bg-white/50 backdrop-blur-md border-b border-[#a932bd]/10 
          transition-all duration-500 ease-in-out overflow-hidden shadow-2xl
          ${activeGroup ? 'max-h-[85vh] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}
        `}
      >
        <div className="container-luxe py-16">
          {MENU_GROUPS.map((group) => (
            <div 
              key={group.label}
              className={`${activeGroup === group.label ? 'grid' : 'hidden'} grid-cols-4 gap-20 items-start`}
            >
              <div className="col-span-1 space-y-8">
                <div className="space-y-4">
                  <p className="text-[10px] tracking-[0.3em] text-[#a932bd]/60">Department</p>
                  <h2 className="text-4xl font-light tracking-tight text-[#a932bd]">{hoveredItem?.label || LABEL_MAP[group.label] || group.label}</h2>
                </div>
                
                <div className="aspect-[4/5] w-full bg-[#f9f9f9] overflow-hidden rounded-sm border border-[#a932bd]/5 relative group/img">
                  {hoveredItem?.image ? (
                    <Image 
                      src={hoveredItem.image} 
                      alt={hoveredItem.label}
                      fill
                      className="h-full w-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                    />
                  ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center p-8 text-center space-y-4">
                       <p className="text-xs font-light text-[#a932bd]/80 leading-relaxed">
                          Discover the essence of inclusive elegance. Hover over an item to preview the collection.
                       </p>
                    </div>
                  )}
                </div>

                <Link 
                  href={group.href}
                  className="inline-block text-[10px] tracking-[0.2em] font-medium border-b border-[#a932bd] pb-2 transition-opacity hover:opacity-60"
                  onClick={() => setActiveGroup(null)}
                >
                  Explore All {group.label}
                </Link>
              </div>
              <div className="col-span-3">
                <ul className="grid grid-cols-3 gap-x-12 gap-y-6">
                  {"children" in group && group.children.map((item) => (
                    <li key={item.href}>
                      <Link 
                        href={item.href}
                        className="text-[15px] font-light text-[#a932bd] transition-all hover:opacity-100 hover:pl-2 block py-1"
                        onMouseEnter={() => setHoveredItem(item)}
                        onClick={() => setActiveGroup(null)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {open && (
        <div className="fixed inset-0 top-0 z-[60] flex flex-col bg-white lg:hidden">
          <div className="flex items-center justify-between px-6 py-6 border-b border-[#e7e7e7]">
            <BrandLogo color="purple" className="h-10 w-auto" />
            <button className="text-[11px] font-medium tracking-[0.25em] text-[#a932bd]" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-10">
            <ul className="space-y-8">
              {MENU_GROUPS.map((group) => (
                <li key={group.label} className="space-y-6">
                  <Link href={group.href} className="block text-2xl font-light tracking-tight text-[#111111]" onClick={() => setOpen(false)}>
                    {LABEL_MAP[group.label] || group.label}
                  </Link>
                  {"children" in group && (
                    <ul className="grid grid-cols-1 gap-4 border-l border-[#a932bd]/20 pl-6">
                      {group.children.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="block text-[13px] font-light text-[#555555]"
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