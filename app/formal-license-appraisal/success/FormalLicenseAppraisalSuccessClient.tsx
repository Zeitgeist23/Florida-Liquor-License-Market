"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function FormalLicenseAppraisalSuccessClient({ sessionId }: { sessionId: string }) {
  const [status, setStatus] = useState("processing");
  const [reference, setReference] = useState("");

  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;
    let attempts = 0;

    async function check() {
      attempts += 1;
      try {
        const response = await fetch(
          `/api/formal-license-appraisal-orders?session_id=${encodeURIComponent(sessionId)}`,
          { cache: "no-store" },
        );
        const payload = (await response.json()) as { status?: string; orderReference?: string };
        if (cancelled) return;
        setStatus(payload.status || "processing");
        setReference(payload.orderReference || "");
        if ((payload.status === "processing" || payload.status === "pending_payment") && attempts < 10) {
          window.setTimeout(check, 1500);
        }
      } catch {
        if (!cancelled && attempts < 10) window.setTimeout(check, 1500);
      }
    }

    void check();
    return () => { cancelled = true; };
  }, [sessionId]);

  const confirmed = status === "paid" || status === "approved";

  return (
    <main style={{ minHeight: "100vh", background: "#061728", padding: "60px 20px", color: "#eef5f8", fontFamily: "Arial,Helvetica,sans-serif" }}>
      <section style={{ maxWidth: 760, margin: "0 auto", background: "#0b2a45", border: "1px solid rgba(246,167,0,.55)", borderTop: "5px solid #f6a700", borderRadius: 12, padding: 36, boxShadow: "0 20px 55px rgba(0,0,0,.28)" }}>
        <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" style={{ width: 220, height: "auto" }} />
        <span style={{ display: "block", marginTop: 28, color: "#f6a700", fontSize: 12, fontWeight: 900, letterSpacing: ".1em", textTransform: "uppercase" }}>Formal Quota License Appraisal</span>
        <h1 style={{ fontFamily: "Georgia,'Times New Roman',serif", color: "#fff", fontSize: 36, margin: "8px 0 14px" }}>
          {confirmed ? "Payment Confirmed" : "Appraisal Order Received"}
        </h1>
        <p style={{ color: "#c8d8df", lineHeight: 1.7 }}>Thank you. Your $995 order for an FLLM Formal Florida Quota Liquor License Appraisal has been received.</p>
        <p style={{ color: "#c8d8df", lineHeight: 1.7 }}>FLLM will review the assignment information and may contact you or the intended institution to confirm reliance language, effective date, deadline or additional scope requirements before completing the appraisal.</p>
        {reference && <p style={{ color: "#fff" }}><strong>Order reference:</strong> {reference}</p>}
        <div style={{ marginTop: 24, padding: 16, borderLeft: "3px solid #f6a700", background: "rgba(246,167,0,.07)", color: "#b9cbd5", fontSize: 13, lineHeight: 1.65 }}>
          The report is designed for lender and professional review. The receiving bank or institution independently determines report acceptance and whether a particular appraisal credential, format or additional scope is required.
        </div>
        <p style={{ marginTop: 30 }}><Link href="/florida-liquor-license-appraisal" style={{ color: "#f6a700", fontWeight: 800 }}>Return to the formal appraisal page</Link></p>
      </section>
    </main>
  );
}
