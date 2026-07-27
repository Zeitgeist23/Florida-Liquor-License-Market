import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/submit-offer"],
    },
    sitemap: "https://www.floridaliquorlicensemarket.com/sitemap.xml",
    host: "https://www.floridaliquorlicensemarket.com",
  };
}
