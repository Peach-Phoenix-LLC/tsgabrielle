"use client";

import React from "react";

interface TextBlockSectionProps {
  heading: string;
  body: string;
  textAlign?: "left" | "center" | "right";
  maxWidth?: string;
}

export default function TextBlockSection({
  heading,
  body,
  textAlign = "left",
  maxWidth = "800px",
}: TextBlockSectionProps) {
  return (
    <section className="py-16 px-6">
      <div className="mx-auto" style={{ maxWidth, textAlign }}>
        {heading && (
          <h2 className="text-3xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)]">
            {heading}
          </h2>
        )}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </div>
    </section>
  );
}
