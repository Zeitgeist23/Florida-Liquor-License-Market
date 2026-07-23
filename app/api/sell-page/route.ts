export const dynamic = "force-dynamic";

const SELL_PAGE_STYLES = `<style id="sell-license-header-layout-v4">
  .seller-page > .seller-header {
    justify-content: space-between !important;
    column-gap: 22px !important;
  }

  .seller-page > .seller-header > .seller-brand {
    display: flex !important;
    align-items: center !important;
    justify-content: flex-start !important;
    flex: 0 0 auto !important;
    width: auto !important;
    height: 100% !important;
    margin-left: 0 !important;
    margin-right: auto !important;
  }

  .seller-page > .seller-header > .seller-brand img {
    display: block !important;
    width: 162px !important;
    height: auto !important;
    object-fit: contain !important;
    object-position: left center !important;
  }

  .seller-page > .seller-header > nav {
    display: flex !important;
    align-items: center !important;
    flex: 0 0 auto !important;
    margin-left: auto !important;
  }

  @media (max-width: 560px) {
    .seller-page > .seller-header {
      column-gap: 12px !important;
    }

    .seller-page > .seller-header > .seller-brand img {
      width: 141px !important;
    }

    .seller-page > .seller-header > nav {
      gap: 10px !important;
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
    if (!html.includes('id="sell-license-header-layout-v4"')) {
      html = html.replace("</head>", `${SELL_PAGE_STYLES}</head>`);
    }

    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Seller page enhancement failed", error);
    return Response.redirect(new URL("/sell-your-license/index.html", request.url), 307);
  }
}