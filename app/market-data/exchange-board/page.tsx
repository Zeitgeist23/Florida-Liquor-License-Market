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

const loaderScript = `
(() => {
  const image = document.getElementById('fllm-exchange-static-image');
  const status = document.getElementById('fllm-exchange-static-status');
  if (!image) return;

  const files = Array.from({ length: 8 }, (_, index) =>
    '/assets/fllm-static-b64-' + String(index).padStart(2, '0') + '.txt?v=20260912'
  );

  Promise.all(files.map(async (url) => {
    const response = await fetch(url, { cache: 'force-cache' });
    if (!response.ok) throw new Error('Failed to load Exchange image asset');
    return (await response.text()).trim();
  }))
    .then((parts) => {
      image.src = 'data:image/webp;base64,' + parts.join('');
      image.style.display = 'block';
      if (status) status.remove();
    })
    .catch(() => {
      if (status) {
        status.textContent = 'Unable to load the FLLM Exchange Board image. Please refresh the page.';
      }
    });
})();
`;

export default function ExchangeBoardStaticPage() {
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
      <div
        id="fllm-exchange-static-status"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#d8e5ec",
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: 14,
          letterSpacing: ".03em",
        }}
      >
        Loading FLLM Exchange Board…
      </div>

      <img
        id="fllm-exchange-static-image"
        alt="FLLM Exchange Board — Florida Liquor License Market"
        width={1400}
        height={2100}
        style={{
          display: "none",
          width: "100%",
          maxWidth: "1400px",
          height: "auto",
          margin: "0 auto",
          padding: 0,
        }}
      />

      <script dangerouslySetInnerHTML={{ __html: loaderScript }} />
    </main>
  );
}
