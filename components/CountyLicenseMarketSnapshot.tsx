import Link from "next/link";

import { FLORIDA_COUNTY_PATHS } from "@/components/FloridaCountyMap";

function normalizeCounty(name: string) {
  return name.replace(/\s+County$/i, "").replace(/[^a-z]/gi, "").toLowerCase();
}

function pinForCounty(county: string) {
  const target = normalizeCounty(county);
  const active = FLORIDA_COUNTY_PATHS.find((item) => normalizeCounty(item.name) === target);
  if (!active) return null;
  const numbers = (active.path.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
  const xs: number[] = [];
  const ys: number[] = [];
  for (let index = 0; index + 1 < numbers.length; index += 2) {
    xs.push(numbers[index]);
    ys.push(numbers[index + 1]);
  }
  if (!xs.length || !ys.length) return null;
  return {
    x: (Math.min(...xs) + Math.max(...xs)) / 2,
    y: (Math.min(...ys) + Math.max(...ys)) / 2,
  };
}

function money(value: number | null) {
  if (value === null) return "No disclosed asks";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function CountyLicenseMarketSnapshot({
  county,
  cities,
  licenseLabel,
  availableCount,
  low,
  median,
  high,
  estimatedValue,
}: {
  county: string;
  cities: string[];
  licenseLabel: string;
  availableCount: number;
  low: number | null;
  median: number | null;
  high: number | null;
  estimatedValue: number | null;
}) {
  const target = normalizeCounty(county);
  const pin = pinForCounty(county);
  const pinPercent = pin
    ? {
        left: ((pin.x - 90) / 380) * 100,
        top: ((pin.y + 10) / 300) * 100,
      }
    : null;
  const tooltipSide = pinPercent && pinPercent.left > 58 ? "left" : "right";
  const tooltipVertical =
    pinPercent && pinPercent.top > 66
      ? "lower"
      : pinPercent && pinPercent.top < 30
        ? "upper"
        : "middle";

  return (
    <section className="county-license-snapshot" aria-labelledby="county-license-snapshot-title">
      <div className="county-license-snapshot-heading">
        <span>Selected County Market Snapshot</span>
        <h2 id="county-license-snapshot-title">{county} · {licenseLabel}</h2>
        <p>
          Current FLLM standalone-license asking-price context for the selected county and license scope.
          The estimated value shown below is based on the median current disclosed ask, not a formal appraisal.
        </p>
      </div>

      <div className="county-license-snapshot-grid">
        <div className="county-license-snapshot-map">
          <span className="county-license-snapshot-kicker">Florida County Market</span>
          <div className="county-license-map-stage">
            <svg viewBox="90 -10 380 300" role="img" aria-label={`Florida map highlighting ${county} with a market pin`}>
              <defs>
                <linearGradient id="county-snapshot-bg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#0a3658" />
                  <stop offset="1" stopColor="#071f36" />
                </linearGradient>
                <filter id="county-snapshot-glow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <rect x="90" y="-10" width="380" height="300" rx="18" fill="url(#county-snapshot-bg)" />
              <g>
                {FLORIDA_COUNTY_PATHS.map((item) => {
                  const active = normalizeCounty(item.name) === target;
                  return (
                    <path
                      key={item.id}
                      d={item.path}
                      fill={active ? "#28c7df" : "#244f70"}
                      stroke={active ? "#9ff4ff" : "#4a7592"}
                      strokeWidth={active ? 1.9 : 0.72}
                      filter={active ? "url(#county-snapshot-glow)" : undefined}
                    />
                  );
                })}
              </g>
              </svg>
            {pinPercent ? (
              <>
                <button
                  type="button"
                  className="county-license-map-pin"
                  style={{ left: `${pinPercent.left}%`, top: `${pinPercent.top}%` }}
                  aria-label={`Show ${county} market summary`}
                  aria-describedby="county-license-map-tooltip"
                >
                  <span className="county-license-map-pin-head" />
                  <span className="county-license-map-pin-stem" />
                  <span className="county-license-map-pin-point" />
                </button>
                <aside
                  id="county-license-map-tooltip"
                  className={`county-license-map-tooltip is-${tooltipSide} is-${tooltipVertical}`}
                  style={{ left: `${pinPercent.left}%`, top: `${pinPercent.top}%` }}
                  role="tooltip"
                >
                  <span>FLLM County Market</span>
                  <strong>{county} · {licenseLabel}</strong>
                  <dl>
                    <div><dt>Available</dt><dd>{availableCount}</dd></div>
                    <div><dt>Low Ask</dt><dd>{money(low)}</dd></div>
                    <div><dt>Median Ask</dt><dd>{money(median)}</dd></div>
                    <div><dt>High Ask</dt><dd>{money(high)}</dd></div>
                  </dl>
                  <small>FLLM Est. License Value: {money(estimatedValue)}</small>
                </aside>
              </>
            ) : null}
          </div>
          <strong>{county}</strong>
          <div className="county-license-city-list">
            {cities.length ? cities.map((city) => <span key={city}>{city}</span>) : <span>County market</span>}
          </div>
        </div>

        <div className="county-license-snapshot-stats">
          <div>
            <span>Available Licenses</span>
            <strong>{availableCount}</strong>
          </div>
          <div>
            <span>Lowest Ask</span>
            <strong>{money(low)}</strong>
          </div>
          <div>
            <span>Median Ask</span>
            <strong>{money(median)}</strong>
          </div>
          <div>
            <span>Highest Ask</span>
            <strong>{money(high)}</strong>
          </div>
          <div className="county-license-estimated-value">
            <span>FLLM Est. License Value</span>
            <strong>{money(estimatedValue)}</strong>
            <small>Median current disclosed ask for this county/license selection.</small>
          </div>
          <div className="county-license-snapshot-link">
            <span>County Market Page</span>
            <Link href={`/counties/${county.toLowerCase().replace(/\s+county$/i, "").replace(/[^a-z0-9]+/g, "-")}`}>
              Open {county} market data ›
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
