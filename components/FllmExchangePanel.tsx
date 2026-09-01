"use client";

import { FormEvent, useState } from "react";

function money(value: number | null) {
  if (value === null) return "Undisclosed";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export default function FllmExchangePanel(props: {
  listingRef: string;
  askingPrice: number | null;
  initialBestBid?: number | null;
  initialBidCount?: number;
}) {
  const [status, setStatus] = useState<"idle"|"submitting"|"success"|"matched"|"error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("submitting");
    setMessage("");
    try {
      const response = await fetch("/api/exchange/bid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingRef: props.listingRef,
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          price: Number(String(data.get("price") || "").replace(/[^0-9.]/g, "")),
          acknowledgment: data.get("acknowledgment") === "on",
        }),
      });
      const result = await response.json() as { error?: string; matched?: boolean; transactionRef?: string|null };
      if (!response.ok) throw new Error(result.error || "Unable to submit bid.");
      setStatus(result.matched ? "matched" : "success");
      setMessage(result.matched
        ? `PRICE MATCH REACHED. FLLM recorded a non-binding price match. ${result.transactionRef ? `Transaction ${result.transactionRef} has been opened.` : ""}`
        : "Your bid has been recorded and the seller has been notified securely.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to submit bid.");
    }
  }

  return (
    <section className="fllm-exchange" aria-labelledby={`exchange-${props.listingRef}`}>
      <div className="fllm-exchange-header">
        <div>
          <span>FLLM Exchange</span>
          <h2 id={`exchange-${props.listingRef}`}>Confidential Bid / Ask Exchange</h2>
          <p>Submit a confidential buyer bid. Buyer bids, bid counts, and bid/ask spreads are not displayed publicly. The seller can accept or counter through a secure FLLM link.</p>
        </div>
        <div className="fllm-exchange-badge">PRICE DISCOVERY</div>
      </div>

      <div className="fllm-exchange-tape" role="group" aria-label="Seller asking price">
        <div><span>SELLER ASK</span><strong>{props.askingPrice === null ? "Undisclosed" : money(props.askingPrice)}</strong></div>
      </div>

      {props.askingPrice !== null ? (
        <form className="fllm-exchange-form" onSubmit={submit}>
          <div className="fllm-exchange-form-heading"><strong>Place a Bid</strong><span>Listing {props.listingRef}</span></div>
          <label><span>Buyer Name *</span><input name="name" required autoComplete="name" /></label>
          <label><span>Email *</span><input name="email" type="email" required autoComplete="email" /></label>
          <label><span>Phone *</span><input name="phone" type="tel" required autoComplete="tel" /></label>
          <label><span>Bid Price *</span><input name="price" inputMode="numeric" placeholder="$500,000" required /></label>
          <label className="fllm-exchange-ack"><input name="acknowledgment" type="checkbox" required /><span>I understand this bid and any FLLM price match are non-binding until final transaction terms are separately accepted.</span></label>
          <button type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Submitting Bid…" : "Submit Buyer Bid"}</button>
          {message && <p className={`fllm-exchange-status ${status}`} role="status">{message}</p>}
        </form>
      ) : (
        <p className="fllm-exchange-unavailable">Exchange bidding will open when the seller publishes an asking price.</p>
      )}

      <p className="fllm-exchange-legal">FLLM Exchange is a confidential negotiation and price-discovery feature. Buyer bids, counters, acceptances and price matches are not displayed publicly and do not themselves create a binding purchase agreement or guarantee DBPR transfer approval.</p>
    </section>
  );
}
