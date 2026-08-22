"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_PARTS = [
  "/assets/market-report-video-179-part-1.txt",
  "/assets/market-report-video-179-part-2.txt",
  "/assets/market-report-video-179-part-3.txt",
  "/assets/market-report-video-179-part-4.txt",
];

export default function NewsMarketInsightsVideoFix() {
  const [open, setOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loadError, setLoadError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const card = target.closest('a.news-video-card[href="/#market-data"]');
      if (!card) return;
      event.preventDefault();
      event.stopPropagation();
      setOpen(true);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (!open || videoUrl || loadError) return;
    let cancelled = false;

    Promise.all(VIDEO_PARTS.map(async (path) => {
      const response = await fetch(path, { cache: "force-cache" });
      if (!response.ok) throw new Error(`Unable to load ${path}`);
      return (await response.text()).trim();
    }))
      .then((parts) => {
        if (cancelled) return;
        const base64 = parts.join("");
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
        const blobUrl = URL.createObjectURL(new Blob([bytes], { type: "video/mp4" }));
        setVideoUrl(blobUrl);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [open, videoUrl, loadError]);

  useEffect(() => () => {
    if (videoUrl) URL.revokeObjectURL(videoUrl);
  }, [videoUrl]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function syncAudio(force = false) {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio) return;
    if (force || Math.abs(audio.currentTime - video.currentTime) > 0.3) {
      audio.currentTime = video.currentTime;
    }
  }

  function closeModal() {
    videoRef.current?.pause();
    audioRef.current?.pause();
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="news-market-video-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) closeModal();
    }}>
      <section className="news-market-video-modal" role="dialog" aria-modal="true" aria-label="Florida Market Insights video">
        <button type="button" className="news-market-video-close" onClick={closeModal} aria-label="Close video">×</button>
        <div className="news-market-video-title">Florida Liquor License Market Report</div>
        <div className="news-market-video-stage">
          {videoUrl ? (
            <>
              <video
                ref={videoRef}
                src={videoUrl}
                poster="/assets/market-report-studio.png"
                controls
                playsInline
                preload="metadata"
                onPlay={() => {
                  syncAudio(true);
                  void audioRef.current?.play().catch(() => {});
                }}
                onPause={() => audioRef.current?.pause()}
                onSeeking={() => syncAudio(true)}
                onTimeUpdate={() => syncAudio(false)}
                onEnded={() => {
                  audioRef.current?.pause();
                  if (audioRef.current) audioRef.current.currentTime = 0;
                }}
              />
              <audio ref={audioRef} src="/assets/market-report-episode-1.wav" preload="metadata" />
            </>
          ) : loadError ? (
            <div className="news-market-video-status">The FLLM Market Insights video could not be loaded. Please refresh the page and try again.</div>
          ) : (
            <div className="news-market-video-status">Loading Florida Market Insights…</div>
          )}
        </div>
        <p className="news-market-video-note">Use the video controls to play, pause, seek, or expand the FLLM Market Insights report without leaving this page.</p>
      </section>

      <style jsx global>{`
        .news-market-video-backdrop{position:fixed;inset:0;z-index:20000;display:grid;place-items:center;padding:24px;background:rgba(0,7,13,.92);backdrop-filter:blur(5px)}
        .news-market-video-modal{position:relative;width:min(1100px,92vw);max-height:92vh;padding:56px 22px 20px;border:2px solid #f6a700;border-radius:12px;background:#03111e;box-shadow:0 32px 100px rgba(0,0,0,.75)}
        .news-market-video-title{position:absolute;top:0;left:0;right:0;height:46px;display:flex;align-items:center;padding:0 70px 0 18px;border-bottom:1px solid rgba(246,167,0,.3);color:#fff;font:900 14px/1 Arial,Helvetica,sans-serif;letter-spacing:.06em;text-transform:uppercase}
        .news-market-video-close{position:absolute;top:7px;right:10px;z-index:2;width:34px;height:34px;border:2px solid #f6a700;border-radius:50%;background:#061728;color:#f6a700;cursor:pointer;font:700 24px/1 Arial,sans-serif}
        .news-market-video-close:hover,.news-market-video-close:focus-visible{background:#f6a700;color:#061728;outline:none}
        .news-market-video-stage{display:grid;place-items:center;min-height:320px;overflow:hidden;border:1px solid rgba(246,167,0,.6);border-radius:8px;background:#000}
        .news-market-video-stage video{display:block;width:100%;max-height:72vh;background:#000}
        .news-market-video-status{padding:48px 24px;color:#fff;text-align:center;font:700 16px/1.5 Arial,Helvetica,sans-serif}
        .news-market-video-note{margin:12px 4px 0;color:#c7d2df;font:500 13px/1.5 Arial,Helvetica,sans-serif;text-align:center}
        @media(max-width:700px){.news-market-video-backdrop{padding:10px}.news-market-video-modal{width:96vw;padding:52px 10px 14px}.news-market-video-stage{min-height:220px}.news-market-video-note{font-size:12px}}
      `}</style>
    </div>
  );
}
