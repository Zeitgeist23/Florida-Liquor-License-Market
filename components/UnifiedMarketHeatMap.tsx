"use client";

import { useMemo, useState } from "react";
import { FLORIDA_COUNTY_PATHS } from "@/components/FloridaCountyMap";

export type UnifiedHeatMapRow = {
  name: string;
  slug: string;
  listingCount: number;
  fourCopMedian: number | null;
  threePsMedian: number | null;
  highestAsk: number | null;
};

type Mode = "inventory" | "median" | "highest";

const INVENTORY_LEGEND = [
  ["#193552", "0 listings"], ["#195b86", "1–2 listings"], ["#167ea8", "3–5 listings"],
  ["#1bbbd0", "6–8 listings"], ["#7357e8", "9–11 listings"], ["#a855f7", "12+ listings"],
] as const;

const MEDIAN_LEGEND = [
  ["#193552", "No disclosed price"], ["#75c9ff", "Under $200K"], ["#38a8df", "$200K–$299K"],
  ["#6366e8", "$300K–$449K"], ["#8b5cf6", "$450K–$649K"], ["#f05a32", "$650K–$799K"], ["#dc2626", "$800K+"],
] as const;

const HIGH_LEGEND = [
  ["#24323b", "No current listings"], ["#8797a2", "Price undisclosed"], ["#439848", "Under $300,000"],
  ["#a9a92b", "$300,000–$449,999"], ["#f5ad1f", "$450,000–$599,999"], ["#f37b20", "$600,000–$749,999"], ["#ef4327", "$750,000+"],
] as const;

function key(value: string) {
  return value.replace(/\s+County$/i, "").replace(/[^a-z]/gi, "").toLowerCase();
}

function money(value: number | null) {
  if (value === null) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function inventoryColor(count: number) {
  if (count >= 12) return "#a855f7";
  if (count >= 9) return "#7357e8";
  if (count >= 6) return "#1bbbd0";
  if (count >= 3) return "#167ea8";
  if (count >= 1) return "#195b86";
  return "#193552";
}

function medianColor(value: number | null) {
  if (value === null) return "#193552";
  if (value >= 800000) return "#dc2626";
  if (value >= 650000) return "#f05a32";
  if (value >= 450000) return "#8b5cf6";
  if (value >= 300000) return "#6366e8";
  if (value >= 200000) return "#38a8df";
  return "#75c9ff";
}

function highestColor(row: UnifiedHeatMapRow | undefined) {
  if (!row || row.listingCount === 0) return "#24323b";
  const value = row.highestAsk;
  if (value === null) return "#8797a2";
  if (value >= 750000) return "#ef4327";
  if (value >= 600000) return "#f37b20";
  if (value >= 450000) return "#f5ad1f";
  if (value >= 300000) return "#a9a92b";
  return "#439848";
}

export default function UnifiedMarketHeatMap({ rows }: { rows: UnifiedHeatMapRow[] }) {
  const [mode, setMode] = useState<Mode>("inventory");
  const [active, setActive] = useState<UnifiedHeatMapRow | null>(null);
  const byCounty = useMemo(() => new Map(rows.map((row) => [key(row.name), row])), [rows]);

  const metric = (row: UnifiedHeatMapRow) => mode === "inventory" ? row.listingCount : mode === "median" ? row.fourCopMedian ?? 0 : row.highestAsk ?? 0;
  const ranking = useMemo(() => [...rows]
    .filter((row) => mode === "inventory" ? row.listingCount > 0 : mode === "median" ? row.fourCopMedian !== null : row.highestAsk !== null)
    .sort((a, b) => metric(b) - metric(a)).slice(0, 5), [rows, mode]);
  const max = Math.max(1, ...ranking.map(metric));

  const legend = mode === "inventory" ? INVENTORY_LEGEND : mode === "median" ? MEDIAN_LEGEND : HIGH_LEGEND;
  const title = mode === "inventory" ? "Active listings by county" : mode === "median" ? "County median 4COP prices" : "Highest current asking price";
  const kicker = mode === "inventory" ? "Inventory View" : "Price View";
  const legendTitle = mode === "inventory" ? "Marketplace availability" : mode === "median" ? "Median 4COP asking ranges" : "Highest asking price";

  return <section className="unified-heat-map">
    <div className="unified-heat-map-toolbar">
      <div><span>{kicker}</span><h2>{title}</h2></div>
      <div className="unified-heat-map-switch" role="group" aria-label="Choose heat map metric">
        <button className={mode === "inventory" ? "is-active" : ""} onClick={() => setMode("inventory")}>Active Listings</button>
        <button className={mode === "median" ? "is-active" : ""} onClick={() => setMode("median")}>Median 4COP Ask</button>
        <button className={mode === "highest" ? "is-active" : ""} onClick={() => setMode("highest")}>Highest Current Ask</button>
      </div>
    </div>

    <div className="unified-heat-map-grid">
      <aside className="unified-heat-map-legend">
        <span>{mode === "inventory" ? "Listing Scale" : "Price Scale"}</span>
        <h3>{legendTitle}</h3>
        <ul>{legend.map(([color, label]) => <li key={label}><i style={{ background: color }} />{label}</li>)}</ul>
        <div className="unified-heat-map-ranking">
          <strong>{mode === "inventory" ? "Most active counties" : mode === "median" ? "Highest median asks" : "Highest current asks"}</strong>
          <ol>{ranking.map((row) => <li key={row.slug} onMouseEnter={() => setActive(row)} onMouseLeave={() => setActive(null)}>
            <a href={`/counties/${row.slug}`}>{row.name.replace(/ County$/i, "")}</a>
            <b>{mode === "inventory" ? row.listingCount : money(metric(row))}</b>
            <em><span style={{ width: `${Math.max(8, metric(row) / max * 100)}%` }} /></em>
          </li>)}</ol>
        </div>
        <small>Current FLLM marketplace inventory. Asking prices are not appraisals or verified closed-sale values.</small>
      </aside>

      <div className="unified-heat-map-stage">
        <svg viewBox="135 10 295 275" role="img" aria-label={`Florida liquor license heat map: ${title}`}>
          <g>{FLORIDA_COUNTY_PATHS.map((county) => {
            const row = byCounty.get(key(county.name));
            const fill = mode === "inventory" ? inventoryColor(row?.listingCount ?? 0) : mode === "median" ? medianColor(row?.fourCopMedian ?? null) : highestColor(row);
            return <a key={county.id} href={row ? `/counties/${row.slug}` : "/counties"}
              onMouseEnter={() => row && setActive(row)} onMouseLeave={() => setActive(null)} onFocus={() => row && setActive(row)} onBlur={() => setActive(null)}>
              <path d={county.path} fill={fill}><title>{row ? `${row.name}: ${mode === "inventory" ? `${row.listingCount} active listings` : mode === "median" ? `${money(row.fourCopMedian)} median 4COP ask` : `${money(row.highestAsk)} highest current ask`}` : county.name}</title></path>
            </a>;
          })}</g>
        </svg>
        {active ? <aside className="unified-heat-map-detail">
          <span>{active.name}</span>
          <strong>{mode === "inventory" ? `${active.listingCount} active listing${active.listingCount === 1 ? "" : "s"}` : mode === "median" ? `${money(active.fourCopMedian)} median 4COP ask` : `${money(active.highestAsk)} highest current ask`}</strong>
          <dl><div><dt>4COP median</dt><dd>{money(active.fourCopMedian)}</dd></div><div><dt>3PS median</dt><dd>{money(active.threePsMedian)}</dd></div><div><dt>Highest ask</dt><dd>{money(active.highestAsk)}</dd></div><div><dt>Active listings</dt><dd>{active.listingCount}</dd></div></dl>
          <a href={`/counties/${active.slug}`}>Open county market →</a>
        </aside> : null}
      </div>
    </div>
  </section>;
}
