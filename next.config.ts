import type { NextConfig } from "next";
import { legacyRedirects } from "./src/data/legacy/redirects";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Every URL of the old PHP website keeps working (308 permanent redirect).
  async redirects() {
    return legacyRedirects.map((redirect) => ({ ...redirect, permanent: true }));
  },
};

export default nextConfig;
