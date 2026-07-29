"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ListingSubmissionSuccessClient({ sessionId }: { sessionId: string }) {
  const [status, setStatus] = useState("processing");
  const [reference, setReference] = useState("");

  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;
    let attempts = 0;

    async function check() {
      attempts += 1;
      try {
        const response = await fetch(`/api/listing-submissions?session_id=${encodeURIComponent(sessionId)}`, {
          cache: "no-store",
        });
        const payload = (await response.json()) as { status?: string; submissionRef?: string };
        if (cancelled) return;
        setStatus(payload.status || "processing");
        setReference(payload.submissionRef || "");
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
    <main style={{ minHeight: "100vh", background: "#f5f3ed", padding: "60px 20px", color: "#071a3a", fontFamily: "Arial,Helvetica,sans-serif" }}>
      <section style={{ maxWidth: 680, margin: "0 auto", background: "white", borderTop: "5px solid #c88908", padding: 36, boxShadow: "0 16px 45px rgba(7,26,58,.12)" }}>
        <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" style={{ width: 240, height: "auto" }} />
        <h1 style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 34, margin: "30px 0 12px" }}>
          {confirmed ? "Payment Confirmed" : "Payment Received"}
        </h1>
        <p>Thank you. Your $14.95 listing-submission payment has been received.</p>
        <p>Your listing is now in the Florida Liquor License Market review queue. Payment does not guarantee publication. You will receive an email when the payment is matched, and another email if the listing is approved and published.</p>
        {reference && <p><strong>Submission reference:</strong> {reference}</p>}
        <p style={{ marginTop: 28 }}><Link href="/" style={{ color: "#071a3a", fontWeight: 800 }}>Return to Florida Liquor License Market</Link></p>
      </section>
    </main>
  );
}
