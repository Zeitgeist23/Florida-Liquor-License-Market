export default function HomeBuyDropdown() {
  return (
    <>
      <style>{`
        .site-header .primary-nav > a:first-child {
          anchor-name: --fllm-buy-trigger;
        }

        .home-buy-header-menu {
          position: fixed;
          position-anchor: --fllm-buy-trigger;
          top: anchor(bottom);
          left: anchor(center);
          transform: translateX(-50%);
          z-index: 2147483000;
          display: none;
          width: 310px;
          padding: 6px;
          border: 1px solid #f6a700;
          border-radius: 6px;
          background: #061728;
          box-shadow: 0 18px 48px rgba(0,0,0,.48), 0 0 0 1px rgba(246,167,0,.12);
          font-family: Arial, Helvetica, sans-serif;
        }

        body:has(.site-header .primary-nav > a:first-child:hover) .home-buy-header-menu,
        .home-buy-header-menu:hover,
        .home-buy-header-menu:focus-within {
          display: grid;
          gap: 4px;
        }

        .home-buy-header-menu a {
          display: block;
          width: 100%;
          padding: 12px 13px;
          border-radius: 4px;
          color: #fff !important;
          text-decoration: none;
          text-transform: none !important;
          font: 700 13px/1.3 Arial, Helvetica, sans-serif !important;
          letter-spacing: .01em !important;
          white-space: normal;
        }

        .home-buy-header-menu a:hover,
        .home-buy-header-menu a:focus-visible {
          background: #f6a700;
          color: #061728 !important;
          outline: none;
        }

        @media (max-width: 760px) {
          .home-buy-header-menu {
            width: min(310px, calc(100vw - 24px));
          }
        }
      `}</style>

      <div className="home-buy-header-menu" aria-label="Buy menu">
        <a href="/listings">View Listings</a>
        <a href="/how-to-buy-florida-liquor-license">How to Buy a Florida Liquor License</a>
      </div>
    </>
  );
}
