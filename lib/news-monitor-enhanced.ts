import { getFloridaLiquorLicenseNewsSnapshot } from "@/lib/news-discovery";

type MonitorItem = {
  slug: string;
  title: string;
  summary: string;
  source: string;
  sourceUrl: string;
  publishedAt: string | null;
  category: string;
  provider: string;
  relevanceScore: number;
  videoEmbedUrl?: string;
  monitorNote: string;
};

const EXTRA_QUERIES = [
  'Florida "liquor license" violation',
  'Florida "alcohol violations" restaurant bar',
  'Florida "serving alcohol" "without a permit"',
  'Florida "alcohol permit" violation marina bar restaurant',
  'site:fox4now.com Florida alcohol permit OR liquor license',
  'site:nbc-2.com Florida liquor license OR alcohol permit',
  'site:fox35orlando.com Florida liquor license OR alcohol permit',
  'site:local10.com Florida liquor license OR alcohol permit',
  'site:wsvn.com Florida liquor license OR alcohol permit',
  'site:youtube.com Florida liquor license violation news',
];

const CURATED_BACKFILL: MonitorItem[] = [
  {
    slug: "jug-creek-marina-alcohol-violations-permits-fox4-2025",
    title: "Jug Creek Marina cited for alcohol violations and failure to obtain permits",
    summary:
      "FOX 4 Now reported that Jug Creek Marina in Lee County faced multiple county code violations, including allegations of serving alcohol without the required permits. The report is relevant to Florida beverage-license compliance, local permitting and due diligence.",
    source: "FOX 4 Now",
    sourceUrl: "https://www.youtube.com/watch?v=zvh709zH2bE",
    publishedAt: "2025-05-19T00:00:00.000Z",
    category: "Enforcement",
    provider: "FLLM News Monitor · historical backfill",
    relevanceScore: 30,
    videoEmbedUrl: "https://www.youtube-nocookie.com/embed/zvh709zH2bE",
    monitorNote:
      "FLLM surfaced this report because serving alcohol without required licensing or local permits can create enforcement exposure and may matter to buyers, sellers, lenders and operators conducting due diligence on a licensed premises.",
  },
];

function decodeEntities(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripHtml(value: string) {
  return decodeEntities(value).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function tag(block: string, name: string) {
  const match = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, "i"));
  return match ? decodeEntities(match[1]).trim() : "";
}

function sourceName(block: string) {
  return stripHtml(tag(block, "source")) || "Florida news source";
}

function hash(value: string) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36);
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 70);
}

function classify(text: string) {
  const value = text.toLowerCase();
  if (/violation|cited|citation|suspend|revok|enforcement|illegal|without.*permit|without.*license/.test(value)) return "Enforcement";
  if (/court|lawsuit|appeal|judge|ruling/.test(value)) return "Court Decisions & Litigation";
  if (/bill|law|statute|legislat|reform|rule/.test(value)) return "Legislation & Reform";
  if (/quota|drawing|lottery/.test(value)) return "Quota Drawings";
  if (/dbpr|abt|permit|application|renewal/.test(value)) return "DBPR & ABT";
  return "Current Events";
}

function relevant(title: string, summary: string) {
  const text = `${title} ${summary}`.toLowerCase();
  const florida = /florida|lee county|miami|orlando|tampa|jacksonville|fort myers|fort lauderdale|palm beach|pensacola|naples/.test(text);
  const alcohol = /liquor license|alcohol license|alcoholic beverage|alcohol permit|serving alcohol|4cop|3ps|dbpr|\babt\b/.test(text);
  return florida && alcohol;
}

async function fetchSupplementalQuery(query: string): Promise<MonitorItem[]> {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; FLLMNewsMonitor/3.0; +https://www.floridaliquorlicensemarket.com/florida-liquor-license-news)",
        Accept: "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return [];
    const xml = await response.text();
    const blocks = xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? [];
    return blocks.flatMap((block) => {
      const title = stripHtml(tag(block, "title"));
      const sourceUrl = stripHtml(tag(block, "link") || tag(block, "guid"));
      let summary = stripHtml(tag(block, "description"));
      if (summary.length > 430) summary = `${summary.slice(0, 427).trim()}…`;
      if (!title || !sourceUrl || !relevant(title, summary)) return [];
      const rawDate = stripHtml(tag(block, "pubDate"));
      const parsedDate = rawDate ? new Date(rawDate) : null;
      const publishedAt = parsedDate && !Number.isNaN(parsedDate.getTime()) ? parsedDate.toISOString() : null;
      if (publishedAt && Date.now() - Date.parse(publishedAt) > 548 * 24 * 60 * 60 * 1000) return [];
      const category = classify(`${title} ${summary}`);
      return [{
        slug: `${slugify(title)}-${hash(sourceUrl).slice(0, 7)}`,
        title,
        summary: summary || "FLLM identified this report as relevant to Florida alcoholic-beverage licensing or enforcement.",
        source: sourceName(block),
        sourceUrl,
        publishedAt,
        category,
        provider: "Google News · expanded Florida local-news watch",
        relevanceScore: 18,
        monitorNote:
          category === "Enforcement"
            ? "FLLM surfaced this report because liquor-license, alcohol-permit and enforcement developments can affect operations, due diligence, transfers and transaction risk."
            : "FLLM surfaced this report because it appears directly relevant to Florida alcoholic-beverage licensing, permits, compliance or market activity.",
      }];
    });
  } catch {
    return [];
  }
}

function fingerprint(item: MonitorItem) {
  return item.title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export async function getEnhancedFloridaLiquorLicenseNewsSnapshot() {
  const base = await getFloridaLiquorLicenseNewsSnapshot();
  const supplementalResults = await Promise.all(EXTRA_QUERIES.map(fetchSupplementalQuery));
  const supplemental = supplementalResults.flat();
  const merged = [...CURATED_BACKFILL, ...supplemental, ...(base.items as MonitorItem[])];
  const deduped = new Map<string, MonitorItem>();

  for (const item of merged) {
    const key = fingerprint(item);
    const existing = deduped.get(key);
    if (!existing || item.relevanceScore > existing.relevanceScore) deduped.set(key, item);
  }

  const items = [...deduped.values()]
    .sort((a, b) => {
      const aDate = a.publishedAt ? Date.parse(a.publishedAt) : 0;
      const bDate = b.publishedAt ? Date.parse(b.publishedAt) : 0;
      return bDate - aDate || b.relevanceScore - a.relevanceScore;
    })
    .slice(0, 36);

  return {
    ...base,
    updatedAt: new Date().toISOString(),
    feedsChecked: (base.feedsChecked ?? 0) + EXTRA_QUERIES.length,
    successfulFeeds: (base.successfulFeeds ?? 0) + supplementalResults.filter((items) => items.length > 0).length,
    items,
  };
}
