"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const officialFooterPaths = new Set([
  "/sell-your-license",
  "/florida-quota-liquor-license-cost",
  "/florida-liquor-license-news",
  "/resources",
  "/market-data/exchange-board",
  "/buy-florida-liquor-license",
  "/counties/hillsborough",
]);

export default function SellPageOfficialFooter() {
  const pathname = usePathname();
  const isListingDetail = pathname.startsWith("/listings/") && pathname !== "/listings";
  const isBuyPage = pathname === "/buy-florida-liquor-license";

  if (!officialFooterPaths.has(pathname) && !isListingDetail) return null;

  return (
    <>
      {isBuyPage ? (
        <style>{`
          body:has(.buy-license-grid) .seo-market-snapshot-grid > div {
            display: flex !important;
            min-height: 103px;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 16px 12px !important;
            text-align: center !important;
          }

          body:has(.buy-license-grid) .seo-market-snapshot-grid strong {
            display: block !important;
            width: 100% !important;
            margin: 0 0 7px !important;
            font-family: "Times New Roman", Times, serif !important;
            font-variant-numeric: lining-nums tabular-nums !important;
            font-feature-settings: "lnum" 1, "tnum" 1 !important;
            letter-spacing: 0 !important;
            line-height: 1 !important;
            text-align: center !important;
          }

          body:has(.buy-license-grid) .seo-market-snapshot-grid small {
            display: block !important;
            width: 100% !important;
            margin: 0 !important;
            line-height: 1.35 !important;
            text-align: center !important;
          }
        `}</style>
      ) : null}

      <footer className="directory-footer sell-license-page-footer official-directory-footer">
        <div className="directory-shell">
          <div className="directory-footer-brand">
            <Link href="/" aria-label="Florida Liquor License Market home">
              <Image src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" width={130} height={53} />
            </Link>
            <span>© Florida Liquor License Market</span>
          </div>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/florida-4cop-liquor-license-for-sale">4COP</Link>
            <Link href="/florida-3ps-liquor-license-for-sale">3PS</Link>
            <Link href="/listings">Listings</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
