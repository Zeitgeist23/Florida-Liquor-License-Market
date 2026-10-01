"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

import AdminCodeLogin from "@/components/AdminCodeLogin";

type Daily = {
  date: string;
  clicks: number;
  impressions: number;
  averagePosition: number | null;
  status: "finalized" | "preliminary" | "manual";
  sourceNote: string | null;
  createdAt: string;
  updatedAt: string;
};

type Payload = {
  baseline: { throughDate: string; clicks: number; impressions: number; sourceNote: string | null } | null;
  daily: Daily[];
  lifetimeClicks: number;
  lifetimeImpressions: number;
  lifetimeCtr: number;
  bestClicks: Daily | null;
  bestImpressions: Daily | null;
  error?: string;
};

function number(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function pct(value: number) {
  return `${value.toFixed(2)}%`;
}

export default function SearchPerformanceClient() {
  const [data, setData] = useState<Payload | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    date: "",
    clicks: "",
    impressions: "",
    averagePosition: "",
    status: "finalized",
    sourceNote: "",
  });

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/search-performance", { cache: "no-store" });
      if (response.status === 401) {
        setAuthenticated(false);
        setData(null);
        return;
      }
      const payload = await response.json() as Payload;
      if (!response.ok) throw new Error(payload.error || "Could not load search performance.");
      setAuthenticated(true);
      setData(payload);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load search performance.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  async function save(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/admin/search-performance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: form.date,
          clicks: Number(form.clicks),
          impressions: Number(form.impressions),
          averagePosition: form.averagePosition ? Number(form.averagePosition) : null,
          status: form.status,
          sourceNote: form.sourceNote || null,
        }),
      });
      const payload = await response.json() as Payload;
      if (!response.ok) throw new Error(payload.error || "Could not save daily metrics.");
      setData(payload);
      setForm({ date: "", clicks: "", impressions: "", averagePosition: "", status: "finalized", sourceNote: "" });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save daily metrics.");
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    setAuthenticated(false);
    setData(null);
  }

  const latest = useMemo(() => data?.daily[0] ?? null, [data]);

  if (authenticated === false) {
    return <main className="searchperf-page"><AdminCodeLogin title="Search Performance" onAuthenticated={load} /></main>;
  }

  return (
    <main className="searchperf-page">
      <header className="searchperf-header">
        <div>
          <span>Private FLLM administration</span>
          <h1>Lifetime Search Performance</h1>
          <p>Permanent Google Search Console history that does not roll off with Google&apos;s reporting windows.</p>
        </div>
        <nav>
          <Link href="/admin/leads">Lead Desk</Link>
          <Link href="/admin/listing-submissions">Listing Review</Link>
          <button type="button" onClick={() => void load()} disabled={loading}>Refresh</button>
          <button type="button" onClick={logout}>Sign Out</button>
        </nav>
      </header>

      {error && <p className="searchperf-error">{error}</p>}
      {!data && <div className="searchperf-loading">{loading ? "Loading search history…" : "No search history available."}</div>}

      {data && (
        <>
          <section className="searchperf-stats">
            <div><span>Lifetime Clicks</span><strong>{number(data.lifetimeClicks)}</strong></div>
            <div><span>Lifetime Impressions</span><strong>{number(data.lifetimeImpressions)}</strong></div>
            <div><span>Lifetime CTR</span><strong>{pct(data.lifetimeCtr)}</strong></div>
            <div><span>Latest Daily Record</span><strong>{latest ? latest.date : "—"}</strong></div>
          </section>

          <section className="searchperf-baseline">
            <div>
              <span>Permanent baseline</span>
              <strong>{data.baseline ? `${number(data.baseline.clicks)} clicks / ${number(data.baseline.impressions)} impressions` : "No baseline"}</strong>
              <small>{data.baseline ? `Through ${data.baseline.throughDate}. Future daily records are added after this date.` : "Daily records alone are being summed."}</small>
            </div>
            <div>
              <span>Record finalized clicks</span>
              <strong>{data.bestClicks ? `${number(data.bestClicks.clicks)} — ${data.bestClicks.date}` : "—"}</strong>
            </div>
            <div>
              <span>Record finalized impressions</span>
              <strong>{data.bestImpressions ? `${number(data.bestImpressions.impressions)} — ${data.bestImpressions.date}` : "—"}</strong>
            </div>
          </section>

          <section className="searchperf-entry">
            <div>
              <span>Daily Search Console archive</span>
              <h2>Add or update a day</h2>
              <p>Use finalized calendar-day figures when available. Re-entering the same date updates that day instead of double-counting it.</p>
            </div>
            <form onSubmit={save}>
              <label><span>Date</span><input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></label>
              <label><span>Clicks</span><input type="number" min="0" step="1" required value={form.clicks} onChange={(e) => setForm({ ...form, clicks: e.target.value })} /></label>
              <label><span>Impressions</span><input type="number" min="0" step="1" required value={form.impressions} onChange={(e) => setForm({ ...form, impressions: e.target.value })} /></label>
              <label><span>Avg. position</span><input type="number" min="0" step="0.01" value={form.averagePosition} onChange={(e) => setForm({ ...form, averagePosition: e.target.value })} /></label>
              <label><span>Status</span><select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option value="finalized">Finalized</option><option value="preliminary">Preliminary</option><option value="manual">Manual</option></select></label>
              <label className="wide"><span>Source note</span><input placeholder="e.g. Search Console daily export" value={form.sourceNote} onChange={(e) => setForm({ ...form, sourceNote: e.target.value })} /></label>
              <button type="submit" disabled={saving}>{saving ? "Saving…" : "Save Daily Metrics"}</button>
            </form>
          </section>

          <section className="searchperf-history">
            <div className="searchperf-title"><span>Permanent archive</span><strong>{data.daily.length} daily records</strong></div>
            <div className="searchperf-table-wrap">
              <table>
                <thead><tr><th>Date</th><th>Clicks</th><th>Impressions</th><th>CTR</th><th>Avg. position</th><th>Status</th><th>Source</th></tr></thead>
                <tbody>
                  {data.daily.map((row) => (
                    <tr key={row.date}>
                      <td><strong>{row.date}</strong></td>
                      <td>{number(row.clicks)}</td>
                      <td>{number(row.impressions)}</td>
                      <td>{row.impressions ? pct((row.clicks / row.impressions) * 100) : "0.00%"}</td>
                      <td>{row.averagePosition === null ? "—" : row.averagePosition.toFixed(2)}</td>
                      <td><span className={`status ${row.status}`}>{row.status}</span></td>
                      <td>{row.sourceNote || "—"}</td>
                    </tr>
                  ))}
                  {!data.daily.length && <tr><td colSpan={7} className="empty">No post-baseline daily records yet.</td></tr>}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
