(() => {
  const src = "/assets/market-report-narration-v2.js?v=1";
  if (document.querySelector('script[data-market-report-narration="v2"]')) return;

  const script = document.createElement("script");
  script.src = src;
  script.defer = true;
  script.dataset.marketReportNarration = "v2";
  document.head.appendChild(script);
})();