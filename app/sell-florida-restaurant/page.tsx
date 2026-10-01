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
const canonicalUrl = `${siteUrl}/sell-florida-restaurant`;

const faqs = [
  {
    question: "Can I advertise a Florida restaurant for sale through FLLM?",
    answer: (
      <p>
        FLLM accepts restaurant-business opportunities where the alcoholic-beverage license is an important part of the
        sale or operating structure. The listing should identify the actual Florida license type, such as a transferable
        4COP quota license, a location-specific 4COP SFS / SRX license, or a 2COP beer-and-wine license.
      </p>
    ),
  },
  {
    question: "Does FLLM act as the business broker for my restaurant?",
    answer: (
      <p>
        Not merely because a restaurant appears on FLLM. FLLM provides marketplace advertising, liquor-license market
        information, valuation, financing and transaction-support resources. A separate written agreement would be
        required for any professional representation that is lawfully offered; otherwise the restaurant owner or the
        owner&apos;s business broker remains responsible for the business sale.
      </p>
    ),
  },
  {
    question: "Can a business broker list a restaurant on FLLM?",
    answer: (
      <p>
        Yes. Featured third-party broker listings identify the broker and brokerage, present the business-and-license
        package in the approved FLLM format, and direct buyer inquiries to the listing broker.
      </p>
    ),
  },
  {
    question: "Why does FLLM separate the liquor-license type from the restaurant asking price?",
    answer: (
      <p>
        Different Florida license structures have very different transferability and value characteristics. A 4COP quota
        license may have an independent county market value, while a 4COP SFS / SRX or 2COP license is not the same
        transferable quota asset. Keeping those distinctions visible helps buyers, sellers and lenders evaluate the
        transaction correctly.
      </p>
    ),
  },
];

export const metadata: Metadata = {
  title: "Sell a Florida Restaurant | Restaurant + Liquor License Listings | FLLM",
  description:
    "Sell or advertise a Florida restaurant through FLLM. Restaurant owners and brokers can present businesses with 4COP quota, 4COP SFS/SRX, 2COP beer-and-wine and other liquor-license structures.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Sell a Florida Restaurant | FLLM",
    description:
      "A seller-focused FLLM page for Florida restaurant owners and business brokers whose transactions include liquor-license considerations.",
    siteName: "Florida Liquor License Market",
  },
};

export default function SellFloridaRestaurantPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Sell a Florida Restaurant",
      url: canonicalUrl,
      description:
        "Seller and broker resources for Florida restaurant transactions involving liquor licenses.",
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
        { "@type": "ListItem", position: 2, name: "Sell a Florida Restaurant", item: canonicalUrl },
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
            faq.question === "Can I advertise a Florida restaurant for sale through FLLM?"
              ? "FLLM accepts restaurant-business opportunities where the alcoholic-beverage license is an important part of the sale or operating structure, with the actual Florida license type identified."
              : faq.question === "Does FLLM act as the business broker for my restaurant?"
                ? "Not merely because a restaurant appears on FLLM. FLLM provides marketplace advertising and liquor-license resources; any professional representation requires a separate lawful written agreement."
                : faq.question === "Can a business broker list a restaurant on FLLM?"
                  ? "Yes. Featured third-party broker listings identify the broker and brokerage and direct buyer inquiries to the listing broker."
                  : "FLLM separates license type and license-market information because Florida liquor-license structures differ significantly in transferability and value.",
        },
      })),
    },
  ];

  return (
    <>
      <FllmPageShell className="sell-florida-restaurant-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
        />

        <section className="seo-market-hero">
          <div className="seo-market-shell">
            <div className="seo-market-hero-grid">
              <div>
                <div className="fllm-ui-breadcrumbs">
                  <Link href="/">Home</Link><span>›</span><strong>Sell a Florida Restaurant</strong>
                </div>
                <span className="seo-market-kicker">Florida Restaurant Seller & Broker Marketplace</span>
                <h1 className="fllm-ui-hero-title--long">
                  Sell a Florida Restaurant <em>With the Liquor-License Details Buyers Need</em>
                </h1>
                <p>
                  Florida Liquor License Market gives restaurant owners and business brokers a focused place to present
                  restaurant opportunities where the liquor license matters to the transaction. FLLM keeps the operating
                  business, the license type and the liquor-license market context clearly separated so buyers can understand
                  what is actually being offered.
                </p>
                <div className="fllm-ui-actions">
                  <FllmButton href="/contact?inquiry=sell-florida-restaurant">Submit a Restaurant Opportunity</FllmButton>
                  <FllmButton href="/restaurants-with-liquor-licenses" variant="outline">View Restaurant Market</FllmButton>
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

        <section className="fllm-template-section">
          <div className="fllm-template-shell">
            <FllmSectionHeading
              eyebrow="Built for Florida Restaurant Transactions"
              title="Present the restaurant business and liquor-license component clearly"
              copy={
                <p>
                  Restaurant buyers often search for “full liquor,” “full liquor license,” “4COP,” “beer and wine,” or
                  simply a restaurant for sale. FLLM uses that marketplace language while still identifying the actual
                  Florida license structure and whether the license has independent quota value.
                </p>
              }
            />

            <FllmCardGrid columns={3}>
              <FllmCard eyebrow="Restaurant Owners" title="Reach buyers looking for restaurant opportunities" variant="gold">
                <p>
                  Present the business, asking price, restaurant concept and liquor-license structure without turning the
                  license into an afterthought.
                </p>
              </FllmCard>
              <FllmCard eyebrow="Business Brokers" title="Add a broker-authorized Featured Listing" variant="gold">
                <p>
                  Keep the broker relationship visible. Featured Broker Listings identify the listing broker and route
                  business-sale inquiries to that broker.
                </p>
              </FllmCard>
              <FllmCard eyebrow="Liquor-License Market Data" title="Show the license component in context" variant="gold">
                <p>
                  FLLM county market data can help distinguish the liquor-license component from goodwill, equipment,
                  leasehold rights and the rest of the restaurant package.
                </p>
              </FllmCard>
            </FllmCardGrid>
          </div>
        </section>

        <section className="fllm-template-section fllm-template-section--deep">
          <div className="fllm-template-shell">
            <FllmSectionHeading
              eyebrow="Florida Restaurant License Types"
              title="Not every restaurant with “full liquor” has the same license"
              copy={
                <p>
                  FLLM preserves the technical distinction that matters to buyers, sellers and lenders while still matching
                  the terminology commonly used in restaurant-for-sale advertising.
                </p>
              }
            />

            <FllmCardGrid columns={3}>
              <FllmCard eyebrow="Transferable Quota Asset" title="4COP Quota" variant="gold">
                <p>
                  A county-limited transferable full-liquor quota license commonly associated with restaurants, bars,
                  lounges and nightlife concepts. The license can have a market value separate from the operating business.
                </p>
                <p><Link href="/license-types/4cop-quota">4COP Quota guide →</Link></p>
              </FllmCard>
              <FllmCard eyebrow="Qualifying Restaurant License" title="4COP SFS / SRX" variant="gold">
                <p>
                  A full-liquor restaurant license tied to the qualifying food-service operation and approved premises.
                  It is not the same freestanding transferable county quota asset as a standard 4COP quota license.
                </p>
                <p><Link href="/license-types/4cop-sfs-restaurant">4COP SFS / SRX guide →</Link></p>
              </FllmCard>
              <FllmCard eyebrow="Beer & Wine" title="2COP" variant="gold">
                <p>
                  A non-quota beer-and-wine license that may fit restaurants that do not require distilled-spirit
                  privileges. FLLM keeps these opportunities separate from full-liquor restaurant inventory.
                </p>
                <p><Link href="/license-types/2cop-beer-wine">2COP guide →</Link></p>
              </FllmCard>
            </FllmCardGrid>
          </div>
        </section>

        <section className="fllm-template-section fllm-template-section--gradient" id="seller-options">
          <div className="fllm-template-shell">
            <FllmSectionHeading
              eyebrow="Choose the Right Listing Path"
              title="Restaurant owner or business broker?"
              copy={<p>FLLM keeps the seller path and broker-authorized advertising path distinct.</p>}
            />

            <div className="fllm-ui-grid fllm-ui-grid--2">
              <FllmStepCard
                eyebrow="Restaurant Owner / Seller"
                title="Tell FLLM what you are selling"
                actions={<FllmButton href="/contact?inquiry=restaurant-owner">Submit Restaurant Details</FllmButton>}
              >
                <p>
                  Start with the restaurant concept, county, asking price and current liquor-license type. FLLM can then
                  determine the appropriate marketplace and liquor-license presentation.
                </p>
              </FllmStepCard>

              <FllmStepCard
                eyebrow="Licensed Business Broker"
                title="Create a Featured Broker Listing"
                actions={<FllmButton href="/brokers/list-your-license">Broker Listing Options</FllmButton>}
              >
                <p>
                  Featured Broker Listings preserve the broker&apos;s identity, brokerage, contact information and buyer
                  routing while adding FLLM&apos;s liquor-license presentation and market context.
                </p>
              </FllmStepCard>
            </div>

            <FllmDisclosure>
              <strong>FLLM marketplace role:</strong> Florida Liquor License Market is not holding itself out as the
              business broker for every restaurant displayed on the platform. Market Views provide market intelligence;
              broker-authorized Featured Listings identify the broker representing the business. Any separate professional
              representation requires the appropriate written engagement.
            </FllmDisclosure>
          </div>
        </section>

        <section className="fllm-template-section fllm-template-section--deep sell-restaurant-services-block">
          <div className="fllm-template-shell">
            <FllmSectionHeading
              eyebrow="Beyond the Restaurant Advertisement"
              title="Support the liquor-license side of the transaction"
              align="center"
            />
            <FllmCardGrid columns={4}>
              <FllmCard eyebrow="01" title="License Value">
                <p>Review county pricing and the potential value of a transferable quota-license component.</p>
                <p><Link href="/florida-liquor-license-value">Value resources →</Link></p>
              </FllmCard>
              <FllmCard eyebrow="02" title="Appraisal">
                <p>Use a formal liquor-license appraisal when lenders, transaction parties or advisers need support.</p>
                <p><Link href="/florida-liquor-license-appraisal">Appraisal services →</Link></p>
              </FllmCard>
              <FllmCard eyebrow="03" title="Transfer Resources">
                <p>Review ABT forms, transfer requirements and transaction-support resources.</p>
                <p><Link href="/resources/application-center">Application center →</Link></p>
              </FllmCard>
              <FllmCard eyebrow="04" title="Financing">
                <p>Explore financing resources where liquor-license value is part of the acquisition or refinance.</p>
                <p><Link href="/financing">Financing resources →</Link></p>
              </FllmCard>
            </FllmCardGrid>
          </div>
        </section>

        <section className="fllm-template-section fllm-template-section--deep">
          <div className="fllm-template-shell">
            <FllmSectionHeading
              eyebrow="Seller & Broker Questions"
              title="Selling a Florida restaurant through FLLM"
            />
            <FllmFaqGrid items={faqs} columns={2} />
          </div>
        </section>

        <section className="fllm-ui-final-cta">
          <div className="fllm-template-shell">
            <div>
              <span className="fllm-template-eyebrow">Florida Restaurant Market</span>
              <h2>Ready to present a Florida restaurant opportunity?</h2>
              <p>
                Start with the restaurant and license details. FLLM will keep the business opportunity and liquor-license
                structure clearly identified.
              </p>
            </div>
            <div className="fllm-ui-final-actions">
              <FllmButton href="/contact?inquiry=sell-florida-restaurant">Submit Restaurant Opportunity</FllmButton>
              <FllmButton href="/restaurants-with-liquor-licenses" variant="outline">Browse Restaurant Inventory</FllmButton>
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
