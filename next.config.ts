import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev",
      },
    ],
  },
  // SEO: Trailing slashes off for consistency; adjust to true if preferred
  trailingSlash: false,
  // Generate static routes at build time for faster loading
  // output: "export", // Uncomment if deploying static-only
};

export default nextConfig;
