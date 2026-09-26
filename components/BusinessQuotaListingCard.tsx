import Image from "next/image";
import Link from "next/link";

import type {
  BusinessQuotaCategory,
  BusinessQuotaListing,
} from "@/lib/business-quota-listings";

const categoryClassNames: Record<BusinessQuotaCategory, string> = {
  Bar: "bar",
  "Cocktail Lounge": "cocktail-lounge",
  Nightclub: "nightclub",
  Restaurant: "restaurant",
  "Bowling Alley": "bowling-alley",
  "Liquor Store": "liquor-store",
  Marina: "marina",
  "Gentlemen's Club": "gentlemens-club",
  "Hotel / Motel": "hotel-motel",
  "Country Club": "country-club",
  "Other Hospitality": "other-hospitality",
};

export default function BusinessQuotaListingCard({
  listing,
}: {
  listing: BusinessQuotaListing;
}) {
  const categoryClassName = categoryClassNames[listing.businessCategory];
  const isMarketListing = listing.listingTier === "market";
  const actionHref = isMarketListing ? listing.marketViewHref ?? "/market-data/heat-map" : listing.href;

  return (
    <article
      className="business-quota-card"
      data-business-quota-listing={listing.listingReference}
      data-business-category={categoryClassName}
      data-market-listing={isMarketListing ? "true" : undefined}
    >
      {listing.featured ? (
        <strong className="business-quota-featured-badge">Featured Listing</strong>
      ) : null}
      <span className="business-quota-type-badge">
        {listing.licenseType} Included
      </span>

      <div className="business-quota-card-body">
        <div className="business-quota-card-heading">
          <span className="business-quota-card-location-dot" aria-hidden="true">●</span>
          <div className="business-quota-card-heading-stack">
            <p className="business-quota-card-location">
              <Link href={listing.countyHref}>{listing.county}</Link>
            </p>

            <h2>
              {isMarketListing ? (
                <span
                  className={`business-quota-category business-quota-category--title business-quota-category--${categoryClassName}`}
                >
                  {listing.businessCategory}
                </span>
              ) : (
                <Link href={listing.href}>
                  <span
                    className={`business-quota-category business-quota-category--title business-quota-category--${categoryClassName}`}
                  >
                    {listing.businessCategory}
                  </span>
                </Link>
              )}
            </h2>
          </div>
        </div>

        <div className={`business-quota-card-pricing${isMarketListing ? " business-quota-card-pricing--market" : ""}`}>
          <div>
            <span>Package Price</span>
            <strong>{listing.packagePrice}</strong>
          </div>
          <div>
            <span>{isMarketListing ? "License Value Est." : listing.licenseClass === "2cop" ? "License Classification" : "License Value"}</span>
            <strong>{listing.allocatedLicenseValue}</strong>
          </div>
        </div>

        {isMarketListing ? (
          <>
            <p className="business-quota-card-condition">
              {listing.licenseClass === "2cop" ? (
                <>{listing.licenseType} included<br />with advertised business package.</>
              ) : listing.licenseClass === "sfs" ? (
                <>4COP SFS/SRX license included<br />with advertised business package.</>
              ) : (
                <>{listing.licenseType} liquor license included<br />and not offered separately.</>
              )}
            </p>
            <p className="business-quota-card-broker business-quota-card-market-label">
              Market Listing
            </p>
          </>
        ) : (
          <>
            <p className="business-quota-card-condition">
              {listing.licenseClass === "2cop" ? (
                <>{listing.licenseType} reported with the business.<br />Verify license status and transfer requirements.</>
              ) : listing.licenseClass === "sfs" ? (
                <>4COP SFS/SRX license included<br />
                and not offered separately.</>
              ) : (
                <>{listing.licenseType} liquor license included<br />
                and not offered separately.</>
              )}
            </p>

            <p className="business-quota-card-broker">
              {listing.sellerDirect ? "Offered directly by " : "Represented by "}<strong>{listing.brokerName}</strong>
            </p>
          </>
        )}

        <Link className="business-quota-card-action" href={actionHref}>
          {isMarketListing ? "Market View" : "View Business + License Package"} <span aria-hidden="true">›</span>
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
