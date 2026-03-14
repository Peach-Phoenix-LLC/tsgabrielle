"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  image: string;
  heading: string;
  description?: string;
}

interface SliderSectionProps {
  slides: Slide[];
  autoplay?: boolean;
  interval?: number;
}

export default function SliderSection({
  slides = [],
  autoplay = true,
  interval = 5000,
}: SliderSectionProps) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = () => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!autoplay || slides.length <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoplay, interval, slides.length, next]);

  if (slides.length === 0) {
    return (
      <section className="py-16 px-6 text-center text-gray-400">
        No slides configured
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden">
      <div className="relative aspect-[21/9]">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          >
            {slide.image ? (
              <Image src={slide.image} alt={slide.heading} fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-[#0f1720] to-[#a932bd]/30" />
            )}
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{slide.heading}</h2>
                {slide.description && (
                  <p className="text-white/80 text-lg">{slide.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full backdrop-blur-sm transition-colors"
          >
            <ChevronLeft className="text-white" size={24} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full backdrop-blur-sm transition-colors"
          >
            <ChevronRight className="text-white" size={24} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === current ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
