import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/9rsacix1/**",
      },
    ],
  },
  async redirects() {
    return [{ source: "/contatti", destination: "/", permanent: true }];
  },
};

export default nextConfig;
