import Link from "next/link";

import ExchangeResponseClient from "@/components/ExchangeResponseClient";
import { getExchangeOrder, verifyExchangeToken } from "@/lib/exchange-store";

export const dynamic = "force-dynamic";

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export default async function ExchangeRespondPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token = "" } = await searchParams;
  const access = token ? await verifyExchangeToken(token) : null;
  const order = access?.order_id ? await getExchangeOrder(access.order_id) : null;

  if (!access || !order) {
    return (
      <main style={{ minHeight: "100vh", background: "#071a3a", color: "white", padding: "60px 20px" }}>
        <div style={{ maxWidth: 760, margin: "auto" }}>
          <h1>FLLM Exchange Link Unavailable</h1>
          <p>This secure exchange link is invalid or expired.</p>
          <Link href="/listings" style={{ color: "#e5ad32" }}>Return to listings →</Link>
        </div>
      </main>
    );
  }

  const sellerMode = access.actor_role === "seller" && order.side === "bid";
  return (
    <main style={{ minHeight: "100vh", background: "#071a3a", color: "white", padding: "44px 20px" }}>
      <div style={{ maxWidth: 820, margin: "auto" }}>
        <Link href="/" style={{ color: "#e5ad32", textDecoration: "none", fontWeight: 800 }}>FLORIDA LIQUOR LICENSE MARKET</Link>
        <div style={{ marginTop: 24, padding: 28, border: "1px solid #ba891d", borderRadius: 14, background: "#0b2540" }}>
          <div style={{ fontSize: 11, letterSpacing: ".12em", color: "#e5ad32", fontWeight: 900 }}>FLLM EXCHANGE</div>
          <h1 style={{ fontFamily: "Georgia,serif", fontSize: 34, margin: "8px 0 12px" }}>{sellerMode ? "Review Buyer Bid" : "Exchange Status"}</h1>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12, margin: "20px 0" }}>
            <div style={{ padding: 15, background: "#061524", borderRadius: 8 }}><span style={{ display: "block", fontSize: 10, color: "#aebbc6" }}>LISTING</span><strong>{order.listingRef}</strong></div>
            <div style={{ padding: 15, background: "#061524", borderRadius: 8 }}><span style={{ display: "block", fontSize: 10, color: "#aebbc6" }}>{order.side === "bid" ? "BUYER BID" : "SELLER COUNTER"}</span><strong style={{ fontSize: 22 }}>{money(order.price)}</strong></div>
            <div style={{ padding: 15, background: "#061524", borderRadius: 8 }}><span style={{ display: "block", fontSize: 10, color: "#aebbc6" }}>STATUS</span><strong>{order.status.replaceAll("_", " ").toUpperCase()}</strong></div>
          </div>

          {sellerMode ? (
            <ExchangeResponseClient token={token} bid={order.price} />
          ) : (
            <div>
              <p style={{ lineHeight: 1.7, color: "#d9e1e7" }}>
                {order.side === "ask"
                  ? `The seller countered at ${money(order.price)}. You may return to the listing and place a new bid at or above this amount to create a price match.`
                  : "Your bid has been recorded. The seller has a secure link to accept or counter."}
              </p>
              <Link href={`/listings/${order.listingRef.toLowerCase()}`} style={{ display: "inline-block", marginTop: 8, color: "#e5ad32", fontWeight: 800 }}>Return to listing →</Link>
            </div>
          )}
          <p style={{ marginTop: 24, fontSize: 12, lineHeight: 1.6, color: "#aebbc6" }}>FLLM Exchange records proposed pricing and negotiation status. An accepted bid, counteroffer or price match is not itself a binding purchase agreement. Final closing terms, contingencies, due diligence, DBPR approval and any definitive purchase agreement remain separate.</p>
        </div>
      </div>
    </main>
  );
}
