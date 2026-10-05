import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import BusinessQuotaListingCard from "@/components/BusinessQuotaListingCard";
import { FllmPageShell, FllmSectionHeading } from "@/components/FllmDesignSystem";
import {
  business2copListings,
  businessQuotaListings,
  businessSfsListings,
} from "@/lib/business-quota-listings";
import { withMarketLicenseValues } from "@/lib/business-quota-market-values";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";

import "../../fllm-official-template.css";
import "../../fllm-design-system.css";
import "../../listings/listings-premium.css";
import "../../businesses-with-quota-licenses/business-inventory.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";

const markets = {
  miami: {
    label: "Miami",
    title: "Miami Nightclubs for Sale",
    county: "Miami-Dade County",
    intro: "Browse nightclub and nightlife business opportunities in Miami and Miami-Dade County, including Brickell, Downtown Miami, Miami Beach and surrounding nightlife districts.",
  },
  broward: {
    label: "Broward",
    title: "Broward Nightclubs for Sale",
    county: "Broward County",
    intro: "Browse nightclub and nightlife business opportunities in Broward County, including Fort Lauderdale, Hollywood, Pompano Beach and surrounding South Florida nightlife markets.",
  },
  orlando: {
    label: "Orlando",
    title: "Orlando Nightclubs for Sale",
    county: "Orange County",
    intro: "Browse nightclub and nightlife business opportunities in Orlando and Orange County, with liquor-license structure and county market context kept visible.",
  },
  tampa: {
    label: "Tampa",
    title: "Tampa Nightclubs for Sale",
    county: "Hillsborough County",
    intro: "Browse nightclub and nightlife business opportunities in Tampa and Hillsborough County, with FLLM liquor-license market intelligence alongside the business-for-sale market.",
  },
} as const;

type MarketSlug = keyof typeof markets;

export function generateStaticParams() {
  return Object.keys(markets).map((market) => ({ market }));
}

export async function generateMetadata({ params }: { params: Promise<{ market: string }> }): Promise<Metadata> {
  const { market } = await params;
  const definition = markets[market as MarketSlug];
  if (!definition) return {};
  const canonical = `${siteUrl}/nightclubs-for-sale/${market}`;
  return {
    title: `${definition.title} | Florida Nightclub Market | FLLM`,
    description: `${definition.title}. Compare current nightlife opportunities, county market signals and liquor-license structure with FLLM.`,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url: canonical,
      title: `${definition.title} | FLLM`,
      description: definition.intro,
      siteName: "Florida Liquor License Market",
    },
  };
}

export default async function NightclubMarketPage({ params }: { params: Promise<{ market: string }> }) {
  const { market } = await params;
  const definition = markets[market as MarketSlug];
  if (!definition) notFound();

  const standaloneListings = getVisibleAvailableMarketplaceListings(await getMarketplaceListings());
  const allNightclubs = [
    ...withMarketLicenseValues(businessQuotaListings, standaloneListings),
    ...withMarketLicenseValues(businessSfsListings, standaloneListings),
    ...withMarketLicenseValues(business2copListings, standaloneListings),
  ].filter((listing) => listing.businessCategory === "Nightclub");

  const localListings = allNightclubs.filter((listing) => listing.county === definition.county);
  const prices = localListings.map((listing) => listing.packagePriceNumber).filter((value) => value > 0).sort((a, b) => a - b);
  const medianPrice = prices.length
    ? prices.length % 2
      ? prices[Math.floor(prices.length / 2)]
      : Math.round((prices[prices.length / 2 - 1] + prices[prices.length / 2]) / 2)
    : null;
  const money = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

  const canonical = `${siteUrl}/nightclubs-for-sale/${market}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: definition.title,
    url: canonical,
    description: definition.intro,
    isPartOf: { "@type": "WebSite", name: "Florida Liquor License Market", url: siteUrl },
  };

  return (
    <FllmPageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section
        className="fllm-template-hero"
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(2,16,29,.96), rgba(2,16,29,.75), rgba(2,16,29,.18)), url("/assets/nightclub-hero-final.webp")',
          backgroundSize: "cover",
          backgroundPosition: "center right",
        }}
      >
        <div className="fllm-template-shell">
          <div className="fllm-ui-breadcrumbs">
            <Link href="/">Home</Link><span>›</span>
            <Link href="/nightclubs-for-sale-with-liquor-licenses">Florida Nightclubs for Sale</Link><span>›</span>
            <strong>{definition.label}</strong>
          </div>
          <span className="fllm-template-eyebrow">{definition.county} Nightclub Market</span>
          <h1 className="fllm-template-hero-title">{definition.title}</h1>
          <p className="fllm-template-hero-copy">{definition.intro}</p>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--deep">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Local Market Snapshot"
            title={`${definition.label} nightclub-for-sale market signals`}
            copy={<p>FLLM separates observed business asking prices from the liquor-license component so buyers can compare the operating business and license market independently.</p>}
            align="center"
          />
          <div className="fllm-template-card-grid">
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker">Current Market Views</span>
              <strong className="fllm-template-card-title">{localListings.length}</strong>
              <p className="fllm-template-card-copy">Published nightclub Market View{localListings.length === 1 ? "" : "s"} currently classified in {definition.county}.</p>
            </article>
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker">Median Asking Price</span>
              <strong className="fllm-template-card-title">{medianPrice ? money(medianPrice) : "No current disclosed median"}</strong>
              <p className="fllm-template-card-copy">Observed business-package asking price among current FLLM nightclub Market Views with disclosed prices.</p>
            </article>
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker">License Intelligence</span>
              <strong className="fllm-template-card-title">4COP + other classes</strong>
              <p className="fllm-template-card-copy">FLLM identifies whether a nightlife opportunity uses a transferable quota license, SFS/SRX structure or beer-and-wine license.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="fllm-template-section">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Current Inventory"
            title={`${definition.title} currently tracked by FLLM`}
            copy={<p>These records are categorized as Nightclub in FLLM&apos;s business market inventory; the liquor-license class is displayed separately.</p>}
            align="center"
          />
          {localListings.length ? (
            <div className="business-quota-grid">
              {localListings.map((listing) => <BusinessQuotaListingCard key={listing.listingReference} listing={listing} />)}
            </div>
          ) : (
            <div className="fllm-ui-panel">
              <strong>No current published nightclub Market Views in {definition.county}.</strong>
              <p>
                FLLM keeps this market page indexed as a local nightclub market resource and will populate it as qualifying
                nightclub Market Views are added.
              </p>
            </div>
          )}
          <div className="fllm-ui-actions" style={{ marginTop: "1.5rem" }}>
            <Link className="fllm-template-button" href="/nightclubs-for-sale-with-liquor-licenses">All Florida Nightclubs for Sale</Link>
            <Link className="fllm-template-button fllm-template-button--outline" href="/businesses-with-quota-licenses/nightclubs">4COP Nightclub Market</Link>
          </div>
        </div>
      </section>
    </FllmPageShell>
  );
}
