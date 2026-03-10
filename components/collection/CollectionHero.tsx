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
    <section className="relative h-[100svh] w-full overflow-hidden bg-white">
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className="object-cover object-center"
        priority
      />
    </section>
  );
}
