import Image from "next/image";
import Link from "next/link";

import type { BusinessQuotaListing } from "@/lib/business-quota-listings";

export default function BusinessQuotaListingCard({
  listing,
}: {
  listing: BusinessQuotaListing;
}) {
  return (
    <article className="business-quota-card" data-business-quota-listing={listing.listingReference}>
      <div className="business-quota-card-map">
        <Image
          src={`/api/county-map?county=${encodeURIComponent(listing.county)}&transparent=1`}
          alt={`Florida map with ${listing.county} highlighted in gold`}
          width={560}
          height={300}
          unoptimized
        />
        <span>{listing.licenseType} Included</span>
        {listing.featured ? <strong>Featured Listing</strong> : null}
      </div>

      <div className="business-quota-card-body">
        <p className="business-quota-card-location">
          <span aria-hidden="true">●</span>
          <Link href={listing.countyHref}>{listing.county}</Link>
        </p>
        <h2><Link href={listing.href}>{listing.title}</Link></h2>
        <p className="business-quota-card-type">{listing.businessType}</p>

        <div className="business-quota-card-pricing">
          <div><span>Total Business + License Package</span><strong>{listing.packagePrice}</strong></div>
          <div><span>Allocated License Value</span><strong>{listing.allocatedLicenseValue}</strong></div>
        </div>

        <p className="business-quota-card-condition">
          The quota license is included in the business acquisition and is not offered separately.
        </p>
        <p className="business-quota-card-broker">
          Represented by <strong>{listing.brokerName}</strong> · {listing.brokerage}
        </p>

        <Link className="business-quota-card-action" href={listing.href}>
          View Business + License Package <span aria-hidden="true">›</span>
        </Link>
      </div>
    </article>
  );
}
