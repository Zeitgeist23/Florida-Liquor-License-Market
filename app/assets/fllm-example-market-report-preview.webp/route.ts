export const dynamic = "force-static";

export async function GET(request: Request) {
  return Response.redirect(
    new URL("/assets/fllm-preliminary-market-report-preview.webp?v=20260822", request.url),
    307,
  );
}
