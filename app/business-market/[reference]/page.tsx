import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import BusinessPackageHeatMap, { type BusinessPackageHeatMapRow } from "@/components/BusinessPackageHeatMap";
import BusinessMarketHeroMap from "@/components/BusinessMarketHeroMap";
import BusinessMarketLicenseFeatureCards from "@/components/BusinessMarketLicenseFeatureCards";
import BusinessMarketplaceRoleDisclosure from "@/components/BusinessMarketplaceRoleDisclosure";
import FormsSiteHeader from "@/components/FormsSiteHeader";
import MarketBuyerLeadForm from "@/components/MarketBuyerLeadForm";
import ObservedDaysOnMarket from "@/components/ObservedDaysOnMarket";
import { ListingSidebarLoanCalculator } from "@/components/ListingBrokerInquiryForm";
import { countySlug, floridaCounties } from "@/data/florida-counties";
import { withMarketLicenseValues } from "@/lib/business-quota-market-values";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";
import { getOrStartMarketListingObservation } from "@/lib/market-listing-observation";
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
  return `${listing.county} ${listing.businessCategory} Market`;
}

function marketViewDescription(listing: BusinessQuotaListing) {
  return `FLLM Market View of observed ${listing.businessCategory.toLowerCase()} and liquor-license market activity in ${listing.county}. Advertised asking price: ${listing.packagePrice}. Liquor-license type: ${listing.licenseType}. Request FLLM information about this license type and county market.`;
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
        label: "Florida restaurants with 2COP beer and wine licenses for sale",
      };
    }
    if (listing.licenseType === "4COP SFS/SRX") {
      return {
        href: "/restaurants-with-liquor-licenses#sfs-restaurant-inventory",
        label: "Florida restaurants with 4COP SFS / SRX full-liquor licenses for sale",
      };
    }
    if (listing.licenseType === "4COP Quota") {
      return {
        href: "/restaurants-with-liquor-licenses#quota-restaurant-inventory",
        label: "Florida restaurants with 4COP quota liquor licenses for sale",
      };
    }
    return {
      href: "/restaurants-with-liquor-licenses",
      label: "Florida restaurants for sale with liquor licenses",
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
      label: "Florida nightclubs with full liquor for sale",
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
  const listing =
    withMarketLicenseValues([rawListing], standaloneListings)[0] ?? rawListing;

  const county = countyFor(listing);
  const canonicalPath = businessMarketRecordHref(listing);
  const title = marketViewTitle(listing);
  const primaryMarkets = county?.primaryCities ?? [];
  const otherCountyListingsCount = marketRecords.filter(
    (candidate) =>
      candidate.county === listing.county &&
      candidate.listingReference !== listing.listingReference,
  ).length;
  const quotaLicenseFinancingAmount =
    listing.licenseClass === "quota" ? moneyValue(listing.allocatedLicenseValue) : 0;

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
              <h1>{title}</h1>
              <p className="business-market-hero-copy">
                This Market View presents observed business-and-license market activity using
                limited factual fields, together with FLLM liquor-license and county-market
                intelligence. It is not an FLLM Featured Broker Listing and does not state or imply
                that FLLM represents the business, seller, or listing broker.
              </p>

              <div className="business-market-hero-stats">
                <div>
                  <span>Business Category</span>
                  <strong>{listing.businessCategory}</strong>
                </div>
                <div>
                  <span>County Location</span>
                  <strong>{listing.county}</strong>
                </div>
                <div>
                  <span>Advertised Asking Price</span>
                  <strong>{listing.packagePrice}</strong>
                </div>
                <div>
                  <span>Liquor License Type</span>
                  <strong>{listing.licenseType}</strong>
                </div>
                <div>
                  <span>Observed Days on Market</span>
                  <strong>
                    {marketObservation ? (
                      <ObservedDaysOnMarket
                        firstSeenAt={marketObservation.firstSeenAt}
                        removedAt={marketObservation.removedAt}
                        status={marketObservation.status}
                      />
                    ) : (
                      "Tracking started"
                    )}
                  </strong>
                  <small className="business-market-observation-note">
                    FLLM observation period; not the broker&apos;s original listing date.
                  </small>
                </div>
              </div>

              <div className="business-market-hero-actions">
                <a className="business-market-primary" href="#license-information">
                  Request License Information
                </a>
                <Link className="business-market-secondary" href={listing.countyHref}>
                  Explore {listing.county}
                </Link>
              </div>
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
          <div className="business-market-grid">
            <div className="business-market-main">
              <section className="business-market-panel">
                <div className="business-market-section-heading">
                  <span>County License Market Data</span>
                  <h2>{listing.county} · {listing.licenseType}</h2>
                </div>
                <p>
                  FLLM separates the transferable liquor-license market from operating-business package
                  advertisements so buyers and sellers can evaluate the license component on its own.
                </p>

                <div className="business-market-fact-grid">
                  <div>
                    <span>Median Disclosed License Ask</span>
                    <strong>{money(countyLicenseMedianAsk)}</strong>
                  </div>
                  <div>
                    <span>Standalone Licenses on Market</span>
                    <strong>{countyLicenseListings.length}</strong>
                  </div>
                  <div>
                    <span>Business + {listing.licenseType} Packages</span>
                    <strong>{countyBusinessPackages.length}</strong>
                  </div>
                  <div>
                    <span>Primary County Markets</span>
                    <strong>{countySummary.cities}</strong>
                  </div>
                </div>

                <BusinessMarketplaceRoleDisclosure />

                <div className="business-market-disclosure">
                  <strong>Market-data disclosure</strong>
                  <p>
                    The business-package counts shown on FLLM Market View pages may include opportunities
                    observed on third-party public marketplaces. Those businesses are not FLLM-listed businesses
                    unless a page expressly identifies an authorized FLLM listing. FLLM does not participate in,
                    share, or receive real-estate or business-broker commissions. FLLM provides liquor-license market
                    information, advertising, valuation, financing, and transaction-support resources.
                  </p>
                </div>

                <div className="business-market-license-links">
                  <Link href={marketHub.href}>{marketHub.label} ›</Link>
                  <Link href={listing.countyHref}>Open {listing.county} license market data ›</Link>
                  <Link href="/counties">Compare all Florida counties ›</Link>
                </div>
              </section>

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
                </div>
              </section>

              <section className="business-market-panel">
                <div className="business-market-section-heading">
                  <span>Buyer Due Diligence</span>
                  <h2>What buyers should verify before relying on this market opportunity</h2>
                </div>
                <div className="business-market-checklist">
                  {licenseGuide.buyerPoints.map((point) => (
                    <div key={point}><span>✓</span><p>{point}</p></div>
                  ))}
                </div>
                <div className="business-market-license-links">
                  <Link href="/transaction-services">FLLM transaction resources ›</Link>
                  <Link href="/florida-liquor-license-appraisal">Liquor-license appraisal ›</Link>
                  <Link href="/resources/application-center">DBPR / ABT application center ›</Link>
                </div>
              </section>

              <section className="business-market-panel">
                <div className="business-market-section-heading">
                  <span>Seller & Broker Considerations</span>
                  <h2>How to present the liquor-license component clearly</h2>
                </div>
                <div className="business-market-checklist">
                  {licenseGuide.sellerPoints.map((point) => (
                    <div key={point}><span>✓</span><p>{point}</p></div>
                  ))}
                </div>
                <div className="business-market-license-links">
                  <Link href="/brokers/list-your-license">List with FLLM ›</Link>
                  <Link href="/florida-liquor-license-value">Review FLLM license-value data ›</Link>
                </div>
              </section>
            </div>

            <aside className="business-market-sidebar" id="license-information">
              <MarketBuyerLeadForm
                listingReference={listing.listingReference}
                listingTitle={title}
                county={listing.county}
                businessType={listing.businessCategory}
                licenseType={listing.licenseType}
                askingPrice={listing.packagePrice}
                listingUrl={canonicalPath}
              />

              {listing.licenseClass === "quota" ? (
                <>
                  <div className="business-market-side-card">
                    <span>License Financing</span>
                    <strong>Finance the License Component</strong>
                    <p>
                      Request FLLM information about financing a transferable quota liquor
                      license. Financing is separate from the advertised business asking price
                      and is subject to lender underwriting, collateral review, transaction
                      structure, and approval.
                    </p>
                    <Link className="business-market-primary" href="/financing#request-financing">
                      Request License Financing
                    </Link>
                  </div>

                  <ListingSidebarLoanCalculator
                    initialPurchasePrice={quotaLicenseFinancingAmount}
                    initialDownPayment={
                      quotaLicenseFinancingAmount > 0
                        ? Math.round(quotaLicenseFinancingAmount * 0.2)
                        : 0
                    }
                    mode="license"
                  />
                </>
              ) : null}

              <div className="business-market-side-card">
                <span>Market View Notice</span>
                <strong>FLLM provides liquor-license market information.</strong>
                <p>
                  This page does not imply that FLLM represents the business, seller, broker,
                  or any third-party advertisement.
                </p>
              </div>
            </aside>
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
