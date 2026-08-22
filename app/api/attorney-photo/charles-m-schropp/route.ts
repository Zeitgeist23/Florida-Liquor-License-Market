const PROFILE_URL = "https://www.schropplaw.com/attorney-profiles/charles-m-schropp/";

function decodeHtml(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&#038;", "&")
    .replaceAll("&#38;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#039;", "'");
}

function extractAttribute(tag: string, name: string) {
  const quoted = tag.match(new RegExp(`${name}\\s*=\\s*[\"']([^\"']+)[\"']`, "i"));
  if (quoted?.[1]) return decodeHtml(quoted[1]);
  const bare = tag.match(new RegExp(`${name}\\s*=\\s*([^\\s>]+)`, "i"));
  return bare?.[1] ? decodeHtml(bare[1]) : null;
}

function findPortraitUrl(html: string) {
  const imageTags = html.match(/<img\b[^>]*>/gi) ?? [];

  const preferred = imageTags.find((tag) => {
    const alt = (extractAttribute(tag, "alt") ?? "").toLowerCase();
    const title = (extractAttribute(tag, "title") ?? "").toLowerCase();
    return (
      alt.includes("charles m. schropp") ||
      alt.includes("charles m schropp") ||
      title.includes("charles m. schropp") ||
      title.includes("charles m schropp")
    );
  });

  const candidates = preferred ? [preferred, ...imageTags] : imageTags;
  for (const tag of candidates) {
    const src = extractAttribute(tag, "src") || extractAttribute(tag, "data-src");
    if (!src) continue;
    const lower = src.toLowerCase();
    if (
      lower.includes("logo") ||
      lower.includes("icon") ||
      lower.includes("sprite") ||
      lower.includes("social") ||
      lower.includes("badge")
    ) continue;
    try {
      return new URL(src, PROFILE_URL).toString();
    } catch {
      // Keep scanning for the next candidate.
    }
  }

  return null;
}

export async function GET() {
  try {
    const profileResponse = await fetch(PROFILE_URL, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131 Safari/537.36",
        accept: "text/html,application/xhtml+xml",
      },
      next: { revalidate: 86400 },
    });

    if (!profileResponse.ok) {
      return new Response("Portrait source unavailable", { status: 502 });
    }

    const html = await profileResponse.text();
    const portraitUrl = findPortraitUrl(html);
    if (!portraitUrl) {
      return new Response("Portrait not found", { status: 404 });
    }

    const imageResponse = await fetch(portraitUrl, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131 Safari/537.36",
        referer: PROFILE_URL,
        accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      },
      next: { revalidate: 86400 },
    });

    if (!imageResponse.ok) {
      return new Response("Portrait image unavailable", { status: 502 });
    }

    const contentType = imageResponse.headers.get("content-type") || "image/jpeg";
    const bytes = await imageResponse.arrayBuffer();

    return new Response(bytes, {
      status: 200,
      headers: {
        "content-type": contentType,
        "cache-control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
        "content-disposition": 'inline; filename="charles-m-schropp"',
      },
    });
  } catch {
    return new Response("Portrait source unavailable", { status: 502 });
  }
}
