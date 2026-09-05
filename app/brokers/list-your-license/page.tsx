import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import BrokerListingForm from "./BrokerListingForm";
import ListingPreviewSelector from "./ListingPreviewSelector";
import styles from "./broker-listing.module.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/brokers/list-your-license`;

export const metadata: Metadata = {
  title: "List a Florida Liquor License | Broker Listings | FLLM",
  description:
    "Florida liquor license brokers can list client 4COP quota and 3PS licenses on FLLM. One-time listings from $14.95, no recurring fees, no FLLM commission.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "List a Florida Liquor License | Broker Listings | FLLM",
    description:
      "Advertise a client’s Florida liquor license on FLLM while remaining the listing representative and transaction contact.",
    siteName: "Florida Liquor License Market",
  },
};

const benefits = [
  "Your name and brokerage appear as the listing representative",
  "Your approved business contact information appears with the listing",
  "Buyer inquiries are routed directly to your designated contact",
  "You retain control of your client relationship and transaction",
  "FLLM does not seek or receive any portion of your commission",
  "Your listing receives exposure within a specialized statewide marketplace",
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
      "A Featured listing receives the Featured Listing badge and priority marketplace placement for 30 days after publication. It then remains live as a Standard listing until sold, withdrawn or otherwise removed.",
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
      name: "List a Florida Liquor License | Broker Listings | FLLM",
      url: canonicalUrl,
      description:
        "Florida liquor license broker marketplace page for listing and advertising client 4COP quota and 3PS licenses for sale.",
      dateModified: "2026-09-05",
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
        { "@type": "Offer", name: "Featured Broker Listing", price: "24.95", priceCurrency: "USD" },
      ],
      description:
        "Advertising-only marketplace listing for Florida brokers representing owners of quota liquor licenses.",
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
    <main className={styles.page}>
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
          display:grid;
          grid-template-columns:minmax(0,1.25fr) minmax(300px,.75fr);
          gap:40px;
          align-items:start;
        }
        .broker-organic-copy > span {
          color:#f6a700;
          font-size:12px;
          font-weight:900;
          letter-spacing:.11em;
          text-transform:uppercase;
        }
        .broker-organic-copy h2 {
          margin:9px 0 17px;
          color:#fff;
          font-family:Georgia, "Times New Roman", serif;
          font-size:clamp(31px,4vw,46px);
          line-height:1.08;
        }
        .broker-organic-copy p {
          margin:0 0 15px;
          color:#c5d1da;
          font-size:16px;
          line-height:1.78;
        }
        .broker-organic-copy a {
          color:#f6b51f;
          font-weight:800;
          text-decoration-thickness:1px;
          text-underline-offset:3px;
        }
        .broker-organic-links {
          display:grid;
          gap:10px;
        }
        .broker-organic-links a {
          display:flex;
          justify-content:space-between;
          gap:18px;
          padding:16px 17px;
          border:1px solid rgba(255,255,255,.11);
          border-radius:10px;
          background:#0a2236;
          color:#fff;
          font-weight:850;
          line-height:1.35;
          text-decoration:none;
          transition:border-color .18s ease, color .18s ease, transform .18s ease;
        }
        .broker-organic-links a:after {
          content:"→";
          color:#f6a700;
        }
        .broker-organic-links a:hover {
          border-color:#f6a700;
          color:#f6b51f;
          transform:translateY(-1px);
        }
        @media(max-width:820px) {
          .broker-organic-section { padding:56px 0; }
          .broker-organic-grid { grid-template-columns:1fr; gap:28px; }
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
                  <small>30-day priority placement · Select Featured ↓</small>
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
            <h2>Expand the listing&apos;s exposure without surrendering the relationship</h2>
            <p>FLLM provides the marketplace and inquiry routing. You remain responsible for your client, representation and transaction.</p>
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
              <span>Florida Liquor License Broker Listings</span>
              <h2 id="broker-marketplace-seo-heading">Advertise a Florida liquor license for sale while keeping the broker relationship</h2>
              <p>
                FLLM gives Florida liquor license brokers a direct way to list and advertise client inventory in a specialized statewide marketplace. The broker remains the identified representative and transaction contact, while buyers can discover the license through FLLM&apos;s marketplace, license-type pages and county market pages.
              </p>
              <p>
                Broker-submitted inventory can include <Link href="/florida-4cop-liquor-license-for-sale">Florida 4COP quota liquor licenses for sale</Link> and <Link href="/florida-3ps-liquor-license-for-sale">Florida 3PS package-store licenses</Link>, subject to FLLM review. Brokers can also use <Link href="/counties">Florida county liquor-license market pages</Link> and the <Link href="/florida-quota-liquor-license-market-report">statewide quota-license market report</Link> to compare current inventory and asking-price evidence before positioning a client listing.
              </p>
              <p>
                The objective is straightforward: give brokers another place to market a Florida liquor license without replacing the broker, taking over the client relationship or claiming a share of the broker&apos;s commission.
              </p>
            </div>
            <nav className="broker-organic-links" aria-label="Florida broker marketplace resources">
              <Link href="/florida-4cop-liquor-license-for-sale">4COP quota license marketplace</Link>
              <Link href="/florida-3ps-liquor-license-for-sale">3PS package-store marketplace</Link>
              <Link href="/counties">Florida county market pages</Link>
              <Link href="/listings">Current Florida liquor licenses for sale</Link>
              <Link href="/florida-liquor-license-broker">Florida liquor license broker services</Link>
            </nav>
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
              <p className="broker-preview-caption">Receives the Featured Listing badge and priority placement for 30 days, then continues as a Standard listing.</p>
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
