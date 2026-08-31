import type { Metadata } from "next";
import Link from "next/link";

import BrokerBacklinkGenerator from "@/components/BrokerBacklinkGenerator";
import "./broker-link-kit.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/brokers/link-to-your-fllm-listing`;

export const metadata: Metadata = {
  title: "Broker Listing Link Kit | Florida Liquor License Market",
  description:
    "Generate a clean HTML link from your brokerage or seller website to your live Florida Liquor License Market listing.",
  alternates: { canonical: canonicalUrl },
  robots: { index: false, follow: true },
};

export default function BrokerListingLinkKitPage() {
  return (
    <main className="broker-link-kit-page">
      <header className="broker-link-kit-header broker-link-kit-shell">
        <Link className="broker-link-kit-brand" href="/" aria-label="Florida Liquor License Market home">
          <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
        </Link>
        <nav aria-label="Broker listing navigation">
          <Link href="/brokers/list-your-license">List a License</Link>
          <Link href="/listings">Marketplace Listings</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      <section className="broker-link-kit-hero">
        <div className="broker-link-kit-shell">
          <span>Broker &amp; Seller Utility</span>
          <h1>Link Your Website to Your FLLM Listing</h1>
          <p>
            Once your listing is live on Florida Liquor License Market, use this generator to create a direct HTML link from your own brokerage, law-firm, seller or business website to the current FLLM listing page.
          </p>
        </div>
      </section>

      <section className="broker-link-kit-shell broker-link-kit-content">
        <div className="broker-link-kit-intro">
          <div>
            <span>Why use the direct listing link?</span>
            <h2>Give buyers one current marketplace destination</h2>
          </div>
          <p>
            The link sends visitors directly to the live listing page where they can review the current license type, county, asking price and inquiry options. If the listing URL changes, update the link on your website so it continues to point to the current page.
          </p>
        </div>

        <BrokerBacklinkGenerator />

        <div className="broker-link-kit-guidance">
          <article>
            <strong>Use the exact live listing URL</strong>
            <p>Open your FLLM listing, copy the complete address from the browser and paste it into the generator.</p>
          </article>
          <article>
            <strong>Use natural descriptive anchor text</strong>
            <p>Describe the listing or marketplace naturally rather than forcing repetitive keyword-heavy anchor text.</p>
          </article>
          <article>
            <strong>Keep your own disclosures intact</strong>
            <p>Your website remains responsible for its own brokerage, agency, advertising and regulatory disclosures.</p>
          </article>
        </div>

        <div className="broker-link-kit-cta">
          <div>
            <span>Need a listing URL first?</span>
            <strong>Publish your license on FLLM</strong>
          </div>
          <Link href="/brokers/list-your-license">Go to Broker Listing Submission</Link>
        </div>
      </section>
    </main>
  );
}
