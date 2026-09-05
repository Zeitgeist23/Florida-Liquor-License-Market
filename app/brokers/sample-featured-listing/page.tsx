import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";

export const metadata: Metadata = {
  title: "Sample Featured Broker Listing | FLLM",
  description: "Fictitious Featured broker listing detail-page example for Florida Liquor License Market.",
  robots: { index: false, follow: false },
};

export default function Page() {
  const imageSrc = fs.readFileSync(
    path.join(process.cwd(), "public/assets/brokers/featured-broker-approved-preview.txt"),
    "utf8"
  );

  return (
    <main
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        background: "#050607",
        overflowX: "hidden",
      }}
    >
      <img
        src={imageSrc}
        alt="Approved Featured Broker Listing Preview"
        style={{
          display: "block",
          width: "100%",
          maxWidth: "768px",
          height: "auto",
          margin: "0 auto",
        }}
      />
    </main>
  );
}
