"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type MarketBusiness = {
  title: string;
  category: string;
  licenseType: string;
  price: string;
  href: string;
};

function categoryClass(category: string) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
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

export default function CityMarketBusinessInventory({
  businesses,
}: {
  businesses: MarketBusiness[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [licenseFilter, setLicenseFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(10);

  const categories = useMemo(() => {
    const preferred = [
      "Restaurant",
      "Restaurant / Bar",
      "Bar",
      "Cocktail Lounge",
      "Nightclub",
      "Gentlemen's Club",
      "Liquor Store",
      "Convenience Store",
      "Marina",
      "Hotel / Motel",
      "Country Club",
      "Bowling Alley",
      "Other Hospitality",
    ];
    const available = new Set(businesses.map((item) => item.category));
    const extras = Array.from(available)
      .filter((category) => !preferred.includes(category))
      .sort((a, b) => a.localeCompare(b));
    return ["All", ...preferred, ...extras];
  }, [businesses]);

  const licenseOptions = useMemo(() => {
    const available = Array.from(new Set(businesses.map((item) => item.licenseType)));
    const prioritized = [
      { label: "All", value: "All" },
      { label: "All Quota Licenses", value: "All Quota Licenses" },
      { label: "4COP Quota Licenses", value: "4COP Quota" },
      { label: "3PS Quota Licenses", value: "3PS Quota / Package Store" },
      { label: "4COP SFS/SRX Licenses", value: "4COP SFS/SRX" },
      { label: "2COP Beer & Wine Licenses", value: "2COP Beer & Wine" },
    ];
    const used = new Set(prioritized.map((item) => item.value));
    const extras = available
      .filter((value) => !used.has(value))
      .sort((a, b) => a.localeCompare(b))
      .map((value) => ({ label: value, value }));
    return [...prioritized, ...extras];
  }, [businesses]);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return businesses.filter((item) => {
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.licenseType.toLowerCase().includes(q);

      const matchesCategory =
        categoryFilter === "All" ||
        item.category === categoryFilter ||
        (categoryFilter === "Restaurant" && item.category === "Restaurant / Bar");

      const matchesLicense =
        licenseFilter === "All" ||
        (licenseFilter === "All Quota Licenses" &&
          (item.licenseType === "4COP Quota" || item.licenseType.includes("3PS"))) ||
        item.licenseType === licenseFilter;

      return matchesSearch && matchesCategory && matchesLicense;
    });
  }, [businesses, searchQuery, categoryFilter, licenseFilter]);

  const shown = filtered.slice(0, visibleCount);
  const remaining = Math.max(filtered.length - shown.length, 0);
  const nextBatch = Math.min(10, remaining);

  function resetVisible() {
    setVisibleCount(10);
  }

  if (!businesses.length) return null;

  return (
    <div className="market-scope-business-inventory">
      <div className="market-scope-business-search">
        <label>
          <span>Search Businesses</span>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              resetVisible();
            }}
            placeholder="Search business, category, license type…"
            aria-label="Search businesses with liquor licenses on the market"
          />
        </label>
      </div>

      <div className="market-scope-business-controls">
        <HoverSelect
          label="Business Category"
          value={categoryFilter}
          options={categories.map((category) => ({ label: category, value: category }))}
          onChange={(value) => {
            setCategoryFilter(value);
            resetVisible();
          }}
        />
        <HoverSelect
          label="License Type"
          value={licenseFilter}
          options={licenseOptions}
          onChange={(value) => {
            setLicenseFilter(value);
            resetVisible();
          }}
        />
        <div className="market-scope-business-result-count">
          <strong>Showing {shown.length} of {filtered.length}</strong>
          <span>business + license packages</span>
        </div>
      </div>

      <div className="market-scope-business-list">
        {shown.map((item) => (
          <Link href={item.href} key={item.title} className="market-scope-business-row">
            <div className="market-scope-business-copy">
              <span className={"scope-category scope-category--" + categoryClass(item.category)}>{item.category}</span>
              <strong>{item.title}</strong>
            </div>
            <div className="market-scope-business-meta">
              <span>{item.licenseType}</span>
              <b>{item.price}</b>
            </div>
          </Link>
        ))}
      </div>

      {remaining > 0 ? (
        <button
          className="market-scope-business-expand"
          type="button"
          onClick={() => setVisibleCount((current) => Math.min(current + 10, filtered.length))}
        >
          Show next {nextBatch} of {remaining} results
        </button>
      ) : null}
    </div>
  );
}
