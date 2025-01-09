import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/roadmap",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === "production" ? "/roadmap" : "",
};

export default nextConfig;
