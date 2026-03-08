import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },

 images: {
  unoptimized: true, // ⭐ MOST IMPORTANT FIX
  remotePatterns: [
    { protocol: "https", hostname: "utfs.io" },
    { protocol: "https", hostname: "uploadthing.com" },
    { protocol: "https", hostname: "ufs.sh" },
    { protocol: "https", hostname: "*.ufs.sh" },
  ],
},
  turbopack: {},
};

export default nextConfig;
