import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import FeaturedSellerListingForm from "./FeaturedSellerListingForm";
import styles from "@/app/brokers/list-your-license/broker-listing.module.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/sell-your-license/featured`;

export const metadata: Metadata = {
  title: "Featured Self-Directed Liquor License Listing | FLLM",
  description:
    "Create a Featured self-directed Florida liquor-license listing for a one-time $24.95 fee with 30 days of priority marketplace placement.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Featured Self-Directed Listing | Florida Liquor License Market",
    description:
      "Receive a Featured badge and 30 days of priority marketplace placement while remaining the direct seller contact.",
    siteName: "Florida Liquor License Market",
  },
};

const benefits = [
  "Featured badge for the first 30 days after publication",
  "Priority marketplace placement for 30 days",
  "Buyer inquiries directed to the seller",
  "No brokerage representation or FLLM commission",
  "Listing continues as Standard after the Featured period",
  "One-time $24.95 listing-submission fee",
];

export default function FeaturedSelfDirectedListingPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "FLLM Featured Self-Directed Listing",
    provider: {
      "@type": "Organization",
      name: "Florida Liquor License Market",
      url: siteUrl,
    },
    areaServed: { "@type": "State", name: "Florida" },
    offers: {
      "@type": "Offer",
      price: "24.95",
      priceCurrency: "USD",
    },
    description:
      "Featured advertising-only marketplace listing for a Florida quota liquor-license seller.",
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
          primaryActionHref="#featured-seller-form"
          primaryActionLabel="Create Featured Listing"
        />
      </div>

      <section className={styles.hero}>
        <Image
          className={styles.heroImage}
          src="/assets/hero-bar-clean.png"
          alt="Florida hospitality venue"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroShade} />
        <div className={styles.shell}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/sell-your-license">List Your License</Link>
            <span>›</span>
            <strong>Featured Self-Directed</strong>
          </nav>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.kicker}>Featured Seller Marketplace Listing</span>
              <h1>Give Your Florida Liquor License More Marketplace Visibility</h1>
              <p>
                Remain the direct seller contact while your approved listing receives a Featured badge and priority placement for its first 30 days on Florida Liquor License Market.
              </p>
              <div className={styles.heroActions}>
                <a className={styles.goldButton} href="#featured-seller-form">
                  Create Featured Listing
                </a>
                <Link className={styles.outlineButton} href="/sell-your-license">
                  View Standard Option
                </Link>
              </div>
              <small>$24.95 one-time fee · No FLLM commission · Direct buyer inquiries</small>
            </div>
            <aside className={styles.priceCard}>
              <span>Featured Self-Directed</span>
              <div className={styles.heroPlans}>
                <div>
                  <b>Featured</b>
                  <strong>$24.95</strong>
                  <small>30-day priority placement</small>
                </div>
              </div>
              <ul>
                <li>Featured badge for 30 days</li>
                <li>Priority placement for 30 days</li>
                <li>Then continues as Standard</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.benefitSection}>
        <div className={styles.shell}>
          <div className={styles.sectionHeading}>
            <span>More Visibility, Same Seller Control</span>
            <h2>Featured placement without giving up control of the transaction</h2>
            <p>
              FLLM provides the marketplace advertising. You remain responsible for buyer communications, negotiations, professional advice, transfer documents and closing coordination.
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

      <section className={styles.formSection} id="featured-seller-form">
        <div className={styles.shell}>
          <div className={styles.formIntro}>
            <span>Featured Seller Submission</span>
            <h2>Create your Featured self-directed listing</h2>
            <p>
              Complete the seller and license information below. FLLM reviews submissions before publication. Payment does not guarantee publication; rejected submissions are eligible for a refund.
            </p>
          </div>
          <FeaturedSellerListingForm />
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
            Self-directed marketplace listings are advertising services only. FLLM does not represent the seller in the transaction and does not provide legal, tax, title or regulatory advice.
          </p>
          <Link href="/contact">Contact FLLM</Link>
        </div>
      </footer>
    </main>
  );
}
