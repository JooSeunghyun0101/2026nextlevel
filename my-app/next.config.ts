import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @ts-expect-error - Disabling dev indicators to remove the "N" icon
  devIndicators: false,
};

export default nextConfig;
