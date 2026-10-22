/*
  ap-anim.js — animaciones de Artículos Pro.
  Cada animación se activa con una clase en <body> (ap-a-*), que sale de
  Configuración del tema → "Artículos Pro · Animaciones". Si el cliente tiene
  "reducir movimiento" activado en su dispositivo, no se ejecuta nada.
*/
(() => {
  const body = document.body;
  const on = (name) => body.classList.contains('ap-a-' + name);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const inEditor = window.Shopify && window.Shopify.designMode;
  if (reduced) return;

  /* 5, 6, 7, 12 — Aparecer al bajar: agrega la clase "is-in" cuando el bloque entra en pantalla */
  const REVEAL = '.ap-sec__title, .ap-sec .ap-eyebrow, .ap-hero__txt, .ap-detail, .ap-obj, .ap-cert, .ap-guar, .ap-faq, .ap-final, .ap-wa-cta';
  const STAGGER = '.ap-scen, .ap-why, .ap-cats, .ap-trust4, .ap-featured, .ap-vids';
  const WATCH = '.ap-steps, .ap-tbl, .ap-trust4';
  function setupReveal(root = document) {
    if (!('IntersectionObserver' in window) || inEditor) return;
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }), { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });
    if (on('reveal')) {
      root.querySelectorAll(REVEAL).forEach((el) => { el.classList.add('ap-reveal'); io.observe(el); });
      root.querySelectorAll(STAGGER).forEach((el) => { el.classList.add('ap-stagger'); io.observe(el); });
    }
    root.querySelectorAll(WATCH).forEach((el) => io.observe(el));
  }
  setupReveal();

  /* 12 — Comparativa: repetir la cascada al cambiar de pestaña */
  document.addEventListener('click', (e) => {
    const tab = e.target.closest('.ap-tab');
    if (!tab) return;
    const tbl = tab.closest('[data-ap-compare]')?.querySelector('.ap-tbl');
    if (!tbl) return;
    tbl.classList.remove('is-in'); void tbl.offsetWidth; tbl.classList.add('is-in');
  });

  /* 8 — Carrito: el ícono rebota cuando se agrega un producto */
  if (on('cart') && typeof subscribe === 'function' && typeof PUB_SUB_EVENTS !== 'undefined') {
    subscribe(PUB_SUB_EVENTS.cartUpdate, (event) => {
      if (!event || event.source !== 'product-form') return;
      const icon = document.getElementById('cart-icon-bubble');
      if (!icon) return;
      icon.classList.remove('ap-bump'); void icon.offsetWidth; icon.classList.add('ap-bump');
    });
  }

  /* 11 — Precio que cuenta hasta el valor nuevo al cambiar de paquete */
  if (on('price')) {
    const parse = (t) => Number((t || '').replace(/[^\d]/g, '')) || 0;
    const fmt = (n) => '$' + Math.round(n).toLocaleString('es-CO');
    let last = parse(document.querySelector('.ap-price__now')?.textContent);
    const wrap = document.querySelector('.ap-price')?.parentElement;
    if (wrap) {
      new MutationObserver(() => {
        const el = document.querySelector('.ap-price__now');
        if (!el || el.dataset.apCounting) return;
        const target = parse(el.textContent);
        if (!target || target === last) { last = target; return; }
        const from = last, t0 = performance.now();
        el.dataset.apCounting = '1';
        const step = (t) => {
          const k = Math.min(1, (t - t0) / 450);
          el.textContent = fmt(from + (target - from) * (1 - Math.pow(1 - k, 3)));
          if (k < 1) requestAnimationFrame(step); else { el.textContent = fmt(target); delete el.dataset.apCounting; last = target; }
        };
        requestAnimationFrame(step);
      }).observe(wrap, { childList: true, subtree: true });
    }
  }

  /* 13 — WhatsApp: mensaje que aparece una vez por visita */
  if (on('wa')) {
    const tip = document.querySelector('.ap-wa-tip');
    let seen = false;
    try { seen = sessionStorage.getItem('apWaTip') === '1'; } catch (e) {}
    if (tip && !seen) {
      setTimeout(() => tip.classList.add('is-on'), 4000);
      setTimeout(() => tip.classList.remove('is-on'), 12000);
      try { sessionStorage.setItem('apWaTip', '1'); } catch (e) {}
    }
  }
})();
