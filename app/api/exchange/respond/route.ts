import { NextResponse } from "next/server";

import { sendFllmEmail } from "@/lib/fllm-email";
import {
  createExchangeOrder,
  createMatchedTransaction,
  getExchangeOrder,
  issueExchangeToken,
  markOrder,
  verifyExchangeToken,
} from "@/lib/exchange-store";
import { getApprovedSubmissionByPublicRef } from "@/lib/listing-submission-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const EXCHANGE_EMAIL = "exchange@floridaliquorlicensemarket.com";

function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || process.env.FLLM_SITE_URL || "https://www.floridaliquorlicensemarket.com").replace(/\/$/, "");
}
function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}
function shell(content: string) {
  return `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#071a3a;padding:24px"><div style="max-width:680px;margin:auto;border-top:5px solid #d99b13;padding:22px;border:1px solid #ddd">${content}</div></body></html>`;
}
function exchangeNotice() {
  return `<p style="margin-top:20px;padding:12px 14px;background:#f6f8fa;border:1px solid #dfe5ea;font-size:12px;color:#5b6670"><strong>Keep negotiations inside FLLM Exchange.</strong> Do not send price changes or transaction terms by replying to this email. Use the secure FLLM Exchange link above so bids, counters, acceptances and timestamps remain recorded with the transaction.</p>`;
}

export async function POST(request: Request) {
  try {
    const payload = await request.json() as { token?: string; action?: string; counterPrice?: number };
    const token = String(payload.token || "");
    const access = await verifyExchangeToken(token, "seller");
    if (!access) return NextResponse.json({ error: "This seller access link is invalid or expired." }, { status: 401 });

    const bid = await getExchangeOrder(access.order_id);
    if (!bid || bid.side !== "bid") return NextResponse.json({ error: "The referenced buyer bid is unavailable." }, { status: 404 });
    const seller = await getApprovedSubmissionByPublicRef(access.listing_ref);
    if (!seller || seller.email.toLowerCase() !== access.actor_email.toLowerCase()) {
      return NextResponse.json({ error: "Seller authorization could not be verified." }, { status: 403 });
    }

    if (payload.action === "accept") {
      await markOrder(bid.id, "accepted");
      const sellerOrder = await createExchangeOrder({
        listingRef: bid.listingRef,
        side: "ask",
        actorRole: "seller",
        actorName: seller.fullName,
        actorEmail: seller.email,
        actorPhone: seller.phone,
        price: bid.price,
        parentOrderId: bid.id,
      });
      await markOrder(sellerOrder.id, "matched");
      const tx = await createMatchedTransaction({
        listingRef: bid.listingRef,
        buyerOrderId: bid.id,
        sellerOrderId: sellerOrder.id,
        price: bid.price,
        buyerEmail: bid.actorEmail,
        sellerEmail: seller.email,
      });
      const room = `${siteUrl()}/exchange/transactions/${encodeURIComponent(tx)}`;
      await sendFllmEmail({
        to: bid.actorEmail,
        replyTo: EXCHANGE_EMAIL,
        subject: `FLLM Exchange — Seller Accepted ${money(bid.price)} — ${bid.listingRef}`,
        text: `The seller accepted your ${money(bid.price)} proposed price for ${bid.listingRef}. A non-binding price match has been recorded. Open the FLLM Transaction Room: ${room}. Do not negotiate by email reply; use FLLM Exchange so activity remains recorded.`,
        html: shell(`<h1>Price Match Reached</h1><p>The seller accepted your <strong>${money(bid.price)}</strong> proposed price for ${bid.listingRef}.</p><p><a href="${room}">Open FLLM Transaction Room →</a></p><p style="font-size:12px;color:#5b6670">This records agreement on proposed price only and is not a binding purchase contract.</p>${exchangeNotice()}`),
      });
      return NextResponse.json({ ok: true, matched: true, transactionRef: tx });
    }

    if (payload.action === "counter") {
      const counterPrice = Math.round(Number(payload.counterPrice));
      if (!Number.isFinite(counterPrice) || counterPrice < 1000 || counterPrice > 100_000_000) {
        return NextResponse.json({ error: "Enter a valid counteroffer amount." }, { status: 400 });
      }
      const sellerOrder = await createExchangeOrder({
        listingRef: bid.listingRef,
        side: "ask",
        actorRole: "seller",
        actorName: seller.fullName,
        actorEmail: seller.email,
        actorPhone: seller.phone,
        price: counterPrice,
        parentOrderId: bid.id,
      });
      const matched = bid.price >= counterPrice;
      let tx: string | null = null;
      if (matched) {
        await markOrder(bid.id, "matched");
        await markOrder(sellerOrder.id, "matched");
        tx = await createMatchedTransaction({
          listingRef: bid.listingRef,
          buyerOrderId: bid.id,
          sellerOrderId: sellerOrder.id,
          price: counterPrice,
          buyerEmail: bid.actorEmail,
          sellerEmail: seller.email,
        });
      }
      const buyerToken = await issueExchangeToken({ listingRef: bid.listingRef, orderId: sellerOrder.id, actorRole: "buyer", actorEmail: bid.actorEmail });
      const buyerLink = matched && tx
        ? `${siteUrl()}/exchange/transactions/${encodeURIComponent(tx)}`
        : `${siteUrl()}/exchange/respond?token=${encodeURIComponent(buyerToken)}`;
      await sendFllmEmail({
        to: bid.actorEmail,
        replyTo: EXCHANGE_EMAIL,
        subject: matched ? `FLLM Exchange Price Match — ${bid.listingRef}` : `Seller Counteroffer — ${bid.listingRef} — ${money(counterPrice)}`,
        text: matched
          ? `The seller countered at ${money(counterPrice)}, which is at or below your ${money(bid.price)} bid. FLLM recorded a non-binding price match at ${money(counterPrice)}. Open FLLM Exchange: ${buyerLink}. Do not negotiate by email reply; use FLLM Exchange so activity remains recorded.`
          : `The seller countered your ${money(bid.price)} bid at ${money(counterPrice)}. Review the counteroffer in FLLM Exchange: ${buyerLink}. Do not negotiate by email reply; use FLLM Exchange so activity remains recorded.`,
        html: shell(`<h1>${matched ? "Price Match Reached" : "Seller Counteroffer"}</h1><p><strong>Your Bid:</strong> ${money(bid.price)}<br><strong>Seller Counter:</strong> ${money(counterPrice)}</p><p><a href="${buyerLink}">${matched ? "Open Transaction Room" : "Review Counteroffer"} →</a></p><p style="font-size:12px;color:#5b6670">FLLM Exchange price indications are non-binding until final transaction terms are separately accepted.</p>${exchangeNotice()}`),
      });
      return NextResponse.json({ ok: true, matched, transactionRef: tx, counterPrice });
    }

    return NextResponse.json({ error: "Choose accept or counter." }, { status: 400 });
  } catch (error) {
    console.error("FLLM Exchange seller response failed", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to record seller response." }, { status: 500 });
  }
}
