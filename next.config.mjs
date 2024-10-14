/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
    reactCompiler: true,
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "whwbcqgvfsecuejrnlhl.supabase.co",
        port: "",
        pathname: "/**",
      },
      // TODO: temp (Jakub Jirous 2024-10-11 11:55:49)
      {
        protocol: "https",
        hostname: "randomwordgenerator.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
