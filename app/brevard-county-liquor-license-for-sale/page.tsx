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
const canonicalUrl = `${siteUrl}/brevard-county-liquor-license-for-sale`;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Brevard County Liquor License for Sale | 4COP & 3PS | FLLM",
  description:
    "Browse current Brevard County, Florida liquor licenses for sale, including transferable 4COP quota and 3PS package-store opportunities serving Melbourne, Palm Bay, Cocoa, Titusville and the Space Coast.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Brevard County Liquor License for Sale | FLLM",
    description:
      "Current Brevard County 4COP and 3PS quota liquor-license inventory, asking prices and individual FLLM listing pages.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brevard County Liquor License for Sale | FLLM",
    description:
      "Browse current Brevard County, Florida 4COP and 3PS quota liquor-license inventory and asking prices.",
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

export default async function BrevardCountyLiquorLicenseForSalePage() {
  const brevardListings = getVisibleAvailableMarketplaceListings(
    await getMarketplaceListings(),
  ).filter((listing) => listing.county === "Brevard County");

  const disclosedPrices = brevardListings
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

  const marketSummary = brevardListings.length
    ? low !== null && high !== null
      ? low === high
        ? `${brevardListings.length} active Brevard County liquor-license listing${brevardListings.length === 1 ? "" : "s"} currently appear on FLLM, with a disclosed asking price of ${money(low)}.`
        : `${brevardListings.length} active Brevard County liquor-license listing${brevardListings.length === 1 ? "" : "s"} currently appear on FLLM. Disclosed asking prices range from ${money(low)} to ${money(high)}${median === null ? "." : `, with a median disclosed ask of ${money(median)}.`}`
      : `${brevardListings.length} active Brevard County liquor-license listing${brevardListings.length === 1 ? "" : "s"} currently appear on FLLM, including current 4COP and 3PS opportunities.`
    : "Brevard County inventory changes as licenses are listed, repriced, sold, or withdrawn. Use the FLLM statewide marketplace to monitor new Space Coast opportunities.";

  const faqs = [
    {
      question: "Where can I find a Brevard County liquor license for sale?",
      answer:
        "Current Brevard County 4COP and 3PS quota-license opportunities are listed on this page when available. Each active opportunity opens its individual FLLM marketplace page with the current asking price, license type, marketplace reference and inquiry options.",
    },
    {
      question: "What cities are in the Brevard County liquor-license market?",
      answer:
        "Brevard County includes major Space Coast communities such as Melbourne, Palm Bay, Cocoa, Titusville, Rockledge, Cocoa Beach and Cape Canaveral. A quota license remains county-specific and any proposed premises remain subject to applicable local approvals and zoning.",
    },
    {
      question: "What is the difference between a Brevard County 4COP and 3PS license?",
      answer:
        "A 4COP quota license generally supports sales of beer, wine and spirits for consumption on premises as well as package sales, subject to the licensed operation. A 3PS quota license is generally associated with package-store sales for off-premises consumption. Transaction and premises requirements should be independently confirmed.",
    },
    {
      question: "Can a Brevard County quota liquor license be moved to another Florida county?",
      answer:
        "Florida quota liquor licenses are county-specific. A Brevard County quota license is used within Brevard County, subject to the proposed premises, local approvals, zoning and the applicable DBPR/ABT transfer or change-of-location process.",
    },
    {
      question: "Does a Brevard County liquor-license listing include a business or real estate?",
      answer:
        "Not unless the individual listing expressly says so. FLLM marketplace listings generally concern liquor-license interests separately from an operating business, leasehold, equipment, inventory or real estate.",
    },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Brevard County Liquor Licenses for Sale",
      url: canonicalUrl,
      description: marketSummary,
      about: { "@type": "Place", name: "Brevard County, Florida" },
      isPartOf: {
        "@type": "WebSite",
        name: "Florida Liquor License Market",
        url: siteUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Current Brevard County liquor licenses for sale",
      url: canonicalUrl,
      numberOfItems: brevardListings.length,
      itemListElement: brevardListings.map((listing, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `Brevard County ${shortType(listing.type)} Liquor License for Sale — ${listing.priceLabel}`,
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
          name: "Brevard County Liquor Licenses for Sale",
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
    <main className="brevard-sale-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
        }}
      />

      <style>{`
        .brevard-sale-page{min-height:100vh;background:#04111d;color:#fff}
        .brevard-shell{width:min(1480px,calc(100% - 60px));margin:0 auto}
        .brevard-hero{padding:64px 0 58px;border-bottom:1px solid rgba(237,169,26,.32);background:radial-gradient(circle at 82% 16%,rgba(41,103,145,.28),transparent 32%),linear-gradient(135deg,#0a2942,#051827 58%,#03101b)}
        .brevard-breadcrumbs{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:26px;color:#9fb0bd;font-size:11px}.brevard-breadcrumbs a{color:#f1aa1c}.brevard-kicker{color:#f1aa1c;font-size:12px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
        .brevard-hero h1{max-width:940px;margin:10px 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:clamp(42px,6vw,68px);line-height:1.02}.brevard-hero p{max-width:920px;margin:0 0 12px;color:#d3dde4;font-size:17px;line-height:1.72}.brevard-hero strong{color:#fff}
        .brevard-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:26px}.brevard-actions a{display:inline-flex;min-height:46px;align-items:center;justify-content:center;padding:0 18px;border-radius:6px;font-weight:900;text-decoration:none}.brevard-actions .gold{border:1px solid #f0ab1c;color:#071521;background:linear-gradient(145deg,#ffc441,#e99b06);box-shadow:0 8px 18px rgba(0,0,0,.22)}.brevard-actions .dark{border:1px solid rgba(255,255,255,.25);color:#fff;background:#071d31}
        .brevard-inventory{padding:62px 0;background:#061827}.brevard-heading{display:grid;grid-template-columns:1fr minmax(280px,480px);gap:28px;align-items:end;margin-bottom:26px}.brevard-heading span,.brevard-info span{color:#f1aa1c;font-size:11px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}.brevard-heading h2,.brevard-info h2,.brevard-faq h2{margin:7px 0 0;font-size:clamp(30px,4vw,42px)}.brevard-heading p{margin:0;color:#b9c7d1;line-height:1.65}
        .brevard-results-scope{min-height:0!important;background:transparent!important;color:inherit!important}.brevard-results-scope .results-grid{margin:0!important}.brevard-empty{padding:28px;border:1px solid #9b741d;border-radius:8px;background:linear-gradient(145deg,#0b263b,#061725);box-shadow:0 10px 28px rgba(0,0,0,.28)}.brevard-empty h3{margin:0 0 8px;color:#f3a700}.brevard-empty p{color:#d2dce3}.brevard-empty a{color:#f1aa1c;font-weight:900}
        .brevard-info{padding:62px 0;background:#04111d}.brevard-info-grid{display:grid;grid-template-columns:1fr 1fr;gap:22px}.brevard-info article{padding:26px;border:1px solid rgba(255,255,255,.1);border-radius:10px;background:#071d31}.brevard-info p,.brevard-info li{color:#c8d3db;line-height:1.72}.brevard-info ul{display:grid;gap:9px;padding-left:20px}.brevard-info a{color:#f1aa1c}
        .brevard-faq{padding:60px 0 70px;background:#061827}.brevard-faq details{border-bottom:1px solid rgba(255,255,255,.1)}.brevard-faq summary{padding:18px 0;font-weight:850;cursor:pointer}.brevard-faq details p{margin:0;padding:0 0 18px;color:#bfccd5;line-height:1.72}.brevard-related{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}.brevard-related a{color:#f1aa1c;text-decoration:underline;text-underline-offset:3px}
        @media(max-width:760px){.brevard-heading,.brevard-info-grid{grid-template-columns:1fr}.brevard-shell{width:min(100% - 30px,1480px)}.brevard-hero{padding-top:42px}}
      `}</style>

      <div className="abt-header-wrap">
        <FormsSiteHeader
          primaryActionHref="/sell-your-license"
          primaryActionLabel="List Your License"
        />
      </div>

      <section className="brevard-hero">
        <div className="brevard-shell">
          <nav className="brevard-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span><Link href="/listings">Licenses for Sale</Link><span>›</span><strong>Brevard County</strong>
          </nav>
          <span className="brevard-kicker">Brevard County, Florida · Space Coast Marketplace</span>
          <h1>Brevard County Liquor Licenses for Sale</h1>
          <p>
            Looking for a <strong>Brevard County liquor license for sale</strong> in Florida? FLLM tracks current transferable quota-license opportunities serving Melbourne, Palm Bay, Cocoa, Titusville, Rockledge, Cocoa Beach, Cape Canaveral and the wider Space Coast market.
          </p>
          <p>{marketSummary}</p>
          <div className="brevard-actions">
            <a className="gold" href="#current-brevard-inventory">View Current Brevard Inventory</a>
            <Link className="dark" href="/counties/brevard">Brevard County Market Data</Link>
          </div>
        </div>
      </section>

      <section className="brevard-inventory" id="current-brevard-inventory">
        <div className="brevard-shell">
          <div className="brevard-heading">
            <div>
              <span>Current Marketplace Inventory</span>
              <h2>Brevard County 4COP & 3PS licenses for sale</h2>
            </div>
            <p>
              These are the same live FLLM marketplace cards used on the statewide Listings page. Open an individual listing to review its current asking price, marketplace reference and inquiry options.
            </p>
          </div>

          {brevardListings.length ? (
            <div className="results-page brevard-results-scope">
              <div className="results-grid">
                {brevardListings.map((listing) => (
                  <MarketplaceListingCard
                    key={listing.sourceRef ?? `${listing.type}-${listing.priceLabel}`}
                    listing={listing}
                  />
                ))}
              </div>
            </div>
          ) : (
            <article className="brevard-empty">
              <h3>No active Brevard listing displayed</h3>
              <p>
                Inventory can change quickly. Browse the statewide marketplace for newly listed Brevard County opportunities.
              </p>
              <Link href="/listings">Browse Florida Liquor Licenses for Sale →</Link>
            </article>
          )}
        </div>
      </section>

      <section className="brevard-info">
        <div className="brevard-shell">
          <div className="brevard-info-grid">
            <article>
              <span>Brevard County Market</span>
              <h2>Buying a quota license on Florida’s Space Coast</h2>
              <p>
                Brevard County quota licenses are county-specific. Buyers should evaluate the license itself together with the proposed premises, zoning, local approvals, DBPR/ABT transfer requirements and any liens or encumbrances that may affect a transaction.
              </p>
              <ul>
                <li><strong>4COP Quota:</strong> generally used for beer, wine and spirits sales for consumption on premises, with package privileges subject to the licensed operation.</li>
                <li><strong>3PS Quota:</strong> generally used for package-store sales of beer, wine and spirits for off-premises consumption.</li>
                <li><strong>County restriction:</strong> Brevard quota licenses remain tied to Brevard County rather than transferring to another Florida county.</li>
              </ul>
            </article>
            <article>
              <span>Research Before You Buy</span>
              <h2>Compare the license, price and transfer requirements</h2>
              <p>
                FLLM separates marketplace asking-price data from legal or regulatory approval. Use the live listing page for the current market reference, then review county market data and Florida licensing resources before closing.
              </p>
              <ul>
                <li><Link href="/counties/brevard">Brevard County liquor-license market data</Link></li>
                <li><Link href="/resources/florida-liquor-license-types">Florida liquor-license types</Link></li>
                <li><Link href="/resources/florida-liquor-license-laws">Florida liquor-license laws</Link></li>
                <li><Link href="/financing">Florida liquor-license financing</Link></li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="brevard-faq">
        <div className="brevard-shell">
          <span className="brevard-kicker">Brevard County Buyer Questions</span>
          <h2>Frequently asked questions</h2>
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
          <div className="brevard-related">
            <Link href="/listings">Florida liquor licenses for sale</Link>
            <Link href="/florida-4cop-liquor-license-for-sale">Florida 4COP licenses for sale</Link>
            <Link href="/florida-3ps-liquor-license-for-sale">Florida 3PS licenses for sale</Link>
            <Link href="/sell-your-license">Sell a Florida liquor license</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
