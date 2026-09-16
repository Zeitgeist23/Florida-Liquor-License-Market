"use client";

/**
 * Resources is rendered natively by HeaderNavMenus.
 *
 * This component intentionally does not rewrite the Resources menu DOM. The
 * previous MutationObserver/replaceChildren implementation could fight with
 * React when HeaderNavMenus re-rendered on hover, which could lock the page.
 */
export default function GlobalResourcesMenuSync() {
  return null;
}
