import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import { indexableCounties } from "@/data/florida-counties";
import { getMarketplaceListings } from "@/lib/listing-store";
import "../resources/forms/abt-forms.css";
import "../florida-liquor-licenses-for-sale/seo-market.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-quota-liquor-license-cost`;

export const metadata: Metadata = {
  title: "Florida Liquor License Cost by County | 4COP & 3PS Prices",
  description:
    "See Florida liquor license cost by county using current disclosed 4COP and 3PS asking prices. Compare quota-license prices, county markets, state fees and current listings.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Liquor License Cost by County | 4COP & 3PS Prices",
    description:
      "Compare current Florida quota liquor-license asking prices by county, including 4COP and 3PS marketplace inventory.",
    siteName: "Florida Liquor License Market",
  },
};

export const dynamic = "force-dynamic";

function money(value: number | null) {
  if (value === null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function median(values: number[]) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[middle]
    : Math.round((sorted[middle - 1] + sorted[middle]) / 2);
}

export default async function FloridaQuotaLiquorLicenseCostPage() {
  const marketplaceListings = await getMarketplaceListings();
  const quotaListings = marketplaceListings.filter(
    (listing) =>
      Boolean(listing.sourceRef) &&
      (listing.type === "4COP Quota" || listing.type.includes("3PS")),
  );
  const pricedListings = quotaListings.filter(
    (listing): listing is typeof listing & { price: number } => Number.isFinite(listing.price),
  );
  const statewidePrices = pricedListings.map((listing) => listing.price);
  const statewideLow = statewidePrices.length ? Math.min(...statewidePrices) : null;
  const statewideMedian = median(statewidePrices);
  const statewideHigh = statewidePrices.length ? Math.max(...statewidePrices) : null;

  const countyRows = indexableCounties.map((county) => {
    const listings = quotaListings.filter((listing) => listing.county === county.name);
    const priced = listings.filter(
      (listing): listing is typeof listing & { price: number } => Number.isFinite(listing.price),
    );
    const prices = priced.map((listing) => listing.price);
    return {
      county,
      total: listings.length,
      fourCop: listings.filter((listing) => listing.type === "4COP Quota").length,
      threePs: listings.filter((listing) => listing.type.includes("3PS")).length,
      low: prices.length ? Math.min(...prices) : null,
      med: median(prices),
      high: prices.length ? Math.max(...prices) : null,
    };
  });

  const faqs = [
    {
      question: "How much does a Florida quota liquor license cost?",
      answer:
        "There is no single statewide resale price for a Florida quota liquor license. Market asking prices vary by county, license type, available supply, buyer demand, license status and seller terms. FLLM uses current disclosed marketplace asking prices to provide a live market snapshot rather than a guaranteed appraisal.",
    },
    {
      question: "Why does Florida liquor license cost vary by county?",
      answer:
        "Florida quota licenses are county-specific, so the supply-and-demand market is different in each county. A 4COP or 3PS opportunity in one county can therefore have a materially different asking price from the same general category in another county.",
    },
    {
      question: "Is the market price the same as the DBPR license fee?",
      answer:
        "No. The private-market purchase price of a transferable quota license is separate from state annual license fees, transfer-related fees and other filing costs. FLLM maintains a separate Florida ABT license-fee reference for those government charges.",
    },
    {
      question: "What is the difference between 4COP and 3PS pricing?",
      answer:
        "4COP quota licenses are commonly sought for full-liquor on-premises concepts, while 3PS-family quota licenses are commonly sought for package-store sales. Their market prices can differ within the same county depending on inventory and demand.",
    },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Florida Liquor License Cost by County",
      url: canonicalUrl,
      description:
        "Florida quota liquor-license asking-price guide by county using current disclosed 4COP and 3PS marketplace inventory.",
      isPartOf: { "@type": "WebSite", name: "Florida Liquor License Market", url: siteUrl },
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
  ];

  return (
    <main className="seo-market-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />
      <style>{`
        .quota-cost-table-wrap{overflow-x:auto;border:1px solid rgba(237,169,26,.28);border-radius:14px;background:#071d33}
        .quota-cost-table{width:100%;min-width:860px;border-collapse:collapse;color:#eef3f8}
        .quota-cost-table th,.quota-cost-table td{padding:13px 14px;border-bottom:1px solid rgba(255,255,255,.07);text-align:right;font-size:13px}
        .quota-cost-table th:first-child,.quota-cost-table td:first-child{text-align:left}
        .quota-cost-table thead th{color:#eda91a;background:#051a2e;font-size:11px;letter-spacing:.06em;text-transform:uppercase}
        .quota-cost-table tbody tr:hover{background:rgba(237,169,26,.055)}
        .quota-cost-table a{color:#f6f3ed;font-weight:800;text-decoration:none}.quota-cost-table a:hover{color:#eda91a}
        .quota-cost-empty{color:#8297aa;font-size:12px}
        .quota-cost-note{margin-top:14px;color:#8fa3b7;font-size:12px;line-height:1.6}
        .quota-cost-links{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:22px}
        .quota-cost-links a{padding:18px;border:1px solid rgba(237,169,26,.3);border-radius:11px;background:#071d33;color:#f6f3ed;text-decoration:none;font-weight:800}
        .quota-cost-links a span{display:block;margin-top:6px;color:#9fb2c4;font-size:12px;font-weight:500;line-height:1.45}
        @media(max-width:760px){.quota-cost-links{grid-template-columns:1fr}}
      `}</style>

      <div className="abt-header-wrap"><FormsSiteHeader /></div>

      <section className="seo-market-hero">
        <div className="seo-market-shell">
          <div className="seo-market-breadcrumbs">
            <Link href="/">Home</Link><span>›</span><Link href="/counties">Counties</Link><span>›</span><strong>Quota License Cost</strong>
          </div>
          <div className="seo-market-hero-grid">
            <div>
              <span className="seo-market-kicker">Florida Quota License Pricing Guide</span>
              <h1>Florida Liquor License Cost by County</h1>
              <p>
                How much does a Florida quota liquor license cost? There is no single statewide market price. Compare current disclosed 4COP and 3PS asking prices by county, then open the county market or live listing to review the opportunities behind the numbers.
              </p>
              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href="/florida-4cop-liquor-license-for-sale">4COP Licenses for Sale</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/florida-3ps-liquor-license-for-sale">3PS Licenses for Sale</Link>
              </div>
            </div>
            <aside className="seo-market-snapshot" aria-label="Current Florida quota license pricing snapshot">
              <span>Current Disclosed Asking-Price Snapshot</span>
              <div className="seo-market-snapshot-grid">
                <div><strong>{money(statewideLow)}</strong><small>lowest disclosed ask</small></div>
                <div><strong>{money(statewideMedian)}</strong><small>statewide median ask</small></div>
                <div><strong>{money(statewideHigh)}</strong><small>highest disclosed ask</small></div>
                <div><strong>{pricedListings.length}</strong><small>priced quota listings</small></div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell seo-market-intro-grid">
          <article>
            <span className="seo-market-section-kicker">Market Price vs. State Fee</span>
            <h2>What “Florida liquor license cost” actually means</h2>
            <p>
              Buyers often use “liquor license cost” to mean the private-market price of a transferable quota license. That market price is negotiated between buyer and seller and can vary sharply by county. It is different from DBPR annual license fees, transfer-related fees, fingerprinting, local requirements and other filing costs.
            </p>
            <p>
              This page focuses on <strong>market asking prices</strong>. For government license fees, use FLLM’s <Link href="/resources/license-fees">Florida ABT license-fee guide</Link>. For transaction-specific professional advice, consult the appropriate licensed professional.
            </p>
          </article>
          <aside className="seo-market-callout">
            <strong>How to read the county table</strong>
            <ul>
              <li>Low, median and high figures use currently disclosed asking prices in FLLM’s marketplace data.</li>
              <li>A dash means FLLM does not currently have a disclosed asking price for that county.</li>
              <li>Asking price is not the same as final sale price or appraised value.</li>
              <li>Listings and prices can change as inventory enters or leaves the market.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading">
            <div>
              <span className="seo-market-section-kicker">All Florida County Markets</span>
              <h2>Florida quota liquor license prices by county</h2>
            </div>
            <Link href="/counties">Browse county market pages ›</Link>
          </div>
          <div className="quota-cost-table-wrap">
            <table className="quota-cost-table">
              <thead>
                <tr>
                  <th>County</th><th>4COP listings</th><th>3PS listings</th><th>Lowest ask</th><th>Median ask</th><th>Highest ask</th>
                </tr>
              </thead>
              <tbody>
                {countyRows.map((row) => (
                  <tr key={row.county.slug}>
                    <td><Link href={`/counties/${row.county.slug}`}>{row.county.name}</Link></td>
                    <td>{row.fourCop}</td>
                    <td>{row.threePs}</td>
                    <td>{row.low === null ? <span className="quota-cost-empty">No disclosed ask</span> : money(row.low)}</td>
                    <td>{row.med === null ? <span className="quota-cost-empty">—</span> : money(row.med)}</td>
                    <td>{row.high === null ? <span className="quota-cost-empty">—</span> : money(row.high)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="quota-cost-note">
            Marketplace snapshot only. Availability, asking prices, license status and transaction terms should be independently confirmed before relying on them.
          </p>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Related Florida License Markets</span>
          <h2>Go from price research to a live opportunity</h2>
          <div className="quota-cost-links">
            <Link href="/florida-4cop-liquor-license-for-sale">Florida 4COP Liquor Licenses for Sale<span>Compare current full-liquor quota listings and asking prices.</span></Link>
            <Link href="/florida-3ps-liquor-license-for-sale">Florida 3PS Liquor Licenses for Sale<span>Compare current package-store quota opportunities.</span></Link>
            <Link href="/florida-liquor-license-value">Florida Liquor License Value Estimator<span>Calculate a county-specific market range from current asking-price comparables.</span></Link>
            <Link href="/sell-your-license">Sell My Florida Liquor License<span>List your license or request broker-assisted selling support.</span></Link>
          </div>
        </div>
      </section>

      <section className="seo-market-faq">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading"><div><span className="seo-market-section-kicker">Pricing Questions</span><h2>Florida liquor license cost FAQ</h2></div></div>
          <div className="seo-market-faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section className="seo-market-cta">
        <div className="seo-market-shell seo-market-cta-inner">
          <div><span className="seo-market-section-kicker">Need a County-Specific Answer?</span><h2>Compare inventory or estimate your selling price.</h2><p>Use live county inventory for buyer research or start a confidential seller intake if you own a Florida quota license.</p></div>
          <div className="seo-market-actions"><Link className="seo-market-button seo-market-button-gold" href="/florida-liquor-license-value">Calculate License Value</Link><Link className="seo-market-button seo-market-button-dark" href="/sell-your-license">Sell Your License</Link></div>
        </div>
      </section>
    </main>
  );
}
