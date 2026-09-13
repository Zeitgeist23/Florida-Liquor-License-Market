"use client";

import { useMemo, useRef, useState } from "react";
import { FLORIDA_COUNTY_PATHS } from "@/components/FloridaCountyMap";

export type CountyAvailabilityHeatMapRow = {
  name: string;
  slug: string;
  listingCount: number;
  population: number | null;
  fourCopMedian: number | null;
  threePsMedian: number | null;
  drawingLicenses: number;
};

function countyKey(value: string) {
  return value.replace(/\s+County$/i, "").replace(/[^a-z]/gi, "").toLowerCase();
}

function availabilityColor(count: number) {
  if (count >= 12) return "#a855f7";
  if (count >= 9) return "#7357e8";
  if (count >= 6) return "#1bbbd0";
  if (count >= 3) return "#167ea8";
  if (count >= 1) return "#195b86";
  return "#193552";
}

function money(value: number | null) {
  if (value === null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function CountyAvailabilityHeatMap({
  rows,
}: {
  rows: CountyAvailabilityHeatMapRow[];
}) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLElement>(null);

  const rowsByCounty = useMemo(
    () => new Map(rows.map((row) => [countyKey(row.name), row])),
    [rows],
  );
  const activeRow = activeSlug
    ? rows.find((row) => row.slug === activeSlug) ?? null
    : null;
  const summary = useMemo(() => {
    let totalListings = 0;
    let activeCounties = 0;
    let leadingCounty: CountyAvailabilityHeatMapRow | null = null;

    rows.forEach((row) => {
      totalListings += row.listingCount;
      if (row.listingCount > 0) activeCounties += 1;
      if (!leadingCounty || row.listingCount > leadingCounty.listingCount) leadingCounty = row;
    });

    return { totalListings, activeCounties, leadingCounty };
  }, [rows]);

  function positionTooltip(clientX: number, clientY: number) {
    const stage = stageRef.current;
    const tooltip = tooltipRef.current;
    if (!stage || !tooltip) return;

    const bounds = stage.getBoundingClientRect();
    const tooltipWidth = Math.min(270, Math.max(220, bounds.width - 24));
    const maxLeft = Math.max(12, bounds.width - tooltipWidth - 12);
    const maxTop = Math.max(12, bounds.height - 190);
    const left = Math.min(Math.max(12, clientX - bounds.left + 18), maxLeft);
    const top = Math.min(Math.max(12, clientY - bounds.top - 58), maxTop);

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  }

  function activateCounty(row: CountyAvailabilityHeatMapRow, clientX: number, clientY: number) {
    setActiveSlug(row.slug);
    positionTooltip(clientX, clientY);
  }

  return (
    <section className="county-availability-map-section" aria-labelledby="county-availability-map-title">
      <div className="directory-shell">
        <div className="directory-heading county-availability-map-heading">
          <div>
            <span>Statewide Market Distribution</span>
            <h2 id="county-availability-map-title">Florida liquor license availability by county</h2>
          </div>
          <p>
            Hover, focus or select a county to review current marketplace inventory and county-level market data.
          </p>
        </div>

        <div className="county-availability-map-layout">
          <div className="county-availability-map-stage" ref={stageRef}>
            <svg
              className="county-availability-map-svg"
              viewBox="135 10 295 275"
              role="img"
              aria-label="Interactive Florida county map shaded by active marketplace liquor license listings"
            >
              <g>
                {FLORIDA_COUNTY_PATHS.map((county) => {
                  const row = rowsByCounty.get(countyKey(county.name));
                  const listingCount = row?.listingCount ?? 0;
                  const label = row
                    ? `${row.name}: ${listingCount} active marketplace listing${listingCount === 1 ? "" : "s"}; open county market page`
                    : `${county.name} County: no active marketplace listings`;

                  return (
                    <a
                      key={county.id}
                      href={row ? `/counties/${row.slug}` : "/counties"}
                      aria-label={label}
                      onPointerEnter={(event) => row && activateCounty(row, event.clientX, event.clientY)}
                      onPointerMove={(event) => positionTooltip(event.clientX, event.clientY)}
                      onPointerLeave={() => setActiveSlug(null)}
                      onFocus={(event) => {
                        if (!row) return;
                        const bounds = event.currentTarget.getBoundingClientRect();
                        activateCounty(row, bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
                      }}
                      onBlur={() => setActiveSlug(null)}
                    >
                      <path
                        d={county.path}
                        fill={availabilityColor(listingCount)}
                        data-listing-count={listingCount}
                        data-county={row?.name ?? `${county.name} County`}
                      >
                        <title>{label}</title>
                      </path>
                    </a>
                  );
                })}
              </g>
            </svg>

            <aside
              ref={tooltipRef}
              className={`county-availability-tooltip${activeRow ? " is-visible" : ""}`}
              aria-hidden={!activeRow}
            >
              {activeRow ? (
                <>
                  <span>{activeRow.name}</span>
                  <strong>{activeRow.listingCount} active listing{activeRow.listingCount === 1 ? "" : "s"}</strong>
                  <dl>
                    <div><dt>4COP median</dt><dd>{money(activeRow.fourCopMedian)}</dd></div>
                    <div><dt>3PS median</dt><dd>{money(activeRow.threePsMedian)}</dd></div>
                    <div><dt>2026 new quota</dt><dd>{activeRow.drawingLicenses || "—"}</dd></div>
                    <div><dt>Population</dt><dd>{activeRow.population?.toLocaleString("en-US") ?? "—"}</dd></div>
                  </dl>
                  <small>Select county for full market data →</small>
                </>
              ) : null}
            </aside>
          </div>

          <aside className="county-availability-map-legend">
            <span>Active Listing Concentration</span>
            <h3>Current marketplace inventory</h3>
            <p>
              Each county is shaded by the number of active 4COP and 3PS marketplace listings currently tracked by FLLM.
            </p>
            <ul aria-label="Active listings color scale">
              <li><i style={{ background: "#193552" }} />0 listings</li>
              <li><i style={{ background: "#195b86" }} />1–2 listings</li>
              <li><i style={{ background: "#167ea8" }} />3–5 listings</li>
              <li><i style={{ background: "#1bbbd0" }} />6–8 listings</li>
              <li><i style={{ background: "#7357e8" }} />9–11 listings</li>
              <li><i style={{ background: "#a855f7" }} />12+ listings</li>
            </ul>
            <div className="county-availability-map-summary">
              <div><strong>{summary.totalListings}</strong><small>active listings</small></div>
              <div><strong>{summary.activeCounties}</strong><small>counties with inventory</small></div>
            </div>
            <small className="county-availability-map-note">
              This visualization reflects marketplace inventory, not every beverage license issued by DBPR.
            </small>
          </aside>
        </div>
      </div>
    </section>
  );
}
