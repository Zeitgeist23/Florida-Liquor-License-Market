"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import AdminCodeLogin from "@/components/AdminCodeLogin";

type AppraisalComparable = {
  reference: string;
  county: string;
  licenseType: string;
  price: number;
  sourceName?: string | null;
  sourceUrl?: string | null;
  tier: "A" | "B" | "C" | "D";
  evidenceType: "verified_transaction" | "active_asking_price" | "historical_listing" | "supplemental_market";
  included: boolean;
  note?: string | null;
};

type AppraisalCase = {
  id: string;
  caseRef: string;
  orderRef: string | null;
  methodologyVersion: string;
  status: string;
  clientName: string | null;
  intendedUse: string | null;
  institutionName: string | null;
  effectiveDate: string | null;
  licenseNumber: string;
  licenseType: string | null;
  ownerName: string | null;
  dba: string | null;
  county: string | null;
  city: string | null;
  series: string | null;
  modifier: string | null;
  primaryStatus: string | null;
  secondaryStatus: string | null;
  expirationDate: string | null;
  dbprVerifiedAt: string | null;
  marketSnapshot: Record<string, unknown>;
  comparables: AppraisalComparable[];
  automatedValue: number | null;
  automatedValueBasis: string | null;
  reviewerAdjustment: number;
  adjustmentReason: string | null;
  finalValue: number | null;
  reviewerNotes: string | null;
  reviewStatus: string;
  approvedAt: string | null;
  issuedAt: string | null;
  revision: number;
  createdAt: string;
  updatedAt: string;
};

type QcItem = {
  id: string;
  label: string;
  passed: boolean;
  detail: string;
  blocking: boolean;
};

type CaseDetail = {
  appraisalCase: AppraisalCase;
  lienSearch: Record<string, unknown> | null;
  qc: {
    items: QcItem[];
    passed: number;
    total: number;
    blockingFailures: string[];
    canApprove: boolean;
  };
  events: Array<{
    id: number;
    event_type: string;
    event_payload: Record<string, unknown>;
    created_at: string;
  }>;
  tinyFishConfigured: boolean;
};

type Tab = "overview" | "liens" | "comparables" | "valuation" | "review";

function money(value: number | null | undefined) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "Not determined";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function statusLabel(value: string) {
  return value.replaceAll("_", " ").replace(/\b\w/g, (character) => character.toUpperCase());
}

function lienValue(lien: Record<string, unknown> | null, key: string, fallback = "Not recorded") {
  const value = lien?.[key];
  return typeof value === "string" && value ? value : fallback;
}

function filingRows(lien: Record<string, unknown> | null) {
  const result = lien?.ucc_result && typeof lien.ucc_result === "object"
    ? (lien.ucc_result as Record<string, unknown>)
    : {};
  const searches = Array.isArray(result.searches)
    ? (result.searches as Array<Record<string, unknown>>)
    : [];

  return searches.flatMap((search) => {
    const payload = search.payload && typeof search.payload === "object"
      ? (search.payload as Record<string, unknown>)
      : {};
    return Array.isArray(payload.filings)
      ? (payload.filings as Array<Record<string, unknown>>)
      : [];
  });
}

export default function AdminAppraisalsClient() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [cases, setCases] = useState<AppraisalCase[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [detail, setDetail] = useState<CaseDetail | null>(null);
  const [tab, setTab] = useState<Tab>("overview");
  const [loading, setLoading] = useState(false);
  const [working, setWorking] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [newLicense, setNewLicense] = useState("");
  const [newClient, setNewClient] = useState("");
  const [newUse, setNewUse] = useState("Loan Underwriting");
  const [newInstitution, setNewInstitution] = useState("");
  const [newEffectiveDate, setNewEffectiveDate] = useState(new Date().toISOString().slice(0, 10));

  const [priorDebtor, setPriorDebtor] = useState("");
  const [abtStatus, setAbtStatus] = useState("ready_to_request");
  const [abtSummary, setAbtSummary] = useState("");

  const [reviewerAdjustment, setReviewerAdjustment] = useState("0");
  const [adjustmentReason, setAdjustmentReason] = useState("");
  const [reviewerNotes, setReviewerNotes] = useState("");
  const [clientName, setClientName] = useState("");
  const [intendedUse, setIntendedUse] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");

  const [manualReference, setManualReference] = useState("");
  const [manualPrice, setManualPrice] = useState("");
  const [manualTier, setManualTier] = useState("A");
  const [manualEvidence, setManualEvidence] = useState("verified_transaction");
  const [manualSource, setManualSource] = useState("");
  const [manualUrl, setManualUrl] = useState("");
  const [manualNote, setManualNote] = useState("");

  const loadCases = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/appraisals", { cache: "no-store" });
      if (response.status === 401) {
        setAuthenticated(false);
        setCases([]);
        setDetail(null);
        return;
      }
      const payload = (await response.json()) as { cases?: AppraisalCase[]; error?: string };
      if (!response.ok) throw new Error(payload.error || "Could not load appraisal workbench.");
      setAuthenticated(true);
      const nextCases = payload.cases || [];
      setCases(nextCases);
      setSelectedId((current) => current || nextCases[0]?.id || "");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load appraisal workbench.");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadDetail = useCallback(async (id: string) => {
    if (!id) {
      setDetail(null);
      return;
    }
    setWorking("refresh");
    setError("");
    try {
      const response = await fetch(`/api/admin/appraisals/${id}`, { cache: "no-store" });
      if (response.status === 401) {
        setAuthenticated(false);
        return;
      }
      const payload = (await response.json()) as CaseDetail & { error?: string };
      if (!response.ok) throw new Error(payload.error || "Could not load appraisal case.");
      setDetail(payload);
      const item = payload.appraisalCase;
      setReviewerAdjustment(String(item.reviewerAdjustment || 0));
      setAdjustmentReason(item.adjustmentReason || "");
      setReviewerNotes(item.reviewerNotes || "");
      setClientName(item.clientName || "");
      setIntendedUse(item.intendedUse || "");
      setInstitutionName(item.institutionName || "");
      setEffectiveDate(item.effectiveDate || "");
      setAbtStatus(lienValue(payload.lienSearch, "abt_status", "ready_to_request"));
      setAbtSummary(lienValue(payload.lienSearch, "abt_result_summary", ""));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load appraisal case.");
    } finally {
      setWorking("");
    }
  }, []);

  useEffect(() => {
    void loadCases();
  }, [loadCases]);

  useEffect(() => {
    if (selectedId) void loadDetail(selectedId);
  }, [selectedId, loadDetail]);

  async function createCase(event: React.FormEvent) {
    event.preventDefault();
    setWorking("create");
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/admin/appraisals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          licenseNumber: newLicense,
          clientName: newClient,
          intendedUse: newUse,
          institutionName: newInstitution,
          effectiveDate: newEffectiveDate,
        }),
      });
      const payload = (await response.json()) as { appraisalCase?: AppraisalCase; error?: string };
      if (!response.ok || !payload.appraisalCase) {
        throw new Error(payload.error || "Could not create appraisal case.");
      }
      setMessage(`${payload.appraisalCase.caseRef} created and DBPR-verified.`);
      setNewLicense("");
      await loadCases();
      setSelectedId(payload.appraisalCase.id);
      setTab("overview");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not create appraisal case.");
    } finally {
      setWorking("");
    }
  }

  async function runAction(action: string, values: Record<string, unknown> = {}) {
    if (!selectedId) return null;
    setWorking(action);
    setError("");
    setMessage("");
    try {
      const response = await fetch(`/api/admin/appraisals/${selectedId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...values }),
      });
      const payload = (await response.json()) as Record<string, unknown> & {
        error?: string;
        qc?: CaseDetail["qc"];
      };
      if (!response.ok) {
        if (payload.qc) setDetail((current) => current ? { ...current, qc: payload.qc! } : current);
        throw new Error(payload.error || "Appraisal action failed.");
      }
      await loadCases();
      await loadDetail(selectedId);
      return payload;
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Appraisal action failed.");
      return null;
    } finally {
      setWorking("");
    }
  }

  async function startLienResearch() {
    const payload = await runAction("run_liens", { additionalDebtorName: priorDebtor });
    if (payload) {
      setMessage("UCC research started. Refresh this case to collect completed TinyFish results.");
      setTab("liens");
    }
  }

  async function syncLiens() {
    const payload = await runAction("sync_liens");
    if (payload) setMessage("Lien research status refreshed.");
  }

  async function buildMarket() {
    const payload = await runAction("build_market");
    if (payload) {
      setMessage("Standard comparable set assembled under the current methodology.");
      setTab("comparables");
    }
  }

  async function saveAbtStatus() {
    const payload = await runAction("set_abt_status", {
      abtStatus,
      abtResultSummary: abtSummary,
    });
    if (payload) setMessage("Official ABT-6023 status saved to the workfile.");
  }

  function toggleComparable(index: number) {
    if (!detail) return;
    const comparables = detail.appraisalCase.comparables.map((item, currentIndex) =>
      currentIndex === index ? { ...item, included: !item.included } : item,
    );
    setDetail({
      ...detail,
      appraisalCase: { ...detail.appraisalCase, comparables },
    });
  }

  async function saveValuation() {
    if (!detail) return;
    const payload = await runAction("save_valuation", {
      comparables: detail.appraisalCase.comparables,
      reviewerAdjustment,
      adjustmentReason,
      reviewerNotes,
      clientName,
      intendedUse,
      institutionName,
      effectiveDate,
    });
    if (payload) {
      setMessage("Valuation reconciliation saved; quality-control gates recalculated.");
      setTab("review");
    }
  }

  async function addManualComparable(event: React.FormEvent) {
    event.preventDefault();
    const payload = await runAction("add_comparable", {
      reference: manualReference,
      price: manualPrice,
      tier: manualTier,
      evidenceType: manualEvidence,
      sourceName: manualSource,
      sourceUrl: manualUrl,
      note: manualNote,
      included: true,
    });
    if (payload) {
      setManualReference("");
      setManualPrice("");
      setManualSource("");
      setManualUrl("");
      setManualNote("");
      setMessage("Reviewer comparable added to the workfile.");
    }
  }

  async function approveCase() {
    const payload = await runAction("approve");
    if (payload) setMessage("Appraisal approved. It can now be issued.");
  }

  async function issueCase() {
    const payload = await runAction("issue");
    if (payload) setMessage("Appraisal issued and locked as an immutable workfile snapshot.");
  }

  const selected = detail?.appraisalCase || null;
  const filings = useMemo(() => filingRows(detail?.lienSearch || null), [detail]);
  const includedComparables = selected?.comparables.filter((item) => item.included) || [];

  if (authenticated === false) {
    return <AdminCodeLogin title="FLLM Appraisal Workbench" onAuthenticated={loadCases} />;
  }

  if (authenticated === null) {
    return <main className="appraisal-admin-shell"><div className="appraisal-loading">Loading appraisal workbench…</div></main>;
  }

  return (
    <main className="appraisal-admin-shell">
      <header className="appraisal-admin-header">
        <div>
          <span>Private FLLM Administration</span>
          <h1>Appraisal Workbench</h1>
          <p>Standardized case creation, DBPR verification, lien research, market evidence, valuation reconciliation, QC and final report issuance.</p>
        </div>
        <nav>
          <Link href="/admin/leads">Lead Desk</Link>
          <Link href="/admin/lien-search">Lien Search</Link>
          <Link href="/florida-liquor-license-appraisal">Public Appraisal Page</Link>
        </nav>
      </header>

      {error && <div className="appraisal-error">{error}</div>}
      {message && <div className="appraisal-success">{message}</div>}

      <section className="appraisal-create-panel">
        <div>
          <span>New formal workfile</span>
          <h2>Create an appraisal case</h2>
          <p>The license number is immediately checked against DBPR. Only supported transferable quota-series subjects enter the formal appraisal workflow.</p>
        </div>
        <form onSubmit={createCase}>
          <label><span>DBPR License Number</span><input value={newLicense} onChange={(event) => setNewLicense(event.target.value.toUpperCase())} placeholder="BEV5812173" required /></label>
          <label><span>Client</span><input value={newClient} onChange={(event) => setNewClient(event.target.value)} placeholder="SouthState Bank" required /></label>
          <label>
            <span>Intended Use</span>
            <select value={newUse} onChange={(event) => setNewUse(event.target.value)}>
              <option>Loan Underwriting</option>
              <option>Refinance / Collateral Review</option>
              <option>Purchase or Sale Decision</option>
              <option>Estate or Legal Matter</option>
              <option>Financial Reporting</option>
              <option>Other</option>
            </select>
          </label>
          <label><span>Institution / Borrower</span><input value={newInstitution} onChange={(event) => setNewInstitution(event.target.value)} placeholder="Optional" /></label>
          <label><span>Effective Date</span><input type="date" value={newEffectiveDate} onChange={(event) => setNewEffectiveDate(event.target.value)} required /></label>
          <button disabled={working === "create"}>{working === "create" ? "Creating…" : "Create & Verify DBPR"}</button>
        </form>
      </section>

      <section className="appraisal-workspace">
        <aside className="appraisal-case-list">
          <div className="appraisal-case-list-title">
            <div><span>Workfiles</span><strong>{cases.length}</strong></div>
            <button type="button" onClick={() => void loadCases()} disabled={loading}>Refresh</button>
          </div>
          {cases.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => { setSelectedId(item.id); setTab("overview"); }}
              className={item.id === selectedId ? "active" : ""}
            >
              <span>{item.status}</span>
              <strong>{item.dba || item.ownerName || item.licenseNumber}</strong>
              <small>{item.licenseNumber} · {item.county}</small>
              <em>{item.caseRef}</em>
            </button>
          ))}
          {!cases.length && <p>No appraisal cases yet.</p>}
        </aside>

        <section className="appraisal-case-detail">
          {!selected ? (
            <div className="appraisal-empty">Create or select an appraisal case.</div>
          ) : (
            <>
              <header className="appraisal-case-head">
                <div>
                  <span>{selected.caseRef}</span>
                  <h2>{selected.dba || selected.ownerName}</h2>
                  <p>{selected.licenseNumber} · {selected.county} · {selected.licenseType}</p>
                </div>
                <div className="appraisal-case-status">
                  <b>{selected.status}</b>
                  <small>{selected.methodologyVersion}</small>
                </div>
              </header>

              <nav className="appraisal-tabs">
                {([
                  ["overview", "Overview"],
                  ["liens", "Liens"],
                  ["comparables", "Comparables"],
                  ["valuation", "Valuation"],
                  ["review", "Review & Report"],
                ] as Array<[Tab, string]>).map(([key, label]) => (
                  <button key={key} type="button" className={tab === key ? "active" : ""} onClick={() => setTab(key)}>{label}</button>
                ))}
              </nav>

              {tab === "overview" && (
                <section className="appraisal-tab-panel">
                  <div className="appraisal-metrics">
                    <article><span>DBPR</span><strong>{selected.dbprVerifiedAt ? "Verified" : "Pending"}</strong></article>
                    <article><span>Series</span><strong>{selected.series || "—"}</strong></article>
                    <article><span>Status</span><strong>{selected.primaryStatus || "—"} / {selected.secondaryStatus || "—"}</strong></article>
                    <article><span>Final Value</span><strong>{money(selected.finalValue)}</strong></article>
                  </div>
                  <div className="appraisal-overview-grid">
                    <article><span>Owner of Record</span><strong>{selected.ownerName}</strong></article>
                    <article><span>DBA</span><strong>{selected.dba}</strong></article>
                    <article><span>County</span><strong>{selected.county}</strong></article>
                    <article><span>City</span><strong>{selected.city || "Not listed"}</strong></article>
                    <article><span>Effective Date</span><strong>{selected.effectiveDate || "Not set"}</strong></article>
                    <article><span>Client</span><strong>{selected.clientName || "Not set"}</strong></article>
                    <article><span>Intended Use</span><strong>{selected.intendedUse || "Not set"}</strong></article>
                    <article><span>Institution</span><strong>{selected.institutionName || "Not set"}</strong></article>
                  </div>
                  <div className="appraisal-stage-actions">
                    <button type="button" onClick={() => void startLienResearch()} disabled={Boolean(working)}>
                      Start Lien Research
                    </button>
                    <button type="button" onClick={() => void buildMarket()} disabled={Boolean(working)}>
                      Build Comparable Set
                    </button>
                  </div>
                </section>
              )}

              {tab === "liens" && (
                <section className="appraisal-tab-panel">
                  <div className="appraisal-section-heading">
                    <div><span>Stage 3</span><h3>Encumbrance Research</h3></div>
                    <button type="button" onClick={() => void syncLiens()} disabled={Boolean(working)}>Refresh Research</button>
                  </div>

                  <div className="appraisal-lien-controls">
                    <label><span>Prior Owner / Additional Debtor</span><input value={priorDebtor} onChange={(event) => setPriorDebtor(event.target.value)} placeholder="Optional additional debtor name" /></label>
                    <button type="button" onClick={() => void startLienResearch()} disabled={Boolean(working)}>Run UCC Research</button>
                    <a href={`/resources/forms/abt-6023?licenseNumber=${encodeURIComponent(selected.licenseNumber)}&ownerName=${encodeURIComponent(selected.ownerName || "")}&businessName=${encodeURIComponent(selected.dba || "")}`} target="_blank" rel="noreferrer">Prepare ABT-6023</a>
                  </div>

                  <div className="appraisal-lien-status">
                    <article><span>UCC Status</span><strong>{statusLabel(lienValue(detail?.lienSearch || null, "ucc_status"))}</strong></article>
                    <article><span>ABT Status</span><strong>{statusLabel(lienValue(detail?.lienSearch || null, "abt_status"))}</strong></article>
                    <article><span>Filings Returned</span><strong>{filings.length}</strong></article>
                  </div>

                  {filings.length > 0 && (
                    <div className="appraisal-filing-list">
                      {filings.map((filing, index) => (
                        <article key={String(filing.filing_number || filing.filingNumber || index)}>
                          <strong>{String(filing.filing_number || filing.filingNumber || `Filing ${index + 1}`)}</strong>
                          <span>{String(filing.filing_date || filing.filingDate || "")}</span>
                          <p>Secured party: {Array.isArray(filing.secured_parties) ? filing.secured_parties.join(", ") : String(filing.secured_party || "Not returned")}</p>
                          <p>Collateral: {String(filing.collateral_summary || "Review source document")}</p>
                          {Boolean(filing.source_url) && <a href={String(filing.source_url)} target="_blank" rel="noreferrer">Source ↗</a>}
                        </article>
                      ))}
                    </div>
                  )}

                  <div className="appraisal-abt-review">
                    <label>
                      <span>Official ABT-6023 Status</span>
                      <select value={abtStatus} onChange={(event) => setAbtStatus(event.target.value)}>
                        <option value="ready_to_request">Ready to Request</option>
                        <option value="requested">Requested</option>
                        <option value="clear">Clear</option>
                        <option value="lien_found">Lien Found</option>
                        <option value="inconclusive">Inconclusive</option>
                      </select>
                    </label>
                    <label className="wide"><span>Official ABT Result / Reference</span><textarea value={abtSummary} onChange={(event) => setAbtSummary(event.target.value)} placeholder="Record the returned ABT-6023 result, lien holder, release reference or other official response." /></label>
                    <button type="button" onClick={() => void saveAbtStatus()} disabled={Boolean(working)}>Save Official ABT Result</button>
                  </div>
                </section>
              )}

              {tab === "comparables" && (
                <section className="appraisal-tab-panel">
                  <div className="appraisal-section-heading">
                    <div><span>Stage 4</span><h3>Comparable Evidence</h3></div>
                    <button type="button" onClick={() => void buildMarket()} disabled={Boolean(working)}>Rebuild Standard Set</button>
                  </div>

                  <div className="appraisal-market-summary">
                    <article><span>Tier B</span><strong>{Number(selected.marketSnapshot.primaryCount || 0)}</strong></article>
                    <article><span>Tier C</span><strong>{Number(selected.marketSnapshot.alternateCount || 0)}</strong></article>
                    <article><span>Tier D</span><strong>{Number(selected.marketSnapshot.supplementalCount || 0)}</strong></article>
                    <article><span>Included</span><strong>{includedComparables.length}</strong></article>
                  </div>

                  <div className="appraisal-comparable-table-wrap">
                    <table className="appraisal-comparable-table">
                      <thead><tr><th>Use</th><th>Tier</th><th>Reference</th><th>County / Type</th><th>Evidence</th><th>Price</th><th>Source</th></tr></thead>
                      <tbody>
                        {selected.comparables.map((item, index) => (
                          <tr key={`${item.reference}-${index}`}>
                            <td><input type="checkbox" checked={item.included} onChange={() => toggleComparable(index)} /></td>
                            <td><b>{item.tier}</b></td>
                            <td>{item.reference}</td>
                            <td>{item.county}<small>{item.licenseType}</small></td>
                            <td>{statusLabel(item.evidenceType)}</td>
                            <td className="money">{money(item.price)}</td>
                            <td>{item.sourceUrl ? <a href={item.sourceUrl} target="_blank" rel="noreferrer">{item.sourceName || "Source"} ↗</a> : item.sourceName || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <form className="appraisal-manual-comp" onSubmit={addManualComparable}>
                    <div><span>Reviewer evidence</span><h4>Add a verified transaction or other manual comparable</h4></div>
                    <input value={manualReference} onChange={(event) => setManualReference(event.target.value)} placeholder="Reference / transaction ID" required />
                    <input value={manualPrice} onChange={(event) => setManualPrice(event.target.value)} placeholder="Price" required />
                    <select value={manualTier} onChange={(event) => setManualTier(event.target.value)}><option>A</option><option>B</option><option>C</option><option>D</option></select>
                    <select value={manualEvidence} onChange={(event) => setManualEvidence(event.target.value)}>
                      <option value="verified_transaction">Verified transaction</option>
                      <option value="active_asking_price">Active asking price</option>
                      <option value="historical_listing">Historical listing</option>
                      <option value="supplemental_market">Supplemental market</option>
                    </select>
                    <input value={manualSource} onChange={(event) => setManualSource(event.target.value)} placeholder="Source name" />
                    <input value={manualUrl} onChange={(event) => setManualUrl(event.target.value)} placeholder="Source URL" />
                    <input className="wide" value={manualNote} onChange={(event) => setManualNote(event.target.value)} placeholder="Evidence note / transaction date / verification details" />
                    <button disabled={Boolean(working)}>Add Comparable</button>
                  </form>

                  <div className="appraisal-stage-actions">
                    <button type="button" onClick={() => setTab("valuation")}>Continue to Valuation</button>
                  </div>
                </section>
              )}

              {tab === "valuation" && (
                <section className="appraisal-tab-panel">
                  <div className="appraisal-section-heading">
                    <div><span>Stages 5–6</span><h3>Valuation Reconciliation</h3></div>
                  </div>
                  <div className="appraisal-value-cards">
                    <article><span>Automated Indication</span><strong>{money(selected.automatedValue)}</strong><small>{selected.automatedValueBasis}</small></article>
                    <article><span>Reviewer Adjustment</span><strong>{money(Number(reviewerAdjustment) || 0)}</strong></article>
                    <article><span>Current Final Value</span><strong>{money(selected.finalValue)}</strong></article>
                  </div>
                  <div className="appraisal-review-form">
                    <label><span>Client</span><input value={clientName} onChange={(event) => setClientName(event.target.value)} /></label>
                    <label><span>Intended Use</span><input value={intendedUse} onChange={(event) => setIntendedUse(event.target.value)} /></label>
                    <label><span>Institution</span><input value={institutionName} onChange={(event) => setInstitutionName(event.target.value)} /></label>
                    <label><span>Effective Date</span><input type="date" value={effectiveDate} onChange={(event) => setEffectiveDate(event.target.value)} /></label>
                    <label><span>Reviewer Adjustment (+/-)</span><input value={reviewerAdjustment} onChange={(event) => setReviewerAdjustment(event.target.value)} /></label>
                    <label className="wide"><span>Adjustment Rationale</span><textarea value={adjustmentReason} onChange={(event) => setAdjustmentReason(event.target.value)} placeholder="Required whenever the reviewer adjustment is non-zero." /></label>
                    <label className="wide"><span>Reviewer Reconciliation Notes</span><textarea value={reviewerNotes} onChange={(event) => setReviewerNotes(event.target.value)} placeholder="Required when same-county/same-series evidence is limited. Explain market evidence, liquidity, encumbrances or other relevant considerations." /></label>
                    <button type="button" onClick={() => void saveValuation()} disabled={Boolean(working)}>Save Reconciliation & Run QC</button>
                  </div>
                </section>
              )}

              {tab === "review" && (
                <section className="appraisal-tab-panel">
                  <div className="appraisal-section-heading">
                    <div><span>Stages 7–8</span><h3>Quality Control & Issuance</h3></div>
                    <button type="button" onClick={() => void loadDetail(selected.id)} disabled={Boolean(working)}>Refresh QC</button>
                  </div>
                  <div className="appraisal-qc-summary">
                    <strong>{detail?.qc.passed || 0} / {detail?.qc.total || 0}</strong>
                    <span>quality-control gates satisfied</span>
                  </div>
                  <div className="appraisal-qc-list">
                    {detail?.qc.items.map((item) => (
                      <article className={item.passed ? "pass" : "fail"} key={item.id}>
                        <b>{item.passed ? "PASS" : "FAIL"}</b>
                        <div><strong>{item.label}</strong><p>{item.detail}</p></div>
                      </article>
                    ))}
                  </div>

                  <div className="appraisal-issue-actions">
                    <button type="button" onClick={() => void approveCase()} disabled={Boolean(working) || !detail?.qc.canApprove || selected.status === "ISSUED"}>
                      Approve Appraisal
                    </button>
                    <button type="button" onClick={() => void issueCase()} disabled={Boolean(working) || selected.status !== "APPROVED"}>
                      Issue & Lock Workfile
                    </button>
                    {["APPROVED", "ISSUED"].includes(selected.status) && (
                      <a href={`/api/admin/appraisals/${selected.id}/report`} target="_blank" rel="noreferrer">
                        Open Formal Appraisal PDF
                      </a>
                    )}
                  </div>

                  <div className="appraisal-audit-log">
                    <span>Audit Trail</span>
                    {detail?.events.slice(0, 18).map((event) => (
                      <div key={event.id}><time>{new Date(event.created_at).toLocaleString()}</time><strong>{statusLabel(event.event_type)}</strong></div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </section>
      </section>
    </main>
  );
}
