import type { Metadata } from "next";
import Link from "next/link";
import FormsSiteHeader from "@/components/FormsSiteHeader";
import BusinessListingIntake from "./BusinessListingIntake";
import "@/app/fllm-official-template.css";
import "@/app/fllm-design-system.css";
import "./business-intake.css";

const url = "https://www.floridaliquorlicensemarket.com/list-your-business";
export const metadata: Metadata = {
  title: "List a Florida Business With a Liquor License | FLLM",
  description: "Request review of a Florida restaurant, bar, nightclub, liquor store or hospitality business for authorized FLLM advertising. Business sellers and independent brokers welcome.",
  alternates: { canonical: url },
  robots: { index: true, follow: true },
};
export default function ListYourBusinessPage() {
  return <main className="fllm-business-intake-page fllm-official-page">
    <div className="listings-header-band"><FormsSiteHeader primaryActionHref="/list-your-business" primaryActionLabel="List Your Business" /></div>
    <section className="fllm-business-intake-shell">
      <nav aria-label="Breadcrumb"><Link href="/">Home</Link> › <Link href="/florida-business-buyer-match">Business Buyer Match</Link> › List Your Business</nav>
      <p className="fllm-business-intake-eyebrow">FLORIDA LIQUOR LICENSE MARKET</p>
      <h1>List Your Florida Business <em>With a Liquor License</em></h1>
      <p className="fllm-business-intake-intro">Own a restaurant, bar, nightclub, liquor store or other Florida business with a liquor license? Request a review for an authorized FLLM listing. We do not publish a business or imply seller representation without permission.</p>
      <div className="fllm-business-intake-options">
        <div><h2>Business owners</h2><p>Provide your business and license information below. FLLM will review the request before discussing publication options.</p></div>
        <div><h2>Licensed business brokers</h2><p>Representing a seller? Use the approved broker listing workflow for authorized advertising, including businesses packaged with licenses.</p><Link href="/brokers/list-your-license">Authorized Broker Listing →</Link></div>
      </div>
      <BusinessListingIntake />
      <p className="fllm-business-intake-return"><Link href="/florida-business-buyer-match">← Return to the Business Buyer Match Dashboard</Link></p>
    </section>
  </main>;
}
