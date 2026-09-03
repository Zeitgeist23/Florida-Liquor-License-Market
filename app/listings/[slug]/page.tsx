import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { cache } from "react";

import FloridaCountyMap from "@/components/FloridaCountyMap";
import FllmExchangePanel from "@/components/FllmExchangePanel";
import HeaderNavMenus from "@/components/HeaderNavMenus";
import MarketplaceListingCard from "@/components/MarketplaceListingCard";
import { countySlug, getCountyBySlug } from "@/data/florida-counties";
import type { Listing } from "@/data/listings";
import {
  marketplaceListingDescriptionParts,
  sellerReportedStatusLabel,
} from "@/lib/county-listing-descriptions";
import { prepareListingsForDisplay } from "@/lib/listing-display";
import type { ListingWithInventoryClass } from "@/lib/listing-inventory-class";
import { indexableListingPages, listingPageHref } from "@/lib/listing-page-urls";
import {
  getMarketplaceListings,
  isThirdPartyBrokerSubmission,
  marketplaceSubmissionBrokerage,
  marketplaceSubmissionDisclosure,
} from "@/lib/listing-store";
import { getApprovedSubmissionByPublicRef } from "@/lib/listing-submission-store";
import { publicListingReference } from "@/lib/public-listing-reference";

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
import "@/app/listings/listings-view-button-edge-fix.css";
import "./listing-detail.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const statewideListingsHref = "/listings";

const verifiedBrokerProfiles: Record<string, {
  name: string;
  brokerage: string;
  phone: string;
  phoneNote?: string;
  email?: string;
  license?: string;
  photo: string;
  profileUrl: string;
}> = {
  "FLLM-022": {
    name: "Lawrence Moore",
    brokerage: "GAI: Gibson and Associates, Inc.",
    phone: "(850) 990-2328",
    phoneNote: "Voice only — no SMS",
    email: "lawrence@gai.services",
    license: "Florida Broker License BK3458688",
    photo: "/assets/brokers/lawrence-moore.webp",
    profileUrl: "https://gai.services/broker/lawrence-moore/",
  },
};

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function publicMarketplaceReference(slug: string) {
  const reference = decodeURIComponent(slug).trim().toUpperCase();
  return /^FLLM-[A-Z0-9-]+$/.test(reference) ? reference : null;
}

async function loadPaidListing(slug: string) {
  const reference = publicMarketplaceReference(slug);
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
  return type === "4COP Quota" ? "4COP Quota Liquor License" : "3PS Liquor License";
}

function marketplaceTitle(listing: Listing) {
  return `${listing.county} ${shortLicenseType(listing.type)} for Sale | ${listing.priceLabel}`;
}

function marketplaceDescription(listing: Listing) {
  return `${listing.county} ${shortLicenseType(listing.type)} offered at ${listing.priceLabel}. Review quota-license privileges, availability, marketplace reference, county market data, and inquiry options.`;
}

function absoluteImageUrl(image: string | undefined) {
  if (!image) return undefined;
  if (/^https?:\/\//i.test(image)) return image;
  return `${siteUrl}${image.startsWith("/") ? image : `/${image}`}`;
}

function paidSubmissionAsListing(
  submission: NonNullable<Awaited<ReturnType<typeof loadPaidListing>>>,
): ListingWithInventoryClass | null {
  if (!submission.approvedLicenseType) return null;

  return {
    county: submission.county,
    type: submission.approvedLicenseType,
    price: submission.approvedAskingPrice,
    priceLabel: priceLabel(submission.approvedAskingPrice),
    sourceRef: publicListingReference(submission),
    sourceName: isThirdPartyBrokerSubmission(submission)
      ? marketplaceSubmissionBrokerage(submission) || "Independent Listing Broker"
      : "Florida Liquor License Market",
    note: marketplaceSubmissionDisclosure(submission),
    licenseStatus: submission.licenseStatus || undefined,
    preferredTiming: submission.preferredTiming || undefined,
    image: "/assets/license-market/license-01.png",
    inventoryClass: "direct_seller",
  };
}

const loadListingContext = cache(async (slug: string) => {
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
});

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
  const requestedReference = publicMarketplaceReference(slug);
  if (
    requestedReference &&
    requestedReference !== selectedReference.trim().toUpperCase()
  ) {
    permanentRedirect(listingPageHref(selected));
  }
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
  const exchangeSubmission = await loadPaidListing(selectedReference);
  const verifiedBroker = verifiedBrokerProfiles[selectedReference.trim().toUpperCase()] ?? null;
  const exchangeAskingPrice = exchangeSubmission
    ? exchangeSubmission.approvedAskingPrice ?? exchangeSubmission.askingPrice
    : null;
  const isThirdPartyBrokerListing = Boolean(
    verifiedBroker || (exchangeSubmission && isThirdPartyBrokerSubmission(exchangeSubmission)),
  );
  const listingBrokerage = verifiedBroker?.brokerage || (exchangeSubmission
    ? marketplaceSubmissionBrokerage(exchangeSubmission)
    : null);
  const listingBrokerName = verifiedBroker?.name || exchangeSubmission?.fullName || "Independent Listing Broker";
  const listingBrokerPhone = verifiedBroker?.phone || exchangeSubmission?.phone || null;
  const listingBrokerEmail = verifiedBroker?.email || exchangeSubmission?.email || null;
  const related = listings
    .filter((listing) =>
      Boolean(listing.sourceRef) &&
      listing.county === selected.county &&
      listing.sourceRef?.trim().toLowerCase() !== normalizedReference,
    )
    .slice(0, 3);

  const productId = `${canonical}#license`;

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
        "@id": productId,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": productId,
      name: `${selected.county} ${selected.type} — ${selected.priceLabel}`,
      description: marketplaceDescription(selected),
      sku: selectedReference,
      identifier: selectedReference,
      category: selected.type,
      image: absoluteImageUrl(selected.image),
      url: canonical,
      additionalProperty: [
        { "@type": "PropertyValue", name: "County", value: selected.county },
        { "@type": "PropertyValue", name: "License type", value: selected.type },
        { "@type": "PropertyValue", name: "Marketplace status", value: statusLabel },
      ],
      offers: selected.price === null ? undefined : {
        "@type": "Offer",
        price: selected.price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: canonical,
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
        <HeaderNavMenus className="primary-nav listings-primary-nav" showContactLink />
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
            <span className="marketplace-listing-kicker">
              {isThirdPartyBrokerListing
                ? "Featured Third-Party Broker Listing"
                : "Individual Florida Marketplace Listing"}
            </span>
            <h1>
              <span className="marketplace-listing-title-line">{selected.county}</span>
              <span className="marketplace-listing-title-line marketplace-listing-title-type">{shortLicenseType(selected.type)}</span>
              <span className="marketplace-listing-title-line">for Sale</span>
            </h1>
            <p className="marketplace-listing-price">{selected.priceLabel}</p>
            <div className="marketplace-listing-availability">
              <span className="availability-pill" title={statusLabel}>
                <span className="availability-dot" aria-hidden="true" />
                Available
              </span>
              <span className="marketplace-listing-hero-reference">Listing {selectedReference}</span>
              {isThirdPartyBrokerListing && (
                <span className="marketplace-listing-broker-badge">Featured · Third-Party Broker</span>
              )}
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

              {isThirdPartyBrokerListing ? (
                <section className="marketplace-listing-highlights" aria-labelledby="license-highlights-heading">
                  <h3 id="license-highlights-heading">License Highlights</h3>
                  <div className="marketplace-listing-highlight-grid">
                    <div>
                      <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M11 42h13V18H11zM15 18V8h5v10M11 26h13M29 25h12l-2 9a5 5 0 0 1-4 3.5A5 5 0 0 1 31 34zM35 37.5V42M30 42h10" /></svg>
                      <strong>Full-liquor<br />privileges</strong>
                    </div>
                    <div>
                      <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 18h32l-4-9H12zM11 18v22h26V18M17 40V27h14v13M9 18c0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0" /></svg>
                      <strong>On- or<br />off-premises use</strong>
                    </div>
                    <div>
                      <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M15 9h18v33H10V9h5M18 6h12v7H18zM16 21l3 3 6-7M16 31l3 3 6-7M29 21h5M29 31h5" /></svg>
                      <strong>Transfer subject<br />to DBPR approval</strong>
                    </div>
                    <div>
                      <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="14" r="7" /><circle cx="10" cy="22" r="5" /><circle cx="38" cy="22" r="5" /><path d="M13 42v-6c0-7 5-12 11-12s11 5 11 12v6zM2 42v-5c0-5 4-9 9-9 2 0 4 1 6 2M46 42v-5c0-5-4-9-9-9-2 0-4 1-6 2" /></svg>
                      <strong>Limited {selected.county.replace(" County", "")}<br />County quota supply</strong>
                    </div>
                  </div>
                </section>
              ) : (
                <div className="marketplace-listing-reference marketplace-listing-reference-inline">
                  <span>Exact Marketplace Reference</span>
                  <strong>{selectedReference}</strong>
                  <p>This page is the individual detail page for this specific listed license.</p>
                </div>
              )}

              {selected.note && (
                <div className="marketplace-listing-note">
                  <strong>{isThirdPartyBrokerListing ? "Third-party broker disclosure" : "Listing note"}</strong>
                  <p>{selected.note}</p>
                </div>
              )}

              <section className="marketplace-listing-section">
                <h2>About This License Listing</h2>
                <p>This individual marketplace page represents the specific {selected.type} liquor-license interest identified as {selectedReference} in {selected.county}. The displayed asking price is {selected.priceLabel}. Availability, price, license status, transferability, liens, and transaction terms should be confirmed before reliance or commitment.</p>
                <p>A Florida quota license may generally be changed between the 3PS Quota series and the 4COP Quota series through a DBPR-approved change of license series. Approval is subject to applicable premises, zoning, applicant, and regulatory requirements.</p>
                <p>Unless an individual listing expressly states otherwise, the offering concerns a liquor-license interest only and does not include an operating business, leasehold, equipment, inventory, or real estate.</p>
              </section>

              <section className="marketplace-listing-section">
                <h2>{selected.county} Market Context</h2>
                <p>{county?.marketOverview ?? descriptionParts.county}</p>
                {descriptionParts.cities && <p>{descriptionParts.cities}</p>}
                <p><Link href={filteredCountyHref}>Compare current {selected.county} 4COP and 3PS liquor-license listings →</Link></p>
              </section>

              {selected.sourceName && !isThirdPartyBrokerListing && (
                <section className="marketplace-listing-section marketplace-listing-source-section">
                  <h2>Listing Source</h2>
                  <p>The marketplace record identifies the source as <strong>{selected.sourceName}</strong>. Price and availability remain subject to confirmation.</p>
                  {selected.sourceUrl && (
                    <p><a href={selected.sourceUrl} target="_blank" rel="noopener noreferrer">Review the source listing →</a></p>
                  )}
                </section>
              )}
            </article>

            <aside className={`marketplace-listing-aside${isThirdPartyBrokerListing ? " marketplace-listing-aside-broker" : ""}`}>
              <div className="marketplace-listing-action-card">
                <span>{isThirdPartyBrokerListing ? "Independent Listing Broker" : "Interested in This Exact License?"}</span>
                <h2>{isThirdPartyBrokerListing ? listingBrokerName : `Use Reference ${selectedReference}`}</h2>
                {isThirdPartyBrokerListing && verifiedBroker && (
                  <a className="marketplace-listing-broker-photo" href={verifiedBroker.profileUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${verifiedBroker.name}'s broker profile`}>
                    <img src={verifiedBroker.photo} alt={`${verifiedBroker.name}, listing broker`} />
                  </a>
                )}
                {isThirdPartyBrokerListing && (
                  <div className="marketplace-listing-broker-contact">
                    {listingBrokerage && <strong>{listingBrokerage}</strong>}
                    {listingBrokerPhone && (
                      <a href={`tel:${listingBrokerPhone.replace(/[^\d+]/g, "")}`}>
                        {listingBrokerPhone}
                        {verifiedBroker?.phoneNote && <small>{verifiedBroker.phoneNote}</small>}
                      </a>
                    )}
                    {listingBrokerEmail && <a href={`mailto:${listingBrokerEmail}`}>{listingBrokerEmail}</a>}
                    {verifiedBroker?.license && <span className="marketplace-listing-broker-license">{verifiedBroker.license}</span>}
                    <small>{listingBrokerName} and {listingBrokerage || "the listing brokerage"} represent the seller. FLLM is the advertising marketplace and does not represent either party.</small>
                  </div>
                )}
                {!isThirdPartyBrokerListing && (
                  <ol>
                    <li>Confirm the license reference, category, county, and current availability.</li>
                    <li>Review the asking price and proposed transaction terms.</li>
                    <li>Verify the intended premises, local approvals, liens, and transfer requirements.</li>
                    <li>Use independent legal, tax, and financial professionals before closing.</li>
                  </ol>
                )}
                {isThirdPartyBrokerListing && listingBrokerPhone ? (
                  <a className="marketplace-listing-primary" href={`tel:${listingBrokerPhone.replace(/[^\d+]/g, "")}`}>Call Listing Broker</a>
                ) : (
                  <Link className="marketplace-listing-primary" href={inquiryHref}>Request Confidential Details</Link>
                )}
                {isThirdPartyBrokerListing && verifiedBroker ? (
                  <a className="marketplace-listing-text-link" href={verifiedBroker.profileUrl} target="_blank" rel="noopener noreferrer">Visit Listing Broker Website →</a>
                ) : (
                  <Link className="marketplace-listing-text-link" href={offerHref}>Submit an offer for this license →</Link>
                )}
                <Link className="marketplace-listing-text-link" href={countyHref}>Compare {selected.county} liquor-license prices and inventory →</Link>
                <Link className="marketplace-listing-text-link" href={statewideListingsHref}>Browse all Florida liquor licenses for sale →</Link>
              </div>

              <div className="marketplace-listing-reference">
                <span>Individual Listing Page</span>
                <strong>{selectedReference}</strong>
                <p>The URL and page content identify this license separately from the statewide inventory.</p>
              </div>
            </aside>
          </div>

          {exchangeSubmission && !isThirdPartyBrokerListing && (
            <FllmExchangePanel
              listingRef={selectedReference}
              askingPrice={exchangeAskingPrice}
            />
          )}

          {!isThirdPartyBrokerListing && related.length > 0 && (
            <section className="marketplace-listing-related">
              <div className="marketplace-listing-heading">
                <span>More in This County</span>
                <h2>Other {selected.county} Liquor Licenses for Sale</h2>
              </div>
              <div className="results-grid listing-detail-related-grid">
                {related.map((listing) => (
                  <MarketplaceListingCard
                    listing={listing}
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
