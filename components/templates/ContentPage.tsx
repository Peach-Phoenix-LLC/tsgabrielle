import React from "react";
import Image from "next/image";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

interface ContentPageProps {
  title: string;
  subtitle?: string;
  heroImage?: string;
  heroVideo?: string;
  body: React.ReactNode;
}

export function ContentPage({ title, subtitle, heroImage, heroVideo, body }: ContentPageProps) {
  const renderContent = (content: string) => {
    // If it looks like HTML or Markdown, render it
    const isMarkdownOrHtml = /<[a-z][\s\S]*>|#{1,6}\s|\*\*|__|\d+\.\s|\*\s|-\s|\[.*\]\(.*\)/.test(content);
    
    if (isMarkdownOrHtml) {
      const html = marked.parse(content, { gfm: true, breaks: true }) as string;
      const cleanHtml = DOMPurify.sanitize(html);
      return <div className="prose prose-neutral max-w-none" dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
    }
    
    return <p className="whitespace-pre-wrap">{content}</p>;
  };

  return (
    <div className="bg-white pb-32">
      {(heroImage || heroVideo) ? (
        <section className="relative flex h-screen items-center justify-center overflow-hidden -mt-[100px] lg:-mt-[112px]">
          <div className="absolute inset-0">
            {heroVideo ? (
              <video
                src={heroVideo}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            ) : heroImage ? (
              <Image
                src={heroImage}
                alt={title}
                fill
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>
        </section>
      ) : (
        <section className="pt-40 lg:pt-56 pb-16 text-center px-4">
           {subtitle && <p className="text-[11px] uppercase tracking-[0.4em] text-[#a932bd] font-medium mb-6">{subtitle}</p>}
           <h1 className="text-5xl md:text-7xl font-light tracking-tight text-[#111111]">{title}</h1>
        </section>
      )}

      <section className="container-luxe max-w-4xl mx-auto relative z-20 py-24">
        <div className="text-center mb-16">
          {subtitle && (
            <p className="text-[11px] uppercase tracking-[0.4em] text-[#a932bd] font-medium mb-4">
              {subtitle}
            </p>
          )}
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-[#111111] capitalize">
            {title}
          </h1>
        </div>
        <div className="text-[#555555] space-y-8 text-lg font-light leading-[2] tracking-wide">
          {typeof body === "string" ? renderContent(body) : body}
        </div>
      </section>
    </div>
  );
}
