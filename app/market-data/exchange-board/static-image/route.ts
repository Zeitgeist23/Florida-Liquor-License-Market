export const dynamic = "force-dynamic";

const RAW_BASE =
  "https://raw.githubusercontent.com/Zeitgeist23/Florida-Liquor-License-Market/main/public/assets";

export async function GET() {
  const names = Array.from({ length: 8 }, (_, index) =>
    `fllm-static-b64-${String(index).padStart(2, "0")}.txt`,
  );

  const parts: string[] = [];

  for (const name of names) {
    const response = await fetch(`${RAW_BASE}/${name}`, { cache: "no-store" });
    if (!response.ok) {
      return new Response(`Missing Exchange asset: ${name}`, { status: 500 });
    }
    parts.push((await response.text()).trim());
  }

  const bytes = Buffer.from(parts.join(""), "base64");

  return new Response(bytes, {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
