(function () {
  "use strict";

  var nationalUrl = "https://www.liquorlicensemarket.com/";

  function addCompanyLink() {
    if (document.querySelector('[data-national-marketplace-company-link="true"]')) return;

    var headings = Array.prototype.slice.call(document.querySelectorAll("footer strong"));
    var heading = headings.find(function (node) {
      return (node.textContent || "").trim().toLowerCase() === "company";
    });
    if (!heading || !heading.parentElement) return;

    var link = document.createElement("a");
    link.href = nationalUrl;
    link.textContent = "National Liquor License Markets";
    link.setAttribute("data-national-marketplace-company-link", "true");

    var careers = Array.prototype.slice.call(heading.parentElement.querySelectorAll("a")).find(function (node) {
      return (node.textContent || "").trim().toLowerCase() === "careers";
    });
    if (careers) heading.parentElement.insertBefore(link, careers);
    else heading.parentElement.appendChild(link);
  }

  function addHomepagePrompt() {
    if (document.querySelector('[data-national-marketplace-prompt="true"]')) return;

    var cta = document.querySelector("section.cta#sell");
    if (!cta || !cta.parentElement) return;

    var prompt = document.createElement("aside");
    prompt.setAttribute("data-national-marketplace-prompt", "true");
    prompt.setAttribute("aria-label", "National liquor license marketplace");
    prompt.style.cssText = "display:flex;align-items:center;justify-content:space-between;gap:20px;margin:0 0 12px;padding:13px 18px;border:1px solid #d9dde0;border-radius:7px;background:#fff;color:#071827";
    prompt.innerHTML = '<span><strong style="display:block;font-size:14px;line-height:1.25">Looking for a liquor license outside Florida?</strong><small style="display:block;margin-top:3px;font-size:11px;line-height:1.35;color:#4d5963">Explore liquor license markets across the United States.</small></span><a href="' + nationalUrl + '" style="flex:0 0 auto;color:#d86b00;font-size:11px;font-weight:900;text-decoration:none;text-transform:uppercase">Explore National Markets ›</a>';
    cta.parentElement.insertBefore(prompt, cta);
  }

  function ensureLinks() {
    addHomepagePrompt();
    addCompanyLink();
  }

  function start() {
    ensureLinks();
    new MutationObserver(ensureLinks).observe(document.body, { childList: true, subtree: true });
    [100, 300, 750, 1500, 3000, 6000].forEach(function (delay) {
      window.setTimeout(ensureLinks, delay);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();