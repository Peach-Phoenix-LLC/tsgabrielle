"use client";

import Link from "next/link";
import { useSettings } from "@/components/providers/SettingsProvider";

type BrandLogoProps = {
  href?: string;
  className?: string;
  color?: 'light' | 'dark' | 'purple'; // Added color prop
};

export function BrandLogo({ href = "/", className = "", color = 'light' }: BrandLogoProps) {
  const settings = useSettings();
  
  let defaultLogo: string;
  if (color === 'purple') {
    defaultLogo = "/images/tsgabrielle-logo-purple.png";
  } else if (color === 'dark') {
    defaultLogo = "/images/tsgabrielle-logo.png";
  } else {
    defaultLogo = "/images/tsgabrielle-logo-white.png";
  }

  const logoUrl = (color === 'purple' || color === 'dark') ? defaultLogo : (settings?.site_logo || defaultLogo);

  return (
    <Link href={href} className={`inline-flex items-center ${className}`.trim()}>
      <img 
        src={logoUrl} 
        alt="logo" 
        className="h-full w-auto object-contain"
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
