export const dynamic = "force-static";

export async function GET(request: Request) {
  return Response.redirect(
    new URL("/assets/market-report-popup-reference-v1.webp?v=20260821", request.url),
    307,
  );
}
