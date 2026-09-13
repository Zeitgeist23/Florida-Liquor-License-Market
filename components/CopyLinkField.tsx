"use client";

import { useState } from "react";

type CopyLinkFieldProps = {
  value: string;
};

export default function CopyLinkField({ value }: CopyLinkFieldProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 1800);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="citation-copy">
      <label htmlFor="county-market-page-url">Page URL</label>
      <div className="citation-copy-row">
        <input
          id="county-market-page-url"
          type="text"
          readOnly
          value={value}
          onFocus={(event) => event.currentTarget.select()}
          aria-label="County market data page URL"
        />
        <button type="button" onClick={copyLink}>
          {status === "copied" ? "Copied ✓" : status === "error" ? "Select URL" : "Copy Link"}
        </button>
      </div>
      <span className="citation-copy-status" role="status" aria-live="polite">
        {status === "copied"
          ? "The full page URL has been copied."
          : status === "error"
            ? "Copy was blocked. Select the URL and copy it manually."
            : ""}
      </span>
    </div>
  );
}
