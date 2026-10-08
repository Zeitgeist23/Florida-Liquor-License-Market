import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function siteUrl(requestUrl: string) {
  const configured = process.env.NEXT_PUBLIC_SITE_URL || process.env.FLLM_SITE_URL;
  if (configured) return configured.replace(/\/$/, "");
  return new URL(requestUrl).origin;
}

export async function GET(request: Request) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecret) {
    return NextResponse.redirect(new URL("/contact?payment=unavailable", request.url), 303);
  }

  const origin = siteUrl(request.url);
  const params = new URLSearchParams();
  params.set("mode", "payment");
  params.set("submit_type", "pay");
  params.set("customer_creation", "always");
  params.set("billing_address_collection", "auto");
  params.set(
    "success_url",
    `${origin}/?payment=the-view-hotel-deposit-received&session_id={CHECKOUT_SESSION_ID}`,
  );
  params.set(
    "cancel_url",
    `${origin}/?payment=the-view-hotel-deposit-cancelled`,
  );
  params.set("metadata[product_type]", "client_service_deposit");
  params.set("metadata[client_name]", "Burton Bullard");
  params.set("metadata[project]", "The View Hotel");
  params.set("metadata[total_fee]", "650.00");
  params.set("metadata[deposit]", "325.00");
  params.set("payment_intent_data[metadata][product_type]", "client_service_deposit");
  params.set("payment_intent_data[metadata][client_name]", "Burton Bullard");
  params.set("payment_intent_data[metadata][project]", "The View Hotel");
  params.set("line_items[0][price_data][currency]", "usd");
  params.set("line_items[0][price_data][unit_amount]", "32500");
  params.set(
    "line_items[0][price_data][product_data][name]",
    "The View Hotel Liquor License Application Deposit",
  );
  params.set(
    "line_items[0][price_data][product_data][description]",
    "Initial deposit toward the $650 flat fee for FLLM liquor-license application services. Remaining $325 due upon completion.",
  );
  params.set("line_items[0][quantity]", "1");

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${stripeSecret}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
    cache: "no-store",
  });

  const payload = (await response.json()) as {
    url?: string;
    error?: { message?: string };
  };

  if (!response.ok || !payload.url) {
    console.error("Burton deposit checkout failed", payload.error?.message);
    return NextResponse.redirect(new URL("/contact?payment=unavailable", request.url), 303);
  }

  return NextResponse.redirect(payload.url, 303);
}
