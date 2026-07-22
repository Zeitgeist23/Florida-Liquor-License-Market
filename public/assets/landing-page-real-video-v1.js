(() => {
  const STYLE_ID = "landing-page-real-video-styles-v1";
  const VIDEO_ID = "homepage-market-report-real-video";
  const AUDIO_CLASS = "homepage-market-report-narration";
  const VIDEO_BASE64 = [
    'AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAiobW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AACuzgAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAB9N0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAABAAAAAAACuzgAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAKAAAABaAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAArs4AACAAAABAAAAAAdLbWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAABAAAAswABVxAAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAAG9m1pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAABrZzdGJsAAAAsnN0c2QAAAAAAAAAAQAAAKJhdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAKAAWgBIAAAASAAAAAAAAAABFUxhdmM2MS4xOS4xMDEgbGlieDI2NAAAAAAAAAAAAAAAGP//AAAAOGF2Y0MBZAAM/+EAGmdkAAyscgRCjfkhAAADAAEAAAMAAg8UKYRgAQAHaOhDgTSyLP34+AAAAAAUYnRydAAAAAAAAAEZAAAAAAAAABhzdHRzAAAAAAAAAAEAAACzAABAAAAAABRzdHNzAAAAAAAAAAEAAAABAAACwGN0dHMAAAAAAAAAVgAAAAEAAIAAAAAAAQACgAAAAAABAAEAAAAAAAMAAAAAAAAABAAAQAAAAAABAAEAAAAAAAIAAEAAAAAAAQACgAAAAAABAAEAAAAAAAMAAAAAAAAABAAAQAAAAAABAAKAAAAAAAEAAQAAAAAAAwAAAAAAAAAEAABAAAAAAAEAAIAAAAAAAQACgAAAAAABAAEAAAAAAAMAAAAAAAAABAAAQAAAAAABAAKAAAAAAAEAAQAAAAAAAwAAAAAAAAAEAABAAAAAAAEAAcAAAAAAAQAAwAAAAAACAAAAAAAAAAIAAEAAAAAAAQACgAAAAAABAAEAAAAAAAMAAAAAAAAABAAAQAAAAAABAAKAAAAAAAEAAQAAAAAAAwAAAAAAAAAEAABAAAAAAAEAAoAAAAAAAQABAAAAAAADAAAAAAAAAAQAAEAAAAAAAQACgAAAAAABAAEAAAAAAAMAAAAAAAAABAAAQAAAAAABAAKAAAAAAAEAAQAAAAAAAwAAAAAAAAAEAABAAAAAAAEAAoAAAAAAAQABAAAAAAADAAAAAAAAAAQAAEAAAAAAAQAAwAAAAAABAABAAAAAAAEAAoAAAAAAAQABAAAAAAADAAAAAAAAAAQAAEAAAAAAAQACgAAAAAABAAEAAAAAAAMAAAAAAAAABAAAQAAAAAABAAKAAAAAAAEAAQAAAAAAAwAAAAAAAAAEAABAAAAAAAEAAoAAAAAAAQABAAAAAAADAAAAAAAAAAQAAEAAAAAAAQACgAAAAAABAAEAAAAAAAMAAAAAAAAABAAAQAAAAAABAAKAAAAAAAEAAQAAAAAAAwAAAAAAAAAEAABAAAAAAAEAAoAAAAAAAQABAAAAAAADAAAAAAAAAAQAAEAAAAAAAQABQAAAAAABAACAAAAAAAEAAAAAAAAAAQAAQAAAAAAcc3RzYwAAAAAAAAABAAAAAQAAALMAAAABAAAC4HN0c3oAAAAAAAAAAAAAALMAAAeyAAAAPQAAACMAAAAfAAAAIQAAAA0AAAAMAAAADQAAAA4AAAAPAAAAHAAAABEAAAAOAAAA0AAAABgAAAASAAAAEgAAAA4AAAAUAAAAFAAAABQAAAATAAAAHAAAAA4AAAANAAAADQAAAA0AAAANAAAADQAAAA0AAAANAAAAFwAAAKgAAAAlAAAADgAAAA4AAAAVAAAADgAAAA4AAAAOAAAADgAAACIAAAANAAAADQAAAA0AAAANAAAADQAAAA0AAAANAAAADQAAACQAAAAPAAAADQAAAA0AAAANAAAADQAAAMcAAAAfAAAAFgAAABcAAAAVAAAADgAAAA4AAAAOAAAADgAAACIAAAATAAAADQAAAA0AAAANAAAADQAAAA0AAAANAAAADQAAAF0AAAAZAAAAFgAAAA4AAAAWAAAADQAAAA0AAAANAAAADgAAAFcAAAAZAAAAEgAAAA4AAAANAAAADgAAAA4AAAATAAAAEwAAAFYAAAAVAAAADgAAAA4A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'
  ].join("");
  let syncing = false;

  function normalizedText(element) {
    return (element?.textContent || "").replace(/\s+/g, " ").trim();
  }

  function findBriefingSection() {
    const label = Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,div"))
      .find((element) => /video briefing/i.test(normalizedText(element)));
    return label?.closest("section") || null;
  }

  function findStudioImage(section) {
    return section?.querySelector(
      'img[src*="market-report-studio"],img[alt*="market report" i],img[alt*="newscast" i]'
    ) || null;
  }

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${VIDEO_ID}{
        width:100%;height:auto;display:block;object-fit:cover;background:#000;
      }
      body:not(.market-insights-video-popup-open) audio.${AUDIO_CLASS}{
        position:absolute!important;width:1px!important;height:1px!important;
        opacity:0!important;pointer-events:none!important;overflow:hidden!important;
        clip:rect(0 0 0 0)!important;clip-path:inset(50%)!important;
      }
    `;
    document.head.appendChild(style);
  }

  function synchronize(video, audio) {
    if (video.dataset.narrationSynchronized === "true") return;
    video.dataset.narrationSynchronized = "true";
    audio.classList.add(AUDIO_CLASS);

    const setAudioTime = () => {
      if (!Number.isFinite(video.currentTime) || !Number.isFinite(audio.duration)) return;
      if (Math.abs(audio.currentTime - video.currentTime) < 0.18) return;
      syncing = true;
      audio.currentTime = Math.min(video.currentTime, audio.duration || video.currentTime);
      syncing = false;
    };

    const setVideoTime = () => {
      if (syncing || !Number.isFinite(audio.currentTime)) return;
      if (Math.abs(video.currentTime - audio.currentTime) < 0.32) return;
      syncing = true;
      video.currentTime = Math.min(audio.currentTime, video.duration || audio.currentTime);
      syncing = false;
    };

    video.addEventListener("play", async () => {
      setAudioTime();
      audio.playbackRate = video.playbackRate;
      audio.volume = video.volume;
      audio.muted = video.muted;
      try { await audio.play(); } catch { video.pause(); }
    });
    video.addEventListener("pause", () => {
      if (!audio.paused) audio.pause();
    });
    video.addEventListener("seeking", setAudioTime);
    video.addEventListener("seeked", setAudioTime);
    video.addEventListener("ratechange", () => { audio.playbackRate = video.playbackRate; });
    video.addEventListener("volumechange", () => {
      audio.volume = video.volume;
      audio.muted = video.muted;
    });
    video.addEventListener("ended", () => {
      audio.pause();
      if (Number.isFinite(audio.duration)) audio.currentTime = audio.duration;
    });

    audio.addEventListener("play", () => {
      setVideoTime();
      if (video.paused) video.play().catch(() => {});
    });
    audio.addEventListener("pause", () => {
      if (!video.paused && !video.ended) video.pause();
    });
    audio.addEventListener("seeking", setVideoTime);
    audio.addEventListener("seeked", setVideoTime);
    audio.addEventListener("timeupdate", setVideoTime);
    audio.addEventListener("ratechange", () => { video.playbackRate = audio.playbackRate; });
    audio.addEventListener("volumechange", () => {
      video.volume = audio.volume;
      video.muted = audio.muted;
    });
    audio.addEventListener("ended", () => {
      video.pause();
      if (Number.isFinite(video.duration)) video.currentTime = video.duration;
    });
  }

  function installVideo() {
    const existingVideo = document.getElementById(VIDEO_ID);
    const section = findBriefingSection();
    if (!(section instanceof HTMLElement)) return false;
    const audio = section.querySelector("audio");
    if (!(audio instanceof HTMLAudioElement)) return false;

    if (existingVideo instanceof HTMLVideoElement) {
      synchronize(existingVideo, audio);
      return true;
    }

    const image = findStudioImage(section);
    if (!(image instanceof HTMLImageElement)) return false;

    installStyles();
    window.dispatchEvent(new Event("resize"));

    const video = document.createElement("video");
    video.id = VIDEO_ID;
    video.className = image.className;
    video.controls = true;
    video.playsInline = true;
    video.preload = "auto";
    video.poster = image.currentSrc || image.src;
    video.setAttribute("aria-label", "Florida Liquor License Market Report video");
    video.src = `data:video/mp4;base64,${VIDEO_BASE64}`;

    image.replaceWith(video);
    synchronize(video, audio);
    return true;
  }

  function initialize() {
    installVideo();
    [250, 700, 1400, 2600, 4500].forEach((delay) => window.setTimeout(installVideo, delay));
    const observer = new MutationObserver(() => installVideo());
    observer.observe(document.documentElement, { childList:true, subtree:true });
    window.setTimeout(() => observer.disconnect(), 12000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once:true });
  } else {
    initialize();
  }
})();
