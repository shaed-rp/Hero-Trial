import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'px.ads.linkedin.com',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
