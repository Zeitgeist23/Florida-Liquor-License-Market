"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";

import { FLORIDA_COUNTY_PATHS } from "@/components/FloridaCountyMap";

function normalizeCounty(name: string) {
  return name.replace(/\s+County$/i, "").replace(/[^a-z]/gi, "").toLowerCase();
}

export default function BusinessMarketHeroMap({
  county,
  primaryMarkets,
  title,
  packagePrice,
  licenseType,
  businessType,
  otherListingsCount,
}: {
  county: string;
  primaryMarkets: string[];
  title: string;
  packagePrice: string;
  licenseType: string;
  businessType: string;
  otherListingsCount: number;
}) {
  const target = normalizeCounty(county);
  const activePathRef = useRef<SVGPathElement | null>(null);
  const [pin, setPin] = useState<{ x: number; y: number } | null>(null);
  const [open, setOpen] = useState(true);

  const viewBox = useMemo(
    () => ({ minX: 90, minY: -10, width: 380, height: 300 }),
    [],
  );

  useLayoutEffect(() => {
    const path = activePathRef.current;
    if (!path) return;
    const box = path.getBBox();
    const x = ((box.x + box.width / 2 - viewBox.minX) / viewBox.width) * 100;
    const y = ((box.y + box.height / 2 - viewBox.minY) / viewBox.height) * 100;
    setPin({ x, y });
  }, [county, viewBox]);

  const tooltipSide = pin && pin.x > 58 ? "left" : "right";
  const tooltipVertical =
    pin && pin.y > 66 ? "lower" : pin && pin.y < 28 ? "upper" : "middle";
  const otherLabel =
    otherListingsCount === 1
      ? "1 other FLLM listing in this county"
      : `${otherListingsCount} other FLLM listings in this county`;

  return (
    <div className="business-market-map-card">
      <span className="business-market-map-label">Florida Market</span>

      <div
        className="business-market-hero-map-stage"
        onPointerEnter={() => setOpen(true)}
      >
        <svg
          className="business-market-hero-map-svg"
          viewBox="90 -10 380 300"
          role="img"
          aria-label={`Florida map highlighting ${county} with a listing pin`}
        >
          <defs>
            <filter
              id="business-market-county-glow"
              x="-40%"
              y="-40%"
              width="180%"
              height="180%"
            >
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g>
            {FLORIDA_COUNTY_PATHS.map((item) => {
              const active = normalizeCounty(item.name) === target;
              return (
                <path
                  key={item.id}
                  ref={active ? activePathRef : undefined}
                  d={item.path}
                  fill={active ? "#f5a400" : "#dce4ea"}
                  stroke={active ? "#ffd76a" : "#71869a"}
                  strokeWidth={active ? 1.8 : 0.75}
                  filter={active ? "url(#business-market-county-glow)" : undefined}
                />
              );
            })}
          </g>
        </svg>

        {pin ? (
          <>
            <button
              type="button"
              className="business-market-hero-pin"
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              aria-label={`Show listing details for ${county}`}
              aria-describedby="business-market-hero-map-tooltip"
              onClick={() => setOpen((value) => !value)}
              onFocus={() => setOpen(true)}
            >
              <span className="business-market-hero-pin-head" />
              <span className="business-market-hero-pin-stem" />
              <span className="business-market-hero-pin-point" />
            </button>

            <aside
              id="business-market-hero-map-tooltip"
              className={`business-market-hero-tooltip is-${tooltipSide} is-${tooltipVertical}${open ? " is-visible" : ""}`}
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              role="tooltip"
            >
              <span>FLLM Market Listing</span>
              <strong>{title}</strong>
              <dl>
                <div>
                  <dt>Package Price</dt>
                  <dd>{packagePrice}</dd>
                </div>
                <div>
                  <dt>License</dt>
                  <dd>{licenseType}</dd>
                </div>
                <div>
                  <dt>Business Type</dt>
                  <dd>{businessType}</dd>
                </div>
                <div>
                  <dt>Other County Listings</dt>
                  <dd>{otherListingsCount}</dd>
                </div>
              </dl>
              <small>{otherLabel}</small>
            </aside>
          </>
        ) : null}
      </div>

      <strong>{county}</strong>
      <span className="business-market-city-line">
        {primaryMarkets.length
          ? primaryMarkets.join(" · ")
          : "Florida business market"}
      </span>
    </div>
  );
}
