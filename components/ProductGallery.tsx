'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

interface ProductGalleryProps {
  images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-neutral-900 group">
      {/* Main Fullscreen Slide */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="relative w-full h-full"
          >
            <Image
              src={images[currentIndex]}
              alt={`Product perspective ${currentIndex + 1}`}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between px-4 md:px-10 z-20 pointer-events-none">
        <button
          onClick={prevSlide}
          className="p-4 rounded-full bg-black/10 backdrop-blur-sm text-white border border-white/10 hover:bg-black/30 hover:scale-110 transition-all pointer-events-auto"
          aria-label="Previous view"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="p-4 rounded-full bg-black/10 backdrop-blur-sm text-white border border-white/10 hover:bg-black/30 hover:scale-110 transition-all pointer-events-auto"
          aria-label="Next view"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Thumbnails Row (Miniatures) */}
      <div className="absolute bottom-16 left-0 right-0 z-30 px-6">
        <div className="max-w-fit mx-auto flex flex-row items-center gap-4 overflow-x-auto no-scrollbar p-2 bg-black/20 backdrop-blur-md rounded-lg border border-white/5">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={clsx(
                "relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 border transition-all duration-500 overflow-hidden rounded-sm",
                currentIndex === idx ? "border-white opacity-100 scale-105" : "border-transparent opacity-40 hover:opacity-80"
              )}
            >
              <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
