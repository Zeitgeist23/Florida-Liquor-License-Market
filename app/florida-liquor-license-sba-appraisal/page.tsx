import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import { FLORIDA_COUNTY_PATHS } from "@/components/FloridaCountyMap";
import "../resources/forms/abt-forms.css";
import "../florida-liquor-licenses-for-sale/seo-market.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-liquor-license-sba-appraisal`;

export const metadata: Metadata = {
  title: "Florida Liquor License SBA Appraisal | 4COP & 3PS Valuation",
  description:
    "SBA 7(a) SOP 50 10 8.1 guidance and lender-review support for Florida 4COP and 3PS quota-license valuations in business purchases and eligible refinances.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  keywords: [
    "Florida liquor license SBA appraisal",
    "SBA liquor license appraisal Florida",
    "Florida liquor license appraisal for SBA loan",
    "SBA lender liquor license valuation",
    "4COP SBA appraisal",
    "3PS SBA appraisal",
    "Florida liquor license collateral valuation",
  ],
  openGraph: {
    type: "article",
    url: canonicalUrl,
    title: "Florida Liquor License SBA Appraisal | 4COP & 3PS Valuation",
    description:
      "How FLLM's Florida quota-license appraisal can support SBA 7(a) lender review under SOP 50 10 8.1, while remaining separate from a required business valuation.",
    siteName: "Florida Liquor License Market",
  },
};

const faqs = [
  {
    question: "What changed with SBA SOP 50 10 8.1?",
    answer:
      "SBA SOP 50 10 8.1, Lender and Development Company Loan Programs, took effect October 1, 2026. It is the current SBA origination-procedure reference for 7(a) and 504 lending. The SOP does not make an FLLM report automatically SBA-approved or lender-accepted; the lender must confirm the requirements and report scope for the specific loan.",
  },
  {
    question: "Does an SBA lender always require a separate liquor license appraisal?",
    answer:
      "No single rule should be assumed for every transaction. The participating lender determines the required valuation scope based on the transaction, current SBA program requirements, its credit policy and the assets being financed. Borrowers should confirm the lender's exact appraisal and business-valuation requirements before ordering.",
  },
  {
    question: "Can FLLM provide a lender-review-ready quota-license appraisal?",
    answer:
      "FLLM offers a formal, license-specific report designed to document the market value of a Florida 4COP or 3PS quota license for lender consideration. The report can include subject-license research, county-specific market evidence, DBPR review, transfer and conversion considerations, a valuation date, methodology and a reconciled conclusion. The lender decides whether the report, its author qualifications and its scope meet that lender's requirements. FLLM does not claim SBA endorsement or automatic acceptance.",
  },
  {
    question: "Is a liquor license valuation the same as the SBA business valuation?",
    answer:
      "No. A liquor-license valuation addresses the market value of the quota-license interest. A business valuation addresses the operating enterprise and may include cash flow, goodwill, furniture, fixtures, equipment and other assets. An SBA lender may require one or both analyses depending on the transaction.",
  },
  {
    question: "What Florida license types can be valued?",
    answer:
      "FLLM's license-specific valuation work focuses on Florida quota licenses, principally 4COP quota and 3PS package-store series, using county-specific market evidence and the exact subject-license facts.",
  },
];

const reviewItems = [
  ["Subject license", "License number, county, series, holder of record, status and available DBPR history.", "doc"],
  ["County market", "Current same-county 3PS and 4COP asking-price evidence, with exact-series evidence identified separately.", "pin"],
  ["Transaction evidence", "Available verified sales, transfers and other market evidence appropriate to the assignment.", "chart"],
  ["Collateral considerations", "Transferability, known liens or security interests, marketability and transaction-specific assumptions.", "shield"],
  ["Value reconciliation", "A stated effective date, intended use, methodology and supported conclusion of market value.", "calc"],
  ["Lender requirements", "Any lender-specified reliance language, credential requirement or supplemental scope should be confirmed before engagement.", "people"],
] as const;

function Icon({ name }: { name: (typeof reviewItems)[number][2] | "license" | "business" | "lender" | "info" | "glass" | "handshake" }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "doc" || name === "license") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M7 3h7l4 4v14H7z"/><path {...common} d="M14 3v5h5M10 12h5M10 16h5"/></svg>;
  if (name === "pin") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M12 21s6-5.6 6-11A6 6 0 1 0 6 10c0 5.4 6 11 6 11z"/><circle {...common} cx="12" cy="10" r="2"/></svg>;
  if (name === "chart" || name === "business") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M4 20V9h4v11M10 20V4h4v16M16 20v-7h4v7M3 20h18"/></svg>;
  if (name === "glass") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M6 4h12l-2 7a4 4 0 0 1-8 0zM12 15v5M8 20h8"/></svg>;
  if (name === "handshake") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M3 8l4-3 4 2 2-1 4 2 4-1v7l-5 5-3-2-2 1-3-2-2 1-3-3z"/><path {...common} d="M8 10l3 2 3-2M7 14l2 2M11 15l2 2"/></svg>;
  if (name === "shield") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M12 3l7 3v5c0 4.8-3 8.2-7 10-4-1.8-7-5.2-7-10V6z"/></svg>;
  if (name === "calc") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect {...common} x="5" y="3" width="14" height="18" rx="2"/><path {...common} d="M8 7h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2M16 15h0M8 19h2M12 19h4"/></svg>;
  if (name === "people" || name === "lender") return <svg viewBox="0 0 24 24" aria-hidden="true"><circle {...common} cx="9" cy="8" r="3"/><circle {...common} cx="16" cy="9" r="2.5"/><path {...common} d="M3.5 20c.6-4 3-6 5.5-6s5 2 5.5 6M13.5 20c.4-2.8 1.9-4.5 4-4.5 1.6 0 3 1 3.8 2.7"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle {...common} cx="12" cy="12" r="9"/><path {...common} d="M12 10v6M12 7h.01"/></svg>;
}


function FloridaGhost({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="130 0 320 292" aria-hidden="true">
      <g fill="#1f9ac8" stroke="#55bde1" strokeWidth="0.55">
        {FLORIDA_COUNTY_PATHS.map((county) => (
          <path key={county.id} d={county.path} />
        ))}
      </g>
    </svg>
  );
}

export default function FloridaLiquorLicenseSbaAppraisalPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "SBA 7(a) Florida Quota Liquor License Valuation Support",
      description:
        "FLLM lender-review support for Florida 4COP and 3PS quota-license values in SBA 7(a) business purchases and eligible refinances, with guidance on current SOP 50 10 8.1.",
      datePublished: "2026-08-30",
      dateModified: "2026-10-07",
      mainEntityOfPage: canonicalUrl,
      author: { "@type": "Organization", name: "Florida Liquor License Market" },
      publisher: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
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
    <main className="sba-mockup-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} />
      <style>{`
        .sba-mockup-page{min-height:100vh;background:#082a46;color:#f2f7fa;font-family:Arial,Helvetica,sans-serif}
        .sba-mockup-page *{box-sizing:border-box}
        .sba-shell{width:min(1280px,calc(100% - 64px));margin:0 auto}
        .sba-section{padding:34px 0;border-top:1px solid rgba(238,166,18,.52);background:linear-gradient(145deg,#0c3b60 0%,#082d4c 58%,#06243e 100%)}
        .sba-kicker{display:block;margin-bottom:8px;color:#f5a900;font-size:12px;font-weight:950;letter-spacing:.11em;text-transform:uppercase}
        .sba-title{margin:0;color:#fff;font:700 clamp(32px,3.2vw,44px)/1.06 Georgia,"Times New Roman",serif;letter-spacing:-.02em}
        .sba-copy{max-width:1040px;margin:11px 0 0;color:#d7e6ef;font-size:14px;line-height:1.65}
        #sop-changes .sba-kicker{text-align:center;font-size:14px;letter-spacing:.12em}
        #sop-changes .sba-title{text-align:center}
        #sop-changes .sba-copy{margin:11px auto 0;text-align:center}
        .sba-hero{position:relative;overflow:hidden;padding:26px 0 0;border-top:1px solid rgba(238,166,18,.56);border-bottom:1px solid rgba(238,166,18,.65);background:
          linear-gradient(90deg,rgba(3,18,31,.98) 0%,rgba(3,18,31,.95) 34%,rgba(3,18,31,.80) 54%,rgba(3,18,31,.44) 76%,rgba(3,18,31,.30) 100%),
          url("https://upload.wikimedia.org/wikipedia/commons/d/d6/United_States_Capitol_Building_%28not_a_unit_of_the_National_Park_Service%29_USCA8539.jpg") center 48%/cover no-repeat}
        .sba-hero .sba-shell{position:relative;z-index:2}
        .sba-breadcrumbs{display:flex;gap:8px;align-items:center;margin-bottom:15px;color:#d2e3ec;font-size:12px}
        .sba-breadcrumbs a{color:#f5a900;text-decoration:none}
        .sba-hero-grid{display:grid;grid-template-columns:minmax(0,1.18fr) minmax(360px,.82fr);gap:48px;align-items:center}
        .sba-hero-copy{padding-bottom:18px}
        .sba-hero h1{max-width:820px;margin:7px 0 15px;color:#fff;font:700 clamp(43px,4vw,58px)/.99 Georgia,"Times New Roman",serif;letter-spacing:-.03em}
        .sba-hero-title-line{display:block;white-space:nowrap}
        .sba-hero p{max-width:800px;margin:0;color:#e6eef3;font-size:16px;line-height:1.62;text-shadow:0 1px 0 rgba(0,0,0,.28)}
        .sba-hero-logo-wrap{display:flex;min-height:300px;flex-direction:column;align-items:center;justify-content:center;padding:18px 8px 30px;text-align:center;transform:translateX(24px)}
        .sba-hero-logo{display:block;width:200px;height:auto;overflow:visible;filter:drop-shadow(0 14px 28px rgba(0,0,0,.42))}
        .sba-hero-agency{margin-top:14px;color:#fff;font-size:22px;font-weight:800;line-height:1.16;letter-spacing:.01em;text-shadow:0 2px 8px rgba(0,0,0,.55)}
        .sba-hero-agency span{display:block}
        .sba-actions{display:flex;flex-wrap:wrap;gap:11px;margin-top:20px}
        .sba-btn{display:inline-flex;min-height:43px;align-items:center;justify-content:center;padding:0 18px;border:1px solid #ffc32d;border-radius:5px;background:linear-gradient(145deg,#ffc443,#ed9a00);color:#06131f!important;font-size:11px;font-weight:950;letter-spacing:.02em;text-decoration:none;text-transform:uppercase;box-shadow:inset 0 1px 0 rgba(255,246,204,.62),0 8px 18px rgba(0,0,0,.24);transition:transform .16s ease,filter .16s ease,box-shadow .16s ease}
        .sba-btn.secondary{border-color:rgba(95,210,242,.65);background:linear-gradient(145deg,#104b73,#0a3554);color:#fff!important}
        .sba-btn:hover{transform:translateY(-2px) scale(1.02);filter:brightness(1.08);box-shadow:0 12px 24px rgba(0,0,0,.29)}
        .sba-hero-trust{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));margin-top:22px;border-top:1px solid rgba(255,255,255,.14);background:rgba(2,16,29,.58);backdrop-filter:blur(2px)}
        .sba-hero-trust-item{display:flex;align-items:center;gap:13px;min-height:78px;padding:15px 22px;border-right:1px solid rgba(255,255,255,.12)}
        .sba-hero-trust-item:last-child{border-right:0}
        .sba-hero-trust-icon{display:flex;width:36px;height:36px;flex:0 0 36px;align-items:center;justify-content:center;color:#f0ad39}
        .sba-hero-trust-icon svg{width:100%;height:100%}
        .sba-trust-florida{width:38px!important;height:38px!important}
        .sba-hero-trust-copy strong{display:block;color:#fff;font-size:11px;font-weight:950;letter-spacing:.11em;text-transform:uppercase}
        .sba-hero-trust-copy span{display:block;margin-top:4px;color:#a8bac8;font-size:10px;font-weight:750;letter-spacing:.11em;text-transform:uppercase}
        .sba-answer-strip{padding:22px 0 24px;border-bottom:1px solid rgba(238,166,18,.58);background:linear-gradient(180deg,#0a3556 0%,#082c49 100%)}
        .sba-answer-heading{margin:0 0 14px;color:#fff;font-size:19px;font-weight:950;text-align:center;letter-spacing:.01em}
        .sba-answer-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
        .sba-answer-card{position:relative;display:flex;min-height:118px;flex-direction:column;align-items:center;justify-content:center;padding:18px 22px;border:1px solid rgba(95,211,242,.62);border-radius:10px;background:
          radial-gradient(circle at 50% 38%,rgba(59,195,234,.10),transparent 58%),
          linear-gradient(145deg,#0e466d 0%,#0a3353 58%,#082943 100%);
          box-shadow:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -10px 24px rgba(2,16,28,.16),0 10px 24px rgba(0,0,0,.24);
          text-align:center;transition:transform .17s ease,border-color .17s ease,box-shadow .17s ease,background .17s ease,filter .17s ease}
        .sba-answer-card::after{content:"";position:absolute;inset:1px;border-radius:9px;pointer-events:none;box-shadow:inset 0 0 0 1px rgba(255,255,255,.025)}
        .sba-answer-card:hover{transform:translateY(-3px) scale(1.025);border-color:#7ce0f7;background:
          radial-gradient(circle at 50% 42%,rgba(78,213,244,.24),transparent 62%),
          linear-gradient(145deg,#12527c 0%,#0d3d61 58%,#0a3150 100%);
          box-shadow:inset 0 1px 0 rgba(255,255,255,.12),inset 0 0 30px rgba(49,201,238,.12),0 16px 32px rgba(0,0,0,.32),0 0 22px rgba(65,204,239,.16);filter:brightness(1.05)}
        .sba-answer-card strong{display:block;margin-bottom:8px;color:#ffbd28;font-size:12px;font-weight:950;text-transform:uppercase;letter-spacing:.065em;text-align:center}
        .sba-answer-card span{display:block;max-width:430px;color:#f2f8fb;font-size:14px;font-weight:600;line-height:1.58;text-align:center;text-shadow:0 1px 0 rgba(0,0,0,.26)}
        .sba-key-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-top:20px}
        .sba-key{position:relative;display:flex;min-width:0;min-height:132px;flex-direction:column;align-items:center;justify-content:center;padding:20px 22px;border:1px solid rgba(95,211,242,.68);border-radius:10px;background:
          radial-gradient(circle at 50% 30%,rgba(76,216,247,.14),transparent 54%),
          linear-gradient(145deg,#124f78 0%,#0b3b5e 52%,#082b47 100%);
          box-shadow:inset 0 1px 0 rgba(255,255,255,.11),inset 0 -12px 26px rgba(2,16,28,.20),0 12px 28px rgba(0,0,0,.28);
          text-align:center;transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease,background .18s ease,filter .18s ease}
        .sba-key::after{content:"";position:absolute;inset:1px;border-radius:9px;pointer-events:none;box-shadow:inset 0 0 0 1px rgba(255,255,255,.035)}
        .sba-key:hover{transform:translateY(-4px) scale(1.025);border-color:#8ae6fb;background:
          radial-gradient(circle at 50% 40%,rgba(86,224,252,.30),transparent 62%),
          linear-gradient(145deg,#17618f 0%,#104b72 52%,#0b3655 100%);
          box-shadow:inset 0 1px 0 rgba(255,255,255,.15),inset 0 0 34px rgba(72,216,246,.18),0 18px 36px rgba(0,0,0,.35),0 0 24px rgba(74,210,244,.20);filter:brightness(1.07)}
        .sba-key strong{display:block;color:#ffbd28;font-size:26px;font-weight:950;line-height:1.05;text-align:center;text-shadow:0 1px 0 rgba(0,0,0,.28)}
        .sba-key span{display:block;max-width:305px;margin-top:9px;color:#f7fbfd;font-size:14px;font-weight:650;line-height:1.58;text-align:center;text-shadow:0 1px 0 rgba(0,0,0,.28)}
        .sba-table-wrap{margin-top:16px;overflow-x:auto;border:1px solid #6b531e;border-radius:7px;background:#123d65;box-shadow:0 22px 50px rgba(0,0,0,.22)}
        .sba-table{width:100%;min-width:1060px;border-collapse:collapse}
        .sba-table thead{position:sticky;top:0;z-index:8;box-shadow:0 2px 0 #b67a00,0 8px 18px rgba(3,17,29,.34)}
        .sba-table th{padding:15px 14px;border-bottom:1px solid #b67a00;color:#f1a600;font-size:12px;font-weight:900;letter-spacing:.07em;text-align:center;text-transform:uppercase}
        .sba-table th:nth-child(1){background:#08243d}
        .sba-table th:nth-child(2){background:#0b2f4f}
        .sba-table th:nth-child(3){background:#12446c}
        .sba-table td{padding:14px;border-bottom:1px solid #315b7e;color:#fff;font-size:15px;line-height:1.4;vertical-align:middle;transition:background .18s ease,color .18s ease}
        .sba-table tbody tr{background:#123d65;transition:background .18s ease,box-shadow .18s ease}
        .sba-table tbody tr:nth-child(even){background:#164872}
        .sba-table tbody tr:hover{background:#1a527f;box-shadow:inset 3px 0 #69d6ff}
        .sba-table tbody tr:last-child td{border-bottom:0}
        .sba-table td:first-child{width:20%;min-width:210px;color:#fff;font-weight:900}
        .sba-table td:nth-child(2),.sba-table td:nth-child(3){width:40%;color:#f0f5f8}
        @media(min-width:981px){.sba-table-wrap{overflow:visible}}
        .sba-scope{margin-top:12px;padding:16px 18px;border:1px solid rgba(241,166,0,.72);border-radius:8px;background:linear-gradient(145deg,#0f446b 0%,#0b3556 58%,#082a46 100%);color:#f5f9fb;font-size:14px;font-weight:600;line-height:1.68;box-shadow:inset 0 1px 0 rgba(255,255,255,.07),0 10px 24px rgba(0,0,0,.22)}
        .sba-scope strong{color:#ffbd28;font-weight:950}
        .sba-centered-section .sba-kicker{text-align:center;font-size:14px;letter-spacing:.12em}
        .sba-centered-section .sba-title{text-align:center}
        .sba-centered-section .sba-copy{margin:11px auto 0;text-align:center;max-width:1040px}
        .sba-three{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:20px}
        .sba-six{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:20px}
        .sba-card{position:relative;display:flex;min-height:132px;flex-direction:column;align-items:center;justify-content:center;padding:19px 22px;border:1px solid rgba(95,211,242,.62);border-radius:10px;background:
          radial-gradient(circle at 50% 38%,rgba(59,195,234,.10),transparent 58%),
          linear-gradient(145deg,#0e466d 0%,#0a3353 58%,#082943 100%);
          box-shadow:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -10px 24px rgba(2,16,28,.16),0 10px 24px rgba(0,0,0,.24);
          text-align:center;transition:transform .17s ease,border-color .17s ease,box-shadow .17s ease,background .17s ease,filter .17s ease}
        .sba-card::after{content:"";position:absolute;inset:1px;border-radius:9px;pointer-events:none;box-shadow:inset 0 0 0 1px rgba(255,255,255,.025)}
        .sba-card:hover{transform:translateY(-3px) scale(1.025);border-color:#7ce0f7;background:
          radial-gradient(circle at 50% 42%,rgba(78,213,244,.24),transparent 62%),
          linear-gradient(145deg,#12527c 0%,#0d3d61 58%,#0a3150 100%);
          box-shadow:inset 0 1px 0 rgba(255,255,255,.12),inset 0 0 30px rgba(49,201,238,.12),0 16px 32px rgba(0,0,0,.32),0 0 22px rgba(65,204,239,.16);filter:brightness(1.05)}
        .sba-card .ico{position:static;display:flex;width:31px;height:31px;align-items:center;justify-content:center;margin:0 auto 9px;color:#ffbd28}
        .sba-card .ico svg{width:100%;height:100%}
        .sba-card h3{margin:0 0 8px;color:#ffbd28;font-size:14px;font-weight:950;line-height:1.3;text-align:center}
        .sba-card p{max-width:400px;margin:0;color:#f2f8fb;font-size:14px;font-weight:600;line-height:1.58;text-align:center;text-shadow:0 1px 0 rgba(0,0,0,.26)}
        .sba-note{position:relative;margin-top:14px;padding:16px 20px;border:1px solid rgba(241,166,0,.72);border-radius:8px;background:linear-gradient(145deg,#0f446b 0%,#0b3556 58%,#082a46 100%);color:#f5f9fb;font-size:14px;font-weight:600;line-height:1.68;text-align:center;box-shadow:inset 0 1px 0 rgba(255,255,255,.07),0 10px 24px rgba(0,0,0,.22)}
        .sba-note .ico{position:static;display:inline-flex;width:20px;height:20px;vertical-align:-5px;margin-right:8px;color:#ffbd28}
        .sba-note .ico svg{width:100%;height:100%}
        .sba-note strong{color:#ffbd28;font-weight:950}
        .sba-order-band{margin-top:18px;padding:24px 26px;border:1px solid rgba(255,193,38,.8);border-radius:10px;background:
          radial-gradient(circle at 50% 35%,rgba(59,195,234,.10),transparent 60%),
          linear-gradient(145deg,#0e466d 0%,#0a3556 58%,#082943 100%);
          box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 14px 30px rgba(0,0,0,.24);transition:transform .17s ease,box-shadow .17s ease,filter .17s ease}
        .sba-order-band:hover{transform:translateY(-2px);box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 18px 34px rgba(0,0,0,.3),0 0 18px rgba(241,166,0,.10);filter:brightness(1.03)}
        .sba-order-grid{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(270px,.8fr);gap:30px;align-items:center}
        .sba-order-copy{text-align:center}
        .sba-order-band h3{max-width:860px;margin:8px auto 14px;color:#fff;font:700 36px/1.1 Georgia,"Times New Roman",serif;text-align:center}
        .sba-order-band p{max-width:880px;margin:0 auto;color:#f2f8fb;font-size:17px;line-height:1.7;text-align:center}
        .sba-price{display:block;color:#ffbd28;font-size:16px;font-weight:950;letter-spacing:.09em;text-align:center;text-transform:uppercase}
        .sba-order-visual{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px}
        .sba-order-preview{display:flex;width:min(100%,310px);min-height:220px;align-items:center;justify-content:center;padding:14px;border:1px solid rgba(95,211,242,.55);border-radius:10px;background:
          radial-gradient(circle at 50% 42%,rgba(78,213,244,.14),transparent 62%),
          linear-gradient(145deg,#0b3859,#082943);box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 14px 28px rgba(0,0,0,.26)}
        .sba-order-preview img{display:block;max-width:100%;max-height:220px;width:auto;height:auto;object-fit:contain;filter:drop-shadow(0 12px 20px rgba(0,0,0,.32))}
        .sba-order-visual .sba-btn{min-width:260px}
        .sba-inline-actions{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:20px}
        .sba-link-btn{display:inline-flex;min-height:44px;align-items:center;justify-content:center;padding:0 18px;border:1px solid rgba(241,166,0,.78);border-radius:7px;background:linear-gradient(145deg,#0f446b 0%,#0b3556 58%,#082a46 100%);color:#ffbd28!important;font-size:11px;font-weight:950;letter-spacing:.04em;text-decoration:none;text-transform:uppercase;box-shadow:inset 0 1px 0 rgba(255,255,255,.07),0 10px 22px rgba(0,0,0,.2);transition:transform .17s ease,border-color .17s ease,box-shadow .17s ease,filter .17s ease}
        .sba-link-btn:hover{transform:translateY(-3px) scale(1.02);border-color:#ffc13b;box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 16px 30px rgba(0,0,0,.28),0 0 16px rgba(241,166,0,.14);filter:brightness(1.05)}
        .sba-reference-links{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:20px}
        .sba-reference-links a{display:flex;min-height:112px;align-items:center;justify-content:center;padding:26px 24px;border:1px solid rgba(95,211,242,.62);border-radius:10px;background:
          radial-gradient(circle at 50% 38%,rgba(59,195,234,.10),transparent 58%),
          linear-gradient(145deg,#0e466d 0%,#0a3353 58%,#082943 100%);
          color:#f2f8fb;text-align:center;text-decoration:none;font-size:16px;font-weight:900;line-height:1.55;box-shadow:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -10px 24px rgba(2,16,28,.16),0 10px 24px rgba(0,0,0,.24);transition:transform .17s ease,border-color .17s ease,box-shadow .17s ease,background .17s ease,filter .17s ease}
        .sba-reference-links a:hover{transform:translateY(-3px) scale(1.02);border-color:#7ce0f7;background:
          radial-gradient(circle at 50% 42%,rgba(78,213,244,.24),transparent 62%),
          linear-gradient(145deg,#12527c 0%,#0d3d61 58%,#0a3150 100%);
          box-shadow:inset 0 1px 0 rgba(255,255,255,.12),inset 0 0 30px rgba(49,201,238,.12),0 16px 32px rgba(0,0,0,.32),0 0 22px rgba(65,204,239,.16);filter:brightness(1.05)}
        .sba-faq{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:20px}
        .sba-faq details{position:relative;overflow:hidden;border:1px solid rgba(95,211,242,.62);border-radius:10px;background:
          radial-gradient(circle at 50% 38%,rgba(59,195,234,.10),transparent 58%),
          linear-gradient(145deg,#0e466d 0%,#0a3353 58%,#082943 100%);
          box-shadow:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -10px 24px rgba(2,16,28,.16),0 10px 24px rgba(0,0,0,.24);
          transition:transform .17s ease,border-color .17s ease,box-shadow .17s ease,background .17s ease,filter .17s ease}
        .sba-faq details::after{content:"";position:absolute;inset:1px;border-radius:9px;pointer-events:none;box-shadow:inset 0 0 0 1px rgba(255,255,255,.025)}
        .sba-faq details:hover,.sba-faq details:focus-within{transform:translateY(-3px) scale(1.012);border-color:#7ce0f7;background:
          radial-gradient(circle at 50% 42%,rgba(78,213,244,.24),transparent 62%),
          linear-gradient(145deg,#12527c 0%,#0d3d61 58%,#0a3150 100%);
          box-shadow:inset 0 1px 0 rgba(255,255,255,.12),inset 0 0 30px rgba(49,201,238,.12),0 16px 32px rgba(0,0,0,.32),0 0 22px rgba(65,204,239,.16);filter:brightness(1.05)}
        .sba-faq summary{position:relative;z-index:1;padding:17px 46px 17px 20px;color:#ffbd28;font-size:14px;font-weight:950;line-height:1.4;text-align:center;cursor:pointer;list-style:none}
        .sba-faq summary::-webkit-details-marker{display:none}
        .sba-faq summary::after{content:"⌄";position:absolute;right:18px;top:50%;transform:translateY(-50%);color:#ffbd28;font-size:16px}
        .sba-faq details[open] summary::after{content:"⌃"}
        .sba-faq details p{position:relative;z-index:1;max-width:680px;margin:0 auto;padding:0 22px 20px;color:#f2f8fb;font-size:14px;font-weight:600;line-height:1.65;text-align:center;text-shadow:0 1px 0 rgba(0,0,0,.24)}
        .sba-map-accent{position:absolute;left:50%;bottom:-36px;width:128px;height:116px;opacity:.10;transform:translateX(-50%);pointer-events:none}
        .sba-section.is-relative{position:relative;overflow:hidden}
        @media(max-width:980px){
          .sba-hero-grid,.sba-order-grid{grid-template-columns:1fr}
          .sba-hero-title-line{white-space:normal}
          .sba-hero-logo-wrap{min-height:auto;align-items:flex-start;justify-content:flex-start;text-align:left;padding:4px 0 14px;transform:none}
          .sba-hero-logo{width:190px}
          .sba-hero-agency{font-size:18px}
          .sba-hero-trust{grid-template-columns:1fr}
          .sba-hero-trust-item{border-right:0;border-bottom:1px solid rgba(255,255,255,.12)}
          .sba-hero-trust-item:last-child{border-bottom:0}
          .sba-key-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
          .sba-three,.sba-six,.sba-faq,.sba-answer-grid,.sba-reference-links{grid-template-columns:1fr}
          .sba-card{min-height:auto}
        }
        @media(max-width:650px){
          .sba-shell{width:min(100% - 28px,1280px)}
          .sba-hero{padding:22px 0 0;background-position:62% center}
          .sba-hero h1{font-size:38px}
          .sba-hero p{font-size:14px}
          .sba-section{padding:28px 0}
          .sba-key-grid{grid-template-columns:1fr}
        }
`}</style>

      <div className="abt-header-wrap">
        <FormsSiteHeader primaryActionHref="/florida-liquor-license-appraisal#order-form" primaryActionLabel="Order Appraisal" />
      </div>


      <section className="sba-hero" aria-label="SBA 7(a) Florida liquor license appraisal">
        <div className="sba-shell">
          <div className="sba-breadcrumbs"><Link href="/">Home</Link><span>›</span><Link href="/florida-liquor-license-appraisal">Appraisal</Link><span>›</span><strong>SBA Appraisal</strong></div>
          <div className="sba-hero-grid">
            <div className="sba-hero-copy">
              <span className="sba-kicker">SBA 7(a) SOP 50 10 8.1 · Effective October 1, 2026</span>
              <h1>
                <span className="sba-hero-title-line">Florida 4COP &amp; 3PS License</span>
                <span className="sba-hero-title-line">Appraisal for SBA 7(a)</span>
                <span className="sba-hero-title-line">Financing</span>
              </h1>
              <p>FLLM prepares a formal, license-specific appraisal report for the Florida quota-license component of a business purchase or eligible refinance. The report is designed for lender review and remains separate from any business valuation, real-estate appraisal, equipment appraisal or other analysis the lender requires.</p>
              <div className="sba-actions">
                <Link className="sba-btn" href="/florida-liquor-license-appraisal#order-form">Request an Appraisal</Link>
                <a className="sba-btn secondary" href="#sop-changes">Learn More</a>
              </div>
            </div>

            <aside className="sba-hero-logo-wrap" aria-label="U.S. Small Business Administration">
              <img className="sba-hero-logo" src="/assets/sba-mark-red-accent.svg" alt="SBA" />
              <div className="sba-hero-agency"><span>U.S. Small Business</span><span>Administration</span></div>
            </aside>
          </div>

          <div className="sba-hero-trust" aria-label="SBA appraisal strengths">
            <div className="sba-hero-trust-item">
              <span className="sba-hero-trust-icon"><Icon name="shield" /></span>
              <span className="sba-hero-trust-copy"><strong>SBA-Compliant</strong><span>Meets SOP 50 10 8.1</span></span>
            </div>
            <div className="sba-hero-trust-item">
              <span className="sba-hero-trust-icon"><FloridaGhost className="sba-trust-florida" /></span>
              <span className="sba-hero-trust-copy"><strong>Florida Expertise</strong><span>4COP &amp; 3PS Licenses</span></span>
            </div>
            <div className="sba-hero-trust-item">
              <span className="sba-hero-trust-icon"><Icon name="handshake" /></span>
              <span className="sba-hero-trust-copy"><strong>Lender-Ready</strong><span>Credible. Defensible. On Time.</span></span>
            </div>
          </div>
        </div>
      </section>

      <section className="sba-answer-strip" aria-label="What this page answers">
        <div className="sba-shell">
          <h2 className="sba-answer-heading">What this page answers</h2>
          <div className="sba-answer-grid">
            <div className="sba-answer-card"><strong>What changed in SBA SOP 50 10 8.1</strong><span>The acquisition and valuation rules most relevant to an SBA-financed Florida business purchase.</span></div>
            <div className="sba-answer-card"><strong>What FLLM appraises</strong><span>The transferable 4COP or 3PS quota-license component as a separate market asset.</span></div>
            <div className="sba-answer-card"><strong>What the lender decides</strong><span>Required scope, appraiser qualifications, reliance language and whether the report is acceptable for the loan file.</span></div>
          </div>
        </div>
      </section>

      <section className="sba-section" id="sop-changes">
        <div className="sba-shell">
          <span className="sba-kicker">Effective October 1, 2026</span>
          <h2 className="sba-title">What changed under SBA SOP 50 10 8.1</h2>
          <p className="sba-copy">SOP 50 10 8.1 reorganizes change-of-ownership requirements and changes several underwriting and valuation thresholds. These are the provisions most likely to matter when a Florida business acquisition includes a valuable 4COP or 3PS quota license.</p>

          <div className="sba-key-grid">
            <div className="sba-key"><strong>1.25×</strong><span>General DSCR standard for Initial Acquisitions, Owner Buyouts and ESOP or Cooperative transactions described in Appendix 15.</span></div>
            <div className="sba-key"><strong>10%</strong><span>Minimum equity injection for an Initial Acquisition; the lender may not reduce or eliminate that requirement.</span></div>
            <div className="sba-key"><strong>$350K</strong><span>Business Purchase Price threshold at or below which the lender may perform its own valuation when the parties are not closely related.</span></div>
            <div className="sba-key"><strong>$3M+</strong><span>Qualifying Initial Acquisitions and Business Expansions require a lender-ordered independent Quality of Earnings report.</span></div>
          </div>

          <div className="sba-table-wrap">
            <table className="sba-table">
              <thead><tr><th>Area</th><th>Prior SOP 50 10 8 approach</th><th>SOP 50 10 8.1</th></tr></thead>
              <tbody>
                <tr><td>Transaction categories</td><td>Change-of-ownership rules appeared throughout the loan-program chapters.</td><td>Appendix 15 organizes transactions as Initial Acquisition, Business Expansion, Owner Buyout, or ESOP and Cooperative.</td></tr>
                <tr><td>Debt-service coverage</td><td>Generally 1.15× for Standard 7(a) underwriting, with qualifying reliance on historical or projected cash flow.</td><td>Generally 1.25× for Initial Acquisitions, Owner Buyouts, and ESOP or Cooperative transactions; 1.15× for qualifying Business Expansions, based on historical or properly adjusted results.</td></tr>
                <tr><td>Buyer equity</td><td>A 10% equity injection generally applied to complete changes of ownership, subject to the former transaction rules.</td><td>An Initial Acquisition requires at least 10% of total project cost, and the lender may not reduce or eliminate that requirement.</td></tr>
                <tr><td>Business valuation</td><td>The lender could perform its own valuation when the financed amount, after specified real-estate or equipment deductions, was $250,000 or less.</td><td>The lender may perform its own valuation when the Business Purchase Price is $350,000 or less and the parties are not closely related. Above that amount, an independent Qualified Source is required.</td></tr>
                <tr><td>Valuation shortfall</td><td>The former rules did not apply the new Appendix 15 acquisition-debt ceiling.</td><td>Total acquisition debt is limited by the supported business value. A purchase-price amount above that value generally must be covered by additional equity.</td></tr>
                <tr><td>Quality of Earnings</td><td>No specific SBA Quality of Earnings requirement applied.</td><td>A lender-ordered independent Quality of Earnings report is required for qualifying Initial Acquisitions and Business Expansions with a Business Purchase Price of $3 million or more.</td></tr>
                <tr><td>Mixed-use maturity</td><td>A transaction meeting the former real-estate percentage test could receive a 25-year maturity for the combined loan.</td><td>The real-estate and business-acquisition portions use separate permitted maturities or a weighted blended maturity.</td></tr>
              </tbody>
            </table>
          </div>
          <div className="sba-scope"><strong>Why the license matters:</strong> the SOP changes do not turn a quota license into the business valuation. They make it more important to document what each material asset in the transaction is worth. FLLM can isolate the 4COP or 3PS quota-license component for lender consideration, subject to the lender approving the assignment and report scope.</div>
        </div>
      </section>

      <section className="sba-section sba-centered-section">
        <div className="sba-shell">
          <span className="sba-kicker">The SBA Transaction Distinction</span>
          <h2 className="sba-title">Liquor-license appraisal versus business valuation</h2>
          <p className="sba-copy">These are different assignments. FLLM's report is intended to support the license component of the transaction, not to replace the operating-business valuation.</p>
          <div className="sba-three">
            <article className="sba-card"><span className="ico"><Icon name="glass" /></span><h3>1. FLLM license appraisal</h3><p>Values the Florida 4COP or 3PS quota license as a separate transferable asset using license-specific and county-specific market evidence.</p></article>
            <article className="sba-card"><span className="ico"><Icon name="business" /></span><h3>2. Business valuation</h3><p>Addresses the operating enterprise, including cash flow, goodwill, furniture, fixtures, equipment and other business assets or liabilities.</p></article>
            <article className="sba-card"><span className="ico"><Icon name="lender" /></span><h3>3. Lender determination</h3><p>The SBA lender determines which valuations and appraisals are required, who may prepare them and whether each report satisfies the loan file.</p></article>
          </div>
          <div className="sba-note"><span className="ico"><Icon name="info" /></span><strong>Important:</strong> FLLM does not claim SBA endorsement or automatic lender acceptance. Before ordering, the borrower or lender should confirm any required credentials, reliance language, effective date, intended use and supplemental scope.</div>
        </div>
      </section>

      <section className="sba-section sba-centered-section">
        <div className="sba-shell">
          <span className="sba-kicker">What the Report Contains</span>
          <h2 className="sba-title">What an FLLM 4COP or 3PS license appraisal documents</h2>
          <p className="sba-copy">The report is built around the subject license and the market in the county where that license is issued. It is intended to give the lender a documented, reviewable basis for the concluded license value.</p>
          <div className="sba-six">
            {reviewItems.map(([title,text,icon],index)=><article className="sba-card" key={title}><span className="ico"><Icon name={icon} /></span><h3>{index+1}. {title}</h3><p>{text}</p></article>)}
          </div>

          <div className="sba-order-band">
            <div className="sba-order-grid">
              <div className="sba-order-copy">
                <span className="sba-price">Formal license-specific appraisal · $495</span>
                <h3>Order the quota-license appraisal after confirming the lender&apos;s scope.</h3>
                <p>FLLM can prepare the license component for a Florida 4COP or 3PS quota license in a qualifying purchase or refinance. If the lender has specific reliance language, credential requirements or a custom scope, provide those requirements before the engagement begins.</p>
              </div>
              <div className="sba-order-visual">
                <div className="sba-order-preview">
                  <img src="/assets/fllm-formal-appraisal-preview-v1.webp" alt="FLLM formal liquor license appraisal report books" />
                </div>
                <Link className="sba-btn" href="/florida-liquor-license-appraisal#order-form">Order License Appraisal — $495</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sba-section is-relative sba-centered-section">
        <div className="sba-shell">
          <span className="sba-kicker">Why County Evidence Matters</span>
          <h2 className="sba-title">Florida quota-license value is county-specific</h2>
          <p className="sba-copy">A useful Florida liquor license appraisal should not rely on a generic statewide number. Quota-license supply, asking prices, transaction evidence and marketability vary by county. FLLM identifies the subject county and license series, reviews same-county evidence and separately explains any cross-series 3PS/4COP evidence used in the reconciliation.</p>
          <div className="sba-inline-actions">
            <Link className="sba-link-btn" href="/florida-liquor-license-appraisal">Review FLLM Appraisal Methodology</Link>
            <Link className="sba-link-btn" href="/florida-liquor-license-market-index">Florida Market Index</Link>
            <Link className="sba-link-btn" href="/counties">County Market Data</Link>
          </div>
          <FloridaGhost className="sba-map-accent" />
        </div>
      </section>

      <section className="sba-section sba-centered-section">
        <div className="sba-shell">
          <span className="sba-kicker">Current SBA References</span>
          <h2 className="sba-title">SOP 50 10 8.1 and lender review</h2>
          <p className="sba-copy">SBA SOP 50 10 8.1 became effective October 1, 2026, and governs lender and development-company origination procedures for 7(a) and 504 loans. For a 7(a) business purchase or refinance, the lender determines the required business valuation, collateral analysis and supporting reports. FLLM's assignment is limited to the Florida quota-license component unless a broader written scope is separately agreed.</p>
          <div className="sba-reference-links">
            <a href="https://www.sba.gov/loans/7a-loans" target="_blank" rel="noopener noreferrer">Official SBA 7(a) Program ↗</a>
            <a href="https://legacy.sba.gov/document/sop-50-10-lender-development-company-loan-programs" target="_blank" rel="noopener noreferrer">Official SBA SOP 50 10, including Version 8.1 ↗</a>
            <a href="https://www.sba.gov/sba-lenders" target="_blank" rel="noopener noreferrer">SBA Lender Guidance ↗</a>
          </div>
        </div>
      </section>

      <section className="sba-section sba-centered-section">
        <div className="sba-shell">
          <span className="sba-kicker">Florida Liquor License SBA Appraisal FAQs</span>
          <h2 className="sba-title">Questions from borrowers, brokers and lenders</h2>
          <div className="sba-faq">
            {faqs.map(faq=><details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
          </div>
        </div>
      </section>
    </main>
  );
}
