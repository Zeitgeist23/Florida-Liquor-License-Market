import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../../../florida-liquor-licenses-for-sale/seo-market.css";

const resources = {
  "florida-abt": {
    eyebrow: "Florida Licensing Authority",
    title: "Florida Division of Alcoholic Beverages & Tobacco",
    intro: "A Florida Liquor License Market overview of the state agency that administers alcoholic beverage licensing in Florida.",
    bullets: [
      "Alcoholic beverage license applications and licensing procedures",
      "License status, renewals and regulatory administration",
      "DBPR forms and applicant guidance",
      "State-level alcoholic beverage compliance resources",
    ],
  },
  "transfer-of-ownership": {
    eyebrow: "Transfer Resource",
    title: "DBPR Transfer-of-Ownership Checklist",
    intro: "An FLLM overview of the items buyers should expect to review when preparing a transfer-of-ownership application for an existing Florida alcoholic beverage license.",
    bullets: [
      "Applicant and ownership information",
      "Transfer application and supporting documentation",
      "Location, qualification and filing requirements",
      "Applicable fees and closing coordination",
    ],
  },
  "quota-license-information": {
    eyebrow: "Quota License Resource",
    title: "Florida Quota License Information",
    intro: "An FLLM guide to the Florida quota-license system, including county-based quota limits, existing quota inventory and the state quota drawing process.",
    bullets: [
      "County-specific quota licensing",
      "4COP and 3PS quota license considerations",
      "Active and inactive quota-license inventory concepts",
      "Florida quota drawing information",
    ],
  },
  "statute-561-20": {
    eyebrow: "Florida Statute Guide",
    title: "Florida Statute § 561.20",
    intro: "An FLLM overview of the Florida statutory provisions that address quota limitations and certain exceptions for alcoholic beverage licenses.",
    bullets: [
      "County population and quota-license limits",
      "Quota-license availability concepts",
      "Statutory exceptions and special-license categories",
      "Why county selection matters before buying a quota license",
    ],
  },
  "statute-561-32": {
    eyebrow: "Florida Statute Guide",
    title: "Florida Statute § 561.32",
    intro: "An FLLM overview of Florida provisions governing transfers of alcoholic beverage licenses and interests in licensed businesses.",
    bullets: [
      "Transfers of alcoholic beverage licenses",
      "Ownership and interest changes",
      "Approval requirements before a transfer is complete",
      "Why buyers should coordinate the contract, closing and DBPR filing",
    ],
  },
  "statute-561-15": {
    eyebrow: "Florida Statute Guide",
    title: "Florida Statute § 561.15",
    intro: "An FLLM overview of applicant qualification requirements under Florida's Beverage Law.",
    bullets: [
      "Applicant qualification concepts",
      "Ownership and background review considerations",
      "Why buyer eligibility should be checked before closing",
      "The importance of confirming current DBPR requirements",
    ],
  },
} as const;

type ResourceSlug = keyof typeof resources;

export function generateStaticParams() {
  return Object.keys(resources).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const resource = resources[slug as ResourceSlug];
  if (!resource) return {};
  return {
    title: `${resource.title} | Florida Liquor License Market`,
    description: resource.intro,
  };
}

export default async function OfficialResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = resources[slug as ResourceSlug];
  if (!resource) notFound();

  return (
    <main className="seo-market-page official-resource-page">
      <style>{`
        .official-resource-page{background:#f7f7f5;color:#111820;min-height:100vh}
        .official-resource-hero{padding:58px 0 48px;border-block:1px solid rgba(246,167,0,.42);background:radial-gradient(circle at 82% 15%,rgba(246,167,0,.18),transparent 29%),linear-gradient(135deg,#020b12 0%,#061728 58%,#0a2237 100%);color:#fff}
        .official-resource-hero .eyebrow{display:block;color:#f6a700;font-size:12px;font-weight:900;letter-spacing:.13em;text-transform:uppercase}
        .official-resource-hero h1{max-width:900px;margin:11px 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:clamp(38px,5vw,62px);line-height:1.02;font-weight:500}
        .official-resource-hero p{max-width:820px;margin:0;color:#d8e3eb;font-size:18px;line-height:1.65}
        .official-resource-body{padding:56px 0 70px}
        .official-resource-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:24px;align-items:start}
        .official-resource-panel{padding:26px;border:1px solid rgba(246,167,0,.32);border-radius:9px;background:linear-gradient(145deg,#0a2237,#04111c);color:#fff;box-shadow:0 14px 30px rgba(2,11,18,.16)}
        .official-resource-panel h2{margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:30px;font-weight:500}
        .official-resource-panel ul{margin:0;padding-left:20px;color:#d3dee6;line-height:1.75}
        .official-resource-note{padding:24px;border:1px solid #ddd5c5;border-radius:9px;background:#fff;color:#425364;line-height:1.7}
        .official-resource-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:24px}
        .official-resource-actions a{display:inline-flex;min-height:46px;align-items:center;justify-content:center;padding:0 18px;border-radius:5px;font-size:12px;font-weight:900;text-transform:uppercase;transition:.18s ease}
        .official-resource-actions .gold{border:1px solid #ffc12d;background:linear-gradient(145deg,#ffbd21,#ef9000);color:#07111a;box-shadow:inset 0 1px rgba(255,255,255,.4),0 8px 20px rgba(246,167,0,.22)}
        .official-resource-actions .dark{border:1px solid #f6a700;background:#061728;color:#f6a700}
        .official-resource-actions a:hover{transform:translateY(-2px);filter:brightness(1.06)}
        @media(max-width:760px){.official-resource-grid{grid-template-columns:1fr}.official-resource-actions a{width:100%}}
      `}</style>

      <div className="abt-header-wrap">
        <FormsSiteHeader primaryActionHref="/listings" primaryActionLabel="Browse Licenses" />
      </div>

      <section className="official-resource-hero">
        <div className="seo-market-shell">
          <div className="seo-market-breadcrumbs"><Link href="/">Home</Link><span>›</span><Link href="/how-to-buy-florida-liquor-license">Buyer Guide</Link><span>›</span><strong>{resource.title}</strong></div>
          <span className="eyebrow">{resource.eyebrow}</span>
          <h1>{resource.title}</h1>
          <p>{resource.intro}</p>
        </div>
      </section>

      <section className="official-resource-body">
        <div className="seo-market-shell official-resource-grid">
          <article className="official-resource-panel">
            <h2>What this resource covers</h2>
            <ul>{resource.bullets.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <aside className="official-resource-note">
            <strong>Keep the research inside FLLM.</strong>
            <p>This page summarizes the subject in the same FLLM format as the buyer guide so visitors can continue researching without being sent away from the marketplace.</p>
            <p>For a specific transaction, current licensing requirements should still be confirmed before closing.</p>
            <div className="official-resource-actions">
              <Link className="gold" href="/how-to-buy-florida-liquor-license">Back to Buyer Guide</Link>
              <Link className="dark" href="/listings">View Listings</Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
