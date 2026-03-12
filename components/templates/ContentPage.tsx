import React from "react";
import Image from "next/image";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";
import BuilderText from "@/components/builder/BuilderText";

interface ContentPageProps {
  title: string;
  subtitle?: string;
  heroImage?: string;
  heroVideo?: string;
  body: React.ReactNode;
  allowBuilder?: boolean;
}

export function ContentPage({ title, subtitle, heroImage, heroVideo, body, allowBuilder = true }: ContentPageProps) {
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
      ) : null}

      <section className={`container-luxe max-w-4xl mx-auto relative z-20 px-4 ${(!heroImage && !heroVideo) ? 'pt-48 pb-24' : 'py-24'}`}>
        <div className="text-center mb-16">
          {subtitle && (
            <BuilderText
              contentKey="content_subtitle"
              initialValue={subtitle}
              as="p"
              className="text-[11px] uppercase tracking-[0.4em] text-[#a932bd] font-medium mb-4 block"
              allowBuilder={allowBuilder}
            />
          )}
          <BuilderText
            contentKey="content_title"
            initialValue={title}
            as="h1"
            className="text-5xl md:text-7xl font-light tracking-tight text-[#111111] capitalize block"
            allowBuilder={allowBuilder}
          />
        </div>
        <div className="text-[#555555] space-y-8 text-lg font-light leading-[2] tracking-wide">
          <BuilderText
            contentKey="content_body"
            initialValue={typeof body === "string" ? body : ""}
            as="div"
            multiline={true}
            className="w-full min-h-[500px]"
            allowBuilder={allowBuilder}
          />
          <div className="mt-8 border-t border-[#e7e7e7] pt-8">
            <p className="text-xs uppercase tracking-widest text-black/50 mb-4 bg-gray-50 inline-block px-3 py-1 rounded">Preview Render:</p>
            {typeof body === "string" ? renderContent(body) : body}
          </div>
        </div>
      </section>
    </div>
  );
}
