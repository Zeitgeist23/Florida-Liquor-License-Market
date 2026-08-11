export const dynamic = "force-dynamic";

const liveSiteUrl = "https://www.floridaliquorlicensemarket.com";
const companyLinks = '<strong>Company</strong><a href="/contact">Contact Us</a><a href="/sell-your-license">List Your License</a><a href="/listings">Browse Listings</a>';
const companyLinksWithCareers = `${companyLinks}<a href="/careers">Careers</a>`;

export async function GET() {
  const sourceResponse = await fetch(`${liveSiteUrl}/api/homepage`, { cache: "no-store" });
  const sourceHtml = await sourceResponse.text();

  if (!sourceResponse.ok) {
    return new Response(sourceHtml, {
      status: sourceResponse.status,
      headers: { "Content-Type": sourceResponse.headers.get("content-type") ?? "text/html; charset=utf-8" },
    });
  }

  const html = sourceHtml.includes('href="/careers"')
    ? sourceHtml
    : sourceHtml.replace(companyLinks, companyLinksWithCareers);

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
