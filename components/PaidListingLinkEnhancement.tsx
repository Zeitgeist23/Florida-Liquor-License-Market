"use client";

import { useEffect } from "react";

export default function PaidListingLinkEnhancement() {
  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>(
      ".result-card .result-actions a.btn.btn-gold"
    );

    links.forEach((link) => {
      const destination = new URL(link.href, window.location.origin);
      const listingReference = destination.searchParams.get("ref") || "";
      if (!listingReference.startsWith("FLLM-PAID-")) return;
      link.href = `/listings/${listingReference.toLowerCase()}`;
      link.textContent = "View Listing";
    });
  }, []);

  return null;
}
