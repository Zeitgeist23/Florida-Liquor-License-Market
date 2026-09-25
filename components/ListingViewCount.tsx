"use client";

import { useEffect, useState } from "react";

type ListingViewCountProps = {
  listingRef: string;
  locale?: "en" | "es";
};

export default function ListingViewCount({
  listingRef,
  locale = "en",
}: ListingViewCountProps) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/listing-views/" + encodeURIComponent(listingRef), {
      method: "POST",
      cache: "no-store",
      credentials: "same-origin",
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: { count?: number } | null) => {
        if (!cancelled && typeof payload?.count === "number") {
          setCount(payload.count);
        }
      })
      .catch(() => {
        // View counting is informational and must never interrupt the listing.
      });

    return () => {
      cancelled = true;
    };
  }, [listingRef]);

  return (
    <span
      className="marketplace-listing-view-count"
      title={locale === "es" ? "Visitantes únicos aproximados por navegador; las visitas repetidas desde el mismo navegador se cuentan una sola vez" : "Approximate unique visitors by browser; repeat visits from the same browser are counted once"}
    >
      <span>{locale === "es" ? "Visitantes únicos" : "Unique Visitors"}</span>
      <strong>{count === null ? "—" : count.toLocaleString("en-US")}</strong>
    </span>
  );
}
