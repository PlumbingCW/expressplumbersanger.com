(function(){
  'use strict';
  var d=document,root=d.documentElement;
  root.classList.remove('nojs');
  var burger=d.getElementById('hamburger'),drawer=d.getElementById('mob-drawer'),overlay=d.getElementById('mob-overlay'),closeBtn=d.getElementById('drawer-close');
  var lastFocus=null;
  function openDrawer(){
    if(!drawer)return;
    lastFocus=d.activeElement;
    drawer.classList.add('open');overlay.classList.add('visible');
    burger.setAttribute('aria-expanded','true');drawer.setAttribute('aria-hidden','false');
    root.classList.add('drawer-open');
    if(closeBtn)closeBtn.focus();
  }
  function closeDrawer(){
    if(!drawer)return;
    drawer.classList.remove('open');overlay.classList.remove('visible');
    burger.setAttribute('aria-expanded','false');drawer.setAttribute('aria-hidden','true');
    root.classList.remove('drawer-open');
    if(lastFocus)lastFocus.focus();
  }
  if(burger){
    burger.addEventListener('click',function(){burger.getAttribute('aria-expanded')==='true'?closeDrawer():openDrawer();});
    if(closeBtn)closeBtn.addEventListener('click',closeDrawer);
    if(overlay)overlay.addEventListener('click',closeDrawer);
    drawer.addEventListener('click',function(e){if(e.target.closest('a'))closeDrawer();});
    d.addEventListener('keydown',function(e){
      if(e.key==='Escape'&&drawer.classList.contains('open'))closeDrawer();
      if(e.key==='Tab'&&drawer.classList.contains('open')){
        var f=drawer.querySelectorAll('a,button');if(!f.length)return;
        var first=f[0],last=f[f.length-1];
        if(e.shiftKey&&d.activeElement===first){e.preventDefault();last.focus();}
        else if(!e.shiftKey&&d.activeElement===last){e.preventDefault();first.focus();}
      }
    });
    window.addEventListener('resize',function(){if(window.innerWidth>768&&drawer.classList.contains('open'))closeDrawer();});
  }
  // desktop dropdowns: Escape closes, keyboard focus opens via :focus-within
  d.querySelectorAll('.has-dropdown>a').forEach(function(a){
    a.addEventListener('keydown',function(e){if(e.key==='Escape')a.blur();});
  });
  // FAQ accordion
  d.querySelectorAll('.faq-q').forEach(function(q){
    q.addEventListener('click',function(){
      var item=q.parentElement,open=item.classList.toggle('open');
      q.setAttribute('aria-expanded',open?'true':'false');
    });
  });
})();
