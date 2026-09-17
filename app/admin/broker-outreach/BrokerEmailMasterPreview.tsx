"use client";

import { useEffect, useMemo, useState } from "react";

type Mode = "female" | "male" | "neutral";
type ViewMode = "email" | "featured" | "program";

type Preview = {
  subject: string;
  html: string;
  text: string;
};

type Payload = {
  template_previews?: Partial<Record<Mode, Preview>>;
};

const labels: Record<Mode, string> = {
  female: "Female / Emma Brooks",
  male: "Male / Alex Morgan",
  neutral: "Neutral",
};

function sharpenPreviewHtml(html: string, mode: Mode) {
  if (mode === "female") {
    return html.replaceAll(
      "/assets/brokers/fllm-sample-female-ai.jpg",
      "/assets/brokers/sample-brunette-broker.svg",
    );
  }
  if (mode === "male") {
    return html.replaceAll(
      "/assets/brokers/fllm-sample-male-ai.jpg",
      "/assets/brokers/alex-morgan-headroom.jpg",
    );
  }
  return html;
}

export default function BrokerEmailMasterPreview() {
  const [previews, setPreviews] = useState<Partial<Record<Mode, Preview>>>({});
  const [mode, setMode] = useState<Mode>("female");
  const [view, setView] = useState<ViewMode>("email");
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function load() {
      try {
        const response = await fetch("/api/admin/broker-outreach", { cache: "no-store" });
        if (cancelled) return;
        if (response.status === 401) {
          timer = setTimeout(load, 1500);
          return;
        }
        if (!response.ok) return;
        const payload = (await response.json()) as Payload;
        const incoming = payload.template_previews || {};
        setPreviews(incoming);
        setReady(Boolean(incoming.female || incoming.male || incoming.neutral));
        if (incoming.female || incoming.male || incoming.neutral) setOpen(true);
      } catch {
        if (!cancelled) timer = setTimeout(load, 2000);
      }
    }

    void load();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, []);

  const preview = useMemo(
    () => previews[mode] || previews.female || previews.male || previews.neutral || null,
    [mode, previews],
  );

  if (!ready || !preview) return null;

  const sampleUrl = mode === "male"
    ? "/brokers/sample-featured-listing-male"
    : "/brokers/sample-featured-listing";
  const previewHtml = sharpenPreviewHtml(preview.html, mode);

  return (
    <>
      <button
        type="button"
        className="broker-email-preview-launch"
        onClick={() => setOpen(true)}
      >
        ✉ VIEW BROKER EMAIL
      </button>

      {open && (
        <div className="broker-email-preview-backdrop" role="dialog" aria-modal="true" aria-label="Broker outreach email template preview">
          <div className="broker-email-preview-modal">
            <header className="broker-email-preview-toolbar">
              <div>
                <span>MASTER OUTREACH EMAIL</span>
                <h2>Broker Campaign Email Preview</h2>
                <p>The email is shown at its real reading width. Use the view buttons below to inspect the complete Featured listing page and the complete broker listing program page at full browser width.</p>
              </div>
              <button type="button" className="broker-email-preview-close" onClick={() => setOpen(false)} aria-label="Close email preview">×</button>
            </header>

            <div className="broker-email-preview-tabs" role="tablist" aria-label="Email presentation">
              {(["female", "male", "neutral"] as Mode[]).map((item) => (
                <button
                  type="button"
                  key={item}
                  className={mode === item ? "active" : ""}
                  onClick={() => setMode(item)}
                >
                  {labels[item]}
                </button>
              ))}
            </div>

            <div className="broker-email-preview-meta">
              <div><span>Presentation</span><strong>{labels[mode]}</strong></div>
              <div><span>Subject</span><strong>{preview.subject}</strong></div>
              <div className="broker-email-view-switcher" role="group" aria-label="Preview view">
                <button className={view === "email" ? "active" : ""} onClick={() => setView("email")}>Email</button>
                <button className={view === "featured" ? "active" : ""} onClick={() => setView("featured")}>Full Featured Listing</button>
                <button className={view === "program" ? "active" : ""} onClick={() => setView("program")}>Full Broker Listing Page</button>
              </div>
            </div>

            <div className={`broker-email-preview-content view-${view}`}>
              {view === "email" && (
                <iframe
                  className="broker-email-master-iframe"
                  title={`${labels[mode]} broker outreach email`}
                  srcDoc={previewHtml}
                />
              )}
              {view === "featured" && (
                <iframe
                  className="broker-email-live-page"
                  title="Complete Featured broker listing sample"
                  src={sampleUrl}
                />
              )}
              {view === "program" && (
                <iframe
                  className="broker-email-live-page"
                  title="Complete FLLM broker listing program page"
                  src="/brokers/list-your-license"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}