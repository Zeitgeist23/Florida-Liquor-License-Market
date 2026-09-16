import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import "../fllm-official-template.css";
import "./official-shell.css";

export default function FloridaLiquorLicenseLotteryLayout({ children }: { children: ReactNode }) {
  return (
    <div className="fllm-official-page lottery-official-route">
      {children}

      <footer className="lottery-official-footer" aria-label="Florida Liquor License Market footer">
        <div className="lottery-official-footer-main">
          <div className="lottery-official-footer-brand">
            <Link href="/" aria-label="Florida Liquor License Market home">
              <Image src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" width={130} height={53} />
            </Link>
            <span>© Florida Liquor License Market</span>
          </div>
          <nav aria-label="Footer navigation">
            <Link href="/">Home</Link>
            <Link href="/florida-4cop-liquor-license-for-sale">4COP</Link>
            <Link href="/florida-3ps-liquor-license-for-sale">3PS</Link>
            <Link href="/listings">Listings</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
        <div className="lottery-official-footer-national">
          <span>Looking for a liquor license outside Florida?</span>
          <a href="https://www.liquorlicensemarket.com/">Visit Liquor License Market — The National Marketplace.</a>
        </div>
      </footer>
    </div>
  );
}
