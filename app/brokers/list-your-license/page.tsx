import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import BrokerListingForm from "./BrokerListingForm";
import ListingPreviewSelector from "./ListingPreviewSelector";
import styles from "./broker-listing.module.css";

// OFFICIAL LOCKED REFERENCE — Broker Listing Page v1.
// Approved September 17, 2026. Preserve this page's layout, hierarchy, pricing,
// broker-control messaging, business-package support, Featured SEO positioning,
// resource-center structure, FAQ behavior, and approved FLLM visual language
// unless the user explicitly approves a new version.
const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/brokers/list-your-license`;

export const metadata: Metadata = {
  title: "Advertise a Client’s Liquor License | FLLM Broker Marketplace",
  description:
    "Independent brokers can advertise client 4COP quota and 3PS licenses on FLLM, including quota licenses offered with an operating business package. One-time listings from $14.95 with no recurring fee or FLLM commission share.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Advertise a Client’s Liquor License | FLLM Broker Marketplace",
    description:
      "Advertise a client’s Florida liquor license on FLLM, including a quota license offered with an operating business package, while remaining the listing representative and transaction contact.",
    siteName: "Florida Liquor License Market",
  },
};

const benefits = [
  "Increase statewide exposure and buyer traffic",
  "You remain the broker and client relationship owner",
  "Buyer inquiries route directly to your designated contact",
  "FLLM does not take a share of your broker commission",
  "List license-only or business + liquor-license packages",
  "Featured listings add priority exposure and FLLM listing SEO",
];

const steps = [
  ["Submit", "Provide the broker, client-authority and license information."],
  ["Review", "FLLM verifies the submission for accuracy and marketplace fit."],
  ["Publish", "The approved listing identifies you as the independent representative."],
  ["Connect", "Qualified buyer inquiries are routed to your selected contact."],
];

const faqs = [
  {
    question: "Where can a Florida liquor license broker list a client’s license for sale?",
    answer:
      "Florida liquor license brokers can submit client inventory to the FLLM statewide marketplace. Approved listings can be displayed by license type and county while the submitting broker remains the listing representative and transaction contact.",
  },
  {
    question: "Can I list a Florida 4COP quota liquor license on FLLM?",
    answer:
      "Yes. Florida 4COP quota licenses are a core part of the FLLM marketplace. Broker-submitted listings are reviewed for authority, accuracy and marketplace fit before publication.",
  },
  {
    question: "Can I advertise a Florida 3PS package-store liquor license on FLLM?",
    answer:
      "Yes. FLLM can accept broker-submitted 3PS-family quota-license inventory for marketplace review. The applicable license series, county and transfer status should be identified accurately in the submission.",
  },
  {
    question: "Can I list a liquor license together with a business for sale?",
    answer:
      "Yes. A broker may submit a Florida quota liquor license that is being offered with an operating business, or a license that may be sold either separately or with the business. The FLLM listing can identify the business type, distinguish the liquor-license asking price from the total business-and-license package price, and keep the submitting broker as the transaction contact.",
  },
  {
    question: "Does FLLM become my client’s broker?",
    answer:
      "No. A broker-submitted marketplace listing is advertising only. You remain the listing representative and control the client relationship, communications and transaction.",
  },
  {
    question: "Does FLLM receive part of my commission?",
    answer:
      "No. Standard and Featured charges are one-time listing-submission fees. FLLM does not seek or receive any portion of the submitting broker’s commission.",
  },
  {
    question: "What does the Featured option include?",
    answer:
      "A Featured listing receives the Featured Listing badge, priority marketplace placement for 30 days and listing-specific SEO work by FLLM to support search visibility. Search placement is not guaranteed. After the 30-day priority period, the listing remains live as a Standard listing until sold, withdrawn or otherwise removed.",
  },
  {
    question: "Will my contact information appear on the listing detail page?",
    answer:
      "Yes. After review and approval, the full listing detail page can identify your name, brokerage and designated business contact information for buyer inquiries. The marketplace card itself follows the standard FLLM card layout.",
  },
  {
    question: "Is payment a guarantee that the listing will be published?",
    answer:
      "No. FLLM reviews each submission for accuracy, authority and marketplace fit. A rejected submission is eligible for a refund of the listing-submission fee.",
  },
];

export default function BrokerListYourLicensePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Advertise a Client’s Liquor License | FLLM Broker Marketplace",
      url: canonicalUrl,
      description:
        "Florida liquor license broker marketplace page for listing and advertising client 4COP quota and 3PS licenses for sale, including liquor licenses offered with operating businesses.",
      dateModified: "2026-09-09",
      publisher: {
        "@type": "Organization",
        name: "Florida Liquor License Market",
        url: siteUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "FLLM Independent Broker Marketplace Listing",
      provider: {
        "@type": "Organization",
        name: "Florida Liquor License Market",
        url: siteUrl,
      },
      areaServed: { "@type": "State", name: "Florida" },
      audience: { "@type": "Audience", audienceType: "Florida liquor license brokers" },
      offers: [
        { "@type": "Offer", name: "Standard Broker Listing", price: "14.95", priceCurrency: "USD" },
        {
          "@type": "Offer",
          name: "Featured Broker Listing",
          price: "24.95",
          priceCurrency: "USD",
          description:
            "Featured badge, 30 days of priority marketplace placement and listing-specific SEO work by FLLM. Search placement is not guaranteed.",
        },
      ],
      description:
        "Advertising-only marketplace listing for Florida brokers representing owners of quota liquor licenses, including stand-alone licenses and licenses offered with operating business packages.",
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
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: "Florida Liquor License Broker",
          item: `${siteUrl}/florida-liquor-license-broker`,
        },
        { "@type": "ListItem", position: 3, name: "List a Client License", item: canonicalUrl },
      ],
    },
  ];

  return (
    <main className={styles.page} data-page-design-status="locked" data-fllm-broker-page-standard="v1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
        }}
      />

      <style>{`
        .hero-plan-hit {
          position: absolute;
          inset: 0;
          z-index: 4;
          border-radius: 7px;
          cursor: pointer;
        }
        .hero-plan-hit:focus-visible {
          outline: 2px solid #f6a700;
          outline-offset: 3px;
        }
        .${styles.heroPlans} > div {
          border-color: rgba(255,255,255,.13) !important;
          background: rgba(255,255,255,.045) !important;
          transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease, background .18s ease;
        }
        .${styles.heroPlans} > div:has(.hero-plan-hit:hover),
        .${styles.heroPlans} > div:has(.hero-plan-hit:focus-visible) {
          transform: translateY(-3px);
          border-color: #f6a700 !important;
          background: rgba(246,167,0,.11) !important;
          box-shadow: 0 10px 24px rgba(0,0,0,.24), 0 0 18px rgba(246,167,0,.12);
        }
        .${styles.page}:has(#featured-listing-option:target) .${styles.heroPlans} > div:first-child,
        .${styles.page}:has(#standard-listing-option:target) .${styles.heroPlans} > div:nth-child(2) {
          border-color: rgba(255,255,255,.13) !important;
          background: rgba(255,255,255,.045) !important;
          box-shadow: none !important;
          transform: none !important;
        }
        .${styles.page}:has(#featured-listing-option:target) .${styles.heroPlans} > div:nth-child(2),
        .${styles.page}:has(#standard-listing-option:target) .${styles.heroPlans} > div:first-child {
          border-color: rgba(246,167,0,.82) !important;
          background: rgba(246,167,0,.10) !important;
          box-shadow: 0 10px 24px rgba(0,0,0,.24), 0 0 18px rgba(246,167,0,.12) !important;
        }
        .${styles.heroPlans} small {
          font-size: 12px !important;
          line-height: 1.35 !important;
          color: #d8e1e7 !important;
        }
        .broker-hero-package-options {
          display:grid;
          gap:5px;
          margin-top:16px;
          color:#e7eef3;
          font-size:13px;
          font-weight:700;
          line-height:1.4;
        }
        .broker-hero-package-options > div {
          position:relative;
          padding-left:19px;
        }
        .broker-hero-package-options > div::before {
          content:"✓";
          position:absolute;
          left:0;
          color:#f6a700;
          font-weight:900;
        }
        #standard-listing-option,
        #featured-listing-option {
          scroll-margin-top: 105px;
        }
        .broker-preview-heading {
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:16px;
          margin-bottom:12px;
          color:#fff;
        }
        .broker-preview-heading span {
          font-family:Georgia, "Times New Roman", serif;
          font-size:23px;
        }
        .broker-preview-heading strong {
          color:#f6a700;
          font-size:17px;
        }
        .broker-preview-caption {
          margin:13px 3px 0;
          color:#bfcbd3;
          font-size:11px;
          line-height:1.6;
        }
        .broker-organic-section {
          padding:72px 0;
          background:#071927;
          border-top:1px solid rgba(246,167,0,.16);
          border-bottom:1px solid rgba(246,167,0,.16);
        }
        .broker-organic-grid {
          display:block;
        }
        .broker-organic-copy {
          max-width:980px;
          margin-bottom:26px;
        }
        .broker-organic-body-grid {
          display:grid;
          grid-template-columns:minmax(0,1.08fr) minmax(390px,.92fr);
          gap:24px;
          align-items:stretch;
        }
        .broker-benefits-stack {
          min-height:100%;
          display:grid;
          grid-template-rows:minmax(0,1fr) auto;
          gap:14px;
        }
        .broker-benefits-stack .broker-benefit-group:first-child {
          margin-top:0;
        }
        .broker-organic-copy > span,
        .broker-resource-center > span {
          color:#f6a700;
          font-size:12px;
          font-weight:900;
          letter-spacing:.11em;
          text-transform:uppercase;
        }
        .broker-organic-copy h2 {
          margin:9px 0 14px;
          color:#fff;
          font-family:Georgia, "Times New Roman", serif;
          font-size:clamp(31px,4vw,46px);
          line-height:1.08;
        }
        .broker-organic-intro {
          margin:0;
          max-width:900px;
          color:#c5d1da;
          font-size:16px;
          line-height:1.72;
        }
        .broker-business-package-callout {
          max-width:980px;
          display:grid;
          grid-template-columns:auto minmax(0,1fr);
          gap:14px;
          align-items:start;
          margin:18px 0 24px;
          padding:16px 18px;
          border:1px solid rgba(246,167,0,.48);
          border-left:4px solid #f6a700;
          border-radius:9px;
          background:linear-gradient(135deg,rgba(246,167,0,.08),rgba(10,34,54,.72));
          box-shadow:inset 0 1px 0 rgba(255,255,255,.035);
        }
        .broker-business-package-callout > b {
          display:grid;
          width:30px;
          height:30px;
          place-items:center;
          border-radius:50%;
          background:#f6a700;
          color:#071827;
          font-size:17px;
          line-height:1;
        }
        .broker-business-package-callout strong {
          display:block;
          margin-bottom:5px;
          color:#fff;
          font-size:15px;
          line-height:1.3;
        }
        .broker-business-package-callout p {
          margin:0;
          color:#c8d6df;
          font-size:13px;
          line-height:1.58;
        }
        .broker-business-package-callout a {
          color:#69d6ff;
          font-weight:500;
          text-decoration:none;
        }
        .broker-business-package-callout a:hover,
        .broker-business-package-callout a:focus-visible {
          color:#f6b51f;
          text-decoration:underline;
          text-underline-offset:3px;
          outline:none;
        }
        .broker-benefit-group {
          margin:0;
          padding:20px 21px;
          border:1px solid rgba(88,200,238,.20);
          border-radius:10px;
          background:rgba(10,34,54,.58);
          box-shadow:inset 0 1px 0 rgba(255,255,255,.035);
        }
        .broker-benefit-group + .broker-benefit-group {
          margin-top:0;
        }
        .broker-benefit-group h3 {
          margin:0 0 14px;
          color:#fff;
          font-family:Georgia, "Times New Roman", serif;
          font-size:21px;
          line-height:1.2;
        }
        .broker-benefit-columns {
          display:grid;
          grid-template-columns:repeat(2,minmax(0,1fr));
          gap:18px;
          align-items:start;
        }
        .broker-benefit-list {
          display:grid;
          grid-template-columns:repeat(2,minmax(0,1fr));
          gap:12px 18px;
          margin:0;
          padding:0;
          list-style:none;
        }
        .broker-benefit-columns .broker-benefit-list {
          display:flex;
          flex-direction:column;
          gap:12px;
        }
        .broker-benefit-list li {
          position:relative;
          min-width:0;
          padding-left:22px;
          color:#d9e4eb;
          font-size:14px;
          line-height:1.48;
        }
        .broker-benefit-list li::before {
          content:"✓";
          position:absolute;
          left:0;
          top:0;
          color:#f6a700;
          font-weight:900;
        }
        .broker-benefit-list a {
          color:#69d6ff;
          font-weight:500;
          text-decoration:none;
        }
        .broker-benefit-list a:hover,
        .broker-benefit-list a:focus-visible {
          color:#f6b51f;
          text-decoration:underline;
          text-underline-offset:3px;
          outline:none;
        }
        .broker-relationship-list li::before {
          content:"•";
          color:#69d6ff;
          font-size:18px;
          line-height:1;
        }
        .broker-resource-center {
          height:100%;
          display:flex;
          flex-direction:column;
          padding:20px;
          border:1px solid rgba(246,167,0,.48);
          border-radius:12px;
          background:linear-gradient(145deg,#0a2236,#061827);
          box-shadow:0 18px 36px rgba(0,0,0,.22);
        }
        .broker-resource-center > span {
          display:block;
          text-align:center;
        }
        .broker-resource-center h3 {
          margin:7px 0 6px;
          color:#fff;
          font-family:Georgia, "Times New Roman", serif;
          font-size:27px;
          line-height:1.1;
          text-align:center;
        }
        .broker-resource-center > p {
          max-width:520px;
          margin:0 auto 14px;
          color:#b9c9d4;
          font-size:13px;
          line-height:1.55;
          text-align:center;
        }
        .broker-organic-links {
          flex:1;
          display:grid;
          grid-template-columns:repeat(2,minmax(0,1fr));
          grid-auto-rows:minmax(72px,1fr);
          gap:8px;
          margin-top:16px !important;
          align-content:start;
        }
        .broker-organic-links a {
          min-width:0;
          min-height:0;
          display:flex;
          flex-direction:column;
          justify-content:center;
          gap:6px;
          padding:12px 14px;
          border:1px solid rgba(255,255,255,.11);
          border-radius:9px;
          background:#0c2941;
          color:#fff;
          font-weight:850;
          line-height:1.25;
          text-decoration:none;
          transition:border-color .18s ease, background .18s ease, color .18s ease, transform .18s ease, box-shadow .18s ease;
        }
        .broker-organic-links a strong {
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:10px;
          color:inherit;
          font-size:13px;
          line-height:1.3;
        }
        .broker-organic-links a strong::after {
          content:"→";
          flex:0 0 auto;
          color:#f6a700;
        }
        .broker-organic-links a small {
          color:#9fb1bf;
          font-size:10px;
          font-weight:700;
          line-height:1.35;
        }
        .broker-organic-links a:hover,
        .broker-organic-links a:focus-visible {
          border-color:#f6a700;
          background:#103451;
          color:#f6b51f;
          transform:translateY(-2px);
          box-shadow:0 10px 22px rgba(0,0,0,.18);
          outline:none;
        }
        .broker-organic-links a:hover small,
        .broker-organic-links a:focus-visible small {
          color:#dce7ee;
        }
        @media(max-width:980px) {
          .broker-organic-copy { max-width:none; }
          .broker-organic-body-grid { grid-template-columns:1fr; gap:28px; }
          .broker-benefits-stack { display:block; }
          .broker-benefit-group + .broker-benefit-group { margin-top:14px; }
          .broker-resource-center { max-width:none; height:auto; }
        }
        @media(max-width:680px) {
          .broker-organic-section { padding:56px 0; }
          .broker-benefit-columns,
          .broker-benefit-list,
          .broker-organic-links { grid-template-columns:1fr; }
        }
      `}</style>

      <div className={styles.headerWrap}>
        <FormsSiteHeader
          primaryActionHref="#broker-listing-form"
          primaryActionLabel="List a Client License"
        />
      </div>

      <section className={styles.hero}>
        <Image
          className={styles.heroImage}
          src="/assets/hero-bar-clean.png"
          alt="Premium Florida hospitality venue"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroShade} />
        <div className={styles.shell}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/florida-liquor-license-broker">Broker Services</Link>
            <span>›</span>
            <strong>List a Client License</strong>
          </nav>

          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.kicker}>Independent Broker Marketplace</span>
              <h1>Add Your Client&apos;s Florida Liquor License to FLLM</h1>
              <p>
                Reach buyers searching Florida&apos;s specialized quota-license market while you remain the listing representative and transaction contact.
              </p>
              <div className="broker-hero-package-options" aria-label="Accepted broker listing structures">
                <div>Quota Liquor License Only</div>
                <div>Quota Liquor License + Business Package</div>
              </div>
              <div className={styles.heroActions}>
                <a className={styles.goldButton} href="#broker-listing-form">Choose a Listing Option</a>
                <Link className={styles.outlineButton} href="/listings">View Marketplace Listings</Link>
              </div>
              <small>Listings from $14.95 · No share of your commission · Statewide exposure</small>
            </div>

            <aside className={styles.priceCard}>
              <span>Choose Your Exposure</span>
              <div className={styles.heroPlans}>
                <div>
                  <a className="hero-plan-hit" href="#standard-listing-option" aria-label="View the Standard broker listing option" />
                  <b>Standard</b>
                  <strong>$14.95</strong>
                  <small>Marketplace listing · Select Standard ↓</small>
                </div>
                <div>
                  <a className="hero-plan-hit" href="#featured-listing-option" aria-label="View the Featured broker listing option" />
                  <b>Featured</b>
                  <strong>$24.95</strong>
                  <small>30-day priority + FLLM listing SEO · Select Featured ↓</small>
                </div>
              </div>
              <ul>
                <li>One-time fee</li>
                <li>No recurring charge</li>
                <li>No FLLM commission</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.benefitSection}>
        <div className={styles.shell}>
          <div className={styles.sectionHeading}>
            <span>Built for Florida Brokers</span>
            <h2>More exposure without giving up the broker relationship</h2>
            <p>Use FLLM as an additional marketing channel while keeping your client, transaction contact role and commission structure intact.</p>
          </div>
          <div className={styles.benefitGrid}>
            {benefits.map((benefit) => (
              <article key={benefit}><i>✓</i><p>{benefit}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="broker-organic-section" aria-labelledby="broker-marketplace-seo-heading">
        <div className={styles.shell}>
          <div className="broker-organic-grid">
            <div className="broker-organic-copy">
              <span>Client Liquor License Advertising</span>
              <h2 id="broker-marketplace-seo-heading">Advertise a Florida liquor license for sale while keeping the broker relationship</h2>
              <p className="broker-organic-intro">
                FLLM gives Florida liquor license brokers statewide marketplace exposure plus market-data, transaction and regulatory resources while the submitting broker remains the identified representative and transaction contact.
              </p>
              <div className="broker-business-package-callout">
                <b aria-hidden="true">+</b>
                <div>
                  <strong>Listing a business with the liquor license? FLLM supports that too.</strong>
                  <p>
                    Brokers can advertise a quota license that is included with an operating business, or a license that may be sold either separately or with the business. FLLM can show the <a href="#broker-listing-form">business type and package structure</a>, distinguish the license asking price from the total business-and-license package price, and route buyer inquiries back to the submitting broker.
                  </p>
                </div>
              </div>
            </div>

            <div className="broker-organic-body-grid">
              <div className="broker-benefits-stack">
                <div className="broker-benefit-group">
                  <h3>What brokers get through FLLM</h3>
                  <div className="broker-benefit-columns">
                    <ul className="broker-benefit-list">
                      <li>Advertise <Link href="/florida-4cop-liquor-license-for-sale">4COP</Link> and <Link href="/florida-3ps-liquor-license-for-sale">3PS</Link> quota licenses.</li>
                      <li>List <a href="#broker-listing-form">license-only or business + license packages</a>.</li>
                      <li>Featured ads include <a href="#featured-listing-option">FLLM listing-specific SEO</a>; ranking is not guaranteed.</li>
                      <li>Use <Link href="/counties">county pages, county maps and heat maps</Link>.</li>
                      <li>Review the <Link href="/market-data/exchange-board">FLLM Exchange Board</Link> and market activity.</li>
                      <li>Use <Link href="/transaction-services">FLLM Transaction Services</Link>.</li>
                    </ul>
                    <ul className="broker-benefit-list">
                      <li>Add FLLM to the broker&apos;s existing marketing channels and listings.</li>
                      <li>Compare current inventory, asking prices and market reports.</li>
                      <li>Access <Link href="/florida-liquor-license-appraisal">valuation</Link> and <Link href="/financing">financing</Link> resources.</li>
                      <li>Review <Link href="/resources/florida-division-alcoholic-beverages-tobacco">DBPR / ABT</Link> and <Link href="/resources/florida-department-of-revenue">FDOR</Link> resources.</li>
                      <li>Access the <Link href="/resources/liquor-license-attorneys">attorney directory</Link>.</li>
                      <li>Use <Link href="/resources/forms">ABT forms and transfer guides</Link>.</li>
                    </ul>
                  </div>
                </div>

                <div className="broker-benefit-group">
                  <h3>What does not change</h3>
                  <ul className="broker-benefit-list broker-relationship-list">
                    <li>You remain the broker and identified representative for your client.</li>
                    <li>Buyer inquiries continue to route to your designated contact.</li>
                    <li>FLLM does not take over your client relationship or negotiations.</li>
                    <li>FLLM does not take a share of your commission on broker marketplace listings.</li>
                  </ul>
                </div>
              </div>

              <aside className="broker-resource-center" aria-label="FLLM broker resource center">
              <span>Broker Resource Center</span>
              <h3>Everything around the listing</h3>
              <p>Jump directly to the FLLM tools and professional resources brokers can use before, during and after a client listing — including listings where the quota license is offered with an operating business.</p>
              <nav className="broker-organic-links" aria-label="Florida broker marketplace resources">
                <a href="#broker-listing-form"><strong>List a Client License</strong><small>License-only or business + license package</small></a>
                <a href="#featured-listing-option"><strong>Featured Listing SEO</strong><small>Priority exposure + FLLM listing SEO</small></a>
                <Link href="/transaction-services"><strong>Transaction Services</strong><small>Transfer, closing and coordination resources</small></Link>
                <Link href="/counties"><strong>Heat Maps & County Maps</strong><small>Statewide and county market intelligence</small></Link>
                <Link href="/market-data/exchange-board"><strong>Exchange Board & Reports</strong><small>Current market activity and asking-price evidence</small></Link>
                <Link href="/resources/florida-division-alcoholic-beverages-tobacco"><strong>DBPR / ABT + FDOR</strong><small>Licensing, transfer and tax-clearance resources</small></Link>
                <Link href="/resources/liquor-license-attorneys"><strong>Attorney Directory</strong><small>Florida liquor-license legal resources</small></Link>
                <Link href="/florida-liquor-license-appraisal"><strong>Valuation & Financing</strong><small>Appraisal, pricing and financing resources</small></Link>
              </nav>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.previewSection} id="listing-previews">
        <div className={styles.shell}>
          <div className={styles.sectionHeading}>
            <span>Listing Appearance</span>
            <h2>See the difference before you choose</h2>
            <p>
              Both examples below use the actual marketplace card component and Listings-page styling. Featured adds the cyan Featured Listing badge and priority placement for the first 30 days; the marketplace card itself does not display broker contact information.
            </p>
          </div>

          <div className={styles.previewGrid}>
            <div>
              <div className="broker-preview-heading"><span>Standard Listing</span><strong>$14.95</strong></div>
              <ListingPreviewSelector id="standard-listing-option" tier="standard" className={styles.previewChoice} />
              <p className="broker-preview-caption">Appears within the regular marketplace order and remains active until sold or withdrawn.</p>
            </div>
            <div>
              <div className="broker-preview-heading"><span>Featured Listing</span><strong>$24.95</strong></div>
              <ListingPreviewSelector id="featured-listing-option" tier="featured" className={styles.previewChoice} />
              <p className="broker-preview-caption">Receives the Featured Listing badge, 30 days of priority placement and listing-specific SEO work by FLLM. Search placement is not guaranteed; after 30 days the listing continues as a Standard listing.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.distinctionSection}>
        <div className={styles.shell}>
          <div className={styles.sectionHeadingLight}>
            <span>Clear Marketplace Distinction</span>
            <h2>Independent broker advertising and FLLM representation are different services</h2>
          </div>
          <div className={styles.distinctionGrid}>
            <article>
              <span>Independent Broker Listing</span>
              <h3>You remain the representative</h3>
              <p>FLLM advertises the license and routes inquiries. Your name, brokerage and selected contact information identify you as the transaction contact.</p>
              <ul><li>Standard or Featured one-time listing</li><li>No FLLM commission</li><li>Your client relationship remains yours</li></ul>
            </article>
            <article>
              <span>FLLM-Represented Listing</span>
              <h3>Separate professional engagement</h3>
              <p>FLLM provides brokerage services only for matters accepted under a separate written agreement defining the client, services and compensation.</p>
              <ul><li>Separate written agreement</li><li>Defined representation and scope</li><li>Professionally managed transaction support</li></ul>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.processSection}>
        <div className={styles.shell}>
          <div className={styles.sectionHeading}><span>How It Works</span><h2>Four steps from submission to buyer inquiry</h2></div>
          <div className={styles.steps}>
            {steps.map(([title, copy], index) => (
              <article key={title}><b>{index + 1}</b><h3>{title}</h3><p>{copy}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.formSection} id="broker-listing-form">
        <div className={styles.shell}>
          <div className={styles.formIntro}>
            <span>Broker Submission</span>
            <h2>List a client&apos;s Florida quota liquor license for sale</h2>
            <p>Complete the broker and license information below. You may keep the license number private while still providing it to FLLM for review.</p>
          </div>
          <BrokerListingForm />
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.shell}>
          <div className={styles.sectionHeading}><span>Broker Questions</span><h2>Before you submit</h2></div>
          <div className={styles.faqList}>
            {faqs.map((faq) => (
              <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>
            ))}
          </div>
          <div className={styles.multiListing}>
            <div><span>Have several licenses to add?</span><h3>Ask FLLM about coordinated broker inventory submissions.</h3></div>
            <a href="mailto:listings@floridaliquorlicensemarket.com?subject=Multiple%20Broker%20Listings">Contact the Listings Team</a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.shell}>
          <Image src="/assets/brand-footer.svg" alt="Florida Liquor License Market" width={215} height={78} />
          <p>Independent broker marketplace listings are advertising services only. FLLM does not provide legal, tax, title or regulatory advice and does not guarantee publication, availability, transfer approval or closing.</p>
          <Link href="/contact">Contact FLLM</Link>
        </div>
      </footer>
    </main>
  );
}
