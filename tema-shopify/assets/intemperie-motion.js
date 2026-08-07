(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Cinematic reveal on scroll (fade + rise + scale) ---------- */
  function initReveal() {
    var els = document.querySelectorAll('.imx-reveal');
    if (!els.length) return;

    if (reduceMotion) {
      els.forEach(function (el) { el.classList.add('imx-in'); });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('imx-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    els.forEach(function (el, i) {
      if (el.hasAttribute('data-imx-cascade')) {
        el.style.transitionDelay = (i % 10) * 70 + 'ms';
      }
      io.observe(el);
    });
  }

  /* ---------- Subtle parallax on hero media ---------- */
  function initParallax() {
    if (reduceMotion) return;
    var layers = document.querySelectorAll('.imx-parallax');
    if (!layers.length) return;

    var ticking = false;

    function update() {
      var vh = window.innerHeight;
      layers.forEach(function (layer) {
        var rect = layer.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        var progress = (rect.top) / vh; // -1..1 roughly
        var strength = parseFloat(layer.getAttribute('data-imx-parallax')) || 18;
        var translate = progress * strength;
        layer.style.transform = 'translate3d(0,' + translate.toFixed(2) + 'px,0) scale(1.08)';
      });
      ticking = false;
    }

    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          window.requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
    window.addEventListener('resize', update);
    update();
  }

  /* ---------- Global ambient gradient blobs (every page) ---------- */
  function initGlobalBlobs() {
    if (document.querySelector('.imx-blobs--global')) return;
    if (reduceMotion) return;

    var wrap = document.createElement('div');
    wrap.className = 'imx-blobs imx-blobs--global';
    wrap.setAttribute('aria-hidden', 'true');
    wrap.innerHTML =
      '<div class="imx-blob imx-blob--1"></div>' +
      '<div class="imx-blob imx-blob--2"></div>' +
      '<div class="imx-blob imx-blob--3"></div>';
    document.body.appendChild(wrap);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initParallax();
    initGlobalBlobs();
  });

  document.addEventListener('shopify:section:load', function () {
    initReveal();
    initParallax();
  });

  window.imxInitReveal = initReveal;
})();
