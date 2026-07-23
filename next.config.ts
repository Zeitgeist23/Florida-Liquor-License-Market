import type { NextConfig } from "next";

const mirroredRoutes = [
  "financing",
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
        { source: "/sell-your-license", destination: "/api/sell-page" },
        { source: "/contact", destination: "/api/contact-page" },
        { source: "/investment-opportunities", destination: "/api/investment-page" },
        ...mirroredRoutes.map((route) => ({
          source: `/${route}`,
          destination: `/${route}/index.html`,
        })),
      ],
    };
  },
};

export default nextConfig;
