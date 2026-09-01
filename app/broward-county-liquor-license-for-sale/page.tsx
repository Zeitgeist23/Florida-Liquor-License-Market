import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import MarketplaceListingCard from "@/components/MarketplaceListingCard";
import { listingPageHref } from "@/lib/listing-page-urls";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";

import "../resources/forms/abt-forms.css";
import "../listings/listings-premium.css";
import "../listings/listings-header-position.css";
import "../listings/listings-map-size.css";
import "../listings/listings-county-links.css";
import "../listings/listings-navy-refresh.css";
import "../listings/listings-card-gold-borders.css";
import "../listings/listings-title-highlight.css";
import "../listings/listings-regression-fix.css";
import "../listings/listings-filter-depth.css";
import "../listings/listings-logo-3pct-lock.css";
import "../listings/listings-conversion-cards.css";
import "../listings/listings-card-overlap-fix.css";
import "../listings/listings-masthead-darker.css";
import "../listings/listings-mobile-header-fix.css";
import "../listings/listings-view-button-edge-fix.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/broward-county-liquor-license-for-sale`;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Broward County Liquor License for Sale | 4COP & 3PS | FLLM",
  description:
    "Browse current Broward County, Florida liquor licenses for sale, including transferable 4COP quota and 3PS package-store opportunities serving Fort Lauderdale, Hollywood and Pompano Beach.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Broward County Liquor License for Sale | FLLM",
    description:
      "Current Broward County 4COP and 3PS quota liquor-license inventory, asking prices and individual listing pages.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Broward County Liquor License for Sale | FLLM",
    description:
      "Browse current Broward County, Florida 4COP and 3PS quota liquor-license inventory and asking prices.",
  },
};

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function shortType(type: "4COP Quota" | "3PS Quota / Package Store") {
  return type === "4COP Quota" ? "4COP" : "3PS";
}

export default async function BrowardCountyLiquorLicenseForSalePage() {
  const browardListings = getVisibleAvailableMarketplaceListings(
    await getMarketplaceListings(),
  ).filter((listing) => listing.county === "Broward County");

  const disclosedPrices = browardListings
    .map((listing) => listing.price)
    .filter((price): price is number => Number.isFinite(price))
    .sort((a, b) => a - b);

  const low = disclosedPrices[0] ?? null;
  const high = disclosedPrices[disclosedPrices.length - 1] ?? null;
  const middle = Math.floor(disclosedPrices.length / 2);
  const median = disclosedPrices.length
    ? disclosedPrices.length % 2
      ? disclosedPrices[middle]
      : Math.round((disclosedPrices[middle - 1] + disclosedPrices[middle]) / 2)
    : null;

  const marketSummary = browardListings.length
    ? low !== null && high !== null
      ? low === high
        ? `${browardListings.length} active Broward County liquor-license listing${browardListings.length === 1 ? "" : "s"} currently appear on FLLM, with a disclosed asking price of ${money(low)}.`
        : `${browardListings.length} active Broward County liquor-license listing${browardListings.length === 1 ? "" : "s"} currently appear on FLLM. Disclosed asking prices range from ${money(low)} to ${money(high)}${median === null ? "." : `, with a median disclosed ask of ${money(median)}.`}`
      : `${browardListings.length} active Broward County liquor-license listing${browardListings.length === 1 ? "" : "s"} currently appear on FLLM, including current 4COP and 3PS opportunities.`
    : "Broward County inventory changes as licenses are listed, repriced, sold, or withdrawn. Use the FLLM statewide marketplace and license alerts to monitor new opportunities.";

  const faqs = [
    {
      question: "Where can I find a Broward County liquor license for sale?",
      answer:
        "Current Broward County 4COP and 3PS quota-license opportunities are listed on this page when available. Each active opportunity opens its individual FLLM marketplace page with the current asking price, license type, marketplace reference and inquiry options.",
    },
    {
      question: "Can a Broward County quota liquor license be moved to another Florida county?",
      answer:
        "Florida quota liquor licenses are county-specific. A Broward County quota license is used within Broward County, subject to the proposed premises, local approvals, zoning and the applicable DBPR/ABT transfer or change-of-location process.",
    },
    {
      question: "What is the difference between a Broward County 4COP and 3PS license?",
      answer:
        "A 4COP quota license generally supports sales of beer, wine and spirits for consumption on premises as well as package sales, subject to the licensed operation. A 3PS quota license is generally associated with package-store sales for off-premises consumption. Transaction and premises requirements should be independently confirmed.",
    },
    {
      question: "Does a Broward County liquor-license listing include a business or real estate?",
      answer:
        "Not unless the individual listing expressly says so. FLLM marketplace listings generally concern liquor-license interests separately from an operating business, leasehold, equipment, inventory or real estate.",
    },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Broward County Liquor Licenses for Sale",
      url: canonicalUrl,
      description: marketSummary,
      about: { "@type": "Place", name: "Broward County, Florida" },
      isPartOf: {
        "@type": "WebSite",
        name: "Florida Liquor License Market",
        url: siteUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Current Broward County liquor licenses for sale",
      url: canonicalUrl,
      numberOfItems: browardListings.length,
      itemListElement: browardListings.map((listing, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `Broward County ${shortType(listing.type)} Liquor License for Sale — ${listing.priceLabel}`,
        url: `${siteUrl}${listingPageHref(listing)}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Florida Liquor Licenses for Sale",
          item: `${siteUrl}/listings`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Broward County Liquor Licenses for Sale",
          item: canonicalUrl,
        },
      ],
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
    <main className="broward-sale-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
        }}
      />

      <style>{`
        .broward-sale-page{min-height:100vh;background:#04111d;color:#fff}
        .broward-shell{width:min(1480px,calc(100% - 60px));margin:0 auto}
        .broward-hero{padding:64px 0 58px;border-bottom:1px solid rgba(237,169,26,.32);background:radial-gradient(circle at 82% 16%,rgba(41,103,145,.28),transparent 32%),linear-gradient(135deg,#0a2942,#051827 58%,#03101b)}
        .broward-breadcrumbs{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:26px;color:#9fb0bd;font-size:11px}.broward-breadcrumbs a{color:#f1aa1c}.broward-kicker{color:#f1aa1c;font-size:12px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
        .broward-hero h1{max-width:900px;margin:10px 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:clamp(42px,6vw,68px);line-height:1.02}.broward-hero p{max-width:900px;margin:0 0 12px;color:#d3dde4;font-size:17px;line-height:1.72}.broward-hero strong{color:#fff}
        .broward-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:26px}.broward-actions a{display:inline-flex;min-height:46px;align-items:center;justify-content:center;padding:0 18px;border-radius:6px;font-weight:900;text-decoration:none}.broward-actions .gold{border:1px solid #f0ab1c;color:#071521;background:linear-gradient(145deg,#ffc441,#e99b06);box-shadow:0 8px 18px rgba(0,0,0,.22)}.broward-actions .dark{border:1px solid rgba(255,255,255,.25);color:#fff;background:#071d31}
        .broward-inventory{padding:62px 0;background:#061827}.broward-heading{display:grid;grid-template-columns:1fr minmax(280px,480px);gap:28px;align-items:end;margin-bottom:26px}.broward-heading span,.broward-info span{color:#f1aa1c;font-size:11px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}.broward-heading h2,.broward-info h2,.broward-faq h2{margin:7px 0 0;font-size:clamp(30px,4vw,42px)}.broward-heading p{margin:0;color:#b9c7d1;line-height:1.65}
        .broward-results-scope{min-height:0!important;background:transparent!important;color:inherit!important}.broward-results-scope .results-grid{margin:0!important}.broward-empty{padding:28px;border:1px solid #9b741d;border-radius:8px;background:linear-gradient(145deg,#0b263b,#061725);box-shadow:0 10px 28px rgba(0,0,0,.28)}.broward-empty h3{margin:0 0 8px;color:#f3a700}.broward-empty p{color:#d2dce3}.broward-empty a{color:#f1aa1c;font-weight:900}
        .broward-info{padding:62px 0;background:#04111d}.broward-info-grid{display:grid;grid-template-columns:1fr 1fr;gap:22px}.broward-info article{padding:26px;border:1px solid rgba(255,255,255,.1);border-radius:10px;background:#071d31}.broward-info p,.broward-info li{color:#c8d3db;line-height:1.72}.broward-info ul{display:grid;gap:9px;padding-left:20px}
        .broward-faq{padding:60px 0 70px;background:#061827}.broward-faq details{border-bottom:1px solid rgba(255,255,255,.1)}.broward-faq summary{padding:18px 0;font-weight:850;cursor:pointer}.broward-faq details p{margin:0;padding:0 0 18px;color:#bfccd5;line-height:1.72}.broward-related{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}.broward-related a{color:#f1aa1c;text-decoration:underline;text-underline-offset:3px}
        @media(max-width:760px){.broward-heading,.broward-info-grid{grid-template-columns:1fr}.broward-shell{width:min(100% - 30px,1480px)}.broward-hero{padding-top:42px}}
      `}</style>

      <div className="abt-header-wrap">
        <FormsSiteHeader
          primaryActionHref="/sell-your-license"
          primaryActionLabel="List Your License"
        />
      </div>

      <section className="broward-hero">
        <div className="broward-shell">
          <nav className="broward-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span><Link href="/listings">Licenses for Sale</Link><span>›</span><strong>Broward County</strong>
          </nav>
          <span className="broward-kicker">Broward County, Florida Marketplace</span>
          <h1>Broward County Liquor Licenses for Sale</h1>
          <p>
            Looking for a <strong>Broward County liquor license for sale</strong> in Florida? FLLM tracks current transferable quota-license opportunities serving Fort Lauderdale, Hollywood, Pompano Beach, Pembroke Pines, Coral Springs, Miramar and the wider Broward County market.
          </p>
          <p>{marketSummary}</p>
          <div className="broward-actions">
            <a className="gold" href="#current-broward-inventory">View Current Broward Inventory</a>
            <Link className="dark" href="/counties/broward">Broward County Market Data</Link>
          </div>
        </div>
      </section>

      <section className="broward-inventory" id="current-broward-inventory">
        <div className="broward-shell">
          <div className="broward-heading">
            <div>
              <span>Current Marketplace Inventory</span>
              <h2>Broward County 4COP & 3PS licenses for sale</h2>
            </div>
            <p>
              These are the same live FLLM marketplace cards used on the statewide Listings page. Open an individual listing to review its current price, marketplace reference and inquiry options.
            </p>
          </div>

          {browardListings.length ? (
            <div className="results-page broward-results-scope">
              <div className="results-grid">
                {browardListings.map((listing) => (
                  <MarketplaceListingCard
                    key={listing.sourceRef ?? `${listing.type}-${listing.priceLabel}`}
                    listing={listing}
                  />
                ))}
              </div>
            </div>
          ) : (
            <article className="broward-empty">
              <h3>No active Broward listing displayed</h3>
              <p>
                Inventory can change quickly. Browse the statewide marketplace or create a license alert to monitor new Broward County opportunities.
              </p>
              <Link href="/listings?county=Broward%20County&status=available">
                Search Broward County Listings
              </Link>
            </article>
          )}
        </div>
      </section>

      <section className="broward-info">
        <div className="broward-shell broward-info-grid">
          <article>
            <span>Broward Buyer Context</span>
            <h2>Fort Lauderdale and Broward County quota-license market</h2>
            <p>
              Broward County is one of Florida&apos;s largest year-round hospitality markets, with dense population, beaches, boating, hotels, restaurants, nightlife and entertainment concentrated around Fort Lauderdale and surrounding cities.
            </p>
            <p>
              A quota license is county-specific. Buying the license does not by itself approve a particular premises or operating concept.
            </p>
          </article>
          <article>
            <span>Before You Buy</span>
            <h2>Verify the license and the proposed premises</h2>
            <ul>
              <li>Confirm the exact license series, status, ownership and current availability.</li>
              <li>Review liens, encumbrances, seller terms and any closing conditions.</li>
              <li>Confirm zoning, distance restrictions and local premises requirements.</li>
              <li>Complete the applicable Florida DBPR/ABT transfer or change-of-location process.</li>
              <li>Confirm independently whether a listing includes only the license or any additional business assets.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="broward-faq">
        <div className="broward-shell">
          <span className="broward-kicker">Frequently Asked Questions</span>
          <h2>Broward County liquor-license buyer questions</h2>
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
          <div className="broward-related">
            <Link href="/counties/broward">Broward County liquor-license market data</Link>
            <Link href="/listings?county=Broward%20County&status=available">Filter all Broward listings</Link>
            <Link href="/florida-liquor-license-value">Florida liquor-license value estimator</Link>
            <Link href="/contact">Contact FLLM</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
