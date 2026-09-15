import type { ReactNode } from "react";

import FormsSiteHeader from "@/components/FormsSiteHeader";

export default function LicenseAlertsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        .license-alerts-official-shell > .license-alerts-official-header-wrap {
          position: relative;
          z-index: 100;
          border-bottom: 1px solid rgba(246, 167, 0, .55);
          background: #020b12;
        }

        .license-alerts-official-shell > .license-alerts-official-header-wrap .forms-site-header {
          margin-inline: auto;
        }

        /* Hide the page-specific header so the approved shared FLLM header is authoritative. */
        .license-alerts-official-shell > main > .license-alert-header-wrap {
          display: none !important;
        }

        @media (min-width: 981px) {
          .license-alerts-official-shell .forms-site-header.page-shell {
            width: min(1240px, calc(100% - 40px));
            gap: 18px;
          }

          .license-alerts-official-shell .forms-site-header .brand-lockup {
            flex: 0 0 184px;
          }

          .license-alerts-official-shell .forms-site-header .brand-lockup img {
            width: 168.7125px;
            height: 68.5075px;
          }

          .license-alerts-official-shell .forms-site-header .primary-nav {
            justify-content: center;
            gap: 42px;
          }

          .license-alerts-official-shell .forms-site-header .header-actions {
            transform: translateX(5px);
          }

          .license-alerts-official-shell .forms-site-header .header-actions .btn-outline:hover,
          .license-alerts-official-shell .forms-site-header .header-actions .btn-outline:focus-visible {
            border-color: #ffc13b;
            background: linear-gradient(145deg, #ffc13b, #e69a00);
            color: #07101a;
            box-shadow:
              0 0 0 1px rgba(255, 193, 59, .28),
              0 0 18px rgba(241, 166, 0, .5);
          }
        }
      `}</style>

      <div className="license-alerts-official-shell">
        <div className="license-alerts-official-header-wrap">
          <FormsSiteHeader />
        </div>
        {children}
      </div>
    </>
  );
}
