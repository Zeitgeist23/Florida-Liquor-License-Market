"use client";

import { useEffect, useState } from "react";

export default function ExchangeStaticClient() {
  const [src, setSrc] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadImage() {
      try {
        const parts: string[] = [];
        for (let index = 0; index < 8; index += 1) {
          const name = String(index).padStart(2, "0");
          const response = await fetch(`/assets/fllm-static-b64-${name}.txt?v=20260912-3`, {
            cache: "no-store",
          });
          if (!response.ok) {
            throw new Error(`Missing image chunk ${name}`);
          }
          parts.push((await response.text()).trim());
        }

        if (!cancelled) {
          setSrc(`data:image/webp;base64,${parts.join("")}`);
        }
      } catch (err) {
        console.error("FLLM Exchange static image failed to load", err);
        if (!cancelled) setError(true);
      }
    }

    loadImage();
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#d8e5ec",
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: 14,
        }}
      >
        Unable to load the FLLM Exchange Board image. Please refresh the page.
      </div>
    );
  }

  if (!src) {
    return (
      <div
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
    );
  }

  return (
    <img
      src={src}
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
  );
}
