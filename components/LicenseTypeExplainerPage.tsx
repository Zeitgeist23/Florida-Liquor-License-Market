import Link from "next/link";

export type LicenseTypeExplainerProps = {
  code: string;
  title: string;
  eyebrow: string;
  definition: string;
  plainEnglish: string;
  plainEnglishHighlights?: string[];
  populationRule?: { text: string; href: string; citation: string };
  seriesMeaning?: string;
  sells: string[];
  businesses: string[];
  doesNot: string[];
  quotaNote: string;
  keyPoint: string;
  officialLabel: string;
  officialHref: string;
  relatedHref?: string;
  relatedLabel?: string;
  researchLinks?: Array<{ href: string; label: string; description: string }>;
  ruleUpdateLinks?: Array<{ href: string; label: string; description: string }>;
  officialResources?: Array<{ href: string; label: string; description: string }>;
  requirementCards?: Array<{
    label: string;
    value: string;
    detail: string;
    href?: string;
    linkLabel?: string;
  }>;
  requirementsText?: string;
  requirementsCaution?: string;
  requirementNotes?: Array<{ title: string; text: string }>;
  comparison?: {
    heading: string;
    intro?: string;
    rows: Array<{ feature: string; quota: string; sfs: string }>;
    sources?: Array<{ href: string; label: string }>;
  };
  seriesClarification?: string;
  investmentNote?: string;
  imageSrc?: string;
  imageAlt?: string;
  organizedSummary?: boolean;
};

function ExternalOrInternalLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  if (/^https?:\/\//i.test(href)) {
    return <a className={className} href={href} target="_blank" rel="noreferrer">{children}</a>;
  }
  return <Link className={className} href={href}>{children}</Link>;
}

function LicenseTypeTitle({ title }: { title: string }) {
  return <>{title.split(/([34](?=(?:PS|COP)))/g).map((part, index) => /^[34]$/.test(part) ? <span className="lt-straight-numeral" key={`${part}-${index}`}>{part}</span> : part)}</>;
}

function HighlightTerms({ text, terms = [] }: { text: string; terms?: string[] }) {
  if (!terms.length) return <>{text}</>;
  const normalizedTerms = terms.map((term) => term.toLowerCase());
  const lowerText = text.toLowerCase();
  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  let key = 0;

  while (cursor < text.length) {
    let nextIndex = -1;
    let nextTerm = "";

    normalizedTerms.forEach((term) => {
      const index = lowerText.indexOf(term, cursor);
      if (index >= 0 && (nextIndex < 0 || index < nextIndex)) {
        nextIndex = index;
        nextTerm = term;
      }
    });

    if (nextIndex < 0) {
      nodes.push(text.slice(cursor));
      break;
    }

    if (nextIndex > cursor) nodes.push(text.slice(cursor, nextIndex));
    const match = text.slice(nextIndex, nextIndex + nextTerm.length);
    nodes.push(<strong className="lt-term-highlight" key={`${match}-${key++}`}>{match}</strong>);
    cursor = nextIndex + nextTerm.length;
  }

  return <>{nodes}</>;
}

export default function LicenseTypeExplainerPage(props: LicenseTypeExplainerProps) {
  return (
    <main className={`license-explainer-page${props.organizedSummary ? " lt-readable-layout" : ""}`}>
      <style>{`
        :root{--navy:#0a2238;--navy2:#10314b;--navy3:#0c2942;--gold:#f6a700;--text:#edf3f7;--muted:#c4d1dc}
        *{box-sizing:border-box}
        body{margin:0;background:#081d31;color:var(--text);font-family:Arial,Helvetica,sans-serif}
        .license-explainer-page{min-height:100vh;background:linear-gradient(180deg,#0b2942 0,#0d314d 36%,#09243a 72%,#081d31 100%)}
        .lt-shell{width:min(1180px,calc(100% - 40px));margin:0 auto}
        .lt-back{display:inline-flex;align-items:center;gap:7px;margin-top:28px;color:#e0e9f0;text-decoration:none;font-size:13px;font-weight:700}.lt-back:hover{color:var(--gold)}
        .lt-hero{padding:34px 0 28px}.lt-eyebrow{display:inline-block;color:var(--gold);font-size:13px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;margin-bottom:12px}
        .lt-hero h1{margin:0;color:#fff;font:700 clamp(34px,5vw,60px)/1.02 Georgia,serif;max-width:930px}.lt-straight-numeral{display:inline-block;font-family:Arial,Helvetica,sans-serif;font-size:1em!important;font-style:normal;font-weight:700;line-height:1;letter-spacing:normal!important;text-transform:none!important;color:inherit!important;vertical-align:baseline}
        .lt-definition{margin:24px 0 0;padding:26px 28px;border:1px solid rgba(246,167,0,.6);border-left:5px solid var(--gold);border-radius:10px;background:rgba(255,255,255,.065);max-width:1050px}
        .lt-definition h2{margin:0 0 12px;color:var(--gold);font-size:20px}.lt-definition p{margin:0;color:#fff;font-size:21px;line-height:1.55;font-weight:600}.lt-definition .lt-population-rule{margin-top:17px;padding-top:15px;border-top:1px solid rgba(246,167,0,.28);color:#dce8ef;font-size:17px;line-height:1.62;font-weight:500}.lt-population-rule strong{color:#fff}.lt-population-rule a{color:#70dcff;font-weight:400;text-decoration:none}.lt-population-rule a:hover{text-decoration:underline}
        .lt-plain{margin:18px 0 0;color:var(--muted);font-size:17px;line-height:1.7;max-width:1000px}
        .lt-series-meaning{display:flex;align-items:center;gap:10px;width:fit-content;max-width:100%;margin:14px 0 0;padding:10px 14px;border-left:3px solid var(--gold);border-radius:7px;background:rgba(4,23,39,.42);box-shadow:inset 0 1px 0 rgba(255,255,255,.04),0 8px 18px rgba(0,0,0,.12);color:#dce7ed;font-size:14px;line-height:1.4}.lt-series-meaning strong{color:var(--gold);font-weight:900}.lt-term-highlight{color:#70dcff;font-weight:900;text-shadow:0 0 12px rgba(112,220,255,.16)}
        .lt-grid{display:grid;grid-template-columns:minmax(0,.95fr) minmax(0,1.1fr) minmax(0,.95fr);align-items:start;gap:22px;padding:24px 0 24px}
        .lt-summary{padding:24px 0 34px}.lt-summary-head{margin:0 0 16px}.lt-summary-head span{color:var(--gold);font-size:11px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}.lt-summary-head h2{margin:7px 0 0;color:#fff;font:700 29px/1.15 Georgia,serif}.lt-summary-compare{display:grid;grid-template-columns:1fr 1fr;gap:18px;align-items:stretch}.lt-summary-compare .lt-card{height:100%}.lt-readable-layout .lt-hero h1{max-width:none;font-size:clamp(34px,4.2vw,56px);white-space:nowrap}.lt-readable-layout .lt-plain{font-size:19px;line-height:1.72}.lt-readable-layout .lt-series-meaning{gap:13px;min-height:58px;padding:15px 20px;border-left-width:5px;border-top:1px solid rgba(246,167,0,.28);border-right:1px solid rgba(255,255,255,.08);border-bottom:1px solid rgba(255,255,255,.08);background:#071f34;color:#fff;font-size:18px;line-height:1.5;box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 10px 22px rgba(0,0,0,.2)}.lt-readable-layout .lt-series-meaning strong{font-size:18px;letter-spacing:.01em}.lt-readable-layout .lt-series-meaning span{color:#fff;font-weight:600}.lt-readable-layout .lt-summary-head span{font-size:13px}.lt-readable-layout .lt-summary-head h2{font-size:32px}.lt-readable-layout .lt-card h2{font-size:22px}.lt-readable-layout .lt-card ul{font-size:17px;line-height:1.68}.lt-readable-layout .lt-card li{margin-bottom:11px}.lt-readable-layout .lt-requirements-head{display:block;margin-bottom:20px}.lt-readable-layout .lt-requirements-head span{font-size:13px}.lt-readable-layout .lt-requirements-head h2{max-width:none}.lt-readable-layout .lt-requirements-head p{max-width:1100px;margin-top:13px;font-size:18px;line-height:1.65}.lt-readable-layout .lt-requirement-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.lt-readable-layout .lt-requirement-card{display:flex;min-height:235px;flex-direction:column;padding:26px 28px}.lt-readable-layout .lt-requirement-card span{font-size:14px}.lt-readable-layout .lt-requirement-card strong{font-size:25px}.lt-readable-layout .lt-requirement-card p{font-size:17px;line-height:1.65}.lt-readable-layout .lt-requirement-source{margin-top:auto;padding-top:16px;font-size:15px!important}.lt-readable-layout .lt-requirement-notes{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:18px}.lt-readable-layout .lt-requirement-note{margin:0;padding:19px 22px;border:1px solid rgba(246,167,0,.34);border-left:5px solid var(--gold);border-radius:8px;background:linear-gradient(145deg,rgba(255,255,255,.07),rgba(255,255,255,.035));color:#e6eef3;font-size:16px;line-height:1.65}.lt-readable-layout .lt-requirement-note strong{display:block;margin-bottom:5px;color:var(--gold);font-size:17px}.lt-readable-layout .lt-comparison-head{text-align:center}.lt-readable-layout .lt-comparison-head p{margin-left:auto;margin-right:auto;max-width:1000px}
        .lt-summary-businesses{margin-top:18px}.lt-summary-businesses h2{white-space:normal}.lt-card-businesses.lt-summary-businesses ul{grid-template-columns:repeat(4,minmax(0,1fr));column-gap:32px}.lt-card-businesses.lt-summary-businesses li:first-child{grid-column:span 2;margin-bottom:10px}.lt-card-businesses.lt-summary-businesses li{margin-bottom:8px}
        .lt-card{position:relative;isolation:isolate;overflow:hidden;padding:24px;border:1px solid rgba(246,167,0,.46);border-radius:12px;background:radial-gradient(circle at 24% 0%,rgba(255,255,255,.055),transparent 36%),linear-gradient(145deg,#16405f 0%,#123955 48%,#0d2d46 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -8px 18px rgba(0,0,0,.13),0 3px 0 rgba(111,77,13,.52),0 16px 34px rgba(0,0,0,.2);transform:translateY(0);transition:transform .2s ease,border-color .2s ease,background .2s ease,box-shadow .2s ease,filter .2s ease}.lt-card::before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:0;background:radial-gradient(circle at 50% -10%,rgba(108,216,255,.22),transparent 44%),linear-gradient(180deg,rgba(255,255,255,.055),transparent 40%);transition:opacity .2s ease}.lt-card::after{content:"";position:absolute;left:10%;right:10%;bottom:-8px;height:14px;z-index:-2;border-radius:50%;background:rgba(0,0,0,.34);filter:blur(8px)}.lt-card:nth-child(2){z-index:1}.lt-card:hover,.lt-card:focus-within{background:radial-gradient(circle at 24% 0%,rgba(255,255,255,.09),transparent 38%),linear-gradient(145deg,#1b4e70 0%,#164663 48%,#10364f 100%);border-color:#ffc13b;box-shadow:inset 0 1px 0 rgba(255,255,255,.13),inset 0 0 30px rgba(105,214,255,.075),0 4px 0 rgba(163,111,10,.66),0 22px 42px rgba(0,0,0,.3),0 0 20px rgba(105,214,255,.16),0 0 16px rgba(246,167,0,.14);transform:translateY(-5px) scale(1.012);filter:brightness(1.05)}.lt-card:hover::before,.lt-card:focus-within::before{opacity:1}
        .lt-card h2{margin:0 0 18px;color:var(--gold)!important;font-size:20px;font-weight:800;line-height:1.18;letter-spacing:.01em}.lt-card-businesses h2{white-space:nowrap;font-size:19px}.lt-card ul{margin:0;padding-left:22px;color:#f4f7fa;font-size:15.5px;line-height:1.62}.lt-card li{color:#f4f7fa;margin-bottom:10px}.lt-card li::marker{color:var(--gold)}.lt-card li+li{margin-top:0}.lt-card-businesses ul{display:grid;grid-template-columns:1fr 1fr;column-gap:26px;row-gap:0;align-content:start}.lt-card-businesses li{break-inside:avoid;margin-top:0!important;margin-bottom:10px}.lt-card-businesses li:first-child{grid-column:1/-1;max-width:100%;margin-bottom:14px}.lt-card-businesses{padding-bottom:22px}
        .lt-requirements{padding:4px 0 30px}.lt-requirements-head{display:grid;grid-template-columns:.8fr 1.2fr;gap:24px;align-items:end;margin-bottom:16px}
        .lt-requirements-head span,.lt-rule-updates>span,.lt-official>span,.lt-research>span{color:var(--gold);font-size:11px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
        .lt-requirements-head h2,.lt-rule-updates h2,.lt-official h2,.lt-research h2{margin:7px 0 0;color:#fff;font:700 29px/1.15 Georgia,serif}
        .lt-requirements-head p{margin:0;color:var(--muted);font-size:15px;line-height:1.7}
        .lt-requirement-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
        .lt-requirement-card{position:relative;isolation:isolate;overflow:hidden;min-height:198px;padding:21px;border:1px solid rgba(246,167,0,.62);border-radius:11px;background:radial-gradient(circle at 24% 2%,rgba(255,255,255,.08),transparent 36%),linear-gradient(150deg,#173f5e 0%,#10334e 48%,#0a263c 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -8px 18px rgba(0,0,0,.16),0 3px 0 rgba(128,88,12,.65),0 13px 28px rgba(0,0,0,.25);transition:transform .18s ease,border-color .18s ease,background .18s ease,box-shadow .18s ease}.lt-requirement-card::after{content:"";position:absolute;left:9%;right:9%;bottom:-8px;height:14px;border-radius:50%;background:rgba(0,0,0,.32);filter:blur(8px);z-index:-1}.lt-requirement-card:hover,.lt-requirement-card:focus-within{border-color:#f6a700;background:radial-gradient(circle at 24% 2%,rgba(255,255,255,.11),transparent 38%),linear-gradient(150deg,#1b4b6c,#123c59);box-shadow:inset 0 1px 0 rgba(255,255,255,.12),inset 0 -8px 18px rgba(0,0,0,.13),0 4px 0 rgba(165,111,8,.72),0 20px 38px rgba(0,0,0,.32),0 0 16px rgba(246,167,0,.12);transform:translateY(-4px)}
        .lt-requirement-card span{display:block;color:#c8d8e3;font-size:12px;font-weight:900;letter-spacing:.07em;text-transform:uppercase}.lt-requirement-card strong{display:block;margin:10px 0 8px;color:var(--gold);font:700 22px/1.15 Georgia,serif}
        .lt-requirement-card p{margin:0;color:#eef3f6;font-size:14.5px;line-height:1.62}.lt-requirement-source{display:inline-block;margin-top:14px;color:#ffbd34!important;font-size:13px!important;font-weight:900!important;letter-spacing:0!important;text-transform:none!important;text-decoration:none}.lt-requirement-source:hover{text-decoration:underline}
        .lt-requirement-caution{margin:16px 0 0;padding:17px 20px;border-left:4px solid var(--gold);background:linear-gradient(90deg,rgba(246,167,0,.11),rgba(255,255,255,.055));box-shadow:inset 0 1px 0 rgba(255,255,255,.035),0 8px 18px rgba(0,0,0,.12);color:#e3ebf0;font-size:14px;line-height:1.7}.lt-requirement-notes{margin-top:16px}.lt-requirement-note{margin:0;padding:17px 20px;border-left:4px solid var(--gold);background:linear-gradient(90deg,rgba(246,167,0,.11),rgba(255,255,255,.055));color:#e3ebf0;font-size:14px;line-height:1.7}
        .lt-comparison{padding:4px 0 36px}.lt-comparison-head{margin-bottom:16px}.lt-comparison-head span{color:var(--gold);font-size:13px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}.lt-comparison-head h2{margin:7px 0 8px;color:#fff;font:700 32px/1.15 Georgia,serif}.lt-comparison-head p{max-width:950px;margin:0;color:#d3dfe7;font-size:17px;line-height:1.65}.lt-comparison-wrap{overflow-x:auto;border:1px solid rgba(246,167,0,.62);border-radius:12px;background:#0c2b43;box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 16px 34px rgba(0,0,0,.23)}.lt-comparison-table{width:100%;min-width:780px;border-collapse:collapse;table-layout:fixed}.lt-comparison-table th,.lt-comparison-table td{padding:18px 20px;border-right:1px solid rgba(255,255,255,.1);border-bottom:1px solid rgba(255,255,255,.1);vertical-align:top;text-align:left}.lt-comparison-table th:last-child,.lt-comparison-table td:last-child{border-right:0}.lt-comparison-table tbody tr:last-child td{border-bottom:0}.lt-comparison-table thead th{background:linear-gradient(180deg,#194d6e,#123b58);color:#fff;font-size:19px;line-height:1.3;text-align:center}.lt-comparison-table thead th:first-child{width:22%;color:var(--gold);font-size:15px;letter-spacing:.05em;text-align:left;text-transform:uppercase}.lt-comparison-table tbody td{color:#edf3f7;font-size:16px;line-height:1.58}.lt-comparison-table tbody td:first-child{background:rgba(255,255,255,.045);color:#ffbd34;font-weight:900}.lt-comparison-table tbody tr:hover td{background-color:rgba(102,211,255,.07)}.lt-comparison-sources{margin:12px 0 0;color:#bfcdd7;font-size:13px;line-height:1.6}.lt-comparison-sources a{color:#70dcff;font-weight:700;text-decoration:none}.lt-comparison-sources a:hover{text-decoration:underline}
        .lt-official{padding:0 0 34px}.lt-official-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:16px}.lt-official-grid a{position:relative;overflow:hidden;display:flex;flex-direction:column;min-height:180px;padding:24px;border:1px solid rgba(246,167,0,.42);border-top:3px solid var(--gold);border-radius:10px;background:radial-gradient(circle at 18% 0%,rgba(255,255,255,.065),transparent 34%),linear-gradient(145deg,#163e5b 0%,#113550 52%,#0b2941 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -8px 18px rgba(0,0,0,.14),0 3px 0 rgba(112,77,12,.58),0 14px 28px rgba(0,0,0,.23);color:inherit;text-decoration:none;transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease,background .18s ease}.lt-official-grid a:hover,.lt-official-grid a:focus-visible{transform:translateY(-4px);border-color:#f6a700;background:radial-gradient(circle at 18% 0%,rgba(255,255,255,.095),transparent 36%),linear-gradient(145deg,#1b4a68,#123b58);box-shadow:inset 0 1px 0 rgba(255,255,255,.11),0 4px 0 rgba(150,101,8,.68),0 20px 38px rgba(0,0,0,.31),0 0 16px rgba(246,167,0,.11);outline:none}.lt-official-grid strong{color:#fff;font-size:19px;line-height:1.4}.lt-official-grid p{margin:11px 0 16px;color:#d8e3ea;font-size:16.5px;line-height:1.65}.lt-official-grid small{margin-top:auto;color:var(--gold);font-size:14.5px;font-weight:900;text-transform:uppercase}
        .lt-band{display:grid;grid-template-columns:1.15fr .85fr;gap:18px;padding:0 0 28px}.lt-panel{padding:24px;border-radius:12px;background:#123751;border:1px solid rgba(255,255,255,.1)}.lt-panel h2{margin:0 0 10px;color:var(--gold);font-size:20px}.lt-panel p{margin:0;color:#e0e8ee;font-size:16px;line-height:1.7}.lt-key{border-color:rgba(246,167,0,.48)}
        .lt-business-visual{padding:2px 0 32px}.lt-business-image{position:relative;margin:0;overflow:hidden;border:1px solid rgba(246,167,0,.58);border-radius:14px;background:#0d2a42;box-shadow:0 20px 48px rgba(0,0,0,.22)}.lt-business-image img{display:block;width:100%;height:auto;max-height:560px;aspect-ratio:16/7;object-fit:cover;object-position:center}.lt-business-image::after{content:"";position:absolute;inset:0;box-shadow:inset 0 0 0 1px rgba(255,255,255,.06);pointer-events:none}
        .lt-extra{display:grid;grid-template-columns:1fr 1fr;gap:18px;padding:0 0 28px}.lt-extra article{padding:25px;border:1px solid rgba(246,167,0,.4);border-radius:12px;background:linear-gradient(145deg,#123751,#0d2d46)}.lt-extra article:last-child{border-left:4px solid var(--gold)}.lt-extra h2{margin:0 0 10px;color:#fff;font-size:21px}.lt-extra p{margin:0;color:#e0e8ee;font-size:15px;line-height:1.72}.lt-extra a{display:inline-block;margin-top:12px;color:var(--gold);font-size:12px;font-weight:900;text-decoration:none}
        .lt-rule-updates{padding:0 0 34px}.lt-rule-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:16px}.lt-rule-grid a{display:flex;flex-direction:column;padding:20px;border:1px solid rgba(246,167,0,.5);border-radius:10px;background:linear-gradient(145deg,#123b58,#0c2b43);color:inherit;text-decoration:none;transition:transform .18s ease,border-color .18s ease}.lt-rule-grid a:hover,.lt-rule-grid a:focus-visible{border-color:var(--gold);transform:translateY(-2px);outline:none}.lt-rule-grid strong{color:#fff;font-size:16px;line-height:1.35}.lt-rule-grid p{margin:8px 0 12px;color:var(--muted);font-size:13px;line-height:1.55}.lt-rule-grid small{margin-top:auto;color:var(--gold);font-weight:900;text-transform:uppercase}
        .lt-research{padding:0 0 34px}.lt-research-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:16px}.lt-research-grid a{display:flex;flex-direction:column;min-height:150px;padding:19px;border:1px solid rgba(246,167,0,.4);border-radius:10px;background:#10314b;color:inherit;text-decoration:none;transition:transform .18s ease,border-color .18s ease}.lt-research-grid a:hover,.lt-research-grid a:focus-visible{transform:translateY(-3px);border-color:var(--gold);outline:none}.lt-research-grid strong{color:#fff;font-size:17px;line-height:1.3}.lt-research-grid p{margin:9px 0 13px;color:var(--muted);font-size:13px;line-height:1.55}.lt-research-grid small{margin-top:auto;color:var(--gold);font-weight:900;text-transform:uppercase}
        .lt-cta{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:24px 0 42px;border-top:1px solid rgba(246,167,0,.3)}.lt-cta p{margin:0;color:#d3dfe7;line-height:1.6}.lt-actions{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end}.lt-button{display:inline-flex;align-items:center;justify-content:center;padding:12px 16px;border-radius:7px;text-decoration:none;font-size:13px;font-weight:900;transform-origin:center;transition:transform .18s ease,border-color .18s ease,background .18s ease,color .18s ease,box-shadow .18s ease}.lt-button.gold{border:1px solid #ffc13b;background:linear-gradient(145deg,#ffc13b,#e69a00);box-shadow:0 6px 13px rgba(0,0,0,.2);color:#061728}.lt-button.outline{border:1px solid var(--gold);background:#071a2b;color:#fff}.lt-button:hover,.lt-button:focus-visible{border-color:#ffd66e;background:linear-gradient(145deg,#ffca4d,#f1a600);box-shadow:0 9px 18px rgba(0,0,0,.28),0 0 13px rgba(246,167,0,.2);color:#061728;transform:translateY(-1px) scale(1.03);outline:none}.lt-disclaimer{padding:18px 0 34px;color:#aebfcc;font-size:12px;line-height:1.6}
        @media(max-width:1000px){.lt-readable-layout .lt-hero h1{white-space:normal}}
        @media(max-width:900px){.lt-requirement-grid{grid-template-columns:1fr 1fr}.lt-requirements-head{grid-template-columns:1fr}}
        @media(max-width:850px){.lt-grid,.lt-extra,.lt-research-grid,.lt-rule-grid,.lt-official-grid{grid-template-columns:1fr}.lt-summary-compare{grid-template-columns:1fr}.lt-card-businesses ul,.lt-card-businesses.lt-summary-businesses ul{grid-template-columns:1fr 1fr}.lt-card-businesses.lt-summary-businesses li:first-child{grid-column:1/-1}.lt-research-grid a,.lt-official-grid a{min-height:0}.lt-band{grid-template-columns:1fr}.lt-business-image img{max-height:none;aspect-ratio:4/3}.lt-cta{align-items:flex-start;flex-direction:column}.lt-actions{justify-content:flex-start}.lt-definition p{font-size:18px}}
        @media(max-width:700px){.lt-readable-layout .lt-requirement-grid,.lt-readable-layout .lt-requirement-notes{grid-template-columns:1fr}}\n        @media(max-width:560px){.lt-requirement-grid{grid-template-columns:1fr}.lt-card-businesses ul,.lt-card-businesses.lt-summary-businesses ul{grid-template-columns:1fr}.lt-card-businesses.lt-summary-businesses li:first-child{grid-column:auto}.lt-series-meaning{align-items:flex-start;flex-direction:column;gap:3px}}
      `}</style>


      <section className="lt-shell lt-hero">
        <Link className="lt-back" href="/resources/florida-liquor-license-types">← All Florida liquor license types</Link>
        <div style={{marginTop:24}}><span className="lt-eyebrow">{props.eyebrow}</span><h1><LicenseTypeTitle title={props.title} /></h1></div>
        <div className="lt-definition"><h2>What is a {props.code} license?</h2><p>{props.definition}</p>{props.populationRule ? <p className="lt-population-rule"><strong>County population rule:</strong> {props.populationRule.text} <a href={props.populationRule.href} target="_blank" rel="noreferrer">{props.populationRule.citation}</a></p> : null}</div>
        <p className="lt-plain"><strong>In plain English:</strong> <HighlightTerms text={props.plainEnglish} terms={props.plainEnglishHighlights} /></p>
        {props.seriesMeaning ? <div className="lt-series-meaning"><strong>Series meaning:</strong><span>{props.seriesMeaning}</span></div> : null}
      </section>

      {props.organizedSummary ? (
        <section className="lt-shell lt-summary" aria-label={`${props.code} license summary`}>
          <div className="lt-summary-head"><span>At a glance</span><h2>What a <LicenseTypeTitle title={props.code} /> license covers</h2></div>
          <div className="lt-summary-compare">
            <article className="lt-card"><h2>What it can sell</h2><ul>{props.sells.map((item) => <li key={item}>{item}</li>)}</ul></article>
            <article className="lt-card"><h2>What it does not automatically allow</h2><ul>{props.doesNot.map((item) => <li key={item}>{item}</li>)}</ul></article>
          </div>
          <article className="lt-card lt-card-businesses lt-summary-businesses"><h2>Businesses that commonly use it</h2><ul>{props.businesses.map((item) => <li key={item}>{item}</li>)}</ul></article>
        </section>
      ) : (
        <section className="lt-shell lt-grid" aria-label={`${props.code} license summary`}>
          <article className="lt-card"><h2>What it can sell</h2><ul>{props.sells.map((item) => <li key={item}>{item}</li>)}</ul></article>
          <article className="lt-card lt-card-businesses"><h2>Businesses that commonly use it</h2><ul>{props.businesses.map((item) => <li key={item}>{item}</li>)}</ul></article>
          <article className="lt-card"><h2>What it does not automatically allow</h2><ul>{props.doesNot.map((item) => <li key={item}>{item}</li>)}</ul></article>
        </section>
      )}

      {props.requirementCards?.length ? (
        <section className="lt-shell lt-requirements" aria-labelledby={`${props.code.replace(/[^a-z0-9]/gi, "-")}-requirements`}>
          <div className="lt-requirements-head">
            <div><span>Key requirements &amp; benefits</span><h2 id={`${props.code.replace(/[^a-z0-9]/gi, "-")}-requirements`}><LicenseTypeTitle title={`${props.code} practical requirements`} /></h2></div>
            {props.requirementsText ? <p>{props.requirementsText}</p> : null}
          </div>
          <div className="lt-requirement-grid">
            {props.requirementCards.map((card) => (
              <article className="lt-requirement-card" key={`${card.label}-${card.value}`}>
                <span>{card.label}</span><strong>{card.value}</strong><p>{card.detail}</p>
                {card.href ? <ExternalOrInternalLink className="lt-requirement-source" href={card.href}>{card.linkLabel || "Current rule / official source ↗"}</ExternalOrInternalLink> : null}
              </article>
            ))}
          </div>
          {props.requirementNotes?.length ? <div className="lt-requirement-notes">{props.requirementNotes.map((note) => <p className="lt-requirement-note" key={note.title}><strong>{note.title}</strong>{note.text}</p>)}</div> : null}
          {props.requirementsCaution ? <p className="lt-requirement-caution">{props.requirementsCaution}</p> : null}
        </section>
      ) : null}

      {props.comparison?.rows.length ? (
        <section className="lt-shell lt-comparison" aria-labelledby="license-comparison-title">
          <div className="lt-comparison-head"><span>Side-by-side comparison</span><h2 id="license-comparison-title"><LicenseTypeTitle title={props.comparison.heading} /></h2>{props.comparison.intro ? <p>{props.comparison.intro}</p> : null}</div>
          <div className="lt-comparison-wrap">
            <table className="lt-comparison-table">
              <thead><tr><th scope="col">Key difference</th><th scope="col"><LicenseTypeTitle title="4COP Quota" /></th><th scope="col"><LicenseTypeTitle title="4COP SFS/SRX" /></th></tr></thead>
              <tbody>{props.comparison.rows.map((row) => <tr key={row.feature}><td>{row.feature}</td><td>{row.quota}</td><td>{row.sfs}</td></tr>)}</tbody>
            </table>
          </div>
          {props.comparison.sources?.length ? <p className="lt-comparison-sources"><strong>Sources:</strong> {props.comparison.sources.map((source, index) => <span key={source.href}>{index ? " · " : " "}<a href={source.href} target="_blank" rel="noreferrer">{source.label}</a></span>)}</p> : null}
        </section>
      ) : null}

      {props.officialResources?.length ? (
        <section className="lt-shell lt-official" aria-labelledby="official-resources-title">
          <span>Official ABT &amp; DBPR Resources</span>
          <h2 id="official-resources-title">Verify the current licensing rule</h2>
          <div className="lt-official-grid">
            {props.officialResources.map((item) => (
              <ExternalOrInternalLink href={item.href} key={item.href}>
                <strong>{item.label}</strong><p>{item.description}</p><small>{/^https?:\/\//i.test(item.href) ? "Open official source ↗" : "Open FLLM resource ›"}</small>
              </ExternalOrInternalLink>
            ))}
          </div>
        </section>
      ) : null}

      <section className="lt-shell lt-band">
        <article className="lt-panel"><h2>Quota or non-quota?</h2><p>{props.quotaNote}</p></article>
        <article className="lt-panel lt-key"><h2>The key point</h2><p>{props.keyPoint}</p></article>
      </section>

      {props.imageSrc ? <section className="lt-shell lt-business-visual" aria-label={`${props.code} business example`}><figure className="lt-business-image"><img src={props.imageSrc} alt={props.imageAlt || `${props.code} business setting`} loading="lazy" decoding="async" /></figure></section> : null}

      {(props.seriesClarification || props.investmentNote) ? (
        <section className="lt-shell lt-extra">
          {props.seriesClarification ? <article><h2>Quota license vs. series designation</h2><p>{props.seriesClarification}</p><Link href="/resources/florida-liquor-license-system">See how the Florida liquor license system works →</Link></article> : <div />}
          {props.investmentNote ? <article><h2>Can this quota license be held as an investment?</h2><p>{props.investmentNote}</p><Link href="/resources/florida-liquor-license-system#investment-ownership">Read about inactive and escrow ownership →</Link></article> : null}
        </section>
      ) : null}

      {props.ruleUpdateLinks?.length ? (
        <section className="lt-shell lt-rule-updates" aria-labelledby="rule-updates-title">
          <span>Related FLLM Rule Updates</span><h2 id="rule-updates-title">Current rule changes and operating guidance</h2>
          <div className="lt-rule-grid">{props.ruleUpdateLinks.map((item) => <Link href={item.href} key={item.href}><strong>{item.label}</strong><p>{item.description}</p><small>Read the FLLM update ›</small></Link>)}</div>
        </section>
      ) : null}

      {props.researchLinks?.length ? (
        <section className="lt-shell lt-research" aria-labelledby="related-research-title">
          <span>Connected FLLM Research</span><h2 id="related-research-title">Related laws and market context</h2>
          <div className="lt-research-grid">{props.researchLinks.map((item) => <Link href={item.href} key={item.href}><strong>{item.label}</strong><p>{item.description}</p><small>Read inside FLLM ›</small></Link>)}</div>
        </section>
      ) : null}

      <section className="lt-shell lt-cta">
        <div><p><strong>Official DBPR category:</strong> {props.officialLabel}</p><p>Always confirm the exact series, premises, zoning and transaction requirements before relying on a license for a particular business plan.</p></div>
        <div className="lt-actions"><a className="lt-button outline" href={props.officialHref} target="_blank" rel="noreferrer">Official DBPR Information</a>{props.relatedHref && props.relatedLabel ? <Link className="lt-button gold" href={props.relatedHref}>{props.relatedLabel}</Link> : null}</div>
      </section>

      <div className="lt-shell lt-disclaimer">Florida Liquor License Market provides marketplace and educational information. License privileges, eligibility, transferability, inactive status, active-operation requirements and premises requirements are determined by applicable law and the Florida Division of Alcoholic Beverages and Tobacco. This page is not legal advice.</div>
    </main>
  );
}
