import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import FloridaCountyMap from "@/components/FloridaCountyMap";
import {
  countyValuationGuideHref,
  countyValuationGuideSlugs,
  isCountyValuationGuide,
} from "@/data/county-valuation-guides";
import { getCountyBySlug } from "@/data/florida-counties";
import type { Listing } from "@/data/listings";
import { listingPageHref } from "@/lib/listing-page-urls";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleMarketplaceListings } from "@/lib/visible-marketplace-listings";
import "@/app/resources/forms/abt-forms.css";
import "./county-value-page.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const licenseTypes: Listing["type"][] = ["4COP Quota", "3PS Quota / Package Store"];

type PageProps = {
  params: Promise<{ slug: string }>;
};

type Comparable = Omit<Listing, "price" | "sourceRef"> & { price: number; sourceRef: string };

function money(value: number | null) {
  if (value === null) return "No disclosed data";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function median(values: number[]) {
  if (!values.length) return null;
  const midpoint = Math.floor(values.length / 2);
  return values.length % 2
    ? values[midpoint]
    : Math.round((values[midpoint - 1] + values[midpoint]) / 2);
}

function priceRange(values: number[]) {
  if (!values.length) return "No disclosed active asks";
  if (values.length === 1 || values[0] === values[values.length - 1]) return money(values[0]);
  return `${money(values[0])}–${money(values[values.length - 1])}`;
}

function isComparable(listing: Listing): listing is Comparable {
  return Boolean(listing.sourceRef) && listing.price !== null && Number.isFinite(listing.price);
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const county = getCountyBySlug(slug);
  if (!county || !isCountyValuationGuide(slug)) return {};

  const canonical = `${siteUrl}${countyValuationGuideHref(slug)}`;
  const city = county.primaryCities[0] ?? county.name.replace(" County", "");
  const title = `How Much Is a ${county.name} Liquor License Worth?`;
  const description = `Review current ${county.name} 4COP and 3PS asking-price comparables, value factors, and market guidance for ${city}, then calculate a private Florida liquor-license estimate.`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: "Florida Liquor License Market",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CountyLiquorLicenseValuePage({ params }: PageProps) {
  const { slug } = await params;
  const county = getCountyBySlug(slug);
  if (!county || !isCountyValuationGuide(slug)) notFound();

  const marketplaceListings = getVisibleMarketplaceListings(await getMarketplaceListings());
  const comparables = marketplaceListings
    .filter((listing): listing is Comparable => listing.county === county.name && isComparable(listing))
    .sort((left, right) => left.price - right.price);
  const prices = comparables.map((listing) => listing.price);
  const low = prices[0] ?? null;
  const high = prices[prices.length - 1] ?? null;
  const medianPrice = median(prices);
  const cityText = county.primaryCities.join(", ") || county.name.replace(" County", "");
  const canonical = `${siteUrl}${countyValuationGuideHref(slug)}`;
  const countyPageHref = `/counties/${county.slug}`;
  const listingsHref = `/listings?county=${encodeURIComponent(county.name)}&status=available`;

  const typeSnapshots = licenseTypes.map((licenseType) => {
    const exact = comparables.filter((listing) => listing.type === licenseType);
    const exactPrices = exact.map((listing) => listing.price);
    return {
      licenseType,
      count: exact.length,
      median: median(exactPrices),
      range: priceRange(exactPrices),
    };
  });

  const nearbyGuides = countyValuationGuideSlugs
    .filter((guideSlug) => guideSlug !== slug)
    .map((guideSlug) => getCountyBySlug(guideSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .slice(0, 6);

  const snapshotSentence = comparables.length === 0
    ? `FLLM does not currently display a disclosed active asking-price comparable for ${county.name}. That does not mean a quota license has no market value; it means the exact county evidence is presently limited and seller follow-up is appropriate.`
    : comparables.length === 1
      ? `FLLM currently displays one disclosed active ${county.name} asking-price comparable at ${money(low)}. One listing is useful market context, but it is not enough to establish a guaranteed sale price.`
      : `FLLM currently displays ${comparables.length} disclosed active ${county.name} asking-price comparables from ${money(low)} to ${money(high)}, with a median disclosed ask of ${money(medianPrice)}.`;

  const faqs = [
    {
      question: `How much is a liquor license worth in ${county.name}?`,
      answer: `${snapshotSentence} Value can differ by license type, availability, seller timing, transaction terms, intended use, and current buyer demand.`,
    },
    {
      question: `What is the current ${county.name} liquor-license asking-price range?`,
      answer: comparables.length
        ? `The current disclosed active asking-price range shown by FLLM is ${priceRange(prices)} across ${comparables.length} comparable${comparables.length === 1 ? "" : "s"}. Inventory and pricing can change as listings are added, repriced, withdrawn, or sold.`
        : `No disclosed active exact-county range is currently available on FLLM. Contacting the marketplace can help determine whether off-market or newly submitted opportunities exist.`,
    },
    {
      question: `Is the median asking price the value of my ${county.name} license?`,
      answer: `No. The median is a description of current advertised asking prices, not an appraisal or verified closing price. A specific license may trade above or below it depending on the evidence and transaction terms.`,
    },
    {
      question: `Are 4COP and 3PS licenses valued the same in ${county.name}?`,
      answer: `Not necessarily. A 4COP quota opportunity and a 3PS quota or package-store opportunity serve different buyer needs. Exact pricing should be compared by county and license category whenever enough disclosed evidence is available.`,
    },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `How Much Is a ${county.name} Liquor License Worth?`,
      url: canonical,
      description: snapshotSentence,
      isPartOf: { "@type": "WebSite", name: "Florida Liquor License Market", url: siteUrl },
      about: { "@type": "Thing", name: `${county.name} quota liquor-license market value` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Florida Liquor License Value", item: `${siteUrl}/florida-liquor-license-value` },
        { "@type": "ListItem", position: 3, name: county.name, item: canonical },
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
    <main className="county-value-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} />

      <div className="abt-header-wrap">
        <FormsSiteHeader primaryActionHref="/sell-your-license" primaryActionLabel="Sell Your License" />
      </div>

      <section className="county-value-hero">
        <div className="page-shell county-value-hero-grid">
          <div>
            <nav className="county-value-breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link><span>›</span><Link href="/florida-liquor-license-value">License Value</Link><span>›</span><strong>{county.name}</strong>
            </nav>
            <span className="county-value-kicker">County Liquor-License Value Guide</span>
            <h1>How Much Is a {county.name} Liquor License Worth?</h1>
            <p>{snapshotSentence}</p>
            <div className="county-value-actions">
              <Link className="county-value-button county-value-button-gold" href="/florida-liquor-license-value#estimate">Calculate My License Value</Link>
              <Link className="county-value-button county-value-button-dark" href={listingsHref}>View {county.name} Listings</Link>
            </div>
          </div>
          <div className="county-value-map" aria-label={`${county.name} market map`}>
            <FloridaCountyMap county={county.name} enlarged />
            <strong>{county.name}</strong>
            <span>{cityText}</span>
          </div>
        </div>
      </section>

      <section className="county-value-snapshot page-shell" aria-labelledby="county-value-snapshot-title">
        <div className="county-value-heading">
          <span>Current FLLM Asking-Price Evidence</span>
          <h2 id="county-value-snapshot-title">{county.name} market snapshot</h2>
          <p>Calculated from active marketplace listings with disclosed asking prices. These figures update as FLLM inventory changes.</p>
        </div>
        <div className="county-value-stat-grid">
          <article><span>Disclosed Comparables</span><strong>{comparables.length}</strong></article>
          <article><span>Lowest Asking Price</span><strong>{money(low)}</strong></article>
          <article className="county-value-stat-featured"><span>Median Asking Price</span><strong>{money(medianPrice)}</strong></article>
          <article><span>Highest Asking Price</span><strong>{money(high)}</strong></article>
        </div>
        <p className="county-value-disclaimer">Asking prices are not verified closing prices. This is market pricing guidance, not an appraisal, broker price opinion, or guarantee of value.</p>
      </section>

      <section className="county-value-types">
        <div className="page-shell">
          <div className="county-value-heading">
            <span>Compare Like with Like</span>
            <h2>4COP and 3PS value evidence in {county.name}</h2>
          </div>
          <div className="county-value-type-grid">
            {typeSnapshots.map((snapshot) => (
              <article key={snapshot.licenseType}>
                <span>{snapshot.licenseType}</span>
                <strong>{snapshot.range}</strong>
                <dl>
                  <div><dt>Comparables</dt><dd>{snapshot.count}</dd></div>
                  <div><dt>Median ask</dt><dd>{money(snapshot.median)}</dd></div>
                </dl>
                <p>{snapshot.count ? `Current ${snapshot.licenseType} evidence is based on disclosed active FLLM asking prices in ${county.name}.` : `FLLM does not currently display a disclosed active ${snapshot.licenseType} asking price in ${county.name}.`}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="county-value-comparables page-shell">
        <div className="county-value-heading">
          <span>Current Comparable Listings</span>
          <h2>Evidence behind the {county.name} snapshot</h2>
        </div>
        {comparables.length ? (
          <div className="county-value-table-wrap">
            <table>
              <thead><tr><th>Listing</th><th>License type</th><th>Market status</th><th>Disclosed ask</th><th>Details</th></tr></thead>
              <tbody>
                {comparables.map((listing) => (
                  <tr key={listing.sourceRef}>
                    <td>{listing.sourceRef}</td>
                    <td>{listing.type}</td>
                    <td>Available</td>
                    <td><strong>{money(listing.price)}</strong></td>
                    <td><Link href={listingPageHref(listing)}>View listing ›</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="county-value-empty">
            <strong>No disclosed active exact-county comparable is currently displayed.</strong>
            <p>Use the full estimator for statewide context or request private follow-up about the {county.name} market.</p>
          </div>
        )}
      </section>

      <section className="county-value-explainer">
        <div className="page-shell county-value-explainer-grid">
          <article>
            <span>Local Market Context</span>
            <h2>What affects liquor-license value in {county.name}?</h2>
            <p>{county.marketOverview}</p>
            <p>Demand across {cityText} can be influenced by restaurants, bars, nightlife, hotels, tourism, population growth, package-store demand, and the number of quota licenses being marketed at a given time.</p>
          </article>
          <aside>
            <h3>Price factors to review</h3>
            <ul>
              <li>County and exact license category</li>
              <li>Current competing inventory</li>
              <li>Seller timing and transaction terms</li>
              <li>License status, liens, and transfer conditions</li>
              <li>Intended premises, zoning, and local approvals</li>
            </ul>
            <Link href={countyPageHref}>Open the full {county.name} market page ›</Link>
          </aside>
        </div>
      </section>

      <section className="county-value-faq page-shell">
        <div className="county-value-heading"><span>County Valuation Questions</span><h2>{county.name} liquor-license value FAQs</h2></div>
        <div className="county-value-faq-grid">
          {faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
        </div>
      </section>

      <section className="county-value-nearby">
        <div className="page-shell">
          <div className="county-value-heading"><span>Compare Major Markets</span><h2>Other Florida county valuation guides</h2></div>
          <div className="county-value-nearby-grid">
            {nearbyGuides.map((item) => <Link key={item.slug} href={countyValuationGuideHref(item.slug)}><strong>{item.name}</strong><span>View current value evidence ›</span></Link>)}
          </div>
        </div>
      </section>

      <section className="county-value-final">
        <div className="page-shell">
          <div><span>Private Seller Follow-Up</span><h2>Estimate or market a {county.name} license</h2><p>Use FLLM’s full estimator or place the opportunity in front of Florida liquor-license buyers.</p></div>
          <div className="county-value-final-actions"><Link className="county-value-button county-value-button-gold" href="/florida-liquor-license-value#estimate">Calculate My Market Range</Link><Link className="county-value-button county-value-button-dark" href="/sell-your-license">Sell or List My License</Link></div>
        </div>
      </section>
    </main>
  );
}
