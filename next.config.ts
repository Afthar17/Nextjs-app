import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [{
      hostname: 'glhmgxolor.ufs.sh'
    }]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
