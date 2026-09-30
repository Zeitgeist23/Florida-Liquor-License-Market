import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import BusinessPackageHeatMap, { type BusinessPackageHeatMapRow } from "@/components/BusinessPackageHeatMap";
import BusinessMarketHeroMap from "@/components/BusinessMarketHeroMap";
import FormsSiteHeader from "@/components/FormsSiteHeader";
import MarketBuyerLeadForm from "@/components/MarketBuyerLeadForm";
import { ListingSidebarLoanCalculator } from "@/components/ListingBrokerInquiryForm";
import { countySlug, floridaCounties } from "@/data/florida-counties";
import { withMarketLicenseValues } from "@/lib/business-quota-market-values";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";
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
                intelligence. It is not a broker listing and does not state or imply that FLLM
                represents the business, seller, broker, or source advertisement.
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
            <div className="business-market-main" />

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
