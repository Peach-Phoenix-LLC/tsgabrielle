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
    <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden bg-transparent">
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className="object-contain object-center"
        priority
      />
    </section>
  );
}
