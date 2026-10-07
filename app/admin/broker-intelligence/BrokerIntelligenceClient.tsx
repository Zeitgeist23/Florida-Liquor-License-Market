"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import AdminCodeLogin from "@/components/AdminCodeLogin";
import { listings as standaloneListings } from "@/data/listings";

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

type BrokerRow = {
  key: string;
  name: string;
  brokerage: string;
  brokerName: string;
  phone: string;
  email: string;
  records: RecordRow[];
  activeRecords: RecordRow[];
  activeCount: number;
  quotaCount: number;
  counties: number;
  totalAsk: number;
  totalLicenseValue: number;
  averageDays: number;
  reductions: number;
  opportunityScore: number;
};

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value || 0);
}

function shortMoney(value: number) {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(value >= 10000000 ? 0 : 1)}M`;
  if (value >= 1000) return `$${Math.round(value / 1000)}K`;
  return money(value);
}

function daysObserved(row: RecordRow) {
  const start = new Date(row.first_seen_at).getTime();
  const end = new Date(row.last_seen_at || new Date().toISOString()).getTime();
  if (!Number.isFinite(start) || !Number.isFinite(end)) return 0;
  return Math.max(0, Math.round((end - start) / 86400000));
}

function median(values: number[]) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const midpoint = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[midpoint] : Math.round((sorted[midpoint - 1] + sorted[midpoint]) / 2);
}

function normalizedLicenseType(row: RecordRow) {
  return (row.license_type || "").trim().toLowerCase();
}

function isNonQuota(row: RecordRow) {
  const value = normalizedLicenseType(row);
  return value.includes("sfs") || value.includes("srx") || value.includes("2cop");
}

function is3ps(row: RecordRow) {
  return normalizedLicenseType(row).includes("3ps");
}

function isQuota(row: RecordRow) {
  const value = normalizedLicenseType(row);
  if (!value || isNonQuota(row)) return false;
  return value.includes("3ps") || value.includes("quota") || value.includes("4cop");
}

type EffectiveLicenseValue = {
  value: number | null;
  label: string;
  basis: "record_specific" | "county_4cop_median" | "county_3ps_median" | "county_4cop_series_proxy" | "non_quota" | "unavailable";
};

function countyMedian(county: string, type: "4COP Quota" | "3PS Quota / Package Store") {
  return median(
    standaloneListings
      .filter((listing) => listing.county === county && listing.type === type && typeof listing.price === "number" && Number.isFinite(listing.price))
      .map((listing) => listing.price as number),
  );
}

function effectiveLicenseValue(row: RecordRow): EffectiveLicenseValue {
  if (typeof row.fllm_est_license_value === "number" && Number.isFinite(row.fllm_est_license_value) && row.fllm_est_license_value > 0) {
    return { value: row.fllm_est_license_value, label: money(row.fllm_est_license_value), basis: "record_specific" };
  }

  if (isNonQuota(row)) {
    const label = normalizedLicenseType(row).includes("2cop") ? "No separate quota value" : "Location-specific / non-quota";
    return { value: null, label, basis: "non_quota" };
  }

  if (!isQuota(row)) {
    return { value: null, label: "Market data unavailable", basis: "unavailable" };
  }

  if (is3ps(row)) {
    const direct3ps = countyMedian(row.county, "3PS Quota / Package Store");
    if (direct3ps !== null) {
      return { value: direct3ps, label: money(direct3ps), basis: "county_3ps_median" };
    }
    const fourCop = countyMedian(row.county, "4COP Quota");
    if (fourCop !== null) {
      const proxy = Math.round((fourCop * 0.985) / 5000) * 5000;
      return { value: proxy, label: money(proxy), basis: "county_4cop_series_proxy" };
    }
    return { value: null, label: "Market data unavailable", basis: "unavailable" };
  }

  const fourCop = countyMedian(row.county, "4COP Quota");
  if (fourCop !== null) {
    return { value: fourCop, label: money(fourCop), basis: "county_4cop_median" };
  }

  return { value: null, label: "Market data unavailable", basis: "unavailable" };
}

function licenseValueBasisLabel(row: RecordRow) {
  const basis = effectiveLicenseValue(row).basis;
  if (basis === "record_specific") return "Record-specific FLLM estimate";
  if (basis === "county_4cop_median") return "County 4COP median";
  if (basis === "county_3ps_median") return "County 3PS median";
  if (basis === "county_4cop_series_proxy") return "3PS proxy from county 4COP median";
  if (basis === "non_quota") return "Non-quota license";
  return "No county market estimate available";
}

function cleanBrokerName(row: RecordRow) {
  return (row.brokerage || row.broker_name || "").trim();
}

function opportunityScore(records: RecordRow[]) {
  const active = records.filter((r) => r.market_status === "active");
  const quota = active.filter(isQuota).length;
  const counties = new Set(active.map((r) => r.county).filter(Boolean)).size;
  const totalLicenseValue = active.reduce((sum, r) => sum + (effectiveLicenseValue(r).value || 0), 0);
  const aged = active.filter((r) => daysObserved(r) >= 60).length;
  const score =
    Math.min(active.length * 4, 32) +
    Math.min(quota * 6, 30) +
    Math.min(counties * 3, 15) +
    Math.min(Math.floor(totalLicenseValue / 250000) * 3, 15) +
    Math.min(aged * 2, 8);
  return Math.min(100, score);
}

function groupCounts(records: RecordRow[], getter: (row: RecordRow) => string) {
  const map = new Map<string, number>();
  records.forEach((row) => {
    const key = getter(row).trim() || "Unknown";
    map.set(key, (map.get(key) || 0) + 1);
  });
  return [...map.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
}

function BarChart({ data, title, valueLabel = "Listings" }: { data: { label: string; value: number }[]; title: string; valueLabel?: string }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <section className="bi-chart-card">
      <h3>{title}</h3>
      <div className="bi-bars" role="img" aria-label={title}>
        {data.slice(0, 10).map((item) => (
          <div className="bi-bar-row" key={item.label}>
            <span className="bi-bar-label">{item.label}</span>
            <div className="bi-bar-track"><i style={{ width: `${Math.max(4, (item.value / max) * 100)}%` }} /></div>
            <strong title={valueLabel}>{item.value}</strong>
          </div>
        ))}
        {data.length === 0 && <p className="bi-empty">No data available.</p>}
      </div>
    </section>
  );
}

function ValueBarChart({ data, title }: { data: { label: string; value: number }[]; title: string }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <section className="bi-chart-card">
      <h3>{title}</h3>
      <div className="bi-bars value-bars" role="img" aria-label={title}>
        {data.slice(0, 8).map((item) => (
          <div className="bi-bar-row" key={item.label}>
            <span className="bi-bar-label">{item.label}</span>
            <div className="bi-bar-track"><i style={{ width: `${Math.max(4, (item.value / max) * 100)}%` }} /></div>
            <strong>{shortMoney(item.value)}</strong>
          </div>
        ))}
        {data.length === 0 && <p className="bi-empty">No valuation data available.</p>}
      </div>
    </section>
  );
}

function DonutChart({ data, title }: { data: { label: string; value: number }[]; title: string }) {
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
  const colors = ["#54dff5", "#f0a400", "#ec5b61", "#65d28d", "#a67df2", "#4a93ff", "#d9d9d9"];
  let cursor = 0;
  const stops = data.slice(0, 7).map((item, index) => {
    const start = (cursor / total) * 100;
    cursor += item.value;
    const end = (cursor / total) * 100;
    return `${colors[index % colors.length]} ${start}% ${end}%`;
  }).join(", ");
  return (
    <section className="bi-chart-card">
      <h3>{title}</h3>
      <div className="bi-donut-wrap">
        <div className="bi-donut" style={{ background: data.length ? `conic-gradient(${stops})` : "#163445" }}>
          <div><strong>{total === 1 && data.length === 0 ? 0 : total}</strong><span>Total</span></div>
        </div>
        <div className="bi-legend">
          {data.slice(0, 7).map((item, index) => (
            <div key={item.label}><i style={{ background: colors[index % colors.length] }} /><span>{item.label}</span><strong>{item.value}</strong></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LineChart({ records }: { records: RecordRow[] }) {
  const months = useMemo(() => {
    const buckets = new Map<string, number>();
    records.forEach((row) => {
      const d = new Date(row.first_seen_at);
      if (!Number.isFinite(d.getTime())) return;
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      buckets.set(key, (buckets.get(key) || 0) + 1);
    });
    return [...buckets.entries()].sort((a, b) => a[0].localeCompare(b[0])).slice(-12);
  }, [records]);
  const width = 640;
  const height = 210;
  const pad = 28;
  const max = Math.max(1, ...months.map(([, v]) => v));
  const points = months.map(([key, value], index) => {
    const x = months.length <= 1 ? width / 2 : pad + (index * (width - pad * 2)) / (months.length - 1);
    const y = height - pad - (value / max) * (height - pad * 2);
    return { key, value, x, y };
  });
  return (
    <section className="bi-chart-card bi-line-card">
      <h3>Listings first observed over time</h3>
      {points.length ? (
        <>
          <svg className="bi-line" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Listings first observed over time">
            <line x1={pad} x2={width - pad} y1={height - pad} y2={height - pad} />
            <polyline points={points.map((p) => `${p.x},${p.y}`).join(" ")} />
            {points.map((p) => <circle key={p.key} cx={p.x} cy={p.y} r="5"><title>{p.key}: {p.value}</title></circle>)}
          </svg>
          <div className="bi-line-labels">{points.map((p) => <span key={p.key}>{p.key.slice(2)}</span>)}</div>
        </>
      ) : <p className="bi-empty">No time-series data available.</p>}
    </section>
  );
}

export default function BrokerIntelligenceClient() {
  const [records, setRecords] = useState<RecordRow[]>([]);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedKey, setSelectedKey] = useState("");
  const [reportMode, setReportMode] = useState(false);
  const [copied, setCopied] = useState(false);

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
      if (!response.ok) throw new Error(payload.error || "Could not load broker intelligence.");
      setAuthenticated(true);
      setRecords(payload.records || []);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load broker intelligence.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const brokers = useMemo<BrokerRow[]>(() => {
    const groups = new Map<string, RecordRow[]>();
    records.forEach((row) => {
      const key = cleanBrokerName(row);
      if (!key) return;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(row);
    });
    return [...groups.entries()].map(([key, rows]) => {
      const activeRecords = rows.filter((r) => r.market_status === "active");
      const totalDays = activeRecords.reduce((sum, r) => sum + daysObserved(r), 0);
      const first = rows.find((r) => r.brokerage === key) || rows[0];
      return {
        key,
        name: key,
        brokerage: first.brokerage || "",
        brokerName: first.broker_name || "",
        phone: first.broker_phone || "",
        email: first.broker_email || "",
        records: rows,
        activeRecords,
        activeCount: activeRecords.length,
        quotaCount: activeRecords.filter(isQuota).length,
        counties: new Set(activeRecords.map((r) => r.county).filter(Boolean)).size,
        totalAsk: activeRecords.reduce((sum, r) => sum + (r.asking_price || 0), 0),
        totalLicenseValue: activeRecords.reduce((sum, r) => sum + (effectiveLicenseValue(r).value || 0), 0),
        averageDays: activeRecords.length ? Math.round(totalDays / activeRecords.length) : 0,
        reductions: 0,
        opportunityScore: opportunityScore(rows),
      };
    }).sort((a, b) => b.opportunityScore - a.opportunityScore || b.activeCount - a.activeCount);
  }, [records]);

  const filteredBrokers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return brokers;
    return brokers.filter((b) => [b.name, b.brokerage, b.brokerName, b.phone, b.email].some((v) => v.toLowerCase().includes(q)));
  }, [brokers, query]);

  useEffect(() => {
    if (!selectedKey && brokers.length) setSelectedKey(brokers[0].key);
    if (selectedKey && !brokers.some((b) => b.key === selectedKey)) setSelectedKey(brokers[0]?.key || "");
  }, [brokers, selectedKey]);

  const selected = brokers.find((b) => b.key === selectedKey) || brokers[0] || null;

  const countyData = useMemo(() => selected ? groupCounts(selected.activeRecords, (r) => r.county) : [], [selected]);
  const licenseData = useMemo(() => selected ? groupCounts(selected.activeRecords, (r) => r.license_type || "Unknown") : [], [selected]);
  const businessData = useMemo(() => selected ? groupCounts(selected.activeRecords, (r) => r.business_type || "Unknown") : [], [selected]);
  const valueData = useMemo(() => selected ? selected.activeRecords
    .map((r) => ({ row: r, effective: effectiveLicenseValue(r) }))
    .filter(({ effective }) => (effective.value || 0) > 0)
    .map(({ row, effective }) => ({ label: row.listing_reference || row.source_listing_title || row.county, value: effective.value || 0 }))
    .sort((a, b) => b.value - a.value) : [], [selected]);

  const portfolioStats = useMemo(() => ({
    brokers: brokers.length,
    activeInventory: brokers.reduce((sum, b) => sum + b.activeCount, 0),
    quotaInventory: brokers.reduce((sum, b) => sum + b.quotaCount, 0),
    estimatedLicenseValue: brokers.reduce((sum, b) => sum + b.totalLicenseValue, 0),
  }), [brokers]);

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    setAuthenticated(false);
    setRecords([]);
  }

  async function copySummary() {
    if (!selected) return;
    const text = [
      `FLLM Broker Inventory Intelligence — ${selected.name}`,
      `${selected.activeCount} active Florida business opportunities observed`,
      `${selected.counties} counties represented`,
      `${selected.quotaCount} quota-license packages`,
      `${money(selected.totalAsk)} combined observed asking-price inventory`,
      `${money(selected.totalLicenseValue)} FLLM estimated combined liquor-license value`,
      `${selected.averageDays} average days observed`,
      "",
      "Prepared by Florida Liquor License Market from FLLM market-observation data. This report excludes FLLM private identity-resolution evidence and internal research notes.",
    ].join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  if (authenticated === false) {
    return <main className="bi-page"><AdminCodeLogin title="Broker Intelligence" onAuthenticated={load} /></main>;
  }

  if (reportMode && selected) {
    return (
      <main className="bi-report">
        <header className="bi-report-toolbar no-print">
          <button onClick={() => setReportMode(false)}>← Back to private dashboard</button>
          <button onClick={() => void copySummary()}>{copied ? "Copied" : "Copy report summary"}</button>
          <button className="primary" onClick={() => window.print()}>Print / Save PDF</button>
        </header>
        <div className="bi-report-sheet">
          <header className="bi-report-head">
            <div>
              <span>Florida Liquor License Market</span>
              <h1>Broker Inventory Intelligence</h1>
              <p>Broker-safe market-observation summary</p>
            </div>
            <div className="bi-report-broker">
              <span>Prepared for</span>
              <strong>{selected.name}</strong>
              {selected.brokerName && selected.brokerage && <small>{selected.brokerName}</small>}
            </div>
          </header>

          <section className="bi-report-kpis">
            <div><span>Active opportunities</span><strong>{selected.activeCount}</strong></div>
            <div><span>Counties represented</span><strong>{selected.counties}</strong></div>
            <div><span>Quota-license packages</span><strong>{selected.quotaCount}</strong></div>
            <div><span>FLLM est. license value</span><strong>{shortMoney(selected.totalLicenseValue)}</strong></div>
            <div><span>Observed asking inventory</span><strong>{shortMoney(selected.totalAsk)}</strong></div>
            <div><span>Avg. days observed</span><strong>{selected.averageDays}</strong></div>
          </section>

          <section className="bi-report-grid">
            <BarChart data={countyData} title="Active inventory by county" />
            <DonutChart data={licenseData} title="License-type mix" />
            <DonutChart data={businessData} title="Business-type mix" />
            <ValueBarChart data={valueData} title="Estimated liquor-license value by listing" />
            <LineChart records={selected.records} />
          </section>

          <section className="bi-report-table-card">
            <h2>Observed active inventory</h2>
            <table>
              <thead><tr><th>Reference</th><th>County / City</th><th>Business type</th><th>License type</th><th>Asking price</th><th>FLLM est. license value</th><th>Days observed</th></tr></thead>
              <tbody>
                {selected.activeRecords.map((row) => (
                  <tr key={row.listing_reference}>
                    <td><strong>{row.listing_reference}</strong>{row.source_listing_title && <small>{row.source_listing_title}</small>}</td>
                    <td>{row.county}{row.city ? ` / ${row.city}` : ""}</td>
                    <td>{row.business_type || "—"}</td>
                    <td>{row.license_type || "—"}</td>
                    <td>{row.asking_price ? money(row.asking_price) : "—"}</td>
                    <td><strong>{effectiveLicenseValue(row).label}</strong><small>{licenseValueBasisLabel(row)}</small></td>
                    <td>{daysObserved(row)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <footer className="bi-report-footer">
            <strong>Florida Liquor License Market</strong>
            <p>Prepared from FLLM market-observation data for business-development purposes. FLLM Est. License Value is a market estimate, not an appraisal. Private inferred identities, confidence scores, owner information, source-evidence chains, and internal research notes are intentionally excluded from this broker-facing report.</p>
          </footer>
        </div>
      </main>
    );
  }

  return (
    <main className="bi-page">
      <header className="bi-header">
        <div>
          <span>Private FLLM owner administration</span>
          <h1>Broker Intelligence</h1>
          <p>Turn the private market-intelligence database into broker prospecting leverage, visual inventory analysis and broker-safe reports.</p>
        </div>
        <nav>
          <Link href="/admin/market-intelligence">Market Intelligence</Link>
          <Link href="/admin/broker-outreach">Broker Outreach</Link>
          <button onClick={() => void load()} disabled={loading}>{loading ? "Refreshing…" : "Refresh"}</button>
          <button onClick={logout}>Sign Out</button>
        </nav>
      </header>

      {error && <p className="bi-error">{error}</p>}

      <section className="bi-global-kpis">
        <div><span>Brokers identified</span><strong>{portfolioStats.brokers}</strong></div>
        <div><span>Active broker inventory</span><strong>{portfolioStats.activeInventory}</strong></div>
        <div><span>Quota packages</span><strong>{portfolioStats.quotaInventory}</strong></div>
        <div><span>Combined est. license value</span><strong>{shortMoney(portfolioStats.estimatedLicenseValue)}</strong></div>
      </section>

      <section className="bi-workspace">
        <aside className="bi-broker-list">
          <div className="bi-list-head">
            <span>Prospecting priority</span>
            <h2>Broker Opportunity Score</h2>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search broker or brokerage…" />
          </div>
          <div className="bi-broker-scroll">
            {filteredBrokers.map((broker, index) => (
              <button key={broker.key} className={selected?.key === broker.key ? "selected" : ""} onClick={() => setSelectedKey(broker.key)}>
                <div className="bi-rank"><span>#{index + 1}</span><strong>{broker.opportunityScore}</strong></div>
                <div className="bi-broker-copy">
                  <strong>{broker.name}</strong>
                  <small>{broker.activeCount} active · {broker.quotaCount} quota · {broker.counties} counties</small>
                  <em>{shortMoney(broker.totalLicenseValue)} est. license value</em>
                </div>
              </button>
            ))}
            {!filteredBrokers.length && <p className="bi-empty">No broker-linked records found.</p>}
          </div>
        </aside>

        <section className="bi-dashboard">
          {!selected ? <p className="bi-empty">Add broker or brokerage names to Market Intelligence records to activate this dashboard.</p> : <>
            <header className="bi-broker-head">
              <div>
                <span>Selected broker portfolio</span>
                <h2>{selected.name}</h2>
                <p>{selected.brokerName && selected.brokerage ? `${selected.brokerName} · ${selected.brokerage}` : selected.brokerage || selected.brokerName || "Broker-linked FLLM market intelligence"}</p>
              </div>
              <div className="bi-score">
                <span>Opportunity score</span>
                <strong>{selected.opportunityScore}<small>/100</small></strong>
                <em>{selected.opportunityScore >= 75 ? "Priority prospect" : selected.opportunityScore >= 50 ? "Strong prospect" : "Developing prospect"}</em>
              </div>
              <div className="bi-actions">
                <button onClick={() => setReportMode(true)}>Generate Broker Report</button>
                <button className="secondary" onClick={() => void copySummary()}>{copied ? "Copied" : "Copy Outreach Summary"}</button>
              </div>
            </header>

            <section className="bi-private-note">
              <strong>Private / broker-safe separation is active.</strong>
              <span>This dashboard may use FLLM's private identity-resolution database internally. Generated Broker Reports omit inferred business identities, confidence scores, owner data, evidence chains, source-research notes and internal matching logic.</span>
            </section>

            <section className="bi-kpis">
              <div><span>Active listings</span><strong>{selected.activeCount}</strong></div>
              <div><span>Quota packages</span><strong>{selected.quotaCount}</strong></div>
              <div><span>Counties</span><strong>{selected.counties}</strong></div>
              <div><span>Observed asking inventory</span><strong>{shortMoney(selected.totalAsk)}</strong></div>
              <div><span>FLLM est. license value</span><strong>{shortMoney(selected.totalLicenseValue)}</strong></div>
              <div><span>Avg. days observed</span><strong>{selected.averageDays}</strong></div>
            </section>

            <section className="bi-chart-grid">
              <BarChart data={countyData} title="Active inventory by county" />
              <DonutChart data={licenseData} title="License-type mix" />
              <DonutChart data={businessData} title="Business-type mix" />
              <ValueBarChart data={valueData} title="Estimated license value by listing" />
              <LineChart records={selected.records} />
            </section>

            <section className="bi-private-table">
              <header><div><span>Private inventory detail</span><h3>{selected.records.length} broker-linked records</h3></div><p>Private names and confidence data remain visible only here.</p></header>
              <div className="bi-table-wrap">
                <table>
                  <thead><tr><th>Private best guess</th><th>Reference</th><th>County</th><th>Type</th><th>License</th><th>Ask</th><th>FLLM value</th><th>Confidence</th><th>Status</th></tr></thead>
                  <tbody>
                    {selected.records.map((row) => (
                      <tr key={row.listing_reference}>
                        <td><strong>{row.business_name || "Unresolved"}</strong><small>{row.legal_entity_name || row.source_listing_title || ""}</small></td>
                        <td>{row.listing_reference}</td>
                        <td>{row.county}{row.city ? <small>{row.city}</small> : null}</td>
                        <td>{row.business_type || "—"}</td>
                        <td>{row.license_type || "—"}</td>
                        <td>{row.asking_price ? money(row.asking_price) : "—"}</td>
                        <td><strong>{effectiveLicenseValue(row).label}</strong><small>{licenseValueBasisLabel(row)}</small></td>
                        <td>{row.identification_confidence === null ? "—" : `${row.identification_confidence}%`}</td>
                        <td><span className={`bi-status ${row.market_status}`}>{row.market_status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>}
        </section>
      </section>
    </main>
  );
}
