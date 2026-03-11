"use client";

import { useSettings } from "./providers/SettingsProvider";

interface BrandNameProps {
  className?: string;
  includeSymbol?: '®' | '™' | '';
}

export function BrandName({ className = '', includeSymbol = '®' }: BrandNameProps) {
  const settings = useSettings();
  const name = settings.site_name || "tsgabrielle";
  
  // Strip special symbols if we're adding them manually
  const displayName = name.replace(/[®™]/g, '');

  return (
    <span className={`font-bold italic lowercase ${className}`}>
      {displayName}{includeSymbol}
    </span>
  );
}
