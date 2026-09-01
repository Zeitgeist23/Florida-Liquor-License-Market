"use client";

import { useState } from "react";

type Scenario = "below_ask_bid" | "seller_counter" | "price_match";

export default function ExchangeInternalTestPage() {
  const [running, setRunning] = useState<Scenario | null>(null);
  const [result, setResult] = useState<string>("");

  async function run(scenario: Scenario) {
    setRunning(scenario);
    setResult("");
    try {
      const response = await fetch("/api/admin/email-tests/exchange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Internal test failed.");
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
    <main style={{ maxWidth: 820, margin: "56px auto", padding: "0 24px", fontFamily: "Arial, sans-serif", color: "#071a35" }}>
      <p style={{ color: "#a46c00", fontWeight: 900, letterSpacing: ".08em", textTransform: "uppercase" }}>Admin Only</p>
      <h1 style={{ marginBottom: 8 }}>FLLM Exchange Internal Test Console</h1>
      <p style={{ lineHeight: 1.65, maxWidth: 760 }}>
        These tests use synthetic FLLM-INTERNAL-TEST references and route all test email to the configured internal test inbox.
        They do not look up, email, or otherwise contact any live seller or buyer.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14, margin: "28px 0" }}>
        <button style={buttonStyle} disabled={running !== null} onClick={() => run("below_ask_bid")}>{running === "below_ask_bid" ? "Running…" : "Test Buyer Bid"}</button>
        <button style={buttonStyle} disabled={running !== null} onClick={() => run("seller_counter")}>{running === "seller_counter" ? "Running…" : "Test Seller Counter"}</button>
        <button style={buttonStyle} disabled={running !== null} onClick={() => run("price_match")}>{running === "price_match" ? "Running…" : "Test Price Match"}</button>
      </div>

      <div style={{ padding: 18, border: "1px solid #d7dce2", borderRadius: 8, background: "#f7f9fb" }}>
        <strong>Test result</strong>
        <pre style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere", lineHeight: 1.5, marginBottom: 0 }}>{result || "No test run yet."}</pre>
      </div>

      <p style={{ marginTop: 20, color: "#5e6874", fontSize: 13, lineHeight: 1.6 }}>
        A successful run verifies the Exchange database write path, secure token generation/verification, email delivery path, and—when selected—the matched transaction creation path without using a real listing.
      </p>
    </main>
  );
}
