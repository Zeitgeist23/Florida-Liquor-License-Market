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
    menuClassName: "native-nav-menu-standard",
    links: [
      { href: "/listings", label: "View Listings" },
      { href: "/license-alerts", label: "Create a License Alert" },
      { href: "/how-to-buy-florida-liquor-license", label: "How to Buy a Florida Liquor License" },
      { href: "/counties", label: "Florida County Markets" },
    ],
  },
  {
    id: "sell",
    label: "Sell",
    menuClassName: "native-nav-menu-standard",
    links: [
      { href: "/sell-your-license", label: "Sell Your License" },
      { href: "/how-to-sell-florida-liquor-license", label: "How to Sell a Florida Liquor License" },
      { href: "/florida-liquor-license-value", label: "Get a License Valuation" },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    menuClassName: "native-nav-menu-standard",
    links: [
      { href: "/financing", label: "Liquor License Financing" },
      { href: "/financing-disclosure", label: "Financing Disclosure" },
      { href: "/private-lending-disclosure", label: "Private Lending Disclosure" },
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
      { href: "/counties", label: "Florida Market Data by County" },
      { href: "/florida-liquor-license-value", label: "Florida Liquor License Value Estimator" },
      { href: "/listings?status=sold", label: "Recent Florida Transactions" },
      { href: "/#market-data", label: "Florida Market Insights" },
      { href: "/florida-liquor-license-lottery", label: "Quota Lottery Entry" },
      { href: "/florida-liquor-license-news", label: "News & Insights" },
      { href: "/#market-data", label: "Florida Market Heat Map" },
    ],
  },
  {
    id: "license-types",
    label: "License Types",
    menuClassName: "native-license-types-menu",
    wrapperClassName: "native-nav-license-types",
    links: [
      { href: "/resources/florida-liquor-license-types", label: "Florida Liquor License Types" },
      { href: "/resources/florida-liquor-license-system", label: "How Florida Liquor Licensing Works" },
      { href: "/license-types/4cop-quota", label: "4COP Quota License" },
      { href: "/license-types/3ps-package-store", label: "3PS Quota / Package Store" },
      { href: "/license-types/2cop-beer-wine", label: "2COP Beer & Wine" },
      { href: "/license-types/4cop-sfs-restaurant", label: "SRX / 4COP-SFS Restaurant" },
      { href: "/resources/florida-liquor-license-types#population-rule-title", label: "Quota License Requirements" },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    menuClassName: "native-nav-menu-standard native-nav-resources-menu",
    links: [
      {
        href: "https://florida-liquor-license-market.jwigg023.chatgpt.site/license-lookup",
        label: "Florida Liquor License Lookup",
        target: "_blank",
        rel: "noopener noreferrer",
      },
      { href: "/resources/quota-transfer-fee-calculator", label: "Quota License Transfer Fee Calculator" },
      { href: "/resources/liquor-license-attorneys", label: "Liquor License Attorneys" },
      {
        href: "https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/",
        label: "Florida Division of Alcoholic Beverages",
        target: "_blank",
        rel: "noopener noreferrer",
      },
      { href: "/resources/florida-liquor-license-types", label: "Types of Florida Liquor Licenses" },
      { href: "/resources/license-fees", label: "License Fees" },
      { href: "/resources/forms", label: "Florida ABT Forms" },
      { href: "/resources/florida-department-of-revenue", label: "Florida Department of Revenue (FDOR)" },
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
                {menu.links.map((link) => (
                  <a
                    href={link.href}
                    key={`${menu.id}-${link.label}`}
                    target={link.target}
                    rel={link.rel}
                    role="menuitem"
                    onClick={closeImmediately}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          );
        })}

        {showContactLink && <a className="native-nav-direct-link" href="/contact"><span>Contact Us</span></a>}
      </nav>

      <style>{`
        .primary-nav .native-nav-dropdown{position:relative;display:inline-flex;align-items:center;flex:0 0 auto;padding-bottom:12px;margin-bottom:-12px}
        .primary-nav .native-nav-trigger{appearance:none;-webkit-appearance:none;display:inline-flex;align-items:center;gap:5px;padding:0;border:0;background:transparent;color:#fff;cursor:pointer;font:600 10px/1 Arial,Helvetica,sans-serif;text-transform:uppercase;white-space:nowrap}
        .primary-nav .native-nav-trigger:hover,.primary-nav .native-nav-trigger:focus-visible,.primary-nav .native-nav-dropdown.is-open>.native-nav-trigger{color:var(--gold,#f6a700);outline:none}
        .primary-nav .native-nav-direct-link{display:inline-flex;align-items:center;flex:0 0 auto;color:#fff;font-size:10px;font-weight:600;line-height:1;text-transform:uppercase;white-space:nowrap}
        .primary-nav .native-nav-direct-link:hover,.primary-nav .native-nav-direct-link:focus-visible{color:var(--gold,#f6a700);outline:none}
        .native-nav-menu{position:absolute;top:100%;left:50%;z-index:10080;display:none;transform:translateX(-50%);padding:6px;border:1px solid #f6a700;border-radius:7px;background:#061728;box-shadow:0 18px 48px rgba(0,0,0,.48),0 0 0 1px rgba(246,167,0,.12);font-family:Arial,Helvetica,sans-serif}
        .native-nav-dropdown.is-open>.native-nav-menu{display:grid;gap:4px}
        .native-nav-menu::before{content:"";position:absolute;top:-7px;left:50%;width:12px;height:12px;transform:translateX(-50%) rotate(45deg);border-left:1px solid #f6a700;border-top:1px solid #f6a700;background:#061728}
        .native-nav-menu-standard{width:310px}
        .native-nav-market-menu{width:300px}
        .native-nav-resources-menu{width:350px}
        .native-license-types-menu{width:320px}
        .primary-nav .native-nav-menu a{position:relative;z-index:1;display:block;width:100%;padding:12px 13px;border-radius:4px;color:#fff;text-decoration:none;text-transform:none;white-space:normal;font:700 13px/1.3 Arial,Helvetica,sans-serif;letter-spacing:.01em}
        .primary-nav .native-nav-menu a:hover,.primary-nav .native-nav-menu a:focus-visible{background:#f6a700;color:#061728;outline:none}

        /* Legacy-menu hard stop: some older page/header code can still inject the
           former image-card License Types menu. Keep every version text-only. */
        .primary-nav .live-license-types-menu,
        .primary-nav .home-license-types-menu,
        .license-types-header-menu{width:320px!important;padding:6px!important}
        .primary-nav .live-license-types-menu .live-license-card,
        .primary-nav .home-license-types-menu a,
        .license-types-header-menu a{display:block!important;width:100%!important;padding:12px 13px!important}
        .primary-nav .live-license-types-menu .live-license-card>img,
        .primary-nav .live-license-types-menu a>img,
        .primary-nav .home-license-types-menu a>img,
        .license-types-header-menu a>img,
        .primary-nav .native-license-types-menu a>img{display:none!important}
        .primary-nav .live-license-types-menu .live-license-card>span{display:block!important}
        .primary-nav .live-license-types-menu .live-license-card small{display:none!important}

        @media(max-width:899px){
          .primary-nav .native-nav-dropdown{width:100%;display:block;padding-bottom:0;margin-bottom:0}
          .primary-nav .native-nav-trigger{width:100%;min-height:36px;justify-content:center}
          .primary-nav .native-nav-direct-link{width:100%;min-height:36px;justify-content:center}
          .native-nav-menu{position:static;left:auto;top:auto;width:100%!important;max-height:58vh;margin:2px 0 8px;transform:none;overflow:auto;box-shadow:none}
          .native-nav-menu::before{display:none}
        }
      `}</style>
    </>
  );
}
