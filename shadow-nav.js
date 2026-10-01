(function () {
  var HOME = 'Installation Guide Home.dc.html';
  function isHome() { return decodeURIComponent(location.pathname).indexOf(HOME) >= 0; }
  function goBack(fallback) {
    var sameSite = document.referrer && document.referrer.indexOf(location.origin) === 0;
    if (history.length > 1 && sameSite) history.back();
    else location.href = fallback || HOME;
  }
  window.shadowBack = goBack;

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.hasAttribute('data-nav-fixed')) return;
    var t = (a.textContent || '').replace(/\s+/g, ' ').trim();
    if (/^[→←\s]*رجوع/.test(t) || /^[→←]\s*$/.test(t)) {
      e.preventDefault();
      goBack(a.getAttribute('href'));
    }
  }, true);

  function hasOwnNav() {
    if (document.querySelector('a[href*="Installation Guide Home"]')) return true;
    var els = document.querySelectorAll('a,button');
    for (var i = 0; i < els.length; i++) {
      if (els[i].closest('#shadow-nav')) continue;
      if (/^[→←\s]*رجوع/.test((els[i].textContent || '').trim())) return true;
    }
    return false;
  }
  function mount() {
    if (isHome() || document.getElementById('shadow-nav')) return;
    var bar = document.createElement('div');
    bar.id = 'shadow-nav';
    bar.setAttribute('dir', 'rtl');
    bar.style.cssText = 'position:fixed;left:18px;bottom:18px;z-index:9999;display:flex;gap:6px;padding:6px;border-radius:999px;background:#111314;box-shadow:0 8px 24px rgba(0,0,0,.25);font-family:Cairo,"IBM Plex Sans Arabic",system-ui,sans-serif;';
    function btn(label, fn, primary) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      b.style.cssText = 'border:none;cursor:pointer;border-radius:999px;padding:9px 16px;font:700 14px Cairo,system-ui,sans-serif;white-space:nowrap;' +
        (primary ? 'background:#A50034;color:#fff;' : 'background:#22282a;color:#f0f1f2;');
      b.onmouseenter = function () { b.style.filter = 'brightness(1.15)'; };
      b.onmouseleave = function () { b.style.filter = ''; };
      b.onclick = fn;
      return b;
    }
    bar.appendChild(btn('→ رجوع', function () { goBack(); }, true));
    bar.appendChild(btn('الرئيسية', function () { location.href = HOME; }, false));
    var st = document.createElement('style');
    st.textContent = '@media print{#shadow-nav{display:none!important}}';
    document.head.appendChild(st);
    document.body.appendChild(bar);
    document.body.style.paddingBottom = '84px';
  }
  function later() { setTimeout(mount, 300); }
  if (document.readyState === 'complete') later(); else window.addEventListener('load', later);
})();
