import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: process.cwd()
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "files.cdn.printful.com" }
    ]
  },
  async redirects() {
    return [
      // Dynamic Short URL Redirection Rule
      { source: '/categories/:slug', destination: '/:slug', permanent: true },
      { source: '/collections/:slug', destination: '/:slug', permanent: true },
      { source: '/product/:slug', destination: '/:slug', permanent: true },

      // Legacy & Specific Categories
      { source: '/him', destination: '/categories/for-him', permanent: true },
      { source: '/her', destination: '/categories/for-her', permanent: true },

      // Old Collection Slugs to Short URLs
      { source: '/pride-26', destination: '/pride', permanent: true },
      { source: '/glow-in-winter-26', destination: '/glow', permanent: true },
      { source: '/good-vibes-only', destination: '/good', permanent: true },
      { source: '/crystal-skies', destination: '/crystal', permanent: true },
      { source: '/edition-spatiale', destination: '/edition', permanent: true },
      { source: '/peach-phoenix', destination: '/peach', permanent: true },

      // Collabs
      { source: '/adidas', destination: '/adidas-x-tsgabrielle', permanent: true },
      { source: '/champion', destination: '/champion-heritage', permanent: true },
      { source: '/columbia', destination: '/columbia-sportswear', permanent: true },
      { source: '/under-armour', destination: '/under-armour-performance', permanent: true },

      // Videos
      { source: '/videos-by-youtube', destination: '/videos', permanent: true },
    ]
  }
};

export default nextConfig;
