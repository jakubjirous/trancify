import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
    reactCompiler: true,
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
};

export default nextConfig;
