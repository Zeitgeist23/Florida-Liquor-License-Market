import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../resources/forms/abt-forms.css";
import "../florida-liquor-licenses-for-sale/seo-market.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/buy-florida-liquor-license`;

export const metadata: Metadata = {
  title: "Buy a Florida Liquor License | 4COP & 3PS Licenses for Sale",
  description:
    "Buy a Florida liquor license with current 4COP and 3PS listings, county market data, pricing guidance, financing resources and DBPR transfer information.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Buy a Florida Liquor License | 4COP & 3PS Licenses for Sale",
    description:
      "Find Florida liquor licenses for sale and learn the buying process from county selection through transfer.",
    siteName: "Florida Liquor License Market",
  },
};

export default function BuyFloridaLiquorLicensePage() {
  return (
    <main className="seo-market-page">
      <div className="abt-header-wrap">
        <FormsSiteHeader primaryActionHref="/listings" primaryActionLabel="Browse Licenses" />
      </div>

      <section className="seo-market-hero">
        <div className="seo-market-shell">
          <div className="seo-market-breadcrumbs">
            <Link href="/">Home</Link><span>›</span><strong>Buy a Florida Liquor License</strong>
          </div>
          <div className="seo-market-hero-grid">
            <div>
              <span className="seo-market-kicker">Florida Liquor License Buyer Hub</span>
              <h1>Buy a Florida Liquor License</h1>
              <p>
                Browse Florida liquor licenses for sale and use FLLM buyer resources to compare 4COP and 3PS inventory, county markets, asking prices, financing options and transfer requirements.
              </p>
              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href="/listings">Browse Florida Liquor Licenses for Sale</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/florida-4cop-liquor-license-for-sale">View 4COP Licenses</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/florida-3ps-liquor-license-for-sale">View 3PS Licenses</Link>
              </div>
            </div>
            <aside className="seo-market-snapshot" aria-label="Florida liquor license buyer resources">
              <span>Buyer Resources</span>
              <div className="seo-market-snapshot-grid">
                <div><strong>67</strong><small>county markets</small></div>
                <div><strong>4COP</strong><small>full-liquor inventory</small></div>
                <div><strong>3PS</strong><small>package-store inventory</small></div>
                <div><strong>ABT</strong><small>transfer resources</small></div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Start With the Market</span>
          <h2>Find the right Florida liquor license before you negotiate</h2>
          <p>
            Florida quota licenses are county-specific, and market prices can differ substantially by county and license type. Start with the county where the license will be used, determine the privileges the business needs, then compare current inventory and asking prices.
          </p>
          <div className="seo-market-actions">
            <Link className="seo-market-button seo-market-button-gold" href="/counties">Compare County Markets</Link>
            <Link className="seo-market-button seo-market-button-dark" href="/resources/florida-liquor-license-types">Compare License Types</Link>
          </div>
        </div>
      </section>

      <section className="seo-market-section">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Current Inventory</span>
          <h2>Florida 4COP and 3PS liquor licenses for sale</h2>
          <p>
            Buyers looking for full-liquor quota privileges can review current Florida 4COP listings. Buyers looking for package-store privileges can review current 3PS-family listings. The statewide Listings page combines both markets and lets you filter by county, asking price and availability.
          </p>
          <div className="seo-market-actions">
            <Link className="seo-market-button seo-market-button-gold" href="/florida-4cop-liquor-license-for-sale">Browse 4COP Inventory</Link>
            <Link className="seo-market-button seo-market-button-dark" href="/florida-3ps-liquor-license-for-sale">Browse 3PS Inventory</Link>
            <Link className="seo-market-button seo-market-button-dark" href="/listings">View All Listings</Link>
          </div>
        </div>
      </section>

      <section className="seo-market-section seo-market-section-alt">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Pricing</span>
          <h2>What should you pay for a Florida liquor license?</h2>
          <p>
            There is no single statewide market price for transferable quota licenses. Asking prices vary by county, license category, supply, seller terms and market conditions. Use FLLM's valuation and county-market pages to compare the license you are considering with current marketplace information.
          </p>
          <div className="seo-market-actions">
            <Link className="seo-market-button seo-market-button-gold" href="/florida-liquor-license-value">Estimate License Value</Link>
            <Link className="seo-market-button seo-market-button-dark" href="/florida-quota-liquor-license-cost">Review License Cost Guide</Link>
          </div>
        </div>
      </section>

      <section className="seo-market-section">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Transfer & Financing</span>
          <h2>Prepare for the transaction</h2>
          <p>
            Before closing, verify the specific license, seller, status, disclosed liens or security interests, proposed premises, zoning and transfer requirements. Florida DBPR identifies ABT-6002 as the ownership-transfer application for an existing alcoholic beverage license. Buyers who need capital can also review FLLM financing resources.
          </p>
          <div className="seo-market-actions">
            <Link className="seo-market-button seo-market-button-gold" href="/dbpr-abt-6002">Review ABT-6002</Link>
            <Link className="seo-market-button seo-market-button-dark" href="/financing">Explore Financing</Link>
            <Link className="seo-market-button seo-market-button-dark" href="/resources/forms">View Florida ABT Forms</Link>
          </div>
        </div>
      </section>

      <section className="seo-market-cta">
        <div className="seo-market-shell">
          <span>Florida Marketplace Inventory</span>
          <h2>Ready to buy a Florida liquor license?</h2>
          <p>Search current listings by county, license type, asking price and availability.</p>
          <div className="seo-market-actions">
            <Link className="seo-market-button seo-market-button-gold" href="/listings">Browse Current Listings</Link>
            <Link className="seo-market-button seo-market-button-dark" href="/counties">Browse by County</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
