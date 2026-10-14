import type { Metadata } from "next";
import Link from "next/link";
import FormsSiteHeader from "@/components/FormsSiteHeader";
import MarketBuyerLeadForm from "@/components/MarketBuyerLeadForm";
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
  { label: "Restaurants", href: "/restaurants-with-liquor-licenses", style: "restaurant" },
  { label: "Bars & Taverns", href: "/bars-for-sale-with-liquor-licenses", style: "bar" },
  { label: "Cocktail Lounges", href: "/bars-for-sale-with-liquor-licenses", style: "cocktail-lounge" },
  { label: "Nightclubs", href: "/nightclubs-for-sale-with-liquor-licenses", style: "nightclub" },
  { label: "Liquor Stores", href: "/businesses-with-quota-licenses/liquor-stores", style: "liquor-store" },
  { label: "Gentlemen's Clubs", href: "/gentlemens-clubs-for-sale-with-liquor-licenses", style: "gentlemens-club" },
  { label: "Marinas", href: "/businesses-with-quota-licenses/marinas", style: "marina" },
  { label: "Hotels & Motels", href: "/businesses-with-quota-licenses", style: "hotel-motel" },
] as const;

export default function FloridaBusinessBuyerMatchPage() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "WebPage",
    name: "Florida Business Buyer Match Dashboard",
    url: canonical,
    description: "A specialized FLLM search interface for Florida businesses involving liquor licenses.",
    isPartOf: { "@type": "WebSite", name: "Florida Liquor License Market", url: "https://www.floridaliquorlicensemarket.com" }
  };
  return <main className="fllm-buyer-match-page fllm-official-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replaceAll("<","\\u003c")}} />
    <div className="listings-header-band fllm-buyer-match-official-header"><FormsSiteHeader /></div>
    <section className="fllm-buyer-match-hero">
      <div className="fllm-buyer-match-shell">
        <nav aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/businesses-with-quota-licenses">Business Market</Link><span>›</span>Buyer Match</nav>
        <p className="fllm-buyer-match-kicker">FLLM ADVANCED BUSINESS BUYER SEARCH</p>
        <h1>Find Florida Businesses <em>With Liquor Licenses</em></h1>
        <div className="fllm-buyer-match-choices" aria-label="Businesses and liquor license categories">
          <div className="fllm-buyer-match-choice-row"><strong>BUSINESSES</strong><div className="fllm-buyer-match-pills">
            {categories.map(category => <Link key={category.label} href={category.href} className={`business-market-category-badge business-market-category-badge--${category.style}`}>{category.label}</Link>)}
          </div></div>
          <div className="fllm-buyer-match-choice-row"><strong>LICENSE TYPES</strong><div className="fllm-buyer-match-pills fllm-buyer-match-license-pills">
            <span className="fllm-match-license-pill fllm-match-license-pill--quota">4COP Quota</span>
            <span className="fllm-match-license-pill fllm-match-license-pill--quota">3PS Quota</span>
            <span className="fllm-match-license-pill">4COP SFS / SRX</span>
            <span className="fllm-match-license-pill">2COP Beer &amp; Wine</span>
          </div></div>
        </div>
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

  </main>;
}
