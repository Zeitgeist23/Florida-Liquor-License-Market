import type { MetadataRoute } from "next";
import { ABT_FORMS } from "@/data/abt-forms";
import { countyValuationGuideHref, countyValuationGuideSlugs } from "@/data/county-valuation-guides";
import { indexableCounties } from "@/data/florida-counties";
import { NEWS_ARTICLES } from "@/data/news-articles";
import { indexableListingPages, listingPageHref } from "@/lib/listing-page-urls";
import { getMarketplaceListings } from "@/lib/listing-store";

const siteUrl = "https://www.floridaliquorlicensemarket.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const corePages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/listings`, lastModified, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/free-guide`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/how-to-buy-florida-liquor-license`, lastModified, changeFrequency: "monthly", priority: 0.95 },
    { url: `${siteUrl}/how-to-sell-florida-liquor-license`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/florida-liquor-license-broker`, lastModified, changeFrequency: "monthly", priority: 0.92 },
    { url: `${siteUrl}/how-to-finance-florida-liquor-license`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/private-liquor-license-lenders`, lastModified, changeFrequency: "monthly", priority: 0.82 },
    { url: `${siteUrl}/self-directed-ira-liquor-license-lending`, lastModified, changeFrequency: "monthly", priority: 0.72 },
    { url: `${siteUrl}/florida-4cop-liquor-license-for-sale`, lastModified, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/florida-3ps-liquor-license-for-sale`, lastModified, changeFrequency: "daily", priority: 0.85 },
    { url: `${siteUrl}/license-types/4cop-quota`, lastModified, changeFrequency: "monthly", priority: 0.82 },
    { url: `${siteUrl}/license-types/3ps-package-store`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/license-types/2cop-beer-wine`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/license-types/4cop-sfs-restaurant`, lastModified, changeFrequency: "monthly", priority: 0.72 },
    { url: `${siteUrl}/florida-liquor-license-value`, lastModified, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/florida-liquor-license-appraisal`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/florida-liquor-license-news`, lastModified, changeFrequency: "daily", priority: 0.75 },
    { url: `${siteUrl}/florida-liquor-license-court-decisions`, lastModified, changeFrequency: "monthly", priority: 0.78 },
    { url: `${siteUrl}/florida-liquor-license-news/park-street-trust-florida-quota-license-court-findings`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/florida-liquor-license-lottery`, lastModified, changeFrequency: "daily", priority: 0.82 },
    { url: `${siteUrl}/dbpr-abt-6002`, lastModified, changeFrequency: "monthly", priority: 0.72 },
    { url: `${siteUrl}/counties`, lastModified, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/florida-liquor-license-market-index`, lastModified, changeFrequency: "daily", priority: 0.94 },
    { url: `${siteUrl}/research`, lastModified, changeFrequency: "weekly", priority: 0.82 },
    { url: `${siteUrl}/sell-your-license`, lastModified, changeFrequency: "monthly", priority: 0.82 },
    { url: `${siteUrl}/brokers/list-your-license`, lastModified, changeFrequency: "monthly", priority: 0.78 },
    { url: `${siteUrl}/financing`, lastModified, changeFrequency: "monthly", priority: 0.72 },
    { url: `${siteUrl}/investment-opportunities`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/careers`, lastModified, changeFrequency: "monthly", priority: 0.45 },
    { url: `${siteUrl}/resources`, lastModified, changeFrequency: "monthly", priority: 0.86 },
    { url: `${siteUrl}/resources/forms`, lastModified, changeFrequency: "weekly", priority: 0.82 },
    { url: `${siteUrl}/resources/application-center`, lastModified, changeFrequency: "weekly", priority: 0.76 },
    { url: `${siteUrl}/resources/quota-transfer-fee-calculator`, lastModified, changeFrequency: "monthly", priority: 0.65 },
    { url: `${siteUrl}/resources/liquor-license-attorneys`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/resources/florida-liquor-license-property-or-privilege`, lastModified, changeFrequency: "monthly", priority: 0.68 },
    { url: `${siteUrl}/resources/liquor-license-attorneys/apply`, lastModified, changeFrequency: "monthly", priority: 0.4 },
    { url: `${siteUrl}/resources/florida-department-of-revenue`, lastModified, changeFrequency: "monthly", priority: 0.58 },
    { url: `${siteUrl}/resources/florida-liquor-license-types`, lastModified, changeFrequency: "monthly", priority: 0.72 },
    { url: `${siteUrl}/resources/florida-liquor-license-system`, lastModified, changeFrequency: "monthly", priority: 0.72 },
    { url: `${siteUrl}/resources/license-fees`, lastModified, changeFrequency: "monthly", priority: 0.58 },
    { url: `${siteUrl}/contact`, lastModified, changeFrequency: "monthly", priority: 0.55 },
  ];

  const abtFormPages: MetadataRoute.Sitemap = ABT_FORMS
    .filter((form) => form.id !== "abt-6002")
    .map((form) => ({
      url: `${siteUrl}/resources/forms/${form.id}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));

  const newsArticlePages: MetadataRoute.Sitemap = NEWS_ARTICLES.map((article) => ({
    url: `${siteUrl}/florida-liquor-license-news/${article.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  const countyPages: MetadataRoute.Sitemap = indexableCounties.map((county) => ({
    url: `${siteUrl}/counties/${county.slug}`,
    lastModified,
    changeFrequency: "daily",
    priority: county.featured ? 0.85 : 0.7,
  }));

  const countyValuationPages: MetadataRoute.Sitemap = countyValuationGuideSlugs.map((slug) => ({
    url: `${siteUrl}${countyValuationGuideHref(slug)}`,
    lastModified,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const marketplaceListings = await getMarketplaceListings();
  const listingPages: MetadataRoute.Sitemap = indexableListingPages(marketplaceListings).map(({ listing }) => ({
    url: `${siteUrl}${listingPageHref(listing)}`,
    lastModified: listing.lastModified,
    changeFrequency: "daily",
    priority: 0.85,
  }));

  return [...corePages, ...abtFormPages, ...newsArticlePages, ...countyPages, ...countyValuationPages, ...listingPages];
}
