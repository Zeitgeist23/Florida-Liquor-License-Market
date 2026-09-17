(() => {
  const LEGACY = "https://florida-liquor-license-market.jwigg023.chatgpt.site/license-lookup";
  const NATIVE = "/license-lookup";
  const STYLE_ID = "landing-resources-centered-position";

  function installPositionStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .primary-nav .live-resources-menu {
        left: var(--live-resources-menu-left, 50%) !important;
        right: auto !important;
        transform: none !important;
      }
      .primary-nav .live-resources-menu::before {
        left: var(--live-resources-arrow-left, 50%) !important;
        right: auto !important;
        transform: translateX(-50%) rotate(45deg) !important;
      }
      @media (max-width:820px) {
        .primary-nav .live-resources-menu {
          left:50% !important;
          right:auto !important;
          transform:translateX(-50%) !important;
        }
        .primary-nav .live-resources-menu::before {
          left:50% !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function positionResourcesMenus() {
    installPositionStyles();
    if (window.innerWidth <= 820) return;

    document.querySelectorAll('.live-resources-menu').forEach((menu) => {
      if (!(menu instanceof HTMLElement)) return;
      const dropdown = menu.closest('.live-resources-dropdown');
      const trigger = dropdown?.querySelector('.live-nav-trigger');
      if (!(dropdown instanceof HTMLElement) || !(trigger instanceof HTMLElement)) return;

      const triggerRect = trigger.getBoundingClientRect();
      const dropdownRect = dropdown.getBoundingClientRect();
      const computedWidth = Number.parseFloat(window.getComputedStyle(menu).width) || 930;
      const menuWidth = Math.min(computedWidth, window.innerWidth - 24);
      const triggerCenter = triggerRect.left + triggerRect.width / 2;
      const desiredViewportLeft = triggerCenter - menuWidth / 2;
      const viewportLeft = Math.max(12, Math.min(desiredViewportLeft, window.innerWidth - menuWidth - 12));
      const localLeft = viewportLeft - dropdownRect.left;
      const arrowLeft = triggerCenter - viewportLeft;

      menu.style.setProperty('--live-resources-menu-left', `${localLeft}px`);
      menu.style.setProperty('--live-resources-arrow-left', `${arrowLeft}px`);
    });
  }

  function ensureFiveToEightCopLink() {
    document.querySelectorAll('.live-license-types-menu').forEach((menu) => {
      if (!(menu instanceof HTMLElement)) return;
      if (menu.querySelector('a[data-five-to-eight-cop="true"]')) return;

      const link = document.createElement('a');
      link.href = '/resources/florida-liquor-license-types#five-to-eight-cop';
      link.textContent = '5COP-8COP Quota Licenses';
      link.dataset.fiveToEightCop = 'true';

      const threePs = Array.from(menu.querySelectorAll('a')).find((item) =>
        (item.textContent || '').replace(/\s+/g, ' ').trim() === '3PS Quota / Package Store'
      );
      if (threePs?.nextSibling) menu.insertBefore(link, threePs.nextSibling);
      else if (threePs) threePs.insertAdjacentElement('afterend', link);
      else menu.appendChild(link);
    });
  }

  function rewrite() {
    document.querySelectorAll('a[href^="' + LEGACY + '"]').forEach((link) => {
      link.setAttribute('href', NATIVE);
      link.removeAttribute('target');
      link.removeAttribute('rel');
    });
    ensureFiveToEightCopLink();
    positionResourcesMenus();
  }

  function start() {
    installPositionStyles();
    rewrite();

    // Only watch for nodes being added. Do not observe href or style mutations:
    // other legacy header scripts may also touch those attributes.
    const observer = new MutationObserver((mutations) => {
      if (mutations.some((mutation) => mutation.addedNodes.length > 0)) rewrite();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });

    const onResourcesHover = (event) => {
      const target = event.target;
      if (!(target instanceof Element) || !target.closest('.live-resources-dropdown')) return;
      window.requestAnimationFrame(positionResourcesMenus);
    };

    document.addEventListener('pointerover', onResourcesHover, true);
    window.addEventListener('resize', positionResourcesMenus, { passive: true });

    [100, 300, 800, 1500, 3000].forEach((delay) => window.setTimeout(rewrite, delay));
    window.setTimeout(() => observer.disconnect(), 5000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
