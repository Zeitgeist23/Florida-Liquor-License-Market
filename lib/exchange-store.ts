import "server-only";

import { createHash, randomBytes } from "node:crypto";

import { supabaseServiceSettings } from "@/lib/supabase-settings";

export type ExchangeOrder = {
  id: string;
  listingRef: string;
  side: "bid" | "ask";
  actorRole: "buyer" | "seller";
  actorName: string;
  actorEmail: string;
  actorPhone: string | null;
  price: number;
  status: "active" | "superseded" | "accepted" | "matched" | "withdrawn";
  parentOrderId: string | null;
  createdAt: string;
};

export type ExchangeMarket = {
  bestBid: number | null;
  bidCount: number;
  latestBidAt: string | null;
};

type Row = {
  id: string;
  listing_ref: string;
  side: ExchangeOrder["side"];
  actor_role: ExchangeOrder["actorRole"];
  actor_name: string;
  actor_email: string;
  actor_phone: string | null;
  price: number;
  status: ExchangeOrder["status"];
  parent_order_id: string | null;
  created_at: string;
};

function settings() {
  return supabaseServiceSettings("FLLM Exchange requires the configured Supabase service account.");
}

function headers(prefer?: string): HeadersInit {
  const { key } = settings();
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...(prefer ? { Prefer: prefer } : {}),
  };
}

function url(path: string) {
  return `${settings().url}/rest/v1/${path}`;
}

function toOrder(row: Row): ExchangeOrder {
  return {
    id: row.id,
    listingRef: row.listing_ref,
    side: row.side,
    actorRole: row.actor_role,
    actorName: row.actor_name,
    actorEmail: row.actor_email,
    actorPhone: row.actor_phone,
    price: Number(row.price),
    status: row.status,
    parentOrderId: row.parent_order_id,
    createdAt: row.created_at,
  };
}

function clean(value: string, max: number) {
  return value.trim().replace(/\s+/g, " ").slice(0, max);
}

export function exchangeAvailableError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return /exchange_orders|PGRST205|schema cache/i.test(message);
}

export async function getExchangeMarket(listingRef: string): Promise<ExchangeMarket> {
  const ref = clean(listingRef, 100).toUpperCase();
  try {
    const response = await fetch(
      url(`exchange_orders?listing_ref=eq.${encodeURIComponent(ref)}&side=eq.bid&status=eq.active&select=price,created_at&order=price.desc,created_at.asc`),
      { headers: headers(), cache: "no-store" },
    );
    if (!response.ok) throw new Error(`Exchange market read failed: ${response.status} ${await response.text()}`);
    const rows = (await response.json()) as Array<{ price: number; created_at: string }>;
    return {
      bestBid: rows[0] ? Number(rows[0].price) : null,
      bidCount: rows.length,
      latestBidAt: rows.length ? rows.reduce((latest, row) => row.created_at > latest ? row.created_at : latest, rows[0].created_at) : null,
    };
  } catch (error) {
    if (exchangeAvailableError(error)) return { bestBid: null, bidCount: 0, latestBidAt: null };
    throw error;
  }
}

export async function createExchangeOrder(input: {
  listingRef: string;
  side: "bid" | "ask";
  actorRole: "buyer" | "seller";
  actorName: string;
  actorEmail: string;
  actorPhone?: string | null;
  price: number;
  parentOrderId?: string | null;
}) {
  const listingRef = clean(input.listingRef, 100).toUpperCase();
  const actorName = clean(input.actorName, 160);
  const actorEmail = clean(input.actorEmail, 254).toLowerCase();
  const actorPhone = clean(input.actorPhone || "", 60) || null;
  const price = Math.round(input.price);
  if (!/^FLLM-[A-Z0-9-]+$/.test(listingRef)) throw new Error("Invalid FLLM listing reference.");
  if (!actorName || !/^\S+@\S+\.\S+$/.test(actorEmail)) throw new Error("Valid name and email are required.");
  if (!Number.isFinite(price) || price < 1000 || price > 100_000_000) throw new Error("Enter a valid offer price.");

  const response = await fetch(url("exchange_orders"), {
    method: "POST",
    headers: headers("return=representation"),
    body: JSON.stringify({
      listing_ref: listingRef,
      side: input.side,
      actor_role: input.actorRole,
      actor_name: actorName,
      actor_email: actorEmail,
      actor_phone: actorPhone,
      price,
      status: "active",
      parent_order_id: input.parentOrderId || null,
    }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Could not save exchange order: ${response.status} ${await response.text()}`);
  const rows = (await response.json()) as Row[];
  if (!rows[0]) throw new Error("Exchange order was not returned.");
  return toOrder(rows[0]);
}

export async function getExchangeOrder(id: string) {
  const response = await fetch(url(`exchange_orders?id=eq.${encodeURIComponent(id)}&select=*&limit=1`), {
    headers: headers(),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Exchange order read failed: ${response.status}`);
  const rows = (await response.json()) as Row[];
  return rows[0] ? toOrder(rows[0]) : null;
}

export async function markOrder(id: string, status: ExchangeOrder["status"]) {
  const response = await fetch(url(`exchange_orders?id=eq.${encodeURIComponent(id)}`), {
    method: "PATCH",
    headers: headers("return=minimal"),
    body: JSON.stringify({ status, updated_at: new Date().toISOString() }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Exchange order update failed: ${response.status}`);
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function issueExchangeToken(input: {
  listingRef: string;
  orderId: string;
  actorRole: "buyer" | "seller";
  actorEmail: string;
  hours?: number;
}) {
  const token = randomBytes(32).toString("base64url");
  const expires = new Date(Date.now() + (input.hours ?? 72) * 60 * 60 * 1000).toISOString();
  const response = await fetch(url("exchange_access_tokens"), {
    method: "POST",
    headers: headers("return=minimal"),
    body: JSON.stringify({
      token_hash: hashToken(token),
      listing_ref: input.listingRef.toUpperCase(),
      order_id: input.orderId,
      actor_role: input.actorRole,
      actor_email: input.actorEmail.toLowerCase(),
      expires_at: expires,
    }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Could not create exchange access link: ${response.status} ${await response.text()}`);
  return token;
}

export async function verifyExchangeToken(token: string, role?: "buyer" | "seller") {
  const clauses = [
    `token_hash=eq.${encodeURIComponent(hashToken(token))}`,
    `expires_at=gt.${encodeURIComponent(new Date().toISOString())}`,
    "select=id,listing_ref,order_id,actor_role,actor_email,expires_at",
    "limit=1",
  ];
  if (role) clauses.splice(1, 0, `actor_role=eq.${role}`);
  const response = await fetch(url(`exchange_access_tokens?${clauses.join("&")}`), {
    headers: headers(),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Exchange access verification failed: ${response.status}`);
  const rows = await response.json() as Array<{ id: string; listing_ref: string; order_id: string; actor_role: "buyer"|"seller"; actor_email: string }>;
  return rows[0] || null;
}

export async function createMatchedTransaction(input: {
  listingRef: string;
  buyerOrderId: string;
  sellerOrderId?: string | null;
  price: number;
  buyerEmail: string;
  sellerEmail: string;
}) {
  const transactionRef = `FLLM-TX-${new Date().toISOString().slice(0,10).replaceAll("-","")}-${randomBytes(4).toString("hex").toUpperCase()}`;
  const response = await fetch(url("exchange_transactions"), {
    method: "POST",
    headers: headers("return=representation"),
    body: JSON.stringify({
      transaction_ref: transactionRef,
      listing_ref: input.listingRef.toUpperCase(),
      buyer_order_id: input.buyerOrderId,
      seller_order_id: input.sellerOrderId || null,
      matched_price: Math.round(input.price),
      status: "price_matched",
      buyer_email: input.buyerEmail.toLowerCase(),
      seller_email: input.sellerEmail.toLowerCase(),
    }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Could not open transaction room: ${response.status} ${await response.text()}`);
  const rows = await response.json() as Array<{ transaction_ref: string }>;
  return rows[0]?.transaction_ref || transactionRef;
}
