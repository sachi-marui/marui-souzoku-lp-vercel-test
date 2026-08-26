import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/lp/souzoku",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
