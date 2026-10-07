import type { Metadata } from "next";
import Link from "next/link";

import {
  FllmButton,
  FllmCard,
  FllmCardGrid,
  FllmDisclosure,
  FllmFaqGrid,
  FllmPageShell,
  FllmSectionHeading,
  FllmStepCard,
} from "@/components/FllmDesignSystem";

import "@/app/fllm-official-template.css";
import "@/app/fllm-design-system.css";
import "@/app/florida-quota-liquor-license-cost/header-footer-standard.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/buy-florida-restaurant`;

const faqs = [
  {
    question: "Can I use FLLM to find Florida restaurants for sale?",
    answer: (
      <p>
        Yes. FLLM organizes restaurant opportunities by county, business type and liquor-license structure so buyers can
        compare restaurant packages without treating every full-liquor opportunity as the same license type.
      </p>
    ),
  },
  {
    question: "Does FLLM represent the seller or broker the restaurant sale?",
    answer: (
      <p>
        No. Florida Liquor License Market is not a business broker and does not broker restaurants or other operating
        businesses. Restaurant and business-sale negotiations remain with the owner and/or the owner&apos;s licensed
        business broker. FLLM brokerage services are limited to standalone transferable 4COP Quota and 3PS liquor licenses.
      </p>
    ),
  },
  {
    question: "Does “full liquor license” always mean a 4COP Quota license?",
    answer: (
      <p>
        No. “Full liquor” is common marketplace language for privileges that include distilled spirits, but the underlying
        Florida license structure can differ. A transferable 4COP Quota license is not the same asset as a location-specific
        4COP SFS / SRX restaurant license.
      </p>
    ),
  },
  {
    question: "Can FLLM help me evaluate the liquor-license component of a restaurant purchase?",
    answer: (
      <p>
        Yes. FLLM provides county market data, liquor-license valuation and appraisal resources, financing information and
        transaction-support materials that can help buyers separate the license component from the operating-business price.
      </p>
    ),
  },
];

export const metadata: Metadata = {
  title: "Buy a Florida Restaurant | Restaurant + Liquor License Market | FLLM",
  description:
    "Buy a Florida restaurant through FLLM's restaurant market. Compare opportunities with 4COP quota, 4COP SFS/SRX, 2COP beer-and-wine and other liquor-license structures by county.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Buy a Florida Restaurant | FLLM",
    description:
      "A buyer-focused FLLM page for Florida restaurant opportunities with clear liquor-license classification, county market context and transaction resources.",
    siteName: "Florida Liquor License Market",
  },
};

export default function BuyFloridaRestaurantPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Buy a Florida Restaurant",
      url: canonicalUrl,
      description:
        "Buyer resources for Florida restaurant opportunities involving liquor licenses.",
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
        { "@type": "ListItem", position: 2, name: "Buy a Florida Restaurant", item: canonicalUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            faq.question === "Can I use FLLM to find Florida restaurants for sale?"
              ? "Yes. FLLM organizes restaurant opportunities by county, business type and liquor-license structure."
              : faq.question === "Does FLLM represent the seller or broker the restaurant sale?"
                ? "No. FLLM is not a business broker and does not broker restaurants or operating businesses. FLLM brokerage services are limited to standalone transferable 4COP Quota and 3PS liquor licenses."
                : faq.question === "Does “full liquor license” always mean a 4COP Quota license?"
                  ? "No. Full liquor is marketplace terminology; the actual Florida license structure may be a transferable 4COP Quota license or another full-liquor license category such as 4COP SFS / SRX."
                  : "Yes. FLLM provides county market data, valuation and appraisal resources, financing information and transaction-support materials for the liquor-license component.",
        },
      })),
    },
  ];

  return (
    <>
      <FllmPageShell className="buy-florida-restaurant-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
        />

        <section className="seo-market-hero">
          <div className="seo-market-shell">
            <div className="seo-market-hero-grid">
              <div>
                <div className="fllm-ui-breadcrumbs">
                  <Link href="/">Home</Link><span>›</span><strong>Buy a Florida Restaurant</strong>
                </div>
                <span className="seo-market-kicker">Florida Restaurant Buyer Marketplace</span>
                <h1 className="fllm-ui-hero-title--long">
                  Buy a Florida Restaurant <em>With the Liquor-License Structure Clearly Identified</em>
                </h1>
                <p>
                  Florida Liquor License Market helps buyers compare restaurant opportunities without mixing operating-business
                  prices with liquor-license value. Review the business, county market and actual license structure before
                  deciding which opportunities fit your acquisition strategy.
                </p>
                <div className="fllm-ui-actions">
                  <FllmButton href="/restaurants-with-liquor-licenses">Browse Restaurant Inventory</FllmButton>
                  <FllmButton href="/contact?inquiry=buy-florida-restaurant" variant="outline">Tell FLLM What You Want</FllmButton>
                </div>
              </div>

              <aside className="seo-market-snapshot sell-restaurant-license-snapshot" aria-label="Restaurant and liquor-license overview">
                <span>Restaurant + License Structure</span>
                <div className="seo-market-snapshot-grid">
                  <div><strong>4COP Quota</strong><small>Transferable county quota asset</small></div>
                  <div><strong>4COP SFS / SRX</strong><small>Qualifying restaurant + premises</small></div>
                  <div><strong>2COP</strong><small>Beer-and-wine operating privileges</small></div>
                  <div><strong>FLLM</strong><small>Business + license market context</small></div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="fllm-template-section sell-restaurant-intro-cards">
          <div className="fllm-template-shell">
            <FllmSectionHeading
              eyebrow="Built for Florida Restaurant Buyers"
              title="Compare the business opportunity and liquor-license structure separately"
              copy={
                <p>
                  FLLM organizes restaurant opportunities so buyers can distinguish transferable quota-license value from
                  location-specific restaurant privileges and beer-and-wine licenses.
                </p>
              }
            />

            <FllmCardGrid columns={3}>
              <FllmCard eyebrow="Restaurant Buyers" title="Search by business type and county" variant="gold">
                <p>
                  Review restaurant opportunities across Florida and compare business type, asking price, county and license
                  structure in one marketplace.
                </p>
              </FllmCard>
              <FllmCard eyebrow="County Market Data" title="Understand the local license market" variant="gold">
                <p>
                  Use FLLM county data to see how standalone quota-license asking prices and availability compare with the
                  restaurant package you are evaluating.
                </p>
              </FllmCard>
              <FllmCard eyebrow="License Clarity" title="Know what “full liquor” actually means" variant="gold">
                <p>
                  FLLM identifies whether the opportunity uses a transferable 4COP Quota license, a 4COP SFS / SRX license,
                  a 2COP license or another structure.
                </p>
              </FllmCard>
            </FllmCardGrid>
          </div>
        </section>

        <section className="fllm-template-section fllm-template-section--deep sell-restaurant-license-type-cards">
          <div className="fllm-template-shell">
            <FllmSectionHeading
              eyebrow="Florida Restaurant License Types"
              title="Choose the restaurant opportunity with the right liquor-license structure"
              copy={
                <p>
                  The license type can materially affect transferability, flexibility and value. FLLM keeps these categories
                  distinct throughout the restaurant marketplace.
                </p>
              }
            />

            <FllmCardGrid columns={3}>
              <FllmCard eyebrow="Transferable Quota Asset" title="4COP Quota" variant="gold">
                <p>
                  A county-limited transferable full-liquor quota license that may carry independent market value apart from
                  the operating restaurant.
                </p>
                <p><Link href="/license-types/4cop-quota">4COP Quota guide →</Link></p>
              </FllmCard>
              <FllmCard eyebrow="Qualifying Restaurant License" title="4COP SFS / SRX" variant="gold">
                <p>
                  A full-liquor restaurant license tied to a qualifying food-service operation and approved premises rather
                  than a freestanding quota asset.
                </p>
                <p><Link href="/license-types/4cop-sfs-restaurant">4COP SFS / SRX guide →</Link></p>
              </FllmCard>
              <FllmCard eyebrow="Beer & Wine" title="2COP" variant="gold">
                <p>
                  A non-quota beer-and-wine license for restaurant concepts that do not require distilled-spirit privileges.
                </p>
                <p><Link href="/license-types/2cop-beer-wine">2COP guide →</Link></p>
              </FllmCard>
            </FllmCardGrid>
          </div>
        </section>

        <section className="fllm-template-section fllm-template-section--gradient" id="buyer-options">
          <div className="fllm-template-shell">
            <FllmSectionHeading
              eyebrow="Choose Your Buyer Path"
              title="Browse now or tell FLLM what you are looking for"
              copy={<p>Use the current inventory or register your county, restaurant and liquor-license interests.</p>}
            />

            <div className="fllm-ui-grid fllm-ui-grid--2">
              <FllmStepCard
                eyebrow="Browse Current Opportunities"
                title="Explore Florida restaurant inventory"
                actions={<FllmButton href="/restaurants-with-liquor-licenses">Browse Restaurant Inventory</FllmButton>}
              >
                <p>
                  Review current restaurant opportunities across 4COP Quota, 4COP SFS / SRX and 2COP categories and compare
                  the business package with FLLM county market information.
                </p>
              </FllmStepCard>

              <FllmStepCard
                eyebrow="Buyer Interest"
                title="Tell FLLM what you want to buy"
                actions={<FllmButton href="/contact?inquiry=buy-florida-restaurant">Submit Buyer Interest</FllmButton>}
              >
                <p>
                  Share your preferred counties, restaurant types, license structure and price range so FLLM can better match
                  your interest to the market information and opportunities available on the platform.
                </p>
              </FllmStepCard>
            </div>

            <FllmDisclosure>
              <strong>FLLM marketplace role:</strong> Florida Liquor License Market is not a business broker and does not
              broker restaurants or other operating businesses. Business-sale inquiries are handled by the restaurant owner
              and/or the independent business broker identified on an authorized Featured Listing. FLLM brokerage services
              are limited to standalone transferable 4COP Quota and 3PS liquor licenses.
            </FllmDisclosure>
          </div>
        </section>

        <section className="fllm-template-section fllm-template-section--deep sell-restaurant-services-block">
          <div className="fllm-template-shell">
            <FllmSectionHeading
              eyebrow="Buyer Transaction Resources"
              title="Evaluate the liquor-license side before you buy"
              align="center"
            />
            <FllmCardGrid columns={4}>
              <FllmCard eyebrow="01" title="License Value">
                <p>Compare county pricing and estimate the potential value of a transferable quota-license component.</p>
                <p><Link href="/florida-liquor-license-value">Value resources →</Link></p>
              </FllmCard>
              <FllmCard eyebrow="02" title="Appraisal">
                <p>Use a formal liquor-license appraisal when acquisition financing or purchase-price allocation needs support.</p>
                <p><Link href="/florida-liquor-license-appraisal">Appraisal services →</Link></p>
              </FllmCard>
              <FllmCard eyebrow="03" title="Transfer Resources">
                <p>Review ABT forms, transfer requirements and diligence resources before relying on a license transfer.</p>
                <p><Link href="/resources/application-center">Application center →</Link></p>
              </FllmCard>
              <FllmCard eyebrow="04" title="Financing">
                <p>Explore financing resources for restaurant acquisitions where liquor-license value is part of the transaction.</p>
                <p><Link href="/financing">Financing resources →</Link></p>
              </FllmCard>
            </FllmCardGrid>
          </div>
        </section>

        <section className="fllm-template-section fllm-template-section--deep">
          <div className="fllm-template-shell">
            <FllmSectionHeading
              eyebrow="Buyer Questions"
              title="Buying a Florida restaurant through the FLLM market"
            />
            <FllmFaqGrid items={faqs} columns={2} />
          </div>
        </section>

        <section className="fllm-ui-final-cta">
          <div className="fllm-template-shell">
            <div>
              <span className="fllm-template-eyebrow">Florida Restaurant Market</span>
              <h2>Ready to explore Florida restaurant opportunities?</h2>
              <p>
                Browse current inventory or tell FLLM the county, restaurant type and liquor-license structure you are targeting.
              </p>
            </div>
            <div className="fllm-ui-final-actions">
              <FllmButton href="/restaurants-with-liquor-licenses">Browse Restaurant Inventory</FllmButton>
              <FllmButton href="/contact?inquiry=buy-florida-restaurant" variant="outline">Submit Buyer Interest</FllmButton>
            </div>
          </div>
        </section>
      </FllmPageShell>

      <footer className="directory-footer sell-license-page-footer official-directory-footer">
        <div className="directory-shell">
          <div className="directory-footer-brand">
            <Link href="/" aria-label="Florida Liquor License Market home">
              <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" width="130" height="53" />
            </Link>
            <span>© Florida Liquor License Market</span>
            <a
              className="fllm-footer-phone"
              data-fllm-footer-phone="true"
              href="tel:+14075895522"
              aria-label="Call Florida Liquor License Market at 407 589 5522"
            >
              (407) 589-5522
            </a>
          </div>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/florida-4cop-liquor-license-for-sale">4COP</Link>
            <Link href="/florida-3ps-liquor-license-for-sale">3PS</Link>
            <Link href="/listings">Listings</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
