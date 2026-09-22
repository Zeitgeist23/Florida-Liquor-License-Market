import Image from "next/image";
import Link from "next/link";

import type { BusinessQuotaListing } from "@/lib/business-quota-listings";

export default function BusinessQuotaListingCard({
  listing,
}: {
  listing: BusinessQuotaListing;
}) {
  return (
    <article
      className="business-quota-card"
      data-business-quota-listing={listing.listingReference}
    >
      {listing.featured ? (
        <strong className="business-quota-featured-badge">Featured Listing</strong>
      ) : null}
      <span className="business-quota-type-badge">
        {listing.licenseType} Included
      </span>

      <div className="business-quota-card-body">
        <p className="business-quota-card-location">
          <span aria-hidden="true">●</span>
          <Link href={listing.countyHref}>{listing.county}</Link>
        </p>

        <h2>
          <Link href={listing.href}>{listing.title}</Link>
        </h2>

        <p className="business-quota-card-type">{listing.businessType}</p>

        <div className="business-quota-card-pricing">
          <div>
            <span>Business + License Package</span>
            <strong>{listing.packagePrice}</strong>
          </div>
          <div>
            <span>License Allocation</span>
            <strong>{listing.allocatedLicenseValue}</strong>
          </div>
        </div>

        <p className="business-quota-card-condition">
          Quota license included and not offered separately.
        </p>

        <p className="business-quota-card-broker">
          Represented by <strong>{listing.brokerName}</strong>
        </p>

        <Link className="business-quota-card-action" href={listing.href}>
          View Business + License Package <span aria-hidden="true">›</span>
        </Link>
      </div>

      <div className="business-quota-card-map">
        <Image
          className="florida-county-map"
          src={`/api/county-map?county=${encodeURIComponent(listing.county)}&transparent=1`}
          alt={`Florida map with ${listing.county} highlighted in gold`}
          width={560}
          height={300}
          unoptimized
        />
      </div>
    </article>
  );
}
