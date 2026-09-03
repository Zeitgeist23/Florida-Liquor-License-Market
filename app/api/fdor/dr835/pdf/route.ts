export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL("/fllm-fillable-dr835.pdf?v=complete-3", request.url);

  return Response.redirect(url, 307);
}
