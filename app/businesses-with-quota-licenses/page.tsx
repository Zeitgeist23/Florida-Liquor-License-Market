import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import BusinessQuotaInventory from "@/components/BusinessQuotaInventory";
import FormsSiteHeader from "@/components/FormsSiteHeader";
import { FllmFaqGrid } from "@/components/FllmDesignSystem";
import {
  BUSINESS_LISTING_DISPLAY_LIMIT,
  businessQuotaListings,
  FLLM_QUOTA_LISTING_OPERATING_RULES,
} from "@/lib/business-quota-listings";
import { withMarketLicenseValues } from "@/lib/business-quota-market-values";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";

import "../fllm-official-template.css";
import "../fllm-design-system.css";
import "../listings/listings-premium.css";
import "./business-inventory.css";
import "./business-inventory-filters.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/businesses-with-quota-licenses`;


const businessQuotaFaqs = [
  {
    question: "What kinds of Florida businesses are sold with 4COP quota liquor licenses?",
    answer: (
      <>
        Bars, cocktail lounges, restaurants, nightclubs and other hospitality businesses may be offered with an included
        transferable 4COP quota license. FLLM keeps those business packages separate from standalone quota-license listings.
      </>
    ),
  },
  {
    question: "Is a 4COP quota license transferable when a Florida business is sold?",
    answer: (
      <>
        A 4COP quota license is a transferable county quota asset, but a sale still requires the applicable Florida DBPR /
        Division of Alcoholic Beverages and Tobacco transfer process, buyer qualification, premises review and other required approvals.
      </>
    ),
  },
  {
    question: "Is a 4COP quota license the same as a 4COP SFS / SRX restaurant license?",
    answer: (
      <>
        No. A 4COP quota license is a county-limited transferable quota asset. A 4COP SFS / SRX license is a
        qualification-based restaurant license tied to the qualifying operation and approved premises. FLLM lists those
        restaurant opportunities separately.
      </>
    ),
  },
  {
    question: "Where can I find Florida businesses for sale with liquor licenses?",
    answer: (
      <>
        FLLM's business marketplace is built for buyers searching for Florida businesses for sale with liquor licenses,
        including bars, restaurants, liquor stores, nightclubs and other hospitality businesses. Use the business inventory
        on this page to compare operating-business opportunities and the liquor-license component included with each package.
      </>
    ),
  },
];

export const metadata: Metadata = {
  title: "Florida Businesses for Sale With Liquor Licenses | FLLM",
  description:
    "Browse Florida businesses for sale with liquor licenses, including bars, restaurants, liquor stores, nightclubs and hospitality businesses with 4COP, 3PS and other license types.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Businesses for Sale With Liquor Licenses",
    description:
      "Browse operating Florida businesses for sale with liquor licenses, including bars, restaurants, liquor stores, nightclubs and other hospitality businesses.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Florida Businesses for Sale With Liquor Licenses",
    description: "Browse Florida operating businesses for sale with 4COP, 3PS and other liquor-license types.",
  },
};

export default async function BusinessesWithQuotaLicensesPage() {
  const standaloneListings = getVisibleAvailableMarketplaceListings(
    await getMarketplaceListings(),
  );
  const businessListingsWithValues = withMarketLicenseValues(
    businessQuotaListings,
    standaloneListings,
  );
  const structuredBusinessListings = businessListingsWithValues.slice(0, BUSINESS_LISTING_DISPLAY_LIMIT);
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Florida Businesses for Sale With Liquor Licenses",
      url: canonicalUrl,
      description:
        "Florida operating businesses for sale with liquor licenses, including bars, restaurants, liquor stores, nightclubs and hospitality businesses with included 4COP, 3PS and other license types.",
      isPartOf: { "@type": "WebSite", name: "Florida Liquor License Market", url: siteUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Businesses for Sale With Liquor Licenses", item: canonicalUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: businessQuotaFaqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            typeof item.answer === "string"
              ? item.answer
              : item.question === "Where can I find Florida businesses for sale with liquor licenses?"
                ? "FLLM publishes Florida businesses for sale with liquor licenses, including bars, restaurants, liquor stores, nightclubs and other hospitality businesses. Buyers can compare the operating business and the included liquor-license component in the separate business inventory."
                : item.question === "Is a 4COP quota license the same as a 4COP SFS / SRX restaurant license?"
                  ? "No. A 4COP quota license is a county-limited transferable quota asset. A 4COP SFS / SRX license is a qualification-based restaurant license tied to the qualifying operation and approved premises."
                  : item.question === "Is a 4COP quota license transferable when a Florida business is sold?"
                    ? "A 4COP quota license is a transferable county quota asset, but the transaction still requires the applicable Florida DBPR / Division of Alcoholic Beverages and Tobacco transfer process and approvals."
                    : "Bars, cocktail lounges, restaurants, nightclubs and other hospitality businesses may be offered with an included transferable 4COP quota license.",
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Florida businesses for sale with liquor licenses",
      numberOfItems: structuredBusinessListings.length,
      itemListElement: structuredBusinessListings.map((listing, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: listing.title,
        url: `${siteUrl}${listing.href}`,
      })),
    },
  ];

  return (
    <main className="business-quota-page fllm-official-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <div className="business-quota-header"><FormsSiteHeader /></div>

      <section className="business-quota-hero">
        <div className="business-quota-shell">
          <div className="business-quota-breadcrumbs">
            <Link href="/">Home</Link><span>›</span><strong>Businesses for Sale With Liquor Licenses</strong>
          </div>
          <span className="business-quota-kicker">Florida Operating Businesses + Liquor Licenses</span>
          <h1>Florida Businesses for Sale<br /><em>With Liquor Licenses</em></h1>
          <p>
            Browse Florida bars, restaurants, liquor stores, nightclubs and other operating businesses for sale with
            liquor licenses. FLLM separates these business acquisitions from standalone license inventory while showing
            the included 4COP, 3PS or other liquor-license component and available county market data.
          </p>
          <div className="business-quota-hero-actions">
            <Link className="business-quota-primary fllm-ui-official-gold-button" href="#business-inventory">View Business Packages</Link>
            <Link className="business-quota-secondary" href="/businesses-with-quota-licenses/bars">Bars + 4COP Packages</Link>
            <Link className="business-quota-secondary" href="/listings">View Standalone Quota Licenses</Link>
            <Link className="fllm-ui-link-card" href="/businesses-with-quota-licenses/gentlemens-clubs">
              <strong>Gentlemen's Clubs for Sale in Florida</strong>
              <span>Browse adult-entertainment business packages for sale, including opportunities with transferable 4COP quota licenses.</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="business-quota-inventory" id="business-inventory">
        <div className="business-quota-shell">
          <BusinessQuotaInventory listings={businessListingsWithValues} />
        </div>
      </section>

      <section className="fllm-template-section business-quota-seo-section">
        <div className="business-quota-shell">
          <div className="fllm-ui-heading fllm-ui-heading--center">
            <div>
              <span className="fllm-template-eyebrow">Operating Businesses for Sale</span>
              <h2>Florida Businesses for Sale With Liquor Licenses</h2>
              <div className="fllm-ui-heading-copy">
                <p>
                  FLLM publishes operating-business opportunities that include liquor licenses while keeping them separate
                  from standalone license inventory. Buyers can browse businesses by type, county and license classification,
                  then contact the listing broker or seller directly from the individual business page.
                </p>
              </div>
            </div>
          </div>

          <div className="fllm-ui-grid fllm-ui-grid--3">
            <Link className="fllm-ui-link-card" href="/businesses-with-quota-licenses/bars">
              <strong>Bars & Lounges</strong>
              <span>Browse Florida bar, lounge and nightlife packages that include transferable 4COP quota licenses.</span>
            </Link>
            <Link className="fllm-ui-link-card" href="/restaurants-with-liquor-licenses">
              <strong>Restaurants</strong>
              <span>Compare restaurant opportunities involving 4COP quota, 4COP SFS / SRX and 2COP licenses.</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--deep business-quota-faq-section">
        <div className="business-quota-shell">
          <div className="fllm-ui-heading fllm-ui-heading--center">
            <div>
              <span className="fllm-template-eyebrow">4COP Business Questions</span>
              <h2>Florida 4COP quota business FAQs</h2>
            </div>
          </div>
          <FllmFaqGrid items={businessQuotaFaqs} columns={2} />
        </div>
      </section>

      <section className="business-quota-explainer">
        <div className="business-quota-shell business-quota-explainer-grid">
          {FLLM_QUOTA_LISTING_OPERATING_RULES.map((rule) => (
            <article key={rule.classification}>
              <span>{rule.placement}</span>
              <h2>{rule.label}</h2>
              <p>{rule.description}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="business-quota-footer">
        <div className="business-quota-shell">
          <div><Link href="/" aria-label="Florida Liquor License Market home"><Image src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" width={130} height={53} /></Link><span>© Florida Liquor License Market</span></div>
          <nav aria-label="Footer navigation"><Link href="/listings">Standalone Licenses</Link><Link href="/businesses-with-quota-licenses">Business Packages</Link><Link href="/counties">Counties</Link><Link href="/contact">Contact</Link></nav>
        </div>
      </footer>
    </main>
  );
}
