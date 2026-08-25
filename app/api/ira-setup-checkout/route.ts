import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const servicePath = "/self-directed-ira-liquor-license-lending";

function siteUrl(requestUrl: string) {
  const configured = process.env.NEXT_PUBLIC_SITE_URL || process.env.FLLM_SITE_URL;
  if (configured) return configured.replace(/\/$/, "");
  return new URL(requestUrl).origin;
}

function returnToService(requestUrl: string, status: "cancelled" | "unavailable") {
  const url = new URL(servicePath, requestUrl);
  url.searchParams.set("payment", status);
  url.hash = "ira-setup-assistance";
  return NextResponse.redirect(url, 303);
}

export async function POST(request: Request) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecret) {
    console.error("IRA setup checkout is unavailable because STRIPE_SECRET_KEY is not configured.");
    return returnToService(request.url, "unavailable");
  }

  const origin = siteUrl(request.url);
  const params = new URLSearchParams();
  params.set("mode", "payment");
  params.set("submit_type", "pay");
  params.set("customer_creation", "always");
  params.set("billing_address_collection", "auto");
  params.set("phone_number_collection[enabled]", "true");
  params.set(
    "success_url",
    `${origin}${servicePath}/setup-assistance/success?session_id={CHECKOUT_SESSION_ID}`,
  );
  params.set(
    "cancel_url",
    `${origin}${servicePath}?payment=cancelled#ira-setup-assistance`,
  );
  params.set("metadata[product_type]", "ira_setup_assistance");
  params.set("metadata[service]", "Self-Directed IRA Setup Assistance");
  params.set("payment_intent_data[metadata][product_type]", "ira_setup_assistance");
  params.set("line_items[0][price_data][currency]", "usd");
  params.set("line_items[0][price_data][unit_amount]", "49500");
  params.set(
    "line_items[0][price_data][product_data][name]",
    "Self-Directed IRA Setup Assistance",
  );
  params.set(
    "line_items[0][price_data][product_data][description]",
    "One-time administrative setup and transfer-coordination assistance.",
  );
  params.set("line_items[0][quantity]", "1");

  try {
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
      id?: string;
      url?: string;
      error?: { message?: string };
    };

    if (!response.ok || !payload.id || !payload.url) {
      throw new Error(
        payload.error?.message || `Stripe checkout failed with status ${response.status}.`,
      );
    }

    return NextResponse.redirect(payload.url, 303);
  } catch (error) {
    console.error("IRA setup Stripe checkout failed", error);
    return returnToService(request.url, "unavailable");
  }
}
