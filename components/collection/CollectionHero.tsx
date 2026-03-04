"use client";

import Image from "next/image";

type Props = {
  imageUrl?: string;
  alt?: string;
};

export default function CollectionHero({ imageUrl, alt = "Collection hero" }: Props) {
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
      {/* subtle dark overlay for readability if text was inside, but left as design touch */}
      <div className="absolute inset-0 bg-black/10" />
    </section>
  );
}
