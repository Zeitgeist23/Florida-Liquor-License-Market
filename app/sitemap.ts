import type { MetadataRoute } from "next";
import { indexableCounties } from "@/data/florida-counties";
import { indexableListingPages, listingPageHref } from "@/lib/listing-page-urls";
import { getMarketplaceListings } from "@/lib/listing-store";

const siteUrl = "https://www.floridaliquorlicensemarket.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const corePages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/listings`, lastModified, changeFrequency: "daily", priority: 0.95 },
    { url: `${siteUrl}/florida-liquor-licenses-for-sale`, lastModified, changeFrequency: "daily", priority: 0.95 },
    { url: `${siteUrl}/florida-4cop-liquor-license-for-sale`, lastModified, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/florida-3ps-liquor-license-for-sale`, lastModified, changeFrequency: "daily", priority: 0.85 },
    { url: `${siteUrl}/counties`, lastModified, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/sell-your-license`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/financing`, lastModified, changeFrequency: "monthly", priority: 0.75 },
    { url: `${siteUrl}/investment-opportunities`, lastModified, changeFrequency: "monthly", priority: 0.65 },
    { url: `${siteUrl}/resources/liquor-license-attorneys`, lastModified, changeFrequency: "monthly", priority: 0.65 },
    { url: `${siteUrl}/resources/liquor-license-attorneys/apply`, lastModified, changeFrequency: "monthly", priority: 0.45 },
    { url: `${siteUrl}/resources/florida-department-of-revenue`, lastModified, changeFrequency: "monthly", priority: 0.65 },
    { url: `${siteUrl}/resources/florida-liquor-license-types`, lastModified, changeFrequency: "monthly", priority: 0.75 },
    { url: `${siteUrl}/resources/license-fees`, lastModified, changeFrequency: "monthly", priority: 0.65 },
    { url: `${siteUrl}/contact`, lastModified, changeFrequency: "monthly", priority: 0.6 },
  ];

  const countyPages: MetadataRoute.Sitemap = indexableCounties.map((county) => ({
    url: `${siteUrl}/counties/${county.slug}`,
    lastModified,
    changeFrequency: "daily",
    priority: county.featured ? 0.9 : 0.75,
  }));

  const marketplaceListings = await getMarketplaceListings();
  const listingPages: MetadataRoute.Sitemap = indexableListingPages(marketplaceListings).map(({ listing }) => ({
    url: `${siteUrl}${listingPageHref(listing)}`,
    changeFrequency: "daily",
    priority: 0.85,
  }));

  return [...corePages, ...countyPages, ...listingPages];
}
