import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ListingsHeatMapEnhancement from "@/components/ListingsHeatMapEnhancement";
import ListingsPage from "@/components/ListingsPage";
import ListingsQueryFilterEnhancement from "@/components/ListingsQueryFilterEnhancement";
import MonroeMapCompletion from "@/components/MonroeMapCompletion";
import type { Listing } from "@/data/listings";
import { prepareListingsForDisplay } from "@/lib/listing-display";
import { indexableListingPages, listingPageHref } from "@/lib/listing-page-urls";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getApprovedSubmissionByPublicRef } from "@/lib/listing-submission-store";

import "@/app/listings/listings-premium.css";
import "@/app/listings/listings-header-position.css";
import "@/app/listings/listings-map-size.css";
import "@/app/listings/listings-county-links.css";
import "@/app/listings/listings-navy-refresh.css";
import "@/app/listings/listings-card-gold-borders.css";
import "@/app/listings/listings-title-highlight.css";
import "@/app/listings/listings-regression-fix.css";
import "@/app/listings/listings-filter-depth.css";
import "@/app/listings/listings-logo-3pct-lock.css";
import "@/app/listings/listings-conversion-cards.css";
import "@/app/listings/listings-card-overlap-fix.css";
import "@/app/listings/listings-masthead-darker.css";
import "@/app/listings/listings-mobile-header-fix.css";
import "@/app/listings/listings-seo-footer.css";
import "@/app/listings/listings-focused-card.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function publicPaidReference(slug: string) {
  const reference = decodeURIComponent(slug).trim().toUpperCase();
  return /^FLLM-PAID-/.test(reference) ? reference : null;
}

async function loadPaidListing(slug: string) {
  const reference = publicPaidReference(slug);
  if (!reference) return null;
  try {
    return await getApprovedSubmissionByPublicRef(reference);
  } catch (error) {
    console.error("Paid listing lookup failed", error);
    return null;
  }
}

function priceLabel(value: number | null) {
  if (value === null) return "Price Undisclosed";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function shortLicenseType(type: Listing["type"]) {
  return type === "4COP Quota" ? "4COP Liquor License" : "3PS Liquor License";
}

function marketplaceTitle(listing: Listing) {
  return `${listing.county} ${shortLicenseType(listing.type)} for Sale | ${listing.priceLabel}`;
}

function marketplaceDescription(listing: Listing) {
  return `View a ${listing.county} ${shortLicenseType(listing.type)} for sale at ${listing.priceLabel}. Compare it in the standard Florida Liquor License Market inventory and review current county opportunities.`;
}

function paidSubmissionAsListing(
  submission: NonNullable<Awaited<ReturnType<typeof loadPaidListing>>>
): Listing | null {
  if (!submission.approvedLicenseType) return null;

  return {
    county: submission.county,
    type: submission.approvedLicenseType,
    price: submission.approvedAskingPrice,
    priceLabel: priceLabel(submission.approvedAskingPrice),
    sourceRef: submission.submissionRef,
    note: submission.message || undefined,
    licenseStatus: submission.licenseStatus || undefined,
    preferredTiming: submission.preferredTiming || undefined,
    image: "/assets/license-market/license-01.png",
  };
}

async function loadListingContext(slug: string) {
  const rawListings = await getMarketplaceListings();
  const pages = indexableListingPages(rawListings);
  const entry = pages.find((page) => page.slug === slug);

  if (entry) {
    return {
      selected: entry.listing,
      listings: prepareListingsForDisplay(rawListings),
    };
  }

  const paidSubmission = await loadPaidListing(slug);
  const paidListing = paidSubmission ? paidSubmissionAsListing(paidSubmission) : null;
  if (!paidListing) return null;

  const alreadyIncluded = rawListings.some(
    (listing) => listing.sourceRef?.trim().toLowerCase() === paidListing.sourceRef?.trim().toLowerCase()
  );

  return {
    selected: paidListing,
    listings: prepareListingsForDisplay(alreadyIncluded ? rawListings : [...rawListings, paidListing]),
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const context = await loadListingContext(slug);

  if (!context) {
    return {
      title: "Listing Not Found | Florida Liquor License Market",
      robots: { index: false, follow: false },
    };
  }

  const { selected } = context;
  const canonical = `${siteUrl}${listingPageHref(selected)}`;
  const title = marketplaceTitle(selected);
  const description = marketplaceDescription(selected);

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: "Florida Liquor License Market",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const context = await loadListingContext(slug);
  if (!context?.selected.sourceRef) notFound();

  const { selected, listings } = context;
  const canonical = `${siteUrl}${listingPageHref(selected)}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: marketplaceTitle(selected),
    url: canonical,
    description: marketplaceDescription(selected),
    isPartOf: {
      "@type": "CollectionPage",
      name: "Florida Liquor Licenses for Sale",
      url: `${siteUrl}/listings`,
    },
    about: {
      "@type": "Thing",
      name: `${selected.type} in ${selected.county}`,
      identifier: selected.sourceRef,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />
      <ListingsPage initialListings={listings} focusReference={selected.sourceRef} />
      <ListingsQueryFilterEnhancement />
      <MonroeMapCompletion />
      <ListingsHeatMapEnhancement />
    </>
  );
}
