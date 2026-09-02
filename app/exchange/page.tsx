import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import { isDirectSellerListing, resolveListingInventoryClass } from "@/lib/listing-inventory-class";
import { listingPageHref } from "@/lib/listing-page-urls";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";
import "../resources/forms/abt-forms.css";
import "./exchange.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/exchange`;

export const metadata: Metadata = {
  title: "FLLM Exchange | Confidential Florida Liquor License Offers",
  description:
    "Explore Florida 4COP Quota and 3PS licenses accepting confidential offers through FLLM Exchange. Buyers submit private offers and sellers decide how to respond.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "FLLM Exchange | Florida Liquor License Opportunities",
    description:
      "A private offer-submission marketplace for eligible Florida 4COP Quota and 3PS liquor license opportunities.",
    siteName: "Florida Liquor License Market",
  },
};

export const dynamic = "force-dynamic";

const faqs = [
  {
    question: "What is FLLM Exchange?",
    answer:
      "FLLM Exchange is Florida Liquor License Market’s private offer-submission marketplace for eligible 4COP Quota and 3PS liquor license listings. It gives buyers a structured way to review an opportunity and send a confidential offer or inquiry to the listing party.",
  },
  {
    question: "Is FLLM Exchange an auction?",
    answer:
      "No. FLLM Exchange does not conduct an auction, declare a winning bidder, accept or reject an offer for a seller, or automatically create a sale. The seller or authorized representative independently decides whether and how to respond.",
  },
  {
    question: "Are offer amounts displayed publicly?",
    answer:
      "No. Offer amounts and buyer contact details submitted through the Exchange are not displayed on the public listing page. They are used to route the confidential inquiry to the appropriate listing party and maintain an FLLM transaction record.",
  },
  {
    question: "Is an Exchange submission a binding purchase agreement?",
    answer:
      "No, not by itself. An Exchange submission is an expression of interest unless the parties later enter into a separate signed agreement establishing binding terms. Buyers and sellers should obtain transaction-specific professional advice.",
  },
  {
    question: "Does submitting an offer transfer the liquor license?",
    answer:
      "No. Any transaction remains subject to due diligence, definitive closing documents, applicable lien or payoff matters, buyer qualification, and approval by the Florida DBPR Division of Alcoholic Beverages and Tobacco.",
  },
  {
    question: "Which licenses can appear on FLLM Exchange?",
    answer:
      "The Exchange is intended for eligible direct-seller or FLLM-authorized Florida 4COP Quota and 3PS license opportunities. General market-data listings may remain visible elsewhere on FLLM without accepting offers through the Exchange.",
  },
];

export default async function ExchangePage() {
  const marketplaceListings = getVisibleAvailableMarketplaceListings(await getMarketplaceListings());
  const exchangeListings = marketplaceListings
    .filter((listing) => {
      const inventoryClass = resolveListingInventoryClass(listing);
      return Boolean(listing.sourceRef) && (isDirectSellerListing(listing) || inventoryClass === "fllm_exclusive");
    })
    .sort((a, b) => {
      const aDate = a.publishedAt ? Date.parse(a.publishedAt) : 0;
      const bDate = b.publishedAt ? Date.parse(b.publishedAt) : 0;
      return bDate - aDate;
    })
    .slice(0, 6);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "FLLM Exchange",
      headline: "Confidential Florida Liquor License Offers",
      description:
        "A private offer-submission marketplace for eligible Florida 4COP Quota and 3PS liquor license opportunities.",
      url: canonicalUrl,
      datePublished: "2026-09-02",
      dateModified: "2026-09-02",
      isPartOf: {
        "@type": "WebSite",
        name: "Florida Liquor License Market",
        url: siteUrl,
      },
      about: [
        { "@type": "Thing", name: "Florida liquor licenses" },
        { "@type": "Thing", name: "4COP Quota licenses" },
        { "@type": "Thing", name: "3PS liquor licenses" },
        { "@type": "Thing", name: "Confidential purchase offers" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Florida liquor licenses accepting confidential offers",
      numberOfItems: exchangeListings.length,
      itemListElement: exchangeListings.map((listing, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${listing.type} in ${listing.county} — ${listing.priceLabel}`,
        url: `${siteUrl}${listingPageHref(listing)}`,
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
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "FLLM Exchange", item: canonicalUrl },
      ],
    },
  ];

  return (
    <main className="exchange-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <div className="abt-header-wrap">
        <FormsSiteHeader primaryActionHref="/listings" primaryActionLabel="Browse Licenses" />
      </div>

      <section className="exchange-hero">
        <div className="page-shell">
          <nav className="exchange-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span><strong>FLLM Exchange</strong>
          </nav>
          <div className="exchange-hero-grid">
            <div>
              <span className="exchange-eyebrow">Florida’s private license-offer marketplace</span>
              <h1>FLLM <em>Exchange</em></h1>
              <p>
                Review eligible Florida 4COP Quota and 3PS liquor license opportunities and submit
                a confidential offer directly through Florida Liquor License Market.
              </p>
              <div className="exchange-actions">
                <a className="exchange-button exchange-button-gold" href="#exchange-opportunities">View Exchange Opportunities</a>
                <Link className="exchange-button exchange-button-dark" href="/sell-your-license">List a License</Link>
              </div>
            </div>
            <aside className="exchange-hero-panel" aria-label="FLLM Exchange principles">
              <span>Exchange Standard</span>
              <strong>Private—not public bidding</strong>
              <ul>
                <li>Offer amounts are not displayed publicly</li>
                <li>The seller independently evaluates every offer</li>
                <li>Any sale requires separate documents and state approval</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="exchange-inventory page-shell" id="exchange-opportunities" aria-labelledby="exchange-inventory-title">
        <div className="exchange-section-heading">
          <div>
            <span>Eligible Inventory</span>
            <h2 id="exchange-inventory-title">Licenses accepting confidential offers</h2>
          </div>
          <Link href="/listings">View all Florida listings →</Link>
        </div>

        {exchangeListings.length > 0 ? (
          <div className="exchange-listing-grid">
            {exchangeListings.map((listing) => (
              <article className="exchange-listing-card" key={listing.sourceRef}>
                <div className="exchange-listing-topline">
                  <span>Accepting confidential offers</span>
                  <small>{listing.sourceRef}</small>
                </div>
                <h3>{listing.county}</h3>
                <p>{listing.type}</p>
                <strong className="exchange-price">{listing.priceLabel}</strong>
                <Link href={listingPageHref(listing)}>View License &amp; Submit Offer →</Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="exchange-empty-state">
            <strong>No Exchange opportunities are currently published.</strong>
            <p>Create a license alert or browse the full marketplace while new direct-seller inventory is reviewed.</p>
            <div className="exchange-actions">
              <Link className="exchange-button exchange-button-gold" href="/license-alerts">Create a License Alert</Link>
              <Link className="exchange-button exchange-button-dark" href="/listings">Browse All Listings</Link>
            </div>
          </div>
        )}
      </section>

      <section className="exchange-process">
        <div className="page-shell">
          <div className="exchange-section-heading">
            <div>
              <span>How It Works</span>
              <h2>A private path from opportunity to seller review</h2>
            </div>
          </div>
          <div className="exchange-step-grid">
            <article><b>01</b><h3>Review the opportunity</h3><p>Open an eligible listing and review the county, license series, asking price, timing, and available details.</p></article>
            <article><b>02</b><h3>Submit confidential terms</h3><p>Provide your contact information, proposed price, financing status, and any relevant conditions through the secure inquiry form.</p></article>
            <article><b>03</b><h3>Seller reviews privately</h3><p>The listing party receives the inquiry and independently decides whether to respond, negotiate, reject, or request more information.</p></article>
            <article><b>04</b><h3>Document and close separately</h3><p>Any agreement, escrow, financing, due diligence, payoff, and DBPR/ABT transfer process occurs outside the offer submission itself.</p></article>
          </div>
        </div>
      </section>

      <section className="exchange-paths page-shell">
        <article>
          <span>For Buyers</span>
          <h2>Make a serious offer without publishing your position</h2>
          <p>
            Use FLLM Exchange to approach an eligible seller with a proposed price and transaction
            information. A complete inquiry helps the seller distinguish a qualified buyer from a
            casual expression of interest.
          </p>
          <ul>
            <li>Identify the county and license series</li>
            <li>State the proposed purchase price</li>
            <li>Disclose cash or financing status</li>
            <li>Include timing and material conditions</li>
          </ul>
          <Link href="#exchange-opportunities">View Exchange Opportunities</Link>
        </article>
        <article>
          <span>For Sellers &amp; Brokers</span>
          <h2>Invite private offers while controlling the response</h2>
          <p>
            Publish an eligible direct-seller or broker-assisted listing, establish the asking
            price, and receive buyer inquiries without displaying confidential offer amounts to
            the public.
          </p>
          <ul>
            <li>State the license type and county clearly</li>
            <li>Choose standard or featured visibility</li>
            <li>Receive structured buyer information</li>
            <li>Decide independently whether to negotiate</li>
          </ul>
          <Link href="/sell-your-license">List a License on FLLM</Link>
        </article>
      </section>

      <section className="exchange-diligence">
        <div className="page-shell exchange-diligence-grid">
          <div>
            <span>From Offer to Closing</span>
            <h2>An accepted price is only the beginning</h2>
            <p>
              A Florida quota-license transaction may require ownership and status verification,
              lien and UCC review, payoff or release documents, FDOR records, financing approval,
              definitive agreements, and DBPR/ABT transfer approval.
            </p>
            <div className="exchange-diligence-links">
              <Link href="/financing">Review Financing</Link>
              <Link href="/florida-liquor-license-appraisal">Order an Appraisal</Link>
              <Link href="/resources/florida-department-of-revenue">FDOR Resources</Link>
              <Link href="/dbpr-abt-6002">ABT-6002 Transfer Form</Link>
            </div>
          </div>
          <aside>
            <strong>Important Exchange disclosure</strong>
            <p>
              FLLM provides marketplace, communication, and transaction-resource tools. Unless a
              separate written engagement expressly states otherwise, FLLM is not acting as the
              buyer’s or seller’s broker, attorney, lender, escrow agent, title insurer, or
              governmental licensing authority.
            </p>
          </aside>
        </div>
      </section>

      <section className="exchange-faq page-shell" aria-labelledby="exchange-faq-title">
        <div className="exchange-section-heading">
          <div>
            <span>Exchange Questions</span>
            <h2 id="exchange-faq-title">How confidential offers work</h2>
          </div>
        </div>
        <div className="exchange-faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="exchange-final-cta">
        <div className="page-shell">
          <span>Ready to participate?</span>
          <h2>Enter the FLLM Exchange</h2>
          <p>Review eligible opportunities or publish a Florida quota license for qualified buyer attention.</p>
          <div className="exchange-actions">
            <a className="exchange-button exchange-button-gold" href="#exchange-opportunities">View Opportunities</a>
            <Link className="exchange-button exchange-button-dark" href="/sell-your-license">List Your License</Link>
          </div>
        </div>
      </section>

      <footer className="abt-forms-footer">
        <div className="page-shell">
          <img src="/assets/brand-footer.svg" alt="Florida Liquor License Market" />
          <span>Florida’s marketplace for buying, selling, financing, and valuing liquor licenses.</span>
          <Link href="/">Return to Florida Liquor License Market</Link>
        </div>
      </footer>
    </main>
  );
}
