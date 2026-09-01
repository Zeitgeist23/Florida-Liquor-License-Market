import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { sendFllmEmail } from "@/lib/fllm-email";
import {
  createExchangeOrder,
  createMatchedTransaction,
  issueExchangeToken,
  markOrder,
  verifyExchangeToken,
} from "@/lib/exchange-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const EXCHANGE_EMAIL = "exchange@floridaliquorlicensemarket.com";
const TEST_RECIPIENT = process.env.FLLM_EXCHANGE_TEST_EMAIL || "jwigg023@gmail.com";

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || process.env.FLLM_SITE_URL || "https://www.floridaliquorlicensemarket.com").replace(/\/$/, "");
}

function shell(content: string) {
  return `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#071a3a;padding:24px"><div style="max-width:680px;margin:auto;border-top:5px solid #d99b13;padding:22px;border-left:1px solid #ddd;border-right:1px solid #ddd;border-bottom:1px solid #ddd"><div style="margin-bottom:18px;padding:10px 12px;background:#fff6d8;border:1px solid #e2b341;font-weight:700">INTERNAL FLLM EXCHANGE TEST — NO LIVE SELLER CONTACTED</div>${content}</div></body></html>`;
}

function testRef() {
  return `FLLM-INTERNAL-TEST-${Date.now()}`;
}

async function runBelowAskBid() {
  const listingRef = testRef();
  const ask = 550_000;
  const bid = 500_000;

  const order = await createExchangeOrder({
    listingRef,
    side: "bid",
    actorRole: "buyer",
    actorName: "Internal Test Buyer",
    actorEmail: TEST_RECIPIENT,
    actorPhone: "000-000-0000",
    price: bid,
  });

  const buyerToken = await issueExchangeToken({
    listingRef,
    orderId: order.id,
    actorRole: "buyer",
    actorEmail: TEST_RECIPIENT,
  });
  const sellerToken = await issueExchangeToken({
    listingRef,
    orderId: order.id,
    actorRole: "seller",
    actorEmail: TEST_RECIPIENT,
  });

  const buyerAccess = await verifyExchangeToken(buyerToken, "buyer");
  const sellerAccess = await verifyExchangeToken(sellerToken, "seller");
  if (!buyerAccess || !sellerAccess) throw new Error("Internal Exchange token verification failed.");

  const sellerReviewUrl = `${siteUrl()}/exchange/respond?token=${encodeURIComponent(sellerToken)}`;
  const buyerStatusUrl = `${siteUrl()}/exchange/respond?token=${encodeURIComponent(buyerToken)}`;

  await sendFllmEmail({
    to: TEST_RECIPIENT,
    replyTo: EXCHANGE_EMAIL,
    subject: `[INTERNAL TEST] New FLLM Exchange Bid — ${listingRef} — ${money(bid)}`,
    text: `Internal Exchange test only. Synthetic listing ${listingRef}. Ask ${money(ask)}. Bid ${money(bid)}. Seller review link generated: ${sellerReviewUrl}. No live seller was contacted.`,
    html: shell(`<h1>New Buyer Bid</h1><p><strong>Synthetic Listing:</strong> ${listingRef}<br><strong>Seller Ask:</strong> ${money(ask)}<br><strong>Buyer Bid:</strong> ${money(bid)}</p><p>A secure seller review token was created successfully.</p>`),
  });

  await sendFllmEmail({
    to: TEST_RECIPIENT,
    replyTo: EXCHANGE_EMAIL,
    subject: `[INTERNAL TEST] Buyer Bid Confirmation — ${listingRef}`,
    text: `Internal Exchange test only. Bid ${money(bid)} recorded for ${listingRef}. Buyer status link generated: ${buyerStatusUrl}. No live seller was contacted.`,
    html: shell(`<h1>Bid Recorded</h1><p><strong>Synthetic Listing:</strong> ${listingRef}<br><strong>Ask:</strong> ${money(ask)}<br><strong>Bid:</strong> ${money(bid)}</p><p>A secure buyer status token was created successfully.</p>`),
  });

  await markOrder(order.id, "withdrawn");

  return {
    scenario: "below_ask_bid",
    listingRef,
    orderId: order.id,
    tokenVerification: true,
    sellerEmailSentTo: TEST_RECIPIENT,
    buyerEmailSentTo: TEST_RECIPIENT,
    liveSellerContacted: false,
  };
}

async function runCounter() {
  const listingRef = testRef();
  const bid = 500_000;
  const counter = 525_000;

  const buyerOrder = await createExchangeOrder({
    listingRef,
    side: "bid",
    actorRole: "buyer",
    actorName: "Internal Test Buyer",
    actorEmail: TEST_RECIPIENT,
    actorPhone: "000-000-0000",
    price: bid,
  });

  const sellerOrder = await createExchangeOrder({
    listingRef,
    side: "ask",
    actorRole: "seller",
    actorName: "Internal Test Seller",
    actorEmail: TEST_RECIPIENT,
    actorPhone: "000-000-0000",
    price: counter,
    parentOrderId: buyerOrder.id,
  });

  const buyerToken = await issueExchangeToken({
    listingRef,
    orderId: sellerOrder.id,
    actorRole: "buyer",
    actorEmail: TEST_RECIPIENT,
  });
  const buyerAccess = await verifyExchangeToken(buyerToken, "buyer");
  if (!buyerAccess) throw new Error("Internal counteroffer token verification failed.");

  const buyerLink = `${siteUrl()}/exchange/respond?token=${encodeURIComponent(buyerToken)}`;
  await sendFllmEmail({
    to: TEST_RECIPIENT,
    replyTo: EXCHANGE_EMAIL,
    subject: `[INTERNAL TEST] Seller Counteroffer — ${listingRef} — ${money(counter)}`,
    text: `Internal Exchange test only. Synthetic buyer bid ${money(bid)} and seller counter ${money(counter)} for ${listingRef}. Buyer review link generated: ${buyerLink}. No live seller or buyer was contacted.`,
    html: shell(`<h1>Seller Counteroffer</h1><p><strong>Synthetic Listing:</strong> ${listingRef}<br><strong>Buyer Bid:</strong> ${money(bid)}<br><strong>Seller Counter:</strong> ${money(counter)}</p><p>A secure buyer counteroffer token was created successfully.</p>`),
  });

  await markOrder(buyerOrder.id, "withdrawn");
  await markOrder(sellerOrder.id, "withdrawn");

  return {
    scenario: "seller_counter",
    listingRef,
    buyerOrderId: buyerOrder.id,
    sellerOrderId: sellerOrder.id,
    tokenVerification: true,
    emailSentTo: TEST_RECIPIENT,
    liveSellerContacted: false,
  };
}

async function runPriceMatch() {
  const listingRef = testRef();
  const ask = 550_000;
  const bid = 550_000;

  const buyerOrder = await createExchangeOrder({
    listingRef,
    side: "bid",
    actorRole: "buyer",
    actorName: "Internal Test Buyer",
    actorEmail: TEST_RECIPIENT,
    actorPhone: "000-000-0000",
    price: bid,
  });
  const sellerOrder = await createExchangeOrder({
    listingRef,
    side: "ask",
    actorRole: "seller",
    actorName: "Internal Test Seller",
    actorEmail: TEST_RECIPIENT,
    actorPhone: "000-000-0000",
    price: ask,
    parentOrderId: buyerOrder.id,
  });

  await markOrder(buyerOrder.id, "matched");
  await markOrder(sellerOrder.id, "matched");

  const transactionRef = await createMatchedTransaction({
    listingRef,
    buyerOrderId: buyerOrder.id,
    sellerOrderId: sellerOrder.id,
    price: ask,
    buyerEmail: TEST_RECIPIENT,
    sellerEmail: TEST_RECIPIENT,
  });

  const roomUrl = `${siteUrl()}/exchange/transactions/${encodeURIComponent(transactionRef)}`;

  await sendFllmEmail({
    to: TEST_RECIPIENT,
    replyTo: EXCHANGE_EMAIL,
    subject: `[INTERNAL TEST] FLLM Exchange Price Match — ${listingRef}`,
    text: `Internal Exchange test only. Synthetic bid and ask matched at ${money(ask)} for ${listingRef}. Transaction ${transactionRef} created. Room URL: ${roomUrl}. No live seller or buyer was contacted.`,
    html: shell(`<h1>Price Match Reached</h1><p><strong>Synthetic Listing:</strong> ${listingRef}<br><strong>Matched Price:</strong> ${money(ask)}<br><strong>Transaction:</strong> ${transactionRef}</p><p>The Exchange transaction record and room reference were created successfully.</p>`),
  });

  return {
    scenario: "price_match",
    listingRef,
    buyerOrderId: buyerOrder.id,
    sellerOrderId: sellerOrder.id,
    transactionRef,
    emailSentTo: TEST_RECIPIENT,
    liveSellerContacted: false,
  };
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = (await request.json().catch(() => ({}))) as { scenario?: string };
    const scenario = payload.scenario || "below_ask_bid";

    const result = scenario === "seller_counter"
      ? await runCounter()
      : scenario === "price_match"
        ? await runPriceMatch()
        : await runBelowAskBid();

    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error("FLLM Exchange internal test failed", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Exchange test failed." },
      { status: 500 },
    );
  }
}
