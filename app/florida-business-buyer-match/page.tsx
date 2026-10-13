import type { Metadata } from "next";
import Link from "next/link";
import FormsSiteHeader from "@/components/FormsSiteHeader";
import MarketBuyerLeadForm from "@/components/MarketBuyerLeadForm";
import { businessQuotaListingRecords, passesBusinessMarketSourcePolicy } from "@/lib/business-quota-listings";
import "@/app/fllm-official-template.css";
import "@/app/fllm-design-system.css";
import "@/app/business-market/[reference]/market-record.css";
import "@/app/business-market/[reference]/fllm-capture.css";
import "./buyer-match.css";

const canonical = "https://www.floridaliquorlicensemarket.com/florida-business-buyer-match";

export const metadata: Metadata = {
  title: "Florida Business Buyer Match | Search Businesses With Liquor Licenses | FLLM",
  description: "Search Florida business-and-liquor-license opportunities by county, category, license class, asking price, cash flow, financing and lease preferences. Save your criteria for FLLM buyer alerts.",
  alternates: { canonical },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonical,
    title: "Florida Business Buyer Match Dashboard | FLLM",
    description: "Advanced Florida business search with liquor-license, county, price, earnings and financing filters."
  }
};

const categories = [
  { label: "Restaurants", href: "/restaurants-with-liquor-licenses", text: "Restaurant acquisitions involving 4COP quota, SFS/SRX and 2COP licenses" },
  { label: "Bars & lounges", href: "/bars-for-sale-with-liquor-licenses", text: "Florida bar and cocktail-lounge market opportunities" },
  { label: "Nightclubs", href: "/nightclubs-for-sale-with-liquor-licenses", text: "Nightclubs with relevant full-liquor license structures" },
  { label: "Liquor stores", href: "/businesses-with-quota-licenses/liquor-stores", text: "Package-store businesses and 3PS quota license opportunities" },
  { label: "Marinas", href: "/businesses-with-quota-licenses/marinas", text: "Marina business packages and associated license types" },
] as const;

export default function FloridaBusinessBuyerMatchPage() {
  const published = businessQuotaListingRecords.filter(item =>
    item.publicationStatus === "published" && passesBusinessMarketSourcePolicy(item));
  const counties = new Set(published.map(item => item.county)).size;
  const jsonLd = {
    "@context": "https://schema.org", "@type": "WebPage",
    name: "Florida Business Buyer Match Dashboard",
    url: canonical,
    description: "A specialized FLLM search interface for Florida businesses involving liquor licenses.",
    isPartOf: { "@type": "WebSite", name: "Florida Liquor License Market", url: "https://www.floridaliquorlicensemarket.com" }
  };
  return <main className="fllm-buyer-match-page fllm-official-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replaceAll("<","\\u003c")}} />
    <FormsSiteHeader />
    <section className="fllm-buyer-match-hero">
      <div className="fllm-buyer-match-shell">
        <nav aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/businesses-with-quota-licenses">Business Market</Link><span>›</span>Buyer Match</nav>
        <p className="fllm-buyer-match-kicker">FLORIDA LIQUOR LICENSE MARKET · BUYER INTELLIGENCE</p>
        <h1>Find Florida Businesses for Sale <em>With Liquor Licenses</em></h1>
        <p className="fllm-buyer-match-intro">Search Florida restaurants, bars, nightclubs, liquor stores and other hospitality opportunities using the FLLM Advanced Business Buyer Match Dashboard. Compare business categories, counties, license classes, advertised prices, disclosed financials and financing preferences without confusing independent Market Views with authorized broker listings.</p>
        <div className="fllm-buyer-match-facts"><span><strong>{published.length}</strong> Published market records</span><span><strong>{counties}</strong> Counties represented</span><span><strong>4COP · 3PS · SFS/SRX · 2COP</strong> License filters</span></div>
        <a className="fllm-buyer-match-jump" href="#advanced-buyer-match">Start Buyer Search ↓</a>
      </div>
    </section>
    <section id="advanced-buyer-match" className="fllm-buyer-match-dashboard fllm-buyer-match-shell" aria-label="Advanced business buyer matching dashboard">
      <MarketBuyerLeadForm
        dashboardOnly
        listingReference="FLLM-BUYER-MATCH"
        listingTitle="Florida Business Buyer Match Dashboard"
        county="Florida"
        businessType="Restaurant"
        licenseType="4COP Quota"
        askingPrice="Not specified"
        listingUrl="/florida-business-buyer-match"
      />
    </section>
    <section className="fllm-buyer-match-info fllm-buyer-match-shell">
      <h2>Search by Florida Business Category</h2>
      <p>Browse FLLM's separate market hubs or refine your acquisition criteria in the dashboard. Results are based on currently published records and may include independent market observations and authorized Featured Broker Listings.</p>
      <div className="fllm-buyer-match-categories">{categories.map(category =>
        <Link key={category.href} href={category.href}><strong>{category.label}</strong><span>{category.text}</span><b>Explore market →</b></Link>
      )}</div>
      <h2>How Florida business-and-license matching works</h2>
      <p>Choose a business category and county, then filter by liquor-license type, business-plus-license asking price, disclosed revenue, earnings, potential SBA qualification, seller financing and property or lease preferences. FLLM distinguishes disclosed matches from potential matches when source information is incomplete.</p>
      <p>Save your search to receive alerts for newly published matches. Buyer information stays with FLLM; inquiries are not automatically forwarded to sellers or third-party brokers. Market Views are independent market observations, not seller-authorized FLLM offerings. Availability and deal terms require verification.</p>
      <p>Buying only a transferable quota license? Visit <Link href="/listings">FLLM standalone 4COP and 3PS license inventory</Link>. To browse operating-business observations without advanced filtering, see the <Link href="/businesses-with-quota-licenses">Florida business-and-license marketplace</Link>.</p>
    </section>
  </main>;
}
