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

export const metadata: Metadata = {
  title: "Florida Nightclubs for Sale With Liquor Licenses | 4COP & More | FLLM",
  description:
    "Browse Florida nightclubs for sale with liquor licenses. Compare transferable 4COP quota nightclub packages and other nightclub opportunities by actual license class and county.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  keywords: [
    "Florida nightclubs for sale",
    "Florida nightclub for sale with liquor license",
    "Florida nightclubs for sale with liquor licenses",
    "nightclub for sale Florida full liquor license",
    "Florida nightclub 4COP quota",
    "Florida nightclub with 4COP license for sale",
    "buy Florida nightclub",
    "sell Florida nightclub",
  ],
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Nightclubs for Sale With Liquor Licenses | FLLM",
    description:
      "Florida nightclub opportunities organized by actual liquor-license structure, including transferable 4COP quota licenses.",
    siteName: "Florida Liquor License Market",
  },
};

export default async function FloridaNightclubsForSaleWithLiquorLicensesPage() {
  const standaloneListings = getVisibleAvailableMarketplaceListings(
    await getMarketplaceListings(),
  );

  const quotaNightclubs = withMarketLicenseValues(
    businessQuotaListings,
    standaloneListings,
  ).filter((listing) => listing.businessCategory === "Nightclub");

  const sfsNightclubs = withMarketLicenseValues(
    businessSfsListings,
    standaloneListings,
  ).filter((listing) => listing.businessCategory === "Nightclub");

  const twoCopNightclubs = withMarketLicenseValues(
    business2copListings,
    standaloneListings,
  ).filter((listing) => listing.businessCategory === "Nightclub");

  const allNightclubs = [...quotaNightclubs, ...sfsNightclubs, ...twoCopNightclubs];
  const displayedNightclubs = allNightclubs.slice(0, BUSINESS_LISTING_DISPLAY_LIMIT);

  const faqs = [
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
      question: "Does a 4COP quota license automatically approve nightclub use at a location?",
      answer:
        "No. The liquor license and the premises approvals are separate. Zoning, occupancy, entertainment, hours and other local approvals may apply in addition to the alcoholic-beverage license and transfer requirements.",
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
      name: "Florida Nightclubs for Sale With Liquor Licenses",
      url: canonicalUrl,
      description:
        "Florida nightclubs for sale organized by liquor-license structure, including transferable 4COP quota licenses and other clearly identified license classes.",
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
          name: "Florida Nightclubs for Sale With Liquor Licenses",
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
      name: "Florida nightclub opportunities with liquor licenses",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section
        className="fllm-template-hero"
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(2, 16, 29, 0.96) 0%, rgba(2, 16, 29, 0.88) 38%, rgba(2, 16, 29, 0.60) 56%, rgba(2, 16, 29, 0.18) 76%, rgba(2, 16, 29, 0.05) 100%), url("/assets/nightclub-hero.webp")',
          backgroundSize: "cover",
          backgroundPosition: "center right",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="fllm-template-shell">
          <div className="fllm-ui-breadcrumbs">
            <Link href="/">Home</Link><span>›</span>
            <strong>Florida Nightclubs for Sale</strong>
          </div>
          <span className="fllm-template-eyebrow">Florida Nightclubs + Liquor License Market</span>
          <h1 className="fllm-template-hero-title">Florida Nightclubs for Sale With Liquor Licenses</h1>
          <p className="fllm-template-hero-copy">
            Browse Florida nightclub opportunities while keeping the actual liquor-license class visible.
            Many full-liquor nightclub transactions involve a transferable 4COP quota license, but buyers should
            not assume every nightlife business uses the same license structure. FLLM separates nightclub business
            packages from standalone liquor-license inventory and identifies the license component independently.
          </p>
          <div className="fllm-ui-actions">
            <Link className="btn btn-gold fllm-ui-official-gold-button" href="#current-nightclub-market">
              Browse Florida Nightclubs for Sale
            </Link>
            <FllmButton href="/businesses-with-quota-licenses/nightclubs" variant="outline">
              4COP Quota Nightclub Market
            </FllmButton>
          </div>
        </div>
      </section>

      <section className="fllm-template-section" id="license-paths">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Florida Nightclub License Paths"
            title="Nightclub use and liquor-license class are separate questions"
            copy={
              <p>
                Full-liquor privileges, beer-and-wine-only service and local nightclub approvals are not interchangeable.
                Buyers should verify both the alcoholic-beverage license and the premises approvals for the intended operation.
              </p>
            }
            align="center"
          />
          <FllmCardGrid columns={3}>
            <FllmCard
              eyebrow={<span className="restaurant-card-cyan-label">Typical Full-Liquor Path</span>}
              title="4COP Quota"
              variant="gold"
            >
              <p>
                A transferable county-specific quota license commonly used by standalone nightclubs selling beer,
                wine and distilled spirits. The license can represent a separately valued asset within the business acquisition.
              </p>
              <div className="fllm-ui-actions">
                <FllmButton href="/businesses-with-quota-licenses/nightclubs" variant="outline">Nightclubs With 4COP Quota</FllmButton>
                <FllmButton href="/license-types/4cop-quota" variant="outline">4COP Quota Guide</FllmButton>
              </div>
            </FllmCard>

            <FllmCard
              eyebrow={<span className="restaurant-card-cyan-label">Restaurant-Nightlife Hybrid</span>}
              title="4COP SFS / SRX"
              variant="gold"
            >
              <p>
                A qualifying restaurant operation may have location-specific full-liquor privileges under a 4COP SFS / SRX
                structure. That is not the same as a freely transferable quota license and depends on the qualifying operation and premises.
              </p>
              <div className="fllm-ui-actions">
                <FllmButton href="/license-types/4cop-sfs-restaurant" variant="outline">SFS / SRX Guide</FllmButton>
              </div>
            </FllmCard>

            <FllmCard
              eyebrow={<span className="restaurant-card-cyan-label">Beer & Wine Only</span>}
              title="2COP"
              variant="gold"
            >
              <p>
                A nightlife concept that sells beer and wine but not distilled spirits may use an appropriate
                beer-and-wine license such as 2COP, subject to the applicable operating and premises requirements.
              </p>
              <div className="fllm-ui-actions">
                <FllmButton href="/license-types/2cop-beer-wine" variant="outline">2COP Guide</FllmButton>
              </div>
            </FllmCard>
          </FllmCardGrid>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--deep" id="current-nightclub-market">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Current Florida Nightclub Market"
            title="Nightclub opportunities by actual liquor-license structure"
            copy={
              <p>
                FLLM currently shows {allNightclubs.length} published nightclub Market View{allNightclubs.length === 1 ? "" : "s"}.
                Listings are included because their actual business category is Nightclub, not merely because the word
                nightclub appears somewhere in a restaurant or bar description.
              </p>
            }
          />

          <BusinessPackageLocalMarkets
            listings={allNightclubs}
            label="Florida nightclub markets represented in current inventory"
          />

          <div className="fllm-template-card-grid">
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker">4COP Quota</span>
              <strong className="fllm-template-card-title">{quotaNightclubs.length} Current Nightclub Market View{quotaNightclubs.length === 1 ? "" : "s"}</strong>
              <p className="fllm-template-card-copy">Transferable county quota-license nightclub packages.</p>
            </article>
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker">4COP SFS / SRX</span>
              <strong className="fllm-template-card-title">{sfsNightclubs.length} Current Nightclub Market View{sfsNightclubs.length === 1 ? "" : "s"}</strong>
              <p className="fllm-template-card-copy">Qualifying restaurant-nightlife opportunities explicitly categorized as Nightclub.</p>
            </article>
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker">2COP Beer & Wine</span>
              <strong className="fllm-template-card-title">{twoCopNightclubs.length} Current Nightclub Market View{twoCopNightclubs.length === 1 ? "" : "s"}</strong>
              <p className="fllm-template-card-copy">Beer-and-wine-only nightlife opportunities explicitly categorized as Nightclub.</p>
            </article>
          </div>

          {displayedNightclubs.length ? (
            <div className="business-quota-grid" style={{ marginTop: "1.5rem" }}>
              {displayedNightclubs.map((listing) => (
                <BusinessQuotaListingCard key={listing.listingReference} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="fllm-ui-panel">
              <strong>No published nightclub Market Views are active at this moment.</strong>
              <p>
                This page remains available as a Florida nightclub liquor-license guide and will populate as qualifying
                nightclub Market Views are published.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="fllm-template-section">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Buy or Sell a Florida Nightclub"
            title="One canonical FLLM page for nightclub buyer and seller search intent"
            copy={
              <p>
                Buyers can compare nightclub opportunities and liquor-license structures here. Owners and brokers can
                advertise qualifying third-party business listings while keeping the operating-business transaction separate
                from FLLM&apos;s standalone liquor-license brokerage services.
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
