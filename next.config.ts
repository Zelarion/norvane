import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this app (avoids multi-lockfile inference warning).
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
