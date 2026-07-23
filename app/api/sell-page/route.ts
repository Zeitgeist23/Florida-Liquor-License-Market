export const dynamic = "force-dynamic";

const SELL_PAGE_STYLES = `<style id="sell-license-header-layout-v2">
  .seller-page > .seller-header {
    justify-content: flex-start !important;
    column-gap: 10px !important;
  }

  .seller-page > .seller-header > .seller-brand {
    display: flex !important;
    align-items: center !important;
    flex: 0 0 auto !important;
    width: auto !important;
    height: 100% !important;
    margin-left: auto !important;
  }

  .seller-page > .seller-header > .seller-brand img {
    display: block !important;
    width: 141px !important;
    height: auto !important;
    object-fit: contain !important;
    object-position: center !important;
  }

  .seller-page > .seller-header > nav {
    display: flex !important;
    align-items: center !important;
    flex: 0 0 auto !important;
    margin-left: 0 !important;
  }

  .seller-page > .seller-header > nav > a:first-child {
    margin-left: 0 !important;
  }

  @media (max-width: 560px) {
    .seller-page > .seller-header {
      column-gap: 7px !important;
    }

    .seller-page > .seller-header > .seller-brand img {
      width: 123px !important;
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
    if (!html.includes('id="sell-license-header-layout-v2"')) {
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
