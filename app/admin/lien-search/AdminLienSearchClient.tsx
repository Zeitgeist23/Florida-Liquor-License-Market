"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import AdminCodeLogin from "@/components/AdminCodeLogin";

type SearchRecord = {
  id: string;
  appraisalRef: string | null;
  licenseNumber: string;
  ownerName: string | null;
  dba: string | null;
  county: string | null;
  series: string | null;
  dbprPrimaryStatus: string | null;
  dbprSecondaryStatus: string | null;
  uccStatus:
    | "not_run"
    | "running"
    | "no_filings_reported"
    | "filings_found"
    | "error"
    | "configuration_required";
  uccDebtorNames: string[];
  uccSearchedAt: string | null;
  uccResult: Record<string, unknown>;
  abtStatus:
    | "not_requested"
    | "ready_to_request"
    | "requested"
    | "clear"
    | "lien_found"
    | "inconclusive";
  abtRequestedAt: string | null;
  abtReceivedAt: string | null;
  abtResultSummary: string | null;
  reviewStatus: "pending" | "reviewed" | "needs_follow_up";
  reviewedAt: string | null;
  reviewerNotes: string | null;
  createdAt: string;
  updatedAt: string;
};

type Filing = {
  filing_number?: string;
  filing_date?: string;
  status?: string;
  debtor_names?: string[];
  secured_parties?: string[];
  collateral_summary?: string;
  source_url?: string;
};

function statusLabel(value: string) {
  return value.replaceAll("_", " ").replace(/\b\w/g, (match) => match.toUpperCase());
}

function filingRows(search: SearchRecord): Filing[] {
  const searches = Array.isArray(search.uccResult?.searches)
    ? (search.uccResult.searches as Array<Record<string, unknown>>)
    : [];
  return searches.flatMap((entry) => {
    const payload = entry.payload;
    if (!payload || typeof payload !== "object") return [];
    const filings = (payload as { filings?: unknown }).filings;
    return Array.isArray(filings) ? (filings as Filing[]) : [];
  });
}

function prefilled6023(search: SearchRecord) {
  const params = new URLSearchParams({
    licenseNumber: search.licenseNumber,
    ownerName: search.ownerName || "",
    businessName: search.dba || "",
  });
  return `/resources/forms/abt-6023?${params.toString()}`;
}

function formatDate(value: string | null) {
  if (!value) return "Not recorded";
  return new Date(value).toLocaleString();
}

export default function AdminLienSearchClient() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [searches, setSearches] = useState<SearchRecord[]>([]);
  const [tinyFishConfigured, setTinyFishConfigured] = useState(false);
  const [licenseNumber, setLicenseNumber] = useState("");
  const [appraisalRef, setAppraisalRef] = useState("");
  const [additionalDebtorName, setAdditionalDebtorName] = useState("");
  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setError("");
    try {
      const response = await fetch("/api/admin/lien-search", { cache: "no-store" });
      if (response.status === 401) {
        setAuthenticated(false);
        setSearches([]);
        return;
      }
      const payload = (await response.json()) as {
        searches?: SearchRecord[];
        tinyFishConfigured?: boolean;
        error?: string;
      };
      if (!response.ok) throw new Error(payload.error || "Could not load lien searches.");
      setAuthenticated(true);
      setSearches(payload.searches || []);
      setTinyFishConfigured(Boolean(payload.tinyFishConfigured));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load lien searches.");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const latest = searches[0] || null;
  const stats = useMemo(() => ({
    total: searches.length,
    uccHits: searches.filter((item) => item.uccStatus === "filings_found").length,
    abtClear: searches.filter((item) => item.abtStatus === "clear").length,
    followUp: searches.filter((item) => item.reviewStatus === "needs_follow_up").length,
  }), [searches]);

  async function runSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const submittedLicenseNumber = String(form.get("licenseNumber") || licenseNumber).trim();
    const submittedAppraisalRef = String(form.get("appraisalRef") || appraisalRef).trim();
    const submittedAdditionalDebtorName = String(
      form.get("additionalDebtorName") || additionalDebtorName,
    ).trim();

    setRunning(true);
    setError("");
    setMessage("Starting DBPR verification and Florida UCC research…");
    try {
      const response = await fetch("/api/admin/lien-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          licenseNumber: submittedLicenseNumber,
          appraisalRef: submittedAppraisalRef,
          additionalDebtorName: submittedAdditionalDebtorName,
        }),
      });
      const payload = (await response.json()) as {
        search?: SearchRecord;
        tinyFishConfigured?: boolean;
        message?: string;
        error?: string;
      };
      if (!response.ok) throw new Error(payload.error || "Lien-search workflow failed.");
      setMessage(
        payload.message ||
          "DBPR identity captured and Florida UCC research completed. Official ABT-6023 status remains separate.",
      );
      setLicenseNumber("");
      setAppraisalRef("");
      setAdditionalDebtorName("");
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Lien-search workflow failed.");
    } finally {
      setRunning(false);
    }
  }

  async function updateRecord(
    record: SearchRecord,
    values: Partial<Pick<SearchRecord, "abtStatus" | "abtResultSummary" | "reviewStatus" | "reviewerNotes">>,
  ) {
    setError("");
    const response = await fetch("/api/admin/lien-search", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: record.id, ...values }),
    });
    const payload = (await response.json()) as { search?: SearchRecord; error?: string };
    if (!response.ok) {
      setError(payload.error || "Could not update the lien-search record.");
      return;
    }
    setSearches((current) =>
      current.map((item) => (item.id === record.id && payload.search ? payload.search : item)),
    );
  }

  if (authenticated === false) {
    return <AdminCodeLogin title="Appraisal Lien & Encumbrance Search" onAuthenticated={load} />;
  }

  if (authenticated === null) {
    return <main className="lien-admin-shell"><div className="lien-loading">Loading secure appraisal workspace…</div></main>;
  }

  return (
    <main className="lien-admin-shell">
      <header className="lien-admin-header">
        <div>
          <span>FLLM Internal Appraisal Workflow</span>
          <h1>Lien &amp; Encumbrance Search</h1>
          <p>
            Verify the DBPR identity, run debtor-level Florida UCC research, prepare the official ABT-6023 request,
            and retain a reviewer-controlled audit trail.
          </p>
        </div>
        <nav>
          <Link href="/admin/leads">Lead Desk</Link>
          <Link href="/resources/forms/abt-6023">ABT-6023</Link>
        </nav>
      </header>

      <section className="lien-stats" aria-label="Lien-search workflow status">
        <article><span>Searches</span><strong>{stats.total}</strong></article>
        <article><span>UCC filings reported</span><strong>{stats.uccHits}</strong></article>
        <article><span>ABT clear</span><strong>{stats.abtClear}</strong></article>
        <article><span>Needs follow-up</span><strong>{stats.followUp}</strong></article>
      </section>

      {!tinyFishConfigured && (
        <aside className="lien-config-warning">
          <strong>TinyFish automation is ready but not yet connected.</strong>
          <p>
            Add the server-side <code>TINYFISH_API_KEY</code> environment variable to enable one-click Florida UCC
            research. DBPR verification and ABT-6023 preparation work without it.
          </p>
        </aside>
      )}

      <section className="lien-run-panel">
        <div>
          <span>New appraisal diligence run</span>
          <h2>Start with the DBPR license number</h2>
          <p>
            FLLM will pull the current DBPR holder, DBA, county, series and status first. The legal holder name then
            becomes the primary Florida UCC debtor search name.
          </p>
        </div>
        <form onSubmit={runSearch}>
          <label>
            <span>DBPR License Number</span>
            <input
              name="licenseNumber"
              value={licenseNumber}
              onChange={(event) => setLicenseNumber(event.target.value.toUpperCase())}
              placeholder="BEV2330020"
              required
            />
          </label>
          <label>
            <span>Appraisal Reference <small>optional</small></span>
            <input
              name="appraisalRef"
              value={appraisalRef}
              onChange={(event) => setAppraisalRef(event.target.value)}
              placeholder="FLLM-APPRAISAL-..."
            />
          </label>
          <label>
            <span>Prior Owner / Additional Debtor <small>optional</small></span>
            <input
              name="additionalDebtorName"
              value={additionalDebtorName}
              onChange={(event) => setAdditionalDebtorName(event.target.value)}
              placeholder="Example: MAX & FRANK LLC"
            />
          </label>
          <button disabled={running}>
            {running ? "Running Due Diligence…" : "Run Lien Search"}
          </button>
        </form>
      </section>

      {error && <div className="lien-error" role="alert">{error}</div>}
      {message && <div className="lien-success" role="status">{message}</div>}

      {latest && (
        <section className="lien-workflow-key">
          <strong>Workflow rule</strong>
          <p>
            A TinyFish/UCC result never changes the official ABT status automatically. Only the returned Division
            ABT-6023 search should be marked <b>Clear</b> or <b>Lien Found</b>.
          </p>
        </section>
      )}

      <section className="lien-history">
        <div className="lien-history-title">
          <div>
            <span>Audit trail</span>
            <h2>Recent appraisal lien searches</h2>
          </div>
          <button type="button" onClick={() => void load()}>Refresh</button>
        </div>

        {!searches.length ? (
          <div className="lien-empty">No lien-search records yet.</div>
        ) : (
          searches.map((record) => {
            const filings = filingRows(record);
            return (
              <article className="lien-record" key={record.id}>
                <div className="lien-record-head">
                  <div>
                    <span>{record.appraisalRef || "Unassigned appraisal"}</span>
                    <h3>{record.dba || record.ownerName || record.licenseNumber}</h3>
                    <p>{record.ownerName || "Owner not listed"} · {record.county || "County not listed"}</p>
                  </div>
                  <div className="lien-badges">
                    <b className={`lien-badge ucc-${record.uccStatus}`}>UCC: {statusLabel(record.uccStatus)}</b>
                    <b className={`lien-badge abt-${record.abtStatus}`}>ABT: {statusLabel(record.abtStatus)}</b>
                  </div>
                </div>

                <div className="lien-identity-grid">
                  <div><span>License</span><strong>{record.licenseNumber}</strong></div>
                  <div><span>Series</span><strong>{record.series || "Not listed"}</strong></div>
                  <div><span>DBPR Status</span><strong>{record.dbprPrimaryStatus || "Not listed"} / {record.dbprSecondaryStatus || "Not listed"}</strong></div>
                  <div><span>UCC Debtor Names</span><strong>{record.uccDebtorNames.join("; ") || "Not run"}</strong></div>
                </div>

                <div className="lien-actions">
                  <a href={prefilled6023(record)} target="_blank" rel="noreferrer">Open Prefilled ABT-6023</a>
                  <a href="https://floridaucc.com/search" target="_blank" rel="noreferrer">Open Official Florida UCC Registry</a>
                </div>

                <div className="lien-ucc-panel">
                  <div className="lien-section-heading">
                    <div><span>Automated public-record check</span><h4>Florida UCC results</h4></div>
                    <small>Searched: {formatDate(record.uccSearchedAt)}</small>
                  </div>
                  {filings.length ? (
                    <div className="lien-filings">
                      {filings.map((filing, index) => (
                        <div className="lien-filing" key={`${record.id}-${filing.filing_number || index}`}>
                          <strong>{filing.filing_number || `Filing ${index + 1}`}</strong>
                          <span>{filing.filing_date || "Date not returned"} · {filing.status || "Status not returned"}</span>
                          <p><b>Secured party:</b> {(filing.secured_parties || []).join(", ") || "Not returned"}</p>
                          <p><b>Collateral:</b> {filing.collateral_summary || "Collateral description not returned by the public search."}</p>
                          {filing.source_url && <a href={filing.source_url} target="_blank" rel="noreferrer">Source ↗</a>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="lien-no-filings">
                      {record.uccStatus === "no_filings_reported"
                        ? "No filings were reported by the automated public UCC search. This is not an ABT lien certification."
                        : record.uccStatus === "configuration_required"
                          ? "TinyFish is not connected yet; no automated UCC search was performed."
                          : record.uccStatus === "error"
                            ? "The automated UCC search did not complete successfully. Use the official registry link and mark the record for follow-up."
                            : "UCC results are pending."}
                    </p>
                  )}
                </div>

                <div className="lien-review-grid">
                  <label>
                    <span>Official ABT-6023 Status</span>
                    <select
                      value={record.abtStatus}
                      onChange={(event) =>
                        void updateRecord(record, {
                          abtStatus: event.target.value as SearchRecord["abtStatus"],
                        })
                      }
                    >
                      <option value="ready_to_request">Ready to Request</option>
                      <option value="requested">Requested</option>
                      <option value="clear">Clear</option>
                      <option value="lien_found">Lien Found</option>
                      <option value="inconclusive">Inconclusive</option>
                      <option value="not_requested">Not Requested</option>
                    </select>
                  </label>
                  <label>
                    <span>Reviewer Status</span>
                    <select
                      value={record.reviewStatus}
                      onChange={(event) =>
                        void updateRecord(record, {
                          reviewStatus: event.target.value as SearchRecord["reviewStatus"],
                        })
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="needs_follow_up">Needs Follow-up</option>
                    </select>
                  </label>
                  <label className="wide">
                    <span>ABT Result / Filing Notes</span>
                    <textarea
                      defaultValue={record.abtResultSummary || ""}
                      onBlur={(event) =>
                        void updateRecord(record, { abtResultSummary: event.target.value })
                      }
                      placeholder="Paste the returned ABT-6023 result, recorded lien names, release information, or official search reference."
                    />
                  </label>
                  <label className="wide">
                    <span>Reviewer Notes</span>
                    <textarea
                      defaultValue={record.reviewerNotes || ""}
                      onBlur={(event) =>
                        void updateRecord(record, { reviewerNotes: event.target.value })
                      }
                      placeholder="Reconciliation notes, payoff requirements, unresolved names, prior-owner searches, or appraisal exhibit instructions."
                    />
                  </label>
                </div>

                <footer className="lien-record-footer">
                  <span>Created {formatDate(record.createdAt)}</span>
                  <span>ABT requested {formatDate(record.abtRequestedAt)}</span>
                  <span>ABT received {formatDate(record.abtReceivedAt)}</span>
                </footer>
              </article>
            );
          })
        )}
      </section>
    </main>
  );
}
