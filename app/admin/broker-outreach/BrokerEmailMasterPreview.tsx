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
  let rendered = html;
  if (mode === "female") {
    rendered = rendered.replaceAll(
      "/assets/brokers/fllm-sample-female-ai.jpg",
      "/assets/brokers/sample-brunette-broker.svg",
    );
  } else if (mode === "male") {
    rendered = rendered.replaceAll(
      "/assets/brokers/fllm-sample-male-ai.jpg",
      "/assets/brokers/alex-morgan-headroom.jpg",
    );
  }

  const sampleUrl = mode === "male"
    ? "/brokers/sample-featured-listing-male"
    : "/brokers/sample-featured-listing";
  const fullListing = `
    <div style="max-width:760px;margin:30px auto 0;padding-top:24px;border-top:1px solid #d8dde1;">
      <div style="font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#b17600;font-weight:800;margin-bottom:7px;">FULL FEATURED LISTING PAGE</div>
      <div style="font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.2;color:#071b2b;font-weight:700;margin-bottom:9px;">See the complete broker-branded listing presentation</div>
      <p style="margin:0 0 14px;color:#46545d;font-size:14px;line-height:1.55;">The image below shows the full Featured listing-page layout — license details, broker identity, buyer inquiry form, market context, appraisal and financing modules.</p>
      <a href="${sampleUrl}" style="text-decoration:none;display:block;">
        <img src="/assets/brokers/fllm-featured-broker-sample-static.svg" alt="Full FLLM Featured broker listing page" style="display:block;width:100%;height:auto;border:1px solid #b78616;border-radius:8px;background:#061b2b;">
      </a>
      <div style="margin-top:12px;text-align:center;"><a href="${sampleUrl}" style="display:inline-block;padding:11px 17px;background:#f5aa14;color:#071421;text-decoration:none;font-weight:800;border-radius:5px;">Open the full Featured listing page</a></div>
    </div>`;

  return rendered.includes("</body>")
    ? rendered.replace("</body>", `${fullListing}</body>`)
    : `${rendered}${fullListing}`;
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
                <p>The email is shown at its real reading width. The email itself now includes a full-page Featured listing image, and the view buttons below let you inspect both live pages at full browser width.</p>
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