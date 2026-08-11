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

export async function GET() {
  const sourceResponse = await fetch(`${liveSiteUrl}/api/homepage`, { cache: "no-store" });
  const sourceHtml = await sourceResponse.text();

  if (!sourceResponse.ok) {
    return new Response(sourceHtml, {
      status: sourceResponse.status,
      headers: { "Content-Type": sourceResponse.headers.get("content-type") ?? "text/html; charset=utf-8" },
    });
  }

  const html = addCareersToVisibleCompanyFooter(sourceHtml);

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, max-age=0, must-revalidate",
      Pragma: "no-cache",
    },
  });
}
