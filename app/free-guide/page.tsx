import type { Metadata } from "next";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import FreeGuideCapture from "./FreeGuideCapture";
import "./free-guide.css";

const canonicalUrl = "https://www.floridaliquorlicensemarket.com/free-guide";

export const metadata: Metadata = {
  title: "Free Florida Liquor License Buyer’s & Seller’s Guide | FLLM",
  description:
    "Download FLLM’s free 2026 guide to buying, selling, financing, applying for, and investing in Florida liquor licenses.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "The Official Florida Liquor License Market Buyer’s & Seller’s Guide",
    description:
      "A practical 48-page guide to Florida liquor licenses, quota markets, applications, financing, and professional support.",
    images: ["/assets/fllm-buyers-sellers-guide-cover.jpg"],
  },
};

const included = [
  "How Florida’s quota-license market works",
  "Buying or selling with a broker vs. self-directed",
  "3PS, 4COP, 2APS, 2COP, SFS and SRX explained",
  "Food-sales requirements by license type",
  "ABT-6002, fingerprints and background screening",
  "Financing through banks, private lenders and self-directed IRAs",
  "FLLM listings, heat maps, valuation, legal and DABT resources",
  "Checklists for buyers, sellers and applicants",
];

export default function FreeGuidePage() {
  return (
    <main className="free-guide-page">
      <div className="free-guide-header-wrap">
        <FormsSiteHeader primaryActionHref="/listings" primaryActionLabel="View Listings" />
      </div>

      <section className="free-guide-hero">
        <div className="free-guide-glow" aria-hidden="true" />
        <div className="free-guide-layout page-shell">
          <div className="guide-cover-column">
            <div className="guide-cover-frame">
              <img
                src="/assets/fllm-buyers-sellers-guide-cover.jpg"
                alt="The Official Florida Liquor License Market Buyer’s and Seller’s Guide, 2026 Edition"
              />
            </div>
            <p className="guide-format"><strong>48 pages</strong><span>•</span>2026 edition<span>•</span>PDF</p>
          </div>

          <div className="guide-copy">
            <p className="guide-eyebrow">Complimentary 2026 Florida licensing guide</p>
            <h1>Make your next liquor-license decision with a clearer roadmap.</h1>
            <p className="guide-lead">
              Get FLLM’s practical buyer’s and seller’s guide—built for Florida business owners,
              license holders, applicants, investors and professional advisers.
            </p>

            <div className="guide-included" aria-labelledby="guide-included-title">
              <h2 id="guide-included-title">Inside the guide</h2>
              <ul>
                {included.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>

            <FreeGuideCapture />
          </div>
        </div>
      </section>

      <section className="guide-trust page-shell" aria-label="About this guide">
        <article>
          <span>01</span>
          <h2>Market intelligence</h2>
          <p>Learn how county supply, demand, license type and transaction evidence affect Florida quota-license values.</p>
        </article>
        <article>
          <span>02</span>
          <h2>Process guidance</h2>
          <p>Understand the buying, selling, application, transfer, fingerprinting and background-review process.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Ways FLLM can help</h2>
          <p>Explore self-directed listings, professional brokerage, valuation, appraisal, financing and educational resources.</p>
        </article>
      </section>

      <footer className="free-guide-footer">
        <div className="page-shell">
          <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
          <p>Educational information only. License requirements can change and should be verified with Florida DBPR/DABT and qualified advisers.</p>
        </div>
      </footer>
    </main>
  );
}
