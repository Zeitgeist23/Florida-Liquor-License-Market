"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

type EstablishmentRow = {
  licenseNumber: string;
  dba: string;
  licensee: string;
  series: string;
  modifier: string;
  city: string;
  address: string;
  zip: string;
  primaryStatus: string;
  secondaryStatus: string;
  active: boolean;
  quotaClass: "4COP Quota" | "3PS Quota" | null;
  category: string;
};

type SortKey = "dba" | "category" | "series" | "licensee";
type SortDirection = "asc" | "desc";

function categoryClass(category: string) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function displayLicense(row: EstablishmentRow) {
  const series = row.series.trim().toUpperCase();
  const modifier = row.modifier.trim().toUpperCase();
  if (row.quotaClass) return row.quotaClass;
  if (series === "4COP" && /^(SFS|SRX)$/.test(modifier)) return "4COP SFS / SRX";
  if (series === "2COP") return "2COP";
  return modifier ? `${series} · ${modifier}` : series;
}


function dedupeByLicenseNumber(rows: EstablishmentRow[]) {
  const seen = new Map<string, EstablishmentRow>();

  for (const row of rows) {
    const key = row.licenseNumber.trim().toUpperCase();
    if (!key) continue;

    const existing = seen.get(key);
    if (!existing) {
      seen.set(key, row);
      continue;
    }

    // Prefer the record with a more specific DBA/address rather than generic
    // inactive/escrow placeholders when DBPR supplies multiple rows for one license.
    const score = (item: EstablishmentRow) => {
      const dba = item.dba.trim().toUpperCase();
      let value = 0;
      if (dba && !/^INACTIVE\b/.test(dba) && dba !== "ESCROW") value += 3;
      if (item.address && !/^INACTIVE\b/i.test(item.address)) value += 2;
      if (item.licensee) value += 1;
      return value;
    };

    if (score(row) > score(existing)) seen.set(key, row);
  }

  return Array.from(seen.values());
}


function HoverSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<{ label: string; value: string }>;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="market-scope-hover-select"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <span className="market-scope-hover-select-label">{label}</span>
      <button
        type="button"
        className="market-scope-hover-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{options.find((option) => option.value === value)?.label ?? value}</span>
        <b aria-hidden="true">⌄</b>
      </button>
      <div className={"market-scope-hover-select-menu" + (open ? " is-open" : "")} role="listbox" aria-label={label}>
        {options.map((option) => (
          <button
            type="button"
            role="option"
            aria-selected={option.value === value}
            className={"market-scope-hover-select-option" + (option.value === value ? " is-selected" : "")}
            key={option.value}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              onChange(option.value);
              setOpen(false);
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function MarketScopeEstablishmentTable({
  rows,
  inactiveRows = [],
  summaryCounts,
  standaloneMarket,
}: {
  rows: EstablishmentRow[];
  inactiveRows?: EstablishmentRow[];
  standaloneMarket?: {
    county: string;
    totalCount: number;
    overallMedian: number | null;
    fourCopCount: number;
    fourCopMedian: number | null;
    threePsCount: number;
    threePsMedian: number | null;
    threePsMedianIsProxy?: boolean;
  };
  summaryCounts?: {
    fourCopQuota: number;
    threePsQuota: number;
    sfs: number;
    twoCop: number;
  };
}) {
  const [sortKey, setSortKey] = useState<SortKey>("dba");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [licenseFilter, setLicenseFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [selectedRow, setSelectedRow] = useState<EstablishmentRow | null>(null);
  const [copiedLicense, setCopiedLicense] = useState(false);
  const [licenseMarketOpen, setLicenseMarketOpen] = useState(false);

  useEffect(() => {
    const handler = (event: Event) => {
      const custom = event as CustomEvent<{ licenseType?: string; category?: string; status?: string }>;
      const nextLicense = custom.detail?.licenseType ?? "All";
      const nextCategory = custom.detail?.category ?? "All";
      const nextStatus = custom.detail?.status ?? "All";
      setLicenseFilter(nextLicense);
      setCategoryFilter(nextCategory);
      setStatusFilter(nextStatus);
      setExpanded(false);
      window.setTimeout(() => {
        document.getElementById("operating-establishments-table")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    };
    window.addEventListener("fllm-market-scope-filter", handler as EventListener);
    return () => window.removeEventListener("fllm-market-scope-filter", handler as EventListener);
  }, []);

  const categories = useMemo(() => {
    const ordered = ["Restaurant", "Bar", "Nightclub", "Liquor Store", "Marina", "Country Club", "Hotel / Motel", "Other Hospitality"];
    const available = new Set(rows.map((row) => row.category));
    return ["All", ...ordered.filter((category) => available.has(category))];
  }, [rows]);

  const licenseTypes = useMemo(() => {
    const allRows = [...rows, ...inactiveRows];
    const available = Array.from(new Set(allRows.map(displayLicense))).sort();
    const prioritized = [
      { label: "All", value: "All" },
      { label: "All Quota Licenses", value: "All Quota Licenses" },
      { label: "4COP Quota Licenses", value: "4COP Quota" },
      { label: "3PS Quota Licenses", value: "3PS Quota" },
      { label: "4COP SFS/SRX Licenses", value: "4COP SFS / SRX" },
      { label: "2COP Beer & Wine Licenses", value: "2COP" },
    ];
    const prioritizedValues = new Set(prioritized.map((option) => option.value));
    const others = available
      .filter((license) => !prioritizedValues.has(license))
      .map((license) => ({ label: license, value: license }));
    return [...prioritized, ...others];
  }, [rows, inactiveRows]);

  const filteredRows = useMemo(() => {
    const sourceRows = dedupeByLicenseNumber(
      statusFilter === "Inactive" && inactiveRows.length ? inactiveRows : rows,
    );
    return sourceRows
      .filter((row) => categoryFilter === "All" || row.category === categoryFilter)
      .filter((row) =>
        licenseFilter === "All" ||
        (licenseFilter === "All Quota Licenses" &&
          (displayLicense(row) === "4COP Quota" || displayLicense(row) === "3PS Quota")) ||
        displayLicense(row) === licenseFilter
      )
      .filter((row) =>
        statusFilter === "All" ||
        (statusFilter === "Active" && row.active) ||
        (statusFilter === "Inactive" && !row.active)
      )
      .filter((row) => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return true;
        return [row.dba, row.licensee, row.licenseNumber, displayLicense(row), row.category]
          .some((value) => value.toLowerCase().includes(query));
      })
      .sort((a, b) => {
        const left =
          sortKey === "dba"
            ? a.dba
            : sortKey === "category"
              ? a.category
              : sortKey === "series"
                ? displayLicense(a)
                : a.licensee;
        const right =
          sortKey === "dba"
            ? b.dba
            : sortKey === "category"
              ? b.category
              : sortKey === "series"
                ? displayLicense(b)
                : b.licensee;
        const result = left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" });
        return sortDirection === "asc" ? result : -result;
      });
  }, [rows, inactiveRows, categoryFilter, licenseFilter, statusFilter, searchQuery, sortKey, sortDirection]);

  const shownRows = expanded ? filteredRows : filteredRows.slice(0, 10);

  function changeSort(next: SortKey) {
    if (next === sortKey) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(next);
    setSortDirection("asc");
  }

  function arrow(key: SortKey) {
    if (sortKey !== key) return "↕";
    return sortDirection === "asc" ? "↑" : "↓";
  }

  function selectLicense(next: string) {
    setLicenseFilter(next);
    setExpanded(false);
    window.setTimeout(() => {
      document.querySelector(".market-scope-table-search")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  function money(value: number | null | undefined) {
    if (value === null || value === undefined) return "—";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  }

  function selectedStandaloneMarket(row: EstablishmentRow) {
    if (!standaloneMarket) {
      return {
        interactive: true,
        count: 0,
        median: null as number | null,
        label: "Standalone license market",
        href: "/listings#listing-results",
        proxy: false,
      };
    }

    if (row.quotaClass === "4COP Quota") {
      return {
        interactive: true,
        count: standaloneMarket.fourCopCount,
        median: standaloneMarket.fourCopMedian,
        label: `${standaloneMarket.county} 4COP Quota market`,
        href: `/listings?county=${encodeURIComponent(standaloneMarket.county)}&type=4COP+Quota#listing-results`,
        proxy: false,
      };
    }

    if (row.quotaClass === "3PS Quota") {
      return {
        interactive: true,
        count: standaloneMarket.threePsCount,
        median: standaloneMarket.threePsMedian,
        label: `${standaloneMarket.county} 3PS Quota market`,
        href: `/listings?county=${encodeURIComponent(standaloneMarket.county)}&type=3PS+Quota+%2F+Package+Store#listing-results`,
        proxy: standaloneMarket.threePsMedianIsProxy ?? false,
      };
    }

    return {
      interactive: true,
      count: standaloneMarket.totalCount,
      median: standaloneMarket.overallMedian,
      label: `${standaloneMarket.county} standalone license market`,
      href: `/listings?county=${encodeURIComponent(standaloneMarket.county)}#listing-results`,
      proxy: false,
    };
  }

  async function copyLicenseNumber(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedLicense(true);
      window.setTimeout(() => setCopiedLicense(false), 1400);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedLicense(true);
      window.setTimeout(() => setCopiedLicense(false), 1400);
    }
  }

  return (
    <div className="market-scope-table-wrap" id="operating-establishments-table">
      {summaryCounts ? (
        <div className="market-scope-license-summary">
          <button type="button" className="market-scope-license-card" onClick={() => selectLicense("4COP Quota")}>
            <span>4COP Quota</span><strong>{summaryCounts.fourCopQuota}</strong>
          </button>
          <button type="button" className="market-scope-license-card" onClick={() => selectLicense("3PS Quota")}>
            <span>3PS Quota</span><strong>{summaryCounts.threePsQuota}</strong>
          </button>
          <button type="button" className="market-scope-license-card" onClick={() => selectLicense("4COP SFS / SRX")}>
            <span>4COP SFS / SRX</span><strong>{summaryCounts.sfs}</strong>
          </button>
          <button type="button" className="market-scope-license-card" onClick={() => selectLicense("2COP")}>
            <span>2COP</span><strong>{summaryCounts.twoCop}</strong>
          </button>
        </div>
      ) : null}
      <div className="market-scope-table-search">
        <label>
          <span>Search Establishments</span>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search DBA, corporation, license number, category…"
            aria-label="Search establishments by DBA, corporation or license number"
          />
        </label>
      </div>

      <div className="market-scope-table-controls">
        <HoverSelect
          label="Business Type"
          value={categoryFilter}
          options={categories.map((category) => ({ label: category, value: category }))}
          onChange={(value) => { setCategoryFilter(value); setExpanded(false); }}
        />
        <HoverSelect
          label="License Type"
          value={licenseFilter}
          options={licenseTypes}
          onChange={(value) => { setLicenseFilter(value); setExpanded(false); }}
        />
        <HoverSelect
          label="License Status"
          value={statusFilter}
          options={[
            { label: "All", value: "All" },
            { label: "Active", value: "Active" },
            { label: "Inactive", value: "Inactive" },
          ]}
          onChange={(value) => { setStatusFilter(value); setExpanded(false); }}
        />
        <div className="market-scope-table-result-count">
          <strong>Showing {shownRows.length} of {filteredRows.length}</strong>
          <span>establishments</span>
        </div>
      </div>

      <div className="market-scope-table-head">
        <button type="button" onClick={() => changeSort("dba")}>Establishment <b>{arrow("dba")}</b></button>
        <button type="button" onClick={() => changeSort("category")}>Business Type <b>{arrow("category")}</b></button>
        <button type="button" onClick={() => changeSort("series")}>License Type <b>{arrow("series")}</b></button>
        <button type="button" onClick={() => changeSort("licensee")}>DBPR Licensee / Public-Record Entity <b>{arrow("licensee")}</b></button>
        <span>Sq. Ft.</span>
      </div>

      <div className="market-scope-table-body">
        {shownRows.map((row) => (
          <button
            type="button"
            className="market-scope-table-row market-scope-table-row--interactive"
            key={`${row.licenseNumber}-${row.dba}-${row.licensee}`}
            onClick={() => { setSelectedRow(row); setCopiedLicense(false); setLicenseMarketOpen(false); }}
            aria-label={`View details for ${row.dba}`}
          >
            <div><strong>{row.dba}</strong><small>{row.address}{row.zip ? ` · ${row.zip}` : ""}</small></div>
            <div><span className={"scope-category scope-category--" + categoryClass(row.category)}>{row.category}</span></div>
            <div><strong>{displayLicense(row)}</strong><small>{row.licenseNumber}</small></div>
            <div><strong>{row.licensee}</strong><small>DBPR licensee / owner-primary name</small></div>
            <div><strong>—</strong><small>Public property match pending</small></div>
          </button>
        ))}
      </div>

      {filteredRows.length > 10 ? (
        <button
          className="market-scope-table-expand"
          type="button"
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? "Show first 10 establishments" : `View all ${filteredRows.length} establishments`}
        </button>
      ) : null}

      {selectedRow && typeof document !== "undefined" ? createPortal(
        <div
          className="market-scope-detail-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedRow(null);
          }}
        >
          <section
            className="market-scope-detail-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="market-scope-detail-title"
          >
            <button
              type="button"
              className="market-scope-detail-close"
              onClick={() => setSelectedRow(null)}
              aria-label="Close establishment details"
            >
              ×
            </button>

            <span className="market-scope-detail-eyebrow">Establishment Record</span>
            <h3 id="market-scope-detail-title">{selectedRow.dba}</h3>
            {(() => {
              const market = selectedStandaloneMarket(selectedRow);
              const interactive = market.interactive;
              return (
                <div
                  className={
                    "market-scope-detail-license-number" +
                    (interactive ? " market-scope-detail-license-number--interactive" : "") +
                    (interactive && licenseMarketOpen ? " is-hovered" : "")
                  }
                  role={interactive ? "link" : undefined}
                  tabIndex={interactive ? 0 : undefined}
                  aria-describedby={interactive ? "market-scope-license-market-tooltip" : undefined}
                  onMouseEnter={() => { if (interactive) setLicenseMarketOpen(true); }}
                  onMouseLeave={() => { if (interactive) setLicenseMarketOpen(false); }}
                  onFocus={() => { if (interactive) setLicenseMarketOpen(true); }}
                  onBlur={(event) => {
                    if (
                      interactive &&
                      !event.currentTarget.contains(event.relatedTarget as Node | null)
                    ) {
                      setLicenseMarketOpen(false);
                    }
                  }}
                  onClick={(event) => {
                    if (!interactive) return;
                    if ((event.target as HTMLElement).closest(".market-scope-detail-copy-button")) return;
                    window.location.assign(market.href);
                  }}
                  onKeyDown={(event) => {
                    if (!interactive) return;
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      window.location.assign(market.href);
                    }
                  }}
                >
                  <span>License Number</span>
                  <div className="market-scope-detail-license-copy-row">
                    <strong className="market-scope-detail-license-value">{selectedRow.licenseNumber}</strong>
                    <button
                      type="button"
                      className="market-scope-detail-copy-button"
                      onClick={(event) => {
                        event.stopPropagation();
                        void copyLicenseNumber(selectedRow.licenseNumber);
                      }}
                      aria-label="Copy license number"
                      title="Copy license number"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="9" y="9" width="10" height="10" rx="2" />
                        <rect x="5" y="5" width="10" height="10" rx="2" />
                      </svg>
                    </button>
                    <span className={"market-scope-detail-copy-status" + (copiedLicense ? " is-visible" : "")}>
                      Copied
                    </span>
                  </div>

                  {interactive ? (
                    <span
                      className={"market-scope-license-market-tooltip" + (licenseMarketOpen ? " is-visible" : "")}
                      id="market-scope-license-market-tooltip"
                      role="tooltip"
                    >
                      <strong>{market.label}</strong>
                      <span><b>{market.count}</b> standalone license{market.count === 1 ? "" : "s"} currently for sale</span>
                      <span>FLLM Est. median value: <b>{money(market.median)}</b></span>
                      {market.proxy ? (
                        <small>3PS estimate uses FLLM&apos;s 98.5% matched-market proxy from the county 4COP median.</small>
                      ) : null}
                      <small>Click the license box to view standalone listings.</small>
                    </span>
                  ) : null}
                </div>
              );
            })()}

            <div className="market-scope-detail-grid">
              <div><span>Business Type</span><strong>{selectedRow.category}</strong></div>
              <div><span>License Type</span><strong>{displayLicense(selectedRow)}</strong></div>
              <div className="span-2"><span>DBPR Licensee / Public-Record Entity</span><strong>{selectedRow.licensee}</strong></div>
              <div><span>Status</span><strong>{selectedRow.active ? "Active" : "Inactive"}</strong></div>
              <div className="wide"><span>Business Address</span><strong>{selectedRow.address}{selectedRow.zip ? ` · ${selectedRow.zip}` : ""}</strong></div>
              <div><span>City</span><strong>{selectedRow.city || "—"}</strong></div>
              <div><span>Series</span><strong>{selectedRow.series || "—"}</strong></div>
              <div><span>Modifier</span><strong>{selectedRow.modifier || "None"}</strong></div>
              <div><span>Primary Status</span><strong>{selectedRow.primaryStatus || "—"}</strong></div>
              <div><span>Secondary Status</span><strong>{selectedRow.secondaryStatus || "—"}</strong></div>
              <div><span>Property Match</span><strong>Pending</strong></div>
            </div>
          </section>
        </div>,
        document.body,
      ) : null}
    </div>
  );
}
