import { NextResponse } from "next/server";

import { recordBuyerInquiry } from "@/lib/buyer-inquiry-lead";
import { sendFllmEmail } from "@/lib/fllm-email";
import {
  createExchangeOrder,
  createMatchedTransaction,
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
    const firstName = text(payload.firstName, 80);
    const lastName = text(payload.lastName, 80);
    const buyerName = `${firstName} ${lastName}`.trim();
    const buyerEmail = text(payload.email, 254).toLowerCase();
    const buyerPhone = text(payload.phone, 60);
    const street = text(payload.street, 180);
    const city = text(payload.city, 100);
    const state = text(payload.state, 2).toUpperCase();
    const zip = text(payload.zip, 10);
    const price = Math.round(Number(payload.price));
    const downPayment = Math.round(Number(payload.downPayment));
    const fundsAvailable = Math.round(Number(payload.fundsAvailable));
    const purchaseMethod = text(payload.purchaseMethod, 120);
    const sellerFinancing = text(payload.sellerFinancing, 20);
    const sellerFinancingAmount = Math.max(0, Math.round(Number(payload.sellerFinancingAmount) || 0));
    const proofFunds = text(payload.proofFunds, 120);
    const intendedUse = text(payload.intendedUse, 160);
    const targetClosing = text(payload.targetClosing, 120);
    const accuracy = payload.accuracy === true;
    const acknowledgment = payload.acknowledgment === true;

    if (!accuracy) {
      return NextResponse.json({ error: "Please certify that the buyer and financial information is accurate." }, { status: 400 });
    }
    if (!acknowledgment) {
      return NextResponse.json({ error: "Please acknowledge that the bid is non-binding until final transaction terms are accepted." }, { status: 400 });
    }
    if (
      !firstName || !lastName || !/^\S+@\S+\.\S+$/.test(buyerEmail) || !buyerPhone ||
      !street || !city || !/^[A-Z]{2}$/.test(state) || !/^\d{5}(?:-\d{4})?$/.test(zip) ||
      !Number.isFinite(price) || price <= 0 || !Number.isFinite(downPayment) || downPayment < 0 ||
      !Number.isFinite(fundsAvailable) || fundsAvailable < 0 || !purchaseMethod || !sellerFinancing ||
      !proofFunds || !intendedUse || !targetClosing
    ) {
      return NextResponse.json({ error: "Complete all required buyer identity, address, financial qualification, and bid fields before submitting." }, { status: 400 });
    }
    if (sellerFinancing === "Yes" && sellerFinancingAmount <= 0) {
      return NextResponse.json({ error: "Enter the requested seller-financing amount." }, { status: 400 });
    }

    const seller = await getApprovedSubmissionByPublicRef(listingRef);
    if (!seller || !seller.approvedLicenseType || !seller.email) {
      return NextResponse.json({ error: "This listing is not currently enabled for direct FLLM Exchange bidding." }, { status: 404 });
    }
    const ask = seller.approvedAskingPrice ?? seller.askingPrice;
    if (ask === null) return NextResponse.json({ error: "The seller has not published an asking price for this listing." }, { status: 409 });

    const leadDetails = [
      `Exchange bid for ${listingRef}`,
      `Buyer: ${buyerName}`,
      `Address: ${street}, ${city}, ${state} ${zip}`,
      `Bid: ${money(price)}`,
      `Proposed down payment: ${money(downPayment)}`,
      `Funds available for purchase: ${money(fundsAvailable)}`,
      `Purchase method: ${purchaseMethod}`,
      `Seller financing requested: ${sellerFinancing}`,
      `Seller financing amount: ${sellerFinancing === "Yes" ? money(sellerFinancingAmount) : "None"}`,
      `Proof of funds: ${proofFunds}`,
      `Intended use: ${intendedUse}`,
      `Target closing: ${targetClosing}`,
      "Buyer certified the information as accurate and consented to FLLM retaining it as a marketplace buyer lead.",
    ].join(" | ");

    const buyerLeadRef = await recordBuyerInquiry({
      buyerName,
      buyerEmail,
      buyerPhone,
      inquiryType: "FLLM Exchange qualified bid",
      message: leadDetails,
      submission: seller,
    });

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
    const sellerQualification = `Buyer qualification: ${money(fundsAvailable)} funds available; ${money(downPayment)} proposed down payment; ${purchaseMethod}; seller financing ${sellerFinancing.toLowerCase()}${sellerFinancing === "Yes" ? ` (${money(sellerFinancingAmount)})` : ""}; proof of funds ${proofFunds.toLowerCase()}; target closing ${targetClosing}.`;

    const sellerSubject = matched
      ? `FLLM Exchange Price Match — ${listingRef} — ${money(ask)}`
      : `New FLLM Exchange Bid — ${listingRef} — ${money(price)}`;
    const sellerActionUrl = matched ? roomUrl : sellerReviewUrl;
    await sendFllmEmail({
      to: seller.email,
      replyTo: EXCHANGE_EMAIL,
      subject: sellerSubject,
      text: `${buyerName} submitted a ${money(price)} qualified bid for ${listingRef}. Seller ask: ${money(ask)}. ${sellerQualification} ${matched ? `The bid meets or exceeds the ask. A non-binding price match has been recorded at ${money(ask)}. Open the FLLM Transaction Room: ${roomUrl}` : `Review, accept, or counter securely in FLLM Exchange: ${sellerReviewUrl}`} Do not negotiate by email reply; use the secure FLLM Exchange link so activity remains recorded.`,
      html: shell(`<h1 style="font-size:24px">${matched ? "Price Match Reached" : "New Qualified Buyer Bid"}</h1><p><strong>Listing:</strong> ${listingRef}<br><strong>Seller Ask:</strong> ${money(ask)}<br><strong>Buyer Bid:</strong> ${money(price)}<br><strong>Buyer:</strong> ${buyerName}<br><strong>Funds Available:</strong> ${money(fundsAvailable)}<br><strong>Proposed Down Payment:</strong> ${money(downPayment)}<br><strong>Purchase Method:</strong> ${purchaseMethod}<br><strong>Seller Financing:</strong> ${sellerFinancing}${sellerFinancing === "Yes" ? ` — ${money(sellerFinancingAmount)}` : ""}<br><strong>Proof of Funds:</strong> ${proofFunds}<br><strong>Target Closing:</strong> ${targetClosing}</p><p><a href="${sellerActionUrl}">${matched ? "Open FLLM Transaction Room" : "Review / Accept / Counter Bid"} →</a></p><p style="font-size:12px;color:#5b6670">A price match is not a binding purchase agreement. Closing, contingencies, regulatory approval, due diligence and other material terms remain to be agreed.</p>${exchangeNotice()}`),
    });

    await sendFllmEmail({
      to: buyerEmail,
      replyTo: EXCHANGE_EMAIL,
      subject: matched ? `FLLM Exchange Price Match — ${listingRef}` : `Your FLLM Exchange Bid — ${listingRef}`,
      text: matched
        ? `Your ${money(price)} bid meets the seller's ${money(ask)} ask. FLLM recorded a non-binding price match at ${money(ask)}. Buyer lead ${buyerLeadRef}. Open the FLLM Transaction Room: ${roomUrl}. Do not negotiate by email reply; use FLLM Exchange so activity remains recorded.`
        : `Your ${money(price)} bid for ${listingRef} has been recorded. Buyer lead ${buyerLeadRef}. Seller ask: ${money(ask)}. View bid status: ${buyerStatusUrl}. Do not negotiate by email reply; use FLLM Exchange so activity remains recorded.`,
      html: shell(`<h1 style="font-size:24px">${matched ? "Price Match Reached" : "Qualified Bid Recorded"}</h1><p><strong>Listing:</strong> ${listingRef}<br><strong>Seller Ask:</strong> ${money(ask)}<br><strong>Your Bid:</strong> ${money(price)}<br><strong>FLLM Buyer Lead:</strong> ${buyerLeadRef}</p>${matched ? `<p><strong>FLLM recorded a non-binding price match at ${money(ask)}.</strong></p><p><a href="${roomUrl}">Open FLLM Transaction Room →</a></p>` : `<p>The seller can now accept or counter your bid.</p><p><a href="${buyerStatusUrl}">View Bid Status →</a></p>`}<p style="font-size:12px;color:#5b6670">A price match or accepted bid is not a binding purchase agreement until final transaction terms are separately accepted by the parties.</p>${exchangeNotice()}`),
    });

    const internal = process.env.BUYER_LEAD_REVIEW_EMAIL || process.env.FLLM_CONTACT_INQUIRY_EMAIL || process.env.GOOGLE_SENDER_EMAIL || "listings@floridaliquorlicensemarket.com";
    try {
      await sendFllmEmail({
        to: internal,
        replyTo: EXCHANGE_EMAIL,
        subject: `FLLM Exchange Qualified ${matched ? "Price Match" : "Bid"} — ${listingRef} — ${money(price)}`,
        text: `Buyer Lead: ${buyerLeadRef}\nListing: ${listingRef}\nAsk: ${money(ask)}\nBid: ${money(price)}\nBuyer: ${buyerName}\nEmail: ${buyerEmail}\nPhone: ${buyerPhone}\nAddress: ${street}, ${city}, ${state} ${zip}\nDown Payment: ${money(downPayment)}\nFunds Available: ${money(fundsAvailable)}\nPurchase Method: ${purchaseMethod}\nSeller Financing: ${sellerFinancing}${sellerFinancing === "Yes" ? ` — ${money(sellerFinancingAmount)}` : ""}\nProof of Funds: ${proofFunds}\nIntended Use: ${intendedUse}\nTarget Closing: ${targetClosing}\nMatched: ${matched ? "Yes" : "No"}`,
        html: shell(`<h2>FLLM Exchange Qualified ${matched ? "Price Match" : "Bid"}</h2><p><strong>Buyer Lead:</strong> ${buyerLeadRef}<br><strong>Listing:</strong> ${listingRef}<br><strong>Ask:</strong> ${money(ask)}<br><strong>Bid:</strong> ${money(price)}<br><strong>Buyer:</strong> ${buyerName}<br><strong>Email:</strong> ${buyerEmail}<br><strong>Phone:</strong> ${buyerPhone}<br><strong>Address:</strong> ${street}, ${city}, ${state} ${zip}<br><strong>Down Payment:</strong> ${money(downPayment)}<br><strong>Funds Available:</strong> ${money(fundsAvailable)}<br><strong>Purchase Method:</strong> ${purchaseMethod}<br><strong>Seller Financing:</strong> ${sellerFinancing}${sellerFinancing === "Yes" ? ` — ${money(sellerFinancingAmount)}` : ""}<br><strong>Proof of Funds:</strong> ${proofFunds}<br><strong>Intended Use:</strong> ${intendedUse}<br><strong>Target Closing:</strong> ${targetClosing}</p>`),
      });
    } catch (error) {
      console.error("Exchange internal notification failed", error);
    }

    return NextResponse.json({ ok: true, matched, transactionRef, buyerLeadRef });
  } catch (error) {
    console.error("FLLM Exchange bid failed", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to submit bid." }, { status: 500 });
  }
}
