export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const heroUrl = new URL(
    "/assets/fllm-exchange-board-header-live.png?v=20260911-2",
    request.url,
  );

  return Response.redirect(heroUrl, 307);
}
