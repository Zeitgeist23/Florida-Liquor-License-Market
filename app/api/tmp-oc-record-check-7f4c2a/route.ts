import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const BASE_URL = "https://selfservice.or.occompt.com";
const SEARCH_PAGE = `${BASE_URL}/ssweb/search/DOCSEARCH2950S1`;
const SEARCH_POST = `${BASE_URL}/ssweb/searchPost/DOCSEARCH2950S1`;
const CSV_URL = `${BASE_URL}/ssweb/viewSearchResultsReport/DOCSEARCH2950S1/CSV`;

const FIXED_TERMS = ["MUKTIV", "MUKTIV INC", "BIREN PATEL", "PATEL BIREN"] as const;

function cookieHeaderFrom(response: Response) {
  const headersWithCookies = response.headers as Headers & { getSetCookie?: () => string[] };
  const setCookies = headersWithCookies.getSetCookie?.() ?? [];
  const combined = setCookies.length ? setCookies.join(",") : response.headers.get("set-cookie") ?? "";
  const cookies: string[] = [];
  for (const name of ["JSESSIONID", "SESSION", "ROUTEID"]) {
    const match = combined.match(new RegExp(`${name}=([^;,\\s]+)`, "i"));
    if (match) cookies.push(`${name}=${match[1]}`);
  }
  cookies.push("disclaimerAccepted=true");
  return Array.from(new Set(cookies)).join("; ");
}

function buildPayload(term: string) {
  const body = new URLSearchParams();
  body.set("field_BothNamesID-searchInput", term);
  body.set("field_BothNamesID-containsInput", "Contains All");
  body.set("field_BothNamesID", "");
  body.set("field_GrantorID-containsInput", "Contains Any");
  body.set("field_GrantorID", "");
  body.set("field_GranteeID-containsInput", "Contains Any");
  body.set("field_GranteeID", "");
  body.set("field_RecordingDateID_DOT_StartDate", "");
  body.set("field_RecordingDateID_DOT_EndDate", "");
  body.set("field_DocumentNumberID", "");
  body.set("field_BookPageID_DOT_Book-containsInput", "Contains Any");
  body.set("field_BookPageID_DOT_Book", "");
  body.set("field_BookPageID_DOT_Volume", "");
  body.set("field_BookPageID_DOT_Page", "");
  body.set("field_LegalRemarksID-containsInput", "Contains Any");
  body.set("field_LegalRemarksID", "");
  body.set("field_PlattedLegalID_DOT_Town", "");
  body.set("field_PlattedLegalID_DOT_Subdivision-containsInput", "Contains Any");
  body.set("field_PlattedLegalID_DOT_Subdivision", "");
  body.set("field_PlattedLegalID_DOT_Lot", "");
  body.set("field_PlattedLegalID_DOT_Block", "");
  body.set("field_PlattedLegalID_DOT_Tract", "");
  body.set("field_PlattedLegalID_DOT_Unit", "");
  body.set("field_PlattedLegalID_DOT_Custom1", "");
  body.set("field_PlattedLegalID_DOT_Custom2", "");
  body.set("field_PlattedLegalID_DOT_Custom3", "");
  body.set("field_selfservice_documentTypes-containsInput", "Contains Any");
  body.set("field_selfservice_documentTypes", "");
  body.set("field_UseAdvancedSearch", "");
  return body;
}

function parseCsvLine(line: string) {
  const values: string[] = [];
  let value = "";
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      if (quoted && line[i + 1] === '"') {
        value += '"';
        i += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === "," && !quoted) {
      values.push(value);
      value = "";
    } else {
      value += char;
    }
  }
  values.push(value);
  return values.map((item) => item.trim());
}

function parseCsv(text: string) {
  const lines = text.replace(/\r/g, "").split("\n").filter(Boolean);
  const headerIndex = lines.findIndex((line) => /Document\s*#/i.test(line));
  if (headerIndex < 0) return [];
  const headers = parseCsvLine(lines[headerIndex]);
  return lines.slice(headerIndex + 1).map((line) => {
    const values = parseCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
  }).filter((row) => Object.values(row).some(Boolean));
}

function likelyEncumbrance(row: Record<string, string>) {
  const description = `${row.Description ?? ""} ${row["Document Type"] ?? ""}`.toUpperCase();
  return /(MORTGAGE|LIEN|JUDGMENT|FINANCING|SECURITY|UCC|ASSIGNMENT|SATISFACTION|RELEASE)/.test(description);
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  if (requestUrl.searchParams.get("key") !== "oc-5812173-9e74") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const commonHeaders = {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/151 Safari/537.36",
    accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  };

  try {
    const initial = await fetch(SEARCH_PAGE, {
      headers: commonHeaders,
      redirect: "follow",
      cache: "no-store",
    });
    const initialText = await initial.text();
    const cookie = cookieHeaderFrom(initial);

    const results = [];
    for (const term of FIXED_TERMS) {
      const post = await fetch(SEARCH_POST, {
        method: "POST",
        headers: {
          ...commonHeaders,
          accept: "application/json, text/javascript, */*; q=0.01",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "x-requested-with": "XMLHttpRequest",
          ajaxRequest: "true",
          origin: BASE_URL,
          referer: SEARCH_PAGE,
          cookie,
        },
        body: buildPayload(term),
        cache: "no-store",
        redirect: "manual",
      });
      const postText = await post.text();

      const csv = await fetch(CSV_URL, {
        headers: {
          ...commonHeaders,
          accept: "text/csv,text/plain,*/*",
          referer: SEARCH_PAGE,
          cookie,
        },
        cache: "no-store",
        redirect: "follow",
      });
      const csvText = await csv.text();
      const rows = parseCsv(csvText);
      results.push({
        term,
        postStatus: post.status,
        postLocation: post.headers.get("location"),
        postPreview: postText.slice(0, 500),
        csvStatus: csv.status,
        csvContentType: csv.headers.get("content-type"),
        csvLength: csvText.length,
        csvPreview: csvText.slice(0, 1500),
        rowCount: rows.length,
        rows: rows.slice(0, 250),
        likelyEncumbrances: rows.filter(likelyEncumbrance).slice(0, 250),
      });
    }

    return NextResponse.json({
      checkedAt: new Date().toISOString(),
      initialStatus: initial.status,
      initialUrl: initial.url,
      initialContainsSearchForm: initialText.includes("searchPost/DOCSEARCH2950S1"),
      initialContainsDisclaimer: initialText.includes("submitDisclaimerAccept"),
      cookieNames: cookie.split(";").map((part) => part.trim().split("=")[0]),
      results,
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 });
  }
}
