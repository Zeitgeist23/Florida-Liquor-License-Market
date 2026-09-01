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
    minHeight: 48,
    padding: "0 20px",
    border: "1px solid #d39a18",
    borderRadius: 7,
    background: "#071a35",
    color: "#ffffff",
    fontSize: 15,
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.12), 0 3px 7px rgba(7,26,53,.18)",
  } as const;

  const cardStyle = {
    padding: 28,
    border: "1px solid #d8dee6",
    borderTop: "4px solid #d39a18",
    borderRadius: 10,
    background: "#ffffff",
    color: "#071a35",
    boxShadow: "0 10px 28px rgba(0,0,0,.16)",
  } as const;

  return (
    <main
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "54px 24px 72px",
        fontFamily: "Arial, sans-serif",
        color: "#ffffff",
      }}
    >
      <p
        style={{
          margin: "0 0 18px",
          color: "#e0a72a",
          fontWeight: 900,
          fontSize: 15,
          letterSpacing: ".12em",
          textTransform: "uppercase",
        }}
      >
        Admin Only
      </p>

      <h1
        style={{
          margin: "0 0 12px",
          color: "#ffffff",
          fontSize: "clamp(32px, 5vw, 46px)",
          lineHeight: 1.08,
          letterSpacing: "-.02em",
        }}
      >
        FLLM Internal Test Center
      </h1>

      <p
        style={{
          margin: "0 0 34px",
          maxWidth: 780,
          color: "#e4eaf1",
          fontSize: 18,
          lineHeight: 1.6,
        }}
      >
        Use these controls to test FLLM systems without contacting a live seller, broker, or buyer.
      </p>

      <section style={cardStyle}>
        <h2 style={{ margin: "0 0 12px", color: "#071a35", fontSize: 29 }}>FLLM Exchange</h2>
        <p style={{ margin: 0, color: "#22364f", fontSize: 17, lineHeight: 1.65 }}>
          Exchange tests use synthetic <strong>FLLM-INTERNAL-TEST</strong> references. All test email is routed only to the configured internal test inbox. No live listing is used and no live seller is contacted.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: 14,
            margin: "26px 0 22px",
          }}
        >
          <button style={buttonStyle} disabled={running !== null} onClick={() => runExchangeTest("below_ask_bid")}>
            {running === "below_ask_bid" ? "Running…" : "Test Buyer Bid"}
          </button>
          <button style={buttonStyle} disabled={running !== null} onClick={() => runExchangeTest("seller_counter")}>
            {running === "seller_counter" ? "Running…" : "Test Seller Counter"}
          </button>
          <button style={buttonStyle} disabled={running !== null} onClick={() => runExchangeTest("price_match")}>
            {running === "price_match" ? "Running…" : "Test Price Match"}
          </button>
        </div>

        <div
          style={{
            border: "1px solid #d8dee6",
            borderRadius: 7,
            background: "#f6f8fb",
            padding: 16,
          }}
        >
          <div style={{ marginBottom: 8, color: "#526174", fontSize: 12, fontWeight: 900, letterSpacing: ".08em", textTransform: "uppercase" }}>
            Test Result
          </div>
          <pre
            style={{
              minHeight: 54,
              margin: 0,
              color: "#071a35",
              fontSize: 14,
              lineHeight: 1.55,
              whiteSpace: "pre-wrap",
              overflowWrap: "anywhere",
            }}
          >
            {result || "No Exchange test run yet."}
          </pre>
        </div>
      </section>

      <section style={{ ...cardStyle, marginTop: 24 }}>
        <h2 style={{ margin: "0 0 12px", color: "#071a35", fontSize: 27 }}>Corporate Email Signature Test</h2>
        <p style={{ margin: "0 0 22px", color: "#22364f", fontSize: 17, lineHeight: 1.6 }}>
          Sends one production-path signature test to the internal test recipient. It does not contact any broker or seller.
        </p>
        <form action="/api/admin/email-tests/listing-notification" method="post">
          <button type="submit" style={buttonStyle}>Send Production Signature Test</button>
        </form>
      </section>
    </main>
  );
}
