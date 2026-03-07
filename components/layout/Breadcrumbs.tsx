"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  const paths = pathname.split("/").filter((p) => p);
  
  const crumbs = paths.map((path, index) => {
    const href = `/${paths.slice(0, index + 1).join("/")}`;
    const label = path
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
    
    return { label, href };
  });

  return (
    <nav aria-label="Breadcrumb" className="container-luxe py-4 flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#a932bd]/40">
      <Link href="/" className="hover:text-[#a932bd] transition-colors flex items-center gap-1">
        <Home size={10} />
        <span>Home</span>
      </Link>
      
      {crumbs.map((crumb, index) => (
        <div key={crumb.href} className="flex items-center gap-2">
          <ChevronRight size={10} className="opacity-50" />
          {index === crumbs.length - 1 ? (
            <span className="text-[#a932bd] font-medium">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="hover:text-[#a932bd] transition-colors">
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
