"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import MarketReportAudio from "./MarketReportAudio";

export default function MarketReportAudioPortal() {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;

    const findTarget = () => {
      if (cancelled) return;

      const element = document.querySelector("#market-report .report-video");
      if (element instanceof HTMLElement) {
        element.classList.add("market-audio-mounted");
        setTarget(element);
        return;
      }

      attempts += 1;
      if (attempts < 20) window.setTimeout(findTarget, 250);
    };

    findTarget();

    return () => {
      cancelled = true;
      target?.classList.remove("market-audio-mounted");
    };
  }, [target]);

  if (!target) return null;

  return createPortal(
    <>
      <MarketReportAudio />
      <style jsx global>{`
        #market-report .report-video.market-audio-mounted > .report-screen,
        #market-report .report-video.market-audio-mounted > [role="img"] {
          display: none !important;
        }
        #market-report .report-video.market-audio-mounted {
          display: block !important;
        }
      `}</style>
    </>,
    target,
  );
}
