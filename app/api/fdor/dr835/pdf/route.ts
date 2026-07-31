import { FLLM_DR835_BASE64 } from "@/lib/generated/fllm-dr835-base64";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const pdf = Buffer.from(FLLM_DR835_BASE64, "base64");

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="FLLM-Fillable-DR-835.pdf"',
      "Content-Length": String(pdf.byteLength),
      "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

