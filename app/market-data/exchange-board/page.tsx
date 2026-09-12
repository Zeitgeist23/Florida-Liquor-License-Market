import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FLLM Exchange Board | Florida Liquor License Market",
  description:
    "The official FLLM Exchange Board market overview from Florida Liquor License Market.",
  alternates: {
    canonical: "https://www.floridaliquorlicensemarket.com/market-data/exchange-board",
  },
  robots: { index: true, follow: true },
};

export default function ExchangeBoardStaticPage() {
  return (
    <main
      style={{
        margin: 0,
        padding: 0,
        minHeight: "100vh",
        background: "#020d18",
        lineHeight: 0,
        overflowX: "hidden",
      }}
    >
      <img
        src="/market-data/exchange-board/static-image?v=20260911-2"
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
        }}
      />
    </main>
  );
}
