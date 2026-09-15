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
]);

export default function SellPageOfficialFooter() {
  const pathname = usePathname();
  const isListingDetail = pathname.startsWith("/listings/") && pathname !== "/listings";

  if (!officialFooterPaths.has(pathname) && !isListingDetail) return null;

  return (
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
  );
}
