import { NextResponse } from "next/server";

import { sendFllmEmail } from "@/lib/fllm-email";
import {
  createExchangeOrder,
  createMatchedTransaction,
  getExchangeMarket,
  issueExchangeToken,
  markOrder,
} from "@/lib/exchange-store";
import { getApprovedSubmissionByPublicRef } from "@/lib/listing-submission-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const EXCHANGE_EMAIL = "exchange@floridaliquorlicensemarket.com";

function text(value: unknown, max = 500) {
  return String(value ?? "").trim().replace(/\s+/g, " ").slice(0, max);
}

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || process.env.FLLM_SITE_URL || "https://www.floridaliquorlicensemarket.com").replace(/\/$/, "");
}

function shell(content: string) {
  return `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#071a3a;padding:24px"><div style="max-width:680px;margin:auto;border-top:5px solid #d99b13;padding:22px;border-left:1px solid #ddd;border-right:1px solid #ddd;border-bottom:1px solid #ddd">${content}</div></body></html>`;
}

function exchangeNotice() {
  return `<p style="margin-top:20px;padding:12px 14px;background:#f6f8fa;border:1px solid #dfe5ea;font-size:12px;color:#5b6670"><strong>Keep negotiations inside FLLM Exchange.</strong> Do not send price changes or transaction terms by replying to this email. Use the secure FLLM Exchange link above so bids, counters, acceptances and timestamps remain recorded with the transaction.</p>`;
}

export async function POST(request: Request) {
  try {
    const payload = await request.json() as Record<string, unknown>;
    const listingRef = text(payload.listingRef, 100).toUpperCase();
    const buyerName = text(payload.name, 160);
    const buyerEmail = text(payload.email, 254).toLowerCase();
    const buyerPhone = text(payload.phone, 60);
    const price = Math.round(Number(payload.price));
    const acknowledgment = payload.acknowledgment === true;

    if (!acknowledgment) return NextResponse.json({ error: "Please acknowledge that the bid is non-binding until final transaction terms are accepted." }, { status: 400 });
    if (!buyerName || !/^\S+@\S+\.\S+$/.test(buyerEmail) || !buyerPhone || !Number.isFinite(price)) {
      return NextResponse.json({ error: "Name, email, phone and a valid bid are required." }, { status: 400 });
    }

    const seller = await getApprovedSubmissionByPublicRef(listingRef);
    if (!seller || !seller.approvedLicenseType || !seller.email) {
      return NextResponse.json({ error: "This listing is not currently enabled for direct FLLM Exchange bidding." }, { status: 404 });
    }
    const ask = seller.approvedAskingPrice ?? seller.askingPrice;
    if (ask === null) return NextResponse.json({ error: "The seller has not published an asking price for this listing." }, { status: 409 });

    const order = await createExchangeOrder({
      listingRef,
      side: "bid",
      actorRole: "buyer",
      actorName: buyerName,
      actorEmail: buyerEmail,
      actorPhone: buyerPhone,
      price,
    });

    const buyerToken = await issueExchangeToken({ listingRef, orderId: order.id, actorRole: "buyer", actorEmail: buyerEmail });
    const sellerToken = await issueExchangeToken({ listingRef, orderId: order.id, actorRole: "seller", actorEmail: seller.email });
    const matched = price >= ask;
    let transactionRef: string | null = null;

    if (matched) {
      await markOrder(order.id, "matched");
      transactionRef = await createMatchedTransaction({
        listingRef,
        buyerOrderId: order.id,
        price: ask,
        buyerEmail,
        sellerEmail: seller.email,
      });
    }

    const sellerReviewUrl = `${siteUrl()}/exchange/respond?token=${encodeURIComponent(sellerToken)}`;
    const buyerStatusUrl = `${siteUrl()}/exchange/respond?token=${encodeURIComponent(buyerToken)}`;
    const roomUrl = transactionRef ? `${siteUrl()}/exchange/transactions/${encodeURIComponent(transactionRef)}` : null;

    const sellerSubject = matched
      ? `FLLM Exchange Price Match — ${listingRef} — ${money(ask)}`
      : `New FLLM Exchange Bid — ${listingRef} — ${money(price)}`;
    const sellerActionUrl = matched ? roomUrl : sellerReviewUrl;
    await sendFllmEmail({
      to: seller.email,
      replyTo: EXCHANGE_EMAIL,
      subject: sellerSubject,
      text: `${buyerName} submitted a ${money(price)} bid for ${listingRef}. Seller ask: ${money(ask)}. ${matched ? `The bid meets or exceeds the ask. A non-binding price match has been recorded at ${money(ask)}. Open the FLLM Transaction Room: ${roomUrl}` : `Review, accept, or counter securely in FLLM Exchange: ${sellerReviewUrl}`} Do not negotiate by email reply; use the secure FLLM Exchange link so activity remains recorded.`,
      html: shell(`<h1 style="font-size:24px">${matched ? "Price Match Reached" : "New Buyer Bid"}</h1><p><strong>Listing:</strong> ${listingRef}<br><strong>Seller Ask:</strong> ${money(ask)}<br><strong>Buyer Bid:</strong> ${money(price)}<br><strong>Buyer:</strong> ${buyerName}</p><p><a href="${sellerActionUrl}">${matched ? "Open FLLM Transaction Room" : "Review / Accept / Counter Bid"} →</a></p><p style="font-size:12px;color:#5b6670">A price match is not a binding purchase agreement. Closing, contingencies, regulatory approval, due diligence and other material terms remain to be agreed.</p>${exchangeNotice()}`),
    });

    await sendFllmEmail({
      to: buyerEmail,
      replyTo: EXCHANGE_EMAIL,
      subject: matched ? `FLLM Exchange Price Match — ${listingRef}` : `Your FLLM Exchange Bid — ${listingRef}`,
      text: matched
        ? `Your ${money(price)} bid meets the seller's ${money(ask)} ask. FLLM recorded a non-binding price match at ${money(ask)}. Open the FLLM Transaction Room: ${roomUrl}. Do not negotiate by email reply; use FLLM Exchange so activity remains recorded.`
        : `Your ${money(price)} bid for ${listingRef} has been recorded. Seller ask: ${money(ask)}. View bid status: ${buyerStatusUrl}. Do not negotiate by email reply; use FLLM Exchange so activity remains recorded.`,
      html: shell(`<h1 style="font-size:24px">${matched ? "Price Match Reached" : "Bid Recorded"}</h1><p><strong>Listing:</strong> ${listingRef}<br><strong>Seller Ask:</strong> ${money(ask)}<br><strong>Your Bid:</strong> ${money(price)}</p>${matched ? `<p><strong>FLLM recorded a non-binding price match at ${money(ask)}.</strong></p><p><a href="${roomUrl}">Open FLLM Transaction Room →</a></p>` : `<p>The seller can now accept or counter your bid.</p><p><a href="${buyerStatusUrl}">View Bid Status →</a></p>`}<p style="font-size:12px;color:#5b6670">A price match or accepted bid is not a binding purchase agreement until final transaction terms are separately accepted by the parties.</p>${exchangeNotice()}`),
    });

    const internal = process.env.BUYER_LEAD_REVIEW_EMAIL || process.env.FLLM_CONTACT_INQUIRY_EMAIL || process.env.GOOGLE_SENDER_EMAIL || "listings@floridaliquorlicensemarket.com";
    try {
      await sendFllmEmail({
        to: internal,
        replyTo: EXCHANGE_EMAIL,
        subject: `FLLM Exchange ${matched ? "Price Match" : "Bid"} — ${listingRef} — ${money(price)}`,
        text: `Listing ${listingRef}\nAsk: ${money(ask)}\nBid: ${money(price)}\nBuyer: ${buyerName}\nEmail: ${buyerEmail}\nPhone: ${buyerPhone}\nMatched: ${matched ? "Yes" : "No"}`,
        html: shell(`<h2>FLLM Exchange ${matched ? "Price Match" : "Bid"}</h2><p>${listingRef}<br>Ask: ${money(ask)}<br>Bid: ${money(price)}<br>${buyerName}<br>${buyerEmail}<br>${buyerPhone}</p>`),
      });
    } catch (error) {
      console.error("Exchange internal notification failed", error);
    }

    const market = await getExchangeMarket(listingRef);
    return NextResponse.json({ ok: true, matched, transactionRef, bestBid: market.bestBid, bidCount: market.bidCount });
  } catch (error) {
    console.error("FLLM Exchange bid failed", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to submit bid." }, { status: 500 });
  }
}
