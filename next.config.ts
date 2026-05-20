import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Server-side rendering enabled for API routes and MongoDB support
  // Note: This configuration is for Vercel deployment, not GitHub Pages
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
