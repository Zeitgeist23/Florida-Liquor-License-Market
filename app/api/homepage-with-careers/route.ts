export const dynamic = "force-dynamic";

const liveSiteUrl = "https://www.floridaliquorlicensemarket.com";
const careersLink = '<a href="/careers">Careers</a>';

function addCareersToVisibleCompanyFooter(sourceHtml: string) {
  const footerStart = sourceHtml.indexOf('<footer id="resources">');
  if (footerStart < 0) return sourceHtml;

  const footerEndTag = "</footer>";
  const footerEnd = sourceHtml.indexOf(footerEndTag, footerStart);
  if (footerEnd < 0) return sourceHtml;

  const footerEndExclusive = footerEnd + footerEndTag.length;
  const footer = sourceHtml.slice(footerStart, footerEndExclusive);

  const companyColumnPattern = /(<div>\s*<strong>\s*Company\s*<\/strong>[\s\S]*?<a\s+href=["']\/listings["']>\s*Browse Listings\s*<\/a>)([\s\S]*?<\/div>\s*<div>\s*<strong>\s*Disclosures\s*<\/strong>)/i;

  const updatedFooter = footer.replace(companyColumnPattern, (match, companyLinks: string, remainder: string) => {
    if (/href=["']\/careers["']/i.test(companyLinks)) return match;
    return `${companyLinks}${careersLink}${remainder}`;
  });

  if (updatedFooter === footer) return sourceHtml;

  return `${sourceHtml.slice(0, footerStart)}${updatedFooter}${sourceHtml.slice(footerEndExclusive)}`;
}


function addNationalMarketplaceLinks(sourceHtml: string) {
  let html = sourceHtml;

  if (!html.includes("data-national-marketplace-prompt")) {
    const ctaPattern = /<section\b[^>]*class=["'][^"']*\bcta\b[^"']*["'][^>]*id=["']sell["'][^>]*>/i;
    const cta = ctaPattern.exec(html);
    if (cta) {
      const prompt = '<aside data-national-marketplace-prompt="true" aria-label="National liquor license markets" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin:0 0 12px;padding:13px 18px;border:1px solid rgba(246,167,0,.46);border-radius:7px;background:#f7f2e7;color:#0b1725"><span><strong style="display:block;font-size:14px">Looking for a liquor license outside Florida?</strong><small style="display:block;margin-top:3px;color:#4a5864;font-size:10px;line-height:1.4">Explore active markets across the United States on Liquor License Market.</small></span><a href="https://www.liquorlicensemarket.com/" style="color:#8f5f00;font-size:10px;font-weight:900;letter-spacing:.04em;text-transform:uppercase">Explore National Markets ›</a></aside>';
      html = html.slice(0, cta.index) + prompt + html.slice(cta.index);
    }
  }

  if (!html.includes("data-national-marketplace-company-link")) {
    const companyPattern = /(<div>\s*<strong>\s*Company\s*<\/strong>[\s\S]*?<a\s+href=["']\/listings["']>\s*Browse Listings\s*<\/a>)/i;
    html = html.replace(companyPattern, '$1<a data-national-marketplace-company-link="true" href="https://www.liquorlicensemarket.com/">National Liquor License Markets</a>');
  }

  return html;
}

export async function GET() {
  const sourceResponse = await fetch(`${liveSiteUrl}/api/homepage`, { cache: "no-store" });
  const sourceHtml = await sourceResponse.text();

  if (!sourceResponse.ok) {
    return new Response(sourceHtml, {
      status: sourceResponse.status,
      headers: { "Content-Type": sourceResponse.headers.get("content-type") ?? "text/html; charset=utf-8" },
    });
  }

  const html = addNationalMarketplaceLinks(addCareersToVisibleCompanyFooter(sourceHtml));

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, max-age=0, must-revalidate",
      Pragma: "no-cache",
    },
  });
}
