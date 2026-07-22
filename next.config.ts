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
        { source: "/", destination: "/index.html" },
        ...mirroredRoutes.map((route) => ({
          source: `/${route}`,
          destination: `/${route}/index.html`,
        })),
      ],
    };
  },
};

export default nextConfig;
