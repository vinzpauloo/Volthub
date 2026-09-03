import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "readdy.ai",
        pathname: "/api/**",
      },
      {
        protocol: "https",
        hostname: "bpemojamotcvagzvaksy.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "(.*\\.vercel\\.app)" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "volthub.ph" }],
        destination: "https://www.volthub.ph/:path*",
        permanent: true,
      },
      {
        source: "/partners",
        destination: "/app",
        permanent: true,
      },
      {
        source: "/blog/complete-guide-to-solar-energy-storage",
        destination: "/blog/ev-charging-trends-philippines-2025",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
