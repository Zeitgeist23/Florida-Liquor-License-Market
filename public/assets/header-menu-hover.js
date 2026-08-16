(() => {
  const OPEN_DELAY_MS = 150;
  const CLOSE_DELAY_MS = 250;
  const DESKTOP_HOVER_QUERY = "(any-hover: hover) and (any-pointer: fine)";

  const definitions = [
    {
      label: "Market Data",
      menuSelector: ".market-data-header-menu",
    },
    {
      label: "Resources",
      menuSelector: ".resources-header-menu",
    },
  ];

  const openTimers = new Map();
  const closeTimers = new Map();

  function normalizedText(element) {
    return (element?.textContent || "").replace(/\s+/g, " ").trim();
  }

  function desktopHoverAvailable() {
    return window.matchMedia(DESKTOP_HOVER_QUERY).matches;
  }

  function entryForTrigger(trigger) {
    if (!(trigger instanceof HTMLAnchorElement)) return null;
    const label = normalizedText(trigger).toLowerCase();
    const definition = definitions.find((item) => item.label.toLowerCase() === label);
    return definition ? { ...definition, trigger } : null;
  }

  function currentEntry(definition) {
    const trigger = Array.from(document.querySelectorAll(".primary-nav a"))
      .find((link) => normalizedText(link).toLowerCase() === definition.label.toLowerCase());
    return trigger instanceof HTMLAnchorElement ? { ...definition, trigger } : null;
  }

  function menuFor(entry) {
    const menu = document.querySelector(entry.menuSelector);
    return menu instanceof HTMLElement ? menu : null;
  }

  function clearTimer(store, key) {
    const timer = store.get(key);
    if (timer) window.clearTimeout(timer);
    store.delete(key);
  }

  function clearEntryTimers(entry) {
    clearTimer(openTimers, entry.label);
    clearTimer(closeTimers, entry.label);
  }

  function isOpen(entry) {
    const menu = menuFor(entry);
    return entry.trigger.getAttribute("aria-expanded") === "true" || Boolean(menu?.classList.contains("is-open"));
  }

  function closeEntry(entry) {
    clearEntryTimers(entry);
    const menu = menuFor(entry);
    menu?.classList.remove("is-open");
    menu?.setAttribute("aria-hidden", "true");
    entry.trigger.setAttribute("aria-expanded", "false");
  }

  function closeOtherEntries(activeEntry) {
    definitions.forEach((definition) => {
      if (definition.label === activeEntry.label) return;
      const entry = currentEntry(definition);
      if (entry) closeEntry(entry);
    });
  }

  function isPointerOrFocusInside(entry) {
    const menu = menuFor(entry);
    const activeElement = document.activeElement;
    const pointerInside = entry.trigger.matches(":hover") || Boolean(menu?.matches(":hover"));
    const focusInside = activeElement instanceof Node && (
      entry.trigger.contains(activeElement) || Boolean(menu?.contains(activeElement))
    );
    return pointerInside || focusInside;
  }

  function openEntry(entry, attempt = 0) {
    clearTimer(openTimers, entry.label);
    clearTimer(closeTimers, entry.label);

    if (!desktopHoverAvailable() || !entry.trigger.isConnected) return;
    if (isOpen(entry)) return;

    if (entry.trigger.getAttribute("aria-haspopup") !== "menu") {
      if (attempt < 6 && entry.trigger.matches(":hover")) {
        const retry = window.setTimeout(() => openEntry(entry, attempt + 1), 120);
        openTimers.set(entry.label, retry);
      }
      return;
    }

    closeOtherEntries(entry);
    entry.trigger.click();
  }

  function scheduleOpen(entry) {
    if (!desktopHoverAvailable()) return;
    clearTimer(closeTimers, entry.label);
    clearTimer(openTimers, entry.label);
    const timer = window.setTimeout(() => openEntry(entry), OPEN_DELAY_MS);
    openTimers.set(entry.label, timer);
  }

  function scheduleClose(entry) {
    if (!desktopHoverAvailable()) return;
    clearTimer(openTimers, entry.label);
    clearTimer(closeTimers, entry.label);
    const timer = window.setTimeout(() => {
      closeTimers.delete(entry.label);
      if (!isPointerOrFocusInside(entry)) closeEntry(entry);
    }, CLOSE_DELAY_MS);
    closeTimers.set(entry.label, timer);
  }

  function entryForMenuElement(element) {
    if (!(element instanceof Element)) return null;
    const definition = definitions.find((item) => element.closest(item.menuSelector));
    return definition ? currentEntry(definition) : null;
  }

  document.addEventListener("pointerover", (event) => {
    if (!desktopHoverAvailable()) return;
    const target = event.target;
    if (!(target instanceof Element)) return;

    const trigger = target.closest(".primary-nav a");
    const triggerEntry = entryForTrigger(trigger);
    if (triggerEntry && !(event.relatedTarget instanceof Node && triggerEntry.trigger.contains(event.relatedTarget))) {
      scheduleOpen(triggerEntry);
      return;
    }

    const menuEntry = entryForMenuElement(target);
    if (menuEntry) clearTimer(closeTimers, menuEntry.label);
  }, true);

  document.addEventListener("pointerout", (event) => {
    if (!desktopHoverAvailable()) return;
    const target = event.target;
    if (!(target instanceof Element)) return;

    const trigger = target.closest(".primary-nav a");
    const triggerEntry = entryForTrigger(trigger);
    if (triggerEntry) {
      const next = event.relatedTarget;
      const menu = menuFor(triggerEntry);
      if (next instanceof Node && (triggerEntry.trigger.contains(next) || Boolean(menu?.contains(next)))) return;
      scheduleClose(triggerEntry);
      return;
    }

    const menuEntry = entryForMenuElement(target);
    if (menuEntry) {
      const next = event.relatedTarget;
      const menu = menuFor(menuEntry);
      if (next instanceof Node && (menu?.contains(next) || menuEntry.trigger.contains(next))) return;
      scheduleClose(menuEntry);
    }
  }, true);

  document.addEventListener("focusin", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const entry = entryForMenuElement(target);
    if (entry) clearTimer(closeTimers, entry.label);
  }, true);

  document.addEventListener("focusout", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const entry = entryForMenuElement(target) || entryForTrigger(target.closest(".primary-nav a"));
    if (!entry) return;

    const next = event.relatedTarget;
    const menu = menuFor(entry);
    if (next instanceof Node && (entry.trigger.contains(next) || Boolean(menu?.contains(next)))) return;
    scheduleClose(entry);
  }, true);

  document.addEventListener("click", (event) => {
    const target = event.target;
    const trigger = target instanceof Element ? target.closest(".primary-nav a") : null;
    const entry = entryForTrigger(trigger);
    if (!entry) return;

    window.setTimeout(() => {
      if (isOpen(entry)) closeOtherEntries(entry);
    }, 0);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowDown") return;
    const target = event.target;
    const trigger = target instanceof Element ? target.closest(".primary-nav a") : null;
    const entry = entryForTrigger(trigger);
    if (!entry) return;
    window.setTimeout(() => {
      if (isOpen(entry)) closeOtherEntries(entry);
    }, 0);
  });

  window.addEventListener("blur", () => {
    definitions.forEach((definition) => {
      const entry = currentEntry(definition);
      if (entry) closeEntry(entry);
    });
  });

  window.matchMedia(DESKTOP_HOVER_QUERY).addEventListener("change", (event) => {
    if (event.matches) return;
    definitions.forEach((definition) => {
      const entry = currentEntry(definition);
      if (entry) closeEntry(entry);
    });
  });
})();
