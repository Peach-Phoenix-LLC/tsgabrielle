"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

interface BannerSectionProps {
  text: string;
  backgroundColor?: string;
  textColor?: string;
  link?: string;
  dismissible?: boolean;
}

export default function BannerSection({
  text,
  backgroundColor = "#a932bd",
  textColor = "#ffffff",
  link,
  dismissible = true,
}: BannerSectionProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const content = (
    <div
      className="py-3 px-6 text-center text-sm font-medium relative"
      style={{ backgroundColor, color: textColor }}
    >
      <span className="uppercase tracking-widest text-xs">{text}</span>
      {dismissible && (
        <button
          onClick={(e) => {
            e.preventDefault();
            setDismissed(true);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );

  if (link) {
    return <Link href={link}>{content}</Link>;
  }

  return content;
}
