import type { NextConfig } from "next";

const mirroredRoutes = [
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
        { source: "/assets/fllm-email-logo.png", destination: "/api/email-logo" },
        { source: "/", destination: "/api/homepage-with-careers" },
        { source: "/contact", destination: "/api/contact-page" },
        { source: "/financing", destination: "/api/financing-page" },
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
