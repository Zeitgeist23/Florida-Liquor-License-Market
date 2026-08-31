"use client";

import { useMemo, useState } from "react";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const defaultListingUrl = `${siteUrl}/listings/YOUR-LISTING-URL`;
const defaultAnchorText = "View this Florida liquor license listing on Florida Liquor License Market";

export default function BrokerBacklinkGenerator() {
  const [listingUrl, setListingUrl] = useState(defaultListingUrl);
  const [anchorText, setAnchorText] = useState(defaultAnchorText);
  const [copied, setCopied] = useState(false);

  const normalizedUrl = useMemo(() => {
    const value = listingUrl.trim();
    if (!value) return defaultListingUrl;
    if (value.startsWith("/")) return `${siteUrl}${value}`;
    return value;
  }, [listingUrl]);

  const html = `<a href="${normalizedUrl}">${anchorText.trim() || defaultAnchorText}</a>`;

  async function copyHtml() {
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="broker-backlink-generator" aria-labelledby="broker-link-generator-title">
      <div className="broker-link-field">
        <label htmlFor="fllm-listing-url">Your live FLLM listing URL</label>
        <input
          id="fllm-listing-url"
          type="url"
          value={listingUrl}
          onChange={(event) => setListingUrl(event.target.value)}
          placeholder={defaultListingUrl}
        />
        <small>Paste the exact FLLM URL for your listing after it has been published.</small>
      </div>

      <div className="broker-link-field">
        <label htmlFor="fllm-anchor-text">Link text</label>
        <input
          id="fllm-anchor-text"
          type="text"
          value={anchorText}
          onChange={(event) => setAnchorText(event.target.value)}
        />
        <small>Keep the text descriptive and natural. Do not repeat the same keyword-heavy anchor across many pages.</small>
      </div>

      <div className="broker-link-output">
        <div>
          <span>HTML link code</span>
          <code>{html}</code>
        </div>
        <button type="button" onClick={copyHtml}>{copied ? "Copied" : "Copy HTML"}</button>
      </div>

      <div className="broker-link-preview">
        <span>Preview</span>
        <a href={normalizedUrl}>{anchorText.trim() || defaultAnchorText}</a>
      </div>
    </section>
  );
}
