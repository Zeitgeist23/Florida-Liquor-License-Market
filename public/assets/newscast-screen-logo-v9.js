(() => {
  const src = "/assets/market-report-narration-v1.js";
  if (document.querySelector(`script[src="${src}"]`)) return;

  const script = document.createElement("script");
  script.src = src;
  script.defer = true;
  document.head.appendChild(script);
})();
