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
  "Restaurant / Bar": "restaurant-bar",
  "Convenience Store": "convenience-store",
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
  const actionHref = listing.href;
  const usesClassification = listing.licenseClass === "sfs" || listing.licenseClass === "2cop";
  const rawLicenseMetricValue =
    listing.licenseClass === "sfs" || listing.licenseClass === "2cop"
      ? "Location-Specific"
      : listing.marketMedianLicenseValue ?? listing.allocatedLicenseValue;
  const hasEstimatedValueSuffix =
    typeof rawLicenseMetricValue === "string" &&
    /\s+est\.?$/i.test(rawLicenseMetricValue);
  const licenseMetricLabel = usesClassification
    ? "License Classification"
    : listing.marketMedianLicenseValue
      ? "FLLM Median 4COP Ask"
      : isMarketListing || hasEstimatedValueSuffix
        ? "License Value Est."
        : "License Value";
  const licenseMetricValue =
    hasEstimatedValueSuffix && typeof rawLicenseMetricValue === "string"
      ? rawLicenseMetricValue.replace(/\s+est\.?$/i, "")
      : rawLicenseMetricValue;
  const showEstimateTooltip =
    !usesClassification && (isMarketListing || hasEstimatedValueSuffix);
  const estimateTooltipText =
    listing.licenseValueBasis === "county_4cop_series_proxy"
      ? "FLLM Est. 3PS Quota Value — derived from this county's current 4COP quota median using FLLM's current matched-market 3PS/4COP series factor (98.5%). Marketplace estimate only; not an appraisal. Any series change remains subject to DBPR approval and applicable premises, zoning, and regulatory requirements."
      : listing.licenseValueBasis === "county_3ps_median"
        ? "FLLM Est. 3PS Quota Value — based on the current median disclosed asking price for standalone 3PS quota licenses in this county. Marketplace estimate only; not an appraisal."
        : "FLLM Est. License Value — marketplace estimate only, not an appraisal.";

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
              <Link href={actionHref}>
                <span
                  className={`business-quota-category business-quota-category--title business-quota-category--${categoryClassName}`}
                >
                  {listing.businessCategory}
                </span>
              </Link>
            </h2>
          </div>
        </div>

        <div className={`business-quota-card-pricing${isMarketListing ? " business-quota-card-pricing--market" : ""}`}>
          <div>
            <span>{isMarketListing ? "Advertised Asking Price" : "Package Price"}</span>
            <strong>{listing.packagePrice}</strong>
          </div>
          <div
            className={
              showEstimateTooltip
                ? "business-quota-card-license-estimate"
                : undefined
            }
            tabIndex={showEstimateTooltip ? 0 : undefined}
            aria-describedby={
              showEstimateTooltip
                ? `${listing.listingReference.toLowerCase()}-license-value-tooltip`
                : undefined
            }
          >
            <span>{licenseMetricLabel}</span>
            <strong className={usesClassification ? "business-quota-card-classification-value" : undefined}>
              {licenseMetricValue}
            </strong>
            {showEstimateTooltip ? (
              <span
                id={`${listing.listingReference.toLowerCase()}-license-value-tooltip`}
                className="business-quota-card-license-value-tooltip"
                role="tooltip"
              >
                {estimateTooltipText}
              </span>
            ) : null}
          </div>
        </div>

        {isMarketListing ? (
          <>
            <p className="business-quota-card-condition">
              {listing.licenseType} reported with<br />observed business-market activity.
            </p>
            <p className="business-quota-card-broker business-quota-card-market-label">
              FLLM Market View
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
              ) : listing.licenseAvailableSeparately ? (
                <>{listing.licenseType} offered separately<br />
                {listing.sellerFinancingAvailable ? "with seller financing available." : "from the business sale."}</>
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

        <div className="business-quota-card-actions">
          <Link className="business-quota-card-action" href={actionHref}>
            {isMarketListing
              ? "View Market View"
              : listing.licenseAvailableSeparately
                ? "View Business + License Options"
                : "View Business + License Package"} <span aria-hidden="true">›</span>
          </Link>

        </div>
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
