import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "marui-souzoku-lp-vercel-test.vercel.app",
          },
        ],
        destination: "https://souzoku.marui-ginowan.co.jp/:path*",
        permanent: true,
      },
      {
        source: "/",
        destination: "/lp/souzoku",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
