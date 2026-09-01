"use client";

import { useState } from "react";

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export default function ExchangeResponseClient({ token, bid }: { token: string; bid: number }) {
  const [counterPrice, setCounterPrice] = useState("");
  const [status, setStatus] = useState("");
  const [working, setWorking] = useState(false);

  async function respond(action: "accept" | "counter") {
    setWorking(true);
    setStatus("Saving…");
    try {
      const numericCounter = Number(counterPrice.replace(/[^0-9.]/g, ""));
      const response = await fetch("/api/exchange/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, action, counterPrice: numericCounter }),
      });
      const result = await response.json() as { error?: string; matched?: boolean; transactionRef?: string | null };
      if (!response.ok) throw new Error(result.error || "Unable to save response.");
      if (result.matched && result.transactionRef) {
        window.location.href = `/exchange/transactions/${encodeURIComponent(result.transactionRef)}`;
        return;
      }
      setStatus(action === "counter" ? "Counteroffer sent to buyer." : "Response saved.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to save response.");
    } finally {
      setWorking(false);
    }
  }

  return (
    <div style={{ marginTop: 18 }}>
      <p style={{ lineHeight: 1.7, color: "#d9e1e7" }}>
        You can accept the buyer&apos;s proposed price or counter at a different amount. Accepting records a <strong>non-binding price match</strong> and opens the FLLM Transaction Room.
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
        <button type="button" disabled={working} onClick={() => respond("accept")} style={{ padding: "12px 18px", border: 0, borderRadius: 7, background: "#e2a51e", color: "#071a3a", fontWeight: 900, cursor: "pointer" }}>
          Accept {money(bid)}
        </button>
        <input value={counterPrice} onChange={(event) => setCounterPrice(event.target.value)} inputMode="numeric" placeholder="Counter price" style={{ padding: "12px 13px", borderRadius: 7, border: "1px solid #8090a0", minWidth: 180 }} />
        <button type="button" disabled={working} onClick={() => respond("counter")} style={{ padding: "12px 18px", border: "1px solid #e2a51e", borderRadius: 7, background: "transparent", color: "#f2c85d", fontWeight: 900, cursor: "pointer" }}>
          Send Counteroffer
        </button>
      </div>
      <p style={{ minHeight: 22, marginTop: 14, color: "#f6d889" }} role="status">{status}</p>
    </div>
  );
}
