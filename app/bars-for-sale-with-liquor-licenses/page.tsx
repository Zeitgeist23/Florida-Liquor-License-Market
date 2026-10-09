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
const canonicalUrl = `${siteUrl}/bars-for-sale-with-liquor-licenses`;

export const metadata: Metadata = {
  title: "Florida Bars With Full Liquor for Sale | 4COP & Bar Listings | FLLM",
  description:
    "Browse Florida bars with full liquor for sale, including transferable 4COP quota bars and qualifying full-liquor restaurant-bars, with beer-and-wine-only opportunities clearly identified.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  keywords: [
    "Florida bars with full liquor for sale",
    "Florida bar with full liquor for sale",
    "Florida bars for sale",
    "bar and lounge with full liquor for sale Florida",
    "turnkey bar with full liquor Florida",
    "Florida bars for sale with liquor licenses",
    "bar for sale Florida liquor license",
    "Florida bar with liquor license for sale",
    "Florida bar 4COP quota",
    "Florida bar 4COP SFS SRX",
    "Florida bar 2COP beer wine",
    "buy Florida bars",
    "sell Florida bars",
  ],
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Bars With Full Liquor for Sale | FLLM",
    description:
      "Florida bars with full liquor for sale, organized by actual license structure including transferable 4COP quota, qualifying full-liquor restaurant-bar and beer-and-wine-only opportunities.",
    siteName: "Florida Liquor License Market",
  },
};

function isBarRelated(listing: {
  title: string;
  businessType: string;
  businessCategory: string;
}) {
  return (
    listing.businessCategory === "Bar" ||
    listing.businessCategory === "Cocktail Lounge" ||
    listing.businessCategory === "Nightclub"
  );
}

export default async function FloridaBarsForSaleWithLiquorLicensesPage() {
  const standaloneListings = getVisibleAvailableMarketplaceListings(
    await getMarketplaceListings(),
  );

  const quotaBars = withMarketLicenseValues(
    businessQuotaListings,
    standaloneListings,
  ).filter(isBarRelated);

  const sfsBars = withMarketLicenseValues(
    businessSfsListings,
    standaloneListings,
  ).filter(isBarRelated);

  const twoCopBars = withMarketLicenseValues(
    business2copListings,
    standaloneListings,
  ).filter(isBarRelated);

  const allBars = [...quotaBars, ...sfsBars, ...twoCopBars];
  const displayedBars = allBars.slice(0, BUSINESS_LISTING_DISPLAY_LIMIT);

  const faqs = [
    {
      question: "Do all bars in Florida require a 4COP quota liquor license?",
      answer:
        "No. A Florida bar selling only beer and wine may operate under an appropriate beer-and-wine license such as 2COP. A bar selling distilled spirits generally needs full-liquor privileges, which may come from a transferable 4COP quota license or, for a qualifying restaurant-bar operation, a location-specific 4COP SFS / SRX license.",
    },
    {
      question: "What is the difference between a 4COP quota bar and a 4COP SFS / SRX restaurant-bar?",
      answer:
        "A 4COP quota license is a county-specific transferable quota asset commonly used by bars, pubs, taverns, lounges and nightclubs. A 4COP SFS / SRX license is tied to a qualifying food-service operation and premises and is not the same kind of separately transferable quota asset.",
    },
    {
      question: "Can a Florida bar operate with only a 2COP license?",
      answer:
        "Yes, if the business model is limited to beer and wine and otherwise satisfies the applicable licensing requirements. A 2COP license does not authorize distilled spirits.",
    },
    {
      question: "Does FLLM broker the operating bar business?",
      answer:
        "No. FLLM is not a Florida business broker and does not broker operating bars. FLLM may advertise third-party business listings and provides liquor-license market data, valuation and transaction resources. FLLM brokerage is limited to standalone transferable 4COP Quota and 3PS liquor licenses under a written license-brokerage agreement.",
    },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Florida Bars With Full Liquor for Sale",
      url: canonicalUrl,
      description:
        "Florida bars, pubs, taverns and lounges with full liquor for sale, organized by actual liquor-license structure including 4COP quota and qualifying full-liquor restaurant-bar licenses.",
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
          name: "Florida Bars for Sale With Liquor Licenses",
          item: canonicalUrl,
        },
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
      name: "Florida bar opportunities with liquor licenses",
      numberOfItems: displayedBars.length,
      itemListElement: displayedBars.map((listing, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: listing.title,
        url: `${siteUrl}${listing.href}`,
      })),
    },
  ];

  return (
    <FllmPageShell className="restaurants-with-liquor-licenses-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="fllm-template-hero">
        <div className="fllm-template-shell">
          <div className="fllm-ui-breadcrumbs">
            <Link href="/">Home</Link><span>›</span>
            <strong>Florida Bars With Full Liquor for Sale</strong>
          </div>
          <span className="fllm-template-eyebrow">Florida Bars With Full Liquor for Sale</span>
          <h1 className="fllm-template-hero-title">Florida Bars With Full Liquor for Sale</h1>
          <p className="fllm-template-hero-copy">
            Browse Florida bars, pubs, taverns and lounges for sale while distinguishing the liquor-license
            structure included with the business. Not every Florida bar requires a transferable quota license:
            full-liquor privileges may involve a 4COP quota license or, for a qualifying restaurant-bar,
            a location-specific 4COP SFS / SRX license, while beer-and-wine concepts may operate with 2COP.
            FLLM keeps these license paths separate so buyers can compare the business package and license component correctly.
          </p>
          <div className="fllm-ui-actions">
            <Link className="btn btn-gold fllm-ui-official-gold-button" href="#current-bar-market">
              Browse Florida Bars for Sale
            </Link>
            <FllmButton href="/businesses-with-quota-licenses/bars" variant="outline">
              4COP Quota Bar Market
            </FllmButton>
          </div>
        </div>
      </section>

      <section className="fllm-template-section" id="find-full-liquor-bars">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Find a Florida Bar With Full Liquor"
            title="Search bars for sale by liquor-license type and county"
            copy={<p>Looking for a Florida bar for sale with a full liquor license? Start with current bar Market Views below, then compare the included 4COP license class and the county's estimated quota-license market value. Asking prices and earnings are shown when available; they are not independently verified by FLLM.</p>}
          />
          <FllmCardGrid columns={3}>
            <FllmCard eyebrow="Current market" title="Browse bar opportunities" variant="gold">
              <p>Review current asking-price information and the license structure disclosed for each bar-related opportunity.</p>
              <FllmButton href="#current-bar-market" variant="outline">View Florida Bar Listings</FllmButton>
            </FllmCard>
            <FllmCard eyebrow="Quota intelligence" title="Compare 4COP license values" variant="gold">
              <p>See 4COP quota bar Market Views with FLLM estimated license value, kept distinct from the total business asking price.</p>
              <FllmButton href="/businesses-with-quota-licenses/bars" variant="outline">Compare Quota Bars</FllmButton>
            </FllmCard>
            <FllmCard eyebrow="New opportunities" title="Get county-specific alerts" variant="gold">
              <p>Choose counties and license types to learn when matching liquor-license opportunities are added.</p>
              <FllmButton href="/license-alerts" variant="outline">Set Up License Alerts</FllmButton>
            </FllmCard>
          </FllmCardGrid>
          <p style={{ marginTop: "1rem" }}>FLLM provides market intelligence and authorized featured listings; third-party Market Views do not mean FLLM represents the business seller.</p>
        </div>
      </section>

      <section className="fllm-template-section" id="license-paths">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Florida Bar License Paths"
            title="A Florida bar can operate under different alcoholic-beverage license structures"
            copy={
              <p>
                The correct license depends on what alcohol is sold and whether the business qualifies for a
                restaurant-based full-liquor license. These are different regulatory and economic structures.
              </p>
            }
            align="center"
          />
          <FllmCardGrid columns={3}>
            <FllmCard
              eyebrow={<span className="restaurant-card-cyan-label">Transferable Full Liquor</span>}
              title="4COP Quota"
              variant="gold"
            >
              <p>
                Common for standalone bars, pubs, taverns, lounges and nightclubs selling beer, wine and distilled
                spirits. The quota license is county-specific and can represent a separately valued transferable asset.
              </p>
              <div className="fllm-ui-actions">
                <FllmButton href="/businesses-with-quota-licenses/bars" variant="outline">Bars With 4COP Quota</FllmButton>
                <FllmButton href="/license-types/4cop-quota" variant="outline">4COP Quota Guide</FllmButton>
              </div>
            </FllmCard>

            <FllmCard
              eyebrow={<span className="restaurant-card-cyan-label">Qualifying Restaurant-Bar</span>}
              title="4COP SFS / SRX"
              variant="gold"
            >
              <p>
                A location-specific full-liquor restaurant license available to qualifying food-service operations.
                It is not the same as a transferable quota asset and remains tied more closely to the qualifying operation and premises.
              </p>
              <div className="fllm-ui-actions">
                <FllmButton href="/license-types/4cop-sfs-restaurant" variant="outline">SFS / SRX Guide</FllmButton>
                <FllmButton href="/restaurants-with-liquor-licenses" variant="outline">Restaurant-Bar Market</FllmButton>
              </div>
            </FllmCard>

            <FllmCard
              eyebrow={<span className="restaurant-card-cyan-label">Beer & Wine Only</span>}
              title="2COP"
              variant="gold"
            >
              <p>
                Appropriate for certain bar and hospitality concepts that sell beer and wine but not distilled spirits.
                A 2COP license does not provide full-liquor privileges.
              </p>
              <div className="fllm-ui-actions">
                <FllmButton href="/license-types/2cop-beer-wine" variant="outline">2COP Guide</FllmButton>
              </div>
            </FllmCard>
          </FllmCardGrid>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--deep" id="current-bar-market">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Current Florida Bar Market"
            title="Bars, pubs, taverns and lounges by license structure"
            copy={
              <p>
                FLLM currently shows {allBars.length} published bar-related Market View{allBars.length === 1 ? "" : "s"} across
                the 4COP quota, 4COP SFS / SRX and 2COP license paths. Each card identifies the actual license class.
              </p>
            }
          />

          <BusinessPackageLocalMarkets
            listings={allBars}
            label="Florida bar markets represented in current inventory"
          />

          <div className="fllm-template-card-grid">
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker">4COP Quota</span>
              <strong className="fllm-template-card-title">{quotaBars.length} Current Bar Market View{quotaBars.length === 1 ? "" : "s"}</strong>
              <p className="fllm-template-card-copy">Transferable county quota-license business packages.</p>
            </article>
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker">4COP SFS / SRX</span>
              <strong className="fllm-template-card-title">{sfsBars.length} Current Restaurant-Bar Market View{sfsBars.length === 1 ? "" : "s"}</strong>
              <p className="fllm-template-card-copy">Location-specific full-liquor restaurant-bar opportunities.</p>
            </article>
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker">2COP Beer & Wine</span>
              <strong className="fllm-template-card-title">{twoCopBars.length} Current Beer-and-Wine Bar Market View{twoCopBars.length === 1 ? "" : "s"}</strong>
              <p className="fllm-template-card-copy">Beer-and-wine-only bar and hospitality opportunities.</p>
            </article>
          </div>

          {displayedBars.length ? (
            <div className="business-quota-grid" style={{ marginTop: "1.5rem" }}>
              {displayedBars.map((listing) => (
                <BusinessQuotaListingCard key={listing.listingReference} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="fllm-ui-panel">
              <strong>No published bar Market Views are active at this moment.</strong>
              <p>This page remains available as a Florida bar-license guide and will populate as qualifying Market Views are published.</p>
            </div>
          )}
        </div>
      </section>

      <section className="fllm-template-section">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Buy or Sell a Florida Bar"
            title="One canonical FLLM page for both buyer and seller search intent"
            copy={
              <p>
                Buyers can compare current bar opportunities and liquor-license structures here. Owners and brokers
                can use FLLM to advertise qualifying third-party business listings while keeping the business transaction
                separate from FLLM&apos;s standalone liquor-license brokerage services.
              </p>
            }
          />
          <div className="fllm-ui-actions">
            <FllmButton href="/contact" variant="outline">Contact FLLM</FllmButton>
            <FllmButton href="/brokers/list-your-license" variant="outline">Broker Resources</FllmButton>
          </div>
        </div>
      </section>
    </FllmPageShell>
  );
}
