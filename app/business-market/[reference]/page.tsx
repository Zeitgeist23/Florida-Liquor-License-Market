import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import BusinessPackageHeatMap, { type BusinessPackageHeatMapRow } from "@/components/BusinessPackageHeatMap";
import BusinessMarketHeroMap from "@/components/BusinessMarketHeroMap";
import BusinessMarketLicenseFeatureCards from "@/components/BusinessMarketLicenseFeatureCards";
import FormsSiteHeader from "@/components/FormsSiteHeader";
import MarketBuyerLeadForm from "@/components/MarketBuyerLeadForm";
import ObservedDaysOnMarket from "@/components/ObservedDaysOnMarket";
import { countySlug, floridaCounties } from "@/data/florida-counties";
import { withMarketLicenseValues } from "@/lib/business-quota-market-values";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";
import { getOrStartMarketListingObservation } from "@/lib/market-listing-observation";
import { getSourcedObservedFinancials } from "@/lib/market-intelligence-store";
import {
  businessMarketRecordHref,
  businessQuotaListingRecords,
  passesBusinessMarketSourcePolicy,
  type BusinessQuotaListing,
} from "@/lib/business-quota-listings";

import "@/app/fllm-official-template.css";
import "@/app/fllm-design-system.css";
import "@/app/counties/counties-page.css";
import "@/app/market-data/heat-map/business-package-heat-map.css";
import "./market-record.css";
import "./fllm-capture.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";

const marketRecords = businessQuotaListingRecords.filter(
  (listing) =>
    listing.listingTier === "market" &&
    passesBusinessMarketSourcePolicy(listing),
);

type PageProps = {
  params: Promise<{ reference: string }>;
};

function recordFor(reference: string) {
  const normalized = decodeURIComponent(reference).trim().toUpperCase();
  return marketRecords.find((listing) => listing.listingReference === normalized) ?? null;
}

function countyFor(listing: BusinessQuotaListing) {
  return floridaCounties.find((county) => county.name === listing.county) ?? null;
}

function marketViewTitle(listing: BusinessQuotaListing) {
  return `${listing.county} ${listing.businessCategory} + ${listing.licenseType} | ${listing.listingReference}`;
}

function marketViewDescription(listing: BusinessQuotaListing) {
  const askingPrice = listing.packagePriceNumber > 0
    ? `Observed asking price: ${listing.packagePrice}.`
    : "Asking price not disclosed.";
  return `FLLM Market View ${listing.listingReference}: ${listing.businessCategory.toLowerCase()} business-market observation in ${listing.county} involving ${listing.licenseType}. ${askingPrice} Compare county license-market context and disclosed financial information. FLLM does not broker this operating business.`;
}

function moneyValue(value?: string) {
  if (!value) return 0;
  const numeric = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
}

function median(values: number[]) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? Math.round((sorted[middle - 1] + sorted[middle]) / 2)
    : sorted[middle];
}

function money(value: number | null) {
  if (value === null) return "No disclosed asks";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function buildMarketMapRows(
  listings: BusinessQuotaListing[],
  licenseType: string,
): BusinessPackageHeatMapRow[] {
  const grouped = new Map<string, BusinessQuotaListing[]>();

  for (const listing of listings) {
    const group = grouped.get(listing.county) ?? [];
    group.push(listing);
    grouped.set(listing.county, group);
  }

  return Array.from(grouped.entries())
    .map(([county, countyListings]) => {
      const prices = countyListings
        .map((item) => item.packagePriceNumber)
        .filter(
          (price): price is number =>
            typeof price === "number" && Number.isFinite(price) && price > 0,
        );

      return {
        name: county,
        slug: countySlug(county),
        listingCount: countyListings.length,
        averagePrice: prices.length
          ? prices.reduce((sum, price) => sum + price, 0) / prices.length
          : null,
        licenseType,
        businessCategories: Array.from(
          new Set(countyListings.map((item) => item.businessCategory)),
        ).sort(),
      };
    })
    .sort(
      (left, right) =>
        right.listingCount - left.listingCount ||
        left.name.localeCompare(right.name),
    );
}


function licenseBuyerGuide(listing: BusinessQuotaListing) {
  if (listing.licenseType === "4COP Quota") {
    return {
      heading: "What a 4COP Quota License Means",
      copy:
        "A 4COP quota license is a county-specific transferable full-liquor license that can authorize beer, wine, and distilled spirits for on-premises consumption, subject to the approved premises and regulatory requirements. The quota license is a distinct asset from the operating business and can carry substantial market value.",
      buyerPoints: [
        "Confirm the exact license number, ownership, county, current status, and transfer eligibility.",
        "Evaluate the quota-license component separately from the operating business asking price.",
        "Confirm zoning, premises eligibility, local approvals, and intended use before closing.",
        "Review liens, security interests, tax-clearance issues, and DBPR/ABT transfer requirements.",
      ],
      sellerPoints: [
        "Keep the license component clearly identified in the transaction documents.",
        "Provide current license records and disclose whether the license is included, financed, or separately valued.",
        "Coordinate transfer timing with the business closing so the buyer can obtain required approvals.",
      ],
    };
  }
  if (listing.licenseType === "3PS Quota / Package Store") {
    return {
      heading: "What a 3PS Quota License Means",
      copy:
        "A 3PS quota license is a transferable package-store quota license used for off-premises sales of beer, wine, and distilled spirits. It is county-specific and remains subject to buyer qualification, premises approval, transfer requirements, and local land-use rules.",
      buyerPoints: [
        "Verify the license series, county, current status, and transfer eligibility.",
        "Confirm the proposed retail premises qualifies for package-store use.",
        "Separate license value from inventory, leasehold, real estate, and operating-business value.",
        "Review liens, tax issues, and DBPR/ABT transfer requirements before closing.",
      ],
      sellerPoints: [
        "State clearly whether inventory, real estate, or other business assets are included.",
        "Keep the quota-license asking price and operating-business terms separately identifiable.",
        "Prepare current transfer and ownership documentation for buyer diligence.",
      ],
    };
  }
  if (listing.licenseType === "4COP SFS/SRX") {
    return {
      heading: "What a 4COP SFS / SRX License Means",
      copy:
        "A 4COP SFS / SRX license is a qualification-based restaurant license tied to the qualifying operation and approved premises. It supports full-liquor service on premises and, under current Florida law, can also permit qualifying restaurant-prepared wine- and liquor-based drinks for off-premises consumption when sold with food and packaged as required by law. It is not the same independently transferable county quota asset as a 4COP quota license.",
      buyerPoints: [
        "Confirm the restaurant continues to meet the applicable food-service and premises requirements.",
        "Verify the license classification and approved location before assuming full-liquor privileges continue.",
        "If the restaurant offers alcohol to go, verify that orders include food and that prepared wine- or liquor-based drinks follow the statutory sealing, tamper-evident packaging, receipt and delivery rules; the SFS authority does not permit ordinary package-store sales of manufacturer-sealed bottles of distilled spirits.",
        "Do not assign a separate quota-license asset value to an SFS / SRX license.",
        "Confirm DBPR/ABT transfer or change-of-ownership requirements for the specific premises.",
      ],
      sellerPoints: [
        "Describe the license as premises- and qualification-dependent rather than as a transferable quota asset.",
        "Provide operating records needed to support continuing restaurant qualification.",
        "Separate the business value from any claimed liquor-license value.",
      ],
    };
  }
  return {
    heading: "What a 2COP Beer & Wine License Means",
    copy:
      "A 2COP license generally authorizes beer and wine sales for consumption on the licensed premises and package sales as allowed by the license. It does not provide distilled-spirit privileges and is not a transferable quota asset.",
    buyerPoints: [
      "Confirm the exact license classification and current premises approval.",
      "Verify that the intended concept does not require distilled-spirit privileges.",
      "Do not treat the 2COP license as a separately valuable quota asset.",
      "Confirm transfer, zoning, and local operating requirements before closing.",
    ],
    sellerPoints: [
      "Describe the license accurately as beer-and-wine rather than full liquor.",
      "Keep the business asking price separate from any unsupported standalone license value.",
      "Provide current DBPR/ABT license records for buyer diligence.",
    ],
  };
}

function categoryMarketHub(listing: BusinessQuotaListing) {
  if (listing.businessCategory === "Restaurant") {
    if (listing.licenseType === "2COP Beer & Wine") {
      return {
        href: "/restaurants-with-liquor-licenses#2cop-restaurant-inventory",
        label: "Florida Restaurants for Sale — 2COP Beer & Wine",
      };
    }
    if (listing.licenseType === "4COP SFS/SRX") {
      return {
        href: "/restaurants-with-liquor-licenses#sfs-restaurant-inventory",
        label: "Florida Restaurants for Sale — 4COP SFS / SRX",
      };
    }
    if (listing.licenseType === "4COP Quota") {
      return {
        href: "/restaurants-with-liquor-licenses#quota-restaurant-inventory",
        label: "Florida Restaurants for Sale — 4COP Quota",
      };
    }
    return {
      href: "/restaurants-with-liquor-licenses",
      label: "Florida Restaurants for Sale",
    };
  }

  if (
    listing.businessCategory === "Bar" ||
    listing.businessCategory === "Cocktail Lounge"
  ) {
    return {
      href: "/bars-for-sale-with-liquor-licenses",
      label: "Florida bars with full liquor for sale",
    };
  }

  if (listing.businessCategory === "Nightclub") {
    return {
      href: "/nightclubs-for-sale-with-liquor-licenses",
      label: "Florida Nightclubs for Sale",
    };
  }

  if (listing.businessCategory === "Gentlemen's Club") {
    return {
      href: "/gentlemens-clubs-for-sale-with-liquor-licenses",
      label: "Florida gentlemen's clubs with full liquor for sale",
    };
  }

  return {
    href: "/businesses-with-quota-licenses",
    label: "Florida businesses for sale with liquor licenses",
  };
}

function countyMarketSummary(listing: BusinessQuotaListing, county: ReturnType<typeof countyFor>) {
  const cities = county?.primaryCities?.length ? county.primaryCities.join(", ") : listing.county;
  return {
    cities,
    intro:
      county?.introduction ??
      `${listing.county} is part of Florida's active hospitality, retail, and liquor-license market.`,
    overview:
      county?.marketOverview ??
      `Buyers and sellers in ${listing.county} should compare current license availability, asking-price context, premises requirements, and transfer timing before relying on a transaction.`,
  };
}

export function generateStaticParams() {
  return marketRecords.map((listing) => ({
    reference: listing.listingReference.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { reference } = await params;
  const listing = recordFor(reference);
  if (!listing) return {};

  const canonicalPath = businessMarketRecordHref(listing);
  const title = `${marketViewTitle(listing)} | FLLM Market View`;
  const description = marketViewDescription(listing);

  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}${canonicalPath}` },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url: `${siteUrl}${canonicalPath}`,
      title,
      description,
      siteName: "Florida Liquor License Market",
    },
  };
}

export default async function BusinessMarketRecordPage({ params }: PageProps) {
  const { reference } = await params;
  const rawListing = recordFor(reference);
  if (!rawListing) notFound();

  const standaloneListings = getVisibleAvailableMarketplaceListings(
    await getMarketplaceListings(),
  );
  const baseListing =
    withMarketLicenseValues([rawListing], standaloneListings)[0] ?? rawListing;
  let listing = baseListing;
  try {
    const financials = await getSourcedObservedFinancials([baseListing.listingReference]);
    const observed = financials.get(baseListing.listingReference);
    if (observed) {
      listing = {
        ...baseListing,
        grossRevenueNumber: observed.gross ?? baseListing.grossRevenueNumber,
        sdeNumber: observed.sde ?? baseListing.sdeNumber,
        ebitdaNumber: observed.ebitda ?? baseListing.ebitdaNumber,
      };
    }
  } catch (error) {
    console.error("Market View financial enrichment unavailable", error);
  }

  const county = countyFor(listing);
  const canonicalPath = businessMarketRecordHref(listing);
  const title = marketViewTitle(listing);
  const primaryMarkets = county?.primaryCities ?? [];
  const otherCountyListingsCount = marketRecords.filter(
    (candidate) =>
      candidate.county === listing.county &&
      candidate.listingReference !== listing.listingReference,
  ).length;
  const mapListings = marketRecords.filter(
    (candidate) =>
      candidate.licenseType === listing.licenseType &&
      candidate.businessCategory === listing.businessCategory,
  );
  const mapRows = buildMarketMapRows(mapListings, listing.licenseType);
  const mapListingType: "businesses" | "businesses-sfs" | "businesses-2cop" =
    listing.licenseClass === "sfs"
      ? "businesses-sfs"
      : listing.licenseClass === "2cop"
        ? "businesses-2cop"
        : "businesses";
  const licenseGuide = licenseBuyerGuide(listing);
  const countySummary = countyMarketSummary(listing, county);
  const marketHub = categoryMarketHub(listing);
  const marketObservation = await getOrStartMarketListingObservation(listing);

  const countyLicenseListings = standaloneListings.filter(
    (candidate) =>
      candidate.county === listing.county &&
      candidate.type === listing.licenseType,
  );
  const countyLicensePrices = countyLicenseListings
    .map((candidate) => candidate.price)
    .filter((price): price is number => typeof price === "number" && Number.isFinite(price) && price > 0);
  const countyLicenseMedianAsk = median(countyLicensePrices);

  const countyBusinessPackages = marketRecords.filter(
    (candidate) =>
      candidate.county === listing.county &&
      candidate.licenseType === listing.licenseType,
  );

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      url: `${siteUrl}${canonicalPath}`,
      description: marketViewDescription(listing),
      about: {
        "@type": "Thing",
        name: `${listing.businessCategory} market information in ${listing.county}`,
      },
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
        {
          "@type": "ListItem",
          position: 2,
          name: "Business Market Data",
          item: `${siteUrl}/businesses-with-quota-licenses`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: title,
          item: `${siteUrl}${canonicalPath}`,
        },
      ],
    },
  ];

  return (
    <main className="business-market-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
        }}
      />

      <div className="business-market-header">
        <FormsSiteHeader />
      </div>

      <section className="business-market-hero">
        <div className="business-market-shell">
          <div className="business-market-breadcrumbs">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/businesses-with-quota-licenses">Business Market Data</Link>
            <span>›</span>
            <strong>Market View</strong>
          </div>

          <div className="business-market-hero-grid">
            <div className="business-market-hero-copy-block">
              <span className="business-market-eyebrow">FLLM MARKET VIEW</span>
              <h1>{listing.county} {listing.businessCategory} + {listing.licenseType}</h1>
              <p className="business-market-hero-copy">
                Review this {listing.county} {listing.businessCategory.toLowerCase()} opportunity with a {listing.licenseType} liquor license, including the advertised business + license package price and FLLM&apos;s independent license-market intelligence.
              </p>

              <div className="business-market-hero-stats">
                <div className="business-market-category-stat">
                  <span>Business Category</span>
                  <strong className={`business-market-category-badge business-market-category-badge--${listing.businessCategory.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`}>
                    {listing.businessCategory}
                  </strong>
                </div>
                <div>
                  <span>County Location</span>
                  <strong>{listing.county}</strong>
                </div>
                <div>
                  <span>Business + License Price</span>
                  <strong className="business-market-price-gold">{listing.packagePrice}</strong>
                </div>
                <div className="business-market-bottom-stat">
                  <span>Liquor License Type</span>
                  <strong className={listing.licenseType === "4COP Quota" ? "business-market-green-license" : undefined}>{listing.licenseType}</strong>
                </div>
                <div className="business-market-bottom-stat business-market-tooltip-card" tabIndex={0} aria-describedby="market-revenue-help">
                  <span>Gross Annual Revenue</span>
                  <span id="market-revenue-help" className="business-market-card-tooltip" role="tooltip">Gross revenue as stated in the source advertisement, where available. Buyer due diligence is recommended.</span>
                  <strong>{typeof listing.grossRevenueNumber === "number" && listing.grossRevenueNumber > 0 ? new Intl.NumberFormat("en-US", {style:"currency",currency:"USD",maximumFractionDigits:0}).format(listing.grossRevenueNumber) : "Not Disclosed"}</strong>
                </div>
                <div className="business-market-bottom-stat business-market-tooltip-card" tabIndex={0} aria-describedby="market-earnings-help">
                  <span>{typeof listing.sdeNumber === "number" && listing.sdeNumber > 0 ? "SDE / Cash Flow" : typeof listing.ebitdaNumber === "number" && listing.ebitdaNumber > 0 ? "EBITDA" : "SDE / Cash Flow"}</span>
                  <span id="market-earnings-help" className="business-market-card-tooltip" role="tooltip">SDE, Cash Flow, or EBITDA as stated in the advertisement. The original financial label is retained; buyer due diligence is recommended.</span>
                  <strong className="business-market-earnings-cyan">{typeof listing.sdeNumber === "number" && listing.sdeNumber > 0 ? new Intl.NumberFormat("en-US", {style:"currency",currency:"USD",maximumFractionDigits:0}).format(listing.sdeNumber) : typeof listing.ebitdaNumber === "number" && listing.ebitdaNumber > 0 ? new Intl.NumberFormat("en-US", {style:"currency",currency:"USD",maximumFractionDigits:0}).format(listing.ebitdaNumber) : "Not Disclosed"}</strong>
                </div>
              </div>
              <p className="business-market-financial-disclosure">Financial information is taken from publicly advertised listings and has not been independently audited by FLLM. Buyers should conduct their own due diligence.</p>

              <section className="business-market-valuation-strip business-market-tooltip-card" tabIndex={0} aria-label="FLLM estimated license value" aria-describedby="market-valuation-help">
                {listing.licenseClass === "quota" ? (
                  <>
                    <div className="business-market-valuation-primary">
                      <span>FLLM Est. License Value</span>
                      <span id="market-valuation-help" className="business-market-card-tooltip" role="tooltip">FLLM county market-based estimate of the quota liquor-license component, not a formal appraisal. It does not mean the license is available for separate purchase. The advertised Business + License Price is for the overall package.</span>
                      <strong>{moneyValue(listing.marketMedianLicenseValue || listing.allocatedLicenseValue) > 0 ? money(moneyValue(listing.marketMedianLicenseValue || listing.allocatedLicenseValue)) : "Estimate Unavailable"}</strong>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="business-market-valuation-primary">
                      <span>License Classification</span>
                      <strong>{listing.licenseType}</strong>
                    </div>
                    <div className="business-market-valuation-context">
                      <span>Location-specific license classification</span>
                      <small>No separate transferable quota-license value implied</small>
                    </div>
                  </>
                )}
              </section>

              <div className="business-market-hero-actions">
                {listing.listingReference !== "FLLM-MKT-Q-001" ? (
                  <a className="business-market-primary" href="#specific-market-inquiry">
                    Request Information
                  </a>
                ) : null}
                <Link className="business-market-secondary" href={listing.countyHref}>
                  Explore {listing.county}
                </Link>
              </div>
              <p className="business-market-hero-disclosure">Independent FLLM Market View only. FLLM does not represent the business, seller, or broker.</p>
            </div>

            <BusinessMarketHeroMap
              county={listing.county}
              primaryMarkets={primaryMarkets}
              title={title}
              packagePrice={listing.packagePrice}
              licenseType={listing.licenseType}
              businessType={listing.businessCategory}
              otherListingsCount={otherCountyListingsCount}
            />
          </div>
        </div>
      </section>

      <div className="business-market-interactive-map">
        <BusinessPackageHeatMap
          rows={mapRows}
          licenseType={listing.licenseType}
          listingType={mapListingType}
          businessTypeLabel={listing.businessCategory}
          selectedCounty={listing.county}
          selectedListingTitle={title}
          selectedPackagePrice={listing.packagePrice}
          selectedLicenseValue={listing.allocatedLicenseValue}
          selectedListingReference={listing.listingReference}
        />
      </div>

      <section className="business-market-content">
        <div className="business-market-shell">
          <div className="business-market-grid business-market-grid--martin-horizontal">
            <div className="business-market-main">
              <section className="business-market-panel business-market-license-panel">
                <div className="business-market-section-heading">
                  <span>License Type Explained</span>
                  <h2>{licenseGuide.heading}</h2>
                </div>
                <p>{licenseGuide.copy}</p>
                <BusinessMarketLicenseFeatureCards listing={listing} />
                <div className="business-market-license-links">
                  {listing.licenseType === "4COP Quota" ? (
                    <Link href="/license-types/4cop-quota">4COP Quota guide ›</Link>
                  ) : listing.licenseType === "3PS Quota / Package Store" ? (
                    <Link href="/license-types/3ps-package-store">3PS Quota guide ›</Link>
                  ) : listing.licenseType === "4COP SFS/SRX" ? (
                    <Link href="/license-types/4cop-sfs-restaurant">4COP SFS / SRX guide ›</Link>
                  ) : (
                    <Link href="/license-types/2cop-beer-wine">2COP Beer & Wine guide ›</Link>
                  )}
                  <Link href="/resources/florida-liquor-license-types">Compare Florida license types ›</Link>
                  {listing.licenseClass === "quota" ? <Link href={listing.countyHref}>Explore standalone {listing.licenseType} licenses in {listing.county} ›</Link> : null}
                </div>
              </section>

              <nav className="business-market-compact-resources" aria-label="Additional liquor license resources">
                <Link href="/transaction-services">Transaction resources ›</Link>
                <Link href="/florida-liquor-license-appraisal">Liquor-license appraisal ›</Link>
                <Link href="/resources/application-center">DBPR / ABT application center ›</Link>
                <Link href="/florida-liquor-license-value">License-value data ›</Link>
              </nav>
            </div>

            <aside className="business-market-sidebar" id="buyer-alert">
              <MarketBuyerLeadForm
                listingReference={listing.listingReference}
                listingTitle={title}
                county={listing.county}
                businessType={listing.businessCategory}
                licenseType={listing.licenseType}
                askingPrice={listing.packagePrice}
                listingUrl={canonicalPath}
                horizontalMarketView
              />

            </aside>
          </div>
          <div className="business-market-service-grid" aria-label="FLLM acquisition support services">
            <article className="business-market-service-card">
              <div className="business-market-service-media business-market-service-media--appraisal">
                <Image src="/assets/fllm-formal-appraisal-preview-v1.webp" alt="Blue FLLM liquor license appraisal report binder" width={390} height={200} />
              </div>
              <span>LIQUOR LICENSE APPRAISAL</span>
              <h3>Liquor License Appraisal</h3>
              <p>Explore FLLM appraisal services for the liquor-license component of a business acquisition, financing, or transfer.</p>
              <Link href="/florida-liquor-license-appraisal" className="fllm-ui-official-gold-button">Explore Appraisal Service →</Link>
            </article>
            <article className="business-market-service-card">
              <div className="business-market-service-media business-market-service-media--sba">
                <Image src="/assets/sba-mark-red-accent.svg" alt="SBA red-accent logo" width={150} height={112} />
                <strong className="business-market-service-sba-agency">U.S. Small Business<br/>Administration</strong>
              </div>
              <span>BUSINESS ACQUISITION FINANCING</span>
              <h3>Business Acquisition Financing</h3>
              <p>Explore SBA 7(a) and other financing considerations for purchasing a Florida business involving a liquor license.</p>
              <Link href="/sba-7a-liquor-license-business-financing" className="fllm-ui-official-gold-button">Explore SBA Financing →</Link>
            </article>
            <article className="business-market-service-card">
              <div className="business-market-service-media business-market-service-media--ira">
                <svg viewBox="0 0 220 124" role="img" aria-label="Retirement account portfolio and transfer illustration">
                  <defs><linearGradient id="iraCardGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ffdd78"/><stop offset="100%" stopColor="#d99203"/></linearGradient></defs>
                  <rect x="32" y="23" width="104" height="78" rx="8" fill="#102e47" stroke="url(#iraCardGold)" strokeWidth="2.5"/>
                  <path d="M45 42h78M48 54h47M48 65h34" fill="none" stroke="#78dfff" strokeWidth="3" strokeLinecap="round"/>
                  <circle cx="84" cy="83" r="10" fill="#103f4b" stroke="#59e5a0" strokeWidth="2"/>
                  <path d="m79 83 4 4 7-9" fill="none" stroke="#59e5a0" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M145 47a28 28 0 0 1 26 25" fill="none" stroke="#ffbf24" strokeWidth="4" strokeLinecap="round"/>
                  <path d="m164 64 8 9 5-12" fill="none" stroke="#ffbf24" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M177 87a28 28 0 0 1-27 24" fill="none" stroke="#68d9ff" strokeWidth="4" strokeLinecap="round"/>
                  <path d="m157 101-8 11-5-12" fill="none" stroke="#68d9ff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  <text x="105" y="16" fill="#ffcf60" fontSize="13" fontWeight="800" textAnchor="middle">RETIREMENT ACCOUNT</text>
                </svg>
              </div>
              <span>RETIREMENT ACCOUNT SERVICES</span>
              <h3>Self-Directed IRA Assistance</h3>
              <p>Explore using a Self-Directed IRA to buy a business or Florida quota liquor license. FLLM helps arrange Self-Directed IRA account setup and rollover paperwork.</p>
              <Link href="/self-directed-ira-liquor-license-lending#ira-setup-assistance" className="fllm-ui-official-gold-button">Explore IRA Assistance →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="business-market-note">
        <div className="business-market-shell">
          FLLM Market View information is provided for market research. Asking price,
          availability, license status, and transaction terms should be independently verified.
        </div>
      </section>

      <footer className="business-market-footer">
        <div className="business-market-shell">
          <div>
            <Link href="/" aria-label="Florida Liquor License Market home">
              <Image
                src="/assets/brand-sharp.svg"
                alt="Florida Liquor License Market"
                width={130}
                height={53}
              />
            </Link>
            <span>© Florida Liquor License Market</span>
          </div>
          <nav aria-label="Footer navigation">
            <Link href="/listings">Standalone Licenses</Link>
            <Link href="/businesses-with-quota-licenses">Business Market Data</Link>
            <Link href="/counties">County Markets</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
