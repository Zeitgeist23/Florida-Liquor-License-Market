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
    "Use FLLM Exchange to review eligible Florida 4COP Quota and 3PS liquor licenses and submit confidential online offers. Buyers keep proposed terms private while sellers control the response.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "FLLM Exchange | Confidential Florida Liquor License Offers",
    description:
      "Florida Liquor License Market’s online confidential-offer marketplace for eligible 4COP Quota and 3PS liquor license opportunities.",
    siteName: "Florida Liquor License Market",
  },
};

export const dynamic = "force-dynamic";

const faqs = [
  {
    question: "What is FLLM Exchange?",
    answer:
      "FLLM Exchange is Florida Liquor License Market’s online confidential-offer marketplace for eligible 4COP Quota and 3PS liquor license listings. It gives buyers a structured way to review an opportunity and privately submit proposed purchase terms to the listing party without publishing the offer amount to the market.",
  },
  {
    question: "Can I use FLLM Exchange entirely online?",
    answer:
      "Yes. Buyers can review eligible FLLM Exchange opportunities online and submit confidential offer terms through the listing page. Seller review and counteroffer communications can also begin through the Exchange workflow, while any binding purchase agreement, escrow, financing, due diligence and state transfer process remain separate steps.",
  },
  {
    question: "What does it cost to use FLLM Exchange?",
    answer:
      "FLLM Exchange is part of the Florida Liquor License Market platform. Transaction costs can vary depending on the listing path and the services used. A completed liquor-license transaction may separately involve seller listing fees, appraisal or financing costs, legal or escrow expenses, state transfer fees, lien or payoff costs and other transaction-specific expenses. Review the applicable FLLM listing, appraisal, financing and transfer resources before relying on a total transaction cost.",
  },
  {
    question: "What are the requirements to submit a confidential offer?",
    answer:
      "A buyer should identify the eligible listing, provide current contact information, state a proposed purchase price, disclose cash or financing status, provide target timing and identify material conditions or contingencies. A complete submission helps the seller evaluate whether the inquiry is serious and transaction-ready.",
  },
  {
    question: "Is FLLM Exchange an auction?",
    answer:
      "No. FLLM Exchange does not conduct an auction, declare a winning bidder, accept or reject an offer for a seller, or automatically create a sale. The seller or authorized representative independently decides whether and how to respond.",
  },
  {
    question: "Are offer amounts displayed publicly?",
    answer:
      "No. Offer amounts, bid counts, bid/ask spreads and buyer contact details submitted through FLLM Exchange are not displayed publicly. They are used to route the confidential inquiry to the appropriate listing party and maintain the Exchange transaction record.",
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
  {
    question: "How do I contact FLLM about an Exchange opportunity?",
    answer:
      "The best starting point is the individual Exchange listing, where a buyer can submit a confidential offer or inquiry tied to that specific license. General questions can also be sent through the FLLM Contact page so the request remains connected to Florida Liquor License Market rather than an unrelated outside exchange or broker.",
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
        "Florida Liquor License Market’s online confidential-offer marketplace for eligible Florida 4COP Quota and 3PS liquor license opportunities.",
      url: canonicalUrl,
      datePublished: "2026-09-02",
      dateModified: "2026-09-04",
      isPartOf: {
        "@type": "WebSite",
        name: "Florida Liquor License Market",
        url: siteUrl,
      },
      about: [
        { "@type": "Thing", name: "Florida liquor licenses" },
        { "@type": "Thing", name: "Online liquor license marketplace" },
        { "@type": "Thing", name: "4COP Quota licenses" },
        { "@type": "Thing", name: "3PS liquor licenses" },
        { "@type": "Thing", name: "Confidential purchase offers" },
        { "@type": "Thing", name: "Private buyer and seller negotiations" },
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
              <span className="exchange-eyebrow">Confidential Florida liquor-license offers</span>
              <h1>FLLM <em>Exchange</em></h1>
              <p>
                FLLM Exchange is Florida Liquor License Market’s online exchange marketplace for
                confidential purchase offers on eligible 4COP Quota and 3PS liquor licenses. Buyers
                can review a current opportunity, submit proposed terms privately, and keep their
                negotiating position off the public listing page.
              </p>
              <p>
                Unlike a public auction or open bid board, FLLM Exchange keeps buyer offer amounts,
                bid counts and bid/ask spreads confidential while the seller retains control over
                whether to respond, negotiate, counter or decline.
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
            <h2 id="exchange-inventory-title">Florida liquor licenses accepting confidential offers</h2>
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
                <Link href={listingPageHref(listing)}>View License &amp; Submit Confidential Offer →</Link>
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
              <span>How It Works Online</span>
              <h2>A private path from Florida liquor-license opportunity to seller review</h2>
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
            Use FLLM Exchange to approach an eligible Florida liquor-license seller with a proposed
            price and transaction information. A complete inquiry helps the seller distinguish a
            qualified buyer from a casual expression of interest while keeping proposed terms private.
          </p>
          <ul>
            <li>Identify the county and license series</li>
            <li>State the proposed purchase price</li>
            <li>Disclose cash or financing status</li>
            <li>Include timing and material conditions</li>
          </ul>
          <Link href="#exchange-opportunities">View Confidential-Offer Opportunities</Link>
        </article>
        <article>
          <span>For Sellers &amp; Brokers</span>
          <h2>Invite private offers while controlling the response</h2>
          <p>
            Publish an eligible direct-seller or broker-assisted listing, establish the asking
            price, and receive structured buyer inquiries without displaying confidential offer
            amounts to the public.
          </p>
          <ul>
            <li>State the license type and county clearly</li>
            <li>Choose standard or featured visibility</li>
            <li>Receive structured buyer information</li>
            <li>Decide independently whether to negotiate</li>
          </ul>
          <Link href="/sell-your-license">List a Florida Liquor License on FLLM</Link>
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
              <Link href="/financing">Florida Liquor License Financing</Link>
              <Link href="/florida-liquor-license-appraisal">Florida Liquor License Appraisal</Link>
              <Link href="/resources/florida-department-of-revenue">FDOR Transfer Resources</Link>
              <Link href="/dbpr-abt-6002">FLLM ABT-6002 Transfer Guide</Link>
              <Link href="/resources/florida-liquor-license-types">Compare Florida License Types</Link>
              <Link href="/how-to-buy-florida-liquor-license">How to Buy a Florida Liquor License</Link>
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
            <h2 id="exchange-faq-title">Online confidential-offer questions buyers and sellers ask</h2>
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
          <p>Review eligible Florida quota-license opportunities or publish a license for confidential buyer offers.</p>
          <div className="exchange-actions">
            <a className="exchange-button exchange-button-gold" href="#exchange-opportunities">View Confidential Offers</a>
            <Link className="exchange-button exchange-button-dark" href="/sell-your-license">List Your License</Link>
            <Link className="exchange-button exchange-button-dark" href="/contact">Contact FLLM</Link>
          </div>
        </div>
      </section>

      <footer className="abt-forms-footer">
        <div className="page-shell">
          <img src="/assets/brand-footer.svg" alt="Florida Liquor License Market" />
          <span>Florida’s marketplace for buying, selling, financing, valuing and submitting confidential liquor-license offers.</span>
          <Link href="/">Return to Florida Liquor License Market</Link>
        </div>
      </footer>
    </main>
  );
}
