"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { listings } from "@/data/listings";
import styles from "@/app/listings/listings.module.css";

type SortOption = "featured" | "price-asc" | "price-desc" | "county";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function ListingsExplorer() {
  const [query, setQuery] = useState("");
  const [county, setCounty] = useState("All counties");
  const [licenseType, setLicenseType] = useState("All license types");
  const [maxPrice, setMaxPrice] = useState("Any price");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [transferableOnly, setTransferableOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>("featured");

  const counties = useMemo(
    () => [...new Set(listings.map((listing) => listing.county))].sort(),
    [],
  );
  const licenseTypes = useMemo(
    () => [...new Set(listings.map((listing) => listing.type))].sort(),
    [],
  );

  const filteredListings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const ceiling = maxPrice === "Any price" ? Infinity : Number(maxPrice);

    return listings
      .filter((listing) => {
        const searchable = `${listing.county} ${listing.type} ${listing.use}`.toLowerCase();
        return (
          (!normalizedQuery || searchable.includes(normalizedQuery)) &&
          (county === "All counties" || listing.county === county) &&
          (licenseType === "All license types" || listing.type === licenseType) &&
          listing.price <= ceiling &&
          (!availableOnly || listing.status === "Available") &&
          (!transferableOnly || listing.transferable)
        );
      })
      .sort((a, b) => {
        if (sort === "price-asc") return a.price - b.price;
        if (sort === "price-desc") return b.price - a.price;
        if (sort === "county") return a.county.localeCompare(b.county);
        return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
      });
  }, [availableOnly, county, licenseType, maxPrice, query, sort, transferableOnly]);

  function clearFilters() {
    setQuery("");
    setCounty("All counties");
    setLicenseType("All license types");
    setMaxPrice("Any price");
    setAvailableOnly(false);
    setTransferableOnly(false);
    setSort("featured");
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>FLORIDA LIQUOR LICENSE MARKET</Link>
        <nav className={styles.nav} aria-label="Primary navigation">
          <Link href="/listings">Buy</Link>
          <Link href="/#sell">Sell</Link>
          <Link href="/#finance">Finance</Link>
          <Link href="/#invest">Invest</Link>
        </nav>
        <Link href="/#sell" className={styles.listButton}>LIST YOUR LICENSE</Link>
      </header>

      <section className={styles.hero}>
        <p className={styles.eyebrow}>FLORIDA LICENSE INVENTORY</p>
        <h1>Find the right liquor license.</h1>
        <p>Search active marketplace inventory by county, license class, price, and availability.</p>
      </section>

      <section className={styles.workspace}>
        <aside className={styles.filters} aria-label="Listing filters">
          <div className={styles.filterHeading}>
            <h2>Filter listings</h2>
            <button type="button" onClick={clearFilters}>Clear all</button>
          </div>

          <label>
            Search
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="County, license type, or use" />
          </label>

          <label>
            County
            <select value={county} onChange={(event) => setCounty(event.target.value)}>
              <option>All counties</option>
              {counties.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>

          <label>
            License type
            <select value={licenseType} onChange={(event) => setLicenseType(event.target.value)}>
              <option>All license types</option>
              {licenseTypes.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>

          <label>
            Maximum price
            <select value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)}>
              <option>Any price</option>
              <option value="250000">Up to $250,000</option>
              <option value="500000">Up to $500,000</option>
              <option value="750000">Up to $750,000</option>
              <option value="1000000">Up to $1,000,000</option>
            </select>
          </label>

          <label className={styles.checkRow}>
            <input type="checkbox" checked={availableOnly} onChange={(event) => setAvailableOnly(event.target.checked)} />
            Available only
          </label>
          <label className={styles.checkRow}>
            <input type="checkbox" checked={transferableOnly} onChange={(event) => setTransferableOnly(event.target.checked)} />
            Transferable only
          </label>
        </aside>

        <div className={styles.results}>
          <div className={styles.resultsBar}>
            <div>
              <strong>{filteredListings.length}</strong> {filteredListings.length === 1 ? "license" : "licenses"} found
            </div>
            <label>
              Sort by
              <select value={sort} onChange={(event) => setSort(event.target.value as SortOption)}>
                <option value="featured">Featured</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="county">County</option>
              </select>
            </label>
          </div>

          {filteredListings.length ? (
            <div className={styles.grid}>
              {filteredListings.map((listing) => (
                <article className={styles.card} key={listing.id}>
                  <div className={styles.imageWrap}>
                    <img src={listing.image} alt={`${listing.type} in ${listing.county}`} />
                    <span className={styles.status}>{listing.status}</span>
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.tags}>
                      <span>{listing.type}</span>
                      {listing.transferable && <span>Transferable</span>}
                    </div>
                    <h2>{listing.county}</h2>
                    <p>{listing.use}</p>
                    <div className={styles.cardFooter}>
                      <strong>{money.format(listing.price)}</strong>
                      <button type="button">VIEW DETAILS</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <h2>No licenses match those filters.</h2>
              <p>Clear one or more filters to see additional inventory.</p>
              <button type="button" onClick={clearFilters}>RESET FILTERS</button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
