"use client";

import React from "react";
import Image from "next/image";

interface ImageTextSectionProps {
  heading: string;
  body: string;
  image: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  backgroundColor?: string;
}

export default function ImageTextSection({
  heading,
  body,
  image,
  imageAlt = "",
  imagePosition = "right",
  backgroundColor,
}: ImageTextSectionProps) {
  return (
    <section
      className="py-16 px-6"
      style={{ backgroundColor: backgroundColor || undefined }}
    >
      <div
        className={`max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center ${
          imagePosition === "left" ? "md:[direction:rtl] md:[&>*]:[direction:ltr]" : ""
        }`}
      >
        <div>
          <h2 className="text-3xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)]">
            {heading}
          </h2>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </div>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
          {image ? (
            <Image src={image} alt={imageAlt} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
              No image set
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
