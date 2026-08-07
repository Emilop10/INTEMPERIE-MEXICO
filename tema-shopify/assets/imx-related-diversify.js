(function () {
  // "También te interese": elige productos del mismo departamento
  // priorizando DIVERSIDAD de tipo (si el producto actual es un
  // señuelo, prioriza mostrar anzuelos/cañas/etc. en vez de más
  // señuelos), en lugar de repetir siempre el mismo subtipo.

  function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = array[i]; array[i] = array[j]; array[j] = tmp;
    }
    return array;
  }

  function pickDiverse(items, currentType, showCount) {
    // items: [{el, type}]
    var others = shuffle(items.filter(function (it) { return it.type !== currentType; }));
    var sameType = shuffle(items.filter(function (it) { return it.type === currentType; }));

    // Agrupa "others" por tipo, para poder tomar máximo 1 de cada tipo
    // en la primera pasada (ronda-robin) y así maximizar variedad.
    var byType = {};
    others.forEach(function (it) {
      var key = it.type || '';
      if (!byType[key]) byType[key] = [];
      byType[key].push(it);
    });
    var typeKeys = shuffle(Object.keys(byType));

    var chosen = [];
    var chosenSet = new Set();

    // Ronda 1: un producto de cada tipo distinto
    typeKeys.forEach(function (key) {
      if (chosen.length >= showCount) return;
      var pool = byType[key];
      if (pool && pool.length) {
        var it = pool.shift();
        chosen.push(it);
        chosenSet.add(it.el);
      }
    });

    // Ronda 2: si faltan, sigue tomando de tipos distintos (puede repetir tipo)
    var leftoverOthers = shuffle(
      typeKeys.reduce(function (acc, key) { return acc.concat(byType[key]); }, [])
    );
    var oi = 0;
    while (chosen.length < showCount && oi < leftoverOthers.length) {
      var cand = leftoverOthers[oi++];
      if (!chosenSet.has(cand.el)) { chosen.push(cand); chosenSet.add(cand.el); }
    }

    // Último recurso: si el departamento es muy chico, completa con
    // productos del mismo tipo que el actual.
    var si = 0;
    while (chosen.length < showCount && si < sameType.length) {
      var c2 = sameType[si++];
      if (!chosenSet.has(c2.el)) { chosen.push(c2); chosenSet.add(c2.el); }
    }

    return shuffle(chosen);
  }

  function run() {
    var pools = document.querySelectorAll('[data-imx-related-pool]');
    pools.forEach(function (pool) {
      var currentType = pool.getAttribute('data-current-type') || '';
      var showCount = parseInt(pool.getAttribute('data-show-count'), 10) || 4;
      var items = Array.from(pool.querySelectorAll(':scope > li')).map(function (el) {
        return { el: el, type: el.getAttribute('data-imx-type') || '' };
      });
      if (items.length === 0) return;

      var chosen = pickDiverse(items, currentType, showCount);
      var chosenEls = chosen.map(function (c) { return c.el; });

      // Reordena: elegidos primero (visibles), el resto al final (ocultos)
      chosenEls.forEach(function (el) {
        pool.appendChild(el);
        el.style.display = '';
      });
      items.forEach(function (it) {
        if (chosenEls.indexOf(it.el) === -1) {
          pool.appendChild(it.el);
          it.el.style.display = 'none';
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
