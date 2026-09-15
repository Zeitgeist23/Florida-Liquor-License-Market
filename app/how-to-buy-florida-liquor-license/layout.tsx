import type { ReactNode } from "react";

import FormsSiteHeader from "@/components/FormsSiteHeader";

import "../resources/forms/abt-forms.css";

export default function HowToBuyFloridaLiquorLicenseLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        .how-to-buy-official-shell > .how-to-buy-official-header-wrap {
          position: relative;
          z-index: 100;
          border-bottom: 1px solid rgba(246, 167, 0, .55);
          background: #020b12;
        }

        .how-to-buy-official-shell > .how-to-buy-official-header-wrap .forms-site-header {
          margin-inline: auto;
        }

        /* Hide the guide page's old route-specific header so the shared official FLLM header is authoritative. */
        .how-to-buy-official-shell > main > .abt-header-wrap {
          display: none !important;
        }

        @media (min-width: 981px) {
          .how-to-buy-official-shell .forms-site-header.page-shell {
            width: min(1240px, calc(100% - 40px));
            gap: 18px;
          }

          .how-to-buy-official-shell .forms-site-header .brand-lockup {
            flex: 0 0 184px;
          }

          .how-to-buy-official-shell .forms-site-header .brand-lockup img {
            width: 168.7125px;
            height: 68.5075px;
          }

          .how-to-buy-official-shell .forms-site-header .primary-nav {
            justify-content: center;
            gap: 42px;
          }

          .how-to-buy-official-shell .forms-site-header .header-actions {
            transform: translateX(5px);
          }

          .how-to-buy-official-shell .forms-site-header .header-actions .btn-outline:hover,
          .how-to-buy-official-shell .forms-site-header .header-actions .btn-outline:focus-visible {
            border-color: #ffc13b;
            background: linear-gradient(145deg, #ffc13b, #e69a00);
            color: #07101a;
            box-shadow:
              0 0 0 1px rgba(255, 193, 59, .28),
              0 0 18px rgba(241, 166, 0, .5);
          }
        }
      `}</style>

      <div className="how-to-buy-official-shell">
        <div className="how-to-buy-official-header-wrap">
          <FormsSiteHeader />
        </div>
        {children}
      </div>
    </>
  );
}
