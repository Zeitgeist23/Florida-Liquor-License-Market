import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FloridaCountyMap from "@/components/FloridaCountyMap";
import { getCountyBySlug } from "@/data/florida-counties";
import type { Listing } from "@/data/listings";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getCountyQuotaInventory } from "@/lib/quota-license-inventory";
import "./county-page.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function money(value: number) {
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
  return sorted.length % 2 ? sorted[middle] : Math.round((sorted[middle - 1] + sorted[middle]) / 2);
}

function sourceDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  }).format(new Date(value));
}

function listingKey(listing: Listing) {
  return listing.sourceRef ?? `${listing.county}-${listing.type}-${listing.priceLabel}`;
}

function inquiryHref(listing: Listing) {
  return `/contact?listing=${encodeURIComponent(`${listing.county} ${listing.type}`)}&ref=${encodeURIComponent(listing.sourceRef ?? "")}`;
}

function offerHref(listing: Listing) {
  return `/submit-offer?listing=${encodeURIComponent(`${listing.county} ${listing.type}`)}&ref=${encodeURIComponent(listing.sourceRef ?? "")}`;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const county = getCountyBySlug(slug);
  if (!county) return {};

  const canonical = `${siteUrl}/counties/${county.slug}`;
  const title = `${county.name} Liquor Licenses for Sale | 4COP & 3PS`;
  const description = `Browse transferable quota liquor-license interests in ${county.name}, including current 4COP and 3PS opportunities, asking prices, financing information, and confidential inquiry options.`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: county.indexable
      ? { index: true, follow: true }
      : { index: false, follow: true, googleBot: { index: false, follow: true } },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: "Florida Liquor License Market",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CountyPage({ params }: PageProps) {
  const { slug } = await params;
  const county = getCountyBySlug(slug);
  if (!county) notFound();

  const [marketplaceListings, quotaInventory] = await Promise.all([
    getMarketplaceListings(),
    getCountyQuotaInventory(county.name).catch(() => null),
  ]);
  const countyListings = marketplaceListings.filter((listing) => listing.county === county.name);
  const available = countyListings.filter((listing) => Boolean(listing.sourceRef));
  const sold = countyListings.filter((listing) => !listing.sourceRef);
  const disclosedPrices = available
    .map((listing) => listing.price)
    .filter((price): price is number => Number.isFinite(price));
  const lowest = disclosedPrices.length ? Math.min(...disclosedPrices) : null;
  const highest = disclosedPrices.length ? Math.max(...disclosedPrices) : null;
  const medianPrice = median(disclosedPrices);
  const canonical = `${siteUrl}/counties/${county.slug}`;
  const cityText = county.primaryCities.length ? county.primaryCities.join(", ") : county.name.replace(" County", "");
  const nearby = county.nearbyCounties
    .map((nearbySlug) => getCountyBySlug(nearbySlug))
    .filter((value): value is NonNullable<typeof value> => Boolean(value));

  const faqs = [
    {
      question: `What liquor-license types may appear in ${county.name}?`,
      answer: `Marketplace inventory may include 4COP quota interests and 3PS quota or package-store interests. The permitted use depends on the license category, the proposed premises, local approvals, and approval of the transfer by the Florida Division of Alcoholic Beverages and Tobacco.`,
    },
    {
      question: `Are the asking prices for ${county.name} guaranteed?`,
      answer: `No. Asking prices and availability are subject to seller or broker confirmation and may change without notice. Buyers should independently verify the license, transaction structure, liens, transfer requirements, and all material terms.`,
    },
    {
      question: `Can a buyer finance a quota liquor license in ${county.name}?`,
      answer: `Financing may be available through private lenders depending on the license, purchase price, borrower qualifications, collateral, transaction structure, and underwriting. Submitting a request does not guarantee approval or any particular rate.`,
    },
    {
      question: `Does a license listing include a business or real estate?`,
      answer: `No, not unless a listing expressly says otherwise. The marketplace generally presents liquor-license interests separately from any operating business, leasehold, equipment, inventory, or real estate.`,
    },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Florida Counties", item: `${siteUrl}/counties` },
        { "@type": "ListItem", position: 3, name: county.name, item: canonical },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${county.name} liquor licenses for sale`,
      url: canonical,
      numberOfItems: available.length,
      itemListElement: available.slice(0, 30).map((listing, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${listing.type} in ${county.name} — ${listing.priceLabel}`,
        url: `${canonical}#${listing.sourceRef ?? `listing-${index + 1}`}`,
      })),
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
    <main className="county-market-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <header className="county-header county-shell">
        <Link className="county-brand" href="/" aria-label="Florida Liquor License Market home">
          <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
        </Link>
        <nav aria-label="County market navigation">
          <Link href="/listings">All Listings</Link>
          <Link href="/counties">Browse Counties</Link>
          <Link href="/financing">Financing</Link>
          <Link className="county-nav-cta" href="/sell-your-license">List Your License</Link>
        </nav>
      </header>

      <section className="county-hero">
        <div className="county-shell county-hero-grid">
          <div>
            <div className="county-breadcrumbs">
              <Link href="/">Home</Link><span>›</span><Link href="/counties">Counties</Link><span>›</span><strong>{county.name}</strong>
            </div>
            <span className="county-kicker">Florida Quota License Marketplace</span>
            <h1>{county.name} Liquor Licenses for Sale</h1>
            <p>{county.introduction}</p>
            <div className="county-hero-actions">
              <Link className="county-button county-button-gold" href={`/listings?county=${encodeURIComponent(county.name)}&status=available`}>View Current Inventory</Link>
              <Link className="county-button county-button-dark" href="/sell-your-license">List a License</Link>
            </div>
          </div>
          <div className="county-map-card" aria-label={`${county.name} map`}>
            <FloridaCountyMap county={county.name} />
            <strong>{county.name}</strong>
            <span>{cityText}</span>
          </div>
        </div>
      </section>

      <section className="county-stats county-shell" aria-label={`${county.name} listing statistics`}>
        <div><span>Available Now</span><strong>{available.length}</strong></div>
        <div><span>Lowest Disclosed Ask</span><strong>{lowest === null ? "Undisclosed" : money(lowest)}</strong></div>
        <div><span>Median Disclosed Ask</span><strong>{medianPrice === null ? "Undisclosed" : money(medianPrice)}</strong></div>
        <div><span>Highest Disclosed Ask</span><strong>{highest === null ? "Undisclosed" : money(highest)}</strong></div>
      </section>

      <section className="county-supply county-shell" aria-label={`${county.name} official quota license inventory`}>
        <div className="county-supply-heading">
          <div>
            <span>Official DBPR County Supply</span>
            <h2>{county.name} Quota License Inventory</h2>
          </div>
          <Link href="/resources/florida-liquor-license-types">How quota licenses work ›</Link>
        </div>

        {quotaInventory ? (
          <>
            <div className="county-supply-grid">
              <div><span>Active or Temporary</span><strong>{quotaInventory.activeOrTemporary.toLocaleString("en-US")}</strong><small>Active DBPR quota records</small></div>
              <div><span>4COP Quota Records</span><strong>{quotaInventory.fourCopQuotaRecords.toLocaleString("en-US")}</strong><small>Exact 4COP series count</small></div>
              <div><span>Escrow or Restricted</span><strong>{(quotaInventory.escrow + quotaInventory.delinquent + quotaInventory.restrictedOrPending).toLocaleString("en-US")}</strong><small>Not counted as active supply</small></div>
              <div className="county-supply-total"><span>Total Existing Inventory</span><strong>{quotaInventory.totalIssued.toLocaleString("en-US")}</strong><small>Distinct current DBPR records</small></div>
            </div>
            <div className="county-supply-source">
              <p>
                Calculated from DBPR&apos;s daily retail alcoholic-beverage license extract. Specialty 4COP classifications are excluded.
                The total includes full-liquor population-quota series 4COP through 8COP and excludes null-and-void, revoked, and transferred records.
              </p>
              <div>
                <span>Official series: {quotaInventory.series.length ? Object.entries(quotaInventory.seriesBreakdown).map(([series, count]) => `${series} (${count})`).join(" · ") : "No current quota records"}</span>
                <span>DBPR data updated {sourceDate(quotaInventory.dbprDataUpdatedAt)}</span>
              </div>
            </div>
          </>
        ) : (
          <div className="county-supply-unavailable">
            DBPR&apos;s daily quota inventory feed is temporarily unavailable. Marketplace listings remain available below.
          </div>
        )}
      </section>

      <section className="county-inventory">
        <div className="county-shell">
          <div className="county-section-heading">
            <div><span>Current Marketplace Inventory</span><h2>Available Licenses in {county.name}</h2></div>
            <Link href={`/listings?county=${encodeURIComponent(county.name)}`}>Open filtered listings ›</Link>
          </div>
          <p className="county-disclaimer">Listings are for liquor-license interests only unless expressly stated otherwise. Prices and availability remain subject to confirmation.</p>

          {available.length ? (
            <div className="county-listing-grid">
              {available.map((listing) => (
                <article className="county-listing-card" id={listing.sourceRef} key={listingKey(listing)}>
                  <div className="county-listing-map"><FloridaCountyMap county={listing.county} /><span>{listing.type}</span></div>
                  <div className="county-listing-body">
                    <p>● <Link href={`/counties/${county.slug}`}>{listing.county}</Link></p>
                    <h3>{listing.priceLabel}</h3>
                    <div className="county-listing-facts"><span>{listing.type}</span><span>Transferable/Available</span></div>
                    <small>Listing reference: {listing.sourceRef}</small>
                    <div className="county-listing-actions">
                      <Link className="county-button county-button-dark" href={inquiryHref(listing)}>Inquire</Link>
                      <Link className="county-button county-button-gold" href={offerHref(listing)}>Submit an Offer</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="county-empty">
              <strong>No active marketplace listings are currently displayed for {county.name}.</strong>
              <p>Inventory changes frequently. Sellers and brokers can submit a confidential listing, and buyers can review all current Florida opportunities.</p>
              <div><Link className="county-button county-button-gold" href="/sell-your-license">List a License</Link><Link className="county-button county-button-dark" href="/listings">View All Listings</Link></div>
            </div>
          )}
        </div>
      </section>

      <section className="county-guide county-shell">
        <article>
          <span>County Market Overview</span>
          <h2>Understanding the {county.name} License Market</h2>
          <p>{county.marketOverview}</p>
          <p>A quota license is county-specific. A buyer should confirm that the license category fits the proposed use and should separately evaluate the intended premises, zoning, local approvals, liens, financing documents, and the state transfer process.</p>
        </article>
        <aside>
          <h3>Transaction checklist</h3>
          <ul>
            <li>Confirm the license number, category, county, and current status.</li>
            <li>Review asking price, deposits, financing, liens, and closing conditions.</li>
            <li>Verify the intended premises and applicable local approvals.</li>
            <li>Use independent legal, tax, and financial professionals.</li>
          </ul>
          <Link href="/financing">Explore license financing ›</Link>
        </aside>
      </section>

      <section className="county-cta">
        <div className="county-shell county-cta-grid">
          <div><span>For Buyers</span><h2>Need a license in {county.name}?</h2><p>Submit a confidential inquiry or financing request tied to a current listing or acquisition target.</p><Link className="county-button county-button-gold" href="/contact">Contact the Marketplace</Link></div>
          <div><span>For Sellers and Brokers</span><h2>Have a license to market?</h2><p>Publish the opportunity statewide while keeping confidential information off the public listing card.</p><Link className="county-button county-button-gold" href="/sell-your-license">List Your License</Link></div>
        </div>
      </section>

      <section className="county-faq county-shell">
        <div className="county-section-heading"><div><span>Buyer and Seller Guide</span><h2>{county.name} Liquor-License FAQs</h2></div></div>
        <div className="county-faq-grid">
          {faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
        </div>
      </section>

      {sold.length > 0 && (
        <section className="county-sales county-shell">
          <div className="county-section-heading"><div><span>Market Evidence</span><h2>Recently Sold Listings</h2></div></div>
          <div className="county-sold-grid">
            {sold.map((listing) => <div key={listingKey(listing)}><strong>{listing.priceLabel}</strong><span>{listing.type}</span><em>Sold</em></div>)}
          </div>
        </section>
      )}

      {nearby.length > 0 && (
        <section className="county-nearby county-shell">
          <div className="county-section-heading"><div><span>Nearby Markets</span><h2>Explore Other Florida Counties</h2></div></div>
          <div className="county-nearby-links">
            {nearby.map((item) => <Link key={item.slug} href={`/counties/${item.slug}`}><strong>{item.name}</strong><span>View license market ›</span></Link>)}
          </div>
        </section>
      )}

      <footer className="county-footer">
        <div className="county-shell"><span>© Florida Liquor License Market</span><nav><Link href="/listings">Listings</Link><Link href="/counties">Counties</Link><Link href="/financing">Financing</Link><Link href="/contact">Contact</Link></nav></div>
      </footer>
    </main>
  );
}
