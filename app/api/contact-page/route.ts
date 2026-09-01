export const dynamic = "force-dynamic";

const CONTACT_PAGE_STYLES = `<style id="contact-page-enhancements-v2">
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
  .contact-license-context {
    margin: 2px 0 20px;
    padding: 18px;
    border: 1px solid rgba(246, 167, 0, .72);
    border-left: 4px solid #f6a700;
    border-radius: 6px;
    color: #f8fafc;
    background: linear-gradient(145deg, rgba(10, 34, 55, .98), rgba(4, 18, 30, .98));
    box-shadow: 0 12px 30px rgba(0, 0, 0, .22);
  }
  .contact-license-context-heading > span {
    display: block;
    margin-bottom: 6px;
    color: #f6a700;
    font-size: 10px;
    font-weight: 900;
    letter-spacing: .12em;
    text-transform: uppercase;
  }
  .contact-license-context-heading h3 {
    margin: 0;
    color: #fff;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 22px;
    line-height: 1.2;
  }
  .contact-license-context-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    margin-top: 15px;
  }
  .contact-license-context-grid > div {
    min-width: 0;
    padding: 10px 11px;
    border: 1px solid rgba(255, 255, 255, .12);
    border-radius: 4px;
    background: rgba(2, 11, 18, .62);
  }
  .contact-license-context-grid span {
    display: block;
    margin-bottom: 5px;
    color: #aebbc5;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: .07em;
    text-transform: uppercase;
  }
  .contact-license-context-grid strong {
    display: block;
    color: #fff;
    font-size: 13px;
    line-height: 1.35;
    overflow-wrap: anywhere;
  }
  .contact-license-context p {
    margin: 14px 0 0;
    color: #cbd5dc;
    font-size: 12px;
    line-height: 1.55;
  }
  .contact-license-context > a {
    display: inline-flex;
    margin-top: 11px;
    color: #f6a700;
    font-size: 11px;
    font-weight: 900;
    text-decoration: none;
  }
  .contact-license-context > a:hover,
  .contact-license-context > a:focus-visible {
    text-decoration: underline;
  }
  @media (max-width: 620px) {
    .contact-license-context-grid {
      grid-template-columns: 1fr;
    }
    .contact-license-context-heading h3 {
      font-size: 19px;
    }
  }
</style>`;

const CONTACT_CONTEXT_SCRIPT = '<script src="/assets/contact-listing-context.js?v=3" defer></script>';
const CAREERS_ENTRY = '<a class="contact-careers-entry" href="/careers"><span>Interested in joining FLLM?</span><strong>View Careers →</strong></a>';

function addContactEnhancements(html: string) {
  let enhanced = html;
  if (!enhanced.includes('id="contact-page-enhancements-v2"')) {
    enhanced = enhanced.replace("</head>", `${CONTACT_PAGE_STYLES}</head>`);
  }
  if (!enhanced.includes("contact-listing-context.js")) {
    enhanced = enhanced.replace("</head>", `${CONTACT_CONTEXT_SCRIPT}</head>`);
  }
  return enhanced;
}

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

    let html = addContactEnhancements(await sourceResponse.text());
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
