"use client";

import { FormEvent, useMemo, useState } from "react";

type LookupResult = {
  licenseNumber: string;
  ownerName: string;
  dba: string;
  series: string;
  modifier: string;
  county: string;
  city: string;
  primaryStatus: string;
  secondaryStatus: string;
  expirationDate: string;
};

type Classification = {
  label: string;
  shortLabel: string;
  tone: "quota" | "special" | "unknown";
  note: string;
};

function classifyLicense(seriesValue: string, modifierValue: string): Classification {
  const series = seriesValue.trim().toUpperCase();
  const modifier = modifierValue.trim().toUpperCase();
  const specialModifier = /(SFS|SRX|SPECIAL|HOTEL|MOTEL|CLUB|GOLF|AIRPORT|THEME|CATER|CIVIC|PERFORM|BOWLING|RACE|VESSEL)/i.test(modifier);

  if (["3PS", "3APS", "3BPS", "3CPS", "3DPS"].includes(series)) {
    return {
      label: `${series} Quota / Package Store`,
      shortLabel: "Quota License",
      tone: "quota",
      note: "This is a county-population quota package-store series in the DBPR retail-beverage extract.",
    };
  }

  if (["4COP", "5COP", "6COP", "7COP", "8COP"].includes(series)) {
    if (specialModifier) {
      return {
        label: `${series}${modifier ? ` ${modifier}` : ""} — Special Classification`,
        shortLabel: "Special / Non-Quota",
        tone: "special",
        note: "The DBPR extract carries a special modifier, so FLLM does not treat this record as a standard quota license.",
      };
    }
    return {
      label: `${series} Quota`,
      shortLabel: "Quota License",
      tone: "quota",
      note: "The DBPR rank is a county-population COP quota series and the retail extract does not show a special-license modifier. Confirm the Special Qualifications section on the official DBPR detail record for transaction due diligence.",
    };
  }

  if (modifier) {
    return {
      label: `${series || "Retail Beverage"} ${modifier}`,
      shortLabel: "Special Classification",
      tone: "special",
      note: "This record carries a DBPR modifier and is not automatically treated by FLLM as a quota license.",
    };
  }

  return {
    label: series || "Retail Beverage",
    shortLabel: "Classification Not Confirmed",
    tone: "unknown",
    note: "FLLM cannot confirm quota status from the DBPR rank and modifier alone. Review the official DBPR Special Qualifications section before relying on the classification.",
  };
}

export default function LicenseLookupClient() {
  const [licenseNumber, setLicenseNumber] = useState("");
  const [result, setResult] = useState<LookupResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const classification = useMemo(
    () => result ? classifyLicense(result.series, result.modifier) : null,
    [result],
  );

  async function lookup(event: FormEvent) {
    event.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const response = await fetch(`/api/license-fees/lookup?licenseNumber=${encodeURIComponent(licenseNumber)}`);
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "License lookup failed.");
      if (!payload.result) throw new Error("No matching DBPR retail alcoholic-beverage license was found.");
      setResult(payload.result);
    } catch (lookupError) {
      setError(lookupError instanceof Error ? lookupError.message : "License lookup failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="lookup-shell">
      <section className="lookup-search-card" aria-labelledby="lookup-heading">
        <div>
          <span className="lookup-kicker">Florida DBPR public-record search</span>
          <h1 id="lookup-heading">Florida Liquor License Lookup</h1>
          <p>Search a Florida alcoholic-beverage license number and see its current DBPR record together with an FLLM quota/special-license classification.</p>
        </div>
        <form onSubmit={lookup} className="lookup-form">
          <label htmlFor="license-number">DBPR license number</label>
          <div>
            <input
              id="license-number"
              value={licenseNumber}
              onChange={(event) => setLicenseNumber(event.target.value.toUpperCase())}
              placeholder="Example: BEV1600728"
              autoComplete="off"
              required
            />
            <button type="submit" disabled={loading}>{loading ? "Searching…" : "Search License"}</button>
          </div>
          <small>Uses DBPR&apos;s public retail alcoholic-beverage license extract.</small>
        </form>
      </section>

      {error && <div className="lookup-error" role="alert">{error}</div>}

      {result && classification && (
        <section className="lookup-result" aria-live="polite">
          <div className="lookup-result-top">
            <div>
              <span className="lookup-kicker">Search result</span>
              <h2>{result.dba !== "Not listed" ? result.dba : result.ownerName}</h2>
              <p>{result.ownerName}</p>
            </div>
            <div className={`lookup-classification ${classification.tone}`}>
              <span>License Classification</span>
              <strong>{classification.shortLabel}</strong>
              <b>{classification.label}</b>
            </div>
          </div>

          <div className="lookup-grid">
            <div><span>License</span><strong>{result.licenseNumber}</strong></div>
            <div><span>DBPR Rank</span><strong>{result.series || "Not listed"}</strong></div>
            <div><span>DBPR Modifier</span><strong>{result.modifier || "None shown"}</strong></div>
            <div><span>County</span><strong>{result.county}</strong></div>
            <div><span>City</span><strong>{result.city || "Not listed"}</strong></div>
            <div><span>Primary Status</span><strong>{result.primaryStatus}</strong></div>
            <div><span>Secondary Status</span><strong>{result.secondaryStatus}</strong></div>
            <div><span>Expiration</span><strong>{result.expirationDate || "Not published"}</strong></div>
          </div>

          <div className="lookup-classification-note">
            <strong>How FLLM classified this record</strong>
            <p>{classification.note}</p>
          </div>

          <div className="lookup-actions">
            <a href="https://www.myfloridalicense.com/wl11.asp?mode=0&SID=" target="_blank" rel="noreferrer">Verify on Official DBPR ↗</a>
            <a href="/resources/florida-liquor-license-types">Compare License Types</a>
            {classification.tone === "quota" && <a href={`/listings?county=${encodeURIComponent(result.county)}`}>View {result.county} Marketplace</a>}
          </div>

          <aside className="lookup-warning">
            <strong>Public-record information, not a transfer certification.</strong>
            <p>A current or active status does not establish seller authority, transferability, lien status, or regulatory approval. Confirm material information directly with DBPR and qualified transaction professionals.</p>
          </aside>
        </section>
      )}

      <style>{`
        .lookup-shell{width:min(1240px,calc(100% - 40px));margin:0 auto;padding:44px 0 70px}
        .lookup-search-card{display:grid;grid-template-columns:minmax(0,1fr) minmax(360px,.8fr);gap:42px;align-items:center;padding:34px;border:1px solid #cfd6dc;border-top:4px solid #f6a700;border-radius:12px;background:#fff;box-shadow:0 18px 45px rgba(7,24,39,.10)}
        .lookup-kicker{display:block;color:#ad6c00;font-size:12px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
        .lookup-search-card h1,.lookup-result h2{margin:7px 0 10px;color:#071827;font-family:Georgia,'Times New Roman',serif;line-height:1.05}
        .lookup-search-card h1{font-size:clamp(38px,5vw,58px)}
        .lookup-search-card p{margin:0;color:#51616d;font-size:16px;line-height:1.7}
        .lookup-form{padding:22px;border:1px solid #d7dde1;border-radius:9px;background:#f7f8f7}
        .lookup-form label{display:block;margin-bottom:8px;color:#071827;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.07em}
        .lookup-form>div{display:flex;gap:10px}
        .lookup-form input{flex:1;min-width:0;height:48px;padding:0 14px;border:1px solid #b9c4cc;border-radius:5px;background:#fff;color:#071827;font-size:15px}
        .lookup-form button{min-height:48px;padding:0 18px;border:1px solid #d98d00;border-radius:5px;background:linear-gradient(145deg,#ffc32d,#ed9200);color:#071827;font-weight:900;text-transform:uppercase;cursor:pointer}
        .lookup-form button:disabled{opacity:.6;cursor:wait}
        .lookup-form small{display:block;margin-top:8px;color:#71808b;font-size:11px}
        .lookup-error{margin-top:20px;padding:16px 18px;border-left:4px solid #b33030;background:#fff1f1;color:#7a2020;font-weight:700}
        .lookup-result{margin-top:28px;padding:30px;border:1px solid #cad4db;border-radius:12px;background:#fff;box-shadow:0 18px 45px rgba(7,24,39,.08)}
        .lookup-result-top{display:flex;justify-content:space-between;gap:28px;align-items:flex-start;padding-bottom:22px;border-bottom:1px solid #dbe1e5}
        .lookup-result h2{font-size:clamp(30px,4vw,44px)}
        .lookup-result-top>div:first-child>p{margin:0;color:#5e6d78;font-size:14px}
        .lookup-classification{min-width:270px;padding:17px 18px;border:1px solid;border-radius:9px}
        .lookup-classification span,.lookup-classification strong,.lookup-classification b{display:block}
        .lookup-classification span{font-size:10px;font-weight:900;letter-spacing:.09em;text-transform:uppercase}
        .lookup-classification strong{margin:5px 0 3px;font-family:Georgia,'Times New Roman',serif;font-size:23px}
        .lookup-classification b{font-size:12px}
        .lookup-classification.quota{border-color:#c98b00;background:#fff8df;color:#6a4300}.lookup-classification.quota span{color:#ad6c00}
        .lookup-classification.special{border-color:#597087;background:#eef5fa;color:#17334b}.lookup-classification.special span{color:#3c627f}
        .lookup-classification.unknown{border-color:#8b969e;background:#f4f6f7;color:#394650}.lookup-classification.unknown span{color:#66747d}
        .lookup-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0;margin-top:22px;border:1px solid #dce2e6;border-radius:8px;overflow:hidden}
        .lookup-grid>div{padding:17px 18px;border-right:1px solid #e1e6e9;border-bottom:1px solid #e1e6e9;background:#fafbfa}.lookup-grid>div:nth-child(4n){border-right:0}.lookup-grid>div:nth-last-child(-n+4){border-bottom:0}
        .lookup-grid span{display:block;margin-bottom:5px;color:#d26500;font-size:10px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}.lookup-grid strong{color:#0b263d;font-size:14px}
        .lookup-classification-note{margin-top:20px;padding:17px 18px;border-left:4px solid #f6a700;background:#f8f4e8}.lookup-classification-note strong{color:#071827}.lookup-classification-note p{margin:6px 0 0;color:#4f5d67;line-height:1.6}
        .lookup-actions{display:flex;flex-wrap:wrap;gap:11px;margin-top:20px}.lookup-actions a{display:inline-flex;min-height:42px;align-items:center;padding:0 14px;border:1px solid #cf8700;border-radius:5px;color:#8b5500;font-size:12px;font-weight:900;text-decoration:none}.lookup-actions a:first-child{color:#071827;background:linear-gradient(145deg,#ffc32d,#ed9200)}
        .lookup-warning{margin-top:22px;padding:17px 18px;border-left:3px solid #f6a700;background:#fff7df}.lookup-warning strong{color:#071827}.lookup-warning p{margin:6px 0 0;color:#475862;font-size:13px;line-height:1.6}
        @media(max-width:900px){.lookup-search-card{grid-template-columns:1fr}.lookup-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.lookup-grid>div:nth-child(4n){border-right:1px solid #e1e6e9}.lookup-grid>div:nth-child(2n){border-right:0}.lookup-grid>div:nth-last-child(-n+4){border-bottom:1px solid #e1e6e9}.lookup-grid>div:nth-last-child(-n+2){border-bottom:0}.lookup-result-top{display:grid}.lookup-classification{min-width:0}}
        @media(max-width:620px){.lookup-shell{width:min(100% - 24px,1240px);padding-top:24px}.lookup-search-card,.lookup-result{padding:20px}.lookup-form>div{display:grid}.lookup-grid{grid-template-columns:1fr}.lookup-grid>div{border-right:0!important;border-bottom:1px solid #e1e6e9!important}.lookup-grid>div:last-child{border-bottom:0!important}}
      `}</style>
    </div>
  );
}
