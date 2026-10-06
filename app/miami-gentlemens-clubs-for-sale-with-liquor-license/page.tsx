import type { Metadata } from "next";
import Link from "next/link";

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
  businessMarketDisplayTitle,
  businessQuotaListings,
  businessSfsListings,
} from "@/lib/business-quota-listings";
import { withMarketLicenseValues } from "@/lib/business-quota-market-values";
import { marketPriceStats } from "@/lib/florida-market-index";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";

import "../fllm-official-template.css";
import "../fllm-design-system.css";
import "../listings/listings-premium.css";
import "../businesses-with-quota-licenses/business-inventory.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalPath = "/miami-gentlemens-clubs-for-sale-with-liquor-license";
const canonicalUrl = `${siteUrl}${canonicalPath}`;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Miami Gentlemen's Clubs for Sale With Full Liquor Licenses | FLLM",
  description:
    "Browse Miami and Miami-Dade gentlemen's clubs for sale with full-liquor licenses. Compare adult-entertainment business packages, 4COP quota license structure, package asking prices and FLLM license-market context.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  keywords: [
    "Miami gentlemen's clubs for sale with liquor license",
    "Miami gentlemen's clubs for sale with full liquor",
    "Miami strip clubs for sale with full liquor license",
    "Miami strip club for sale",
    "Miami-Dade gentlemen's club for sale",
    "Miami adult entertainment business for sale",
    "Miami 4COP quota gentlemen's club",
    "Miami full liquor business for sale",
    "Miami Beach gentlemen's club for sale",
    "Miami-Dade 4COP quota license business",
  ],
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Miami Gentlemen's Clubs for Sale With Full Liquor Licenses | FLLM",
    description:
      "Miami-Dade gentlemen's-club and adult-entertainment business packages with full-liquor license context, including transferable 4COP quota licenses.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miami Gentlemen's Clubs for Sale With Full Liquor Licenses | FLLM",
    description:
      "Compare Miami-Dade gentlemen's-club opportunities, package prices and full-liquor license structure.",
  },
};

function money(value: number | null) {
  if (value === null) return "Not enough disclosed asking-price data";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

const faqs = [
  {
    question: "Where can I find gentlemen's clubs for sale in Miami with a full-liquor license?",
    answer:
      "FLLM tracks published Miami-Dade County business packages categorized as Gentlemen's Club and identifies the actual liquor-license structure shown in the market record. The current inventory on this page is limited to Miami-Dade opportunities that satisfy FLLM's publication and source-verification rules.",
  },
  {
    question: "Does a Miami gentlemen's club normally use a 4COP quota license?",
    answer:
      "A transferable 4COP quota license is a common full-liquor structure for an adult-entertainment venue that sells beer, wine and distilled spirits, but buyers should verify the actual license class for the specific business. Full liquor is marketplace shorthand, not a Florida license-series name.",
  },
  {
    question: "Can a Miami-Dade 4COP quota license be moved to another county?",
    answer:
      "Quota licenses are county-specific. A Miami-Dade County quota license generally remains a Miami-Dade County asset, subject to DBPR/ABT transfer, change-of-location, applicant, zoning and premises approval requirements.",
  },
  {
    question: "Does a 4COP quota license automatically authorize adult entertainment in Miami-Dade?",
    answer:
      "No. Alcoholic-beverage licensing and adult-entertainment or land-use approvals are separate. Local zoning, distance, occupancy, entertainment, hours and other operating requirements must be evaluated independently for the specific premises.",
  },
  {
    question: "Does FLLM broker the sale of Miami gentlemen's clubs?",
    answer:
      "No. Florida Liquor License Market is not a business broker and does not broker operating gentlemen's clubs or other businesses. FLLM can publish qualifying third-party business listings and market observations, and its brokerage services are limited to standalone transferable 4COP Quota and 3PS liquor licenses under a written license-brokerage agreement.",
  },
  {
    question: "Can FLLM estimate the liquor-license component separately from the business asking price?",
    answer:
      "Yes. FLLM tracks Miami-Dade standalone quota-license asking prices and can show market context for the license component separately from the total business package. Marketplace estimates are not appraisals; a formal license appraisal is a separate service.",
  },
];

export default async function MiamiGentlemensClubsForSaleWithLiquorLicensePage() {
  const standaloneListings = getVisibleAvailableMarketplaceListings(
    await getMarketplaceListings(),
  );

  const quotaClubs = withMarketLicenseValues(
    businessQuotaListings,
    standaloneListings,
  ).filter(
    (listing) =>
      listing.county === "Miami-Dade County" &&
      listing.businessCategory === "Gentlemen's Club",
  );

  const sfsClubs = withMarketLicenseValues(
    businessSfsListings,
    standaloneListings,
  ).filter(
    (listing) =>
      listing.county === "Miami-Dade County" &&
      listing.businessCategory === "Gentlemen's Club",
  );

  const allClubs = [...quotaClubs, ...sfsClubs];
  const displayedClubs = allClubs.slice(0, BUSINESS_LISTING_DISPLAY_LIMIT);

  const miamiDadeFourCop = standaloneListings.filter(
    (listing) =>
      listing.county === "Miami-Dade County" &&
      listing.type === "4COP Quota",
  );
  const fourCopStats = marketPriceStats(
    miamiDadeFourCop.map((listing) => listing.price),
  );
  const medianLabel = money(fourCopStats.median);
  const lowLabel = money(fourCopStats.low);
  const highLabel = money(fourCopStats.high);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Miami Gentlemen's Clubs for Sale With Full Liquor Licenses",
      url: canonicalUrl,
      description:
        "Miami and Miami-Dade gentlemen's-club and adult-entertainment business packages for sale with full-liquor license context.",
      about: [
        { "@type": "Thing", name: "Miami-Dade County gentlemen's clubs for sale" },
        { "@type": "Thing", name: "Florida 4COP quota liquor licenses" },
        { "@type": "Place", name: "Miami-Dade County, Florida" },
      ],
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
          name: "Florida Gentlemen's Clubs With Full Liquor for Sale",
          item: `${siteUrl}/gentlemens-clubs-for-sale-with-liquor-licenses`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Miami Gentlemen's Clubs for Sale With Full Liquor Licenses",
          item: canonicalUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Miami-Dade gentlemen's-club business packages with full-liquor licenses",
      numberOfItems: displayedClubs.length,
      itemListElement: displayedClubs.map((listing, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: businessMarketDisplayTitle(listing),
        url: `${siteUrl}${listing.href}`,
      })),
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
  ];

  return (
    <FllmPageShell className="restaurants-with-liquor-licenses-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
        }}
      />

      <section
        className="fllm-template-hero"
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(2, 16, 29, 0.97) 0%, rgba(2, 16, 29, 0.90) 39%, rgba(2, 16, 29, 0.62) 58%, rgba(2, 16, 29, 0.18) 80%, rgba(2, 16, 29, 0.05) 100%), url("/assets/nightclub-hero-final.webp")',
          backgroundSize: "cover",
          backgroundPosition: "center right",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="fllm-template-shell">
          <div className="fllm-ui-breadcrumbs">
            <Link href="/">Home</Link><span>›</span>
            <Link href="/gentlemens-clubs-for-sale-with-liquor-licenses">Florida Gentlemen&apos;s Clubs</Link><span>›</span>
            <strong>Miami-Dade</strong>
          </div>
          <span className="fllm-template-eyebrow">Miami · Miami Beach · Doral · Miami-Dade County</span>
          <h1 className="fllm-template-hero-title">
            Miami Gentlemen&apos;s Clubs for Sale With Full Liquor Licenses
          </h1>
          <p className="fllm-template-hero-copy">
            Browse Miami and Miami-Dade gentlemen&apos;s-club, adult-entertainment and strip-club business opportunities
            while keeping the liquor-license component separate from the operating-business package. FLLM identifies
            the actual license class, county market context and published package asking price rather than treating
            every &quot;full liquor&quot; opportunity as the same license asset.
          </p>
          <div className="fllm-ui-actions">
            <Link className="btn btn-gold fllm-ui-official-gold-button" href="#miami-dade-club-market">
              View Miami-Dade Opportunities
            </Link>
            <FllmButton href="/counties/miami-dade/liquor-license-value" variant="outline">
              Miami-Dade 4COP License Values
            </FllmButton>
            <FllmButton href="/gentlemens-clubs-for-sale-with-liquor-licenses" variant="outline">
              Statewide Gentlemen&apos;s Club Market
            </FllmButton>
          </div>
        </div>
      </section>

      <section className="fllm-template-section">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Miami-Dade Full-Liquor Market"
            title="Separate the business package from the 4COP quota-license component"
            copy={
              <p>
                Miami-Dade County is the relevant quota-license market for Miami, Miami Beach, Doral, North Miami and
                other communities in the county. A transferable quota license is county-specific, so FLLM compares the
                liquor-license component against Miami-Dade inventory rather than a statewide average.
              </p>
            }
            align="center"
          />

          <FllmCardGrid columns={4}>
            <FllmCard eyebrow="Current Market" title={`${allClubs.length} Miami-Dade Club Package${allClubs.length === 1 ? "" : "s"}`} variant="gold">
              <p>Published FLLM business-package records currently categorized as Gentlemen&apos;s Club in Miami-Dade County.</p>
            </FllmCard>
            <FllmCard eyebrow="4COP Quota Market" title={medianLabel} variant="gold">
              <p>
                Current median disclosed asking price for standalone Miami-Dade 4COP quota inventory based on
                {fourCopStats.count ? ` ${fourCopStats.count} priced listing${fourCopStats.count === 1 ? "" : "s"}` : " available disclosed-price data"}.
              </p>
            </FllmCard>
            <FllmCard eyebrow="Current Range" title={fourCopStats.count ? `${lowLabel} – ${highLabel}` : "Market data pending"} variant="gold">
              <p>Low-to-high disclosed asking-price range for current standalone Miami-Dade 4COP quota inventory.</p>
            </FllmCard>
            <FllmCard eyebrow="License Structure" title="County-Specific 4COP" variant="gold">
              <p>A Miami-Dade quota license generally remains in Miami-Dade County and transfers subject to DBPR/ABT and premises approval.</p>
            </FllmCard>
          </FllmCardGrid>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--deep" id="miami-dade-club-market">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Current Miami-Dade Inventory"
            title="Miami Gentlemen's Clubs and Adult-Entertainment Businesses With Full Liquor"
            copy={
              <p style={{ fontSize: "18px", lineHeight: 1.75, maxWidth: "1120px", marginInline: "auto" }}>
                These records are limited to published Miami-Dade business opportunities that FLLM categorizes as
                Gentlemen&apos;s Club. Featured Broker Listings are broker-authorized. Market Listings remain market
                intelligence and do not imply that FLLM represents the underlying business.
              </p>
            }
            align="center"
          />

          <div className="fllm-template-disclosure">
            <strong>Market Listing distinction:</strong> FLLM is not a Florida business broker or real-estate broker.
            Buyer inquiries about Market Listings are for county, license-type and business-category information.
            Authorized Featured Broker Listings identify the independent listing broker separately.
          </div>

          {displayedClubs.length ? (
            <div className="business-quota-grid" style={{ marginTop: "1.5rem" }}>
              {displayedClubs.map((listing) => (
                <BusinessQuotaListingCard key={listing.listingReference} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="fllm-ui-panel" style={{ marginTop: "1.5rem" }}>
              <strong>No published Miami-Dade gentlemen&apos;s-club packages are active at this moment.</strong>
              <p>
                FLLM will populate this page as qualifying Miami-Dade Gentlemen&apos;s Club Market Views or authorized
                Featured Broker Listings are published.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="fllm-template-section">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="What Full Liquor Means in Miami"
            title="The phrase “full liquor” is not the license class"
            copy={
              <p>
                Business-for-sale advertising often uses phrases such as full liquor, hard liquor or 4COP. FLLM keeps
                the actual Florida license structure visible because a transferable 4COP quota license is economically
                and legally different from a premises-dependent restaurant license.
              </p>
            }
            align="center"
          />

          <FllmCardGrid columns={3}>
            <FllmCard eyebrow="Transferable Asset" title="4COP Quota" variant="gold">
              <p>
                A county-limited transferable full-liquor license that can represent a material asset within a
                Miami-Dade business acquisition. Transfer remains subject to DBPR/ABT approval.
              </p>
              <div className="fllm-ui-actions">
                <FllmButton href="/license-types/gentlemens-clubs-4cop-quota" variant="outline">Gentlemen&apos;s Club 4COP Guide</FllmButton>
              </div>
            </FllmCard>
            <FllmCard eyebrow="Operating Business" title="Club Package" variant="gold">
              <p>
                The business price may include operations, goodwill, furniture, fixtures, equipment, leasehold rights,
                branding and other negotiated assets in addition to the liquor-license component.
              </p>
              <div className="fllm-ui-actions">
                <FllmButton href="/businesses-with-quota-licenses/gentlemens-clubs" variant="outline">Florida Club Packages</FllmButton>
              </div>
            </FllmCard>
            <FllmCard eyebrow="Separate Approval" title="Adult-Use / Zoning" variant="gold">
              <p>
                A liquor license does not itself authorize adult entertainment at a premises. Local land-use,
                distance, occupancy, entertainment and operating rules must be reviewed independently.
              </p>
              <div className="fllm-ui-actions">
                <FllmButton href="/resources/liquor-license-attorneys" variant="outline">Attorney Resources</FllmButton>
              </div>
            </FllmCard>
          </FllmCardGrid>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--deep">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Miami-Dade Search Coverage"
            title="Miami, Miami Beach and the county-wide quota-license market"
            copy={
              <p>
                Buyers may search by Miami, Miami Beach, Doral, North Miami or another municipality, but a transferable
                quota-license asset is tied to Miami-Dade County rather than a single city. This page therefore combines
                local buyer intent with the correct county-level liquor-license market.
              </p>
            }
            align="center"
          />
          <div className="fllm-ui-actions" style={{ justifyContent: "center" }}>
            <FllmButton href="/counties/miami-dade" variant="outline">Miami-Dade County Market</FllmButton>
            <FllmButton href="/counties/miami-dade/liquor-license-value" variant="outline">Miami-Dade License Value Guide</FllmButton>
            <FllmButton href="/florida-4cop-liquor-license-for-sale" variant="outline">Florida 4COP Quota Market</FllmButton>
          </div>
        </div>
      </section>

      <section className="fllm-template-section">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Common Questions"
            title="Miami gentlemen's clubs, full liquor and 4COP quota licenses"
            align="center"
          />
          <div className="fllm-ui-faq-grid fllm-ui-faq-grid--2">
            {faqs.map((faq) => (
              <details className="fllm-ui-faq" key={faq.question}>
                <summary>{faq.question}</summary>
                <div className="fllm-ui-faq-answer"><p>{faq.answer}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="fllm-ui-final-cta">
        <div className="fllm-template-shell">
          <div>
            <span className="fllm-template-eyebrow">Miami-Dade Business + License Market</span>
            <h2>Compare the Miami business package and its liquor-license component separately</h2>
            <p>
              Use FLLM to compare Miami-Dade gentlemen&apos;s-club opportunities, 4COP quota asking prices,
              license-market context and transaction resources without confusing the operating-business price
              with the standalone license value.
            </p>
          </div>
          <div className="fllm-ui-final-actions">
            <Link className="fllm-template-button" href="/gentlemens-clubs-for-sale-with-liquor-licenses">
              Statewide Gentlemen&apos;s Club Market
            </Link>
            <Link className="fllm-template-button fllm-template-button--outline" href="/contact">
              Contact FLLM
            </Link>
          </div>
        </div>
      </section>
    </FllmPageShell>
  );
}
