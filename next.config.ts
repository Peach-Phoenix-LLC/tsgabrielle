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
      // Categories
      { source: '/him', destination: '/categories/for-him', permanent: true },
      { source: '/her', destination: '/categories/for-her', permanent: true },

      // Collections
      { source: '/pride', destination: '/collections/pride-26', permanent: true },
      { source: '/winter', destination: '/collections/glow-in-winter-26', permanent: true },

      // Collabs
      { source: '/adidas', destination: '/adidas-x-tsgabrielle', permanent: true },
      { source: '/champion', destination: '/champion-heritage', permanent: true },
      { source: '/columbia', destination: '/columbia-sportswear', permanent: true },
      { source: '/under-armour', destination: '/under-armour-performance', permanent: true },
    ]
  }
};

export default nextConfig;
