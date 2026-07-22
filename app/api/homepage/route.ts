export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const sourceUrl = new URL("/index.html", request.url);
    sourceUrl.searchParams.set("source", "1");

    const sourceResponse = await fetch(sourceUrl, { cache: "no-store" });
    if (!sourceResponse.ok) {
      throw new Error(`Static homepage returned ${sourceResponse.status}`);
    }

    const html = await sourceResponse.text();
    const scriptTags = [
      '<script defer src="/assets/market-map-modal.js"></script>',
      '<script defer src="/assets/recent-transactions.js"></script>',
    ];

    const tagsToAdd = scriptTags.filter((tag) => !html.includes(tag)).join("");
    const enhancedHtml = tagsToAdd ? html.replace("</body>", `${tagsToAdd}</body>`) : html;

    return new Response(enhancedHtml, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Homepage enhancement failed", error);
    return Response.redirect(new URL("/index.html", request.url), 307);
  }
}
