export type DiscoveredNewsItem = {
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

type FeedDefinition = {
  provider: "Google News" | "Bing News";
  query: string;
  label: string;
};

const SEARCH_QUERIES = [
  '"Florida liquor license"',
  '"Florida alcohol license"',
  '"Florida alcoholic beverage license"',
  'Florida DBPR ABT liquor license',
  'Florida 4COP liquor license',
  'Florida 3PS liquor license',
  'Florida quota liquor license',
  'Florida liquor license suspension revocation',
];

const PUBLISHER_QUERIES = [
  'site:firstcoastnews.com "liquor license" Florida',
  'site:clickorlando.com "liquor license" Florida',
  'site:wfla.com "liquor license" Florida',
  'site:fox13news.com "liquor license" Florida',
  'site:cbsnews.com/miami "liquor license" Florida',
  'site:miamiherald.com "liquor license" Florida',
  'site:tampabay.com "liquor license" Florida',
  'site:floridapolitics.com "liquor license" Florida',
];

const FLORIDA_SOURCE_DOMAINS = [
  "firstcoastnews.com",
  "clickorlando.com",
  "wfla.com",
  "fox13news.com",
  "cbsnews.com",
  "miamiherald.com",
  "tampabay.com",
  "floridapolitics.com",
  "myfloridalicense.com",
  "leg.state.fl.us",
  "flcourts.gov",
];

const CURATED_SOURCE_URLS = new Set([
  "https://www.clickorlando.com/video/news/2023/02/04/officials-move-to-suspend-orlando-venues-liquor-license-after-drag-show-attended-by-children/",
  "https://business-law-review.law.miami.edu/floridas-game-changing-alcohol-licensing-reform-a-win-for-small-restaurants/",
  "https://www.cbsnews.com/news/desantis-miami-hyatt-liquor-license-drag-show/",
  "https://www.courthousenews.com/florida-wine-retailer-loses-challenge-to-missouri-liquor-licensing-rules/",
  "https://www.gmlaw.com/news/a-new-chapter-for-tied-house-laws-burger-kings-whopper-bar-wins-florida-alcohol-license-after-14-years/",
]);

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
  return decodeEntities(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getTag(block: string, tag: string) {
  const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeEntities(match[1]).trim() : "";
}

function getSource(block: string) {
  const match = block.match(/<source(?:\s[^>]*)?>([\s\S]*?)<\/source>/i);
  return match ? stripHtml(match[1]) : "";
}

function simpleHash(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

function normalizeTitle(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\b(the|a|an|and|or|of|to|in|for|on|with|at|by)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeUrl(value: string) {
  try {
    const url = new URL(value);
    url.hash = "";
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"].forEach((key) =>
      url.searchParams.delete(key)
    );
    return url.toString();
  } catch {
    return value;
  }
}

function hostnameFor(value: string) {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function sourceLabelFromUrl(value: string) {
  const host = hostnameFor(value);
  if (!host) return "News source";
  if (host.includes("firstcoastnews")) return "First Coast News";
  if (host.includes("clickorlando")) return "WKMG News 6 / ClickOrlando";
  if (host.includes("wfla")) return "WFLA";
  if (host.includes("fox13news")) return "FOX 13 Tampa Bay";
  if (host.includes("cbsnews")) return "CBS News";
  if (host.includes("miamiherald")) return "Miami Herald";
  if (host.includes("tampabay")) return "Tampa Bay Times";
  if (host.includes("floridapolitics")) return "Florida Politics";
  if (host.includes("myfloridalicense")) return "Florida DBPR / ABT";
  return host;
}

function classify(title: string, summary: string) {
  const haystack = `${title} ${summary}`.toLowerCase();
  if (/suspend|revok|disciplin|enforcement|complaint|violation|penalt|administrative action/.test(haystack)) return "Enforcement";
  if (/court|appeal|lawsuit|litigation|judge|ruling|decision|injunction|specific performance/.test(haystack)) return "Court Decisions & Litigation";
  if (/bill|law|statute|legislat|reform|rulemaking|rule change/.test(haystack)) return "Legislation & Reform";
  if (/quota|drawing|lottery|6033/.test(haystack)) return "Quota Drawings";
  if (/dbpr|abt|division of alcoholic beverages|application|renewal|permit/.test(haystack)) return "DBPR & ABT";
  if (/sale|price|value|market|transaction|auction|sold/.test(haystack)) return "Market Activity";
  return "Current Events";
}

function scoreItem(title: string, summary: string, url: string) {
  const text = `${title} ${summary}`.toLowerCase();
  let score = 0;
  const weightedTerms: Array<[RegExp, number]> = [
    [/florida/g, 4],
    [/liquor license/g, 10],
    [/alcohol(?:ic)? beverage license/g, 9],
    [/alcohol license/g, 8],
    [/\bdbpr\b/g, 8],
    [/\babt\b/g, 7],
    [/\b4cop\b/g, 8],
    [/\b3ps\b/g, 8],
    [/quota/g, 6],
    [/license suspension|license revocation|revoke|suspend/g, 5],
    [/restaurant license|special food service|sfs|srx/g, 4],
    [/alcoholic beverages and tobacco/g, 7],
  ];
  for (const [pattern, weight] of weightedTerms) {
    if (pattern.test(text)) score += weight;
  }
  const host = hostnameFor(url);
  if (FLORIDA_SOURCE_DOMAINS.some((domain) => host.endsWith(domain))) score += 4;
  if (!/florida|dbpr|abt|4cop|3ps|quota/.test(text)) score -= 8;
  return score;
}

function monitorNote(category: string) {
  switch (category) {
    case "Enforcement":
      return "FLLM surfaced this report because enforcement, suspension, revocation, or administrative action can affect license operations, due diligence, transfers, and transaction risk.";
    case "Court Decisions & Litigation":
      return "FLLM surfaced this report because Florida liquor-license disputes and appellate decisions can affect ownership claims, transfer rights, contract remedies, and regulatory strategy.";
    case "Legislation & Reform":
      return "FLLM surfaced this report because changes in Florida alcohol law can affect eligibility, operating requirements, and the economics of buying a quota license.";
    case "Quota Drawings":
      return "FLLM surfaced this report because quota-drawing activity can change county-level license supply and is relevant to applicants, owners, buyers, and lenders.";
    case "DBPR & ABT":
      return "FLLM surfaced this report because DBPR and ABT procedures can affect applications, renewals, transfers, compliance, and transaction timing.";
    case "Market Activity":
      return "FLLM surfaced this report because market activity can provide context for county-level scarcity, asking prices, transactions, and buyer demand.";
    default:
      return "FLLM surfaced this report because its subject matter appears directly relevant to Florida alcoholic-beverage licensing or the Florida liquor-license market.";
  }
}

function extractYouTubeEmbed(block: string) {
  const decoded = decodeEntities(block);
  const match = decoded.match(/(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/)([A-Za-z0-9_-]{6,})/i);
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}` : undefined;
}

function parseRss(xml: string, feed: FeedDefinition): DiscoveredNewsItem[] {
  const blocks = xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? [];
  return blocks.flatMap((block) => {
    const title = stripHtml(getTag(block, "title"));
    const rawLink = stripHtml(getTag(block, "link") || getTag(block, "guid"));
    const sourceUrl = normalizeUrl(rawLink);
    if (!title || !sourceUrl) return [];

    const rawDescription = getTag(block, "description") || getTag(block, "content:encoded");
    let summary = stripHtml(rawDescription);
    if (summary.length > 520) summary = `${summary.slice(0, 517).trim()}…`;
    const source = getSource(block) || sourceLabelFromUrl(sourceUrl);
    const pubDate = stripHtml(getTag(block, "pubDate") || getTag(block, "dc:date"));
    const parsedDate = pubDate ? new Date(pubDate) : null;
    const publishedAt = parsedDate && !Number.isNaN(parsedDate.getTime()) ? parsedDate.toISOString() : null;
    const category = classify(title, summary);
    const relevanceScore = scoreItem(title, summary, sourceUrl);
    if (relevanceScore < 9) return [];

    const slug = `${slugify(title)}-${simpleHash(sourceUrl).slice(0, 7)}`;
    return [{
      slug,
      title,
      summary: summary || "FLLM News Monitor identified this report as potentially relevant to Florida alcoholic-beverage licensing. Open the FLLM reader for source details and market context.",
      source,
      sourceUrl,
      publishedAt,
      category,
      provider: `${feed.provider} · ${feed.label}`,
      relevanceScore,
      videoEmbedUrl: extractYouTubeEmbed(block),
      monitorNote: monitorNote(category),
    }];
  });
}

function buildFeeds(): FeedDefinition[] {
  const feeds: FeedDefinition[] = [];
  for (const query of SEARCH_QUERIES.slice(0, 5)) {
    feeds.push({ provider: "Google News", query, label: "statewide search" });
  }
  for (const query of SEARCH_QUERIES.slice(0, 3)) {
    feeds.push({ provider: "Bing News", query, label: "statewide search" });
  }
  for (const query of PUBLISHER_QUERIES) {
    feeds.push({ provider: "Google News", query, label: "Florida publisher watch" });
  }
  return feeds;
}

function feedUrl(feed: FeedDefinition) {
  if (feed.provider === "Bing News") {
    return `https://www.bing.com/news/search?q=${encodeURIComponent(feed.query)}&format=rss`;
  }
  return `https://news.google.com/rss/search?q=${encodeURIComponent(feed.query)}&hl=en-US&gl=US&ceid=US:en`;
}

async function fetchFeed(feed: FeedDefinition) {
  const response = await fetch(feedUrl(feed), {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; FLLMNewsMonitor/1.0; +https://www.floridaliquorlicensemarket.com/florida-liquor-license-news)",
      Accept: "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
    },
    next: { revalidate: 1800 },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`${feed.provider} returned ${response.status}`);
  return parseRss(await response.text(), feed);
}

export async function discoverFloridaLiquorLicenseNews(limit = 18) {
  const feeds = buildFeeds();
  const settled = await Promise.allSettled(feeds.map((feed) => fetchFeed(feed)));
  const allItems = settled.flatMap((result) => result.status === "fulfilled" ? result.value : []);
  const now = Date.now();
  const maxAgeMs = 180 * 24 * 60 * 60 * 1000;
  const curatedNormalized = new Set(Array.from(CURATED_SOURCE_URLS, normalizeUrl));

  const byFingerprint = new Map<string, DiscoveredNewsItem>();
  for (const item of allItems) {
    if (curatedNormalized.has(normalizeUrl(item.sourceUrl))) continue;
    if (item.publishedAt) {
      const age = now - new Date(item.publishedAt).getTime();
      if (Number.isFinite(age) && age > maxAgeMs) continue;
    }
    const fingerprint = normalizeTitle(item.title);
    if (!fingerprint) continue;
    const existing = byFingerprint.get(fingerprint);
    if (!existing || item.relevanceScore > existing.relevanceScore) byFingerprint.set(fingerprint, item);
  }

  return Array.from(byFingerprint.values())
    .sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      if (dateB !== dateA) return dateB - dateA;
      return b.relevanceScore - a.relevanceScore;
    })
    .slice(0, limit);
}
