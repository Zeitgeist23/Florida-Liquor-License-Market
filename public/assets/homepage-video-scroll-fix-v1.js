(() => {
  const LINK_SELECTOR = '.video-invite-action[href="#market-report"]';
  const TARGET_ID = 'market-report';
  const STYLE_ID = 'homepage-video-scroll-fix-v1-styles';
  const SCROLL_DURATION_MS = 1100;

  let smoothScrollActive = false;
  let restoreTimer = 0;
  let previousHtmlOverflowAnchor = '';
  let previousBodyOverflowAnchor = '';

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      #market-report,
      #market-report .report-video,
      #market-report-narration-player-v1,
      #homepage-market-report-real-video {
        overflow-anchor: none !important;
      }
      #market-report {
        scroll-margin-top: 20px;
      }
    `;
    document.head.appendChild(style);
  }

  function disableScrollAnchoring() {
    const html = document.documentElement;
    const body = document.body;

    previousHtmlOverflowAnchor = html.style.overflowAnchor;
    previousBodyOverflowAnchor = body?.style.overflowAnchor || '';
    html.style.overflowAnchor = 'none';
    if (body) body.style.overflowAnchor = 'none';
  }

  function restoreScrollAnchoring() {
    window.clearTimeout(restoreTimer);
    restoreTimer = 0;

    const html = document.documentElement;
    const body = document.body;
    html.style.overflowAnchor = previousHtmlOverflowAnchor;
    if (body) body.style.overflowAnchor = previousBodyOverflowAnchor;
    smoothScrollActive = false;
  }

  function removePersistentVideoHash() {
    if (window.location.hash !== '#market-report') return;
    window.history.replaceState(
      window.history.state,
      '',
      `${window.location.pathname}${window.location.search}`,
    );
  }

  function cancelSmoothScrollOnUserInput() {
    if (!smoothScrollActive) return;

    const html = document.documentElement;
    const previousScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo({ top: window.scrollY, behavior: 'auto' });
    window.requestAnimationFrame(() => {
      html.style.scrollBehavior = previousScrollBehavior;
    });
    restoreScrollAnchoring();
  }

  function scrollToMarketReport(event) {
    const link = event.target instanceof Element
      ? event.target.closest(LINK_SELECTOR)
      : null;
    if (!(link instanceof HTMLAnchorElement)) return;

    const target = document.getElementById(TARGET_ID);
    if (!(target instanceof HTMLElement)) return;

    event.preventDefault();
    event.stopPropagation();
    removePersistentVideoHash();
    disableScrollAnchoring();
    smoothScrollActive = true;

    const targetTop = Math.max(
      0,
      window.scrollY + target.getBoundingClientRect().top - 20,
    );
    window.scrollTo({ top: targetTop, behavior: 'smooth' });

    window.clearTimeout(restoreTimer);
    restoreTimer = window.setTimeout(restoreScrollAnchoring, SCROLL_DURATION_MS);
  }

  function handleKeydown(event) {
    if (!smoothScrollActive) return;
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) {
      cancelSmoothScrollOnUserInput();
    }
  }

  function initialize() {
    installStyles();
    document.addEventListener('click', scrollToMarketReport, true);
    window.addEventListener('wheel', cancelSmoothScrollOnUserInput, { passive: true });
    window.addEventListener('touchstart', cancelSmoothScrollOnUserInput, { passive: true });
    window.addEventListener('keydown', handleKeydown, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
