import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import FloridaCountyMap from "@/components/FloridaCountyMap";
import MarketplaceListingCard from "@/components/MarketplaceListingCard";
import { countySlug, getCountyBySlug } from "@/data/florida-counties";
import type { Listing } from "@/data/listings";
import {
  marketplaceListingDescriptionParts,
  sellerReportedStatusLabel,
} from "@/lib/county-listing-descriptions";
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
import "@/app/listings/listings-focused-card.css";
import "./listing-detail.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const statewideListingsHref = "/listings";

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
  return `View the individual ${listing.county} ${shortLicenseType(listing.type)} listing offered at ${listing.priceLabel}. Review the exact marketplace reference, license details, county information, inquiry options, and offer link.`;
}

function paidSubmissionAsListing(
  submission: NonNullable<Awaited<ReturnType<typeof loadPaidListing>>>,
): Listing | null {
  if (!submission.approvedLicenseType) return null;

  return {
    county: submission.county,
    type: submission.approvedLicenseType,
    price: submission.approvedAskingPrice,
    priceLabel: priceLabel(submission.approvedAskingPrice),
    sourceRef: submission.submissionRef,
    sourceName: "Florida Liquor License Market",
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
    (listing) => listing.sourceRef?.trim().toLowerCase() === paidListing.sourceRef?.trim().toLowerCase(),
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
  if (!context) notFound();

  const { selected, listings } = context;
  const selectedReference = selected.sourceRef;
  if (!selectedReference) notFound();
  const normalizedReference = selectedReference.trim().toLowerCase();
  const countyHref = `/counties/${countySlug(selected.county)}`;
  const filteredCountyHref = `/listings?county=${encodeURIComponent(selected.county)}&status=available`;
  const canonicalPath = listingPageHref(selected);
  const canonical = `${siteUrl}${canonicalPath}`;
  const county = getCountyBySlug(countySlug(selected.county));
  const descriptionParts = marketplaceListingDescriptionParts({
    county: selected.county,
    licenseType: selected.type,
    licenseStatus: selected.licenseStatus,
    preferredTiming: selected.preferredTiming,
  });
  const statusLabel = selected.licenseStatus
    ? `${sellerReportedStatusLabel(selected.licenseStatus)} / Available`
    : "Available / Status to confirm";
  const inquiryParams = new URLSearchParams({
    source: "specific-license",
    listing: `${selectedReference} — ${selected.county} — ${selected.type} — ${selected.priceLabel}`,
    ref: selectedReference,
    county: selected.county,
    license_type: selected.type,
    asking_price: selected.priceLabel,
    listing_status: statusLabel,
    listing_url: canonicalPath,
  });
  const inquiryHref = `/contact?${inquiryParams.toString()}`;
  const offerHref = `/submit-offer?listing=${encodeURIComponent(`${selected.county} ${selected.type}`)}&ref=${encodeURIComponent(selectedReference)}`;
  const related = listings
    .filter((listing) =>
      Boolean(listing.sourceRef) &&
      listing.county === selected.county &&
      listing.sourceRef?.trim().toLowerCase() !== normalizedReference,
    )
    .slice(0, 3);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: marketplaceTitle(selected),
      url: canonical,
      description: marketplaceDescription(selected),
      isPartOf: {
        "@type": "CollectionPage",
        name: "Florida Liquor Licenses for Sale",
        url: `${siteUrl}${statewideListingsHref}`,
      },
      about: {
        "@type": "Thing",
        name: `${selected.type} in ${selected.county}`,
        identifier: selectedReference,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Florida Liquor Licenses for Sale",
          item: `${siteUrl}${statewideListingsHref}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: selected.county,
          item: `${siteUrl}${countyHref}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: `${selected.type} — ${selected.priceLabel}`,
          item: canonical,
        },
      ],
    },
  ];

  return (
    <main className="results-page marketplace-listing-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <header className="results-header page-shell">
        <Link className="seller-brand" href="/" aria-label="Florida Liquor License Market home">
          <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
        </Link>
        <nav aria-label="Listings navigation">
          <Link href="/">Home</Link>
          <Link href="/listings">Florida Liquor Licenses for Sale</Link>
          <Link href="/counties">Counties</Link>
          <Link href="/sell-your-license">List Your License</Link>
          <Link href="/contact">Contact Us</Link>
        </nav>
      </header>

      <section className="marketplace-listing-hero">
        <div className="marketplace-listing-shell marketplace-listing-hero-grid">
          <div className="marketplace-listing-copy">
            <div className="marketplace-listing-breadcrumbs">
              <Link href={statewideListingsHref}>Florida Liquor Licenses for Sale</Link>
              <span>›</span>
              <Link href={countyHref}>{selected.county}</Link>
              <span>›</span>
              <strong>{selectedReference}</strong>
            </div>
            <span className="marketplace-listing-kicker">Individual Florida Marketplace Listing</span>
            <h1>{selected.county} {shortLicenseType(selected.type)} for Sale</h1>
            <p className="marketplace-listing-price">{selected.priceLabel}</p>
            <div className="marketplace-listing-availability">
              <span className="availability-pill" title={statusLabel}>
                <span className="availability-dot" aria-hidden="true" />
                Available
              </span>
              <span className="marketplace-listing-hero-reference">Listing {selectedReference}</span>
            </div>
            <p className="marketplace-listing-summary">{descriptionParts.license}</p>
            <div className="marketplace-listing-actions">
              <Link className="marketplace-listing-primary" href={inquiryHref}>Inquire About This License</Link>
              <Link className="marketplace-listing-secondary" href={offerHref}>Submit an Offer</Link>
            </div>
          </div>

          <div className="marketplace-listing-map" aria-label={`${selected.county} map`}>
            <FloridaCountyMap county={selected.county} enlarged />
            <strong>{selected.county}</strong>
            {descriptionParts.cities && <span>{descriptionParts.cities}</span>}
          </div>
        </div>
      </section>

      <section className="marketplace-listing-body">
        <div className="marketplace-listing-shell">
          <div className="marketplace-listing-grid">
            <article className="marketplace-listing-main">
              <div className="marketplace-listing-heading">
                <span>Specific License Details</span>
                <h2>{selected.type} in {selected.county}</h2>
              </div>

              <div className="marketplace-listing-facts" aria-label="Specific listing details">
                <div><span>Asking Price</span><strong>{selected.priceLabel}</strong></div>
                <div><span>License Type</span><strong>{selected.type}</strong></div>
                <div><span>County</span><strong>{selected.county}</strong></div>
                <div><span>Marketplace Status</span><strong>{statusLabel}</strong></div>
              </div>

              <div className="marketplace-listing-reference marketplace-listing-reference-inline">
                <span>Exact Marketplace Reference</span>
                <strong>{selectedReference}</strong>
                <p>This page is the individual detail page for this specific listed license.</p>
              </div>

              {selected.note && (
                <div className="marketplace-listing-note">
                  <strong>Listing note</strong>
                  <p>{selected.note}</p>
                </div>
              )}

              <section className="marketplace-listing-section">
                <h2>About This License Listing</h2>
                <p>This individual marketplace page represents the specific {selected.type} liquor-license interest identified as {selectedReference} in {selected.county}. The displayed asking price is {selected.priceLabel}. Availability, price, license status, transferability, liens, and transaction terms should be confirmed before reliance or commitment.</p>
                <p>Unless an individual listing expressly states otherwise, the offering concerns a liquor-license interest only and does not include an operating business, leasehold, equipment, inventory, or real estate.</p>
              </section>

              <section className="marketplace-listing-section">
                <h2>{selected.county} Market Context</h2>
                <p>{county?.marketOverview ?? descriptionParts.county}</p>
                {descriptionParts.cities && <p>{descriptionParts.cities}</p>}
                <p><Link href={filteredCountyHref}>Compare current {selected.county} listings →</Link></p>
              </section>

              {selected.sourceName && (
                <section className="marketplace-listing-section marketplace-listing-source-section">
                  <h2>Listing Source</h2>
                  <p>The marketplace record identifies the source as <strong>{selected.sourceName}</strong>. Price and availability remain subject to confirmation.</p>
                  {selected.sourceUrl && (
                    <p><a href={selected.sourceUrl} target="_blank" rel="noopener noreferrer">Review the source listing →</a></p>
                  )}
                </section>
              )}
            </article>

            <aside className="marketplace-listing-aside">
              <div className="marketplace-listing-action-card">
                <span>Interested in This Exact License?</span>
                <h2>Use Reference {selectedReference}</h2>
                <ol>
                  <li>Confirm the license reference, category, county, and current availability.</li>
                  <li>Review the asking price and proposed transaction terms.</li>
                  <li>Verify the intended premises, local approvals, liens, and transfer requirements.</li>
                  <li>Use independent legal, tax, and financial professionals before closing.</li>
                </ol>
                <Link className="marketplace-listing-primary" href={inquiryHref}>Request Confidential Details</Link>
                <Link className="marketplace-listing-text-link" href={offerHref}>Submit an offer for this license →</Link>
                <Link className="marketplace-listing-text-link" href={countyHref}>View the {selected.county} market →</Link>
                <Link className="marketplace-listing-text-link" href={statewideListingsHref}>Return to all Florida listings →</Link>
              </div>

              <div className="marketplace-listing-reference">
                <span>Individual Listing Page</span>
                <strong>{selectedReference}</strong>
                <p>The URL and page content identify this license separately from the statewide inventory.</p>
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <section className="marketplace-listing-related">
              <div className="marketplace-listing-heading">
                <span>More in This County</span>
                <h2>Other {selected.county} Liquor Licenses for Sale</h2>
              </div>
              <div className="results-grid listing-detail-related-grid">
                {related.map((listing) => (
                  <MarketplaceListingCard
                    listing={listing}
                    actionLabel="View License Details"
                    key={listing.sourceRef ?? `${listing.county}-${listing.type}-${listing.priceLabel}`}
                  />
                ))}
              </div>
            </section>
          )}

          <div className="marketplace-listing-disclaimer">
            Marketplace information is provided for informational purposes and remains subject to seller or broker confirmation. Florida Liquor License Market does not guarantee availability, transfer approval, price, or transaction terms. Independent legal, tax, financial, zoning, and regulatory review is recommended.
          </div>
        </div>
      </section>
    </main>
  );
}
