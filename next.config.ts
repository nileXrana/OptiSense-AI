import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'img.clerk.com',
      'images.clerk.dev'
    ],
  },
};

export default nextConfig;
