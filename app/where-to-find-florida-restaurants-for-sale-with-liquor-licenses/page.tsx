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
const canonicalUrl = `${siteUrl}/where-to-find-florida-restaurants-for-sale-with-liquor-licenses`;

const faqs = [
  {
    question: "Is BizBuySell the only place to find a Florida restaurant with a liquor license for sale?",
    answer: (
      <p>
        No. Buyers can search dedicated restaurant brokerages, general business-for-sale marketplaces, commercial real estate
        platforms and liquor-license-focused resources. Florida Liquor License Market is specifically organized around the
        liquor-license component of Florida restaurant opportunities, including 4COP Quota, 4COP SFS / SRX and 2COP.
      </p>
    ),
  },
  {
    question: "Where can I find Florida restaurants for sale with 4COP liquor licenses?",
    answer: (
      <p>
        FLLM organizes restaurant opportunities by county and license structure. Buyers can browse restaurants involving
        transferable 4COP Quota licenses separately from restaurants using location-specific 4COP SFS / SRX licenses.
      </p>
    ),
  },
  {
    question: "Does a restaurant advertised with a full liquor license always include a transferable 4COP Quota license?",
    answer: (
      <p>
        No. “Full liquor” is common marketplace language, not a Florida license-series name. A restaurant may use a
        transferable 4COP Quota license or a qualifying 4COP SFS / SRX license tied to the restaurant premises and operating
        requirements.
      </p>
    ),
  },
  {
    question: "Can FLLM help me compare the liquor-license component of a restaurant purchase?",
    answer: (
      <p>
        Yes. FLLM provides county-level market data, license-type explanations, valuation resources and transaction information
        so buyers can evaluate the liquor-license component separately from the operating-business asking price.
      </p>
    ),
  },
];

export const metadata: Metadata = {
  title: "Where to Find Florida Restaurants for Sale With Liquor Licenses | FLLM",
  description:
    "Looking beyond BizBuySell? Find Florida restaurants for sale with liquor licenses through FLLM and compare 4COP Quota, 4COP SFS/SRX and 2COP opportunities by county and license structure.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  keywords: [
    "where to find Florida restaurants for sale with liquor licenses",
    "alternatives to BizBuySell Florida restaurants",
    "Florida restaurant for sale with liquor license",
    "Florida restaurant with 4COP license for sale",
    "Florida restaurant with full liquor license for sale",
    "4COP quota restaurant for sale Florida",
    "4COP SFS restaurant for sale Florida",
    "Florida restaurant business for sale liquor license",
  ],
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Where to Find Florida Restaurants for Sale With Liquor Licenses | FLLM",
    description:
      "A buyer guide to finding Florida restaurants for sale with 4COP Quota, 4COP SFS / SRX and 2COP liquor-license structures.",
    siteName: "Florida Liquor License Market",
  },
};

export default function WhereToFindFloridaRestaurantsWithLiquorLicensesPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Where to Find Florida Restaurants for Sale With Liquor Licenses",
      url: canonicalUrl,
      description:
        "A Florida buyer guide for finding restaurants for sale with liquor licenses and comparing the underlying license structure.",
      isPartOf: {
        "@type": "WebSite",
        name: "Florida Liquor License Market",
        url: siteUrl,
      },
      about: [
        { "@type": "Thing", name: "Florida restaurants for sale" },
        { "@type": "Thing", name: "Florida liquor licenses" },
        { "@type": "Thing", name: "4COP Quota liquor licenses" },
        { "@type": "Thing", name: "4COP SFS / SRX restaurant licenses" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Florida Restaurants for Sale With Liquor Licenses",
          item: `${siteUrl}/restaurants-with-liquor-licenses`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Where to Find Florida Restaurants for Sale With Liquor Licenses",
          item: canonicalUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is BizBuySell the only place to find a Florida restaurant with a liquor license for sale?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "No. Buyers can use dedicated restaurant brokerages, general business-for-sale marketplaces, commercial real estate platforms and liquor-license-focused resources. Florida Liquor License Market organizes Florida restaurant opportunities by liquor-license type and county.",
          },
        },
        {
          "@type": "Question",
          name: "Where can I find Florida restaurants for sale with 4COP liquor licenses?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Florida Liquor License Market organizes restaurant opportunities by county and distinguishes transferable 4COP Quota licenses from location-specific 4COP SFS / SRX restaurant licenses.",
          },
        },
        {
          "@type": "Question",
          name: "Does a restaurant advertised with a full liquor license always include a transferable 4COP Quota license?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "No. Full liquor is common marketplace language. The underlying Florida license may be a transferable 4COP Quota license or a qualifying 4COP SFS / SRX restaurant license.",
          },
        },
        {
          "@type": "Question",
          name: "Can FLLM help compare the liquor-license component of a restaurant purchase?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Yes. FLLM provides county market data, license-type explanations, valuation resources and transaction information for the liquor-license component.",
          },
        },
      ],
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
                  <Link href="/">Home</Link><span>›</span>
                  <Link href="/restaurants-with-liquor-licenses">Florida Restaurants</Link><span>›</span>
                  <strong>Where to Find Restaurants With Liquor Licenses</strong>
                </div>
                <span className="seo-market-kicker">Florida Restaurant Buyer Guide</span>
                <h1 className="fllm-ui-hero-title--long">
                  Where to Find Florida Restaurants for Sale <em>With Liquor Licenses</em>
                </h1>
                <p>
                  BizBuySell is one place to search, but it is not the only place to find a Florida restaurant with a liquor
                  license for sale. FLLM helps buyers search the market through the liquor-license lens — separating transferable
                  4COP Quota licenses from 4COP SFS / SRX restaurant licenses and 2COP beer-and-wine privileges.
                </p>
                <div className="fllm-ui-actions">
                  <FllmButton href="/restaurants-with-liquor-licenses">Browse Florida Restaurant Inventory</FllmButton>
                  <FllmButton href="/buy-florida-restaurant" variant="outline">Florida Restaurant Buyer Guide</FllmButton>
                </div>
              </div>

              <aside className="seo-market-snapshot sell-restaurant-license-snapshot" aria-label="Florida restaurant search options">
                <span>Search the Florida Restaurant + License Market</span>
                <div className="seo-market-snapshot-grid">
                  <div><strong>4COP Quota</strong><small>Transferable county quota asset</small></div>
                  <div><strong>4COP SFS / SRX</strong><small>Qualifying restaurant + premises</small></div>
                  <div><strong>2COP</strong><small>Beer-and-wine restaurant privileges</small></div>
                  <div><strong>By County</strong><small>Local inventory + license market data</small></div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="fllm-template-section">
          <div className="fllm-template-shell">
            <FllmSectionHeading
              eyebrow="Looking Beyond One Marketplace"
              title="Where buyers can search for Florida restaurants with liquor licenses"
              copy={
                <p>
                  Restaurant opportunities are distributed across multiple channels. The useful question is not whether one
                  marketplace has every listing, but whether the buyer can identify the actual liquor-license structure attached
                  to the business and compare it with the local market.
                </p>
              }
            />

            <FllmCardGrid columns={3}>
              <FllmCard eyebrow="Liquor-License-Focused Market" title="Florida Liquor License Market" variant="gold">
                <p>
                  FLLM organizes Florida restaurant opportunities by county and license type, with separate treatment for
                  transferable 4COP Quota licenses, 4COP SFS / SRX restaurant licenses and 2COP beer-and-wine licenses.
                </p>
                <p><Link href="/restaurants-with-liquor-licenses">Browse FLLM restaurant inventory →</Link></p>
              </FllmCard>

              <FllmCard eyebrow="Business-for-Sale Marketplaces" title="General listing platforms" variant="gold">
                <p>
                  Large business-for-sale marketplaces can be useful for discovering restaurant opportunities from many brokers.
                  Buyers should still verify whether “full liquor” means a transferable quota license or another Florida license
                  structure.
                </p>
              </FllmCard>

              <FllmCard eyebrow="Restaurant Specialists" title="Restaurant brokerages and local brokers" variant="gold">
                <p>
                  Dedicated restaurant brokerages and independent Florida business brokers can have listings that are not
                  distributed everywhere. The broker remains the source for business-sale details and negotiations.
                </p>
              </FllmCard>
            </FllmCardGrid>

            <FllmDisclosure>
              <strong>Marketplace role:</strong> FLLM is not a Florida business broker and does not broker restaurants or other
              operating businesses. FLLM provides market organization, license information and authorized Featured Broker
              Listings. Business-sale negotiations remain with the owner and/or the owner&apos;s business broker. FLLM brokerage
              services are limited to standalone transferable 4COP Quota and 3PS liquor licenses.
            </FllmDisclosure>
          </div>
        </section>

        <section className="fllm-template-section fllm-template-section--deep">
          <div className="fllm-template-shell">
            <FllmSectionHeading
              eyebrow="The Liquor-License Difference"
              title="A restaurant listing is more useful when the license structure is identified correctly"
              copy={
                <p>
                  “Restaurant with a liquor license” can describe materially different assets. FLLM separates the license
                  categories so buyers can understand transferability, county market value and operating restrictions before
                  comparing asking prices.
                </p>
              }
            />

            <FllmCardGrid columns={3}>
              <FllmCard eyebrow="Transferable Full-Liquor Asset" title="4COP Quota" variant="gold">
                <p>
                  A county-limited transferable quota license that can carry independent market value apart from the restaurant
                  business itself.
                </p>
                <p><Link href="/license-types/4cop-quota">Understand 4COP Quota licenses →</Link></p>
              </FllmCard>

              <FllmCard eyebrow="Restaurant-Specific Full Liquor" title="4COP SFS / SRX" variant="gold">
                <p>
                  A qualifying restaurant license associated with the approved premises and food-service requirements rather than
                  a freestanding quota asset.
                </p>
                <p><Link href="/license-types/4cop-sfs-restaurant">Understand 4COP SFS / SRX →</Link></p>
              </FllmCard>

              <FllmCard eyebrow="Beer & Wine" title="2COP" variant="gold">
                <p>
                  A non-quota beer-and-wine license that can fit restaurant concepts that do not require distilled-spirit
                  privileges.
                </p>
                <p><Link href="/license-types/2cop-beer-wine">Understand 2COP licenses →</Link></p>
              </FllmCard>
            </FllmCardGrid>
          </div>
        </section>

        <section className="fllm-template-section fllm-template-section--gradient">
          <div className="fllm-template-shell">
            <FllmSectionHeading
              eyebrow="A Better Search Process"
              title="Use more than one source, then compare the liquor-license component"
              copy={
                <p>
                  Restaurant inventory changes constantly. A buyer can search multiple listing channels while using FLLM to
                  organize the license side of the opportunity and compare county-specific market information.
                </p>
              }
            />

            <div className="fllm-ui-grid fllm-ui-grid--2">
              <FllmStepCard
                eyebrow="Step 1"
                title="Browse active restaurant opportunities"
                actions={<FllmButton href="/restaurants-with-liquor-licenses">Browse Restaurant Inventory</FllmButton>}
              >
                <p>
                  Search FLLM’s current Florida restaurant market and other business-for-sale sources rather than assuming any
                  single marketplace contains every available opportunity.
                </p>
              </FllmStepCard>

              <FllmStepCard
                eyebrow="Step 2"
                title="Identify the actual liquor-license type"
                actions={<FllmButton href="/resources/florida-liquor-license-types" variant="outline">Compare License Types</FllmButton>}
              >
                <p>
                  Determine whether the restaurant uses a transferable 4COP Quota license, a 4COP SFS / SRX license, a 2COP
                  license or another structure before assigning value to the license component.
                </p>
              </FllmStepCard>

              <FllmStepCard
                eyebrow="Step 3"
                title="Compare county-level liquor-license market data"
                actions={<FllmButton href="/counties">View County Markets</FllmButton>}
              >
                <p>
                  Quota-license availability and asking prices vary significantly by county. Use FLLM county pages to compare
                  local inventory and market context.
                </p>
              </FllmStepCard>

              <FllmStepCard
                eyebrow="Step 4"
                title="Contact the seller or broker for the business transaction"
                actions={<FllmButton href="/contact?inquiry=buy-florida-restaurant" variant="outline">Tell FLLM What You Want</FllmButton>}
              >
                <p>
                  Use the identified business broker or seller for business-sale negotiations. FLLM can help buyers navigate the
                  liquor-license market and transaction resources without presenting itself as the business broker.
                </p>
              </FllmStepCard>
            </div>
          </div>
        </section>

        <section className="fllm-template-section fllm-template-section--deep">
          <div className="fllm-template-shell">
            <FllmSectionHeading
              eyebrow="High-Intent Florida Searches"
              title="Start with the type of restaurant and license you actually want"
            />
            <FllmCardGrid columns={3}>
              <FllmCard eyebrow="Full Liquor + Transferable Asset" title="Restaurant + 4COP Quota">
                <p>
                  Search for restaurants where the transferable quota license is part of the business package and can be analyzed
                  separately from the operating business.
                </p>
                <p><Link href="/restaurants-with-liquor-licenses#quota-restaurant-inventory">Browse 4COP Quota restaurant opportunities →</Link></p>
              </FllmCard>
              <FllmCard eyebrow="Full Liquor + Qualifying Restaurant" title="Restaurant + 4COP SFS / SRX">
                <p>
                  Search for restaurant opportunities using the full-liquor privileges available to qualifying food-service
                  establishments.
                </p>
                <p><Link href="/restaurants-with-liquor-licenses#sfs-restaurant-inventory">Browse 4COP SFS / SRX opportunities →</Link></p>
              </FllmCard>
              <FllmCard eyebrow="Beer & Wine" title="Restaurant + 2COP">
                <p>
                  Search for restaurant concepts where beer-and-wine privileges meet the operating model without requiring a
                  full-liquor license.
                </p>
                <p><Link href="/restaurants-with-liquor-licenses#2cop-restaurant-inventory">Browse 2COP restaurant opportunities →</Link></p>
              </FllmCard>
            </FllmCardGrid>
          </div>
        </section>

        <section className="fllm-template-section fllm-template-section--deep">
          <div className="fllm-template-shell">
            <FllmSectionHeading
              eyebrow="Buyer Questions"
              title="Finding Florida restaurants for sale with liquor licenses"
            />
            <FllmFaqGrid items={faqs} columns={2} />
          </div>
        </section>

        <section className="fllm-ui-final-cta">
          <div className="fllm-template-shell">
            <div>
              <span className="fllm-template-eyebrow">Florida Restaurant + Liquor License Market</span>
              <h2>Do not limit your restaurant search to one marketplace.</h2>
              <p>
                Browse Florida restaurant inventory on FLLM, identify the actual liquor-license structure and compare county
                market data before deciding which opportunity fits your acquisition strategy.
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
            <Link href="/restaurants-with-liquor-licenses">Restaurants</Link>
            <Link href="/listings">Listings</Link>
            <Link href="/counties">Counties</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
