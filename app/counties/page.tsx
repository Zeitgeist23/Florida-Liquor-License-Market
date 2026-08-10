import type { Metadata } from "next";
import Link from "next/link";
import { floridaCounties, featuredCounties } from "@/data/florida-counties";
import { getMarketplaceListings } from "@/lib/listing-store";
import "./counties-page.css";

export const metadata: Metadata = {
  title: "Florida Liquor Licenses by County | County Market Directory",
  description: "Browse permanent Florida county market pages for transferable 4COP and 3PS quota liquor-license interests, current listings, asking prices, and confidential inquiry options.",
  alternates: { canonical: "https://www.floridaliquorlicensemarket.com/counties" },
  openGraph: {
    type: "website",
    url: "https://www.floridaliquorlicensemarket.com/counties",
    title: "Florida Liquor Licenses by County",
    description: "Explore Florida liquor-license inventory and market information by county.",
    siteName: "Florida Liquor License Market",
  },
};

export const dynamic = "force-dynamic";

export default async function CountiesPage() {
  const listings = await getMarketplaceListings();
  const availableCounts = new Map<string, number>();
  listings.filter((listing) => Boolean(listing.sourceRef)).forEach((listing) => {
    availableCounts.set(listing.county, (availableCounts.get(listing.county) ?? 0) + 1);
  });

  const alphabetical = [...floridaCounties].sort((a, b) => a.name.localeCompare(b.name));
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Florida liquor license markets by county",
    url: "https://www.floridaliquorlicensemarket.com/counties",
    numberOfItems: alphabetical.length,
    itemListElement: alphabetical.map((county, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: county.name,
      url: `https://www.floridaliquorlicensemarket.com/counties/${county.slug}`,
    })),
  };

  return (
    <main className="county-directory-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} />
      <header className="directory-header directory-shell">
        <Link className="directory-brand" href="/" aria-label="Florida Liquor License Market home"><img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" /></Link>
        <nav><Link href="/florida-liquor-licenses-for-sale">Licenses for Sale</Link><Link href="/listings">All Listings</Link><Link href="/financing">Financing</Link><Link href="/sell-your-license">List Your License</Link><Link href="/contact">Contact</Link></nav>
      </header>

      <section className="directory-hero">
        <div className="directory-shell">
          <span>Florida County Marketplace Directory</span>
          <h1>Liquor Licenses by County</h1>
          <p>Explore permanent county pages with current marketplace inventory, disclosed asking-price ranges, buying and selling information, financing links, and county-specific market guidance.</p>
        </div>
      </section>

      <section className="directory-featured directory-shell">
        <div className="directory-heading"><div><span>High-Interest Markets</span><h2>Featured Florida Counties</h2></div><Link href="/florida-liquor-licenses-for-sale">Florida licenses for sale ›</Link></div>
        <div className="directory-featured-grid">
          {featuredCounties.map((county) => (
            <Link key={county.slug} href={`/counties/${county.slug}`}>
              <div><strong>{county.name}</strong><span>{county.primaryCities.join(" · ")}</span></div>
              <em>{availableCounts.get(county.name) ?? 0} available</em>
            </Link>
          ))}
        </div>
      </section>

      <section className="directory-all">
        <div className="directory-shell">
          <div className="directory-heading"><div><span>All 67 Counties</span><h2>Browse the Statewide Directory</h2></div></div>
          <p className="directory-note">County pages without active listings remain available for seller submissions and buyer research. Inventory changes frequently, and all prices and availability require confirmation.</p>
          <div className="directory-grid">
            {alphabetical.map((county) => (
              <Link key={county.slug} href={`/counties/${county.slug}`}>
                <div><strong>{county.name}</strong><span>{county.primaryCities.length ? county.primaryCities.join(", ") : "Florida county market"}</span></div>
                <div className="directory-count"><b>{availableCounts.get(county.name) ?? 0}</b><small>available</small></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="directory-cta">
        <div className="directory-shell directory-cta-grid">
          <div><span>For Buyers</span><h2>Search current license opportunities</h2><p>Compare Florida liquor licenses for sale, then filter live inventory by county, license type, price and availability.</p><Link href="/florida-liquor-licenses-for-sale">Browse Florida Licenses for Sale</Link></div>
          <div><span>For Sellers and Brokers</span><h2>Add a county listing</h2><p>Publish a transferable license opportunity while keeping confidential details off the public card.</p><Link href="/sell-your-license">List Your License</Link></div>
        </div>
      </section>

      <footer className="directory-footer"><div className="directory-shell"><span>© Florida Liquor License Market</span><nav><Link href="/">Home</Link><Link href="/florida-4cop-liquor-license-for-sale">4COP</Link><Link href="/florida-3ps-liquor-license-for-sale">3PS</Link><Link href="/listings">Listings</Link><Link href="/contact">Contact</Link></nav></div></footer>
    </main>
  );
}
