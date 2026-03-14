"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  heading: string;
  subheading: string;
  backgroundImage: string;
  ctaText: string;
  ctaLink: string;
  overlayOpacity?: number;
  textAlign?: "left" | "center" | "right";
}

export default function HeroSection({
  heading,
  subheading,
  backgroundImage,
  ctaText,
  ctaLink,
  overlayOpacity = 0.4,
  textAlign = "center",
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt={heading}
          fill
          className="object-cover"
          priority
        />
      )}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />
      <div
        className={`relative z-10 max-w-4xl mx-auto px-6 text-${textAlign}`}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-[family-name:var(--font-space-grotesk)]">
          {heading}
        </h1>
        {subheading && (
          <p className="text-lg md:text-xl text-white/80 mb-8">{subheading}</p>
        )}
        {ctaText && (
          <Link
            href={ctaLink || "/"}
            className="inline-block bg-[#a932bd] hover:bg-[#921fa6] text-white px-8 py-3 rounded-full text-sm uppercase tracking-widest font-bold transition-colors"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  );
}
