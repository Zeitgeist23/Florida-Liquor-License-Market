"use client";

import { useEffect, useRef, useState } from "react";

type HeaderNavMenusProps = {
  className?: string;
  showContactLink?: boolean;
};

type NavLink = {
  href: string;
  label: string;
  target?: "_blank";
  rel?: string;
  badge?: string;
  icon?: "map" | "money" | "trend" | "news";
  group?: "Start Here" | "Quota Licenses" | "Other License Types";
};

type NavMenu = {
  id: string;
  label: string;
  menuClassName: string;
  wrapperClassName?: string;
  links: NavLink[];
};

const navMenus: NavMenu[] = [
  {
    id: "buy",
    label: "Buy",
    menuClassName: "native-nav-menu-standard native-nav-buy-menu",
    links: [
      { href: "/buy-florida-liquor-license", label: "Buy a Florida Liquor License" },
      { href: "/listings", label: "View Listings" },
      { href: "/how-to-buy-florida-liquor-license", label: "How to Buy a Florida Liquor License" },
      { href: "/counties", label: "Florida County Markets" },
      { href: "/license-alerts", label: "Get a License Alert" },
      { href: "/exchange", label: "FLLM Exchange — Confidential Florida License Offers" },
    ],
  },
  {
    id: "sell",
    label: "Sell",
    menuClassName: "native-nav-menu-standard native-nav-sell-menu",
    links: [
      { href: "/brokers/list-your-license", label: "BROKERS — List a Client License" },
      { href: "/sell-your-license", label: "Sell Your License" },
      { href: "/how-to-sell-florida-liquor-license", label: "How to Sell a Florida Liquor License" },
      { href: "/florida-liquor-license-value", label: "Get a License Valuation" },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    menuClassName: "native-nav-menu-standard native-nav-finance-menu",
    links: [
      { href: "/how-to-finance-florida-liquor-license", label: "How to Finance a Florida Liquor License" },
      { href: "/financing/loan-payment-calculator", label: "Loan Payment Calculator" },
      { href: "/private-liquor-license-lenders", label: "Private Lenders" },
      { href: "/financing#request-financing", label: "Request Financing" },
    ],
  },
  {
    id: "invest",
    label: "Invest",
    menuClassName: "native-nav-menu-standard",
    links: [
      { href: "/investment-opportunities", label: "Investment Opportunities" },
      { href: "/resources/florida-liquor-license-system", label: "Quota License Ownership & Investing" },
      { href: "/self-directed-ira-liquor-license-lending", label: "Self-Directed IRA Lending" },
    ],
  },
  {
    id: "market-data",
    label: "Market Data",
    menuClassName: "native-nav-menu-standard native-nav-market-menu",
    links: [
      { href: "/market-data/exchange-board", label: "FLLM Exchange Board", badge: "EXCHANGE" },
      { href: "/counties", label: "Florida Market Data by County", icon: "map" },
      { href: "/florida-liquor-license-value", label: "Florida Liquor License Value Estimator", badge: "VALUE" },
      { href: "/florida-quota-liquor-license-cost", label: "Florida Liquor License Cost by County", icon: "money" },
      { href: "/listings?status=sold", label: "Recent Florida Transactions", badge: "SALES" },
      { href: "/florida-quota-liquor-license-market-report", label: "Florida Market Insights", icon: "trend" },
      { href: "/florida-liquor-license-lottery", label: "Quota Lottery Entry", badge: "LOTTERY" },
      { href: "/florida-liquor-license-news", label: "News & Insights", icon: "news" },
      { href: "/#market-data", label: "Florida Market Heat Map", badge: "MAP" },
    ],
  },
  {
    id: "license-types",
    label: "License Types",
    menuClassName: "native-license-types-menu",
    wrapperClassName: "native-nav-license-types",
    links: [
      { href: "/resources/florida-liquor-license-system", label: "How Florida Liquor Licensing Works", group: "Start Here" },
      { href: "/resources/florida-liquor-license-types", label: "Types of Florida Liquor Licenses", group: "Start Here" },
      { href: "/resources/florida-liquor-license-types#population-rule-title", label: "Quota License Requirements", group: "Start Here" },
      { href: "/license-types/4cop-quota", label: "4COP Quota License", group: "Quota Licenses" },
      { href: "/license-types/3ps-package-store", label: "3PS Quota / Package Store", group: "Quota Licenses" },
      { href: "/license-types/2cop-beer-wine", label: "2COP Beer & Wine", group: "Other License Types" },
      { href: "/license-types/4cop-sfs-restaurant", label: "SRX / 4COP-SFS Restaurant", group: "Other License Types" },
      { href: "/license-types/mobile-bars-catered-events", label: "Mobile Liquor License", group: "Other License Types" },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    menuClassName: "native-nav-menu-standard native-nav-resources-menu",
    links: [
      { href: "/free-guide", label: "Free Buyer’s & Seller’s Guide" },
      { href: "/resources", label: "View All Resources" },
      { href: "/resources/application-center", label: "Alcohol License Application Center" },
      {
        href: "https://florida-liquor-license-market.jwigg023.chatgpt.site/license-lookup",
        label: "Florida Liquor License Lookup",
        target: "_blank",
        rel: "noopener noreferrer",
      },
      { href: "/florida-liquor-license-value", label: "Florida Liquor License Value Estimator" },
      { href: "/resources/florida-liquor-license-laws", label: "Florida Liquor License Laws" },
      { href: "/resources/florida-division-alcoholic-beverages-tobacco", label: "Florida Division of Alcoholic Beverages & Tobacco" },
      { href: "/resources/forms", label: "Florida ABT Forms" },
      { href: "/resources/license-fees", label: "License Fees & Annual Renewals" },
      { href: "/resources/quota-transfer-fee-calculator", label: "Quota License Transfer Fee Calculator" },
      { href: "/resources/florida-department-of-revenue", label: "Florida Department of Revenue (FDOR)" },
      { href: "/resources/liquor-license-attorneys", label: "Liquor License Attorneys" },
      { href: "/dbpr-abt-6002", label: "ABT-6002 Transfer Guide" },
      { href: "/transaction-services", label: "FLLM Transaction Services" },
      { href: "/florida-liquor-license-court-decisions", label: "Court Decisions & Case Law" },
    ],
  },
];

const chevron = <img className="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true" />;

export default function HeaderNavMenus({
  className = "primary-nav",
  showContactLink = false,
}: HeaderNavMenusProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<number | null>(null);

  function clearCloseTimer() {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function openImmediately(menuId: string) {
    clearCloseTimer();
    setOpenMenu(menuId);
  }

  function closeImmediately() {
    clearCloseTimer();
    setOpenMenu(null);
  }

  function scheduleClose() {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => {
      setOpenMenu(null);
      closeTimer.current = null;
    }, 120);
  }

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        if (closeTimer.current !== null) {
          window.clearTimeout(closeTimer.current);
          closeTimer.current = null;
        }
        setOpenMenu(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (closeTimer.current !== null) {
          window.clearTimeout(closeTimer.current);
          closeTimer.current = null;
        }
        setOpenMenu(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <>
      <nav ref={navRef} className={className} aria-label="Primary navigation">
        {navMenus.map((menu) => {
          const isOpen = openMenu === menu.id;
          return (
            <div
              className={`native-nav-dropdown${menu.wrapperClassName ? ` ${menu.wrapperClassName}` : ""}${isOpen ? " is-open" : ""}`}
              key={menu.id}
              onMouseEnter={() => openImmediately(menu.id)}
              onMouseLeave={scheduleClose}
              onFocusCapture={() => openImmediately(menu.id)}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) scheduleClose();
              }}
            >
              <button
                className="native-nav-trigger"
                type="button"
                aria-haspopup="menu"
                aria-expanded={isOpen}
                onClick={() => {
                  clearCloseTimer();
                  setOpenMenu((current) => current === menu.id ? null : menu.id);
                }}
              >
                <span>{menu.label}</span>{chevron}
              </button>
              <div
                className={`native-nav-menu ${menu.menuClassName}`}
                role="menu"
                aria-label={`${menu.label} menu`}
                onMouseEnter={clearCloseTimer}
                onMouseLeave={scheduleClose}
              >
                {menu.id === "license-types" ? (
                  (["Start Here", "Quota Licenses", "Other License Types"] as const).map((group) => (
                    <div className="native-license-types-column" key={group} role="presentation">
                      <strong>{group}</strong>
                      {menu.links.filter((link) => link.group === group).map((link) => (
                        <a
                          href={link.href}
                          key={`${menu.id}-${link.label}`}
                          role="menuitem"
                          onClick={closeImmediately}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  ))
                ) : (
                  menu.links.map((link) => (
                    <a
                      href={link.href}
                      key={`${menu.id}-${link.label}`}
                      target={link.target}
                      rel={link.rel}
                      role="menuitem"
                      onClick={closeImmediately}
                    >
                      {menu.id === "market-data" ? (
                        <>
                          <span className="native-market-label">{link.label}</span>
                          {link.badge && <span className="native-market-badge">{link.badge}</span>}
                          {link.icon && <span className={`native-market-icon native-market-icon-${link.icon}`} aria-hidden="true" />}
                        </>
                      ) : link.label}
                    </a>
                  ))
                )}
              </div>
            </div>
          );
        })}

        {showContactLink && <a className="native-nav-direct-link" href="/contact"><span>Contact Us</span></a>}
      </nav>

      <style>{`
        .results-page{overflow-x:clip}
        .primary-nav .native-nav-dropdown{position:relative;display:inline-flex;align-items:center;flex:0 0 auto;padding-bottom:12px;margin-bottom:-12px}
        .primary-nav .native-nav-trigger{appearance:none;-webkit-appearance:none;display:inline-flex;align-items:center;gap:5px;padding:0;border:0;background:transparent;color:#fff;cursor:pointer;font:600 10px/1 Arial,Helvetica,sans-serif;text-transform:uppercase;white-space:nowrap;transform-origin:center;transition:transform .16s ease,color .16s ease}
        .primary-nav .native-nav-trigger:hover,.primary-nav .native-nav-trigger:focus-visible,.primary-nav .native-nav-dropdown.is-open>.native-nav-trigger{color:var(--gold,#f6a700);outline:none;transform:scale(1.03)}
        .primary-nav .native-nav-direct-link{display:inline-flex;align-items:center;flex:0 0 auto;color:#fff;font-size:10px;font-weight:600;line-height:1;text-transform:uppercase;white-space:nowrap}
        .primary-nav .native-nav-direct-link:hover,.primary-nav .native-nav-direct-link:focus-visible{color:var(--gold,#f6a700);outline:none}
        .primary-nav .native-nav-language-link{padding:4px 7px;border:1px solid rgba(255,255,255,.42);border-radius:999px;font-weight:900;letter-spacing:.08em}
        .primary-nav .native-nav-language-link:hover,.primary-nav .native-nav-language-link:focus-visible{border-color:var(--gold,#f6a700)}
        .native-nav-menu{position:absolute;top:100%;left:50%;z-index:10080;display:none;transform:translateX(-50%);padding:10px;border:1px solid #f6a700;border-radius:7px;background:#061728;box-shadow:0 18px 48px rgba(0,0,0,.48),0 0 0 1px rgba(246,167,0,.12);font-family:Arial,Helvetica,sans-serif}
        .native-nav-dropdown.is-open>.native-nav-menu{display:grid;gap:6px}
        .native-nav-menu::before{content:"";position:absolute;top:-7px;left:50%;width:12px;height:12px;transform:translateX(-50%) rotate(45deg);border-left:1px solid #f6a700;border-top:1px solid #f6a700;background:#061728}
        .native-nav-menu-standard{width:310px}
        .native-nav-sell-menu{width:390px}
        .native-nav-buy-menu{width:min(540px,calc(100vw - 48px));grid-template-columns:repeat(2,minmax(0,1fr));gap:7px 8px!important;padding:10px}
        .native-nav-finance-menu{width:350px}
        .native-nav-market-menu{width:min(660px,calc(100vw - 48px));grid-template-columns:repeat(2,minmax(0,1fr));gap:7px!important;padding:10px}
        .native-nav-resources-menu{width:min(860px,calc(100vw - 48px));grid-template-columns:repeat(3,minmax(0,1fr));gap:6px 10px!important;padding:12px;left:auto;right:-18px;transform:none;margin-left:0}
        .native-nav-resources-menu::before{left:auto;right:46px;transform:rotate(45deg)}
        .native-license-types-menu{width:min(760px,calc(100vw - 48px));grid-template-columns:repeat(3,minmax(0,1fr));gap:10px!important;padding:12px}
        .native-license-types-column{min-width:0;display:flex;flex-direction:column;gap:6px;padding:0;border:0;background:transparent}
        .native-license-types-column>strong{display:block;padding:7px 9px 8px;border-bottom:1px solid rgba(246,167,0,.34);color:#f6a700;font:900 10px/1.2 Arial,Helvetica,sans-serif;letter-spacing:.09em;text-transform:uppercase}
        .primary-nav .native-nav-menu a{position:relative;z-index:1;display:flex;width:100%;min-height:50px;align-items:center;padding:12px 13px;border:1px solid rgba(255,255,255,.08);border-radius:7px;background:rgba(255,255,255,.025)!important;box-shadow:none!important;color:#fff;text-decoration:none;text-transform:none;white-space:normal;font:700 13px/1.3 Arial,Helvetica,sans-serif;letter-spacing:.01em;transition:border-color .16s ease,background .16s ease,color .16s ease,transform .16s ease}
        .primary-nav .native-nav-menu a:hover,.primary-nav .native-nav-menu a:focus,.primary-nav .native-nav-menu a:focus-visible,.primary-nav .native-nav-menu a:active{border-color:rgba(246,167,0,.7);background:rgba(246,167,0,.08)!important;box-shadow:none!important;color:#f6a700;outline:none;transform:translateY(-1px)}
        .primary-nav .native-nav-buy-menu a{min-height:50px}
        .primary-nav .native-nav-market-menu a{min-height:52px;justify-content:space-between;gap:12px;overflow:hidden}
        .primary-nav .native-nav-market-menu a:last-child{grid-column:1/-1}
        .native-market-label{min-width:0;overflow-wrap:anywhere}
        .native-market-badge{flex:0 0 auto;margin-left:auto;color:#f6a700;font-size:9px;font-weight:900;letter-spacing:.08em;white-space:nowrap}
        .native-market-icon{flex:0 0 auto;margin-left:auto;width:16px;height:16px;display:inline-block;background:currentColor;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-size:contain;mask-size:contain}
        .native-market-icon-map{color:#f6a700;-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6zm6-3v15m6-12v15' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6zm6-3v15m6-12v15' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")}
        .native-market-icon-money{background:none!important;color:#4fd17b;width:auto;height:auto;font:900 15px/1 Arial,Helvetica,sans-serif}
        .native-market-icon-money::before{content:"$"}
        .native-market-icon-trend{color:#69d6ff;-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M4 17l5-5 4 4 7-9M15 7h5v5' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M4 17l5-5 4 4 7-9M15 7h5v5' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")}
        .native-market-icon-news{color:#f6a700;-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M4 5h12v14H4V5zm3 3h6M7 11h6M7 14h4M16 8h4v10a1 1 0 0 1-1 1h-3' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M4 5h12v14H4V5zm3 3h6M7 11h6M7 14h4M16 8h4v10a1 1 0 0 1-1 1h-3' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")}
        .primary-nav .native-license-types-menu a{min-height:50px;padding:10px 9px}
        .primary-nav .native-nav-resources-menu a{min-height:50px}
        .primary-nav .native-nav-resources-menu a[href="/free-guide"],
        .primary-nav .native-nav-resources-menu a[href="/florida-liquor-license-value"],
        .primary-nav .native-nav-resources-menu a[href^="https://florida-liquor-license-market.jwigg023.chatgpt.site/license-lookup"]{border-color:rgba(246,167,0,.52);background:linear-gradient(135deg,rgba(246,167,0,.10),rgba(246,167,0,.025))!important;color:#fff;font-weight:900}
        .primary-nav .native-nav-resources-menu a[href="/free-guide"]::after{content:"FREE PDF";margin-left:auto;color:#f6a700;font-size:9px;letter-spacing:.08em}
        .primary-nav .native-nav-resources-menu a[href="/florida-liquor-license-value"]::after{content:"VALUE";margin-left:auto;color:#f6a700;font-size:8px;letter-spacing:.08em}
        .primary-nav .native-nav-resources-menu a[href^="https://florida-liquor-license-market.jwigg023.chatgpt.site/license-lookup"]::after{content:"LOOKUP";margin-left:auto;color:#f6a700;font-size:8px;letter-spacing:.08em}
        @media(max-width:760px){.native-nav-sell-menu{width:min(360px,calc(100vw - 28px))}.native-nav-buy-menu{width:min(360px,calc(100vw - 28px));grid-template-columns:1fr;max-height:min(70vh,560px);overflow-y:auto}.primary-nav .native-nav-buy-menu a{min-height:43px}.native-nav-market-menu{width:min(360px,calc(100vw - 28px));grid-template-columns:1fr;max-height:min(70vh,560px);overflow-y:auto}.primary-nav .native-nav-market-menu a:last-child{grid-column:auto}.native-nav-resources-menu{width:min(360px,calc(100vw - 28px));grid-template-columns:1fr;right:-10px;max-height:min(70vh,560px);overflow-y:auto}.native-license-types-menu{width:min(360px,calc(100vw - 28px));grid-template-columns:1fr;max-height:min(70vh,560px);overflow-y:auto}.native-license-types-column{padding:0}.primary-nav .native-license-types-menu a{min-height:43px}}
      `}</style>
    </>
  );
}