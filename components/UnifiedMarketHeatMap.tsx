"use client";

import { useMemo, useRef, useState } from "react";
import { FLORIDA_COUNTY_PATHS } from "@/components/FloridaCountyMap";

export type UnifiedHeatMapRow = {
  name: string;
  slug: string;
  listingCount: number;
  fourCopMedian: number | null;
  threePsMedian: number | null;
  fourCopHigh: number | null;
  threePsHigh: number | null;
};

type Mode = "inventory" | "median" | "highest";
type Series = "4cop" | "3ps";
type MapPin = { x: number; y: number; color: string } | null;

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

function highestColor(value: number | null, hasListing: boolean) {
  if (!hasListing) return "#24323b";
  if (value === null) return "#8797a2";
  if (value >= 750000) return "#ef4327";
  if (value >= 600000) return "#f37b20";
  if (value >= 450000) return "#f5ad1f";
  if (value >= 300000) return "#a9a92b";
  return "#439848";
}

export default function UnifiedMarketHeatMap({ rows }: { rows: UnifiedHeatMapRow[] }) {
  const [mode, setMode] = useState<Mode>("inventory");
  const [series, setSeries] = useState<Series>("4cop");
  const [active, setActive] = useState<UnifiedHeatMapRow | null>(null);
  const [pin, setPin] = useState<MapPin>(null);
  const detailRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const byCounty = useMemo(() => new Map(rows.map((row) => [key(row.name), row])), [rows]);

  const seriesLabel = series === "4cop" ? "4COP" : "3PS";
  const medianValue = (row: UnifiedHeatMapRow) => series === "4cop" ? row.fourCopMedian : row.threePsMedian;
  const highValue = (row: UnifiedHeatMapRow) => series === "4cop" ? row.fourCopHigh : row.threePsHigh;
  const metric = (row: UnifiedHeatMapRow) => mode === "inventory" ? row.listingCount : mode === "median" ? medianValue(row) ?? 0 : highValue(row) ?? 0;

  const ranking = useMemo(() => [...rows]
    .filter((row) => mode === "inventory" ? row.listingCount > 0 : mode === "median" ? medianValue(row) !== null : highValue(row) !== null)
    .sort((a, b) => metric(b) - metric(a))
    .slice(0, 5), [rows, mode, series]);
  const max = Math.max(1, ...ranking.map(metric));

  const legend = mode === "inventory" ? INVENTORY_LEGEND : mode === "median" ? MEDIAN_LEGEND : HIGH_LEGEND;
  const titleText = mode === "inventory"
    ? "Active listings by county"
    : mode === "median"
      ? `County median ${seriesLabel} prices`
      : `Highest current ${seriesLabel} asking price`;
  const kicker = mode === "inventory" ? "Inventory View" : "Price View";

  function rowFill(row: UnifiedHeatMapRow | undefined) {
    if (mode === "inventory") return inventoryColor(row?.listingCount ?? 0);
    if (mode === "median") return medianColor(row ? medianValue(row) : null);
    return highestColor(row ? highValue(row) : null, Boolean(row && row.listingCount > 0));
  }

  function getCountyPath(row: UnifiedHeatMapRow) {
    return Array.from(stageRef.current?.querySelectorAll<SVGPathElement>("[data-heat-map-county]") ?? [])
      .find((candidate) => candidate.dataset.heatMapCounty === row.name) ?? null;
  }

  function getMapScreenBounds() {
    const paths = Array.from(stageRef.current?.querySelectorAll<SVGPathElement>("[data-heat-map-county]") ?? []);
    if (!paths.length) return null;

    let left = Number.POSITIVE_INFINITY;
    let right = Number.NEGATIVE_INFINITY;
    let top = Number.POSITIVE_INFINITY;
    let bottom = Number.NEGATIVE_INFINITY;

    for (const path of paths) {
      const bounds = path.getBoundingClientRect();
      if (!bounds.width && !bounds.height) continue;
      left = Math.min(left, bounds.left);
      right = Math.max(right, bounds.right);
      top = Math.min(top, bounds.top);
      bottom = Math.max(bottom, bounds.bottom);
    }

    if (![left, right, top, bottom].every(Number.isFinite)) return null;
    return { left, right, top, bottom };
  }

  function positionDetail(row: UnifiedHeatMapRow) {
    const detail = detailRef.current;
    const stage = stageRef.current;
    const path = getCountyPath(row);
    const mapBounds = getMapScreenBounds();
    if (!detail || !stage || !path || !mapBounds) return;

    const pathBounds = path.getBoundingClientRect();
    const stageBounds = stage.getBoundingClientRect();
    const width = detail.offsetWidth || 214;
    const height = detail.offsetHeight || 178;
    const countyCenterX = pathBounds.left + pathBounds.width / 2;
    const countyCenterY = pathBounds.top + pathBounds.height / 2;
    const mapCenterX = (mapBounds.left + mapBounds.right) / 2;
    const eastSide = countyCenterX >= mapCenterX;
    const gap = 10;

    let left = eastSide ? mapBounds.right + gap : mapBounds.left - width - gap;
    const minLeft = Math.max(8, stageBounds.left + 4);
    const maxLeft = Math.min(window.innerWidth - width - 8, stageBounds.right - width - 4);
    left = Math.max(minLeft, Math.min(left, maxLeft));

    let top = countyCenterY - height / 2;
    const minTop = Math.max(8, stageBounds.top + 4);
    const maxTop = Math.min(window.innerHeight - height - 8, stageBounds.bottom - height - 4);
    top = Math.max(minTop, Math.min(top, maxTop));

    detail.style.position = "fixed";
    detail.style.left = `${left}px`;
    detail.style.top = `${top}px`;
    detail.style.right = "auto";
    detail.style.bottom = "auto";
  }

  function setPinFromPath(path: SVGGraphicsElement, row: UnifiedHeatMapRow) {
    const bounds = path.getBBox();
    setPin({
      x: bounds.x + bounds.width / 2,
      y: bounds.y + bounds.height / 2,
      color: rowFill(row),
    });
  }

  function setPinFromRow(row: UnifiedHeatMapRow) {
    const path = getCountyPath(row);
    if (path) setPinFromPath(path, row);
  }

  function activate(row: UnifiedHeatMapRow, target: Element) {
    setActive(row);
    const path = target.matches("path") ? target : target.querySelector("path");
    if (path instanceof SVGGraphicsElement) setPinFromPath(path, row);
    else setPinFromRow(row);
    window.requestAnimationFrame(() => positionDetail(row));
  }

  function activateFromElement(row: UnifiedHeatMapRow, target: Element) {
    activate(row, target);
  }

  function deactivate() {
    setActive(null);
    setPin(null);
  }

  const titleNode = mode === "inventory"
    ? titleText
    : <>{mode === "median" ? "County median " : "Highest current "}<span className="heat-map-series-code">{seriesLabel}</span>{mode === "median" ? " prices" : " asking price"}</>;
  const legendTitleNode = mode === "inventory"
    ? "Marketplace availability"
    : <>{mode === "median" ? "Median " : "Highest "}<span className="heat-map-series-code">{seriesLabel}</span>{mode === "median" ? " asking ranges" : " asking price"}</>;

  return <section className={`unified-heat-map unified-heat-map--${mode} unified-heat-map--${series}`}>
    <div className="unified-heat-map-toolbar">
      <div><span>{kicker}</span><h2>{titleNode}</h2></div>
      <div className="unified-heat-map-controls">
        <div className="unified-heat-map-switch" role="group" aria-label="Choose heat map metric">
          <button className={mode === "inventory" ? "is-active" : ""} onClick={() => { setMode("inventory"); deactivate(); }}>Active Listings</button>
          <button className={mode === "median" ? "is-active" : ""} onClick={() => { setMode("median"); deactivate(); }}>Median Ask</button>
          <button className={mode === "highest" ? "is-active" : ""} onClick={() => { setMode("highest"); deactivate(); }}>Highest Current Ask</button>
        </div>
        <div className={`unified-heat-map-series-switch ${mode === "inventory" ? "is-placeholder" : ""}`} role="group" aria-label="Choose liquor license series" aria-hidden={mode === "inventory"}>
          <button tabIndex={mode === "inventory" ? -1 : 0} className={series === "4cop" ? "is-active" : ""} onClick={() => { setSeries("4cop"); deactivate(); }}><span className="heat-map-series-code">4COP</span></button>
          <button tabIndex={mode === "inventory" ? -1 : 0} className={series === "3ps" ? "is-active" : ""} onClick={() => { setSeries("3ps"); deactivate(); }}><span className="heat-map-series-code">3PS</span></button>
        </div>
      </div>
    </div>

    <div className="unified-heat-map-grid">
      <aside className="unified-heat-map-legend">
        <span>{mode === "inventory" ? "Listing Scale" : "Price Scale"}</span>
        <h3>{legendTitleNode}</h3>
        <ul>{legend.map(([color, label]) => <li key={label}><i style={{ background: color }} />{label}</li>)}</ul>
        <div className="unified-heat-map-ranking">
          <strong>{mode === "inventory" ? "Most active counties" : mode === "median" ? `Highest ${seriesLabel} median asks` : `Highest ${seriesLabel} asks`}</strong>
          <ol>{ranking.map((row) => <li
            key={row.slug}
            onPointerEnter={(event) => activate(row, event.currentTarget)}
            onPointerMove={() => active?.slug === row.slug && positionDetail(row)}
            onPointerLeave={deactivate}
            onFocus={(event) => activateFromElement(row, event.currentTarget)}
            onBlur={deactivate}
          >
            <a href={`/counties/${row.slug}`}>{row.name.replace(/ County$/i, "")}</a>
            <b>{mode === "inventory" ? row.listingCount : money(metric(row))}</b>
            <em><span style={{ width: `${Math.max(8, metric(row) / max * 100)}%` }} /></em>
          </li>)}</ol>
        </div>
        <small>Current FLLM marketplace inventory. Asking prices are not appraisals or verified closed-sale values.</small>
      </aside>

      <div className="unified-heat-map-stage" ref={stageRef}>
        <svg viewBox="135 10 295 275" role="img" aria-label={`Florida liquor license heat map: ${titleText}`}>
          <g>{FLORIDA_COUNTY_PATHS.map((county) => {
            const row = byCounty.get(key(county.name));
            const label = row
              ? `${row.name}: ${mode === "inventory" ? `${row.listingCount} active listings` : `${money(mode === "median" ? medianValue(row) : highValue(row))} ${seriesLabel} ${mode === "median" ? "median ask" : "highest current ask"}`}`
              : county.name;
            return <a
              key={county.id}
              href={row ? `/counties/${row.slug}` : "/counties"}
              aria-label={label}
              className={row && active?.slug === row.slug ? "is-active" : undefined}
              onPointerEnter={(event) => row && activate(row, event.currentTarget)}
              onPointerMove={() => row && active?.slug === row.slug && positionDetail(row)}
              onPointerLeave={deactivate}
              onFocus={(event) => row && activateFromElement(row, event.currentTarget)}
              onBlur={deactivate}
            >
              <path data-heat-map-county={row?.name ?? `${county.name} County`} d={county.path} fill={rowFill(row)} />
            </a>;
          })}</g>
          {pin ? <g transform={`translate(${pin.x} ${pin.y})`} aria-hidden="true" className="unified-heat-map-pin">
            <line x1="0" y1="-23" x2="0" y2="-3" />
            <circle className="unified-heat-map-pin-head" cx="0" cy="-27" r="5.4" fill={pin.color} />
            <circle className="unified-heat-map-pin-shine" cx="-1.5" cy="-28.5" r="1.2" />
            <circle className="unified-heat-map-pin-point" cx="0" cy="0" r="1.8" fill={pin.color} />
          </g> : null}
        </svg>
        {active ? <aside ref={detailRef} className="unified-heat-map-detail">
          <span>{active.name}</span>
          <strong>{mode === "inventory" ? `${active.listingCount} active listing${active.listingCount === 1 ? "" : "s"}` : `${money(mode === "median" ? medianValue(active) : highValue(active))} ${seriesLabel} ${mode === "median" ? "median ask" : "highest current ask"}`}</strong>
          <dl>
            <div><dt>4COP median</dt><dd>{money(active.fourCopMedian)}</dd></div>
            <div><dt>3PS median</dt><dd>{money(active.threePsMedian)}</dd></div>
            <div><dt>4COP high</dt><dd>{money(active.fourCopHigh)}</dd></div>
            <div><dt>3PS high</dt><dd>{money(active.threePsHigh)}</dd></div>
            <div><dt>Active listings</dt><dd>{active.listingCount}</dd></div>
          </dl>
          <a href={`/counties/${active.slug}`}>Open county market →</a>
        </aside> : null}
      </div>
    </div>
  </section>;
}
