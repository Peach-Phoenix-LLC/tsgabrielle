"use client";

import Link from "next/link";
import Image from "next/image";
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
    <Link href={href} className={`inline-flex items-end ${className}`.trim()}>
      <Image 
        src={logoUrl} 
        alt="logo" 
        width={150} 
        height={50} 
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
      <span 
        className="font-display font-bold leading-none -ml-2 pb-1 tracking-tighter text-2xl lg:text-4xl"
        style={{
          backgroundImage: "url('/images/tsgabrielle-us.gif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          display: "inline-block"
        }}
      >
        .us
      </span>
    </Link>
  );
}
