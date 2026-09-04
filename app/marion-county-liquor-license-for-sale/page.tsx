import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import MarketplaceListingCard from "@/components/MarketplaceListingCard";
import { listingPageHref } from "@/lib/listing-page-urls";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";

import "../resources/forms/abt-forms.css";
import "../listings/listings-premium.css";
import "../listings/listings-map-size.css";
import "../listings/listings-county-links.css";
import "../listings/listings-conversion-cards.css";
import "../listings/listings-card-overlap-fix.css";
import "../listings/listings-view-button-edge-fix.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/marion-county-liquor-license-for-sale`;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Marion County Liquor License for Sale | Ocala 4COP & 3PS | FLLM",
  description:
    "Browse current Marion County, Florida liquor licenses for sale in the Ocala market. Compare live 4COP quota and 3PS package-store opportunities, asking prices and availability on FLLM.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Marion County Liquor License for Sale | Ocala | FLLM",
    description:
      "Current Marion County 4COP and 3PS liquor-license inventory, asking prices and individual FLLM marketplace listings serving Ocala and Marion County, Florida.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marion County Liquor License for Sale | FLLM",
    description:
      "Browse current Marion County and Ocala 4COP and 3PS quota liquor-license inventory and asking prices.",
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

export default async function MarionCountyLiquorLicenseForSalePage() {
  const marionListings = getVisibleAvailableMarketplaceListings(
    await getMarketplaceListings(),
  ).filter((listing) => listing.county === "Marion County");

  const disclosedPrices = marionListings
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

  const marketSummary = marionListings.length
    ? low !== null && high !== null
      ? low === high
        ? `${marionListings.length} active Marion County liquor-license listing${marionListings.length === 1 ? "" : "s"} currently appear on FLLM, with a disclosed asking price of ${money(low)}.`
        : `${marionListings.length} active Marion County liquor-license listing${marionListings.length === 1 ? "" : "s"} currently appear on FLLM. Disclosed asking prices range from ${money(low)} to ${money(high)}${median === null ? "." : `, with a median disclosed ask of ${money(median)}.`}`
      : `${marionListings.length} active Marion County liquor-license listing${marionListings.length === 1 ? "" : "s"} currently appear on FLLM, including current 4COP and 3PS opportunities.`
    : "Marion County inventory changes as licenses are listed, repriced, sold, or withdrawn. Use FLLM to monitor new Ocala and Marion County opportunities.";

  const faqs = [
    {
      question: "Where can I find a Marion County liquor license for sale?",
      answer:
        "Current Marion County 4COP and 3PS quota-license opportunities are displayed on this page when available. Each active opportunity opens its individual FLLM marketplace page with the current asking price, license type, marketplace reference and inquiry options.",
    },
    {
      question: "What cities are in the Marion County liquor-license market?",
      answer:
        "Ocala is the principal city in Marion County. The county also includes communities and commercial areas serving a growing residential, equestrian, healthcare, logistics, tourism and hospitality economy. Florida quota liquor licenses remain county-specific, and any proposed premises remain subject to applicable zoning and local approvals.",
    },
    {
      question: "What is the difference between a Marion County 4COP and 3PS license?",
      answer:
        "A 4COP quota license generally authorizes beer, wine and spirits for on-premises consumption and package sales, subject to the licensed operation. A 3PS quota license is generally used for package-store sales for off-premises consumption. Buyers should independently confirm the license category, premises and transfer requirements.",
    },
    {
      question: "Can a Marion County quota liquor license be moved to another Florida county?",
      answer:
        "Florida quota liquor licenses are county-specific. A Marion County quota license is used within Marion County, subject to the proposed premises, zoning, local approvals and the applicable DBPR/ABT transfer or change-of-location process.",
    },
    {
      question: "How much is a Marion County liquor license?",
      answer:
        low !== null && high !== null
          ? `Current disclosed asking prices on FLLM range from ${money(low)} to ${money(high)}${median === null ? "." : `, with a median disclosed asking price of ${money(median)}.`} Asking prices and availability can change as listings are added, repriced, sold or withdrawn.`
          : "There is no fixed market price for a Marion County quota liquor license. Asking prices vary by license type, supply, seller terms, availability and current market conditions.",
    },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Marion County Liquor Licenses for Sale",
      url: canonicalUrl,
      description: marketSummary,
      about: { "@type": "Place", name: "Marion County, Florida" },
      isPartOf: {
        "@type": "WebSite",
        name: "Florida Liquor License Market",
        url: siteUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Current Marion County liquor licenses for sale",
      url: canonicalUrl,
      numberOfItems: marionListings.length,
      itemListElement: marionListings.map((listing, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `Marion County ${shortType(listing.type)} Liquor License for Sale — ${listing.priceLabel}`,
        url: `${siteUrl}${listingPageHref(listing)}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Florida Liquor Licenses for Sale", item: `${siteUrl}/listings` },
        { "@type": "ListItem", position: 3, name: "Marion County Liquor Licenses for Sale", item: canonicalUrl },
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
    <main className="marion-sale-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <style>{`
        .marion-sale-page{min-height:100vh;background:#04111d;color:#fff}
        .marion-shell{width:min(1480px,calc(100% - 60px));margin:0 auto}
        .marion-hero{padding:64px 0 58px;border-bottom:1px solid rgba(237,169,26,.32);background:radial-gradient(circle at 82% 16%,rgba(41,103,145,.28),transparent 32%),linear-gradient(135deg,#0a2942,#051827 58%,#03101b)}
        .marion-breadcrumbs{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:26px;color:#9fb0bd;font-size:11px}.marion-breadcrumbs a{color:#f1aa1c}.marion-kicker{color:#f1aa1c;font-size:12px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
        .marion-hero h1{max-width:980px;margin:10px 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:clamp(42px,6vw,68px);line-height:1.02}.marion-hero p{max-width:940px;margin:0 0 12px;color:#d3dde4;font-size:17px;line-height:1.72}.marion-hero strong{color:#fff}
        .marion-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:26px}.marion-actions a{display:inline-flex;min-height:46px;align-items:center;justify-content:center;padding:0 18px;border-radius:6px;font-weight:900;text-decoration:none}.marion-actions .gold{border:1px solid #f0ab1c;color:#071521;background:linear-gradient(145deg,#ffc441,#e99b06)}.marion-actions .dark{border:1px solid rgba(255,255,255,.25);color:#fff;background:#071d31}
        .marion-inventory{padding:62px 0;background:#061827}.marion-heading{display:grid;grid-template-columns:1fr minmax(280px,480px);gap:28px;align-items:end;margin-bottom:26px}.marion-heading span,.marion-info span{color:#f1aa1c;font-size:11px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}.marion-heading h2,.marion-info h2,.marion-faq h2{margin:7px 0 0;font-size:clamp(30px,4vw,42px)}.marion-heading p{margin:0;color:#b9c7d1;line-height:1.65}
        .marion-results-scope{min-height:0!important;background:transparent!important;color:inherit!important}.marion-results-scope .results-grid{margin:0!important}.marion-empty{padding:28px;border:1px solid #9b741d;border-radius:8px;background:#071d31}
        .marion-info{padding:62px 0;background:#04111d}.marion-info-grid{display:grid;grid-template-columns:1fr 1fr;gap:22px}.marion-info article{padding:26px;border:1px solid rgba(255,255,255,.1);border-radius:10px;background:#071d31}.marion-info p,.marion-info li{color:#c8d3db;line-height:1.72}.marion-info ul{display:grid;gap:9px;padding-left:20px}.marion-info a{color:#f1aa1c}
        .marion-faq{padding:60px 0 70px;background:#061827}.marion-faq details{border-bottom:1px solid rgba(255,255,255,.1)}.marion-faq summary{padding:18px 0;font-weight:850;cursor:pointer}.marion-faq details p{margin:0;padding:0 0 18px;color:#bfccd5;line-height:1.72}
        @media(max-width:760px){.marion-heading,.marion-info-grid{grid-template-columns:1fr}.marion-shell{width:min(100% - 30px,1480px)}.marion-hero{padding-top:42px}}
      `}</style>

      <div className="abt-header-wrap">
        <FormsSiteHeader primaryActionHref="/sell-your-license" primaryActionLabel="List Your License" />
      </div>

      <section className="marion-hero">
        <div className="marion-shell">
          <nav className="marion-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span><Link href="/listings">Licenses for Sale</Link><span>›</span><strong>Marion County</strong>
          </nav>
          <span className="marion-kicker">Marion County, Florida · Ocala Marketplace</span>
          <h1>Marion County Liquor License for Sale</h1>
          <p>
            Searching for a <strong>Marion County liquor license for sale</strong> in Florida? FLLM tracks current 4COP quota and 3PS package-store opportunities serving Ocala and the wider Marion County market.
          </p>
          <p>{marketSummary}</p>
          <div className="marion-actions">
            <a className="gold" href="#current-marion-inventory">View Current Marion Inventory</a>
            <Link className="dark" href="/counties/marion">Marion County Market Data</Link>
          </div>
        </div>
      </section>

      <section className="marion-inventory" id="current-marion-inventory">
        <div className="marion-shell">
          <div className="marion-heading">
            <div><span>Current Marketplace Inventory</span><h2>Marion County 4COP & 3PS licenses for sale</h2></div>
            <p>Compare live FLLM inventory for Marion County. Open any listing to review its current asking price, marketplace reference and inquiry options.</p>
          </div>
          {marionListings.length ? (
            <div className="results-page marion-results-scope"><div className="results-grid">
              {marionListings.map((listing) => <MarketplaceListingCard key={listing.sourceRef ?? `${listing.type}-${listing.priceLabel}`} listing={listing} />)}
            </div></div>
          ) : (
            <div className="marion-empty"><h3>No active Marion County listings are currently displayed.</h3><p><Link href="/listings">Browse all Florida liquor licenses for sale</Link> or check back as inventory changes.</p></div>
          )}
        </div>
      </section>

      <section className="marion-info">
        <div className="marion-shell marion-info-grid">
          <article><span>Ocala & Marion County</span><h2>Why buyers watch this market</h2><p>Marion County is anchored by Ocala and supported by equestrian activity, healthcare, logistics, residential growth, tourism, restaurants and regional commerce. Transferable quota licenses are county-specific, so buyers seeking an Ocala location generally need a Marion County quota license.</p><p><Link href="/counties/marion">View Marion County market data, population context and current asking-price evidence.</Link></p></article>
          <article><span>Buyer Due Diligence</span><h2>Before buying a Marion County license</h2><ul><li>Confirm the license number, category, county and current status.</li><li>Verify liens, seller authority, transfer eligibility and closing terms.</li><li>Confirm the proposed Ocala or Marion County premises, zoning and local approvals.</li><li>Review the DBPR/ABT transfer or change-of-location requirements.</li><li>Use independent legal, tax and financial professionals where appropriate.</li></ul></article>
        </div>
      </section>

      <section className="marion-faq">
        <div className="marion-shell"><span className="marion-kicker">Marion County Buyer Questions</span><h2>Marion County liquor-license FAQs</h2>
          {faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
        </div>
      </section>
    </main>
  );
}
