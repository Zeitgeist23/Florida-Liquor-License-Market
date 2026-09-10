import type { ReactNode } from "react";

export default function FloridaDepartmentOfRevenueLayout({ children }: { children: ReactNode }) {
  return (
    <>
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
    </>
  );
}
