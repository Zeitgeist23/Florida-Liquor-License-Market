import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import FloridaCountyMap from "@/components/FloridaCountyMap";
import { countySlug, getCountyBySlug } from "@/data/florida-counties";
import type { Listing } from "@/data/listings";
import {
  marketplaceListingDescriptionParts,
  sellerReportedStatusLabel,
} from "@/lib/county-listing-descriptions";
import { indexableListingPages, listingPageHref } from "@/lib/listing-page-urls";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getApprovedSubmissionByPublicRef } from "@/lib/listing-submission-store";
import "./listing-detail.css";

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

async function loadMarketplacePage(slug: string) {
  const pages = indexableListingPages(await getMarketplaceListings());
  return {
    pages,
    entry: pages.find((page) => page.slug === slug),
  };
}

function paidPrice(value: number | null) {
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
  return `View a ${listing.type} liquor-license listing in ${listing.county} at ${listing.priceLabel}. Review marketplace details, county context, and confidential inquiry and offer options.`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const paidListing = await loadPaidListing(slug);
  if (paidListing?.listingTitle && paidListing.approvedLicenseType) {
    const canonical = paidListing.liveListingUrl || `${siteUrl}/listings/${encodeURIComponent(paidListing.submissionRef)}`;
    return {
      title: `${paidListing.listingTitle} | Florida Liquor License Market`,
      description: `${paidListing.approvedLicenseType} liquor license interest listed in ${paidListing.county}.`,
      alternates: { canonical },
      robots: { index: true, follow: true },
    };
  }

  const { entry } = await loadMarketplacePage(slug);
  if (!entry) {
    return {
      title: "Listing Not Found | Florida Liquor License Market",
      robots: { index: false, follow: false },
    };
  }

  const { listing } = entry;
  const canonical = `${siteUrl}${listingPageHref(listing)}`;
  const title = marketplaceTitle(listing);
  const description = marketplaceDescription(listing);

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

  const paidListing = await loadPaidListing(slug);
  if (paidListing?.listingTitle && paidListing.approvedLicenseType) {
    const description = marketplaceListingDescriptionParts({
      county: paidListing.county,
      licenseType: paidListing.approvedLicenseType,
      licenseStatus: paidListing.licenseStatus,
      preferredTiming: paidListing.preferredTiming,
    });

    return (
      <main className="paid-listing-page">
        <header className="paid-listing-header">
          <Link href="/" aria-label="Florida Liquor License Market home"><img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" /></Link>
          <nav><Link href="/listings">All Listings</Link><Link href="/sell-your-license">List Your License</Link><Link href="/contact">Contact Us</Link></nav>
        </header>
        <section className="paid-listing-hero">
          <div className="paid-listing-map"><FloridaCountyMap county={paidListing.county} /></div>
          <div className="paid-listing-copy">
            <span className="paid-listing-kicker">Verified Marketplace Listing</span>
            <h1>{paidListing.listingTitle}</h1>
            <p className="paid-listing-price">{paidPrice(paidListing.approvedAskingPrice)}</p>
            <div className="paid-listing-facts"><span>{paidListing.county}</span><span>{paidListing.approvedLicenseType}</span><span>{paidListing.licenseStatus} / Available</span></div>
            <div className="paid-listing-description">
              <p>{description.license}</p>
              <p>{description.county}</p>
              {description.cities && <p className="paid-listing-cities">{description.cities}</p>}
            </div>
            {paidListing.message && <p className="paid-listing-description"><strong>Seller notes:</strong> {paidListing.message}</p>}
            <p className="paid-listing-reference">Listing reference: {paidListing.submissionRef}</p>
            <div className="paid-listing-actions">
              <Link className="paid-listing-primary" href={`/contact?listing=${encodeURIComponent(paidListing.listingTitle)}&ref=${encodeURIComponent(paidListing.submissionRef)}`}>Inquire About This Listing</Link>
              <Link className="paid-listing-secondary" href={`/submit-offer?listing=${encodeURIComponent(paidListing.listingTitle)}&ref=${encodeURIComponent(paidListing.submissionRef)}`}>Submit an Offer</Link>
            </div>
          </div>
        </section>
        <section className="paid-listing-notice">
          <strong>Important notice</strong>
          <p>This listing concerns a Florida liquor-license interest only unless expressly stated otherwise. Availability, price, transferability, and regulatory approval remain subject to confirmation.</p>
        </section>
      </main>
    );
  }

  const { pages, entry } = await loadMarketplacePage(slug);
  if (!entry) notFound();

  const { listing } = entry;
  const county = getCountyBySlug(countySlug(listing.county));
  const countyHref = `/counties/${countySlug(listing.county)}`;
  const filteredListingsHref = `/listings?county=${encodeURIComponent(listing.county)}&status=available`;
  const canonical = `${siteUrl}${listingPageHref(listing)}`;
  const title = marketplaceTitle(listing);
  const description = marketplaceDescription(listing);
  const statusLabel = listing.licenseStatus
    ? `${sellerReportedStatusLabel(listing.licenseStatus)} / Available`
    : "Available / Status to confirm";
  const descriptionParts = marketplaceListingDescriptionParts({
    county: listing.county,
    licenseType: listing.type,
    licenseStatus: listing.licenseStatus,
    preferredTiming: listing.preferredTiming,
  });
  const related = pages
    .filter((page) => page.slug !== slug && page.listing.county === listing.county)
    .slice(0, 3);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      url: canonical,
      description,
      isPartOf: {
        "@type": "WebSite",
        name: "Florida Liquor License Market",
        url: siteUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Florida Liquor Licenses for Sale", item: `${siteUrl}/listings` },
        { "@type": "ListItem", position: 3, name: listing.county, item: `${siteUrl}${countyHref}` },
        { "@type": "ListItem", position: 4, name: `${listing.type} — ${listing.priceLabel}`, item: canonical },
      ],
    },
  ];

  return (
    <main className="marketplace-listing-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <header className="marketplace-listing-header">
        <Link href="/" aria-label="Florida Liquor License Market home"><img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" /></Link>
        <nav aria-label="Listing navigation">
          <Link href="/listings">All Listings</Link>
          <Link href="/counties">Counties</Link>
          <Link href="/sell-your-license">List Your License</Link>
          <Link href="/contact">Contact Us</Link>
        </nav>
      </header>

      <section className="marketplace-listing-hero">
        <div className="marketplace-listing-shell marketplace-listing-hero-grid">
          <div className="marketplace-listing-copy">
            <div className="marketplace-listing-breadcrumbs">
              <Link href="/listings">Florida Listings</Link><span>›</span>
              <Link href={countyHref}>{listing.county}</Link><span>›</span>
              <strong>{listing.type}</strong>
            </div>
            <span className="marketplace-listing-kicker">Florida Marketplace Listing</span>
            <h1>{listing.county} {shortLicenseType(listing.type)} for Sale</h1>
            <p className="marketplace-listing-price">{listing.priceLabel}</p>
            <p className="marketplace-listing-summary">{descriptionParts.license}</p>
            <div className="marketplace-listing-actions">
              <Link className="marketplace-listing-primary" href={`/contact?listing=${encodeURIComponent(`${listing.county} ${listing.type}`)}&ref=${encodeURIComponent(listing.sourceRef ?? "")}`}>Inquire About This License</Link>
              <Link className="marketplace-listing-secondary" href={`/submit-offer?listing=${encodeURIComponent(`${listing.county} ${listing.type}`)}&ref=${encodeURIComponent(listing.sourceRef ?? "")}`}>Submit an Offer</Link>
            </div>
          </div>
          <div className="marketplace-listing-map" aria-label={`${listing.county} map`}>
            <FloridaCountyMap county={listing.county} />
            <strong>{listing.county}</strong>
            {descriptionParts.cities && <span>{descriptionParts.cities}</span>}
          </div>
        </div>
      </section>

      <section className="marketplace-listing-body">
        <div className="marketplace-listing-shell">
          <div className="marketplace-listing-grid">
            <article className="marketplace-listing-main">
              <div className="marketplace-listing-heading">
                <span>Current Marketplace Opportunity</span>
                <h2>{listing.type} in {listing.county}</h2>
              </div>

              <div className="marketplace-listing-facts" aria-label="Listing details">
                <div><span>Asking Price</span><strong>{listing.priceLabel}</strong></div>
                <div><span>License Type</span><strong>{listing.type}</strong></div>
                <div><span>County</span><strong>{listing.county}</strong></div>
                <div><span>Marketplace Status</span><strong>{statusLabel}</strong></div>
              </div>

              {listing.note && (
                <div className="marketplace-listing-note">
                  <strong>Listing note</strong>
                  <p>{listing.note}</p>
                </div>
              )}

              <section className="marketplace-listing-section">
                <h2>About This Florida Liquor-License Listing</h2>
                <p>This marketplace page represents a transferable {listing.type} liquor-license interest in {listing.county}. The displayed asking price is {listing.priceLabel}. Availability, price, license status, transferability, liens, and transaction terms should be confirmed before reliance or commitment.</p>
                <p>The permitted use of a Florida quota license depends on the license category, the proposed premises, local approvals, and approval of the transfer by the Florida Division of Alcoholic Beverages and Tobacco. Unless expressly stated otherwise, this listing is for a liquor-license interest only and does not include an operating business, leasehold, equipment, inventory, or real estate.</p>
              </section>

              <section className="marketplace-listing-section">
                <h2>{listing.county} Market Context</h2>
                <p>{county?.marketOverview ?? descriptionParts.county}</p>
                {descriptionParts.cities && <p>{descriptionParts.cities}</p>}
                <p><Link href={countyHref}>View the complete {listing.county} liquor-license market page →</Link></p>
              </section>
            </article>

            <aside className="marketplace-listing-aside">
              <div className="marketplace-listing-action-card">
                <span>Interested Buyer?</span>
                <h2>Take the Next Step</h2>
                <ol>
                  <li>Confirm the license reference, category, county, and current availability.</li>
                  <li>Review the asking price and proposed transaction terms.</li>
                  <li>Verify the intended premises, local approvals, liens, and transfer requirements.</li>
                  <li>Use independent legal, tax, and financial professionals before closing.</li>
                </ol>
                <Link className="marketplace-listing-primary" href={`/contact?listing=${encodeURIComponent(`${listing.county} ${listing.type}`)}&ref=${encodeURIComponent(listing.sourceRef ?? "")}`}>Request Confidential Details</Link>
                <Link className="marketplace-listing-text-link" href={filteredListingsHref}>Compare other {listing.county} listings →</Link>
                <Link className="marketplace-listing-text-link" href="/listings">Browse all Florida listings →</Link>
              </div>
              <div className="marketplace-listing-reference">
                <span>Marketplace Reference</span>
                <strong>{listing.sourceRef}</strong>
                <p>Use this reference when submitting an inquiry or offer.</p>
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <section className="marketplace-listing-related">
              <div className="marketplace-listing-heading">
                <span>More in This Market</span>
                <h2>Other {listing.county} Liquor Licenses</h2>
              </div>
              <div className="marketplace-listing-related-grid">
                {related.map(({ slug: relatedSlug, listing: relatedListing }) => (
                  <Link href={`/listings/${relatedSlug}`} key={relatedSlug}>
                    <span>{relatedListing.type}</span>
                    <strong>{relatedListing.priceLabel}</strong>
                    <small>View listing details →</small>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="marketplace-listing-disclaimer">
            Marketplace information is provided for informational purposes and remains subject to seller or broker confirmation. Florida Liquor License Market does not guarantee availability, price, transfer approval, financing, or the legal or financial suitability of any transaction.
          </div>
        </div>
      </section>
    </main>
  );
}
