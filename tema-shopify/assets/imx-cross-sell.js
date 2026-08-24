// Agregar al carrito desde las sugerencias de cross-sell del carrito
// (snippets/cross-sell-carrito.liquid).
//
// Listener delegado en `document` a propósito: el cajón del carrito se
// re-renderiza con `innerHTML = ...` (assets/cart-drawer.js), que
// descarta cualquier listener adjunto al nodo anterior y NO ejecuta
// <script> inyectados. Tampoco se usa <product-form>/{% form 'product' %}:
// en /cart la barra de envío gratis y este bloque viven dentro de
// <form id="cart"> (sections/main-cart-items.liquid:101), y un <form>
// anidado lo descarta el parser del navegador — por eso el botón es un
// <button type="button" data-imx-add="VARIANT_ID"> simple, sin form.
document.addEventListener('click', function (event) {
  var button = event.target.closest('[data-imx-add]');
  if (!button || button.hasAttribute('aria-disabled')) return;
  event.preventDefault();

  var cartDrawer = document.querySelector('cart-drawer');
  var cartNotification = document.querySelector('cart-notification');
  var cartComponent = cartDrawer || cartNotification;
  var enCarritoPagina = window.location.pathname === (window.routes && window.routes.cart_url);

  button.setAttribute('aria-disabled', 'true');
  button.classList.add('loading');

  var body = JSON.stringify({
    items: [{ id: Number(button.dataset.imxAdd), quantity: 1 }],
    sections: cartComponent && !enCarritoPagina && cartComponent.getSectionsToRender
      ? cartComponent.getSectionsToRender().map(function (s) { return s.id; })
      : undefined,
    sections_url: window.location.pathname,
  });

  fetch(window.routes.cart_add_url, Object.assign({ body: body }, fetchConfig('javascript')))
    .then(function (response) { return response.json(); })
    .then(function (data) {
      if (data.status) {
        button.removeAttribute('aria-disabled');
        button.classList.remove('loading');
        return;
      }
      if (enCarritoPagina || !cartComponent) {
        window.location.reload();
        return;
      }
      cartComponent.renderContents(data);
    })
    .catch(function (error) {
      console.error(error);
      button.removeAttribute('aria-disabled');
      button.classList.remove('loading');
    });
});
