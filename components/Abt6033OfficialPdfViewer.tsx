"use client";

import { useEffect, useState } from "react";

export default function Abt6033OfficialPdfViewer({ officialPdfUrl }: { officialPdfUrl: string }) {
  const proxyUrl = "/api/abt-forms/abt-6033/pdf";
  const [viewerUrl, setViewerUrl] = useState(proxyUrl);
  const [usingDirectSource, setUsingDirectSource] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function chooseViewerSource() {
      try {
        const response = await fetch(proxyUrl, { cache: "no-store" });
        const contentType = response.headers.get("content-type") || "";
        if (!response.ok || !contentType.toLowerCase().includes("pdf")) {
          throw new Error("FLLM PDF proxy unavailable");
        }
      } catch {
        if (!cancelled) {
          setViewerUrl(officialPdfUrl);
          setUsingDirectSource(true);
        }
      }
    }

    void chooseViewerSource();
    return () => {
      cancelled = true;
    };
  }, [officialPdfUrl]);

  return (
    <section className="abt-form-workspace">
      <div className="abt-workspace-tabs" role="tablist" aria-label="ABT-6033 form viewer">
        <button className="is-active" type="button" role="tab" aria-selected="true">
          Official PDF Viewer
        </button>
      </div>

      <div className="abt-viewer-panel">
        <div className="abt-viewer-toolbar">
          <div>
            <strong>Current official DBPR ABT-6033</strong>
            <small>
              {usingDirectSource
                ? "Displayed directly from the official DBPR source because the FLLM proxy was unavailable."
                : "Displayed through FLLM from the current official DBPR source."}
            </small>
          </div>
          <div>
            <a className="btn btn-outline" href={officialPdfUrl} target="_blank" rel="noreferrer">
              Open Official PDF
            </a>
            <a className="btn btn-gold" href={`${proxyUrl}?download=1`}>
              Download Form
            </a>
          </div>
        </div>

        <iframe
          src={`${viewerUrl}#toolbar=1&navpanes=0`}
          title="Official DBPR ABT-6033 Quota Beverage License Drawing Entry Form"
        />

        <p className="abt-viewer-help">
          Complete available PDF fields in the viewer, then print or save the form. If the embedded viewer is blocked by the official source, use “Open Official PDF” above.
        </p>
      </div>
    </section>
  );
}
