"use client";

import React from "react";
import DOMPurify from "isomorphic-dompurify";

interface CustomHtmlSectionProps {
  html: string;
}

export default function CustomHtmlSection({ html }: CustomHtmlSectionProps) {
  const clean = DOMPurify.sanitize(html, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling", "target"],
  });

  return (
    <section className="py-8 px-6">
      <div
        className="max-w-6xl mx-auto prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: clean }}
      />
    </section>
  );
}
