(function () {
  var root = document.currentScript ? document.currentScript.closest('.brand-exp') : document.querySelector('.brand-exp');
  if (!root) root = document;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Rotate products — each visit shuffles a random pick from the real catalog pool
  var rotateGrids = root.querySelectorAll('[data-rotate-grid]');
  rotateGrids.forEach(function (grid) {
    var show = parseInt(grid.getAttribute('data-show'), 10) || 6;
    var cards = Array.prototype.slice.call(grid.children);
    for (var i = cards.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = cards[i]; cards[i] = cards[j]; cards[j] = tmp;
    }
    grid.innerHTML = '';
    cards.slice(0, show).forEach(function (card, idx) {
      card.style.setProperty('--d', (idx * 70) + 'ms');
      grid.appendChild(card);
    });
  });

  // Background video — real footage instead of stills. Lazy-loaded per section
  // (only the hero loads eagerly, since it's always the first thing on screen),
  // paused off-screen to save battery/bandwidth, and skipped entirely when the
  // visitor prefers reduced motion (the poster frame stays as a still image).
  var bgVideos = Array.prototype.slice.call(root.querySelectorAll('[data-bg-video]'));
  if (bgVideos.length) {
    if (reduce) {
      bgVideos.forEach(function (video) { video.removeAttribute('autoplay'); video.pause(); });
    } else {
      function loadVideo(video) {
        var source = video.querySelector('source[data-src]');
        if (source) {
          source.src = source.getAttribute('data-src');
          source.removeAttribute('data-src');
          video.load();
        }
      }
      function playVideo(video) {
        var p = video.play();
        if (p && p.catch) p.catch(function () {});
      }
      var eagerVideos = bgVideos.filter(function (v) { return v.hasAttribute('data-eager'); });
      eagerVideos.forEach(function (v) { loadVideo(v); playVideo(v); });

      if ('IntersectionObserver' in window) {
        var videoIO = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            var video = entry.target;
            if (entry.isIntersecting) {
              if (video.querySelector('source[data-src]')) loadVideo(video);
              playVideo(video);
            } else {
              video.pause();
            }
          });
        }, { rootMargin: '600px 0px 600px 0px', threshold: 0 });
        bgVideos.forEach(function (v) { videoIO.observe(v); });
      } else {
        bgVideos.forEach(function (v) { loadVideo(v); playVideo(v); });
      }
    }
  }

  // Hero headline word-by-word blur-in.
  // The text is rendered server-side inside the h1 (so crawlers and no-JS visitors
  // get a real heading); we read it back, clear it, and re-emit it as animated words.
  var headline = root.querySelector('#heroHeadline');
  if (headline) {
    var text = (headline.textContent || '').trim();
    if (text) { headline.textContent = ''; }
    text.split(/\s+/).forEach(function (w, i) {
      var span = document.createElement('span');
      span.className = 'word';
      span.textContent = w + ' ';
      span.style.animationDelay = (0.15 + i * 0.07) + 's';
      headline.appendChild(span);
    });
    if (reduce) {
      root.querySelectorAll('.word, .eyebrow, .hero p, .hero-cta').forEach(function (el) {
        el.style.animation = 'none';
        el.style.opacity = 1;
        el.style.filter = 'none';
        el.style.transform = 'none';
      });
    }
  }

  // Nav theme invert — header.liquid only adds 'brand-nav-invert' when template == 'index'
  var headerWrapper = document.querySelector('.shopify-section-header .header-wrapper.brand-nav-invert');
  if (headerWrapper) {
    var sections = Array.prototype.slice.call(root.querySelectorAll('[data-nav-theme]'));
    function applyNavTheme(theme) {
      headerWrapper.classList.remove('brand-theme-dark', 'brand-theme-light');
      if (window.scrollY > 40) {
        headerWrapper.classList.add('brand-theme-' + theme);
      }
    }
    if ('IntersectionObserver' in window && sections.length) {
      var navIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            applyNavTheme(entry.target.getAttribute('data-nav-theme'));
          }
        });
      }, { rootMargin: '-52px 0px -94% 0px', threshold: 0 });
      sections.forEach(function (s) { navIO.observe(s); });
    }
    window.addEventListener('scroll', function () {
      if (window.scrollY < 10) {
        headerWrapper.classList.remove('brand-theme-dark', 'brand-theme-light');
      }
    }, { passive: true });
  }

  if (!reduce) {
    // Hero parallax
    var heroBg = root.querySelector('#heroBg');
    if (heroBg) {
      var updateParallax = function () { heroBg.style.setProperty('--sy', window.scrollY); };
      window.addEventListener('scroll', function () { requestAnimationFrame(updateParallax); }, { passive: true });
    }

    // Scroll-scrubbed kinetic statements
    var kinetics = Array.prototype.slice.call(root.querySelectorAll('.kinetic'));
    function updateKinetics() {
      var vh = window.innerHeight;
      kinetics.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var center = r.top + r.height / 2;
        var dist = Math.abs(center - vh / 2);
        var progress = 1 - Math.min(dist / (vh * 0.5), 1);
        progress = Math.max(0, Math.min(1, progress));
        el.style.setProperty('--kp', progress.toFixed(3));
      });
    }
    if (kinetics.length) {
      window.addEventListener('scroll', function () { requestAnimationFrame(updateKinetics); }, { passive: true });
      window.addEventListener('resize', updateKinetics);
      updateKinetics();
    }

  } else {
    root.querySelectorAll('.kinetic').forEach(function (el) { el.style.setProperty('--kp', 1); });
  }

  // Reveal-on-scroll
  var revealTargets = root.querySelectorAll('.chapter-head, .chapter-collage, .product-card, .chapter-feature, .subcat-tile, .im-ship-inner, .closing-text');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle('visible', entry.isIntersecting);
      });
    }, { threshold: 0.2 });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('visible'); });
  }

  // Scroll suave a los capítulos desde los botones del hero (y cualquier
  // enlace interno con "#"). Se maneja a mano en vez de dejarlo al
  // navegador porque si el hash de la URL ya es el mismo (ej. el
  // visitante ya había hecho clic antes y regresó arriba), el navegador
  // no vuelve a saltar solo con un clic nuevo.
  root.querySelectorAll('a[href^="#"]').forEach(function (link) {
    var targetId = link.getAttribute('href').slice(1);
    if (!targetId) return;
    link.addEventListener('click', function (e) {
      var target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      if (history.pushState) {
        history.pushState(null, '', '#' + targetId);
      }
    });
  });

  // Barra deslizable de la franja de subcategorías (Cañas, Anzuelos,
  // etc.): en escritorio con mouse no había forma visible de moverla,
  // así que se agregó esta barra propia (arrastrable con el mouse,
  // igual de visible en cualquier navegador).
  root.querySelectorAll('.subcat-row').forEach(function (row) {
    var track = row.querySelector('[data-subcat-scroll]');
    var bar = row.querySelector('[data-subcat-scrollbar]');
    var thumb = row.querySelector('[data-subcat-thumb]');
    if (!track || !bar || !thumb) return;

    function maxThumbLeft() { return bar.clientWidth - thumb.offsetWidth; }
    function maxScroll() { return Math.max(0, track.scrollWidth - track.clientWidth); }

    function updateThumb() {
      var overflow = track.scrollWidth - track.clientWidth;
      if (overflow <= 4) { bar.hidden = true; return; }
      bar.hidden = false;
      var ratio = track.clientWidth / track.scrollWidth;
      // Tope de 45% del ancho de la pista: cuando casi todo el contenido
      // ya es visible, el thumb proporcional real ocuparía casi toda la
      // barra y se leería como una sola barra sólida en vez de "barrita
      // dentro de barra". Recortarlo garantiza que siempre se distinga
      // el thumb de la pista, y que haya recorrido visible al arrastrar.
      var thumbWidth = Math.min(bar.clientWidth * 0.45, Math.max(40, ratio * bar.clientWidth));
      thumb.style.width = thumbWidth + 'px';
      var mtl = bar.clientWidth - thumbWidth;
      var scrollRatio = track.scrollLeft / overflow;
      thumb.style.left = (scrollRatio * mtl) + 'px';
    }

    track.addEventListener('scroll', updateThumb, { passive: true });
    window.addEventListener('resize', updateThumb);
    updateThumb();

    // Arrastrar el thumb directamente
    var dragging = false, startX = 0, startLeft = 0;
    thumb.addEventListener('pointerdown', function (e) {
      dragging = true;
      thumb.classList.add('is-dragging');
      startX = e.clientX;
      startLeft = parseFloat(thumb.style.left) || 0;
      thumb.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    thumb.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var mtl = maxThumbLeft();
      if (mtl <= 0) return;
      var newLeft = Math.min(mtl, Math.max(0, startLeft + (e.clientX - startX)));
      thumb.style.left = newLeft + 'px';
      track.scrollLeft = (newLeft / mtl) * maxScroll();
    });
    ['pointerup', 'pointercancel'].forEach(function (evt) {
      thumb.addEventListener(evt, function () {
        dragging = false;
        thumb.classList.remove('is-dragging');
      });
    });

    // Clic en la barra (fuera del thumb) salta directo a ese punto
    bar.addEventListener('click', function (e) {
      if (e.target === thumb) return;
      var rect = bar.getBoundingClientRect();
      var clickRatio = (e.clientX - rect.left) / rect.width;
      track.scrollTo({ left: clickRatio * maxScroll(), behavior: reduce ? 'auto' : 'smooth' });
    });
  });
})();
