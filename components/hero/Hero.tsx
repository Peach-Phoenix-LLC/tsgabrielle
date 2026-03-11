"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const Hero3DCanvas = dynamic(
  () => import("@/components/hero/Hero3DCanvas").then((m) => m.Hero3DCanvas),
  { ssr: false }
);

export function Hero({ enable3D }: { enable3D: boolean }) {
  return (
    <section className="container-luxe grid items-center gap-10 py-16 lg:grid-cols-2">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-phoenix">Peach Phoenix Luxury</p>
        <h1 className="mt-4 font-display text-5xl leading-tight">
          Inclusive fashion and décor with couture energy.
        </h1>
        <p className="mt-4 max-w-xl text-night/80">
          Curated collections, global fulfillment, and premium quality via Supabase, Printful, and
          PayPal.
        </p>
        <Link
          href="/collections"
          className="mt-6 inline-flex rounded-full bg-phoenix px-6 py-3 text-sm font-semibold text-white"
        >
          Explore Collections
        </Link>
      </div>
      <div>
        {enable3D ? (
          <Hero3DCanvas />
        ) : (
          <Image
            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200"
            alt="Luxury collection"
            width={1200}
            height={900}
            className="h-[340px] w-full rounded-2xl object-cover shadow-luxe"
          />
        )}
      </div>
    </section>
  );
}
