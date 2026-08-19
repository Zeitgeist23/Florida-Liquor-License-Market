import Link from "next/link";

export type LicenseTypeExplainerProps = {
  code: string;
  title: string;
  eyebrow: string;
  definition: string;
  plainEnglish: string;
  sells: string[];
  businesses: string[];
  doesNot: string[];
  quotaNote: string;
  keyPoint: string;
  officialLabel: string;
  officialHref: string;
  relatedHref?: string;
  relatedLabel?: string;
};

export default function LicenseTypeExplainerPage(props: LicenseTypeExplainerProps) {
  return (
    <main className="license-explainer-page">
      <style>{`
        :root{--navy:#061728;--navy2:#0a2136;--gold:#f6a700;--text:#e8eef4;--muted:#b9c7d4}
        *{box-sizing:border-box}
        body{margin:0;background:#04111e;color:var(--text);font-family:Arial,Helvetica,sans-serif}
        .license-explainer-page{min-height:100vh;background:linear-gradient(180deg,#061728 0,#071c2d 38%,#04111e 100%)}
        .lt-shell{width:min(1180px,calc(100% - 40px));margin:0 auto}
        .lt-header{display:flex;align-items:center;justify-content:space-between;gap:24px;padding:20px 0;border-bottom:1px solid rgba(246,167,0,.35)}
        .lt-brand img{width:210px;height:auto;display:block}
        .lt-header nav{display:flex;gap:20px;align-items:center;flex-wrap:wrap;justify-content:flex-end}
        .lt-header nav a{color:#fff;text-decoration:none;font-size:13px;font-weight:700}
        .lt-header nav a:hover{color:var(--gold)}
        .lt-back{display:inline-flex;align-items:center;gap:7px;margin-top:28px;color:#d9e3ec;text-decoration:none;font-size:13px;font-weight:700}
        .lt-back:hover{color:var(--gold)}
        .lt-hero{padding:34px 0 28px}
        .lt-eyebrow{display:inline-block;color:var(--gold);font-size:13px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;margin-bottom:12px}
        .lt-hero h1{margin:0;color:#fff;font:700 clamp(34px,5vw,60px)/1.02 Georgia,serif;max-width:930px}
        .lt-definition{margin:24px 0 0;padding:26px 28px;border:1px solid rgba(246,167,0,.55);border-left:5px solid var(--gold);border-radius:10px;background:rgba(255,255,255,.045);max-width:1050px}
        .lt-definition h2{margin:0 0 12px;color:var(--gold);font-size:20px}
        .lt-definition p{margin:0;color:#fff;font-size:21px;line-height:1.55;font-weight:600}
        .lt-plain{margin:18px 0 0;color:var(--muted);font-size:17px;line-height:1.7;max-width:1000px}
        .lt-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;padding:18px 0 26px}
        .lt-card{background:#081e31;border:1px solid rgba(246,167,0,.28);border-radius:12px;padding:22px;box-shadow:0 15px 35px rgba(0,0,0,.18)}
        .lt-card h2{margin:0 0 14px;color:#fff;font-size:19px}
        .lt-card ul{margin:0;padding-left:20px;color:#dbe5ed;font-size:15px;line-height:1.65}
        .lt-card li+li{margin-top:7px}
        .lt-band{display:grid;grid-template-columns:1.15fr .85fr;gap:18px;padding:0 0 28px}
        .lt-panel{padding:24px;border-radius:12px;background:#0a2136;border:1px solid rgba(255,255,255,.08)}
        .lt-panel h2{margin:0 0 10px;color:var(--gold);font-size:20px}
        .lt-panel p{margin:0;color:#d7e1e9;font-size:16px;line-height:1.7}
        .lt-key{border-color:rgba(246,167,0,.45)}
        .lt-cta{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:24px 0 42px;border-top:1px solid rgba(246,167,0,.25)}
        .lt-cta p{margin:0;color:#cbd7e1;line-height:1.6}
        .lt-actions{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end}
        .lt-button{display:inline-flex;align-items:center;justify-content:center;padding:12px 16px;border-radius:7px;text-decoration:none;font-size:13px;font-weight:900}
        .lt-button.gold{background:var(--gold);color:#061728}
        .lt-button.outline{border:1px solid var(--gold);color:#fff}
        .lt-disclaimer{padding:18px 0 34px;color:#97a9b8;font-size:12px;line-height:1.6}
        @media(max-width:850px){.lt-header{align-items:flex-start}.lt-header nav{display:none}.lt-grid{grid-template-columns:1fr}.lt-band{grid-template-columns:1fr}.lt-cta{align-items:flex-start;flex-direction:column}.lt-actions{justify-content:flex-start}.lt-definition p{font-size:18px}}
      `}</style>

      <header className="lt-header lt-shell">
        <Link className="lt-brand" href="/" aria-label="Florida Liquor License Market home">
          <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
        </Link>
        <nav aria-label="License type navigation">
          <Link href="/resources/florida-liquor-license-types">All License Types</Link>
          <Link href="/listings">Licenses for Sale</Link>
          <Link href="/sell-your-license">Sell a License</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      <section className="lt-shell lt-hero">
        <Link className="lt-back" href="/resources/florida-liquor-license-types">← All Florida liquor license types</Link>
        <div style={{marginTop:24}}>
          <span className="lt-eyebrow">{props.eyebrow}</span>
          <h1>{props.title}</h1>
        </div>
        <div className="lt-definition">
          <h2>What is a {props.code} license?</h2>
          <p>{props.definition}</p>
        </div>
        <p className="lt-plain"><strong>In plain English:</strong> {props.plainEnglish}</p>
      </section>

      <section className="lt-shell lt-grid" aria-label={`${props.code} license summary`}>
        <article className="lt-card">
          <h2>What it can sell</h2>
          <ul>{props.sells.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article className="lt-card">
          <h2>Businesses that commonly use it</h2>
          <ul>{props.businesses.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article className="lt-card">
          <h2>What it does not automatically allow</h2>
          <ul>{props.doesNot.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
      </section>

      <section className="lt-shell lt-band">
        <article className="lt-panel">
          <h2>Quota or non-quota?</h2>
          <p>{props.quotaNote}</p>
        </article>
        <article className="lt-panel lt-key">
          <h2>The key point</h2>
          <p>{props.keyPoint}</p>
        </article>
      </section>

      <section className="lt-shell lt-cta">
        <div>
          <p><strong>Official DBPR category:</strong> {props.officialLabel}</p>
          <p>Always confirm the exact series, premises, zoning and transaction requirements before relying on a license for a particular business plan.</p>
        </div>
        <div className="lt-actions">
          <a className="lt-button outline" href={props.officialHref} target="_blank" rel="noreferrer">Official DBPR Information</a>
          {props.relatedHref && props.relatedLabel ? <Link className="lt-button gold" href={props.relatedHref}>{props.relatedLabel}</Link> : null}
        </div>
      </section>

      <div className="lt-shell lt-disclaimer">
        Florida Liquor License Market provides marketplace and educational information. License privileges, eligibility, transferability and premises requirements are determined by applicable law and the Florida Division of Alcoholic Beverages and Tobacco. This page is not legal advice.
      </div>
    </main>
  );
}
