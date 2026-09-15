import type { ReactNode } from "react";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import BrokerHeroSelectionFix from "./BrokerHeroSelectionFix";

import "@/app/listings/listings-premium.css";
import "@/app/listings/listings-header-position.css";
import "@/app/listings/listings-map-size.css";
import "@/app/listings/listings-county-links.css";
import "@/app/listings/listings-navy-refresh.css";
import "@/app/listings/listings-card-gold-borders.css";
import "@/app/listings/listings-title-highlight.css";
import "@/app/listings/listings-regression-fix.css";
import "@/app/listings/listings-filter-depth.css";
import "@/app/listings/listings-logo-3pct-lock.css";
import "@/app/listings/listings-conversion-cards.css";
import "@/app/listings/listings-card-overlap-fix.css";
import "@/app/listings/listings-masthead-darker.css";
import "@/app/listings/listings-mobile-header-fix.css";
import "@/app/listings/listings-seo-footer.css";
import "@/app/listings/listings-view-button-edge-fix.css";
import "./mobile-broker-kicker.css";
import "./mobile-benefit-copy.css";

export default function BrokerListYourLicenseLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BrokerHeroSelectionFix />

      <style>{`
        .broker-official-shell > .broker-official-header-wrap {
          position: relative;
          z-index: 100;
          border-bottom: 1px solid rgba(246, 167, 0, .55);
          background: #020b12;
        }

        .broker-official-shell > .broker-official-header-wrap .forms-site-header {
          margin-inline: auto;
        }

        /* Remove the route's old one-off header/footer so the approved shared shell is authoritative. */
        .broker-official-shell > main > div:has(> .forms-site-header),
        .broker-official-shell > main > footer {
          display: none !important;
        }

        @media (min-width: 981px) {
          .broker-official-shell .forms-site-header.page-shell {
            width: min(1240px, calc(100% - 40px));
            gap: 18px;
          }

          .broker-official-shell .forms-site-header .brand-lockup {
            flex: 0 0 184px;
          }

          .broker-official-shell .forms-site-header .brand-lockup img {
            width: 168.7125px;
            height: 68.5075px;
          }

          .broker-official-shell .forms-site-header .primary-nav {
            justify-content: center;
            gap: 42px;
          }

          .broker-official-shell .forms-site-header .header-actions {
            transform: translateX(5px);
          }

          .broker-official-shell .forms-site-header .header-actions .btn-outline:hover,
          .broker-official-shell .forms-site-header .header-actions .btn-outline:focus-visible {
            border-color: #ffc13b;
            background: linear-gradient(145deg, #ffc13b, #e69a00);
            color: #07101a;
            box-shadow:
              0 0 0 1px rgba(255, 193, 59, .28),
              0 0 18px rgba(241, 166, 0, .5);
          }
        }
      `}</style>

      <div className="broker-official-shell">
        <div className="broker-official-header-wrap">
          <FormsSiteHeader />
        </div>

        {children}
      </div>
    </>
  );
}
