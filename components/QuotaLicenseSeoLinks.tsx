"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const exactPaths = new Set([
  "/listings",
  "/buy-florida-liquor-license",
  "/how-to-buy-florida-liquor-license",
  "/florida-quota-liquor-license-cost",
  "/florida-liquor-license-value",
  "/florida-liquor-license-appraisal",
  "/financing",
  "/finance-a-license",
  "/market-data/exchange-board",
  "/resources/florida-liquor-license-types",
  "/license-types/4cop-quota",
]);

function isCountyMarketPage(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  return parts.length === 2 && parts[0] === "counties";
}

function isListingDetailPage(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  return parts.length === 2 && parts[0] === "listings";
}

export default function QuotaLicenseSeoLinks() {
  const pathname = usePathname();

  if (
    pathname === "/florida-4cop-liquor-license-for-sale" ||
    (!exactPaths.has(pathname) && !isCountyMarketPage(pathname) && !isListingDetailPage(pathname))
  ) {
    return null;
  }

  return (
    <aside className="fllm-authority-links" aria-label="Florida quota liquor licenses for sale">
      <div className="fllm-authority-links__inner">
        <p>
          <strong>Statewide quota inventory:</strong>{" "}
          <Link href="/florida-4cop-liquor-license-for-sale">
            Compare Florida quota liquor licenses for sale
          </Link>{" "}
          across current 4COP quota inventory, county markets and disclosed asking prices. For the broader marketplace, {" "}
          <Link href="/listings">browse all Florida liquor licenses for sale</Link>.
        </p>
      </div>
    </aside>
  );
}
