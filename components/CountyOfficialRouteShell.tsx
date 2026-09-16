"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FormsSiteHeader from "@/components/FormsSiteHeader";

export default function CountyOfficialRouteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isCountyDirectory = pathname === "/counties" || pathname === "/counties/";

  if (isCountyDirectory) return <>{children}</>;

  return (
    <div className="county-official-global-shell fllm-official-page">
      <style>{`
        .county-official-global-shell > .county-official-global-header-wrap {
          position: relative;
          z-index: 600;
          border-bottom: 1px solid rgba(246, 167, 0, .55);
          background: #020b12;
        }

        .county-official-global-shell > .county-official-global-header-wrap .forms-site-header {
          margin-inline: auto;
        }

        .county-official-global-shell .county-market-page > .county-header,
        .county-official-global-shell .county-market-page > .county-footer,
        .county-official-global-shell .liberty-official-page > .liberty-official-header-wrap,
        .county-official-global-shell .liberty-official-page > .official-directory-footer,
        .county-official-global-shell .hillsborough-official-page > .hillsborough-official-header-wrap,
        .county-official-global-shell .hillsborough-official-page > .official-directory-footer {
          display: none !important;
        }

        .county-official-global-shell .county-map-card {
          background: radial-gradient(circle at 50% 35%, #0c2234 0%, #041420 60%, #01070b 100%) !important;
        }

        .county-official-global-shell .county-map-card .florida-county-map > rect {
          fill: #061728 !important;
        }

        .county-official-global-shell .county-map-card > span {
          margin-top: 5px !important;
          color: #d0d9df !important;
          font-size: 15px !important;
          font-weight: 700 !important;
          line-height: 1.25 !important;
          letter-spacing: .01em !important;
        }

        @media (min-width: 981px) {
          .county-official-global-shell .forms-site-header.page-shell {
            width: min(1240px, calc(100% - 40px));
            gap: 18px;
          }

          .county-official-global-shell .forms-site-header .brand-lockup {
            flex: 0 0 184px;
          }

          .county-official-global-shell .forms-site-header .brand-lockup img {
            width: 168.7125px;
            height: 68.5075px;
          }

          .county-official-global-shell .forms-site-header .primary-nav {
            justify-content: center;
            gap: 42px;
          }

          .county-official-global-shell .forms-site-header .header-actions {
            transform: translateX(5px);
          }

          .county-official-global-shell .forms-site-header .header-actions .btn-outline:hover,
          .county-official-global-shell .forms-site-header .header-actions .btn-outline:focus-visible {
            border-color: #ffc13b;
            background: linear-gradient(145deg, #ffc13b, #e69a00);
            color: #07101a;
            box-shadow:
              0 0 0 1px rgba(255, 193, 59, .28),
              0 0 18px rgba(241, 166, 0, .5);
          }
        }
      `}</style>

      <div className="county-official-global-header-wrap">
        <FormsSiteHeader />
      </div>

      {children}

      <footer className="directory-footer sell-license-page-footer official-directory-footer">
        <div className="directory-shell">
          <div className="directory-footer-brand">
            <Link href="/" aria-label="Florida Liquor License Market home">
              <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" width="130" height="53" />
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
