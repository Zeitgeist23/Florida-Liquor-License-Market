import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "@/app/resources/forms/abt-forms.css";
import "@/app/florida-liquor-license-news/news-insights.css";
import "@/app/florida-liquor-license-news/news-mobile-readability.css";
import "@/app/florida-liquor-license-news/[slug]/article.css";
import "@/app/resources/florida-liquor-license-property-or-privilege/property-privilege.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/resources/florida-liquor-license-age-property-rights`;

export const metadata: Metadata = {
  title: "How Old to Buy a Florida Quota Liquor License? Property Rights & Age | FLLM",
  description:
    "FLLM explains Florida's age-21 liquor-license rule, whether an 18-20 year old can acquire property rights in a quota license, and the Florida cases separating private title from DABT transfer status.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  keywords: [
    "how old to buy a Florida liquor license",
    "minimum age Florida quota liquor license",
    "Florida liquor license property rights age",
    "can an 18 year old own a Florida liquor license",
    "Florida liquor license property rights",
    "Florida quota liquor license ownership",
    "Florida liquor license transfer age",
    "Florida Statute 561.15",
    "Florida Statute 561.17",
    "Florida Statute 561.32",
  ],
  openGraph: {
    type: "article",
    url: canonicalUrl,
    title: "How Old to Buy a Florida Quota Liquor License?",
    description:
      "A case-law and statutory guide to the difference between qualifying to hold a Florida liquor license and acquiring private contractual or property rights associated with a quota license.",
    siteName: "Florida Liquor License Market",
  },
};

type CaseItem = {
  name: string;
  citation: string;
  court: string;
  year: string;
  rule: string;
  why: string;
  href: string;
};

const cases: CaseItem[] = [
  {
    name: "House v. Cotton",
    citation: "52 So. 2d 340 (Fla. 1951)",
    court: "Florida Supreme Court",
    year: "1951",
    rule:
      "Florida's Supreme Court recognized that, although a liquor license is a privilege in the regulatory relationship with government, quota limits and transferability give it the quality of property and substantial pecuniary value. A covenant requiring reassignment of the license could be specifically enforced.",
    why:
      "This is the foundational Florida authority for the proposition that valuable private rights can exist around a liquor license even though the state controls whether the license may be issued and used.",
    href: "https://law.justia.com/cases/florida/supreme-court/1951/52-so-2d-340-0.html",
  },
  {
    name: "Kline v. State Beverage Department",
    citation: "77 So. 2d 872 (Fla. 1955)",
    court: "Florida Supreme Court",
    year: "1955",
    rule:
      "The Court again described a liquor license as having the quality of property and held that an issued license ordinarily carries procedural protections before revocation. At the same time, the opinion emphasized that an unapproved private transfer does not automatically establish rights against the state.",
    why:
      "Kline shows the two-track nature of Florida liquor-license law: private economic rights may exist, but regulatory recognition and approved transfer status remain separate questions.",
    href: "https://law.justia.com/cases/florida/supreme-court/1955/77-so-2d-872-0.html",
  },
  {
    name: "Rosamond v. Mann",
    citation: "80 So. 2d 317 (Fla. 1955)",
    court: "Florida Supreme Court",
    year: "1955",
    rule:
      "The Court relied on House v. Cotton and allowed a lessor to pursue enforcement of contractual restrictions concerning transfer and removal of a liquor license after a hold-over tenancy.",
    why:
      "The case reinforces that contractual rights connected to a liquor license can be legally meaningful even though the Division controls regulatory transfer and use.",
    href: "https://law.justia.com/cases/florida/supreme-court/1955/80-so-2d-317-0.html",
  },
  {
    name: "Harnish v. Carbonell",
    citation: "328 So. 2d 489 (Fla. 3d DCA 1976)",
    court: "Florida Third District Court of Appeal",
    year: "1976",
    rule:
      "The Third District affirmed specific performance and damages arising from a trust agreement requiring reassignment and retransfer of an alcoholic-beverage license.",
    why:
      "Harnish is useful when evaluating whether a private agreement concerning later reassignment of a license can be enforceable rather than automatically void as contrary to public policy.",
    href: "https://law.justia.com/cases/florida/district-courts-of-appeal/1976/328-so-2d-489.html",
  },
  {
    name: "Wright v. Cade",
    citation: "349 So. 2d 833 (Fla. 1st DCA 1977)",
    court: "Florida First District Court of Appeal",
    year: "1977",
    rule:
      "The court expressly distinguished a statutory transfer recorded with the Beverage Department from a transfer of private property rights. It held that section 561.32 does not, by itself, vest property title in the purchaser of a business.",
    why:
      "Wright is central to the age question because it demonstrates that DABT's regulatory record and private title are not necessarily the same thing. It does not, however, decide whether an under-21 person may acquire those private rights.",
    href: "https://law.justia.com/cases/florida/district-courts-of-appeal/1977/349-so-2d-833.html",
  },
  {
    name: "Concannon v. St. John",
    citation: "384 So. 2d 903 (Fla. 5th DCA 1980)",
    court: "Florida Fifth District Court of Appeal",
    year: "1980",
    rule:
      "Following Wright, the Fifth District held that a statutory transfer made to satisfy Beverage Department records is not necessarily a transfer of private property rights, particularly where the usual incidents of a true sale such as consideration are absent.",
    why:
      "The case reinforces that private ownership questions are resolved from the underlying transaction, not simply from the name appearing on the state license record.",
    href: "https://law.justia.com/cases/florida/district-courts-of-appeal/1980/384-so-2d-903.html",
  },
  {
    name: "Howard v. Metcalf",
    citation: "487 So. 2d 43 (Fla. 2d DCA 1986)",
    court: "Florida Second District Court of Appeal",
    year: "1986",
    rule:
      "The court stated that the Division's transfer of a liquor license neither transfers private property rights nor vests title in the purchaser. The regulatory transfer serves to maintain continuity in the ownership and management records used to regulate the liquor business.",
    why:
      "Howard is one of the clearest Florida appellate statements separating DABT transfer status from the underlying private transaction and title dispute.",
    href: "https://law.justia.com/cases/florida/district-courts-of-appeal/1986/487-so-2d-43.html",
  },
  {
    name: "United States v. McGurn",
    citation: "596 So. 2d 1038 (Fla. 1992)",
    court: "Florida Supreme Court",
    year: "1992",
    rule:
      "The Court held that Florida's specialized statutory system governs perfection of a security interest in a spirituous alcoholic-beverage license for the issue before it, recognizing the license as an asset capable of supporting a security interest.",
    why:
      "McGurn demonstrates that Florida law recognizes economic and creditor interests in a liquor license while still subjecting those interests to specialized Beverage Law requirements.",
    href: "https://law.justia.com/cases/florida/supreme-court/1992/77390-0.html",
  },
  {
    name: "Walling Enterprises, Inc. v. Mathias",
    citation: "636 So. 2d 1294 (Fla. 1994)",
    court: "Florida Supreme Court",
    year: "1994",
    rule:
      "The Court explained that a liquor license is not property in the constitutional sense against the state, yet has property-like characteristics and is a general intangible. It is not ordinary tangible property sitting on the licensed premises.",
    why:
      "Walling supplies the modern vocabulary for the distinction: regulatory privilege against the state, but a valuable general intangible capable of transfer and creditor claims in private commercial settings.",
    href: "https://law.justia.com/cases/florida/supreme-court/1994/81126-0.html",
  },
];

const statutes = [
  {
    cite: "§ 561.15, Fla. Stat.",
    title: "Age and qualification for issuance",
    text: "A Florida alcoholic-beverage license may be issued only to a natural person who is at least 21 years old. For a corporation, the statute expressly requires its officers to be at least 21 and otherwise qualified.",
    href: "https://www.flsenate.gov/Laws/Statutes/2026/561.15",
  },
  {
    cite: "§ 561.17, Fla. Stat.",
    title: "Direct and indirect interests",
    text: "The application reaches persons, officers, shareholders and directors having a direct or indirect interest in the licensed business. The Division may deny an application when an interested person, security-interest holder, or certain percentage-payment recipient is not qualified. The statute also contains a narrow contractual-revenue carve-out where the relationship is not related to control of alcoholic-beverage sales.",
    href: "https://www.flsenate.gov/Laws/Statutes/2026/561.17",
  },
  {
    cite: "§ 561.32, Fla. Stat.",
    title: "Transfers and interests in a license",
    text: "A regulatory transfer requires Division approval. The statute also recognizes judicial enforcement of liens and expressly treats a person with a security interest in an alcoholic-beverage license as indirectly interested in the license and subject to Beverage Law qualifications before enforcement.",
    href: "https://www.flsenate.gov/Laws/Statutes/2026/561.32",
  },
  {
    cite: "§ 561.65, Fla. Stat.",
    title: "Mortgage, lien and security interests",
    text: "Florida provides a specialized statutory system for recording and protecting a bona fide mortgage, lien, or security interest in a spirituous alcoholic-beverage license.",
    href: "https://www.flsenate.gov/Laws/Statutes/2026/561.65",
  },
  {
    cite: "§ 743.07, Fla. Stat.",
    title: "Age of majority — with an express Beverage Law exception",
    text: "Florida generally removes the disability of nonage at 18, but the statute expressly says that 18-year-olds receive the rights of persons 21 or older except as otherwise provided in the Beverage Law. That exception is important when analyzing liquor-license ownership and transfer rights.",
    href: "https://www.flsenate.gov/Laws/Statutes/2026/743.07",
  },
];

export default function FloridaLiquorLicenseAgePropertyRightsPage() {
  const faq = [
    {
      q: "How old must you be to hold a Florida quota liquor license?",
      a: "At least 21 years old for issuance to an individual under section 561.15, subject to the other Beverage Law qualifications.",
    },
    {
      q: "Can an 18-, 19-, or 20-year-old buy the property rights to a Florida quota liquor license?",
      a: "Florida appellate cases clearly separate private property or contractual rights from DABT's regulatory transfer of the license, but FLLM has not identified a reported Florida appellate decision holding that a person under 21 may acquire present title to those private rights free of the Beverage Law's qualification requirements. Because sections 561.17 and 561.32 regulate direct, indirect, and security interests, an under-21 buyer should not assume that ordinary contracting capacity at age 18 is enough.",
    },
    {
      q: "Does DABT transfer determine who owns the private property rights?",
      a: "Not necessarily. Wright v. Cade, Concannon v. St. John, and Howard v. Metcalf distinguish the Division's regulatory transfer from private property title arising from the underlying transaction.",
    },
    {
      q: "Could an under-21 person sign a contract for a future purchase?",
      a: "Florida generally recognizes adult contracting capacity at age 18, but section 743.07 expressly preserves Beverage Law exceptions. A future option, escrow, trust, entity interest, or other contractual structure can raise separate Beverage Law questions and should be reviewed by Florida beverage counsel before money or control rights are transferred.",
    },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "How Old Do You Have to Be to Buy a Florida Quota Liquor License?",
      description: metadata.description,
      mainEntityOfPage: canonicalUrl,
      dateModified: "2026-09-10",
      publisher: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Resources", item: `${siteUrl}/resources` },
        { "@type": "ListItem", position: 3, name: "Age & Property Rights", item: canonicalUrl },
      ],
    },
  ];

  return (
    <main className="news-insights-page news-article-page">
      <style dangerouslySetInnerHTML={{ __html: `
        .age-answer-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:28px 0}.age-answer-card{padding:20px;border:1px solid #d8d1c4;border-radius:8px;background:#fff}.age-answer-card strong{display:block;color:#0b1725;font-size:30px;line-height:1}.age-answer-card span{display:block;margin-top:7px;color:#8b6000;font-size:11px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}.age-answer-card p{margin:10px 0 0;color:#5b6771;font-size:14px;line-height:1.65}.age-answer-card.primary{border-color:#f6a700;background:#071b2d}.age-answer-card.primary strong,.age-answer-card.primary p{color:#fff}.age-answer-card.primary span{color:#f6a700}.age-decision{margin:34px 0;padding:25px;border:1px solid #f6a700;border-left:5px solid #f6a700;border-radius:8px;background:#071b2d;color:#fff}.age-decision h2{margin:7px 0 12px;color:#fff;font-size:clamp(28px,3.6vw,40px);line-height:1.08}.age-decision>span{color:#f6a700;font-size:11px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}.age-decision p{margin:0;color:#d3dde4;font-size:16px;line-height:1.72}.age-decision p+p{margin-top:12px}.age-statute-grid,.age-case-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:18px}.age-statute-card,.age-case-card{padding:20px;border:1px solid #d8d1c4;border-radius:8px;background:#fff}.age-statute-card span,.age-case-card>span{display:block;color:#8b6000;font-size:10px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}.age-statute-card h3,.age-case-card h3{margin:7px 0 8px;color:#0b1725;font-size:20px;line-height:1.25}.age-statute-card p,.age-case-card p{margin:0;color:#5b6771;font-size:14px;line-height:1.66}.age-statute-card a,.age-case-card a{display:inline-block;margin-top:13px;color:#8b6000;font-weight:900;text-decoration:none}.age-statute-card a:hover,.age-case-card a:hover{text-decoration:underline}.age-case-card b{display:block;margin-top:3px;color:#78828a;font-size:12px}.age-case-why{margin-top:14px;padding:13px 14px;border-left:3px solid #f6a700;background:#f8f5ee}.age-case-why strong{display:block;color:#0b1725;font-size:12px;text-transform:uppercase;letter-spacing:.08em}.age-case-why p{margin-top:5px}.age-flow{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:20px 0}.age-flow article{padding:18px;border:1px solid #d8d1c4;border-radius:8px;background:#f8f5ee}.age-flow b{display:grid;width:34px;height:34px;place-items:center;border-radius:50%;background:#071b2d;color:#f6a700}.age-flow h3{margin:10px 0 6px;color:#0b1725;font-size:17px}.age-flow p{margin:0;color:#5b6771;font-size:14px;line-height:1.6}.age-caution{margin:30px 0;padding:20px;border:1px solid #d8d1c4;border-radius:8px;background:#f8f5ee;color:#5b6771;line-height:1.68}.age-caution strong{color:#0b1725}.age-links{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:24px 0}.age-links a{padding:17px;border:1px solid #15324a;border-radius:7px;background:#071b2d;color:#fff;text-decoration:none}.age-links strong{display:block;color:#f6a700;font-size:14px}.age-links span{display:block;margin-top:5px;color:#c8d3da;font-size:13px;line-height:1.5}@media(max-width:760px){.age-answer-grid,.age-statute-grid,.age-case-grid,.age-flow,.age-links{grid-template-columns:1fr}}
      `}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} />

      <div className="abt-header-wrap news-header-wrap">
        <FormsSiteHeader primaryActionHref="/sell-your-license" primaryActionLabel="Sell Your License" />
      </div>

      <section className="news-article-hero">
        <div className="page-shell news-article-shell">
          <nav className="news-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span><Link href="/resources">Resources</Link><span>›</span><strong>Age &amp; Property Rights</strong>
          </nav>
          <span className="news-eyebrow">FLLM Florida Beverage Law Explainer</span>
          <h1>How Old Do You Have to Be to Buy a Florida Quota Liquor License?</h1>
          <p className="news-article-deck">
            Florida law gives a clear answer for holding the license itself: generally 21. The harder question is whether someone age 18, 19 or 20 can acquire the separate private property or contractual rights associated with a quota license before becoming eligible for DABT issuance or transfer.
          </p>
        </div>
      </section>

      <article className="page-shell news-article-shell news-article-body">
        <p className="news-article-intro">
          Florida cases repeatedly distinguish the state&apos;s regulatory record from the private economic rights created by a sale, lease, assignment, security agreement or other contract. That distinction is real, but it does <strong>not</strong> create a simple under-21 ownership exception. The age question must be read together with Florida&apos;s applicant-qualification, direct-and-indirect-interest, transfer, and security-interest statutes.
        </p>

        <section className="age-answer-grid" aria-label="Florida quota liquor license age summary">
          <article className="age-answer-card primary">
            <strong>21+</strong><span>License issuance</span>
            <p>An individual must be at least 21 to qualify for issuance of a Florida alcoholic-beverage license under section 561.15, subject to the remaining statutory qualifications.</p>
          </article>
          <article className="age-answer-card">
            <strong>18–20</strong><span>Private-rights question</span>
            <p>Florida adults generally can contract at 18, but section 743.07 expressly preserves Beverage Law exceptions. No reported Florida appellate decision identified by FLLM creates a standalone lower age for present liquor-license property title.</p>
          </article>
          <article className="age-answer-card">
            <strong>Separate</strong><span>Title vs. DABT record</span>
            <p>Florida appellate courts have held that DABT&apos;s regulatory transfer does not necessarily determine who owns the underlying private property rights.</p>
          </article>
        </section>

        <section className="age-decision">
          <span>FLLM bottom line</span>
          <h2>21 is the clear minimum age to hold the license. The minimum age for acquiring separate private property rights is not stated as a standalone rule in the reported Florida cases.</h2>
          <p>
            <strong>What the cases do establish:</strong> private title, contract rights, liens and security interests can be legally distinct from the state&apos;s regulatory transfer record. <strong>What they do not establish:</strong> that a person under 21 may freely acquire present ownership of those rights without triggering Florida Beverage Law qualification requirements.
          </p>
          <p>
            Because section 561.17 reaches direct and indirect interests and section 561.32 expressly treats a security-interest holder as indirectly interested in the license, an 18–20-year-old should not assume that ordinary adult contracting capacity alone makes a present quota-license acquisition permissible. A transaction involving a future purchase right, escrow, entity interest, trust, option, lien or other structure should be reviewed against the specific Beverage Law provisions before money or control rights change hands.
          </p>
        </section>

        <section className="news-article-section">
          <h2>Why age 18 does not automatically answer the question</h2>
          <p>
            Florida generally removes the disability of nonage at age 18. Section 743.07 says that persons 18 or older enjoy the rights and obligations of persons 21 or older, <strong>except as otherwise provided in the Beverage Law</strong>. That express exception matters because the Beverage Law separately sets age, qualification, ownership-interest and transfer rules for alcoholic-beverage licenses.
          </p>
          <p>
            In other words, an 18-year-old may generally have capacity to sign contracts, buy ordinary personal property, form an entity and assume legal obligations. But a Florida quota liquor license is not ordinary personal property. It is a regulated general intangible with private economic value, and the interests surrounding it remain subject to Chapter 561.
          </p>
        </section>

        <section className="news-article-section">
          <h2>The statutes that control the analysis</h2>
          <div className="age-statute-grid">
            {statutes.map((item) => (
              <article className="age-statute-card" key={item.cite}>
                <span>{item.cite}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <a href={item.href} target="_blank" rel="noopener noreferrer">Read the current Florida statute ↗</a>
              </article>
            ))}
          </div>
        </section>

        <section className="news-article-section">
          <h2>Three different rights should not be confused</h2>
          <div className="age-flow">
            <article><b>1</b><h3>Private contract rights</h3><p>A purchase agreement, option, lease covenant, trust agreement or assignment can create contractual rights between private parties.</p></article>
            <article><b>2</b><h3>Private property or creditor rights</h3><p>Florida cases recognize economic title concepts, liens, security interests and a quota license&apos;s status as a valuable general intangible.</p></article>
            <article><b>3</b><h3>Regulatory license rights</h3><p>DABT controls issuance, approved transfer and the right to operate under the license. Private documents alone do not authorize alcohol sales.</p></article>
          </div>
        </section>

        <section className="news-article-section">
          <h2>Florida cases separating property rights from regulatory status</h2>
          <p>
            The following summaries are written in FLLM&apos;s transaction-focused style. Each card links to the full published opinion so readers can review the court&apos;s actual language and factual context.
          </p>
          <div className="age-case-grid">
            {cases.map((item) => (
              <article className="age-case-card" key={item.citation}>
                <span>{item.court} · {item.year}</span>
                <h3><em>{item.name}</em></h3>
                <b>{item.citation}</b>
                <p>{item.rule}</p>
                <div className="age-case-why"><strong>Why it matters</strong><p>{item.why}</p></div>
                <a href={item.href} target="_blank" rel="noopener noreferrer">Read full published opinion ↗</a>
              </article>
            ))}
          </div>
        </section>

        <section className="property-law-callout">
          <span>The rule from Wright, Concannon and Howard</span>
          <h2>DABT&apos;s transfer record and private title are not necessarily the same legal question.</h2>
          <p>
            <em>Wright v. Cade</em>, <em>Concannon v. St. John</em>, and <em>Howard v. Metcalf</em> make the distinction especially clear. The Division&apos;s transfer serves the regulatory system; private property title can depend on the underlying sale, consideration, lease, assignment or other transaction documents. That distinction explains why the age question cannot be answered solely by looking at whose name appears on the license — but it also does not eliminate the Beverage Law&apos;s qualification rules for direct and indirect interests.
          </p>
        </section>

        <section className="news-article-section">
          <h2>Can someone age 18–20 sign a contract now and take the license later?</h2>
          <p>
            A future contractual right is analytically different from immediate DABT issuance. Florida adults generally have contracting capacity at 18, and section 561.17 itself recognizes that not every contractual revenue relationship makes the contracting party an applicant. But the statute&apos;s carve-out is limited: it concerns a contractual relationship whose substance is not related to control of alcoholic-beverage sales.
          </p>
          <p>
            FLLM therefore does not state that an option, escrow arrangement, trust, entity structure, purchase agreement, lien or delayed closing is automatically valid for an under-21 purchaser. The substance of the rights transferred matters. Control, direct or indirect ownership, security interests, percentage payments, enforcement rights and the timing of DABT approval can change the analysis.
          </p>
        </section>

        <section className="news-article-section">
          <h2>What about buying through a corporation or LLC?</h2>
          <p>
            Entity ownership does not create an obvious automatic workaround. Section 561.15 contains specific rules for corporate licensees, while section 561.17 reaches officers, shareholders, directors and other persons with direct or indirect interests in the business seeking to be licensed. A change in ownership or other interest can also implicate section 561.32.
          </p>
          <p>
            The correct analysis depends on who owns the entity, who controls the licensed business, who receives the economics, whether any person holds a security interest, and what DABT approval is required for that structure.
          </p>
        </section>

        <section className="news-article-section">
          <h2>Official DABT transfer resources</h2>
          <div className="property-source-grid">
            <a href="https://www.myfloridalicense.com/CheckListDetail.asp?XACT_DEFN_ID=13356&clientCode=4008&xactCode=1060" target="_blank" rel="noopener noreferrer"><span>DBPR / DABT</span><strong>Transfer of Ownership Checklist</strong><small>Official state checklist for transferring ownership of an existing alcoholic-beverage license.</small></a>
            <a href="https://www2.myfloridalicense.com/abt/forms/documents/abt-6002formonly.pdf" target="_blank" rel="noopener noreferrer"><span>DBPR Form ABT-6002</span><strong>Application for Transfer of Ownership</strong><small>Official DABT transfer application used for ownership changes and certain quota-license escrow transactions.</small></a>
          </div>
        </section>

        <section className="news-article-section">
          <h2>Related FLLM research</h2>
          <div className="age-links">
            <Link href="/resources/florida-liquor-license-property-or-privilege"><strong>Property or Privilege?</strong><span>Read FLLM&apos;s broader guide to quota-license property characteristics, liens and security interests.</span></Link>
            <Link href="/florida-liquor-license-court-decisions"><strong>Court Decisions &amp; Case Law</strong><span>Browse FLLM&apos;s Florida liquor-license case-law research hub.</span></Link>
            <Link href="/resources/liquor-license-attorneys"><strong>Liquor License Attorneys</strong><span>Find independent Florida counsel for transaction-specific licensing and ownership questions.</span></Link>
          </div>
        </section>

        <section className="news-article-section">
          <h2>Frequently asked questions</h2>
          {faq.map((item) => (
            <div className="property-note" key={item.q}>
              <strong>{item.q}</strong><br />{item.a}
            </div>
          ))}
        </section>

        <aside className="age-caution">
          <strong>Research notice:</strong> This page summarizes statutes and reported decisions for market and educational purposes. It is not a legal opinion and does not determine whether a particular contract, trust, entity interest, option, lien, security interest, inheritance, court-ordered transfer or other transaction is valid. Florida liquor-license law is highly fact-specific, and DABT approval may be required even where private contractual or property rights exist. Statutes and agency procedures should be rechecked at the time of a transaction.
        </aside>

        <p style={{color:"#78828a",fontSize:12}}>FLLM legal research review: September 10, 2026.</p>
      </article>
    </main>
  );
}
