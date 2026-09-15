(() => {
  const LEGACY = "https://florida-liquor-license-market.jwigg023.chatgpt.site/license-lookup";
  const NATIVE = "/license-lookup";

  function rewrite() {
    document.querySelectorAll('a[href^="' + LEGACY + '"]').forEach((link) => {
      link.setAttribute('href', NATIVE);
      link.removeAttribute('target');
      link.removeAttribute('rel');
    });
  }

  function start() {
    rewrite();

    // Only watch for nodes being added. Do not observe href mutations: other legacy
    // header scripts can also touch href attributes, and two attribute observers can
    // end up fighting each other and lock the main thread.
    const observer = new MutationObserver((mutations) => {
      if (mutations.some((mutation) => mutation.addedNodes.length > 0)) rewrite();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });

    [100, 300, 800, 1500, 3000].forEach((delay) => window.setTimeout(rewrite, delay));
    window.setTimeout(() => observer.disconnect(), 5000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
