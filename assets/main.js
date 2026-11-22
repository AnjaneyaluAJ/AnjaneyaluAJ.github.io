// Theme toggle, mobile menu, talk filters, active-section highlight. No dependencies.
(function () {
  var root = document.documentElement;

  // ---- Theme (initial value is set by the inline script in <head> to avoid a flash) ----
  var toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      toggle.setAttribute('aria-label', next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked: theme just won't persist */ }
    });
  }

  // ---- Mobile menu ----
  var menuBtn = document.getElementById('menu-toggle');
  var links = document.getElementById('nav-links');
  if (menuBtn && links) {
    menuBtn.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        links.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---- Talk filters ----
  var filters = document.querySelectorAll('.filter');
  var groups = document.querySelectorAll('.talk-group');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      filters.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      groups.forEach(function (g) { g.hidden = f !== 'all' && g.getAttribute('data-group') !== f; });
    });
  });
  // Talk counts per group, so adding a talk never needs a number edited by hand
  groups.forEach(function (g) {
    var c = g.querySelector('.count');
    if (c) c.textContent = g.querySelectorAll('.talk').length;
  });

  // ---- Active nav link while scrolling ----
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  var byId = {};
  navLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && byId[en.target.id]) {
          navLinks.forEach(function (a) { a.classList.remove('active'); });
          byId[en.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
