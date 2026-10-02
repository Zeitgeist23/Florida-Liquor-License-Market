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
const canonicalUrl = `${siteUrl}/gentlemens-clubs-for-sale-with-liquor-licenses`;

export const metadata: Metadata = {
  title: "Florida Gentlemen's Clubs for Sale With Liquor Licenses | FLLM",
  description:
    "Browse Florida gentlemen's clubs for sale with liquor licenses. Compare adult-entertainment business packages by actual license class, county and disclosed license component.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  keywords: [
    "Florida gentlemen's clubs for sale",
    "Florida strip clubs for sale",
    "Florida adult entertainment business for sale",
    "Florida gentlemen's club with liquor license for sale",
    "Florida 4COP gentlemen's club",
    "buy Florida gentlemen's club",
    "sell Florida gentlemen's club",
  ],
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Gentlemen's Clubs for Sale With Liquor Licenses | FLLM",
    description:
      "Florida gentlemen's-club opportunities organized by actual liquor-license structure, including transferable 4COP quota licenses.",
    siteName: "Florida Liquor License Market",
  },
};

export default async function GentlemensClubsForSaleWithLiquorLicensesPage() {
  const standaloneListings = getVisibleAvailableMarketplaceListings(
    await getMarketplaceListings(),
  );

  const quotaClubs = withMarketLicenseValues(
    businessQuotaListings,
    standaloneListings,
  ).filter((listing) => listing.businessCategory === "Gentlemen's Club");

  const sfsClubs = withMarketLicenseValues(
    businessSfsListings,
    standaloneListings,
  ).filter((listing) => listing.businessCategory === "Gentlemen's Club");

  const twoCopClubs = withMarketLicenseValues(
    business2copListings,
    standaloneListings,
  ).filter((listing) => listing.businessCategory === "Gentlemen's Club");

  const allClubs = [...quotaClubs, ...sfsClubs, ...twoCopClubs];
  const displayedClubs = allClubs.slice(0, BUSINESS_LISTING_DISPLAY_LIMIT);

  const faqs = [
    {
      question: "Do Florida gentlemen's clubs need a 4COP quota liquor license?",
      answer:
        "A gentlemen's club that wants to sell beer, wine and distilled spirits generally needs full-liquor privileges. For a conventional adult-entertainment venue, that commonly means a transferable county-specific 4COP quota license. Beer-and-wine-only operations may use an appropriate beer-and-wine license, while a qualifying food-service concept may operate under a different full-liquor license structure.",
    },
    {
      question: "Does a 4COP quota license authorize adult-entertainment use by itself?",
      answer:
        "No. Alcoholic-beverage licensing and adult-entertainment or land-use approvals are separate. Zoning, distance restrictions, occupancy, entertainment, hours and other local requirements may apply in addition to the liquor-license transfer.",
    },
    {
      question: "What does full liquor mean in a gentlemen's-club listing?",
      answer:
        "Full liquor is marketplace shorthand for privileges that include distilled spirits as well as beer and wine. Buyers should verify the actual license class included with the business because 'full liquor' is not itself a Florida license-series name.",
    },
    {
      question: "Does FLLM broker operating gentlemen's-club businesses?",
      answer:
        "No. FLLM is not a Florida business broker and does not broker operating gentlemen's clubs or other adult-entertainment businesses. FLLM may advertise third-party business listings and provides liquor-license market data, valuation and transaction resources. FLLM brokerage is limited to standalone transferable 4COP Quota and 3PS liquor licenses under a written license-brokerage agreement.",
    },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Florida Gentlemen's Clubs for Sale With Liquor Licenses",
      url: canonicalUrl,
      description:
        "Florida gentlemen's clubs and adult-entertainment businesses for sale organized by actual liquor-license structure.",
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
          name: "Florida Gentlemen's Clubs for Sale With Liquor Licenses",
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
      name: "Florida gentlemen's-club opportunities with liquor licenses",
      numberOfItems: displayedClubs.length,
      itemListElement: displayedClubs.map((listing, index) => ({
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
            'linear-gradient(90deg, rgba(2, 16, 29, 0.96) 0%, rgba(2, 16, 29, 0.88) 38%, rgba(2, 16, 29, 0.60) 56%, rgba(2, 16, 29, 0.18) 76%, rgba(2, 16, 29, 0.05) 100%), url("/assets/nightclub-hero-final.webp")',
          backgroundSize: "cover",
          backgroundPosition: "center right",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="fllm-template-shell">
          <div className="fllm-ui-breadcrumbs">
            <Link href="/">Home</Link><span>›</span>
            <strong>Florida Gentlemen&apos;s Clubs for Sale</strong>
          </div>
          <span className="fllm-template-eyebrow">Florida Gentlemen&apos;s Club + Liquor License Market</span>
          <h1 className="fllm-template-hero-title">Florida Gentlemen&apos;s Clubs for Sale With Liquor Licenses</h1>
          <p className="fllm-template-hero-copy">
            Browse Florida gentlemen&apos;s-club opportunities while keeping the actual liquor-license structure visible.
            Many adult-entertainment venues use transferable 4COP quota licenses, but buyers should not assume every club
            operates under the same license class or premises approvals. FLLM separates business-package opportunities
            from standalone liquor-license inventory and identifies the license component independently.
          </p>
          <div className="fllm-ui-actions">
            <Link className="btn btn-gold fllm-ui-official-gold-button" href="#current-club-market">
              Browse Florida Gentlemen&apos;s Clubs for Sale
            </Link>
            <FllmButton href="/businesses-with-quota-licenses/gentlemens-clubs" variant="outline">
              4COP Quota Gentlemen&apos;s Club Market
            </FllmButton>
          </div>
        </div>
      </section>

      <section className="fllm-template-section" id="license-paths">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Florida Gentlemen's Club License Paths"
            title="Adult-entertainment use and liquor-license class are separate questions"
            copy={
              <p>
                Full-liquor privileges, beer-and-wine-only service, local zoning and adult-use approvals are not interchangeable.
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
              className="nightclub-license-path-card"
            >
              <p>
                A transferable county-specific quota license commonly used by full-liquor gentlemen&apos;s clubs selling beer,
                wine and distilled spirits. The license can represent a separately valued asset within the business acquisition.
              </p>
              <div className="fllm-ui-actions">
                <FllmButton href="/businesses-with-quota-licenses/gentlemens-clubs" variant="outline">Gentlemen&apos;s Clubs With 4COP Quota</FllmButton>
                <FllmButton href="/license-types/gentlemens-clubs-4cop-quota" variant="outline">4COP Quota Guide</FllmButton>
              </div>
            </FllmCard>

            <FllmCard
              eyebrow={<span className="restaurant-card-cyan-label">Restaurant-Nightlife Hybrid</span>}
              title="4COP SFS / SRX"
              variant="gold"
              className="nightclub-license-path-card"
            >
              <p>
                A qualifying food-service operation may have location-specific full-liquor privileges under a 4COP SFS / SRX
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
              className="nightclub-license-path-card"
            >
              <p>
                An adult-entertainment or nightlife concept that sells beer and wine but not distilled spirits may use
                an appropriate beer-and-wine license such as 2COP, subject to the applicable operating and premises requirements.
              </p>
              <div className="fllm-ui-actions">
                <FllmButton href="/license-types/2cop-beer-wine" variant="outline">2COP Guide</FllmButton>
              </div>
            </FllmCard>
          </FllmCardGrid>
        </div>
      </section>

      <style>{`
        #current-club-market .business-package-local-markets {
          font-size: 17px;
          line-height: 1.65;
        }
        #current-club-market .business-package-local-market-city,
        #current-club-market .business-package-local-market-separator {
          color: #ffffff;
          font-weight: 800;
        }
      `}</style>

      <section className="fllm-template-section fllm-template-section--deep" id="current-club-market">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Current Florida Gentlemen's Club Market"
            title="Gentlemen's-club opportunities by actual liquor-license structure"
            copy={
              <p style={{ fontSize: "18px", lineHeight: 1.75, maxWidth: "1120px", marginInline: "auto" }}>
                FLLM currently shows {allClubs.length} published gentlemen&apos;s-club Market View{allClubs.length === 1 ? "" : "s"}.
                Listings are included because their actual business category is Gentlemen&apos;s Club, not merely because
                adult entertainment or nightlife appears somewhere in another business description.
              </p>
            }
            align="center"
          />

          <BusinessPackageLocalMarkets
            listings={allClubs}
            label="Florida gentlemen's-club markets represented in current inventory"
          />

          <div className="fllm-template-card-grid">
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker" style={{ textAlign: "center", display: "block" }}>4COP Quota</span>
              <strong className="fllm-template-card-title" style={{ textAlign: "center", display: "block" }}>{quotaClubs.length} Current Gentlemen&apos;s Club Market View{quotaClubs.length === 1 ? "" : "s"}</strong>
              <p className="fllm-template-card-copy">Transferable county quota-license gentlemen&apos;s-club packages.</p>
            </article>
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker" style={{ textAlign: "center", display: "block" }}>4COP SFS / SRX</span>
              <strong className="fllm-template-card-title" style={{ textAlign: "center", display: "block" }}>{sfsClubs.length} Current Gentlemen&apos;s Club Market View{sfsClubs.length === 1 ? "" : "s"}</strong>
              <p className="fllm-template-card-copy">Qualifying food-service opportunities explicitly categorized as Gentlemen&apos;s Club.</p>
            </article>
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker" style={{ textAlign: "center", display: "block" }}>2COP Beer & Wine</span>
              <strong className="fllm-template-card-title" style={{ textAlign: "center", display: "block" }}>{twoCopClubs.length} Current Gentlemen&apos;s Club Market View{twoCopClubs.length === 1 ? "" : "s"}</strong>
              <p className="fllm-template-card-copy">Beer-and-wine-only opportunities explicitly categorized as Gentlemen&apos;s Club.</p>
            </article>
          </div>

          {displayedClubs.length ? (
            <div className="business-quota-grid" style={{ marginTop: "1.5rem" }}>
              {displayedClubs.map((listing) => (
                <BusinessQuotaListingCard key={listing.listingReference} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="fllm-ui-panel">
              <strong>No published gentlemen&apos;s-club Market Views are active at this moment.</strong>
              <p>
                This page remains available as a Florida gentlemen&apos;s-club liquor-license guide and will populate
                as qualifying Market Views are published.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="fllm-template-section">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Buy or Sell a Florida Gentlemen's Club"
            title="One canonical FLLM page for gentlemen's-club buyer and seller search intent"
            copy={
              <p>
                Buyers can compare gentlemen&apos;s-club opportunities and liquor-license structures here. Owners and brokers
                can advertise qualifying third-party business listings while keeping the operating-business transaction
                separate from FLLM&apos;s standalone liquor-license brokerage services.
              </p>
            }
            align="center"
          />
          <div className="fllm-ui-actions" style={{ justifyContent: "center" }}>
            <FllmButton href="/contact" variant="outline">Contact FLLM</FllmButton>
            <FllmButton href="/brokers/list-your-license" variant="outline">Broker Resources</FllmButton>
          </div>
        </div>
      </section>
    </FllmPageShell>
  );
}
