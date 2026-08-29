import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import FloridaCountyMap from "@/components/FloridaCountyMap";
import BrokerListingForm from "./BrokerListingForm";
import styles from "./broker-listing.module.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/brokers/list-your-license`;

export const metadata: Metadata = {
  title: "List a Client’s Florida Liquor License | FLLM for Brokers",
  description:
    "Florida brokers can advertise a client’s quota liquor license on FLLM with Standard and Featured one-time marketplace listing options.",
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
  [
    "Publish",
    "The approved listing identifies you as the independent representative.",
  ],
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
      "No. Standard and Featured charges are one-time listing-submission fees. FLLM does not seek or receive any portion of the submitting broker’s commission.",
  },
  {
    question: "What does the Featured option include?",
    answer:
      "A Featured listing receives a Featured badge and priority marketplace placement for 30 days after publication. It then remains live as a Standard listing until sold, withdrawn or otherwise removed.",
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

function ListingPreview({ featured = false }: { featured?: boolean }) {
  return (
    <article
      className={`${styles.previewCard} ${featured ? styles.previewFeatured : ""}`}
      aria-label={`${featured ? "Featured" : "Standard"} marketplace listing preview`}
    >
      {featured ? (
        <span className={styles.previewFeaturedBadge}>Featured</span>
      ) : null}
      <span className={styles.previewType}>4COP Quota</span>
      <div className={styles.previewCopy}>
        <span className={styles.previewCounty}>● Orange County</span>
        <strong>$435,000</strong>
        <span className={styles.previewAvailable}>
          <i /> Available
        </span>
        <p>
          Transferable Florida quota liquor-license opportunity. Price and
          availability subject to confirmation.
        </p>
        <span className={styles.previewBroker}>Listed by Sample Brokerage</span>
        <span className={styles.previewButton}>
          View License <b>›</b>
        </span>
      </div>
      <div className={styles.previewMap}>
        <FloridaCountyMap county="Orange County" enlarged />
      </div>
    </article>
  );
}

export default function BrokerListYourLicensePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "FLLM Independent Broker Marketplace Listing",
    provider: {
      "@type": "Organization",
      name: "Florida Liquor License Market",
      url: siteUrl,
    },
    areaServed: { "@type": "State", name: "Florida" },
    offers: [
      {
        "@type": "Offer",
        name: "Standard Broker Listing",
        price: "14.95",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: "Featured Broker Listing",
        price: "24.95",
        priceCurrency: "USD",
      },
    ],
    description:
      "Advertising-only marketplace listing for Florida brokers representing owners of quota liquor licenses.",
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
        }}
      />

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
              <span className={styles.kicker}>
                Independent Broker Marketplace
              </span>
              <h1>Add Your Client&apos;s Florida Liquor License to FLLM</h1>
              <p>
                Reach buyers searching Florida&apos;s specialized quota-license
                market while you remain the listing representative and
                transaction contact.
              </p>
              <div className={styles.heroActions}>
                <a className={styles.goldButton} href="#broker-listing-form">
                  Choose a Listing Option
                </a>
                <Link className={styles.outlineButton} href="/listings">
                  View Marketplace Listings
                </Link>
              </div>
              <small>
                Listings from $14.95 · No share of your commission · Statewide
                exposure
              </small>
            </div>
            <aside className={styles.priceCard}>
              <span>Choose Your Exposure</span>
              <div className={styles.heroPlans}>
                <div>
                  <em>Default</em>
                  <b>Standard</b>
                  <strong>$14.95</strong>
                  <small>Marketplace listing</small>
                </div>
                <div>
                  <b>Featured</b>
                  <strong>$24.95</strong>
                  <small>30-day priority placement</small>
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
            <h2>
              Expand the listing&apos;s exposure without surrendering the
              relationship
            </h2>
            <p>
              FLLM provides the marketplace and inquiry routing. You remain
              responsible for your client, representation and transaction.
            </p>
          </div>
          <div className={styles.benefitGrid}>
            {benefits.map((benefit) => (
              <article key={benefit}>
                <i>✓</i>
                <p>{benefit}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.previewSection} id="listing-previews">
        <div className={styles.shell}>
          <div className={styles.sectionHeading}>
            <span>Listing Appearance</span>
            <h2>See the difference before you choose</h2>
            <p>
              Both options use the same professional marketplace card. Featured
              adds a gold badge, stronger border treatment and priority
              placement for the first 30 days.
            </p>
          </div>
          <div className={styles.previewGrid}>
            <div>
              <div className={styles.previewLabel}>
                <span>Standard Listing</span>
                <strong>$14.95</strong>
              </div>
              <ListingPreview />
              <p className={styles.previewCaption}>
                Appears within the regular marketplace order and remains active
                until sold or withdrawn.
              </p>
            </div>
            <div>
              <div className={styles.previewLabel}>
                <span>Featured Listing</span>
                <strong>$24.95</strong>
              </div>
              <ListingPreview featured />
              <p className={styles.previewCaption}>
                Receives the Featured badge and priority placement for 30 days,
                then continues as a Standard listing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.distinctionSection}>
        <div className={styles.shell}>
          <div className={styles.sectionHeadingLight}>
            <span>Clear Marketplace Distinction</span>
            <h2>
              Independent broker advertising and FLLM representation are
              different services
            </h2>
          </div>
          <div className={styles.distinctionGrid}>
            <article>
              <span>Independent Broker Listing</span>
              <h3>You remain the representative</h3>
              <p>
                FLLM advertises the license and routes inquiries. Your name,
                brokerage and selected contact information identify you as the
                transaction contact.
              </p>
              <ul>
                <li>Standard or Featured one-time listing</li>
                <li>No FLLM commission</li>
                <li>Your client relationship remains yours</li>
              </ul>
            </article>
            <article>
              <span>FLLM-Represented Listing</span>
              <h3>Separate professional engagement</h3>
              <p>
                FLLM provides brokerage services only for matters accepted under
                a separate written agreement defining the client, services and
                compensation.
              </p>
              <ul>
                <li>Separate written agreement</li>
                <li>Defined representation and scope</li>
                <li>Professionally managed transaction support</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.processSection}>
        <div className={styles.shell}>
          <div className={styles.sectionHeading}>
            <span>How It Works</span>
            <h2>Four steps from submission to buyer inquiry</h2>
          </div>
          <div className={styles.steps}>
            {steps.map(([title, copy], index) => (
              <article key={title}>
                <b>{index + 1}</b>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.formSection} id="broker-listing-form">
        <div className={styles.shell}>
          <div className={styles.formIntro}>
            <span>Broker Submission</span>
            <h2>List a client&apos;s quota license</h2>
            <p>
              Complete the broker and license information below. You may keep
              the license number private while still providing it to FLLM for
              review.
            </p>
          </div>
          <BrokerListingForm />
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.shell}>
          <div className={styles.sectionHeading}>
            <span>Broker Questions</span>
            <h2>Before you submit</h2>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
          <div className={styles.multiListing}>
            <div>
              <span>Have several licenses to add?</span>
              <h3>Ask FLLM about coordinated broker inventory submissions.</h3>
            </div>
            <a href="mailto:listings@floridaliquorlicensemarket.com?subject=Multiple%20Broker%20Listings">
              Contact the Listings Team
            </a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.shell}>
          <Image
            src="/assets/brand-footer.svg"
            alt="Florida Liquor License Market"
            width={215}
            height={78}
          />
          <p>
            Independent broker marketplace listings are advertising services
            only. FLLM does not provide legal, tax, title or regulatory advice
            and does not guarantee publication, availability, transfer approval
            or closing.
          </p>
          <Link href="/contact">Contact FLLM</Link>
        </div>
      </footer>
    </main>
  );
}
