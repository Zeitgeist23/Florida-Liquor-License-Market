import "server-only";

import { supabaseServiceSettings } from "@/lib/supabase-settings";

export type ExchangeTransaction = {
  transactionRef: string;
  listingRef: string;
  matchedPrice: number;
  status: "price_matched" | "terms_pending" | "under_contract" | "cancelled" | "closed";
  createdAt: string;
};

export async function getExchangeTransaction(transactionRef: string): Promise<ExchangeTransaction | null> {
  const { url, key } = supabaseServiceSettings("FLLM Exchange requires the configured Supabase service account.");
  const ref = transactionRef.trim().toUpperCase();
  const response = await fetch(`${url}/rest/v1/exchange_transactions?transaction_ref=eq.${encodeURIComponent(ref)}&select=transaction_ref,listing_ref,matched_price,status,created_at&limit=1`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    cache: "no-store",
  });
  if (!response.ok) return null;
  const rows = await response.json() as Array<{ transaction_ref: string; listing_ref: string; matched_price: number; status: ExchangeTransaction["status"]; created_at: string }>;
  const row = rows[0];
  return row ? { transactionRef: row.transaction_ref, listingRef: row.listing_ref, matchedPrice: Number(row.matched_price), status: row.status, createdAt: row.created_at } : null;
}
