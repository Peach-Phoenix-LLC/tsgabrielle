"use client";

import Link from "next/link";
import { useSettings } from "@/components/providers/SettingsProvider";

type BrandLogoProps = {
  href?: string;
  className?: string;
  light?: boolean;
};

export function BrandLogo({ href = "/", className = "", light = false }: BrandLogoProps) {
  const settings = useSettings();
  
  // Use dynamic logo if available, otherwise fallback
  const defaultLogo = light ? "/images/tsgabrielle-logo-white.png" : "/images/tsgabrielle-logo.png";
  const logoUrl = settings.site_logo || defaultLogo;

  return (
    <Link href={href} className={`inline-flex items-center ${className}`.trim()}>
      <img 
        src={logoUrl} 
        alt="logo" 
        className="h-10 w-auto object-contain"
        onError={(e) => {
          // If the dynamic logo fails, try the default one once
          if (e.currentTarget.src !== window.location.origin + defaultLogo) {
            e.currentTarget.src = defaultLogo;
          } else {
            e.currentTarget.style.display = 'none';
          }
        }} 
      />
    </Link>
  );
}
