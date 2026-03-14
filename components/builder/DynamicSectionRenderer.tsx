"use client";

import React from "react";
import { PageSection } from "@/lib/types";
import { Hero } from "@/components/hero/Hero";
import { ProductGrid } from "@/components/product/ProductGrid";
import { EditableText } from "./EditableText";

interface DynamicSectionRendererProps {
  section: PageSection;
  index: number;
}

export function DynamicSectionRenderer({ section, index }: DynamicSectionRendererProps) {
  switch (section.type) {
    case "hero":
      return (
        <Hero 
          id={section.id}
          title={section.content?.title}
          subtitle={section.content?.subtitle}
          description={section.content?.description}
          buttonText={section.content?.buttonText}
          buttonLink={section.settings?.buttonLink}
          image={section.content?.image}
          enable3D={section.settings?.enable3D}
        />
      );

    case "product-grid":
      return (
        <section className="py-20 bg-white">
          <div className="container-luxe">
            <div className="mb-12">
              <EditableText 
                contentKey={`section-${section.id}-title`}
                initialContent={section.content?.title || "Featured Products"}
                className="text-2xl font-light tracking-tight"
              />
            </div>
            <ProductGrid products={section.content?.products || []} />
          </div>
        </section>
      );

    case "text-block":
      return (
        <section className="py-20 bg-white">
          <div className="container-luxe max-w-3xl text-center space-y-6">
            <EditableText 
              contentKey={`section-${section.id}-heading`}
              initialContent={section.content?.heading || "Section Heading"}
              className="text-3xl font-light tracking-tight"
            />
            <EditableText 
              contentKey={`section-${section.id}-body`}
              initialContent={section.content?.body || "Start typing your content here..."}
              className="text-lg text-black/60 font-light leading-relaxed"
            />
          </div>
        </section>
      );

    default:
      return (
        <div className="py-10 border-2 border-dashed border-black/10 rounded-xl flex items-center justify-center text-black/20 text-[10px] uppercase tracking-widest">
          Unknown Section Type: {section.type}
        </div>
      );
  }
}
