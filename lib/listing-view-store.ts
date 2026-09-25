import "server-only";

function databaseConfigured() {
  return Boolean(
    process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

function headers(extra: HeadersInit = {}): HeadersInit {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  return {
    apikey: key,
    Authorization: "Bearer " + key,
    "Content-Type": "application/json",
    ...extra,
  };
}

function normalizedListingRef(value: string) {
  const ref = decodeURIComponent(value).trim().toUpperCase();
  return /^[A-Z0-9][A-Z0-9-]{2,79}$/.test(ref) ? ref : null;
}

async function countRows(listingRef: string) {
  if (!databaseConfigured()) return 0;

  const endpoint =
    process.env.SUPABASE_URL +
    "/rest/v1/listing_page_views?listing_ref=eq." +
    encodeURIComponent(listingRef) +
    "&select=id&limit=1";

  const response = await fetch(endpoint, {
    method: "GET",
    headers: headers({
      Prefer: "count=exact",
      Range: "0-0",
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    console.error(
      "Listing view count failed: " +
        response.status +
        " " +
        (await response.text()),
    );
    return 0;
  }

  const contentRange = response.headers.get("content-range") ?? "";
  const total = Number(contentRange.split("/").pop());
  return Number.isFinite(total) ? total : 0;
}

export async function getListingViewCount(rawListingRef: string) {
  const listingRef = normalizedListingRef(rawListingRef);
  if (!listingRef) return 0;
  return countUniqueVisitors(listingRef);
}

async function countUniqueVisitors(listingRef: string) {
  if (!databaseConfigured()) return 0;

  const endpoint =
    process.env.SUPABASE_URL +
    "/rest/v1/rpc/get_listing_unique_visitor_count";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ p_listing_ref: listingRef }),
    cache: "no-store",
  });

  if (!response.ok) {
    console.error(
      "Listing unique visitor count failed: " +
        response.status +
        " " +
        (await response.text()),
    );
    return 0;
  }

  const payload = await response.json();
  const total = typeof payload === "number" ? payload : Number(payload);
  return Number.isFinite(total) ? total : 0;
}

export async function getListingUniqueVisitorCount(rawListingRef: string) {
  const listingRef = normalizedListingRef(rawListingRef);
  if (!listingRef) return 0;
  return countUniqueVisitors(listingRef);
}

export async function recordListingView(
  rawListingRef: string,
  viewerHash: string,
) {
  const listingRef = normalizedListingRef(rawListingRef);
  if (!listingRef || !databaseConfigured()) {
    return listingRef ? countUniqueVisitors(listingRef) : 0;
  }

  const today = new Date().toISOString().slice(0, 10);
  const endpoint =
    process.env.SUPABASE_URL +
    "/rest/v1/listing_page_views?on_conflict=listing_ref,viewer_hash,view_day";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: headers({
      Prefer: "resolution=ignore-duplicates,return=minimal",
    }),
    body: JSON.stringify({
      listing_ref: listingRef,
      viewer_hash: viewerHash,
      view_day: today,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    console.error(
      "Listing view record failed: " +
        response.status +
        " " +
        (await response.text()),
    );
  }

  return countRows(listingRef);
}
