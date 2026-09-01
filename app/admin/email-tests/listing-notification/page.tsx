"use client";

import { useState } from "react";

type Scenario = "below_ask_bid" | "seller_counter" | "price_match";

export default function ListingNotificationEmailTestPage() {
  const [running, setRunning] = useState<Scenario | null>(null);
  const [result, setResult] = useState("");

  async function runExchangeTest(scenario: Scenario) {
    setRunning(scenario);
    setResult("");
    try {
      const response = await fetch("/api/admin/email-tests/exchange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || `Internal test failed (${response.status}).`);
      setResult(JSON.stringify(payload, null, 2));
    } catch (error) {
      setResult(error instanceof Error ? error.message : "Internal test failed.");
    } finally {
      setRunning(null);
    }
  }

  const buttonStyle = {
    minHeight: 46,
    padding: "0 18px",
    border: "1px solid #c88908",
    borderRadius: 6,
    background: "#071a35",
    color: "#fff",
    fontSize: 14,
    fontWeight: 800,
    cursor: "pointer",
  } as const;

  return (
    <main style={{ maxWidth: 860, margin: "56px auto", padding: "0 24px", fontFamily: "Arial, sans-serif", color: "#071a35" }}>
      <p style={{ color: "#a46c00", fontWeight: 900, letterSpacing: ".08em", textTransform: "uppercase" }}>Admin Only</p>
      <h1 style={{ marginBottom: 8 }}>FLLM Internal Test Center</h1>
      <p style={{ lineHeight: 1.65 }}>
        Use these controls to test FLLM systems without contacting a live seller, broker, or buyer.
      </p>

      <section style={{ marginTop: 28, padding: 22, border: "1px solid #d7dce2", borderRadius: 8, background: "#f7f9fb" }}>
        <h2 style={{ marginTop: 0 }}>FLLM Exchange</h2>
        <p style={{ lineHeight: 1.6 }}>
          Exchange tests use synthetic <strong>FLLM-INTERNAL-TEST</strong> references. All test email is routed only to the configured internal test inbox. No live listing is used and no live seller is contacted.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14, margin: "22px 0" }}>
          <button style={buttonStyle} disabled={running !== null} onClick={() => runExchangeTest("below_ask_bid")}>{running === "below_ask_bid" ? "Running…" : "Test Buyer Bid"}</button>
          <button style={buttonStyle} disabled={running !== null} onClick={() => runExchangeTest("seller_counter")}>{running === "seller_counter" ? "Running…" : "Test Seller Counter"}</button>
          <button style={buttonStyle} disabled={running !== null} onClick={() => runExchangeTest("price_match")}>{running === "price_match" ? "Running…" : "Test Price Match"}</button>
        </div>
        <pre style={{ minHeight: 58, margin: 0, padding: 14, whiteSpace: "pre-wrap", overflowWrap: "anywhere", border: "1px solid #e1e5e8", borderRadius: 6, background: "#fff", lineHeight: 1.5 }}>{result || "No Exchange test run yet."}</pre>
      </section>

      <section style={{ marginTop: 22, padding: 22, border: "1px solid #d7dce2", borderRadius: 8 }}>
        <h2 style={{ marginTop: 0 }}>Corporate Email Signature Test</h2>
        <p>
          Sends one production-path signature test to the internal test recipient. It does not contact any broker or seller.
        </p>
        <form action="/api/admin/email-tests/listing-notification" method="post">
          <button type="submit" style={buttonStyle}>Send production signature test</button>
        </form>
      </section>
    </main>
  );
}
