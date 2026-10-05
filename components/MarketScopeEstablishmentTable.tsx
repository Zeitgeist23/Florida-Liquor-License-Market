"use client";

import { useMemo, useState } from "react";

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

export default function MarketScopeEstablishmentTable({
  rows,
}: {
  rows: EstablishmentRow[];
}) {
  const [sortKey, setSortKey] = useState<SortKey>("dba");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [licenseFilter, setLicenseFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState(false);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(rows.map((row) => row.category))).sort()],
    [rows],
  );

  const licenseTypes = useMemo(
    () => ["All", ...Array.from(new Set(rows.map(displayLicense))).sort()],
    [rows],
  );

  const filteredRows = useMemo(() => {
    return rows
      .filter((row) => categoryFilter === "All" || row.category === categoryFilter)
      .filter((row) => licenseFilter === "All" || displayLicense(row) === licenseFilter)
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
  }, [rows, categoryFilter, licenseFilter, searchQuery, sortKey, sortDirection]);

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

  return (
    <div className="market-scope-table-wrap">
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
        <label>
          <span>Business Type</span>
          <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
            {categories.map((category) => <option key={category}>{category}</option>)}
          </select>
        </label>
        <label>
          <span>License Type</span>
          <select value={licenseFilter} onChange={(event) => setLicenseFilter(event.target.value)}>
            {licenseTypes.map((license) => <option key={license}>{license}</option>)}
          </select>
        </label>
        <div className="market-scope-table-result-count">
          <strong>{filteredRows.length}</strong>
          <span>matching establishments</span>
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
          <div className="market-scope-table-row" key={row.licenseNumber}>
            <div><strong>{row.dba}</strong><small>{row.address}{row.zip ? ` · ${row.zip}` : ""}</small></div>
            <div><span className={"scope-category scope-category--" + categoryClass(row.category)}>{row.category}</span></div>
            <div><strong>{displayLicense(row)}</strong><small>{row.licenseNumber}</small></div>
            <div><strong>{row.licensee}</strong><small>DBPR licensee / owner-primary name</small></div>
            <div><strong>—</strong><small>Public property match pending</small></div>
          </div>
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
    </div>
  );
}
