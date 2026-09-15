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
    const observer = new MutationObserver(rewrite);
    observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['href'] });
    [100, 300, 800, 1500, 3000].forEach((delay) => window.setTimeout(rewrite, delay));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
