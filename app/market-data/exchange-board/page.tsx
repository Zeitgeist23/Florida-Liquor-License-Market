import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "FLLM Exchange Board | Florida Liquor License Market",
  description:
    "The official FLLM Exchange Board market overview from Florida Liquor License Market.",
  alternates: {
    canonical: "https://www.floridaliquorlicensemarket.com/market-data/exchange-board",
  },
  robots: { index: true, follow: true },
};

function getStaticImageSrc() {
  const names = Array.from({ length: 8 }, (_, index) =>
    `fllm-static-b64-${String(index).padStart(2, "0")}.txt`,
  );

  const encoded = names
    .map((name) =>
      readFileSync(join(process.cwd(), "public", "assets", name), "utf8").trim(),
    )
    .join("");

  return `data:image/webp;base64,${encoded}`;
}

export default function ExchangeBoardStaticPage() {
  const imageSrc = getStaticImageSrc();

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
        width={1400}
        height={2100}
        style={{
          display: "block",
          width: "100%",
          maxWidth: "1400px",
          height: "auto",
          margin: "0 auto",
          padding: 0,
        }}
      />
    </main>
  );
}
