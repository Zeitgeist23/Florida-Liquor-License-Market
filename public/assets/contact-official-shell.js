(function(){
  var HEADER_HTML="<header class=\"site-header forms-site-header page-shell fllm-official-contact-header\">\n  <a class=\"brand-lockup\" href=\"/\" aria-label=\"Florida Liquor License Market home\"><img src=\"/assets/brand-sharp.svg\" alt=\"Florida Liquor License Market\"/></a>\n  <button class=\"menu-toggle\" type=\"button\" aria-label=\"Toggle navigation\" aria-expanded=\"false\">☰</button>\n  <nav class=\"primary-nav\" aria-label=\"Primary navigation\">\n    <div class=\"native-nav-dropdown\" data-nav-menu=\"buy\"><button class=\"native-nav-trigger\" type=\"button\" aria-haspopup=\"menu\" aria-expanded=\"false\"><span>Buy</span><img class=\"nav-chevron\" src=\"/assets/nav-chevron.png\" alt=\"\" aria-hidden=\"true\"/></button><div class=\"native-nav-menu native-nav-menu-standard native-nav-buy-menu\" role=\"menu\" aria-label=\"Buy menu\"><a href=\"/buy-florida-liquor-license\" role=\"menuitem\">Buy a Florida Liquor License</a><a href=\"/listings\" role=\"menuitem\">View Listings</a><a href=\"/how-to-buy-florida-liquor-license\" role=\"menuitem\">How to Buy a Florida Liquor License</a><a href=\"/counties\" role=\"menuitem\">Florida County Markets</a><a href=\"/license-alerts\" role=\"menuitem\">Get a License Alert</a><a href=\"/exchange\" role=\"menuitem\">FLLM Exchange — Confidential Florida License Offers</a></div></div>\n    <div class=\"native-nav-dropdown\" data-nav-menu=\"sell\"><button class=\"native-nav-trigger\" type=\"button\" aria-haspopup=\"menu\" aria-expanded=\"false\"><span>Sell</span><img class=\"nav-chevron\" src=\"/assets/nav-chevron.png\" alt=\"\" aria-hidden=\"true\"/></button><div class=\"native-nav-menu native-nav-menu-standard\" role=\"menu\" aria-label=\"Sell menu\"><a href=\"/brokers/list-your-license\" role=\"menuitem\">BROKERS — List a Client License</a><a href=\"/sell-your-license\" role=\"menuitem\">Sell Your License</a><a href=\"/how-to-sell-florida-liquor-license\" role=\"menuitem\">How to Sell a Florida Liquor License</a><a href=\"/florida-liquor-license-value\" role=\"menuitem\">Get a License Valuation</a></div></div>\n    <div class=\"native-nav-dropdown\" data-nav-menu=\"finance\"><button class=\"native-nav-trigger\" type=\"button\" aria-haspopup=\"menu\" aria-expanded=\"false\"><span>Finance</span><img class=\"nav-chevron\" src=\"/assets/nav-chevron.png\" alt=\"\" aria-hidden=\"true\"/></button><div class=\"native-nav-menu native-nav-menu-standard native-nav-finance-menu\" role=\"menu\" aria-label=\"Finance menu\"><a href=\"/how-to-finance-florida-liquor-license\" role=\"menuitem\">How to Finance a Florida Liquor License</a><a href=\"/financing/loan-payment-calculator\" role=\"menuitem\">Loan Payment Calculator</a><a href=\"/private-liquor-license-lenders\" role=\"menuitem\">Private Lenders</a><a href=\"/financing#request-financing\" role=\"menuitem\">Request Financing</a></div></div>\n    <div class=\"native-nav-dropdown\" data-nav-menu=\"invest\"><button class=\"native-nav-trigger\" type=\"button\" aria-haspopup=\"menu\" aria-expanded=\"false\"><span>Invest</span><img class=\"nav-chevron\" src=\"/assets/nav-chevron.png\" alt=\"\" aria-hidden=\"true\"/></button><div class=\"native-nav-menu native-nav-menu-standard\" role=\"menu\" aria-label=\"Invest menu\"><a href=\"/investment-opportunities\" role=\"menuitem\">Investment Opportunities</a><a href=\"/resources/florida-liquor-license-system\" role=\"menuitem\">Quota License Ownership &amp; Investing</a><a href=\"/self-directed-ira-liquor-license-lending\" role=\"menuitem\">Self-Directed IRA Lending</a></div></div>\n    <div class=\"native-nav-dropdown\" data-nav-menu=\"market-data\"><button class=\"native-nav-trigger\" type=\"button\" aria-haspopup=\"menu\" aria-expanded=\"false\"><span>Market Data</span><img class=\"nav-chevron\" src=\"/assets/nav-chevron.png\" alt=\"\" aria-hidden=\"true\"/></button><div class=\"native-nav-menu native-nav-menu-standard native-nav-market-menu\" role=\"menu\" aria-label=\"Market Data menu\"><a href=\"/market-data/exchange-board\"><span class=\"native-market-label\">FLLM Exchange Board</span><span class=\"native-market-badge\">EXCHANGE</span></a><a href=\"/counties\"><span class=\"native-market-label\">Florida Market Data by County</span></a><a href=\"/florida-liquor-license-value\"><span class=\"native-market-label\">Florida Liquor License Value Estimator</span><span class=\"native-market-badge\">VALUE</span></a><a href=\"/florida-quota-liquor-license-cost\"><span class=\"native-market-label\">Florida Liquor License Cost by County</span></a><a href=\"/listings?status=sold\"><span class=\"native-market-label\">Recent Florida Transactions</span><span class=\"native-market-badge\">SALES</span></a><a href=\"/florida-quota-liquor-license-market-report\"><span class=\"native-market-label\">Florida Market Insights</span></a><a href=\"/florida-liquor-license-lottery\"><span class=\"native-market-label\">Quota Lottery Entry</span><span class=\"native-market-badge\">LOTTERY</span></a><a href=\"/florida-liquor-license-news\"><span class=\"native-market-label\">News &amp; Insights</span></a><a href=\"/#market-data\"><span class=\"native-market-label\">Florida Market Heat Map</span><span class=\"native-market-badge\">MAP</span></a></div></div>\n    <div class=\"native-nav-dropdown native-nav-license-types\" data-nav-menu=\"license-types\"><button class=\"native-nav-trigger\" type=\"button\" aria-haspopup=\"menu\" aria-expanded=\"false\"><span>License Types</span><img class=\"nav-chevron\" src=\"/assets/nav-chevron.png\" alt=\"\" aria-hidden=\"true\"/></button><div class=\"native-nav-menu native-license-types-menu\" role=\"menu\" aria-label=\"License Types menu\"><div class=\"native-license-types-column\"><strong>Start Here</strong><a href=\"/resources/florida-liquor-license-system\">How Florida Liquor Licensing Works</a><a href=\"/resources/florida-liquor-license-types\">Types of Florida Liquor Licenses</a><a href=\"/resources/florida-liquor-license-types#population-rule-title\">Quota License Requirements</a></div><div class=\"native-license-types-column\"><strong>Quota Licenses</strong><a href=\"/license-types/4cop-quota\">4COP Quota License</a><a href=\"/license-types/3ps-package-store\">3PS Quota / Package Store</a></div><div class=\"native-license-types-column\"><strong>Other License Types</strong><a href=\"/license-types/2cop-beer-wine\">2COP Beer &amp; Wine</a><a href=\"/license-types/4cop-sfs-restaurant\">SRX / 4COP-SFS Restaurant</a><a href=\"/license-types/mobile-bars-catered-events\">Mobile Liquor License</a></div></div></div>\n    <div class=\"native-nav-dropdown\" data-nav-menu=\"resources\"><button class=\"native-nav-trigger\" type=\"button\" aria-haspopup=\"menu\" aria-expanded=\"false\"><span>Resources</span><img class=\"nav-chevron\" src=\"/assets/nav-chevron.png\" alt=\"\" aria-hidden=\"true\"/></button><div class=\"native-nav-menu native-nav-menu-standard native-nav-resources-menu\" role=\"menu\" aria-label=\"Resources menu\"><a href=\"/free-guide\">Free Buyer’s &amp; Seller’s Guide</a><a href=\"/resources\">View All Resources</a><a href=\"/resources/application-center\">Alcohol License Application Center</a><a href=\"https://florida-liquor-license-market.jwigg023.chatgpt.site/license-lookup\" target=\"_blank\" rel=\"noopener noreferrer\">Florida Liquor License Lookup</a><a href=\"/florida-liquor-license-value\">Florida Liquor License Value Estimator</a><a href=\"/resources/florida-liquor-license-laws\">Florida Liquor License Laws</a><a href=\"/resources/florida-division-alcoholic-beverages-tobacco\">Florida Division of Alcoholic Beverages &amp; Tobacco</a><a href=\"/resources/forms\">Florida ABT Forms</a><a href=\"/resources/license-fees\">License Fees &amp; Annual Renewals</a><a href=\"/resources/quota-transfer-fee-calculator\">Quota License Transfer Fee Calculator</a><a href=\"/resources/florida-department-of-revenue\">Florida Department of Revenue (FDOR)</a><a href=\"/resources/liquor-license-attorneys\">Liquor License Attorneys</a><a href=\"/dbpr-abt-6002\">ABT-6002 Transfer Guide</a><a href=\"/transaction-services\">FLLM Transaction Services</a><a href=\"/florida-liquor-license-court-decisions\">Court Decisions &amp; Case Law</a></div></div>\n  </nav>\n  <div class=\"header-actions\"><a class=\"btn btn-outline fllm-header-contact-cta\" href=\"/contact\"><span class=\"contact-phone\" aria-hidden=\"true\">☎</span>Contact Us</a><div class=\"fllm-contact-list-wrap\"><a class=\"btn btn-gold fllm-header-list-cta\" href=\"/sell-your-license\">List Your License</a><div class=\"fllm-contact-list-menu\" aria-label=\"List your license options\"><a href=\"/sell-your-license?method=self#listing-options\">Self-Directed Seller</a><a href=\"/sell-your-license#broker-assistance\">Request Broker Help</a><a href=\"/brokers/list-your-license\">For Brokers — List a Client License</a></div></div></div>\n</header>";
  var FOOTER_HTML="<footer class=\"directory-footer sell-license-page-footer official-directory-footer fllm-official-contact-footer\">\n  <div class=\"directory-shell\">\n    <div class=\"directory-footer-brand\">\n      <a href=\"/\" aria-label=\"Florida Liquor License Market home\"><img src=\"/assets/brand-sharp.svg\" alt=\"Florida Liquor License Market\" width=\"130\" height=\"53\"/></a>\n      <span>© Florida Liquor License Market</span>\n    </div>\n    <nav aria-label=\"Footer navigation\">\n      <a href=\"/\">Home</a>\n      <a href=\"/florida-4cop-liquor-license-for-sale\">4COP</a>\n      <a href=\"/florida-3ps-liquor-license-for-sale\">3PS</a>\n      <a href=\"/listings\">Listings</a>\n      <a href=\"/contact\">Contact</a>\n    </nav>\n  </div>\n</footer>";
  var globalInstalled=false;

  function htmlNode(markup){
    var template=document.createElement('template');
    template.innerHTML=markup.trim();
    return template.content.firstElementChild;
  }

  function wireHeader(header){
    if(!header || header.dataset.fllmOfficialWired==='true') return;
    header.dataset.fllmOfficialWired='true';
    var nav=header.querySelector('.primary-nav');
    var toggle=header.querySelector('.menu-toggle');
    var closeTimer=null;

    function closeAll(except){
      header.querySelectorAll('.native-nav-dropdown.is-open').forEach(function(item){
        if(item!==except){
          item.classList.remove('is-open');
          var button=item.querySelector('.native-nav-trigger');
          if(button)button.setAttribute('aria-expanded','false');
        }
      });
    }
    function openMenu(item){
      if(closeTimer){clearTimeout(closeTimer);closeTimer=null;}
      closeAll(item);
      item.classList.add('is-open');
      var button=item.querySelector('.native-nav-trigger');
      if(button)button.setAttribute('aria-expanded','true');
    }
    function closeMenu(item){
      item.classList.remove('is-open');
      var button=item.querySelector('.native-nav-trigger');
      if(button)button.setAttribute('aria-expanded','false');
    }
    function scheduleClose(item){
      if(closeTimer)clearTimeout(closeTimer);
      closeTimer=setTimeout(function(){closeMenu(item);closeTimer=null;},120);
    }

    header.querySelectorAll('.native-nav-dropdown').forEach(function(item){
      var button=item.querySelector('.native-nav-trigger');
      var menu=item.querySelector('.native-nav-menu');
      item.addEventListener('mouseenter',function(){openMenu(item);});
      item.addEventListener('mouseleave',function(){scheduleClose(item);});
      item.addEventListener('focusin',function(){openMenu(item);});
      item.addEventListener('focusout',function(event){if(!item.contains(event.relatedTarget))scheduleClose(item);});
      if(menu){
        menu.addEventListener('mouseenter',function(){if(closeTimer){clearTimeout(closeTimer);closeTimer=null;}});
        menu.addEventListener('mouseleave',function(){scheduleClose(item);});
      }
      if(button){
        button.addEventListener('click',function(event){
          event.preventDefault();
          var open=item.classList.contains('is-open');
          closeAll();
          if(!open)openMenu(item);else closeMenu(item);
        });
      }
    });

    if(toggle&&nav){
      toggle.addEventListener('click',function(){
        var open=nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded',open?'true':'false');
      });
    }

    var listWrap=header.querySelector('.fllm-contact-list-wrap');
    var listButton=header.querySelector('.fllm-header-list-cta');
    if(listWrap&&listButton){
      listButton.addEventListener('click',function(event){
        if(window.matchMedia('(max-width: 980px)').matches){
          event.preventDefault();
          listWrap.classList.toggle('is-open');
        }
      });
    }

    if(!globalInstalled){
      globalInstalled=true;
      document.addEventListener('pointerdown',function(event){
        var current=document.querySelector('.contact-page > .fllm-official-contact-header');
        if(current && !current.contains(event.target)){
          current.querySelectorAll('.native-nav-dropdown.is-open').forEach(function(item){
            item.classList.remove('is-open');
            var button=item.querySelector('.native-nav-trigger');
            if(button)button.setAttribute('aria-expanded','false');
          });
          var currentNav=current.querySelector('.primary-nav');
          var currentToggle=current.querySelector('.menu-toggle');
          var currentList=current.querySelector('.fllm-contact-list-wrap');
          if(currentNav)currentNav.classList.remove('is-open');
          if(currentToggle)currentToggle.setAttribute('aria-expanded','false');
          if(currentList)currentList.classList.remove('is-open');
        }
      });
      document.addEventListener('keydown',function(event){
        if(event.key!=='Escape')return;
        var current=document.querySelector('.contact-page > .fllm-official-contact-header');
        if(!current)return;
        current.querySelectorAll('.native-nav-dropdown.is-open').forEach(function(item){
          item.classList.remove('is-open');
          var button=item.querySelector('.native-nav-trigger');
          if(button)button.setAttribute('aria-expanded','false');
        });
        var currentNav=current.querySelector('.primary-nav');
        var currentToggle=current.querySelector('.menu-toggle');
        var currentList=current.querySelector('.fllm-contact-list-wrap');
        if(currentNav)currentNav.classList.remove('is-open');
        if(currentToggle)currentToggle.setAttribute('aria-expanded','false');
        if(currentList)currentList.classList.remove('is-open');
      });
    }
  }

  function ensureOfficialShell(){
    var main=document.querySelector('main.contact-page');
    if(!main)return false;

    var header=main.querySelector(':scope > header');
    if(!header || !header.classList.contains('fllm-official-contact-header')){
      var replacement=htmlNode(HEADER_HTML);
      if(header) header.replaceWith(replacement);
      else main.prepend(replacement);
      header=replacement;
    }
    wireHeader(header);

    var footer=document.querySelector('.fllm-official-contact-footer');
    if(!footer){
      footer=htmlNode(FOOTER_HTML);
      main.insertAdjacentElement('afterend',footer);
    }
    return true;
  }

  function stabilize(){
    [0,60,180,420,900,1600,2800,4500].forEach(function(delay){
      setTimeout(ensureOfficialShell,delay);
    });
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',stabilize,{once:true});
  }else{
    stabilize();
  }
  window.addEventListener('load',stabilize,{once:true});
})();