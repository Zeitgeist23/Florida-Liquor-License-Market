import type { NextConfig } from "next";

const mirroredRoutes = [
  "financing-disclosure",
  "private-lending-disclosure",
  "privacy-policy",
  "terms-of-use",
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingIncludes: {
    "/api/contact-page": ["./public/contact/index.html"],
  },
  async redirects() {
    return [
      {
        source: "/florida-liquor-licenses-for-sale",
        destination: "/listings",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/downloads/FLLM_Official_Buyers_and_Sellers_Guide_2026.pdf",
          destination: "/api/guide-download?source=direct-file-url&action=direct",
          missing: [{ type: "query", key: "fllm_raw" }],
        },
        { source: "/assets/florida-map-clean.png", destination: "/api/market-map" },
        { source: "/assets/fllm-email-logo.png", destination: "/api/email-logo" },
        { source: "/", destination: "/api/homepage-final" },
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
