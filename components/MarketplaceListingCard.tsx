import Link from "next/link";
import type { Ref } from "react";

import { countySlug } from "@/data/florida-counties";
import type { Listing } from "@/data/listings";
import {
  countyListingDescription,
  sellerReportedStatusLabel,
} from "@/lib/county-listing-descriptions";
import { listingPageHref } from "@/lib/listing-page-urls";
import FloridaCountyMap from "./FloridaCountyMap";

function compactCardDescription(description: string) {
  const clean = description.trim();
  const maxCharacters = 122;
  if (clean.length <= maxCharacters) return clean;

  const tentative = clean.slice(0, maxCharacters + 1);
  const lastSpace = tentative.lastIndexOf(" ");
  const cutoff = lastSpace >= 92 ? lastSpace : maxCharacters;
  const clipped = clean.slice(0, cutoff).replace(/[,:;.!?\s]+$/g, "");
  return `${clipped}…`;
}

function classNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export type MarketplaceListingCardProps = {
  listing: Listing;
  focused?: boolean;
  cardRef?: Ref<HTMLElement>;
  id?: string;
  className?: string;
  description?: string;
  actionLabel?: string;
};

export default function MarketplaceListingCard({
  listing,
  focused = false,
  cardRef,
  id,
  className,
  description,
  actionLabel = "View License",
}: MarketplaceListingCardProps) {
  const available = Boolean(listing.sourceRef);
  const href = available ? listingPageHref(listing) : null;
  const fullDescription = description || countyListingDescription(listing.county);
  const statusTitle = listing.licenseStatus
    ? sellerReportedStatusLabel(listing.licenseStatus)
    : "Status to confirm";

  return (
    <article
      className={classNames(
        "result-card",
        available ? "result-card-available" : "result-card-sold",
        focused && "result-card-focused",
        className,
      )}
      id={id}
      ref={cardRef}
      data-listing-reference={listing.sourceRef || undefined}
      data-marketplace-listing-card="true"
    >
      <span className="result-type-badge">{listing.type}</span>
      <div className="result-photo">
        <FloridaCountyMap county={listing.county} enlarged />
      </div>
      <div className="result-body">
        <p className="result-county-row">
          <span className="result-pin" aria-hidden="true">●</span>
          <Link className="result-county-link" href={`/counties/${countySlug(listing.county)}`}>
            {listing.county}
          </Link>
        </p>
        <h2>
          {href ? (
            <Link
              href={href}
              aria-label={`View ${listing.type} listing in ${listing.county}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {listing.priceLabel}
            </Link>
          ) : listing.priceLabel}
        </h2>
        <div className="result-facts">
          {available ? (
            <span className="availability-pill" title={statusTitle}>
              <span className="availability-dot" aria-hidden="true" />
              Available
            </span>
          ) : (
            <span className="sold-status-inline">Sold</span>
          )}
        </div>
        <div className="result-description">
          <p title={fullDescription}>{compactCardDescription(fullDescription)}</p>
        </div>
        <div className="result-actions">
          {href ? (
            <Link className="btn btn-gold result-view-button" href={href}>
              {actionLabel} <span aria-hidden="true">›</span>
            </Link>
          ) : (
            <span className="sold-status">SOLD</span>
          )}
        </div>
      </div>
    </article>
  );
}
