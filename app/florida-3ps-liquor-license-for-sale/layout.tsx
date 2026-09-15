import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";

import "../resources/forms/abt-forms.css";
import "../fllm-official-template.css";
import "../fllm-market-page-template.css";
import "./official-shell.css";

export default function Florida3PsMarketLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="seo-market-page fllm-official-page three-ps-official-shell"
      data-fllm-template="market-page-v1"
    >
      <div className="abt-header-wrap">
        <FormsSiteHeader />
      </div>

      {children}

      <footer className="directory-footer">
        <div className="seo-market-shell">
          <div className="directory-footer-brand">
            <Link href="/" aria-label="Florida Liquor License Market home">
              <Image
                src="/assets/brand-sharp.svg"
                alt="Florida Liquor License Market"
                width={130}
                height={53}
              />
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
    </div>
  );
}
