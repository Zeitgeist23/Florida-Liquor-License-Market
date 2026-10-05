"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

import AdminCodeLogin from "@/components/AdminCodeLogin";

type RecordRow = {
  id: string | null;
  listing_reference: string;
  business_name: string | null;
  source_listing_title: string | null;
  identification_basis: string | null;
  legal_entity_name: string | null;
  county: string;
  city: string | null;
  business_type: string;
  license_type: string | null;
  license_number: string | null;
  license_holder: string | null;
  asking_price: number | null;
  gross_revenue: number | null;
  sde_cash_flow: number | null;
  fllm_est_license_value: number | null;
  broker_name: string | null;
  brokerage: string | null;
  broker_phone: string | null;
  broker_email: string | null;
  owner_name: string | null;
  owner_phone: string | null;
  owner_email: string | null;
  source_listing_url: string | null;
  dbpr_url: string | null;
  sunbiz_url: string | null;
  property_url: string | null;
  source_urls: string[];
  identification_confidence: number | null;
  verification_status: string;
  market_status: string;
  first_seen_at: string;
  last_seen_at: string;
  notes: string | null;
  origin: "private_database" | "fllm_registry";
};

type Payload = { records: RecordRow[]; error?: string };

const emptyForm = {
  listing_reference: "",
  business_name: "",
  source_listing_title: "",
  identification_basis: "",
  legal_entity_name: "",
  county: "",
  city: "",
  business_type: "",
  license_type: "",
  license_number: "",
  license_holder: "",
  asking_price: "",
  gross_revenue: "",
  sde_cash_flow: "",
  fllm_est_license_value: "",
  broker_name: "",
  brokerage: "",
  broker_phone: "",
  broker_email: "",
  owner_name: "",
  owner_phone: "",
  owner_email: "",
  source_listing_url: "",
  dbpr_url: "",
  sunbiz_url: "",
  property_url: "",
  identification_confidence: "",
  verification_status: "unverified",
  market_status: "active",
  notes: "",
};

function money(value: number | null) {
  return value === null ? "—" : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function date(value: string | null | undefined) {
  if (!value) return "—";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? value : d.toLocaleDateString("en-US");
}

function tel(value: string | null) {
  return value ? `tel:${value.replace(/[^0-9+]/g, "")}` : "";
}

export default function MarketIntelligenceClient() {
  const [records, setRecords] = useState<RecordRow[]>([]);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [county, setCounty] = useState("all");
  const [license, setLicense] = useState("all");
  const [status, setStatus] = useState("active");
  const [identityFilter, setIdentityFilter] = useState("all");
  const [selected, setSelected] = useState<RecordRow | null>(null);
  const [page, setPage] = useState(1);
  const [form, setForm] = useState(emptyForm);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/market-intelligence", { cache: "no-store" });
      if (response.status === 401) {
        setAuthenticated(false);
        setRecords([]);
        return;
      }
      const payload = await response.json() as Payload;
      if (!response.ok) throw new Error(payload.error || "Could not load market intelligence.");
      setAuthenticated(true);
      setRecords(payload.records || []);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load market intelligence.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const counties = useMemo(() => Array.from(new Set(records.map((r) => r.county).filter(Boolean))).sort(), [records]);
  const licenseTypes = useMemo(() => Array.from(new Set(records.map((r) => r.license_type).filter(Boolean) as string[])).sort(), [records]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return records.filter((r) => {
      if (county !== "all" && r.county !== county) return false;
      if (license !== "all" && r.license_type !== license) return false;
      if (status !== "all" && r.market_status !== status) return false;
      if (identityFilter === "identified" && !r.business_name) return false;
      if (identityFilter === "needs-research" && r.business_name) return false;
      if (!q) return true;
      return [
        r.business_name,r.source_listing_title,r.identification_basis,r.legal_entity_name,r.city,r.county,r.business_type,r.license_type,r.license_number,
        r.broker_name,r.brokerage,r.broker_phone,r.owner_name,r.owner_phone,r.listing_reference,
      ].some((value) => (value || "").toLowerCase().includes(q));
    });
  }, [records, query, county, license, status, identityFilter]);

  useEffect(() => { setPage(1); }, [query, county, license, status, identityFilter]);

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleRows = useMemo(
    () => filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [filtered, currentPage],
  );

  const stats = useMemo(() => ({
    total: records.length,
    active: records.filter((r) => r.market_status === "active").length,
    identified: records.filter((r) => Boolean(r.business_name)).length,
    reviewedInsufficient: records.filter((r) => r.verification_status === "insufficient").length,
  }), [records]);

  function editRecord(row: RecordRow) {
    setSelected(row);
    setForm({
      listing_reference: row.listing_reference || "",
      business_name: row.business_name || "",
      source_listing_title: row.source_listing_title || "",
      identification_basis: row.identification_basis || "",
      legal_entity_name: row.legal_entity_name || "",
      county: row.county || "",
      city: row.city || "",
      business_type: row.business_type || "",
      license_type: row.license_type || "",
      license_number: row.license_number || "",
      license_holder: row.license_holder || "",
      asking_price: row.asking_price?.toString() || "",
      gross_revenue: row.gross_revenue?.toString() || "",
      sde_cash_flow: row.sde_cash_flow?.toString() || "",
      fllm_est_license_value: row.fllm_est_license_value?.toString() || "",
      broker_name: row.broker_name || "",
      brokerage: row.brokerage || "",
      broker_phone: row.broker_phone || "",
      broker_email: row.broker_email || "",
      owner_name: row.owner_name || "",
      owner_phone: row.owner_phone || "",
      owner_email: row.owner_email || "",
      source_listing_url: row.source_listing_url || "",
      dbpr_url: row.dbpr_url || "",
      sunbiz_url: row.sunbiz_url || "",
      property_url: row.property_url || "",
      identification_confidence: row.identification_confidence?.toString() || "",
      verification_status: row.verification_status || "unverified",
      market_status: row.market_status || "active",
      notes: row.notes || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function newRecord() {
    setSelected(null);
    setForm(emptyForm);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/admin/market-intelligence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = await response.json() as Payload;
      if (!response.ok) throw new Error(payload.error || "Could not save record.");
      setRecords(payload.records || []);
      const updated = (payload.records || []).find((r) => r.listing_reference === form.listing_reference);
      if (updated) editRecord(updated); else newRecord();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save record.");
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    setAuthenticated(false);
    setRecords([]);
  }

  if (authenticated === false) {
    return <main className="intel-page"><AdminCodeLogin title="Market Intelligence Room" onAuthenticated={load} /></main>;
  }

  return (
    <main className="intel-page">
      <header className="intel-header">
        <div>
          <span>Private FLLM owner administration</span>
          <h1>Market Intelligence Room</h1>
          <p>Confidential working database linking observed businesses for sale to liquor-license records, brokers, owners and public-record verification.</p>
        </div>
        <nav>
          <Link href="/admin/leads">Lead Desk</Link>
          <Link href="/admin/owner-outreach">Owner Outreach</Link>
          <button type="button" onClick={() => void load()} disabled={loading}>{loading ? "Refreshing…" : "Refresh"}</button>
          <button type="button" onClick={newRecord}>+ Add Business</button>
          <button type="button" onClick={logout}>Sign Out</button>
        </nav>
      </header>

      {error && <p className="intel-error">{error}</p>}

      <section className="intel-stats">
        <div><span>Total intelligence records</span><strong>{stats.total}</strong></div>
        <div><span>Observed active</span><strong>{stats.active}</strong></div>
        <div><span>Best-guess identities</span><strong>{stats.identified}</strong></div>
        <div><span>Reviewed — insufficient evidence</span><strong>{stats.reviewedInsufficient}</strong></div>
      </section>

      <section className="intel-editor">
        <div className="intel-editor-title">
          <div>
            <span>{selected ? "Selected intelligence record" : "New intelligence record"}</span>
            <h2>{selected?.business_name || selected?.listing_reference || "Add observed business"}</h2>
            <p>Private fields are not exposed on public FLLM pages. Use only lawfully obtained public/business contact information.</p>
          </div>
          {selected && <button type="button" className="secondary" onClick={newRecord}>Clear / New</button>}
        </div>

        <form onSubmit={save}>
          <fieldset>
            <legend>Business + identification</legend>
            <label><span>Listing reference</span><input value={form.listing_reference} onChange={(e) => setForm({ ...form, listing_reference: e.target.value })} placeholder="BBS-1234567 or FLLM reference" /></label>
            <label><span>Best guess business name</span><input value={form.business_name} onChange={(e) => setForm({ ...form, business_name: e.target.value })} /></label>
            <label><span>Source ad headline</span><input value={form.source_listing_title} onChange={(e) => setForm({ ...form, source_listing_title: e.target.value })} /></label><label><span>Why FLLM thinks this is the business</span><input value={form.identification_basis} onChange={(e) => setForm({ ...form, identification_basis: e.target.value })} /></label><label><span>Legal entity</span><input value={form.legal_entity_name} onChange={(e) => setForm({ ...form, legal_entity_name: e.target.value })} /></label>
            <label><span>Business type</span><input required value={form.business_type} onChange={(e) => setForm({ ...form, business_type: e.target.value })} placeholder="Restaurant, Bar, Nightclub…" /></label>
            <label><span>County</span><input required value={form.county} onChange={(e) => setForm({ ...form, county: e.target.value })} /></label>
            <label><span>City</span><input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></label>
            <label><span>ID confidence %</span><input type="number" min="0" max="100" value={form.identification_confidence} onChange={(e) => setForm({ ...form, identification_confidence: e.target.value })} /></label>
            <label><span>Verification</span><select value={form.verification_status} onChange={(e) => setForm({ ...form, verification_status: e.target.value })}><option value="unverified">Unverified</option><option value="probable">Probable</option><option value="verified">Verified</option><option value="conflicted">Conflicted</option></select></label>
            <label><span>Market status</span><select value={form.market_status} onChange={(e) => setForm({ ...form, market_status: e.target.value })}><option value="active">Active</option><option value="unknown">Unknown</option><option value="pending">Pending</option><option value="sold">Sold</option><option value="removed">Removed</option><option value="withdrawn">Withdrawn</option><option value="preview">Preview</option></select></label>
          </fieldset>

          <fieldset>
            <legend>Liquor license + economics</legend>
            <label><span>License type</span><input value={form.license_type} onChange={(e) => setForm({ ...form, license_type: e.target.value })} /></label>
            <label><span>License number</span><input value={form.license_number} onChange={(e) => setForm({ ...form, license_number: e.target.value })} /></label>
            <label><span>License holder</span><input value={form.license_holder} onChange={(e) => setForm({ ...form, license_holder: e.target.value })} /></label>
            <label><span>Asking price</span><input type="number" min="0" value={form.asking_price} onChange={(e) => setForm({ ...form, asking_price: e.target.value })} /></label>
            <label><span>Gross revenue</span><input type="number" min="0" value={form.gross_revenue} onChange={(e) => setForm({ ...form, gross_revenue: e.target.value })} /></label>
            <label><span>SDE / Cash flow</span><input type="number" min="0" value={form.sde_cash_flow} onChange={(e) => setForm({ ...form, sde_cash_flow: e.target.value })} /></label>
            <label><span>FLLM Est. License Value</span><input type="number" min="0" value={form.fllm_est_license_value} onChange={(e) => setForm({ ...form, fllm_est_license_value: e.target.value })} /></label>
          </fieldset>

          <fieldset>
            <legend>Broker</legend>
            <label><span>Broker name</span><input value={form.broker_name} onChange={(e) => setForm({ ...form, broker_name: e.target.value })} /></label>
            <label><span>Brokerage</span><input value={form.brokerage} onChange={(e) => setForm({ ...form, brokerage: e.target.value })} /></label>
            <label><span>Broker phone</span><input value={form.broker_phone} onChange={(e) => setForm({ ...form, broker_phone: e.target.value })} /></label>
            <label><span>Broker email</span><input type="email" value={form.broker_email} onChange={(e) => setForm({ ...form, broker_email: e.target.value })} /></label>
          </fieldset>

          <fieldset>
            <legend>Owner / license principal</legend>
            <label><span>Owner name</span><input value={form.owner_name} onChange={(e) => setForm({ ...form, owner_name: e.target.value })} /></label>
            <label><span>Owner business phone</span><input value={form.owner_phone} onChange={(e) => setForm({ ...form, owner_phone: e.target.value })} /></label>
            <label><span>Owner business email</span><input type="email" value={form.owner_email} onChange={(e) => setForm({ ...form, owner_email: e.target.value })} /></label>
          </fieldset>

          <fieldset className="sources">
            <legend>Verification sources</legend>
            <label><span>Sale listing</span><input type="url" value={form.source_listing_url} onChange={(e) => setForm({ ...form, source_listing_url: e.target.value })} /></label>
            <label><span>DBPR / ABT record</span><input type="url" value={form.dbpr_url} onChange={(e) => setForm({ ...form, dbpr_url: e.target.value })} /></label>
            <label><span>Sunbiz entity record</span><input type="url" value={form.sunbiz_url} onChange={(e) => setForm({ ...form, sunbiz_url: e.target.value })} /></label>
            <label><span>County / property record</span><input type="url" value={form.property_url} onChange={(e) => setForm({ ...form, property_url: e.target.value })} /></label>
            <label className="notes"><span>Private notes</span><textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></label>
          </fieldset>

          <button className="save" type="submit" disabled={saving}>{saving ? "Saving…" : "Save Private Intelligence Record"}</button>
        </form>
      </section>

      <section className="intel-database">
        <div className="intel-toolbar">
          <div>
            <span>{identityFilter === "needs-research" ? "Needs Identity Research Queue" : identityFilter === "identified" ? "Identified Businesses" : "Private inventory — identified businesses first"}</span>
            <strong>{filtered.length} records shown</strong>
          </div>
          <input aria-label="Search intelligence records" placeholder="Search business, owner, broker, phone, license #…" value={query} onChange={(e) => setQuery(e.target.value)} />
          <select value={county} onChange={(e) => setCounty(e.target.value)}><option value="all">All counties</option>{counties.map((x) => <option key={x}>{x}</option>)}</select>
          <select value={license} onChange={(e) => setLicense(e.target.value)}><option value="all">All license types</option>{licenseTypes.map((x) => <option key={x}>{x}</option>)}</select>
          <select value={identityFilter} onChange={(e) => setIdentityFilter(e.target.value)}><option value="all">Identified first</option><option value="identified">Best guesses only</option><option value="needs-research">Needs identity research</option></select><select value={status} onChange={(e) => setStatus(e.target.value)}><option value="all">All statuses</option><option value="active">Active</option><option value="unknown">Unknown</option><option value="pending">Pending</option><option value="sold">Sold</option><option value="removed">Removed</option><option value="withdrawn">Withdrawn</option><option value="preview">Preview</option></select>
        </div>

        <div className="intel-table-wrap">
          <table>
            <thead><tr><th>FLLM Best Guess / Confidence</th><th>County / type</th><th>License</th><th>Economics</th><th>Broker</th><th>Owner</th><th>Public records</th><th>Status</th></tr></thead>
            <tbody>
              {visibleRows.map((r) => (
                <tr key={r.listing_reference} onClick={() => editRecord(r)}>
                  <td><strong>{r.business_name || "NO BEST GUESS YET"}</strong><small>{r.source_listing_title || r.listing_reference}</small><small>{r.listing_reference}</small><span className="confidence">{r.verification_status === "insufficient" ? "Reviewed — insufficient evidence" : r.identification_confidence === null ? "Needs identity research" : `${r.identification_confidence}% BEST-GUESS MATCH`}</span></td>
                  <td><strong>{r.county}</strong><small>{[r.city,r.business_type].filter(Boolean).join(" · ")}</small></td>
                  <td><strong>{r.license_type || "—"}</strong><small>{r.license_number || "License # not matched"}</small><small>{r.license_holder || ""}</small></td>
                  <td><strong>{money(r.asking_price)}</strong><small>Revenue {money(r.gross_revenue)}</small><small>SDE {money(r.sde_cash_flow)}</small><small>Lic. est. {money(r.fllm_est_license_value)}</small></td>
                  <td><strong>{r.broker_name || "—"}</strong><small>{r.brokerage || ""}</small>{r.broker_phone && <a onClick={(e)=>e.stopPropagation()} href={tel(r.broker_phone)}>{r.broker_phone}</a>}{r.broker_email && <a onClick={(e)=>e.stopPropagation()} href={`mailto:${r.broker_email}`}>{r.broker_email}</a>}</td>
                  <td><strong>{r.owner_name || "Not researched"}</strong>{r.owner_phone && <a onClick={(e)=>e.stopPropagation()} href={tel(r.owner_phone)}>{r.owner_phone}</a>}{r.owner_email && <a onClick={(e)=>e.stopPropagation()} href={`mailto:${r.owner_email}`}>{r.owner_email}</a>}</td>
                  <td><div className="record-links">{r.source_listing_url && <a onClick={(e)=>e.stopPropagation()} href={r.source_listing_url} target="_blank" rel="noreferrer">Sale</a>}{r.dbpr_url && <a onClick={(e)=>e.stopPropagation()} href={r.dbpr_url} target="_blank" rel="noreferrer">DBPR</a>}{r.sunbiz_url && <a onClick={(e)=>e.stopPropagation()} href={r.sunbiz_url} target="_blank" rel="noreferrer">Sunbiz</a>}{r.property_url && <a onClick={(e)=>e.stopPropagation()} href={r.property_url} target="_blank" rel="noreferrer">County</a>}</div><small>{r.origin === "fllm_registry" ? "FLLM registry" : "Private DB"}</small></td>
                  <td><span className={`status ${r.market_status}`}>{r.market_status}</span><small>{r.verification_status}</small><small>Seen {date(r.last_seen_at)}</small></td>
                </tr>
              ))}
              {!visibleRows.length && <tr><td colSpan={8} className="empty">No records match these filters.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="intel-pagination" aria-label="Market intelligence pagination">
          <button type="button" disabled={currentPage <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Previous 10</button>
          <span>Showing {filtered.length ? (currentPage - 1) * pageSize + 1 : 0}–{Math.min(currentPage * pageSize, filtered.length)} of {filtered.length}</span>
          <strong>Page {currentPage} of {totalPages}</strong>
          <button type="button" disabled={currentPage >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next 10</button>
        </div>
      </section>
    </main>
  );
}
