import type { Metadata } from "next";
import Link from "next/link";
import FormsSiteHeader from "@/components/FormsSiteHeader";
import MarketBuyerLeadForm from "@/components/MarketBuyerLeadForm";
import BuyerMatchHeroPills from "@/components/BuyerMatchHeroPills";
import "@/app/fllm-official-template.css";
import "@/app/fllm-design-system.css";
import "@/app/business-market/[reference]/market-record.css";
import "@/app/business-market/[reference]/fllm-capture.css";
import "./buyer-match.css";

const canonical = "https://www.floridaliquorlicensemarket.com/florida-business-buyer-match";

export const metadata: Metadata = {
  title: "Find a Business | Florida Buyer Match Dashboard | FLLM",
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
    <div className="listings-header-band fllm-buyer-match-official-header"><FormsSiteHeader primaryActionHref="/list-your-business" primaryActionLabel="List a Business" /></div>
    <section className="fllm-buyer-match-hero">
      <div className="fllm-buyer-match-shell">
        <nav aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/businesses-with-quota-licenses">Business Market</Link><span>›</span>Buyer Match</nav>
        <p className="fllm-buyer-match-kicker">FLLM ADVANCED BUSINESS BUYER SEARCH</p>
        <h1>Florida Business <em>Buyer Match Dashboard</em></h1>
        <p>Find Florida businesses for sale with liquor licenses. Choose business categories, counties and license types, then refine your budget and preferences to see matching opportunities.</p>
        <BuyerMatchHeroPills />
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
