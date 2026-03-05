"use client";

import { useEffect } from "react";

/**
 * useAntigravityParallax - Hardware-accelerated parallax for tsgabrielle®
 * Applies translate3d transformations to elements with the .parallax-layer class
 * based on their data-speed attribute.
 */
export function useAntigravityParallax() {
  useEffect(() => {
    const handleScroll = () => {
      // Use requestAnimationFrame for optimal performance and sync with refresh rate
      window.requestAnimationFrame(() => {
        const scrollPosition = window.scrollY;
        const floatingLayers = document.querySelectorAll<HTMLElement>(".parallax-layer");

        floatingLayers.forEach((layer) => {
          const speedAttr = layer.getAttribute("data-speed");
          const speed = speedAttr ? parseFloat(speedAttr) : 0.5;
          
          // Calculate displacement: negative Y pos creates upward "float" relative to scroll
          const yPos = -(scrollPosition * speed);
          
          // translate3d enforces GPU rendering per tsgabrielle® directives
          layer.style.transform = `translate3d(0px, ${yPos}px, 0px)`;
        });
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Clean up listener on unmount to prevent memory leaks in the SPA environment
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
