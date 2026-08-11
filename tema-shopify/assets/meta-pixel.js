if (window.fbq) {
  subscribe(PUB_SUB_EVENTS.cartUpdate, (event) => {
    if (event.source === 'cart-error') return;
    const item = event.cartData?.items ? event.cartData.items[event.cartData.items.length - 1] : event.cartData;
    if (!item || !item.price) return;
    fbq('track', 'AddToCart', {
      content_ids: [String(event.productVariantId || item.variant_id || item.id)],
      content_type: 'product',
      value: item.price / 100,
      currency: window.Shopify?.currency?.active || 'MXN',
    });
  });
}
