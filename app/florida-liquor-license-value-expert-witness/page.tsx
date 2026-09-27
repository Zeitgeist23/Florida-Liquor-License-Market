import type { Metadata } from "next";
import Link from "next/link";

import {
  FllmButton,
  FllmCard,
  FllmCardGrid,
  FllmDisclosure,
  FllmFaqGrid,
  FllmPageShell,
  FllmSectionHeading,
} from "@/components/FllmDesignSystem";

import "../fllm-official-template.css";
import "../fllm-design-system.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-liquor-license-value-expert-witness`;

export const metadata: Metadata = {
  title: "Florida Liquor License Expert Witness & Litigation Valuation | FLLM",
  description:
    "Florida liquor license expert-witness and litigation valuation support for 4COP and 3PS quota licenses, including sale disputes, St. Johns County market evidence, DBPR research and transaction analysis.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  keywords: [
    "Florida liquor license expert witness",
    "Florida liquor license value expert witness",
    "4COP quota license expert witness",
    "3PS liquor license expert witness",
    "Florida liquor license litigation valuation",
    "St. Johns County liquor license expert witness",
    "4COP quota liquor license sale dispute",
  ],
  openGraph: {
    type: "article",
    url: canonicalUrl,
    title: "Florida Liquor License Expert Witness & Litigation Valuation | FLLM",
    description:
      "Florida 4COP and 3PS litigation valuation support for attorneys and professionals, including sale-price disputes, county market evidence and expert-witness support distinctions.",
    siteName: "Florida Liquor License Market",
  },
};

const useCases = [
  {
    title: "Business and partnership disputes",
    text: "Support for disputes involving ownership, buyouts, damages, dissolution or allocation of value where a Florida quota liquor license is a material asset.",
  },
  {
    title: "Commercial damages and transaction disputes",
    text: "License-specific research can help establish market context for a claimed loss, failed transfer, impaired collateral or disputed transaction value.",
  },
  {
    title: "Bankruptcy, receivership and distressed matters",
    text: "Marketability, transferability, current asking-price evidence and available transaction history may be relevant to liquidation or going-concern analysis.",
  },
  {
    title: "Divorce, estate and fiduciary matters",
    text: "County-specific evidence can help counsel and retained valuation professionals evaluate a 3PS or 4COP quota-license interest separately from an operating business.",
  },
  {
    title: "Historical-value questions",
    text: "A defined effective date can separate then-current market evidence from later asking prices, transfers and market developments.",
  },
  {
    title: "Attorney and retained-expert support",
    text: "FLLM can organize Florida liquor-license market evidence for review by counsel, a retained appraiser or another expert providing the ultimate opinion or testimony.",
  },
  {
    title: "Sales and transfers of businesses with quota licenses",
    text: "Support for disputes involving the sale or transfer of an operating business where a 4COP or 3PS quota license is included, separately valued, assigned, or transferred as part of the transaction.",
  },
  {
    title: "Specific performance claims",
    text: "Market and transaction evidence may be relevant when a party seeks specific performance of an agreement involving a Florida quota liquor license, including questions about value, transferability, timing, and the license component of the bargain.",
  },
  {
    title: "Lis pendens filings involving quota licenses",
    text: "FLLM can organize license, transaction, timing, and market evidence in disputes where a lis pendens is asserted against a transaction involving a quota liquor license or related business assets. Legal effect remains a matter for counsel and the court.",
  },
  {
    title: "Sales and purchases of quota licenses",
    text: "Support for purchase and sale disputes involving standalone 4COP or 3PS quota licenses, including asking-price evidence, transaction history, county market conditions, transfer timing, and disputed value.",
  },
];

const evidenceItems = [
  {
    title: "Subject-license identity",
    text: "License number, county, series, holder of record, status and available DBPR transfer history.",
  },
  {
    title: "Same-county market evidence",
    text: "Current 3PS and 4COP offerings, with exact-series evidence kept separate from cross-series evidence.",
  },
  {
    title: "Available transaction evidence",
    text: "Recent sales, transfers, recorded transaction information and other market evidence appropriate to the assignment when available.",
  },
  {
    title: "Historical market context",
    text: "Past-effective-date work distinguishes contemporaneous evidence from current asking prices and later market developments.",
  },
  {
    title: "Liens and marketability",
    text: "Available lien or security-interest information, transfer restrictions and other facts that may affect marketability or scope.",
  },
  {
    title: "Value reconciliation",
    text: "A documented explanation of how available evidence supports the indicated market-value range or conclusion.",
  },
];

const faqs = [
  {
    question: "What is a Florida liquor license value expert witness?",
    answer:
      "A Florida liquor license value expert witness is a person qualified by the court to offer opinion testimony concerning the value, marketability or transfer economics of a Florida alcoholic-beverage license. Qualification depends on the witness's knowledge, skill, experience, training, education and the court's evidentiary rulings.",
  },
  {
    question: "Does FLLM automatically act as a court-qualified expert witness?",
    answer:
      "No. FLLM provides Florida liquor-license market research, license-specific valuation analysis and litigation support. FLLM does not represent that every report, analyst or engagement is USPAP-compliant, credentialed, court-qualified or admissible as expert testimony.",
  },
  {
    question: "Can FLLM support a retained appraiser or testifying expert?",
    answer:
      "Yes. FLLM can organize subject-license information, DBPR research, county-specific 3PS and 4COP market evidence, available transaction history and related Florida quota-license market data for review by counsel or a separately retained credentialed appraiser or expert witness.",
  },
  {
    question: "Can FLLM value a 4COP or 3PS license for litigation?",
    answer:
      "FLLM can prepare a license-specific market valuation for a Florida 4COP or 3PS quota license using a defined effective date and county-specific evidence. Whether that work product satisfies a court, opposing party, insurer, lender or retained expert depends on the engagement and receiving party's requirements.",
  },
  {
    question: "Can FLLM assist with an expert-witness matter involving the sale of a 4COP quota liquor license in St. Johns County?",
    answer:
      "Yes. FLLM can assemble St. Johns County 4COP market evidence, DBPR research, available current and historical asking-price comparables, transaction evidence and a license-specific valuation record for counsel or a retained expert. Witness qualification and admissibility remain engagement- and court-specific.",
  },
  {
    question: "What is the difference between a market valuation and expert testimony?",
    answer:
      "A market valuation analyzes evidence and reaches a value conclusion for a defined subject and date. Expert testimony is evidence offered in a legal proceeding by a witness who must satisfy the applicable qualification and admissibility standards. One may support the other, but they are not the same thing.",
  },
];

export default function FloridaLiquorLicenseValueExpertWitnessPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Florida Liquor License Expert Witness and Litigation Valuation Support",
      description:
        "Florida quota liquor-license valuation and litigation-support information for 4COP and 3PS licenses, including St. Johns County market evidence, DBPR research and expert-witness qualification distinctions.",
      datePublished: "2026-08-30",
      dateModified: "2026-09-27",
      mainEntityOfPage: canonicalUrl,
      author: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
      publisher: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Florida Liquor License Litigation Valuation Support",
      serviceType: "Florida liquor-license market valuation and litigation support",
      areaServed: { "@type": "State", name: "Florida" },
      provider: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
      url: canonicalUrl,
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
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Florida Liquor License Appraisal",
          item: `${siteUrl}/florida-liquor-license-appraisal`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Expert Witness & Litigation Valuation Support",
          item: canonicalUrl,
        },
      ],
    },
  ];

  return (
    <FllmPageShell className="litigation-value-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />
      <style>{`
        .litigation-value-page .litigation-value-hero{
          position:relative;
          overflow:hidden;
          min-height:690px;
          padding:54px 0 58px;
          background:
            linear-gradient(90deg,rgba(3,18,31,.99) 0%,rgba(5,28,47,.985) 47%,rgba(5,28,47,.88) 63%,rgba(5,28,47,.34) 100%),
            url("/assets/fllm-expert-witness-litigation-hero.webp") right center/auto 100% no-repeat,
            linear-gradient(135deg,var(--fllm-ink) 0%,var(--fllm-deep-navy) 56%,#173649 100%);
        }
        .litigation-value-page .litigation-value-hero::after{
          content:"";
          position:absolute;
          inset:0;
          z-index:0;
          pointer-events:none;
          background:
            linear-gradient(90deg,transparent 0%,transparent 50%,rgba(5,28,47,.14) 61%,rgba(5,28,47,.03) 100%),
            linear-gradient(180deg,rgba(2,12,21,.05),rgba(2,12,21,.18));
        }
        .litigation-value-page .litigation-value-hero .fllm-template-shell{
          position:relative;
          z-index:1;
        }
        .litigation-value-hero-copy{
          width:min(58%,900px);
          min-width:0;
        }
        .litigation-value-page .litigation-value-hero .fllm-template-hero-title{
          max-width:850px;
          font-size:clamp(44px,5.15vw,72px);
          line-height:.99;
        }
        .litigation-value-page .litigation-value-hero .fllm-template-hero-copy{
          max-width:830px;
          font-size:16px;
          line-height:1.72;
        }
        @media(max-width:1120px){
          .litigation-value-page .litigation-value-hero{
            min-height:640px;
            background:
              linear-gradient(90deg,rgba(3,18,31,.99) 0%,rgba(5,28,47,.97) 52%,rgba(5,28,47,.74) 72%,rgba(5,28,47,.3) 100%),
              url("/assets/fllm-expert-witness-litigation-hero.webp") 92% center/auto 100% no-repeat,
              linear-gradient(135deg,var(--fllm-ink) 0%,var(--fllm-deep-navy) 56%,#173649 100%);
          }
          .litigation-value-hero-copy{width:min(64%,760px)}
          .litigation-value-page .litigation-value-hero .fllm-template-hero-title{font-size:clamp(42px,5vw,62px)}
        }
        @media(max-width:820px){
          .litigation-value-page .litigation-value-hero{
            min-height:0;
            padding:40px 0 350px;
            background:
              linear-gradient(180deg,rgba(3,18,31,.99) 0%,rgba(5,28,47,.98) 54%,rgba(5,28,47,.62) 70%,rgba(5,28,47,.22) 100%),
              url("/assets/fllm-expert-witness-litigation-hero.webp") center bottom/auto 360px no-repeat,
              linear-gradient(135deg,var(--fllm-ink),var(--fllm-deep-navy));
          }
          .litigation-value-hero-copy{width:100%}
          .litigation-value-page .litigation-value-hero .fllm-template-hero-title{max-width:100%;font-size:clamp(40px,8vw,58px)}
          .litigation-value-page .litigation-value-hero .fllm-template-hero-copy{max-width:100%}
        }
      `}</style>

      <section className="fllm-template-hero litigation-value-hero">
        <div className="fllm-template-shell">
          <div className="litigation-value-hero-copy">
            <div className="fllm-ui-breadcrumbs">
              <Link href="/">Home</Link><span>›</span>
              <Link href="/florida-liquor-license-appraisal">Appraisal</Link><span>›</span>
              <strong>Expert Witness & Litigation Support</strong>
            </div>
            <span className="fllm-template-eyebrow">Florida 4COP & 3PS Litigation Valuation</span>
            <h1 className="fllm-template-hero-title">Florida Liquor License Expert Witness & Litigation Valuation Support</h1>
            <p className="fllm-template-hero-copy">
              FLLM provides license-specific Florida quota-license market research and valuation support for attorneys,
              litigants, appraisers and other professionals evaluating the value, marketability, sale price or transfer
              economics of a 4COP or 3PS license in litigation or a transaction dispute.
            </p>
            <div className="fllm-ui-actions">
              <FllmButton href="/contact">Discuss Litigation Support</FllmButton>
              <FllmButton href="/florida-liquor-license-appraisal" variant="outline">Review Appraisal Methodology</FllmButton>
            </div>
          </div>
        </div>
      </section>

      <section className="fllm-template-section">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Critical Distinction"
            title="Market valuation is not automatically expert testimony"
            copy={
              <p>
                Courts determine whether a witness is qualified and whether an opinion is admissible. FLLM can provide
                market research, license-specific valuation analysis and litigation support without representing that
                every report or analyst is automatically court-qualified.
              </p>
            }
          />
          <FllmCardGrid columns={2}>
            <FllmCard eyebrow="FLLM Market Analysis" title="License-specific valuation and litigation support" variant="gold">
              <p>
                FLLM can research the subject license, county market, 3PS and 4COP comparables, DBPR history, available
                transactions, liens, transfer conditions and other evidence relevant to a supported market-value conclusion.
              </p>
            </FllmCard>
            <FllmCard eyebrow="Testifying Expert" title="Qualification remains engagement-specific" variant="gold">
              <p>
                A court, attorney, insurer, tax authority or opposing party may require a separately qualified expert,
                credentialed appraiser, deposition testimony, trial testimony or another specific scope.
              </p>
            </FllmCard>
          </FllmCardGrid>
          <FllmDisclosure>
            <strong>Scope:</strong> FLLM can build and explain the Florida liquor-license market record. The ultimate
            expert qualification, admissibility determination and testimony remain matter-specific.
          </FllmDisclosure>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--deep">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="St. Johns County 4COP Matters"
            title="Support for a St. Johns County 4COP quota-license sale dispute"
          />
          <FllmCardGrid columns={3}>
            <FllmCard title="Sale-price and transaction disputes" variant="gold">
              <p>
                FLLM can organize county-specific evidence when the issue involves sale price, allocated license value,
                failed transfer, transaction timing or claimed loss associated with a St. Johns County 4COP quota license.
              </p>
            </FllmCard>
            <FllmCard title="St. Johns County market evidence" variant="gold">
              <p>
                The analysis can separate current active asking prices, dated historical advertisements, available
                verified transactions and subject-license DBPR records so different effective dates are not blended.
              </p>
            </FllmCard>
            <FllmCard title="Attorney or retained-expert support" variant="gold">
              <p>
                FLLM can prepare the liquor-license market record for counsel, a retained appraiser or another testifying
                expert. The engagement determines who provides the ultimate opinion.
              </p>
            </FllmCard>
          </FllmCardGrid>
          <div className="fllm-ui-actions">
            <FllmButton href="/counties/st-johns/liquor-license-value">St. Johns County License Value</FllmButton>
            <FllmButton href="/counties/st-johns" variant="outline">St. Johns County Market</FllmButton>
          </div>
        </div>
      </section>

      <section className="fllm-template-section">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Common Legal Contexts"
            title="When Florida liquor-license value becomes a disputed issue"
          />
          <FllmCardGrid columns={3}>
            {useCases.map((item) => (
              <FllmCard key={item.title} title={item.title} variant="county">
                <p>{item.text}</p>
              </FllmCard>
            ))}
          </FllmCardGrid>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--deep">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Evidence Framework"
            title="What a defensible Florida liquor-license valuation record may include"
          />
          <FllmCardGrid columns={3}>
            {evidenceItems.map((item) => (
              <FllmCard key={item.title} title={item.title} variant="gold">
                <p>{item.text}</p>
              </FllmCard>
            ))}
          </FllmCardGrid>
          <div className="fllm-ui-actions">
            <FllmButton href="/florida-liquor-license-value">License Value</FllmButton>
            <FllmButton href="/florida-liquor-license-appraisal" variant="outline">Formal Appraisal</FllmButton>
            <FllmButton href="/resources/florida-liquor-license-laws" variant="outline">Florida License Laws</FllmButton>
          </div>
        </div>
      </section>

      <section className="fllm-template-section">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Attorney & Expert Workflow"
            title="Build the market record before deciding who must testify"
          />
          <FllmCardGrid columns={3}>
            <FllmCard eyebrow="01" title="Define the issue" variant="gold">
              <p>Identify the subject license, county, series, effective date, legal issue and specific value question.</p>
            </FllmCard>
            <FllmCard eyebrow="02" title="Assemble the evidence" variant="gold">
              <p>Collect DBPR records, transfer history, county comparables, available transactions, liens and related market evidence.</p>
            </FllmCard>
            <FllmCard eyebrow="03" title="Confirm witness requirements" variant="gold">
              <p>Determine whether the matter needs market research, an FLLM valuation report, a credentialed appraiser, deposition testimony or trial testimony.</p>
            </FllmCard>
          </FllmCardGrid>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--deep">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Common Questions"
            title="Florida liquor-license expert-witness FAQs"
          />
          <FllmFaqGrid
            items={faqs.map((faq) => ({ question: faq.question, answer: <p>{faq.answer}</p> }))}
            columns={2}
          />
        </div>
      </section>

      <section className="fllm-ui-final-cta">
        <div className="fllm-template-shell">
          <div>
            <span className="fllm-template-eyebrow">Litigation & Valuation Support</span>
            <h2>Discuss a Florida 4COP or 3PS valuation matter with FLLM</h2>
            <p>Start with the subject license, county, effective date and the valuation question the matter requires.</p>
          </div>
          <div className="fllm-ui-final-actions">
            <FllmButton href="/contact">Contact FLLM</FllmButton>
            <FllmButton href="/florida-liquor-license-appraisal" variant="outline">Appraisal Options</FllmButton>
          </div>
        </div>
      </section>
    </FllmPageShell>
  );
}
