(function(){
  var header=document.querySelector('.contact-page > .fllm-official-contact-header');
  if(!header)return;
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

  document.addEventListener('pointerdown',function(event){
    if(!header.contains(event.target)){
      closeAll();
      if(nav)nav.classList.remove('is-open');
      if(toggle)toggle.setAttribute('aria-expanded','false');
      if(listWrap)listWrap.classList.remove('is-open');
    }
  });
  document.addEventListener('keydown',function(event){
    if(event.key==='Escape'){
      closeAll();
      if(nav)nav.classList.remove('is-open');
      if(toggle)toggle.setAttribute('aria-expanded','false');
      if(listWrap)listWrap.classList.remove('is-open');
    }
  });
})();
