/*
  ap-cart.js — comportamiento del carrito lateral de Artículos Pro.
  1) Selector de paquete: cambia la variante de una línea (quita la vieja, agrega la nueva).
  2) Complemento sugerido: botón "Agregar".
  3) Regla de paquetes: máximo una línea por producto con paquetes y cantidad 1
     (si agregan otro paquete del mismo producto, queda el último elegido).
  Después de cada cambio, vuelve a pintar el carrito con el mismo método que usa Dawn.
*/
(() => {
  const SECTIONS = ['cart-drawer', 'cart-icon-bubble'];
  const drawer = () => document.querySelector('cart-drawer');

  async function postJSON(url, body) {
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(body) });
    return res.json();
  }
  function render(state) {
    const d = drawer();
    if (d && state && state.sections) d.renderContents(state);
  }

  // 1 y 2: clics dentro del carrito
  document.addEventListener('click', async (e) => {
    const pack = e.target.closest('[data-ap-pack-from]');
    const add = e.target.closest('[data-ap-add-variant]');
    if (!pack && !add) return;
    e.preventDefault();
    const btn = pack || add;
    btn.disabled = true;
    try {
      if (pack) {
        const cart = await (await fetch('/cart.js')).json();
        const line = cart.items.find((i) => i.key === pack.dataset.apPackFrom);
        const updates = {};
        if (line) updates[line.variant_id] = 0;
        updates[pack.dataset.apPackTo] = 1;
        render(await postJSON('/cart/update.js', { updates, sections: SECTIONS }));
      } else {
        render(await postJSON('/cart/add.js', { items: [{ id: Number(add.dataset.apAddVariant), quantity: 1 }], sections: SECTIONS }));
      }
    } finally {
      btn.disabled = false;
    }
  });

  // 3: regla de paquetes después de cada "agregar al carrito"
  const isPackLine = (i) => !i.product_has_only_default_variant && i.options_with_values && i.options_with_values.length === 1;
  async function normalize() {
    const cart = await (await fetch('/cart.js')).json();
    const seen = new Set();
    const updates = {};
    let changed = false;
    for (const item of cart.items) {          // cart.items viene del más nuevo al más viejo
      if (!isPackLine(item)) continue;
      if (seen.has(item.product_id)) { updates[item.key] = 0; changed = true; continue; }
      seen.add(item.product_id);
      if (item.quantity !== 1) { updates[item.key] = 1; changed = true; }
    }
    if (changed) render(await postJSON('/cart/update.js', { updates, sections: SECTIONS }));
  }
  if (typeof subscribe === 'function' && typeof PUB_SUB_EVENTS !== 'undefined') {
    subscribe(PUB_SUB_EVENTS.cartUpdate, (event) => {
      if (event && event.source === 'product-form') setTimeout(normalize, 50);
    });
  }
})();
