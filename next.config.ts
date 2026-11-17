import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Con Next 16.4 + next-sanity 13 la minificazione server di Turbopack rompe <SanityLive />
  // in prerender ("error in the Server Components render"). Il codice client resta minificato.
  experimental: { serverMinification: false },
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
