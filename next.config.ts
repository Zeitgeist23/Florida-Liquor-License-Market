import type { NextConfig } from "next";

const mirroredRoutes = [
  "sell-your-license",
  "financing",
  "investment-opportunities",
  "contact",
  "financing-disclosure",
  "private-lending-disclosure",
  "privacy-policy",
  "terms-of-use",
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/assets/florida-map-clean.png", destination: "/api/market-map" },
        { source: "/", destination: "/api/homepage" },
        ...mirroredRoutes.map((route) => ({
          source: `/${route}`,
          destination: `/${route}/index.html`,
        })),
      ],
    };
  },
};

export default nextConfig;
