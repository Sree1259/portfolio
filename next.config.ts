import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Strip console.* calls from the production client bundle.
  // The API route (server-side) is unaffected — it uses no console calls anyway.
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  images: {
    // All portfolio images are served from /public (local).
    // No remote image domains are required for the MVP.
    // Add remotePatterns here if external image URLs are introduced later.
    remotePatterns: [],
  },
};

export default nextConfig;
