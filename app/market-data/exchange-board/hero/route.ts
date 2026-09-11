export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const heroUrl = new URL(
    "/assets/fllm-exchange-board-hero-approved.jpg",
    request.url,
  );

  return Response.redirect(heroUrl, 307);
}
