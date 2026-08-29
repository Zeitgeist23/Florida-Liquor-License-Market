import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import BrokerListingForm from "./BrokerListingForm";
import styles from "./broker-listing.module.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/brokers/list-your-license`;

export const metadata: Metadata = {
  title: "List a Client’s Florida Liquor License | FLLM for Brokers",
  description:
    "Florida business and real estate brokers can advertise a client’s quota liquor license on FLLM for a one-time $14.95 fee and receive buyer inquiries directly.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "FLLM Marketplace Listings for Florida Brokers",
    description:
      "Add a client’s Florida quota liquor license to FLLM while remaining the listing representative and transaction contact.",
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
    question: "Does FLLM become my client’s broker?",
    answer:
      "No. A broker-submitted marketplace listing is advertising only. You remain the listing representative and control the client relationship, communications and transaction.",
  },
  {
    question: "Does FLLM receive part of my commission?",
    answer:
      "No. The $14.95 charge is a one-time listing-submission fee. FLLM does not seek or receive any portion of the submitting broker’s commission.",
  },
  {
    question: "Will my contact information appear on the listing?",
    answer:
      "Yes. After review and approval, the listing can identify your name and brokerage and use the business contact information you designate for buyer inquiries.",
  },
  {
    question: "Is payment a guarantee that the listing will be published?",
    answer:
      "No. FLLM reviews each submission for accuracy, authority and marketplace fit. A rejected submission is eligible for a refund of the listing-submission fee.",
  },
];

export default function BrokerListYourLicensePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "FLLM Independent Broker Marketplace Listing",
    provider: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
    areaServed: { "@type": "State", name: "Florida" },
    offers: { "@type": "Offer", price: "14.95", priceCurrency: "USD" },
    description:
      "Advertising-only marketplace listing for Florida brokers representing owners of quota liquor licenses.",
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <div className={styles.headerWrap}>
        <FormsSiteHeader
          primaryActionHref="#broker-listing-form"
          primaryActionLabel="List a Client License"
        />
      </div>

      <section className={styles.hero}>
        <Image className={styles.heroImage} src="/assets/hero-bar-clean.png" alt="Premium Florida hospitality venue" fill priority sizes="100vw" />
        <div className={styles.heroShade} />
        <div className={styles.shell}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span><Link href="/florida-liquor-license-broker">Broker Services</Link><span>›</span><strong>List a Client License</strong>
          </nav>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.kicker}>Independent Broker Marketplace</span>
              <h1>Add Your Client&apos;s Florida Liquor License to FLLM</h1>
              <p>Reach buyers searching Florida&apos;s specialized quota-license market while you remain the listing representative and transaction contact.</p>
              <div className={styles.heroActions}>
                <a className={styles.goldButton} href="#broker-listing-form">Start a Broker Listing — $14.95</a>
                <Link className={styles.outlineButton} href="/listings">View Marketplace Listings</Link>
              </div>
              <small>One-time submission fee · No share of your commission · Statewide exposure</small>
            </div>
            <aside className={styles.priceCard}>
              <span>Broker Marketplace Listing</span>
              <strong><sup>$</sup>14<small>.95</small></strong>
              <p>One-time listing-submission fee</p>
              <ul><li>No recurring charge</li><li>No FLLM commission</li><li>Publication after review</li></ul>
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
          <div className={styles.benefitGrid}>{benefits.map((benefit) => <article key={benefit}><i>✓</i><p>{benefit}</p></article>)}</div>
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
              <span>Independent Broker Listing</span><h3>You remain the representative</h3>
              <p>FLLM advertises the license and routes inquiries. Your name, brokerage and selected contact information identify you as the transaction contact.</p>
              <ul><li>$14.95 one-time fee</li><li>No FLLM commission</li><li>Your client relationship remains yours</li></ul>
            </article>
            <article>
              <span>FLLM-Represented Listing</span><h3>Separate professional engagement</h3>
              <p>FLLM provides brokerage services only for matters accepted under a separate written agreement defining the client, services and compensation.</p>
              <ul><li>Separate written agreement</li><li>Defined representation and scope</li><li>Professionally managed transaction support</li></ul>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.processSection}>
        <div className={styles.shell}>
          <div className={styles.sectionHeading}><span>How It Works</span><h2>Four steps from submission to buyer inquiry</h2></div>
          <div className={styles.steps}>{steps.map(([title, copy], index) => <article key={title}><b>{index + 1}</b><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </div>
      </section>

      <section className={styles.formSection} id="broker-listing-form">
        <div className={styles.shell}>
          <div className={styles.formIntro}><span>Broker Submission</span><h2>List a client&apos;s quota license</h2><p>Complete the broker and license information below. You may keep the license number private while still providing it to FLLM for review.</p></div>
          <BrokerListingForm />
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.shell}>
          <div className={styles.sectionHeading}><span>Broker Questions</span><h2>Before you submit</h2></div>
          <div className={styles.faqList}>{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
          <div className={styles.multiListing}><div><span>Have several licenses to add?</span><h3>Ask FLLM about coordinated broker inventory submissions.</h3></div><a href="mailto:listings@floridaliquorlicensemarket.com?subject=Multiple%20Broker%20Listings">Contact the Listings Team</a></div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.shell}><Image src="/assets/brand-footer.svg" alt="Florida Liquor License Market" width={215} height={78} /><p>Independent broker marketplace listings are advertising services only. FLLM does not provide legal, tax, title or regulatory advice and does not guarantee publication, availability, transfer approval or closing.</p><Link href="/contact">Contact FLLM</Link></div>
      </footer>
    </main>
  );
}
