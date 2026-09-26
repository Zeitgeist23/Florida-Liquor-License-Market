import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import BusinessQuotaInventory from "@/components/BusinessQuotaInventory";
import FormsSiteHeader from "@/components/FormsSiteHeader";
import { FllmFaqGrid } from "@/components/FllmDesignSystem";
import {
  businessQuotaListings,
  FLLM_QUOTA_LISTING_OPERATING_RULES,
} from "@/lib/business-quota-listings";

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
    question: "Where can I find Florida restaurants for sale with liquor licenses?",
    answer: (
      <>
        Use FLLM's <Link href="/restaurants-with-liquor-licenses">Florida Restaurants For Sale With Liquor Licenses</Link>
        {" "}hub to compare restaurant opportunities involving 4COP quota, 4COP SFS / SRX, and 2COP beer-and-wine licenses.
      </>
    ),
  },
];

export const metadata: Metadata = {
  title: "Florida Businesses for Sale With 4COP & 3PS Quota Licenses",
  description:
    "Browse Florida operating businesses for sale with included 4COP or 3PS quota liquor licenses. These packages are separate from FLLM's standalone liquor-license inventory.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Businesses for Sale With Quota Liquor Licenses",
    description:
      "Operating businesses offered with included Florida 4COP or 3PS quota licenses, shown separately from standalone license inventory.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Florida Businesses With Quota Liquor Licenses",
    description: "Browse business acquisitions that include Florida 4COP or 3PS quota licenses.",
  },
};

export default function BusinessesWithQuotaLicensesPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Florida Businesses for Sale With Quota Liquor Licenses",
      url: canonicalUrl,
      description:
        "Operating Florida businesses for sale with included 4COP or 3PS quota liquor licenses, presented separately from standalone license inventory.",
      isPartOf: { "@type": "WebSite", name: "Florida Liquor License Market", url: siteUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Businesses With Quota Licenses", item: canonicalUrl },
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
              : item.question === "Where can I find Florida restaurants for sale with liquor licenses?"
                ? "Use FLLM's Florida Restaurants For Sale With Liquor Licenses hub to compare restaurant opportunities involving 4COP quota, 4COP SFS / SRX, and 2COP beer-and-wine licenses."
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
      name: "Florida businesses with included quota liquor licenses",
      numberOfItems: businessQuotaListings.length,
      itemListElement: businessQuotaListings.map((listing, index) => ({
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
            <Link href="/">Home</Link><span>›</span><strong>Businesses With Quota Licenses</strong>
          </div>
          <span className="business-quota-kicker">Separate Business Acquisition Inventory</span>
          <h1>Florida Businesses for Sale<br /><em>With Quota Liquor Licenses</em></h1>
          <p>
            This inventory is reserved for operating businesses whose sale includes a Florida 4COP or
            3PS quota liquor license. The package price represents the business acquisition; any stated
            license value is an allocated component and does not mean the license is offered separately.
          </p>
          <div className="business-quota-hero-actions">
            <Link className="business-quota-primary fllm-ui-official-gold-button" href="#business-inventory">View Business Packages</Link>
            <Link className="business-quota-secondary" href="/businesses-with-quota-licenses/bars">Bars + 4COP Packages</Link>
            <Link className="business-quota-secondary" href="/listings">View Standalone Quota Licenses</Link>
          </div>
        </div>
      </section>

      <section className="business-quota-inventory" id="business-inventory">
        <div className="business-quota-shell">
          <BusinessQuotaInventory listings={businessQuotaListings} />
        </div>
      </section>

      <section className="fllm-template-section business-quota-seo-section">
        <div className="business-quota-shell">
          <div className="fllm-ui-heading fllm-ui-heading--center">
            <div>
              <span className="fllm-template-eyebrow">4COP Business Types</span>
              <h2>Businesses With 4COP Quota Liquor Licenses in Florida</h2>
              <div className="fllm-ui-heading-copy">
                <p>
                  FLLM separates operating-business packages from standalone quota licenses so buyers can compare the
                  business opportunity and the included license without mixing the two markets.
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
            <Link className="fllm-ui-link-card" href="/license-types/gentlemens-clubs-4cop-quota">
              <strong>Gentlemen's Clubs & Nightlife</strong>
              <span>Review how 4COP quota licensing fits adult-entertainment and other nightlife transactions.</span>
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
