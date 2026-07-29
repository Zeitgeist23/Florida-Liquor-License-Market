import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import FloridaCountyMap from "@/components/FloridaCountyMap";
import { getApprovedSubmissionByPublicRef } from "@/lib/listing-submission-store";
import "./listing-detail.css";

export const dynamic = "force-dynamic";

function referenceFromSlug(slug: string) {
  return decodeURIComponent(slug).trim().toUpperCase();
}

function price(value: number | null) {
  if (value === null) return "Price Undisclosed";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getApprovedSubmissionByPublicRef(referenceFromSlug(slug));
  if (!listing) return { title: "Listing Not Found | Florida Liquor License Market" };
  return {
    title: `${listing.listingTitle} | Florida Liquor License Market`,
    description: `${listing.approvedLicenseType} liquor license interest listed in ${listing.county}.`,
    alternates: { canonical: listing.liveListingUrl || undefined },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const listing = await getApprovedSubmissionByPublicRef(referenceFromSlug(slug));
  if (!listing || !listing.listingTitle || !listing.approvedLicenseType) notFound();

  return (
    <main className="paid-listing-page">
      <header className="paid-listing-header">
        <Link href="/" aria-label="Florida Liquor License Market home"><img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" /></Link>
        <nav><Link href="/listings">All Listings</Link><Link href="/sell-your-license">List Your License</Link><Link href="/contact">Contact Us</Link></nav>
      </header>
      <section className="paid-listing-hero">
        <div className="paid-listing-map"><FloridaCountyMap county={listing.county} /></div>
        <div className="paid-listing-copy">
          <span className="paid-listing-kicker">Verified Marketplace Listing</span>
          <h1>{listing.listingTitle}</h1>
          <p className="paid-listing-price">{price(listing.approvedAskingPrice)}</p>
          <div className="paid-listing-facts"><span>{listing.county}</span><span>{listing.approvedLicenseType}</span><span>Transferable license interest</span></div>
          {listing.message && <p className="paid-listing-description">{listing.message}</p>}
          <p className="paid-listing-reference">Listing reference: {listing.submissionRef}</p>
          <div className="paid-listing-actions">
            <Link className="paid-listing-primary" href={`/contact?listing=${encodeURIComponent(listing.listingTitle)}&ref=${encodeURIComponent(listing.submissionRef)}`}>Inquire About This Listing</Link>
            <Link className="paid-listing-secondary" href={`/submit-offer?listing=${encodeURIComponent(listing.listingTitle)}&ref=${encodeURIComponent(listing.submissionRef)}`}>Submit an Offer</Link>
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
