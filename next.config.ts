import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  assetPrefix: process.env.ASSET_PREFIX || undefined,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'files.cdn.printful.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'dynamic-web-app-with-javascript-bucket-565b65b17cf0.storage.googleapis.com',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/products/:id',
        destination: '/:id',
        permanent: true,
      },
    ];
  },
};


export default nextConfig;
