const INDEXNOW_KEY = "842b528b30fc1c856d3e77c1b5de44a0";
const SITE_ORIGIN = "https://www.floridaliquorlicensemarket.com";

const PUBLIC_URLS = [
  `${SITE_ORIGIN}/`,
  `${SITE_ORIGIN}/listings`,
  `${SITE_ORIGIN}/sell-your-license`,
  `${SITE_ORIGIN}/financing`,
  `${SITE_ORIGIN}/investment-opportunities`,
  `${SITE_ORIGIN}/contact`,
  `${SITE_ORIGIN}/financing-disclosure`,
  `${SITE_ORIGIN}/private-lending-disclosure`,
  `${SITE_ORIGIN}/privacy-policy`,
  `${SITE_ORIGIN}/terms-of-use`,
];

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);

  // IndexNow verifies ownership by requesting this root URL without a query string.
  if (requestUrl.searchParams.get("submit") !== "1") {
    return new Response(INDEXNOW_KEY, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
        "X-Content-Type-Options": "nosniff",
      },
    });
  }

  const indexNowResponse = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: "www.floridaliquorlicensemarket.com",
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_ORIGIN}/${INDEXNOW_KEY}.txt`,
      urlList: PUBLIC_URLS,
    }),
    cache: "no-store",
  });

  const responseText = await indexNowResponse.text();

  return Response.json(
    {
      accepted: indexNowResponse.ok,
      indexNowStatus: indexNowResponse.status,
      submittedUrls: PUBLIC_URLS,
      response: responseText || null,
    },
    {
      status: indexNowResponse.ok ? 200 : 502,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
