import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "FLLM Exchange Board | Florida Liquor License Market",
  description:
    "The official FLLM Exchange Board market overview from Florida Liquor License Market.",
  alternates: {
    canonical: "https://www.floridaliquorlicensemarket.com/market-data/exchange-board",
  },
  robots: { index: true, follow: true },
};

function getApprovedStaticImage() {
  const encoded = Array.from({ length: 8 }, (_, index) =>
    readFileSync(
      join(
        process.cwd(),
        "public",
        "assets",
        `fllm-static-b64-${String(index).padStart(2, "0")}.txt`,
      ),
      "utf8",
    ).trim(),
  ).join("");

  return `data:image/webp;base64,${encoded}`;
}

export default function ExchangeBoardStaticPage() {
  const imageSrc = getApprovedStaticImage();

  return (
    <main
      style={{
        margin: 0,
        padding: 0,
        minHeight: "100vh",
        background: "#020d18",
        overflowX: "hidden",
      }}
    >
      <img
        src={imageSrc}
        alt="FLLM Exchange Board — Florida Liquor License Market"
        width={1024}
        height={1536}
        style={{
          display: "block",
          width: "100%",
          maxWidth: "1024px",
          height: "auto",
          margin: "0 auto",
          padding: 0,
          border: 0,
        }}
      />
    </main>
  );
}
