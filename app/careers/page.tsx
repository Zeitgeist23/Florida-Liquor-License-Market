import type { Metadata } from "next";
import Link from "next/link";
import "./careers.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const applyHref = "/contact?careers=1";

export const metadata: Metadata = {
  title: "Careers | Florida Liquor License Market",
  description:
    "Explore sales, county market, and business-development opportunities with Florida Liquor License Market. Help grow Florida's statewide marketplace for transferable liquor licenses.",
  alternates: { canonical: `${siteUrl}/careers` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${siteUrl}/careers`,
    title: "Careers | Florida Liquor License Market",
    description:
      "Join FLLM and help build Florida's statewide marketplace for transferable quota liquor licenses.",
    siteName: "Florida Liquor License Market",
  },
};

const roles = [
  {
    eyebrow: "Marketplace Sales",
    title: "Marketplace Sales Representative",
    copy: "Develop relationships with Florida liquor-license owners, prospective buyers, hospitality operators, attorneys, and other market participants. Help bring qualified 4COP and 3PS opportunities to the marketplace and keep prospective buyers engaged.",
  },
  {
    eyebrow: "Local Market Development",
    title: "County Market Representative",
    copy: "Build FLLM's presence in selected Florida counties. Identify potential sellers, maintain local market relationships, follow current inventory, and become a knowledgeable point of contact for buyers and sellers in your assigned markets.",
  },
  {
    eyebrow: "Growth & Referrals",
    title: "Business Development Representative",
    copy: "Build referral relationships with hospitality professionals, attorneys, accountants, lenders, consultants, and other professionals who work with Florida restaurants, bars, package stores, and quota-license owners.",
  },
];

const responsibilities = [
  "Identify owners of transferable Florida quota licenses who may be interested in listing or selling.",
  "Develop and maintain professional relationships with buyers searching for 4COP and 3PS opportunities.",
  "Help keep marketplace inventory, asking-price information, and seller communications current.",
  "Conduct outbound business development by phone, email, and professional networking.",
  "Coordinate inquiries and information flow while protecting confidential seller and buyer information.",
  "Refer legal, regulatory, tax, financing, and other professional matters to the appropriate qualified professionals.",
];

export default function CareersPage() {
  return (
    <main className="careers-page">
      <header className="careers-header careers-shell">
        <Link className="careers-brand" href="/" aria-label="Florida Liquor License Market home">
          <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
        </Link>
        <nav aria-label="Careers navigation">
          <Link href="/florida-liquor-licenses-for-sale">Licenses for Sale</Link>
          <Link href="/sell-your-license">List Your License</Link>
          <Link href="/contact">Contact Us</Link>
        </nav>
      </header>

      <section className="careers-hero">
        <div className="careers-shell careers-hero-grid">
          <div>
            <span className="careers-kicker">Join Florida Liquor License Market</span>
            <h1>Build the Florida liquor-license marketplace with us.</h1>
            <p>
              FLLM is developing a statewide network of marketplace sales and business-development professionals who can identify new license opportunities, build buyer relationships, and expand coverage across Florida&apos;s 67 counties.
            </p>
            <div className="careers-actions">
              <Link className="careers-button careers-button-gold" href={applyHref}>Apply to Join FLLM</Link>
              <Link className="careers-button careers-button-dark" href="/listings">Explore the Marketplace</Link>
            </div>
          </div>
          <aside className="careers-hero-card">
            <span>What matters here</span>
            <strong>Sales ability. Market knowledge. Professional follow-through.</strong>
            <p>We are interested in people who can build relationships, find opportunities, communicate clearly, and represent the marketplace professionally.</p>
          </aside>
        </div>
      </section>

      <section className="careers-section careers-shell">
        <div className="careers-heading">
          <span>Opportunities</span>
          <h2>Ways to work with FLLM</h2>
          <p>Roles can vary by market, experience, and business-development focus. Compensation and engagement structure are discussed with qualified candidates before any commitment.</p>
        </div>
        <div className="careers-role-grid">
          {roles.map((role) => (
            <article key={role.title}>
              <span>{role.eyebrow}</span>
              <h3>{role.title}</h3>
              <p>{role.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="careers-band">
        <div className="careers-shell careers-split">
          <article>
            <span className="careers-section-kicker">Marketplace Responsibilities</span>
            <h2>What representatives may work on</h2>
            <ul>
              {responsibilities.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
          <aside className="careers-scope-card">
            <span>Role Scope</span>
            <h3>Standalone liquor-license marketplace work</h3>
            <p>
              FLLM marketplace roles focus on standalone Florida liquor-license listings and related buyer/seller business development. These roles do not authorize a representative to broker real estate, leases, or operating businesses unless the representative is separately qualified and specifically authorized to perform that work.
            </p>
            <p>
              FLLM marketplace representatives are not engaged by FLLM to sell alcoholic beverages at wholesale. Any activity requiring a separate professional license or authorization must be handled in accordance with applicable law.
            </p>
          </aside>
        </div>
      </section>

      <section className="careers-section careers-shell careers-qualifications">
        <div className="careers-heading">
          <span>Who We Want</span>
          <h2>Experience that can translate well</h2>
        </div>
        <div className="careers-qualification-grid">
          <div><strong>Sales &amp; Business Development</strong><p>Cold calling, relationship sales, account development, lead generation, recruiting sellers, or managing a pipeline.</p></div>
          <div><strong>Hospitality &amp; Small Business</strong><p>Restaurant, bar, liquor-store, hospitality, commercial lending, business ownership, or related market experience.</p></div>
          <div><strong>Florida Market Knowledge</strong><p>Knowledge of particular counties, local hospitality markets, quota licenses, or professional networks within Florida.</p></div>
          <div><strong>Professional Credentials</strong><p>Existing professional licenses or brokerage experience are welcome where relevant, but are not a general prerequisite for an FLLM marketplace role focused solely on standalone liquor-license listings.</p></div>
        </div>
      </section>

      <section className="careers-apply">
        <div className="careers-shell careers-apply-card">
          <div>
            <span>Interested?</span>
            <h2>Tell us what part of Florida you know.</h2>
            <p>
              Send a short introduction with your sales or business-development background, the Florida counties or markets you know best, and the best way to reach you.
            </p>
          </div>
          <Link className="careers-button careers-button-gold" href={applyHref}>Apply to Join FLLM</Link>
        </div>
      </section>

      <footer className="careers-footer">
        <div className="careers-shell">
          <span>© 2026 Florida Liquor License Market</span>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/listings">Listings</Link>
            <Link href="/sell-your-license">Sell</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
