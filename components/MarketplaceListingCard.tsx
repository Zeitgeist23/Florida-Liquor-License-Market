import Link from "next/link";
import type { Ref } from "react";

import { countySlug } from "@/data/florida-counties";
import type { Listing } from "@/data/listings";
import { canonicalFloridaCountyName } from "@/lib/county-normalization";
import {
  countyListingDescription,
  sellerReportedStatusLabel,
} from "@/lib/county-listing-descriptions";
import { listingPageHref } from "@/lib/listing-page-urls";

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

function featuredBrokerContact(note: string | undefined) {
  if (!note) return null;
  const match = note.match(
    /Independent broker listing represented by (.+?)\. (?:Buyer inquiry routing|License availability)/,
  );
  if (!match) return null;
  const [name, brokerage, , phone] = match[1]
    .split(" · ")
    .map((value) => value.trim());
  if (!name || !phone) return null;
  return { name, brokerage, phone };
}

export type MarketplaceListingCardProps = {
  listing: Listing;
  focused?: boolean;
  cardRef?: Ref<HTMLElement>;
  id?: string;
  className?: string;
  actionLabel?: string;
};

export default function MarketplaceListingCard({
  listing,
  focused = false,
  cardRef,
  id,
  className,
  actionLabel = "View License",
}: MarketplaceListingCardProps) {
  const county = canonicalFloridaCountyName(listing.county);
  const normalizedListing =
    county === listing.county ? listing : { ...listing, county };
  const available = Boolean(normalizedListing.sourceRef);
  const href = available ? listingPageHref(normalizedListing) : null;

  // County-facing copy is deliberately generated from the exact same canonical
  // county key used for the visible label, map, link, and detail-page route.
  // Do not accept an independent description override here: that can allow one
  // listing card to display another county's market copy.
  const fullDescription = countyListingDescription(county);
  const statusTitle = normalizedListing.licenseStatus
    ? sellerReportedStatusLabel(normalizedListing.licenseStatus)
    : "Status to confirm";
  const brokerContact = normalizedListing.featuredUntil
    ? featuredBrokerContact(normalizedListing.note)
    : null;

  return (
    <article
      className={classNames(
        "result-card",
        available ? "result-card-available" : "result-card-sold",
        normalizedListing.featuredUntil && "result-card-featured",
        focused && "result-card-focused",
        className,
      )}
      id={id}
      ref={cardRef}
      data-listing-reference={normalizedListing.sourceRef || undefined}
      data-listing-county={county}
      data-marketplace-listing-card="true"
    >
      {normalizedListing.featuredUntil ? (
        <span className="featured-listing-badge">Featured Listing</span>
      ) : null}
      <span className="result-type-badge">{normalizedListing.type}</span>
      <div className="result-photo">
        <img
          className="florida-county-map"
          src={`/api/county-map?county=${encodeURIComponent(county)}&transparent=1`}
          alt={`Florida map with ${county} highlighted in gold`}
          width={560}
          height={300}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="result-body">
        <p className="result-county-row">
          <span className="result-pin" aria-hidden="true">
            ●
          </span>
          <Link
            className="result-county-link"
            href={`/counties/${countySlug(county)}`}
          >
            {county}
          </Link>
        </p>
        <h2>
          {href ? (
            <Link
              href={href}
              aria-label={`View ${normalizedListing.type} listing in ${county}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {normalizedListing.priceLabel}
            </Link>
          ) : (
            normalizedListing.priceLabel
          )}
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
          <p title={fullDescription}>
            {compactCardDescription(fullDescription)}
          </p>
        </div>
        {brokerContact ? (
          <address className="featured-broker-contact">
            <span>Listing Broker</span>
            <strong>{brokerContact.name}</strong>
            {brokerContact.brokerage ? (
              <small>{brokerContact.brokerage}</small>
            ) : null}
            <a href={`tel:${brokerContact.phone.replace(/[^\d+]/g, "")}`}>
              {brokerContact.phone}
            </a>
          </address>
        ) : null}
        <div className="result-actions">
          {href ? (
            <Link
              className="btn btn-gold result-view-button"
              href={href}
              style={{ position: "relative", boxSizing: "border-box" }}
            >
              {actionLabel} <span aria-hidden="true">›</span>
              <span
                className="result-view-button-closing-edge"
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: 1,
                  background: "#efaa10",
                  pointerEvents: "none",
                  zIndex: 3,
                }}
              />
            </Link>
          ) : (
            <span className="sold-status">SOLD</span>
          )}
        </div>
      </div>
    </article>
  );
}
