import { cloneElement } from "react";
import { ImageResponse } from "next/og";

import FloridaCountyMap from "@/components/FloridaCountyMap";
import { getApprovedSubmissionByPublicRef } from "@/lib/listing-submission-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function countyLabel(county: string) {
  const cleaned = county.trim();
  return / County$/i.test(cleaned) ? cleaned : `${cleaned} County`;
}

function formatMoney(value: number | null) {
  if (value === null) return "PRICE UNDISCLOSED";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function countyDescription(county: string) {
  const shortCounty = county.replace(/ County$/i, "");
  return `${shortCounty} County offers an active Florida market for restaurants, bars, hospitality, and transferable quota liquor licenses.`;
}

export async function GET(
  request: Request,
  context: { params: Promise<{ ref: string }> }
) {
  const { ref } = await context.params;
  const submission = await getApprovedSubmissionByPublicRef(decodeURIComponent(ref));

  if (!submission || !submission.approvedLicenseType) {
    return new Response("Listing image not found.", { status: 404 });
  }

  const county = countyLabel(submission.county);
  const listingUrl = submission.liveListingUrl || new URL("/listings", request.url).toString();
  const map = cloneElement(FloridaCountyMap({ county }), {
    width: 292,
    height: 160,
    style: { display: "block", width: "292px", height: "160px" },
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: "680px",
          height: "410px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg,#070b0e 0%,#0b1117 62%,#07101a 100%)",
          color: "#ffffff",
          border: "3px solid #b88700",
          borderRadius: "2px",
          padding: "22px 20px 18px",
          fontFamily: "Arial, Helvetica, sans-serif",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffb000",
              border: "2px solid #9a6900",
              borderRadius: "4px",
              padding: "7px 16px",
              fontSize: "14px",
              fontWeight: 800,
            }}
          >
            {submission.approvedLicenseType.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", width: "100%", alignItems: "center", marginTop: "2px" }}>
          <div style={{ display: "flex", flexDirection: "column", width: "51%", paddingRight: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", fontFamily: "Georgia, serif", fontSize: "27px", fontWeight: 700 }}>
              <span style={{ color: "#ffb000", marginRight: "9px" }}>●</span>
              {county}
            </div>
            <div style={{ color: "#ffb000", fontSize: "38px", lineHeight: 1.15, fontWeight: 800, marginTop: "6px" }}>
              {formatMoney(submission.approvedAskingPrice)}
            </div>
            <div style={{ fontSize: "18px", marginTop: "5px" }}>{submission.approvedLicenseType}</div>
            <div style={{ color: "#29d13a", fontSize: "16px", marginTop: "2px" }}>Transferable / Available</div>
            <div style={{ color: "#d8e1e8", fontSize: "14px", lineHeight: 1.45, marginTop: "10px" }}>
              {countyDescription(county)}
            </div>
          </div>

          <div
            style={{
              width: "49%",
              height: "190px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#07192a",
              border: "1px solid #102d46",
              overflow: "hidden",
            }}
          >
            {map}
          </div>
        </div>

        <div style={{ display: "flex", gap: "14px", width: "100%", marginTop: "18px" }}>
          <div
            style={{
              width: "48%",
              height: "54px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #b88700",
              color: "#ffffff",
              fontSize: "17px",
              fontWeight: 800,
            }}
          >
            INQUIRE
          </div>
          <div
            style={{
              width: "52%",
              height: "54px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(180deg,#ffc13a 0%,#f4a900 100%)",
              border: "2px solid #b88700",
              color: "#070707",
              fontSize: "17px",
              fontWeight: 900,
            }}
          >
            SUBMIT AN OFFER
          </div>
        </div>
        <div style={{ display: "none" }}>{listingUrl}</div>
      </div>
    ),
    {
      width: 680,
      height: 410,
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=300",
      },
    }
  );
}
