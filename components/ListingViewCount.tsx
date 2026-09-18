"use client";

import { useEffect, useState } from "react";

type ListingViewCountProps = {
  listingRef: string;
};

export default function ListingViewCount({
  listingRef,
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
      title="One counted view per browser per listing per day"
    >
      <span>Listing Views</span>
      <strong>{count === null ? "—" : count.toLocaleString("en-US")}</strong>
    </span>
  );
}
