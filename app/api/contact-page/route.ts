export const dynamic = "force-dynamic";

const CONTACT_PAGE_STYLES = `<style id="contact-logo-size-v1">
  .contact-page > .seller-header > .seller-brand img {
    width: 71.25% !important;
    height: auto !important;
  }
  .contact-careers-entry {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    width: fit-content;
    margin-top: 12px;
    color: #d7e2ea;
    font-size: 14px;
    line-height: 1.4;
    text-decoration: none;
  }
  .contact-careers-entry strong {
    color: #f5a400;
    font-weight: 800;
  }
  .contact-careers-entry:hover strong,
  .contact-careers-entry:focus-visible strong {
    text-decoration: underline;
  }
</style>`;

const CAREERS_ENTRY = '<a class="contact-careers-entry" href="/careers"><span>Interested in joining FLLM?</span><strong>View Careers →</strong></a>';

function addCareersEntryPoint(html: string) {
  if (html.includes('class="contact-careers-entry"')) return html;

  const marker = '<span class="contact-direct-link">Use the secure form to contact us directly.</span>';
  return html.replace(marker, `${marker}${CAREERS_ENTRY}`);
}

function applyCareersMode(html: string) {
  return html
    .replace(
      "<h1>Contact Florida Liquor License Market</h1>",
      "<h1>Apply to Join Florida Liquor License Market</h1>",
    )
    .replace(
      "Whether you are buying, selling, financing, investing, or simply exploring your options, tell us how we can help. A marketplace representative will follow up directly.",
      "Tell us about your sales or business-development background, the Florida counties or markets you know best, and how you would like to contribute to the FLLM marketplace.",
    )
    .replace(
      "Use the secure form to contact us directly.",
      "Use the secure form to submit your FLLM application.",
    )
    .replace("<h2>How Can We Help?</h2>", "<h2>FLLM Careers Application</h2>")
    .replace(
      'name="_subject" value="Florida Liquor License Market — New Contact Inquiry"',
      'name="_subject" value="FLLM Careers — Marketplace Representative Application"',
    )
    .replace(
      '<option value="" disabled="" selected="">Select an option</option>',
      '<option value="" disabled="">Select an option</option><option selected="">Careers / Join FLLM</option>',
    )
    .replace("<span>Preferred County</span>", "<span>Florida County / Market You Know Best</span>")
    .replace(
      "<span>How can we help? *</span>",
      "<span>Tell us about your sales or business-development background *</span>",
    )
    .replace(
      "Submit Confidential Inquiry",
      "Submit FLLM Application",
    );
}

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const careersMode = requestUrl.searchParams.get("careers") === "1";
    const sourceUrl = new URL("/contact/index.html", request.url);
    sourceUrl.searchParams.set("source", "1");

    const sourceResponse = await fetch(sourceUrl, { cache: "no-store" });
    if (!sourceResponse.ok) {
      throw new Error(`Static contact page returned ${sourceResponse.status}`);
    }

    let html = await sourceResponse.text();
    if (!html.includes('id="contact-logo-size-v1"')) {
      html = html.replace("</head>", `${CONTACT_PAGE_STYLES}</head>`);
    }
    html = careersMode ? applyCareersMode(html) : addCareersEntryPoint(html);

    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Contact page enhancement failed", error);
    return Response.redirect(new URL("/contact/index.html", request.url), 307);
  }
}
