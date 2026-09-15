import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export default function FloridaDepartmentOfRevenueLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        .fdor-official-shell .fdor-page > .abt-header-wrap {
          position: relative;
          z-index: 30;
          border-bottom: 1px solid rgba(246, 167, 0, .55);
          background: #020b12;
        }

        .fdor-official-shell .fdor-page > .abt-header-wrap .forms-site-header {
          margin-inline: auto;
        }

        .fdor-official-shell .fdor-page > .abt-forms-footer {
          display: none !important;
        }

        @media (min-width: 981px) {
          .fdor-official-shell .forms-site-header.page-shell {
            width: min(1240px, calc(100% - 40px));
            gap: 18px;
          }

          .fdor-official-shell .forms-site-header .brand-lockup {
            flex: 0 0 184px;
          }

          .fdor-official-shell .forms-site-header .brand-lockup img {
            width: 168.7125px;
            height: 68.5075px;
          }

          .fdor-official-shell .forms-site-header .primary-nav {
            justify-content: center;
            gap: 42px;
          }

          .fdor-official-shell .forms-site-header .header-actions {
            transform: translateX(5px);
          }

          .fdor-official-shell .forms-site-header .header-actions .btn-outline:hover,
          .fdor-official-shell .forms-site-header .header-actions .btn-outline:focus-visible {
            border-color: #ffc13b;
            background: linear-gradient(145deg, #ffc13b, #e69a00);
            color: #07101a;
            box-shadow:
              0 0 0 1px rgba(255, 193, 59, .28),
              0 0 18px rgba(241, 166, 0, .5);
          }
        }
      `}</style>

      <div className="fdor-official-shell">
        {children}

        <aside
          aria-label="Related Florida Department of Revenue attorney profile"
          style={{
            background: "#061522",
            borderTop: "1px solid rgba(246,167,0,.35)",
            padding: "18px 24px 24px",
            textAlign: "center",
            fontSize: 14,
          }}
        >
          <span style={{ color: "#9dadb8", marginRight: 10 }}>Related FLLM attorney profile:</span>
          <a
            href="/resources/liquor-license-attorneys/james-h-sutton-jr"
            style={{ color: "#f6a700", fontWeight: 800 }}
          >
            Florida Department of Revenue Tax Appeals — James H. Sutton, Jr., CPA, Esq.
          </a>
        </aside>

        <footer className="directory-footer sell-license-page-footer official-directory-footer">
          <div className="directory-shell">
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
            <nav aria-label="Footer navigation">
              <Link href="/">Home</Link>
              <Link href="/florida-4cop-liquor-license-for-sale">4COP</Link>
              <Link href="/florida-3ps-liquor-license-for-sale">3PS</Link>
              <Link href="/listings">Listings</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>
        </footer>
      </div>
    </>
  );
}
