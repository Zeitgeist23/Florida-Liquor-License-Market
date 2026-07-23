export const dynamic = "force-dynamic";

const SELL_PAGE_STYLES = `<style id="sell-license-header-layout">
  .seller-page > .seller-header {
    justify-content: flex-end !important;
    gap: 12px !important;
  }

  .seller-page > .seller-header > .seller-brand {
    display: flex !important;
    align-items: center !important;
    flex: 0 0 auto !important;
    width: auto !important;
  }

  .seller-page > .seller-header > .seller-brand img {
    width: 141px !important;
    height: 57px !important;
    object-fit: cover !important;
    object-position: left center !important;
  }

  .seller-page > .seller-header > nav {
    margin-left: 0 !important;
  }

  @media (max-width: 560px) {
    .seller-page > .seller-header {
      gap: 8px !important;
    }

    .seller-page > .seller-header > .seller-brand img {
      width: 123px !important;
      height: 51px !important;
    }

    .seller-page > .seller-header > nav {
      gap: 12px !important;
    }
  }
</style>`;

export async function GET(request: Request) {
  try {
    const sourceUrl = new URL("/sell-your-license/index.html", request.url);
    sourceUrl.searchParams.set("source", "1");

    const sourceResponse = await fetch(sourceUrl, { cache: "no-store" });
    if (!sourceResponse.ok) {
      throw new Error(`Static seller page returned ${sourceResponse.status}`);
    }

    let html = await sourceResponse.text();
    if (!html.includes('id="sell-license-header-layout"')) {
      html = html.replace("</head>", `${SELL_PAGE_STYLES}</head>`);
    }

    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Seller page enhancement failed", error);
    return Response.redirect(new URL("/sell-your-license/index.html", request.url), 307);
  }
}
