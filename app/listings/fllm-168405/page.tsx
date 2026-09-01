import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import FloridaCountyMap from "@/components/FloridaCountyMap";
import HeaderNavMenus from "@/components/HeaderNavMenus";
import MarketplaceListingCard from "@/components/MarketplaceListingCard";
import { countySlug, getCountyBySlug } from "@/data/florida-counties";
import type { Listing } from "@/data/listings";
import {
  marketplaceListingDescriptionParts,
  sellerReportedStatusLabel,
} from "@/lib/county-listing-descriptions";
import { prepareListingsForDisplay } from "@/lib/listing-display";
import { listingPageHref } from "@/lib/listing-page-urls";
import { getMarketplaceListings } from "@/lib/listing-store";

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
import "../[slug]/listing-detail.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const listingReference = "FLLM-168405";
const canonicalPath = "/listings/fllm-168405";
const canonicalUrl = `${siteUrl}${canonicalPath}`;
const statewideListingsHref = "/listings";

export const dynamic = "force-dynamic";

function money(value: number | null) {
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

async function loadFeaturedListing() {
  const rawListings = await getMarketplaceListings();
  const selected = rawListings.find(
    (listing) => listing.sourceRef?.trim().toUpperCase() === listingReference,
  );
  if (!selected) return null;
  return {
    selected,
    listings: prepareListingsForDisplay(rawListings),
  };
}

function seoTitle(priceLabel?: string) {
  return "Sarasota County 3PS Liquor License for Sale | Featured Listing";
}

function seoDescription(priceLabel: string) {
  return `Featured Sarasota County, Florida 3PS package-store liquor license for sale at ${priceLabel}. Review current listing details and submit a confidential buyer bid through FLLM.`;
}

function absoluteImageUrl(image: string | undefined) {
  if (!image) return undefined;
  if (/^https?:\/\//i.test(image)) return image;
  return `${siteUrl}${image.startsWith("/") ? image : `/${image}`}`;
}

export async function generateMetadata(): Promise<Metadata> {
  const context = await loadFeaturedListing();
  const priceLabel = context?.selected.priceLabel ?? "$550,000";
  const title = seoTitle(priceLabel);
  const description = seoDescription(priceLabel);

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url: canonicalUrl,
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

export default async function FeaturedSarasota3PsListingPage() {
  const context = await loadFeaturedListing();
  if (!context) notFound();

  const { selected, listings } = context;
  const county = getCountyBySlug(countySlug(selected.county));
  const countyHref = `/counties/${countySlug(selected.county)}`;
  const filteredCountyHref = `/listings?county=${encodeURIComponent(selected.county)}&status=available`;
  const statusLabel = selected.licenseStatus
    ? `${sellerReportedStatusLabel(selected.licenseStatus)} / Available`
    : "Available / Status to confirm";
  const descriptionParts = marketplaceListingDescriptionParts({
    county: selected.county,
    licenseType: selected.type,
    licenseStatus: selected.licenseStatus,
    preferredTiming: selected.preferredTiming,
  });
  const inquiryParams = new URLSearchParams({
    source: "featured-listing-seo",
    listing: `${listingReference} — ${selected.county} — ${selected.type} — ${selected.priceLabel}`,
    ref: listingReference,
    county: selected.county,
    license_type: selected.type,
    asking_price: selected.priceLabel,
    listing_status: statusLabel,
    listing_url: canonicalPath,
  });
  const inquiryHref = `/contact?${inquiryParams.toString()}`;
  const offerHref = `/submit-offer?listing=${encodeURIComponent(`${selected.county} ${selected.type}`)}&ref=${encodeURIComponent(listingReference)}`;
  const related = listings
    .filter(
      (listing) =>
        Boolean(listing.sourceRef) &&
        listing.county === selected.county &&
        listing.sourceRef?.trim().toUpperCase() !== listingReference,
    )
    .slice(0, 3);

  const faqs = [
    {
      question: "Is this Sarasota County 3PS liquor license currently for sale?",
      answer: `This FLLM featured listing is displayed as available with an asking price of ${selected.priceLabel}. Availability, price, license status and transaction terms should be reconfirmed before reliance or commitment.`,
    },
    {
      question: "What is a Florida 3PS package-store liquor license used for?",
      answer:
        "A Florida 3PS-family quota license is generally associated with package-store sales of sealed beer, wine and distilled spirits for off-premises consumption, subject to the exact license series, approved premises and applicable regulatory requirements.",
    },
    {
      question: "Can a Sarasota County 3PS quota license be changed to a 4COP quota license?",
      answer:
        "A change between the 3PS Quota and 4COP Quota series may be available through the Florida DBPR/ABT process, subject to applicant eligibility, the proposed premises, zoning and local approvals, and all other applicable regulatory requirements.",
    },
    {
      question: "Are buyer bids on this featured listing shown to the public?",
      answer:
        "No. FLLM Exchange treats buyer bids, bid counts and bid/ask spreads as confidential. A buyer may submit a bid through the listing page, and the seller can accept or counter through the secure FLLM Exchange workflow.",
    },
    {
      question: "Does this Sarasota County listing include a business or real estate?",
      answer:
        "Not unless the listing expressly states otherwise. FLLM marketplace listings generally concern the liquor-license interest separately from an operating business, leasehold, equipment, inventory or real estate.",
    },
  ];

  const productId = `${canonicalUrl}#license`;
  const title = seoTitle(selected.priceLabel);
  const description = seoDescription(selected.priceLabel);
  const structuredData: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      url: canonicalUrl,
      description,
      isPartOf: {
        "@type": "CollectionPage",
        name: "Florida Liquor Licenses for Sale",
        url: `${siteUrl}/listings`,
      },
      about: { "@id": productId },
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": productId,
      name: `Sarasota County 3PS Liquor License for Sale — ${selected.priceLabel}`,
      description,
      sku: listingReference,
      identifier: listingReference,
      category: selected.type,
      image: absoluteImageUrl(selected.image),
      url: canonicalUrl,
      additionalProperty: [
        { "@type": "PropertyValue", name: "County", value: selected.county },
        { "@type": "PropertyValue", name: "License type", value: selected.type },
        { "@type": "PropertyValue", name: "Marketplace status", value: statusLabel },
        { "@type": "PropertyValue", name: "Featured listing", value: "Yes" },
      ],
      offers:
        selected.price === null
          ? undefined
          : {
              "@type": "Offer",
              price: selected.price,
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              url: canonicalUrl,
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
          item: `${siteUrl}/listings`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Sarasota County Liquor Licenses for Sale",
          item: `${siteUrl}${countyHref}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Featured Sarasota County 3PS Liquor License for Sale",
          item: canonicalUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <main className="results-page marketplace-listing-page" data-featured-seo-listing={listingReference}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />
      <style>{`
        .featured-detail-badge{display:inline-flex;align-items:center;min-height:28px;margin:0 0 12px;padding:0 12px;border:1px solid #79ddff;border-radius:5px;color:#fff;background:linear-gradient(180deg,#22bde9,#087ba5);box-shadow:inset 0 1px 0 rgba(255,255,255,.35),0 5px 14px rgba(0,160,210,.18);font:900 11px/1 Arial,Helvetica,sans-serif;letter-spacing:.055em;text-transform:uppercase}
        .featured-seo-panel{margin:24px 0;padding:25px;border:1px solid rgba(226,165,30,.55);border-radius:10px;background:linear-gradient(145deg,rgba(10,38,62,.94),rgba(4,20,34,.98));box-shadow:0 14px 32px rgba(0,0,0,.22)}
        .featured-seo-panel>span{display:block;margin-bottom:8px;color:#f1aa1c;font-size:11px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}.featured-seo-panel h2{margin:0 0 14px;color:#fff}.featured-seo-panel p{color:#cbd5dd;line-height:1.72}.featured-seo-facts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin:20px 0}.featured-seo-facts div{padding:14px;border:1px solid rgba(255,255,255,.1);border-radius:7px;background:#051727}.featured-seo-facts span{display:block;color:#9fb0bd;font-size:10px;font-weight:900;text-transform:uppercase}.featured-seo-facts strong{display:block;margin-top:5px;color:#fff;font-size:15px}.featured-seo-links{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}.featured-seo-links a{display:inline-flex;align-items:center;min-height:40px;padding:0 13px;border:1px solid rgba(226,165,30,.48);border-radius:5px;color:#f1b53a;text-decoration:none;font-size:12px;font-weight:850}.featured-seo-links a:hover{border-color:#f1b53a;background:rgba(226,165,30,.08);transform:translateY(-1px)}
        .featured-seo-faq{margin-top:28px}.featured-seo-faq details{border-bottom:1px solid rgba(255,255,255,.1)}.featured-seo-faq summary{padding:16px 0;color:#fff;font-weight:850;cursor:pointer}.featured-seo-faq details p{margin:0;padding:0 0 16px;color:#c1ced7;line-height:1.68}
        @media(max-width:760px){.featured-seo-facts{grid-template-columns:repeat(2,minmax(0,1fr))}}
      `}</style>

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
              <Link href={countyHref}>Sarasota County</Link>
              <span>›</span>
              <strong>{listingReference}</strong>
            </div>
            <span className="featured-detail-badge">Featured Listing</span>
            <span className="marketplace-listing-kicker">Sarasota County, Florida · 3PS Package Store</span>
            <h1>Sarasota County 3PS Liquor License for Sale</h1>
            <p className="marketplace-listing-price">{selected.priceLabel}</p>
            <div className="marketplace-listing-availability">
              <span className="availability-pill" title={statusLabel}>
                <span className="availability-dot" aria-hidden="true" />
                Available
              </span>
              <span className="marketplace-listing-hero-reference">Listing {listingReference}</span>
            </div>
            <p className="marketplace-listing-summary">
              Featured Sarasota County 3PS quota / package-store liquor-license opportunity. Review the current asking price, county market context and license details, then submit a confidential buyer bid through FLLM Exchange.
            </p>
            <div className="marketplace-listing-actions">
              <a className="marketplace-listing-primary" href="#featured-bid-exchange">Submit a Confidential Bid</a>
              <Link className="marketplace-listing-secondary" href={inquiryHref}>Inquire About This License</Link>
            </div>
          </div>

          <div className="marketplace-listing-map" aria-label="Sarasota County map">
            <FloridaCountyMap county={selected.county} enlarged />
            <strong>{selected.county}</strong>
            {descriptionParts.cities && <span>{descriptionParts.cities}</span>}
          </div>
        </div>
      </section>

      <section className="marketplace-listing-body">
        <div className="marketplace-listing-shell">
          <div id="featured-bid-exchange" aria-hidden="true" />
          <div className="marketplace-listing-grid">
            <article className="marketplace-listing-main">
              <div className="marketplace-listing-heading">
                <span>Featured Sarasota 3PS Opportunity</span>
                <h2>{selected.type} in Sarasota County</h2>
              </div>

              <div className="marketplace-listing-facts" aria-label="Featured listing details">
                <div><span>Asking Price</span><strong>{selected.priceLabel}</strong></div>
                <div><span>License Type</span><strong>{selected.type}</strong></div>
                <div><span>County</span><strong>Sarasota County</strong></div>
                <div><span>Marketplace Status</span><strong>{statusLabel}</strong></div>
              </div>

              <div className="marketplace-listing-reference marketplace-listing-reference-inline">
                <span>Exact Marketplace Reference</span>
                <strong>{listingReference}</strong>
                <p>This is the canonical FLLM detail page for this specific featured listing.</p>
              </div>

              {selected.note && (
                <div className="marketplace-listing-note">
                  <strong>Listing note</strong>
                  <p>{selected.note}</p>
                </div>
              )}

              <section className="featured-seo-panel">
                <span>Featured Listing Search Page</span>
                <h2>Sarasota County 3PS package-store liquor license opportunity</h2>
                <p>
                  Buyers searching for a <strong>Sarasota County liquor license for sale</strong>, a <strong>Sarasota County 3PS liquor license for sale</strong>, or a Florida package-store quota license can use this page to evaluate this exact marketplace offering. The current displayed asking price is <strong>{selected.priceLabel}</strong>.
                </p>
                <p>
                  A 3PS-family quota license is generally associated with sealed package sales of beer, wine and distilled spirits for off-premises consumption. A change to the 4COP Quota series may be available through the DBPR/ABT process, subject to applicant eligibility, premises requirements, zoning, local approvals and all other applicable regulatory requirements.
                </p>
                <div className="featured-seo-facts">
                  <div><span>Listing</span><strong>Featured</strong></div>
                  <div><span>County</span><strong>Sarasota</strong></div>
                  <div><span>Series</span><strong>3PS Quota</strong></div>
                  <div><span>Buyer Bids</span><strong>Confidential</strong></div>
                </div>
                <div className="featured-seo-links">
                  <Link href="/florida-3ps-liquor-license-for-sale">Florida 3PS Licenses for Sale</Link>
                  <Link href={countyHref}>Sarasota County Market Data</Link>
                  <Link href="/florida-liquor-license-value">Check Florida Liquor License Value</Link>
                  <Link href="/financing">Liquor License Financing</Link>
                </div>
              </section>

              <section className="marketplace-listing-section">
                <h2>About This Featured License Listing</h2>
                <p>
                  This individual marketplace page represents the specific {selected.type} liquor-license interest identified as {listingReference} in Sarasota County. The displayed asking price is {selected.priceLabel}. Availability, price, license status, transferability, liens and transaction terms should be confirmed before reliance or commitment.
                </p>
                <p>
                  Unless this listing expressly states otherwise, the offering concerns the liquor-license interest only and does not include an operating business, leasehold, equipment, inventory or real estate.
                </p>
              </section>

              <section className="marketplace-listing-section">
                <h2>Sarasota County Liquor License Market Context</h2>
                <p>{county?.marketOverview ?? descriptionParts.county}</p>
                {descriptionParts.cities && <p>{descriptionParts.cities}</p>}
                <p><Link href={filteredCountyHref}>Compare current Sarasota County 4COP and 3PS liquor-license listings →</Link></p>
              </section>

              <section className="marketplace-listing-section featured-seo-faq">
                <span className="marketplace-listing-kicker">Featured Listing FAQs</span>
                <h2>Sarasota County 3PS buyer questions</h2>
                {faqs.map((faq) => (
                  <details key={faq.question}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
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
                <span>Interested in This Featured License?</span>
                <h2>Use Reference {listingReference}</h2>
                <ol>
                  <li>Review the Sarasota County 3PS category and current asking price.</li>
                  <li>Submit a confidential buyer bid through FLLM Exchange or request details.</li>
                  <li>Verify the intended premises, zoning, local approvals, liens and transfer requirements.</li>
                  <li>Use independent legal, tax and financial professionals before closing.</li>
                </ol>
                <a className="marketplace-listing-primary" href="#featured-bid-exchange">Submit Confidential Bid</a>
                <Link className="marketplace-listing-text-link" href={inquiryHref}>Request confidential details →</Link>
                <Link className="marketplace-listing-text-link" href={offerHref}>Submit an offer for this license →</Link>
                <Link className="marketplace-listing-text-link" href={countyHref}>Compare Sarasota County prices and inventory →</Link>
                <Link className="marketplace-listing-text-link" href="/florida-3ps-liquor-license-for-sale">Browse Florida 3PS licenses for sale →</Link>
              </div>

              <div className="marketplace-listing-reference">
                <span>Featured Individual Listing</span>
                <strong>{listingReference}</strong>
                <p>This canonical URL is being used to measure search visibility, inquiries and Exchange bidding activity for this featured listing.</p>
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <section className="marketplace-listing-related">
              <div className="marketplace-listing-heading">
                <span>More in Sarasota County</span>
                <h2>Other Sarasota County Liquor Licenses for Sale</h2>
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
            Marketplace information is provided for informational purposes and remains subject to seller or broker confirmation. Florida Liquor License Market does not guarantee availability, transfer approval, price or transaction terms. Independent legal, tax, financial, zoning and regulatory review is recommended.
          </div>
        </div>
      </section>
    </main>
  );
}
