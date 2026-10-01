import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import BusinessQuotaInventory from "@/components/BusinessQuotaInventory";
import FormsSiteHeader from "@/components/FormsSiteHeader";
import { FllmFaqGrid } from "@/components/FllmDesignSystem";
import {
  BUSINESS_LISTING_DISPLAY_LIMIT,
  businessMarketDisplayTitle,
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
    question: "What does “full liquor license” mean in a Florida business-for-sale listing?",
    answer: (
      <>
        “Full liquor” and “full liquor license” are common buyer, seller and business-broker terms for alcoholic-beverage
        privileges that include distilled spirits as well as beer and wine. In Florida, the exact license structure still matters:
        a transferable 4COP quota license is different from a location-specific 4COP SFS / SRX restaurant license. FLLM keeps
        the technical classification visible while also using the search language buyers commonly use.
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
    question: "Does FLLM broker the sale of operating businesses shown in its business marketplace?",
    answer: (
      <>
        No. Florida Liquor License Market is not a business broker and does not broker restaurants, bars, nightclubs,
        gentlemen&apos;s clubs or other operating businesses. Business sales remain with the owner and/or the independent
        licensed business broker representing the business. FLLM brokerage services are limited to standalone transferable
        4COP Quota and 3PS liquor licenses.
      </>
    ),
  },
  {
    question: "Where can I find Florida businesses for sale with liquor licenses?",
    answer: (
      <>
        FLLM's original business-market hub is built for buyers searching for Florida businesses for sale with liquor licenses,
        including bars, restaurants, liquor stores, nightclubs and other hospitality businesses. FLLM separates Featured broker
        listings from Market Views of observed business-and-license activity so buyers can compare county, business category,
        advertised asking price and liquor-license type without treating every Market View as an FLLM broker listing.
      </>
    ),
  },
];

export const metadata: Metadata = {
  title: "Florida Businesses for Sale With Liquor Licenses | FLLM",
  description:
    "Browse Florida businesses for sale with liquor licenses, including full-liquor bars, restaurants and nightclubs with 4COP quota or SFS/SRX licenses, plus 3PS and 2COP opportunities.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Businesses for Sale With Liquor Licenses",
    description:
      "Browse operating Florida businesses for sale with liquor licenses, including full-liquor bars, restaurants and nightclubs, plus 4COP, 3PS, SFS/SRX and 2COP license structures.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Florida Businesses for Sale With Liquor Licenses",
    description: "Browse Florida businesses for sale with full-liquor, 4COP, 3PS, SFS/SRX and other liquor-license types.",
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
        "Florida operating businesses for sale with liquor licenses, including full-liquor bars, restaurants and nightclubs with 4COP quota or SFS/SRX structures, plus 3PS and 2COP opportunities.",
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
                ? "FLLM provides an original Florida business-and-liquor-license market hub covering bars, restaurants, liquor stores, nightclubs and other hospitality businesses. Featured broker listings are identified separately from FLLM Market Views of observed market activity."
                : item.question === "What does “full liquor license” mean in a Florida business-for-sale listing?"
                  ? "Full liquor and full liquor license are common marketplace terms for privileges that include distilled spirits, beer and wine. In Florida, the exact license classification still matters because a transferable 4COP quota license differs from a location-specific 4COP SFS / SRX restaurant license."
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
        name: businessMarketDisplayTitle(listing),
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
            Search Florida bars, restaurants, liquor stores, nightclubs and other businesses for sale with liquor licenses.
            This FLLM-created market hub separates standalone license inventory, Featured broker listings and FLLM Market Views.
            Market Views summarize observed business-and-license activity using limited factual fields such as county,
            business category, advertised asking price and liquor-license type, while Featured listings are identified separately.
          </p>
          <div className="business-quota-hero-actions">
            <Link className="business-quota-primary fllm-ui-official-gold-button" href="#business-inventory">View Business Market</Link>
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
                  FLLM's original business-market pages are designed to capture buyer searches for Florida businesses for sale
                  with liquor licenses while keeping Market Views distinct from broker-authorized Featured listings. Buyers can
                  browse by business type, county and license classification, review county and license-market information, and
                  request FLLM information about the relevant license type without implying FLLM represents a Market View business.
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
          <nav aria-label="Footer navigation"><Link href="/listings">Standalone Licenses</Link><Link href="/businesses-with-quota-licenses">Business Market</Link><Link href="/counties">Counties</Link><Link href="/contact">Contact</Link></nav>
        </div>
      </footer>
    </main>
  );
}
