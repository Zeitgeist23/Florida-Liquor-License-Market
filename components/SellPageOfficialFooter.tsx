"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const officialFooterPaths = new Set([
  "/sell-your-license",
  "/brokers/list-your-license",
  "/florida-liquor-license-broker",
  "/florida-quota-liquor-license-cost",
  "/florida-liquor-license-news",
  "/resources",
  "/market-data/exchange-board",
  "/buy-florida-liquor-license",
  "/how-to-buy-florida-liquor-license",
  "/how-to-sell-florida-liquor-license",
  "/how-to-finance-florida-liquor-license",
  "/financing",
  "/financing/loan-payment-calculator",
  "/private-liquor-license-lenders",
  "/license-lookup",
  "/license-alerts",
  "/exchange",
  "/transaction-services",
  "/businesses-with-quota-licenses/bars",
  "/restaurants-with-liquor-licenses",
  "/florida-liquor-license-market-platform",
  "/are-florida-quota-liquor-licenses-worth-it",
]);

export default function SellPageOfficialFooter() {
  const pathname = usePathname();
  const isListingDetail = pathname.startsWith("/listings/") && pathname !== "/listings";
  const isLicenseTypePage = pathname.startsWith("/license-types/");
  const isBuyPage = pathname === "/buy-florida-liquor-license";
  const isHillsboroughPage = pathname === "/counties/hillsborough";

  if (isHillsboroughPage) {
    return (
      <style>{`
        .hillsborough-official-page .county-market-page,
        .hillsborough-official-page .county-market-page * {
          font-variant-numeric: lining-nums tabular-nums !important;
          font-feature-settings: "lnum" 1, "tnum" 1 !important;
        }

        .hillsborough-official-page .county-stats strong,
        .hillsborough-official-page .county-data-grid strong,
        .hillsborough-official-page .county-data-type-grid dd,
        .hillsborough-official-page .county-data-evidence-grid b,
        .hillsborough-official-page .county-sold-grid strong {
          font-family: "Times New Roman", Times, serif !important;
          font-variant-numeric: lining-nums tabular-nums !important;
          font-feature-settings: "lnum" 1, "tnum" 1 !important;
          letter-spacing: 0 !important;
        }
      `}</style>
    );
  }

  if (!officialFooterPaths.has(pathname) && !isListingDetail && !isLicenseTypePage) return null;

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
