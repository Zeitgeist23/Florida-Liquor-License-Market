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
        {
          source: "/assets/fllm-preliminary-market-report-preview.webp",
          destination: "/assets/fllm-example-market-report-preview.webp",
        },
        { source: "/assets/florida-map-clean.png", destination: "/api/market-map" },
        { source: "/assets/fllm-email-logo.png", destination: "/api/email-logo" },
        { source: "/", destination: "/api/homepage-with-buy-menu" },
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
