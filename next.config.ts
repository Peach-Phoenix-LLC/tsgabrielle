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
      {
        source: "/collections/:slug",
        destination: "/:slug",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
