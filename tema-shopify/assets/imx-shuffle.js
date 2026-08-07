(function () {

  var VISIBLE_COUNT = 8;

  function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i]; array[i] = array[j]; array[j] = temp;
    }
    return array;
  }

  function randomizePools() {
    var pools = document.querySelectorAll('[data-imx-pool]');

    pools.forEach(function (pool) {
      var items = Array.from(pool.querySelectorAll(':scope > li'));
      if (items.length === 0) return;

      shuffle(items);

      // Reordena en el DOM y oculta el exceso
      items.forEach(function (item, index) {
        pool.appendChild(item);
        item.style.display = index < VISIBLE_COUNT ? '' : 'none';
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', randomizePools);
  } else {
    randomizePools(); // Por si el DOM ya cargó antes de que corriera el script
  }

})();