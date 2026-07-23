export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const sourceUrl = new URL("/investment-opportunities/index.html", request.url);
    const response = await fetch(sourceUrl, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Investment page source returned ${response.status}`);
    }

    let html = await response.text();
    const style = `<style id="investment-logo-size-v3">
      .investment-page .seller-header {
        height: 112px !important;
        min-height: 112px !important;
        padding-top: 0 !important;
        padding-bottom: 0 !important;
        align-items: center !important;
        box-sizing: border-box !important;
      }
      .investment-page .seller-header .seller-brand {
        height: 100% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: flex-start !important;
        align-self: center !important;
        margin: 0 !important;
      }
      .investment-page .seller-header .seller-brand img {
        display: block !important;
        width: 75% !important;
        height: auto !important;
        max-height: 78px !important;
        margin: 0 !important;
        object-fit: contain !important;
        object-position: left center !important;
      }
      .investment-page .seller-header nav {
        align-self: center !important;
      }
      @media (max-width: 640px) {
        .investment-page .seller-header {
          height: 96px !important;
          min-height: 96px !important;
        }
        .investment-page .seller-header .seller-brand img {
          max-height: 66px !important;
        }
      }
    </style>`;

    if (!html.includes('id="investment-logo-size-v3"')) {
      html = html.replace("</head>", `${style}</head>`);
    }

    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store, max-age=0",
        Pragma: "no-cache",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Investment page enhancement failed", error);
    return Response.redirect(new URL("/investment-opportunities/index.html", request.url), 307);
  }
}
