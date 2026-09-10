import type { ReactNode } from "react";
import "./sutton-static-replacement.css";

export default function LiquorLicenseAttorneysLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <nav
        aria-label="Featured FLLM attorney profiles"
        style={{
          background: "#061522",
          borderTop: "1px solid rgba(246,167,0,.35)",
          color: "#dce7ef",
          padding: "18px 24px 24px",
          textAlign: "center",
          fontSize: "14px",
        }}
      >
        <span style={{ marginRight: 12, opacity: .78 }}>FLLM attorney profiles:</span>
        <a href="/resources/liquor-license-attorneys/james-h-sutton-jr" style={{ color: "#f6a700", fontWeight: 800, marginRight: 18 }}>
          James H. Sutton, Jr., CPA, Esq.
        </a>
        <a href="/resources/liquor-license-attorneys/charles-m-schropp" style={{ color: "#f6a700", fontWeight: 800 }}>
          Charles M. Schropp
        </a>
      </nav>
    </>
  );
}
