import type { MetadataRoute } from "next";
import { indexableCounties } from "@/data/florida-counties";

const siteUrl = "https://www.floridaliquorlicensemarket.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const corePages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/listings`, lastModified, changeFrequency: "daily", priority: 0.95 },
    { url: `${siteUrl}/counties`, lastModified, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/sell-your-license`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/financing`, lastModified, changeFrequency: "monthly", priority: 0.75 },
    { url: `${siteUrl}/investment-opportunities`, lastModified, changeFrequency: "monthly", priority: 0.65 },
    { url: `${siteUrl}/contact`, lastModified, changeFrequency: "monthly", priority: 0.6 },
  ];

  const countyPages: MetadataRoute.Sitemap = indexableCounties.map((county) => ({
    url: `${siteUrl}/counties/${county.slug}`,
    lastModified,
    changeFrequency: "daily",
    priority: county.featured ? 0.9 : 0.75,
  }));

  return [...corePages, ...countyPages];
}
