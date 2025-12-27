import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages serves from a repo subpath like /repo-name/
  basePath: '/next-zen-stem-academy',
  // Skip trailing slash for compatibility
  trailingSlash: true,
};

export default nextConfig;
