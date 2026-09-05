(() => {
  const ITEMS = [
    { label: "How to Finance a Florida Liquor License", href: "/how-to-finance-florida-liquor-license" },
    { label: "Loan Payment Calculator", href: "/financing/loan-payment-calculator" },
    { label: "Private Lenders", href: "/private-liquor-license-lenders" },
    { label: "Request Financing", href: "/financing#request-financing" },
  ];

  function updateFinanceMenu() {
    const menu = document.querySelector('[data-core-nav-menu="finance"]');
    if (!(menu instanceof HTMLElement)) return false;

    menu.style.width = `${Math.min(350, window.innerWidth - 24)}px`;

    const current = Array.from(menu.querySelectorAll(':scope > a'));
    const alreadyCorrect = current.length === ITEMS.length && ITEMS.every((item, index) => {
      const link = current[index];
      return link instanceof HTMLAnchorElement && link.textContent?.trim() === item.label && link.getAttribute('href') === item.href;
    });
    if (alreadyCorrect) return true;

    menu.replaceChildren(...ITEMS.map((item) => {
      const link = document.createElement('a');
      link.href = item.href;
      link.setAttribute('role', 'menuitem');
      link.textContent = item.label;
      return link;
    }));
    return true;
  }

  function initialize() {
    updateFinanceMenu();
    window.setTimeout(updateFinanceMenu, 100);
    window.setTimeout(updateFinanceMenu, 350);
    window.setTimeout(updateFinanceMenu, 900);
    window.setTimeout(updateFinanceMenu, 1800);
  }

  const observer = new MutationObserver(updateFinanceMenu);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('resize', updateFinanceMenu, { passive: true });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
