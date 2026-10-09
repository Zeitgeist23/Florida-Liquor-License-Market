import type { Metadata } from "next";
import Link from "next/link";

import BusinessPackageLocalMarkets from "@/components/BusinessPackageLocalMarkets";
import BusinessQuotaListingCard from "@/components/BusinessQuotaListingCard";
import {
  FllmButton,
  FllmCard,
  FllmCardGrid,
  FllmPageShell,
  FllmSectionHeading,
} from "@/components/FllmDesignSystem";
import {
  BUSINESS_LISTING_DISPLAY_LIMIT,
  business2copListings,
  businessQuotaListings,
  businessSfsListings,
} from "@/lib/business-quota-listings";
import { withMarketLicenseValues } from "@/lib/business-quota-market-values";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";

import "../fllm-official-template.css";
import "../fllm-design-system.css";
import "../listings/listings-premium.css";
import "../businesses-with-quota-licenses/business-inventory.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/nightclubs-for-sale-with-liquor-licenses`;

const money = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

const median = (values: number[]) => {
  const clean = values.filter((value) => Number.isFinite(value) && value > 0).sort((a, b) => a - b);
  if (!clean.length) return null;
  const middle = Math.floor(clean.length / 2);
  return clean.length % 2 ? clean[middle] : Math.round((clean[middle - 1] + clean[middle]) / 2);
};

export const metadata: Metadata = {
  title: "Florida Nightclubs for Sale | Nightclubs & Clubs for Sale in Florida | FLLM",
  description:
    "Browse Florida nightclubs for sale by county and market. Compare current nightclub opportunities, asking-price signals, 4COP/full-liquor structures and FLLM liquor-license market intelligence.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  keywords: [
    "Florida nightclubs for sale",
    "Florida nightclub for sale",
    "nightclubs for sale Florida",
    "clubs for sale Florida",
    "buy a nightclub in Florida",
    "Miami nightclub for sale",
    "Broward nightclub for sale",
    "Orlando nightclub for sale",
    "Tampa nightclub for sale",
    "Florida nightclubs with liquor licenses for sale",
    "Florida nightclub 4COP quota",
  ],
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Nightclubs for Sale | FLLM",
    description:
      "Florida nightclub market inventory and market intelligence, with liquor-license structure and county-level context kept visible.",
    siteName: "Florida Liquor License Market",
  },
};

export default async function FloridaNightclubsForSaleWithLiquorLicensesPage() {
  const standaloneListings = getVisibleAvailableMarketplaceListings(await getMarketplaceListings());

  const quotaNightclubs = withMarketLicenseValues(businessQuotaListings, standaloneListings)
    .filter((listing) => listing.businessCategory === "Nightclub");
  const sfsNightclubs = withMarketLicenseValues(businessSfsListings, standaloneListings)
    .filter((listing) => listing.businessCategory === "Nightclub");
  const twoCopNightclubs = withMarketLicenseValues(business2copListings, standaloneListings)
    .filter((listing) => listing.businessCategory === "Nightclub");

  const allNightclubs = [...quotaNightclubs, ...sfsNightclubs, ...twoCopNightclubs];
  const displayedNightclubs = allNightclubs.slice(0, BUSINESS_LISTING_DISPLAY_LIMIT);
  const packagePrices = allNightclubs.map((listing) => listing.packagePriceNumber).filter((value) => value > 0);
  const medianPackagePrice = median(packagePrices);
  const lowPackagePrice = packagePrices.length ? Math.min(...packagePrices) : null;
  const highPackagePrice = packagePrices.length ? Math.max(...packagePrices) : null;
  const countyCounts = [...new Set(allNightclubs.map((listing) => listing.county))].length;

  const marketLinks = [
    { label: "Miami Nightclubs for Sale", href: "/nightclubs-for-sale/miami", note: "Miami-Dade County nightlife market" },
    { label: "Broward Nightclubs for Sale", href: "/nightclubs-for-sale/broward", note: "Fort Lauderdale, Hollywood and Broward County" },
    { label: "Orlando Nightclubs for Sale", href: "/nightclubs-for-sale/orlando", note: "Orange County and Orlando nightlife market" },
    { label: "Tampa Nightclubs for Sale", href: "/nightclubs-for-sale/tampa", note: "Hillsborough County and Tampa nightlife market" },
  ];

  const faqs = [
    {
      question: "Where can I find nightclubs for sale in Florida?",
      answer:
        "FLLM tracks nightclub business opportunities by Florida market and keeps the liquor-license structure visible. Buyers can review statewide nightclub inventory and dedicated Miami, Broward, Orlando and Tampa market pages.",
    },
    {
      question: "How much does a Florida nightclub cost to buy?",
      answer:
        "Nightclub asking prices vary by location, revenue, real estate, lease terms, equipment, operating history and liquor-license structure. FLLM publishes observed asking-price signals from its current nightclub market inventory rather than treating every transaction as directly comparable.",
    },
    {
      question: "Do Florida nightclubs need a 4COP quota liquor license?",
      answer:
        "A nightclub that wants to sell beer, wine and distilled spirits generally needs full-liquor privileges. For a conventional nightclub, that commonly means a transferable county-specific 4COP quota license. A beer-and-wine-only nightclub may use an appropriate beer-and-wine license, while a qualifying restaurant-nightlife concept may operate under a different full-liquor license structure.",
    },
    {
      question: "What does full liquor mean in a Florida nightclub listing?",
      answer:
        "Full liquor is marketplace shorthand for privileges that include distilled spirits as well as beer and wine. It is not itself a Florida license-series name, so buyers should verify the actual license class included with the business.",
    },
    {
      question: "Does FLLM broker the operating nightclub business?",
      answer:
        "No. FLLM is not a Florida business broker and does not broker operating nightclubs. FLLM may advertise third-party business listings and provides liquor-license market data, valuation and transaction resources. FLLM brokerage is limited to standalone transferable 4COP Quota and 3PS liquor licenses under a written license-brokerage agreement.",
    },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Florida Nightclubs for Sale",
      url: canonicalUrl,
      description:
        "Florida nightclubs for sale organized by market, asking-price signals and actual liquor-license structure.",
      isPartOf: { "@type": "WebSite", name: "Florida Liquor License Market", url: siteUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Florida Nightclubs for Sale", item: canonicalUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Florida nightclubs for sale",
      numberOfItems: displayedNightclubs.length,
      itemListElement: displayedNightclubs.map((listing, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: listing.title,
        url: `${siteUrl}${listing.href}`,
      })),
    },
  ];

  return (
    <FllmPageShell className="restaurants-with-liquor-licenses-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section
        className="fllm-template-hero"
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(2, 16, 29, 0.96) 0%, rgba(2, 16, 29, 0.88) 38%, rgba(2, 16, 29, 0.60) 56%, rgba(2, 16, 29, 0.18) 76%, rgba(2, 16, 29, 0.05) 100%), url("/assets/nightclub-hero-final.webp")',
          backgroundSize: "cover",
          backgroundPosition: "center right",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="fllm-template-shell">
          <div className="fllm-ui-breadcrumbs">
            <Link href="/">Home</Link><span>›</span><strong>Florida Nightclubs for Sale</strong>
          </div>
          <span className="fllm-template-eyebrow">Florida Nightclub Market</span>
          <h1 className="fllm-template-hero-title">Florida Nightclubs for Sale</h1>
          <p className="fllm-template-hero-copy">
            Browse Florida nightclubs and nightlife businesses for sale by market, county and asking-price signal.
            FLLM adds a layer the general business marketplaces do not: the actual liquor-license structure, including
            transferable 4COP quota licenses, location-specific full-liquor privileges and beer-and-wine licenses.
          </p>
          <div className="fllm-ui-actions">
            <Link className="btn btn-gold fllm-ui-official-gold-button" href="#current-nightclub-market">
              Browse Florida Nightclubs for Sale
            </Link>
            <FllmButton href="/businesses-with-quota-licenses/nightclubs" variant="outline">
              Nightclubs With 4COP Quota Licenses
            </FllmButton>
          </div>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--deep">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Florida Nightclub Market Intelligence"
            title="Current nightclub-for-sale signals tracked by FLLM"
            copy={<p>These figures summarize FLLM&apos;s current published nightclub Market Views and update as the observed inventory changes.</p>}
            align="center"
          />
          <div className="fllm-template-card-grid">
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker" style={{ textAlign: "center", display: "block" }}>Observed Inventory</span>
              <strong className="fllm-template-card-title" style={{ textAlign: "center", display: "block" }}>{allNightclubs.length}</strong>
              <p className="fllm-template-card-copy">Published Florida nightclub Market View{allNightclubs.length === 1 ? "" : "s"} currently tracked by FLLM.</p>
            </article>
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker" style={{ textAlign: "center", display: "block" }}>Markets Represented</span>
              <strong className="fllm-template-card-title" style={{ textAlign: "center", display: "block" }}>{countyCounts}</strong>
              <p className="fllm-template-card-copy">Florida count{countyCounts === 1 ? "y" : "ies"} represented in current nightclub inventory.</p>
            </article>
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker" style={{ textAlign: "center", display: "block" }}>Median Asking Price</span>
              <strong className="fllm-template-card-title" style={{ textAlign: "center", display: "block" }}>{medianPackagePrice ? money(medianPackagePrice) : "N/A"}</strong>
              <p className="fllm-template-card-copy">Median observed package asking price among current FLLM nightclub Market Views with disclosed prices.</p>
            </article>
          </div>
          <div className="fllm-template-disclosure" style={{ marginTop: "1rem" }}>
            <strong>Observed range:</strong>{" "}
            {lowPackagePrice && highPackagePrice ? `${money(lowPackagePrice)} to ${money(highPackagePrice)}` : "No current disclosed range"}.
            Business asking prices can include goodwill, leasehold rights, equipment, real estate and other assets. They are not standalone liquor-license values.
          </div>
        </div>
      </section>

      <section className="fllm-template-section">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Florida Nightclub Markets"
            title="Search nightclub opportunities by major Florida market"
            copy={<p>These market pages broaden FLLM&apos;s nightclub coverage beyond liquor-license-only search terms while preserving FLLM&apos;s license intelligence.</p>}
            align="center"
          />
          <div className="fllm-template-card-grid">
            {marketLinks.map((market) => (
              <article className="fllm-template-card fllm-template-card--gold" key={market.href}>
                <strong className="fllm-template-card-title">{market.label}</strong>
                <p className="fllm-template-card-copy">{market.note}</p>
                <Link className="fllm-template-button fllm-template-button--outline" href={market.href}>View market →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="fllm-template-section" id="market-intelligence-method">
        <div className="fllm-template-shell">
          <div className="fllm-ui-panel">
            <h2>How to compare Florida nightclubs and nightlife businesses for sale with liquor licenses</h2>
            <p>FLLM organizes nightclubs and nightlife businesses by business category, Florida county, and the disclosed alcoholic-beverage license class. When published, a business-package asking price is not the same as the value of its liquor license. A transferable 4COP quota license may have a separate FLLM estimated license value based on county market information. A 4COP SFS / SRX qualification or 2COP beer-and-wine license must not be valued as an interchangeable quota asset.</p>
            <p>Market Views reflect publicly observed sale information rather than an offer by FLLM to broker the operating business. Asking price and SDE, cash flow, or EBITDA appear only when disclosed; these figures are not independently verified by FLLM. Estimated license values are market estimates, not appraisals. Availability and license-transfer eligibility require independent confirmation.</p>
            <p>Explore related Florida business categories: <Link href="/restaurants-with-liquor-licenses">restaurants with liquor licenses</Link>, <Link href="/bars-for-sale-with-liquor-licenses">bars with liquor licenses</Link>, <Link href="/nightclubs-for-sale-with-liquor-licenses">nightclubs with liquor licenses</Link>, <Link href="/gentlemens-clubs-for-sale-with-liquor-licenses">gentlemen&apos;s clubs</Link>, and <Link href="/businesses-with-quota-licenses/marinas">marina business packages</Link>.</p>
          </div>
        </div>
      </section>

      <section className="fllm-template-section" id="license-paths">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Florida Nightclub License Paths"
            title="The business-for-sale market and the liquor-license market are connected — but not identical"
            copy={<p>FLLM targets the broader nightclub-for-sale market while keeping the license component visible as a separate asset and regulatory issue.</p>}
            align="center"
          />
          <FllmCardGrid columns={3}>
            <FllmCard eyebrow={<span className="restaurant-card-cyan-label">Typical Full-Liquor Path</span>} title="4COP Quota" variant="gold">
              <p>A transferable county-specific quota license commonly used by standalone nightclubs selling beer, wine and distilled spirits.</p>
              <div className="fllm-ui-actions">
                <FllmButton href="/businesses-with-quota-licenses/nightclubs" variant="outline">Nightclubs With 4COP Quota</FllmButton>
                <FllmButton href="/license-types/4cop-quota" variant="outline">4COP Quota Guide</FllmButton>
              </div>
            </FllmCard>
            <FllmCard eyebrow={<span className="restaurant-card-cyan-label">Restaurant-Nightlife Hybrid</span>} title="4COP SFS / SRX" variant="gold">
              <p>A qualifying restaurant operation may have location-specific full-liquor privileges under a 4COP SFS / SRX structure.</p>
              <div className="fllm-ui-actions"><FllmButton href="/license-types/4cop-sfs-restaurant" variant="outline">SFS / SRX Guide</FllmButton></div>
            </FllmCard>
            <FllmCard eyebrow={<span className="restaurant-card-cyan-label">Beer & Wine Only</span>} title="2COP" variant="gold">
              <p>A nightlife concept selling beer and wine but not distilled spirits may use an appropriate beer-and-wine license such as 2COP.</p>
              <div className="fllm-ui-actions"><FllmButton href="/license-types/2cop-beer-wine" variant="outline">2COP Guide</FllmButton></div>
            </FllmCard>
          </FllmCardGrid>
        </div>
      </section>

      <style>{`
        #current-nightclub-market .business-package-local-markets { font-size: 17px; line-height: 1.65; }
        #current-nightclub-market .business-package-local-market-city { color: #ffffff; font-weight: 800; }
        #current-nightclub-market .business-package-local-market-separator { color: #ffffff; font-weight: 700; }
      `}</style>

      <section className="fllm-template-section fllm-template-section--deep" id="current-nightclub-market">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Current Florida Nightclub Inventory"
            title="Nightclubs for sale by actual liquor-license structure"
            copy={<p style={{ fontSize: "18px", lineHeight: 1.75, maxWidth: "1120px", marginInline: "auto" }}>FLLM currently shows {allNightclubs.length} published nightclub Market View{allNightclubs.length === 1 ? "" : "s"}. The business category is Nightclub; the license class is then shown separately.</p>}
            align="center"
          />
          <BusinessPackageLocalMarkets listings={allNightclubs} label="Florida nightclub markets represented in current inventory" />
          <div className="fllm-template-card-grid">
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker" style={{ textAlign: "center", display: "block" }}>4COP Quota</span>
              <strong className="fllm-template-card-title" style={{ textAlign: "center", display: "block" }}>{quotaNightclubs.length} Current Nightclub Market View{quotaNightclubs.length === 1 ? "" : "s"}</strong>
            </article>
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker" style={{ textAlign: "center", display: "block" }}>4COP SFS / SRX</span>
              <strong className="fllm-template-card-title" style={{ textAlign: "center", display: "block" }}>{sfsNightclubs.length} Current Nightclub Market View{sfsNightclubs.length === 1 ? "" : "s"}</strong>
            </article>
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker" style={{ textAlign: "center", display: "block" }}>2COP Beer & Wine</span>
              <strong className="fllm-template-card-title" style={{ textAlign: "center", display: "block" }}>{twoCopNightclubs.length} Current Nightclub Market View{twoCopNightclubs.length === 1 ? "" : "s"}</strong>
            </article>
          </div>
          {displayedNightclubs.length ? (
            <div className="business-quota-grid" style={{ marginTop: "1.5rem" }}>
              {displayedNightclubs.map((listing) => <BusinessQuotaListingCard key={listing.listingReference} listing={listing} />)}
            </div>
          ) : (
            <div className="fllm-ui-panel"><strong>No published nightclub Market Views are active at this moment.</strong></div>
          )}
        </div>
      </section>

      <section className="fllm-template-section">
        <div className="fllm-template-shell">
          <FllmSectionHeading eyebrow="Common Questions" title="Buying a nightclub in Florida" align="center" />
          <div className="fllm-ui-faq-grid fllm-ui-faq-grid--2">
            {faqs.map((faq) => (
              <details className="fllm-ui-faq" key={faq.question}>
                <summary>{faq.question}</summary>
                <div className="fllm-ui-faq-answer"><p>{faq.answer}</p></div>
              </details>
            ))}
          </div>
          <div className="fllm-template-disclosure">
            <strong>Scope:</strong> FLLM is not a Florida business broker or real estate broker. Business Market Views are market-intelligence and advertising records. FLLM brokerage is limited to standalone transferable 4COP Quota and 3PS liquor licenses under a separate written agreement.
          </div>
        </div>
      </section>
    </FllmPageShell>
  );
}
