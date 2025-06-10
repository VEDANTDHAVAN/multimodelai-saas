import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.together.ai',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'together-ai-bfl-images-prod.s3.us-west-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      // Add other image domains you might need
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
