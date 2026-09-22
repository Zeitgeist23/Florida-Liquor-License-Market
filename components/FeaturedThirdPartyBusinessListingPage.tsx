import Link from "next/link";

import FloridaCountyMap from "@/components/FloridaCountyMap";
import HeaderNavMenus from "@/components/HeaderNavMenus";
import ListingBrokerInquiryForm from "@/components/ListingBrokerInquiryForm";
import ListingViewCount from "@/components/ListingViewCount";
import {
  FeaturedBrokerBusinessInteractions,
  FeaturedBrokerEmailCopyButton,
} from "@/components/FeaturedThirdPartyBusinessListingInteractions";

export type FeaturedBusinessMetric = {
  label: string;
  value: string;
};

type SellerFinancingDisclosure = {
  offered: true;
  source: "broker-reported" | "seller-reported";
  advertisedRate?: string;
  termsSummary: string;
};

type SbaFinancingDisclosure = {
  status: "broker-advertised" | "lender-reviewed";
  termsSummary: string;
};

export type FeaturedThirdPartyBusinessListingConfig = {
  listingReference: string;
  canonicalPath: string;
  county: string;
  countyHref: string;
  countyValueHref: string;
  countyCities: string;
  askingPrice: string;
  askingPriceNumber: number;
  packagePrice: string;
  packagePriceNumber: number;
  licenseType: "4COP Quota" | "3PS Quota / Package Store";
  businessLabel: string;
  businessLabelLinkUrl?: string;
  heroSummary: string;
  broker: {
    name: string;
    brokerage: string;
    phone: string;
    email: string;
    website: string;
    listingUrl: string;
    photo?: string;
    credential?: string;
  };
  additionalSellerIntro: string;
  additionalSellerIntroLinkText?: string;
  packageIncludes: string;
  businessMetrics: FeaturedBusinessMetric[];
  sellerFinancing?: SellerFinancingDisclosure;
  sbaFinancing?: SbaFinancingDisclosure;
  opportunitiesHeading: string;
  opportunities: string[];
  transitionText?: string;
  confidentialityText: string;
  sourceDisclosure: string;
  countyContext: string;
};

function phoneHref(phone: string) {
  return "tel:" + phone.replace(/[^\d+]/g, "");
}

function buildInquiryHref(config: FeaturedThirdPartyBusinessListingConfig) {
  const params = new URLSearchParams({
    source: "specific-license",
    listing: `${config.listingReference} — ${config.county} — ${config.licenseType} — ${config.askingPrice}`,
    ref: config.listingReference,
    county: config.county,
    license_type: config.licenseType,
    asking_price: config.packagePrice,
    listing_status: "Available / Broker confirmation required",
    listing_url: config.canonicalPath,
  });
  return `/contact?${params.toString()}`;
}

export default function FeaturedThirdPartyBusinessListingPage({
  config,
}: {
  config: FeaturedThirdPartyBusinessListingConfig;
}) {
  const statusLabel = "Available / Broker confirmation required";
  const inquiryHref = buildInquiryHref(config);
  const shortLicenseType =
    config.licenseType === "4COP Quota" ? "4COP Quota" : "3PS Quota";
  const countyShort = config.county.replace(/\s+County$/i, "");
  const isWeSellRestaurantsBroker =
    config.broker.brokerage.trim().toLowerCase() === "we sell restaurants";
  const hasFinancingDisclosure = Boolean(
    config.sellerFinancing || config.sbaFinancing,
  );

  return (
    <main
      className="results-page marketplace-listing-page"
      data-featured-broker-listing={config.listingReference}
      data-featured-broker-business-listing="true"
    >
      <FeaturedBrokerBusinessInteractions
        listingReference={config.listingReference}
      />

      <style>{`
        .featured-business-package-alert{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:10px 0 0;color:#d7e2e8;font-size:14px;font-weight:750;line-height:1.45}.featured-business-package-badge{display:inline-flex;align-items:center;min-height:25px;padding:0 9px;border:1px solid #efaa10;border-radius:4px;color:#071a3a;background:#efaa10;font-size:9px;font-weight:950;letter-spacing:.07em;text-transform:uppercase}.featured-business-package-alert strong{color:#f1b53a}.featured-business-label-link{text-decoration:none!important;transition:color .16s ease,border-color .16s ease}.featured-business-label-link--hero{color:inherit!important;font-weight:inherit!important;text-shadow:none!important;border-bottom:1px solid rgba(215,226,232,.34)}.featured-business-label-link--hero:hover,.featured-business-label-link--hero:focus-visible{color:#fff!important;border-bottom-color:rgba(255,255,255,.72);outline:none}.featured-business-label-link--body{color:#e29abf!important;font-weight:400!important;text-shadow:none!important;border-bottom:0!important}.featured-business-label-link--body:hover,.featured-business-label-link--body:focus-visible{color:#efafd0!important;border-bottom:0!important;outline:none}.package-business-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:17px 0}.package-business-grid div{padding:16px;border:1px solid rgba(226,165,30,.25);border-radius:8px;background:rgba(4,23,39,.72)}.package-business-grid span{display:block;color:#95a9b8;font-size:10px;font-weight:900;letter-spacing:.06em;text-transform:uppercase}.package-business-grid strong{display:block;margin-top:6px;color:#fff;font-size:15px}.package-total{margin:18px 0;padding:16px 18px;border-left:4px solid #efa916;background:rgba(239,169,22,.07);color:#cbd6dd;line-height:1.7}.package-total strong{color:#f1b53a}.featured-business-financing{margin-top:16px;padding:18px;border:1px solid rgba(105,214,255,.32);border-radius:8px;background:rgba(4,23,39,.72)}.featured-business-financing>h3{margin:0 0 13px!important;color:#fff!important;font-size:18px!important;text-align:center}.featured-business-financing-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.featured-business-financing-grid:has(>article:only-child){grid-template-columns:minmax(0,1fr)}.featured-business-financing-card{display:flex;min-height:112px;flex-direction:column;justify-content:center;padding:17px 18px;border:1px solid rgba(241,166,0,.58);border-radius:7px;background:linear-gradient(145deg,#173653,#081b2d);box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 10px 22px rgba(0,0,0,.24)}.featured-business-financing-card>span{color:#69d6ff;font-size:10px;font-weight:900;letter-spacing:.075em;text-transform:uppercase}.featured-business-financing-card>strong{margin-top:5px;color:#f1a600;font:700 21px/1.12 Georgia,serif}.featured-business-financing-card>p{margin:8px 0 0!important;color:#d7e2e8!important;font-size:13px!important;line-height:1.55!important}.featured-business-financing-card>small{margin-top:7px;color:#93a7b5;font-size:10px;line-height:1.45}.marketplace-listing-broker-license{display:block;margin-top:4px;color:#9fb0bd;font-size:11px;font-weight:750}.marketplace-listing-broker-photo img{object-fit:cover}.package-confidential{font-size:12px;color:#9eb0be;line-height:1.6}.package-source-disclosure{font-size:11px;color:#8398a8;line-height:1.6}.featured-business-email-copy-row{display:inline-flex;align-items:center;gap:5px;width:fit-content;max-width:100%}.featured-business-copy-email-button{display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;width:16px;height:16px;margin:0;padding:0;border:0;border-radius:0;background:transparent;color:#f1a600;font-size:13px;font-weight:900;line-height:1;cursor:pointer;box-shadow:none;appearance:none}.featured-business-call-broker-button{position:relative;overflow:hidden;box-shadow:inset 0 1px 0 rgba(255,255,255,.28),0 7px 18px rgba(0,0,0,.28)}.featured-business-call-broker-label{display:block;opacity:1;line-height:inherit;white-space:nowrap;transition:opacity .14s ease}.featured-business-call-broker-phone{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0;color:inherit;font:inherit;line-height:inherit;white-space:nowrap;pointer-events:none;transition:opacity .14s ease}.featured-business-call-broker-button:hover .featured-business-call-broker-label,.featured-business-call-broker-button:focus-visible .featured-business-call-broker-label{opacity:0}.featured-business-call-broker-button:hover .featured-business-call-broker-phone,.featured-business-call-broker-button:focus-visible .featured-business-call-broker-phone{opacity:1}.results-page.marketplace-listing-page[data-featured-broker-business-listing="true"] .we-sell-restaurants-disclosure-link{color:#d98282!important;-webkit-text-fill-color:#d98282!important;background:none!important;background-image:none!important;font-weight:400!important;text-shadow:none!important;text-decoration:none}.results-page.marketplace-listing-page[data-featured-broker-business-listing="true"] .we-sell-restaurants-disclosure-link:hover,.results-page.marketplace-listing-page[data-featured-broker-business-listing="true"] .we-sell-restaurants-disclosure-link:focus-visible{color:#e79a9a!important;-webkit-text-fill-color:#e79a9a!important;filter:none!important;text-shadow:0 0 8px rgba(217,130,130,.22)!important;outline:none}.results-page.marketplace-listing-page[data-featured-broker-business-listing="true"] .we-sell-restaurants-sidebar-link strong{color:#f1a600!important;-webkit-text-fill-color:#f1a600!important}.results-page.marketplace-listing-page[data-featured-broker-business-listing="true"] .we-sell-restaurants-sidebar-link:hover strong,.results-page.marketplace-listing-page[data-featured-broker-business-listing="true"] .we-sell-restaurants-sidebar-link:focus-visible strong{color:#ffc43d!important;-webkit-text-fill-color:#ffc43d!important}@media(max-width:760px){.package-business-grid,.featured-business-financing-grid{grid-template-columns:1fr}}
      `}</style>

      <header className="results-header page-shell">
        <Link
          className="seller-brand"
          href="/"
          aria-label="Florida Liquor License Market home"
        >
          <img
            src="/assets/brand-sharp.svg"
            alt="Florida Liquor License Market"
          />
        </Link>
        <HeaderNavMenus
          className="primary-nav listings-primary-nav"
          showContactLink
        />
      </header>

      <section className="marketplace-listing-hero">
        <div className="marketplace-listing-shell marketplace-listing-hero-grid">
          <div className="marketplace-listing-copy">
            <div className="marketplace-listing-breadcrumbs">
              <Link href="/businesses-with-quota-licenses">Businesses With Quota Licenses</Link>
              <span>›</span>
              <Link href={config.countyHref}>{config.county}</Link>
              <span>›</span>
              <strong>{config.listingReference}</strong>
            </div>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: 27,
                marginBottom: 10,
                padding: "0 11px",
                border: "1px solid #79ddff",
                borderRadius: 5,
                color: "#ffffff",
                background: "linear-gradient(180deg,#22bde9,#087ba5)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,.35),0 5px 14px rgba(0,160,210,.18)",
                fontSize: 10,
                fontWeight: 900,
                letterSpacing: ".065em",
                textTransform: "uppercase",
              }}
            >
              Featured Listing
            </span>
            <span className="marketplace-listing-kicker">
              Featured Third-Party Broker Listing
            </span>
            <h1>
              <span className="marketplace-listing-title-line">
                {config.county}
              </span>
              <span className="marketplace-listing-title-line marketplace-listing-title-type">
                {config.businessLabel}
              </span>
              <span className="marketplace-listing-title-line">
                + <span className="marketplace-license-series">{shortLicenseType.replace(" Quota", "")}</span>{" "}
                Quota License
              </span>
            </h1>
            <p className="marketplace-listing-price">{config.packagePrice}</p>
            <div className="featured-business-package-alert">
              <span className="featured-business-package-badge">
                Business Purchase Required
              </span>
              <span>
                Included {shortLicenseType} allocated value {config.askingPrice} ·{" "}
                <strong>License not offered separately</strong>
              </span>
            </div>
            <div className="marketplace-listing-availability">
              <span className="availability-pill" title={statusLabel}>
                <span className="availability-dot" aria-hidden="true" />
                Available
              </span>
              <span className="marketplace-listing-hero-reference">
                Listing {config.listingReference}
              </span>
              <ListingViewCount listingRef={config.listingReference} />
              <span className="marketplace-listing-broker-badge">
                Featured · Third-Party Broker
              </span>
            </div>
            <p className="marketplace-listing-summary">{config.heroSummary}</p>
            <div className="marketplace-listing-actions">
              <Link
                className="marketplace-listing-primary"
                href={inquiryHref}
                aria-label={`Inquire about the ${config.county} business and ${shortLicenseType} package`}
              >
                Inquire About This Business Package
              </Link>
              <Link
                className="marketplace-listing-secondary"
                href={config.countyHref}
              >
                View {countyShort} License Market
              </Link>
            </div>
          </div>

          <div
            className="marketplace-listing-map"
            aria-label={`${config.county} map`}
          >
            <FloridaCountyMap county={config.county} enlarged />
            <strong>{config.county}</strong>
            <span>{config.countyCities}</span>
          </div>
        </div>
      </section>

      <section className="marketplace-listing-body">
        <div className="marketplace-listing-shell">
          <div className="marketplace-listing-grid">
            <article className="marketplace-listing-main">
              <div className="marketplace-listing-heading">
                <span>Specific License Details</span>
                <h2>
                  <span className="marketplace-license-series">
                    {shortLicenseType.replace(" Quota", "")}
                  </span>{" "}
                  Quota in {config.county}
                </h2>
              </div>

              <div
                className="marketplace-listing-facts"
                aria-label="Specific listing details"
              >
                <div>
                  <span>Business + License Package</span>
                  <strong>{config.packagePrice}</strong>
                </div>
                <div>
                  <span>Allocated License Value</span>
                  <strong>{config.askingPrice}</strong>
                </div>
                <div>
                  <span>License Type</span>
                  <strong>{shortLicenseType}</strong>
                </div>
                <div>
                  <span>Marketplace Status</span>
                  <strong>{statusLabel}</strong>
                </div>
              </div>

              <section
                className="marketplace-listing-highlights"
                aria-labelledby="license-highlights-heading"
              >
                <h3 id="license-highlights-heading">License Highlights</h3>
                <div className="marketplace-listing-highlight-grid">
                  <div>
                    <svg viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M11 42h13V18H11zM15 18V8h5v10M11 26h13M29 25h12l-2 9a5 5 0 0 1-4 3.5A5 5 0 0 1 31 34zM35 37.5V42M30 42h10" />
                    </svg>
                    <strong>
                      Full-liquor
                      <br />
                      privileges
                    </strong>
                  </div>
                  <div>
                    <svg viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M8 18h32l-4-9H12zM11 18v22h26V18M17 40V27h14v13M9 18c0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0" />
                    </svg>
                    <strong>
                      On- or
                      <br />
                      off-premises use
                    </strong>
                  </div>
                  <div>
                    <svg viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M15 9h18v33H10V9h5M18 6h12v7H18zM16 21l3 3 6-7M16 31l3 3 6-7M29 21h5M29 31h5" />
                    </svg>
                    <strong>
                      Generally no SFS
                      <br />
                      food-sales percentage
                    </strong>
                  </div>
                  <div>
                    <svg viewBox="0 0 48 48" aria-hidden="true">
                      <circle cx="24" cy="14" r="7" />
                      <circle cx="10" cy="22" r="5" />
                      <circle cx="38" cy="22" r="5" />
                      <path d="M13 42v-6c0-7 5-12 11-12s11 5 11 12v6zM2 42v-5c0-5 4-9 9-9 2 0 4 1 6 2M46 42v-5c0-5-4-9-9-9-2 0-4 1-6 2" />
                    </svg>
                    <strong>
                      Limited {countyShort}
                      <br />
                      County quota supply
                    </strong>
                  </div>
                </div>
              </section>

              {hasFinancingDisclosure ? (
                <section
                  className="featured-business-financing"
                  aria-labelledby="featured-business-financing-heading"
                >
                  <h3 id="featured-business-financing-heading">
                    Purchase Financing
                  </h3>
                  <div className="featured-business-financing-grid">
                    {config.sellerFinancing ? (
                      <article className="featured-business-financing-card">
                        <span>Broker-Reported Terms</span>
                        <strong>Seller Financing Available</strong>
                        <p>
                          {config.sellerFinancing.advertisedRate
                            ? `${config.sellerFinancing.advertisedRate} advertised rate · `
                            : ""}
                          {config.sellerFinancing.termsSummary}
                        </p>
                        <small>
                          Availability, final terms, documentation, and buyer
                          qualification require direct seller and broker
                          confirmation.
                        </small>
                      </article>
                    ) : null}
                    {config.sbaFinancing ? (
                      <article className="featured-business-financing-card">
                        <span>
                          {config.sbaFinancing.status === "lender-reviewed"
                            ? "Lender-Reviewed"
                            : "Broker-Advertised"}
                        </span>
                        <strong>SBA Financing May Be Available</strong>
                        <p>{config.sbaFinancing.termsSummary}</p>
                        <small>
                          SBA eligibility and all credit, underwriting,
                          collateral, and approval decisions belong to the
                          participating lender and, where applicable, the SBA.
                        </small>
                      </article>
                    ) : null}
                  </div>
                </section>
              ) : null}

              <div className="marketplace-listing-note">
                <strong>Third-party broker disclosure</strong>
                <p>
                  This featured listing is represented by {config.broker.name} of{" "}
                  <a
                    className={`featured-business-disclosure-link${isWeSellRestaurantsBroker ? " we-sell-restaurants-disclosure-link" : ""}`}
                    href={isWeSellRestaurantsBroker ? config.broker.website : config.broker.listingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {config.broker.brokerage}
                  </a>
                  . Florida Liquor License Market is providing marketplace
                  exposure and is not acting as the seller&apos;s broker or
                  transaction representative. Availability, package terms,
                  license status, transferability, and all transaction
                  information should be confirmed directly with the listing
                  broker.
                </p>
              </div>

              <section className="marketplace-listing-section">
                <h2>About This License Listing</h2>
                <p>
                  This individual marketplace page represents the {config.county}{" "}
                  {shortLicenseType} liquor-license interest identified as{" "}
                  {config.listingReference}. The displayed license asking price
                  is {config.askingPrice}.
                </p>
                <p>
                  <strong>Business purchase required:</strong> the license is
                  being offered only in connection with the acquisition of the
                  associated{" "}
                  {config.businessLabelLinkUrl ? (
                    <a
                      className="featured-business-label-link featured-business-label-link--body"
                      href={config.businessLabelLinkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {config.businessLabel}
                    </a>
                  ) : (
                    config.businessLabel
                  )}
                  . The liquor license is not currently offered as a standalone
                  sale.
                </p>
                <p>
                  A Florida quota license may generally be changed between the{" "}
                  <Link
                    className="featured-business-license-type-link featured-business-license-type-link--4cop"
                    href="/license-types/4cop-quota"
                  >
                    4COP Quota
                  </Link>{" "}
                  series and the{" "}
                  <Link
                    className="featured-business-license-type-link featured-business-license-type-link--3ps"
                    href="/license-types/3ps-package-store"
                  >
                    3PS Quota
                  </Link>{" "}
                  series through a DBPR-approved change of license series,
                  subject to applicable premises, zoning, applicant, and
                  regulatory requirements.
                </p>
              </section>

              <section className="marketplace-listing-section marketplace-listing-seller-details">
                <h2>Additional Seller Details</h2>
                <p>
                  {config.additionalSellerIntroLinkText &&
                  config.additionalSellerIntro.includes(
                    config.additionalSellerIntroLinkText,
                  ) ? (
                    <>
                      {config.additionalSellerIntro.slice(
                        0,
                        config.additionalSellerIntro.indexOf(
                          config.additionalSellerIntroLinkText,
                        ),
                      )}
                      <a
                        className="featured-business-seller-link featured-business-glimmer-link"
                        href={config.broker.listingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {config.additionalSellerIntroLinkText}
                      </a>
                      {config.additionalSellerIntro.slice(
                        config.additionalSellerIntro.indexOf(
                          config.additionalSellerIntroLinkText,
                        ) + config.additionalSellerIntroLinkText.length,
                      )}
                    </>
                  ) : (
                    config.additionalSellerIntro
                  )}
                </p>
                <p>
                  The total asking price for the{" "}
                  <a
                    className="package-listing-link"
                    href={config.broker.listingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    business and license package is {config.packagePrice}
                  </a>
                  . {config.packageIncludes}
                </p>

                <div className="package-total">
                  <strong>
                    Business + license package: {config.packagePrice}.
                  </strong>{" "}
                  The {shortLicenseType} liquor license is displayed on FLLM at{" "}
                  {config.askingPrice}. Purchase of the associated business is
                  required, and the license is not currently being offered
                  separately.
                </div>

                <h3>Broker-reported business details</h3>
                <div
                  className="package-business-grid"
                  aria-label="Broker-reported business metrics"
                >
                  {config.businessMetrics.map((metric) => (
                    <div key={metric.label}>
                      <span>{metric.label}</span>
                      <strong>{metric.value}</strong>
                    </div>
                  ))}
                </div>

                <h3>{config.opportunitiesHeading}</h3>
                <ul>
                  {config.opportunities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {config.transitionText ? <p>{config.transitionText}</p> : null}
                <p className="package-confidential">
                  <strong>Confidentiality:</strong>{" "}
                  {config.confidentialityText}
                </p>
                <p className="package-source-disclosure">
                  {config.sourceDisclosure}
                </p>
              </section>

              <section className="marketplace-listing-section">
                <h2>{config.county} Market Context</h2>
                <p>{config.countyContext}</p>
                <p>
                  <Link href={config.countyHref}>
                    View the {config.county} liquor license market →
                  </Link>
                </p>
                <p>
                  <Link href={config.countyValueHref}>
                    Review current {config.county} liquor license values →
                  </Link>
                </p>
              </section>
            </article>

            <aside className="marketplace-listing-aside marketplace-listing-aside-broker">
              <div className="marketplace-listing-action-card">
                <span>Independent Listing Broker</span>
                <div className="marketplace-listing-broker-profile">
                  <h2>{config.broker.name}</h2>
                  {config.broker.photo ? (
                    <a
                      className="marketplace-listing-broker-photo"
                      href={config.broker.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${config.broker.name} and ${config.broker.brokerage}`}
                    >
                      <img
                        src={config.broker.photo}
                        alt={`${config.broker.name}, listing broker`}
                        referrerPolicy="no-referrer"
                      />
                    </a>
                  ) : null}
                  <div className="marketplace-listing-broker-contact">
                    {isWeSellRestaurantsBroker ? (
                      <a
                        className="we-sell-restaurants-sidebar-link"
                        href={config.broker.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${config.broker.name}'s ${config.broker.brokerage} broker page`}
                      >
                        <strong>{config.broker.brokerage}</strong>
                      </a>
                    ) : (
                      <strong>{config.broker.brokerage}</strong>
                    )}
                    {config.broker.credential ? (
                      <span className="marketplace-listing-broker-license">
                        {config.broker.credential}
                      </span>
                    ) : null}
                    <a href={phoneHref(config.broker.phone)}>
                      ☎ {config.broker.phone}
                    </a>
                    <span className="featured-business-email-copy-row">
                      <a href={`mailto:${config.broker.email}`}>
                        {config.broker.email}
                      </a>
                      <FeaturedBrokerEmailCopyButton
                        email={config.broker.email}
                      />
                    </span>
                  </div>
                </div>
                <a
                  className="marketplace-listing-primary featured-business-call-broker-button"
                  href={phoneHref(config.broker.phone)}
                  aria-label={`Call listing broker ${config.broker.name} at ${config.broker.phone}`}
                >
                  <span className="featured-business-call-broker-label">
                    Call Listing Broker
                  </span>
                  <span
                    className="featured-business-call-broker-phone"
                    aria-hidden="true"
                  >
                    {config.broker.phone}
                  </span>
                </a>
                <a
                  className="marketplace-listing-text-link"
                  href={config.broker.listingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Listing Broker Website →
                </a>
                <ListingBrokerInquiryForm
                  listingReference={config.listingReference}
                  listingRequested={`${config.county} ${shortLicenseType} Liquor License — Business Purchase Required`}
                  listingCounty={config.county}
                  licenseType={shortLicenseType}
                  askingPrice={`${config.askingPrice} license asking price; ${config.packagePrice} total business package`}
                  listingStatus={statusLabel}
                  listingUrl={config.canonicalPath}
                  showFinancingCalculator
                  financingPurchasePrice={config.packagePriceNumber}
                />
              </div>

              <section
                className="marketplace-listing-appraisal-card"
                aria-labelledby="listing-appraisal-promo-title"
              >
                <img
                  src="/assets/fllm-formal-appraisal-preview-v1.webp"
                  alt="Sample FLLM formal liquor license appraisal report"
                />
                <div>
                  <span>Professional License Valuation</span>
                  <h2 id="listing-appraisal-promo-title">
                    Order a Liquor License Appraisal
                  </h2>
                  <p>
                    Get a license-specific valuation supported by county market
                    evidence and regulatory research.
                  </p>
                  <Link
                    className="marketplace-listing-appraisal-button"
                    href="/florida-liquor-license-appraisal#order-form"
                  >
                    Order an Appraisal
                  </Link>
                  <Link
                    className="marketplace-listing-heat-map-link"
                    href="/?open=heat-map"
                  >
                    Explore the Florida License Heat Map →
                  </Link>
                </div>
              </section>

              <section
                className="marketplace-listing-finance-promo"
                aria-labelledby="listing-financing-promo-title"
              >
                <span>Liquor License Purchase Financing</span>
                <h2 id="listing-financing-promo-title">
                  Finance the License Component
                </h2>
                <p>
                  Request financing consideration through the FLLM Private
                  Lender Network for the qualifying liquor-license component of
                  a transaction.
                </p>
                <Link
                  className="marketplace-listing-finance-button"
                  href="/financing#request-financing"
                >
                  Request Financing
                </Link>
                <small>
                  All financing is subject to independent lender review,
                  underwriting, collateral eligibility, transaction structure,
                  and approval.
                </small>
              </section>
            </aside>
          </div>

          <div className="marketplace-listing-disclaimer">
            Marketplace information is provided for informational purposes and
            remains subject to seller or broker confirmation. Florida Liquor
            License Market does not guarantee business performance, license
            status, availability, transfer approval, package price, license
            price, lease terms, or transaction terms. Independent legal, tax,
            financial, licensing, zoning, and regulatory review is recommended.
          </div>
        </div>
      </section>
    </main>
  );
}
