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
  researchLinks?: Array<{ href: string; label: string; description: string }>;
  seriesClarification?: string;
  investmentNote?: string;
  imageSrc?: string;
  imageAlt?: string;
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
        .lt-business-visual{padding:2px 0 32px}
        .lt-business-image{position:relative;margin:0;overflow:hidden;border:1px solid rgba(246,167,0,.58);border-radius:14px;background:#071927;box-shadow:0 20px 48px rgba(0,0,0,.24)}
        .lt-business-image img{display:block;width:100%;height:auto;max-height:560px;aspect-ratio:16/7;object-fit:cover;object-position:center}
        .lt-business-image::after{content:"";position:absolute;inset:0;box-shadow:inset 0 0 0 1px rgba(255,255,255,.06);pointer-events:none}
        .lt-extra{display:grid;grid-template-columns:1fr 1fr;gap:18px;padding:0 0 28px}
        .lt-extra article{padding:25px;border:1px solid rgba(246,167,0,.38);border-radius:12px;background:linear-gradient(145deg,#0a2136,#071927)}
        .lt-extra article:last-child{border-left:4px solid var(--gold)}
        .lt-extra h2{margin:0 0 10px;color:#fff;font-size:21px}
        .lt-extra p{margin:0;color:#d7e1e9;font-size:15px;line-height:1.72}
        .lt-extra a{display:inline-block;margin-top:12px;color:var(--gold);font-size:12px;font-weight:900;text-decoration:none}
        .lt-research{padding:0 0 34px}.lt-research>span{color:var(--gold);font-size:11px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}.lt-research h2{margin:8px 0 16px;color:#fff;font:700 28px/1.15 Georgia,serif}.lt-research-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.lt-research-grid a{display:flex;flex-direction:column;min-height:150px;padding:19px;border:1px solid rgba(246,167,0,.38);border-radius:10px;background:#081e31;color:inherit;text-decoration:none;transition:transform .18s ease,border-color .18s ease}.lt-research-grid a:hover,.lt-research-grid a:focus-visible{transform:translateY(-3px);border-color:var(--gold);outline:none}.lt-research-grid strong{color:#fff;font-size:17px;line-height:1.3}.lt-research-grid p{margin:9px 0 13px;color:var(--muted);font-size:13px;line-height:1.55}.lt-research-grid small{margin-top:auto;color:var(--gold);font-weight:900;text-transform:uppercase}
        .lt-cta{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:24px 0 42px;border-top:1px solid rgba(246,167,0,.25)}
        .lt-cta p{margin:0;color:#cbd7e1;line-height:1.6}
        .lt-actions{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end}
        .lt-button{display:inline-flex;align-items:center;justify-content:center;padding:12px 16px;border-radius:7px;text-decoration:none;font-size:13px;font-weight:900}
        .lt-button.gold{background:var(--gold);color:#061728}
        .lt-button.outline{border:1px solid var(--gold);color:#fff}
        .lt-disclaimer{padding:18px 0 34px;color:#97a9b8;font-size:12px;line-height:1.6}
        @media(max-width:850px){.lt-header{align-items:flex-start}.lt-header nav{display:none}.lt-grid,.lt-extra,.lt-research-grid{grid-template-columns:1fr}.lt-research-grid a{min-height:0}.lt-band{grid-template-columns:1fr}.lt-business-image img{max-height:none;aspect-ratio:4/3}.lt-cta{align-items:flex-start;flex-direction:column}.lt-actions{justify-content:flex-start}.lt-definition p{font-size:18px}}
      `}</style>

      <header className="lt-header lt-shell">
        <Link className="lt-brand" href="/" aria-label="Florida Liquor License Market home">
          <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
        </Link>
        <nav aria-label="License type navigation">
          <Link href="/resources/florida-liquor-license-types">All License Types</Link>
          <Link href="/resources/florida-liquor-license-system">How Florida Licensing Works</Link>
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

      {props.imageSrc ? (
        <section className="lt-shell lt-business-visual" aria-label={`${props.code} business example`}>
          <figure className="lt-business-image">
            <img
              src={props.imageSrc}
              alt={props.imageAlt || `${props.code} business setting`}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </section>
      ) : null}

      {(props.seriesClarification || props.investmentNote) ? (
        <section className="lt-shell lt-extra">
          {props.seriesClarification ? (
            <article>
              <h2>Quota license vs. series designation</h2>
              <p>{props.seriesClarification}</p>
              <Link href="/resources/florida-liquor-license-system">See how the Florida liquor license system works →</Link>
            </article>
          ) : <div />}
          {props.investmentNote ? (
            <article>
              <h2>Can this quota license be held as an investment?</h2>
              <p>{props.investmentNote}</p>
              <Link href="/resources/florida-liquor-license-system#investment-ownership">Read about inactive and escrow ownership →</Link>
            </article>
          ) : null}
        </section>
      ) : null}

      {props.researchLinks && props.researchLinks.length > 0 ? (
        <section className="lt-shell lt-research" aria-labelledby="related-research-title">
          <span>Connected FLLM Research</span>
          <h2 id="related-research-title">Related laws and market context</h2>
          <div className="lt-research-grid">
            {props.researchLinks.map((item) => (
              <Link href={item.href} key={item.href}>
                <strong>{item.label}</strong>
                <p>{item.description}</p>
                <small>Read inside FLLM ›</small>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

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
        Florida Liquor License Market provides marketplace and educational information. License privileges, eligibility, transferability, inactive status, active-operation requirements and premises requirements are determined by applicable law and the Florida Division of Alcoholic Beverages and Tobacco. This page is not legal advice.
      </div>
    </main>
  );
}
