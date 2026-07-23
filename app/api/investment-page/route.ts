export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const sourceUrl = new URL("/investment-opportunities/index.html", request.url);
    const response = await fetch(sourceUrl, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Investment page source returned ${response.status}`);
    }

    let html = await response.text();
    const style = `<style id="investment-logo-size-v2">
      .investment-page .seller-header {
        align-items: center !important;
      }
      .investment-page .seller-header .seller-brand {
        align-self: stretch !important;
        display: flex !important;
        align-items: center !important;
      }
      .investment-page .seller-header .seller-brand img {
        display: block !important;
        width: 75% !important;
        height: auto !important;
        margin-block: auto !important;
      }
    </style>`;

    if (!html.includes('id="investment-logo-size-v2"')) {
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
