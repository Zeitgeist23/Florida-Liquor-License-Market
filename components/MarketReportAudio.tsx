"use client";

import { useEffect, useRef, useState } from "react";

const PART_URLS = Array.from({ length: 7 }, (_, index) =>
  `/assets/market-report-audio-part-${String(index + 1).padStart(2, "0")}-v1.txt`,
);

type PlayerStatus = "idle" | "loading" | "ready" | "error";

export default function MarketReportAudio() {
  const [audioUrl, setAudioUrl] = useState("");
  const [status, setStatus] = useState<PlayerStatus>("idle");
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  async function loadAndPlay() {
    if (status === "loading") return;

    if (audioUrl) {
      await audioRef.current?.play();
      return;
    }

    setStatus("loading");

    try {
      const parts = await Promise.all(
        PART_URLS.map(async (url) => {
          const response = await fetch(url, { cache: "force-cache" });
          if (!response.ok) throw new Error(`Audio file part failed: ${response.status}`);
          return response.text();
        }),
      );

      const cleanBase64 = parts.join("").replace(/\s+/g, "");
      const binary = window.atob(cleanBase64);
      const bytes = new Uint8Array(binary.length);
      for (let index = 0; index < binary.length; index += 1) {
        bytes[index] = binary.charCodeAt(index);
      }

      const objectUrl = URL.createObjectURL(new Blob([bytes], { type: "audio/mpeg" }));
      setAudioUrl(objectUrl);
      setStatus("ready");

      window.setTimeout(() => {
        audioRef.current?.play().catch(() => undefined);
      }, 0);
    } catch (error) {
      console.error("Unable to load the market report audio", error);
      setStatus("error");
    }
  }

  const buttonLabel =
    status === "loading"
      ? "Loading audio…"
      : status === "error"
        ? "Audio did not load — try again"
        : "Play the 98-Second Audio Briefing";

  return (
    <div className="market-audio-player">
      <img
        className="market-audio-image"
        src="/assets/market-report-studio.png"
        alt="Two professional presenters at a Florida business-news desk"
      />
      <div className="market-audio-overlay">
        <strong>Episode 1 is available now</strong>
        <button type="button" onClick={loadAndPlay} disabled={status === "loading"}>
          <span aria-hidden="true">▶</span>
          {buttonLabel}
        </button>
        <audio ref={audioRef} controls preload="none" src={audioUrl || undefined}>
          Your browser does not support the audio presentation.
        </audio>
      </div>

      <style jsx>{`
        .market-audio-player {
          position: relative;
          overflow: hidden;
          min-height: 300px;
          border: 1px solid rgba(246, 167, 0, 0.48);
          background: #020913;
          box-shadow: 0 18px 46px rgba(0, 0, 0, 0.38);
        }
        .market-audio-image {
          display: block;
          width: 100%;
          height: 100%;
          min-height: 300px;
          object-fit: cover;
        }
        .market-audio-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
          padding: 24px;
          background: linear-gradient(180deg, transparent 38%, rgba(2, 9, 19, 0.94) 100%);
          color: #fff;
          text-align: center;
        }
        .market-audio-overlay strong {
          font-size: 18px;
          letter-spacing: 0.02em;
        }
        button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-width: 285px;
          padding: 13px 20px;
          border: 1px solid #f6a700;
          border-radius: 999px;
          background: #071a2c;
          color: #fff;
          font: 700 15px/1.2 Arial, sans-serif;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.42);
        }
        button:hover:not(:disabled) {
          background: #0d2a44;
        }
        button:disabled {
          cursor: progress;
          opacity: 0.8;
        }
        button span {
          display: grid;
          width: 29px;
          height: 29px;
          place-items: center;
          border-radius: 50%;
          background: #f6a700;
          color: #06111c;
          padding-left: 2px;
        }
        audio {
          display: ${audioUrl ? "block" : "none"};
          width: min(92%, 520px);
          height: 42px;
        }
        @media (max-width: 640px) {
          .market-audio-player,
          .market-audio-image {
            min-height: 240px;
          }
          .market-audio-overlay {
            padding: 16px;
          }
          button {
            min-width: 0;
            width: 100%;
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}
