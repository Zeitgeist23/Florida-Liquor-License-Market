"use client";

import { useMemo, useState } from "react";
import { FLORIDA_COUNTY_PATHS } from "@/components/FloridaCountyMap";

export type BusinessMarketHeatMapRow = {
  name: string;
  slug: string;
  businessCount: number;
  businessAverage: number | null;
  quotaCount: number;
  quotaAverage: number | null;
};

type Mode = "business" | "quota" | "inventory";

const PRICE_LEGEND = [
  ["#193552", "No disclosed asking-price data"],
  ["#439848", "Under $250,000"],
  ["#a9a92b", "$250,000–$499,999"],
  ["#f5ad1f", "$500,000–$749,999"],
  ["#f37b20", "$750,000–$999,999"],
  ["#ef4327", "$1,000,000+"],
] as const;

const INVENTORY_LEGEND = [
  ["#193552", "0 matching listings"],
  ["#195b86", "1 matching listing"],
  ["#167ea8", "2 matching listings"],
  ["#1bbbd0", "3–4 matching listings"],
  ["#7357e8", "5–7 matching listings"],
  ["#a855f7", "8+ matching listings"],
] as const;

function key(value: string) {
  return value.replace(/\s+County$/i, "").replace(/[^a-z]/gi, "").toLowerCase();
}

function money(value: number | null) {
  if (value === null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function priceColor(value: number | null) {
  if (value === null) return PRICE_LEGEND[0][0];
  if (value >= 1_000_000) return PRICE_LEGEND[5][0];
  if (value >= 750_000) return PRICE_LEGEND[4][0];
  if (value >= 500_000) return PRICE_LEGEND[3][0];
  if (value >= 250_000) return PRICE_LEGEND[2][0];
  return PRICE_LEGEND[1][0];
}

function inventoryColor(count: number) {
  if (count >= 8) return INVENTORY_LEGEND[5][0];
  if (count >= 5) return INVENTORY_LEGEND[4][0];
  if (count >= 3) return INVENTORY_LEGEND[3][0];
  if (count >= 2) return INVENTORY_LEGEND[2][0];
  if (count >= 1) return INVENTORY_LEGEND[1][0];
  return INVENTORY_LEGEND[0][0];
}

export default function BusinessMarketHeatMap({
  rows,
  categoryLabel,
  benchmarkLabel,
  categorySlug,
  licenseSlug,
  selectedCountySlug,
}: {
  rows: BusinessMarketHeatMapRow[];
  categoryLabel: string;
  benchmarkLabel: string;
  categorySlug: string;
  licenseSlug: string;
  selectedCountySlug: string;
}) {
  const [mode, setMode] = useState<Mode>("business");
  const [active, setActive] = useState<BusinessMarketHeatMapRow | null>(null);

  const byCounty = useMemo(
    () => new Map(rows.map((row) => [key(row.name), row])),
    [rows],
  );

  const metric = (row: BusinessMarketHeatMapRow) =>
    mode === "business"
      ? row.businessAverage
      : mode === "quota"
        ? row.quotaAverage
        : row.businessCount;

  const ranked = useMemo(
    () =>
      rows
        .map((row) => ({ row, value: metric(row) }))
        .filter(
          (item): item is { row: BusinessMarketHeatMapRow; value: number } =>
            typeof item.value === "number" && Number.isFinite(item.value) && item.value > 0,
        )
        .sort((a, b) => b.value - a.value || a.row.name.localeCompare(b.row.name))
        .slice(0, 5),
    [rows, mode],
  );

  const max = Math.max(1, ...ranked.map((item) => item.value));
  const legend = mode === "inventory" ? INVENTORY_LEGEND : PRICE_LEGEND;
  const title =
    mode === "business"
      ? `Average ${categoryLabel} asking price by county`
      : mode === "quota"
        ? `Average ${benchmarkLabel} asking price by county`
        : `${categoryLabel} market observations by county`;

  function rowColor(row: BusinessMarketHeatMapRow | undefined) {
    if (!row) return mode === "inventory" ? INVENTORY_LEGEND[0][0] : PRICE_LEGEND[0][0];
    if (mode === "inventory") return inventoryColor(row.businessCount);
    return priceColor(mode === "business" ? row.businessAverage : row.quotaAverage);
  }

  return (
    <section className="business-market-heat-map">
      <div className="business-market-heat-map-toolbar">
        <div>
          <span>FLLM Market Landscape</span>
          <h2>{title}</h2>
        </div>
        <div className="business-market-heat-map-switch" role="group" aria-label="Choose market-view metric">
          <button className={mode === "business" ? "is-active" : ""} onClick={() => setMode("business")}>
            Business Avg Ask
          </button>
          <button className={mode === "quota" ? "is-active" : ""} onClick={() => setMode("quota")}>
            Quota Avg Ask
          </button>
          <button className={mode === "inventory" ? "is-active" : ""} onClick={() => setMode("inventory")}>
            Matching Listings
          </button>
        </div>
      </div>

      <div className="business-market-heat-map-grid">
        <aside className="business-market-heat-map-legend">
          <span>{mode === "inventory" ? "Observation Scale" : "Average Asking-Price Scale"}</span>
          <h3>{mode === "business" ? categoryLabel : mode === "quota" ? benchmarkLabel : `${categoryLabel} inventory`}</h3>
          <ul>
            {legend.map(([color, label]) => (
              <li key={label}>
                <i style={{ background: color }} />
                <span>{label}</span>
              </li>
            ))}
          </ul>

          <div className="business-market-heat-map-ranking">
            <strong>{mode === "inventory" ? "Most observations" : "Highest county averages"}</strong>
            <ol>
              {ranked.map(({ row, value }) => (
                <li
                  key={`${mode}-${row.slug}`}
                  onPointerEnter={() => setActive(row)}
                  onPointerLeave={() => setActive(null)}
                  onFocus={() => setActive(row)}
                  onBlur={() => setActive(null)}
                >
                  <a href={`/market-data/businesses/${row.slug}/${categorySlug}/${licenseSlug}`}>
                    {row.name.replace(/ County$/i, "")}
                  </a>
                  <b>{mode === "inventory" ? value : money(value)}</b>
                  <em><span style={{ width: `${Math.max(8, (value / max) * 100)}%` }} /></em>
                </li>
              ))}
            </ol>
          </div>
          <small>
            Business figures use observed advertised asking prices in FLLM&apos;s business-market dataset. Quota figures use FLLM&apos;s standalone quota-license marketplace dataset.
          </small>
        </aside>

        <div className="business-market-heat-map-stage">
          <svg viewBox="135 10 295 275" role="img" aria-label={title}>
            <g>
              {FLORIDA_COUNTY_PATHS.map((county) => {
                const row = byCounty.get(key(county.name));
                const rowSlug = row?.slug ?? "";
                const label = row
                  ? `${row.name}: ${row.businessCount} matching ${categoryLabel.toLowerCase()} observations, average business ask ${money(row.businessAverage)}, average ${benchmarkLabel} ask ${money(row.quotaAverage)}`
                  : county.name;
                return (
                  <a
                    key={county.id}
                    href={row ? `/market-data/businesses/${row.slug}/${categorySlug}/${licenseSlug}` : undefined}
                    aria-label={label}
                    className={[
                      row && active?.slug === row.slug ? "is-active" : "",
                      rowSlug === selectedCountySlug ? "is-selected" : "",
                    ].filter(Boolean).join(" ")}
                    onPointerEnter={() => row && setActive(row)}
                    onPointerLeave={() => setActive(null)}
                    onFocus={() => row && setActive(row)}
                    onBlur={() => setActive(null)}
                  >
                    <path d={county.path} fill={rowColor(row)} />
                  </a>
                );
              })}
            </g>
          </svg>

          {active ? (
            <aside className="business-market-heat-map-detail">
              <span>{active.name}</span>
              <strong>{active.businessCount} matching observation{active.businessCount === 1 ? "" : "s"}</strong>
              <dl>
                <div><dt>{categoryLabel} avg ask</dt><dd>{money(active.businessAverage)}</dd></div>
                <div><dt>{benchmarkLabel} avg ask</dt><dd>{money(active.quotaAverage)}</dd></div>
                <div><dt>Business observations</dt><dd>{active.businessCount}</dd></div>
                <div><dt>Quota observations</dt><dd>{active.quotaCount}</dd></div>
              </dl>
              <a href={`/market-data/businesses/${active.slug}/${categorySlug}/${licenseSlug}`}>
                Open county market view →
              </a>
            </aside>
          ) : null}
        </div>
      </div>
    </section>
  );
}
