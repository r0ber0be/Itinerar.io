import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [ 75, 80, 100 ],
    remotePatterns: [{
      protocol: "https",
      hostname: "www.awin1.com",
    }]
  }
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})
 
module.exports = withBundleAnalyzer(nextConfig)

export default nextConfig;
