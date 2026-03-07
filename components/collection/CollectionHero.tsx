"use client";

import Image from "next/image";

type Props = {
  imageUrl?: string;
  alt?: string;
  overlayColor?: string;
  descriptions?: string[];
};

export default function CollectionHero({
  imageUrl,
  alt = "Collection hero",
  overlayColor = "rgba(0,0,0,0.1)",
  descriptions = [],
}: Props) {
  if (!imageUrl) return null; // Or return a fallback container, but omitting the hero if no image looks cleaner

  return (
    <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0" style={{ backgroundColor: overlayColor }} />
      {descriptions.length > 0 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-[92%] max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-2">
          {descriptions.slice(0, 3).map((text, index) => (
            <p key={`${index}-${text.slice(0, 16)}`} className="bg-white/80 backdrop-blur px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-[#111111]">
              {text}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}
