import React from "react";

interface ContentPageProps {
  title: string;
  subtitle?: string;
  heroImage?: string;
  body: React.ReactNode;
}

export function ContentPage({ title, subtitle, heroImage, body }: ContentPageProps) {
  return (
    <div className="bg-white pb-32">
      {heroImage ? (
        <section className="relative flex h-[70vh] items-center justify-center overflow-hidden -mt-[100px] lg:-mt-[112px]">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt={title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 text-center text-white space-y-6 px-4 max-w-4xl mx-auto">
             {subtitle && <p className="text-[11px] uppercase tracking-[0.4em] font-light">{subtitle}</p>}
             <h1 className="text-5xl md:text-7xl font-light tracking-wide uppercase">{title}</h1>
          </div>
        </section>
      ) : (
        <section className="pt-40 lg:pt-56 pb-16 text-center px-4">
           {subtitle && <p className="text-[11px] uppercase tracking-[0.4em] text-[#a932bd] font-medium mb-6">{subtitle}</p>}
           <h1 className="text-5xl md:text-7xl font-light tracking-tight text-[#111111]">{title}</h1>
        </section>
      )}

      <section className="container-luxe max-w-4xl mx-auto relative z-20">
        <div className={`bg-white ${heroImage ? '-mt-16 p-10 md:p-16 shadow-2xl rounded-sm' : ''} text-[#555555] space-y-8 text-lg font-light leading-[2] tracking-wide`}>
          {typeof body === 'string' ? (
            <p className="whitespace-pre-wrap">{body}</p>
          ) : (
            body
          )}
        </div>
      </section>
    </div>
  );
}
