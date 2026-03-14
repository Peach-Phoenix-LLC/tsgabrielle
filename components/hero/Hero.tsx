"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { EditableText } from "@/components/builder/EditableText";
import { EditableImage } from "@/components/builder/EditableImage";

const Hero3DCanvas = dynamic(
  () => import("@/components/hero/Hero3DCanvas").then((m) => m.Hero3DCanvas),
  { ssr: false }
);

interface HeroProps {
  enable3D?: boolean;
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  image?: string;
  id?: string;
}

export function Hero({ 
  enable3D, 
  title = "Inclusive fashion and décor with couture energy.",
  subtitle = "Peach Phoenix Luxury",
  description = "Curated collections, global fulfillment, and premium quality via Supabase, Printful, and PayPal.",
  buttonText = "Explore Collections",
  buttonLink = "/collections",
  image = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200",
  id = "hero-main"
}: HeroProps) {
  return (
    <section className="container-luxe grid items-center gap-10 py-16 lg:grid-cols-2">
      <div className="space-y-6">
        <EditableText 
          contentKey={`${id}-subtitle`}
          initialContent={subtitle}
          className="text-sm uppercase tracking-[0.2em] text-phoenix font-bold"
        />
        <EditableText 
          contentKey={`${id}-title`}
          initialContent={title}
          className="font-display text-5xl leading-tight"
        />
        <EditableText 
          contentKey={`${id}-description`}
          initialContent={description}
          className="max-w-xl text-night/80 text-lg leading-relaxed"
        />
        <div>
          <Link
            href={buttonLink}
            className="inline-flex rounded-full bg-phoenix px-8 py-4 text-sm font-semibold text-white hover:bg-[#a34a28] transition-colors uppercase tracking-widest"
          >
            <EditableText 
              contentKey={`${id}-button-text`}
              initialContent={buttonText}
              className="bg-transparent border-none p-0 inline"
            />
          </Link>
        </div>
      </div>
      <div className="relative aspect-video lg:aspect-square">
        {enable3D ? (
          <Hero3DCanvas />
        ) : (
          <EditableImage
            contentKey={`${id}-image`}
            initialSrc={image}
            alt="Luxury collection"
            width={1200}
            height={900}
            className="h-full w-full rounded-2xl object-cover shadow-luxe"
          />
        )}
      </div>
    </section>
  );
}

