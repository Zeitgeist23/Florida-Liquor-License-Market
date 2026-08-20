"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function PreliminaryMarketReportSuccessClient({ sessionId }: { sessionId: string }) {
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
          `/api/preliminary-market-report-orders?session_id=${encodeURIComponent(sessionId)}`,
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
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const confirmed = status === "paid" || status === "approved";

  return (
    <main style={{ minHeight: "100vh", background: "#061728", padding: "60px 20px", color: "#eef5f8", fontFamily: "Arial,Helvetica,sans-serif" }}>
      <section style={{ maxWidth: 720, margin: "0 auto", background: "#0b2a45", border: "1px solid rgba(246,167,0,.55)", borderTop: "5px solid #f6a700", borderRadius: 12, padding: 36, boxShadow: "0 20px 55px rgba(0,0,0,.28)" }}>
        <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" style={{ width: 220, height: "auto" }} />
        <span style={{ display: "block", marginTop: 28, color: "#f6a700", fontSize: 12, fontWeight: 900, letterSpacing: ".1em", textTransform: "uppercase" }}>Preliminary Market Report</span>
        <h1 style={{ fontFamily: "Georgia,'Times New Roman',serif", color: "#fff", fontSize: 36, margin: "8px 0 14px" }}>
          {confirmed ? "Payment Confirmed" : "Order Received"}
        </h1>
        <p style={{ color: "#c8d8df", lineHeight: 1.7 }}>Thank you. Your $195 order for a Preliminary Florida Liquor License Market Report has been received.</p>
        <p style={{ color: "#c8d8df", lineHeight: 1.7 }}>FLLM will research the subject license, available DBPR information, current county comparables, and available transaction or transfer evidence. We may contact you if additional information is needed.</p>
        {reference && <p style={{ color: "#fff" }}><strong>Order reference:</strong> {reference}</p>}
        <div style={{ marginTop: 24, padding: 16, borderLeft: "3px solid #f6a700", background: "rgba(246,167,0,.07)", color: "#b9cbd5", fontSize: 13, lineHeight: 1.65 }}>
          This is a preliminary market analysis, not a certified appraisal, real-estate appraisal, fairness opinion, or guarantee of value. If a bank, court, estate, or other institution requires an independent formal appraisal, FLLM can help coordinate one with a credentialed valuation professional.
        </div>
        <p style={{ marginTop: 30 }}><Link href="/florida-liquor-license-value" style={{ color: "#f6a700", fontWeight: 800 }}>Return to the FLLM valuation page</Link></p>
      </section>
    </main>
  );
}
