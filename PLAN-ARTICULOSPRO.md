# Artículos Pro — plan y estado del tema

Archivo de traspaso: si se abre una sesión nueva con Claude, empezar leyendo este archivo.

## Contexto
- Tienda Shopify de Artículos Pro (Colombia). Tema base: Dawn 16.1.0, sin publicar.
- Desarrollo local: `shopify theme dev` → http://127.0.0.1:9292
- Manual de marca: artifact "Artículos Pro" (Design System) en claude.ai.
- Mockup aprobado: mockup-articulospro-tienda.html (todas las páginas, móvil y escritorio).
- Forma de trabajo: Claude propone paso + razón → Jesús aprueba → Claude ejecuta y valida → Jesús verifica y hace commit.
- Validación en cada cambio: Theme Check + validar settings_data contra settings_schema + recorrer páginas en theme dev (sin errores de subida/Liquid/consola).

## Decisiones cerradas
- Estilo: estructura "ficha técnica" (títulos a la izquierda con etiqueta naranja, tablas, separadores 2px) + tarjetas radio 12px con sombra suave, botones 8px, una sola banda negra por página.
- Colores: blanco #FFFFFF, gris cálido #F6F4F1, negro #111111, naranja #ED7A07 (texto sobre naranja siempre negro), naranja texto #A85200, naranja suave #FDEEDD. Fuente Hanken Grotesk.
- Pagos: Mercado Pago, Addi, tarjeta, transferencia por WhatsApp. Sin contraentrega.
- Envío siempre gratis, 3 a 5 días hábiles, guía por WhatsApp.
- Garantía 3 meses; si falla se gestiona devolución; no cubre mal uso.
- Horario: lun–vie 8 a.m.–7 p.m., sáb hasta 12 m.
- Ofertas por cantidad = variantes "Paquete" (1/2/3 unidades). Máximo 3 por producto; en el carrito se cambia el paquete, no hay +/-.
- Reseñas: Judge.me. Complemento sugerido en carrito: campo artpro.complemento, oculto si está vacío.
- Tarjeta de producto en colección: lleva a la página de producto (sin botón agregar).
- Home: hero con producto estrella. "Por qué Artículos Pro": calidad garantizada, entrega garantizada, soporte siempre, no es lo del montón.

## Plantilla de producto (13 secciones, contenido por metacampos artpro.*)
1 Galería + artpro.sello · 2 Compra (artpro.beneficios, artpro.datos_clave, variantes Paquete, botón checkout + WhatsApp) · 3 Cómo funciona (artpro.pasos) · 4 Escenarios (artpro.escenarios) · 5 Videos (artpro.videos) · 6 Detalle visual (artpro.detalle_imagen, artpro.detalle_puntos) · 7 Objeción (artpro.objecion_pregunta/respuesta) · 8 Comparativa banda negra (artpro.comparativas) · 9 Respaldo (artpro.respaldo) · 10 Garantía (artpro.garantia_meses, artpro.garantia_puntos) · 11 Reseñas Judge.me · 12 FAQ (artpro.faqs) · 13 Último llamado.
Metaobjetos: Dato, Paso, Escenario, Punto, Comparativa, Respaldo, Pregunta. Sección vacía = no se muestra.

## Estado
- [x] Fase 0: entorno (Dawn local + theme dev)
- [x] Fase 2: tokens (assets/ap-tokens.css), esquemas de color y forma de Dawn, grupo "Artículos Pro" en settings_schema
- [x] Producto GPS creado con variantes Paquete
- [x] Fase 3: elementos globales (anuncio, header, footer + ap-footer-info, WhatsApp flotante, snippets ap-payment-badges / ap-wa-number)
- [x] Fase 4a: bloque de compra (bloques ap_* en main-product: paquetes, beneficios, datos clave, WhatsApp, pagos/garantías; carrito tipo drawer)
- [x] Ajustes 4a: precio ap_price (Ahorras $X), sello artpro.sello (naranja), galería con miniaturas, video en loop artpro.video_loop tras garantías
- [x] Fase 4b: secciones ap-how-it-works, ap-scenarios, ap-videos, ap-detail, ap-objection, ap-compare, ap-backing, ap-warranty, ap-faq (metacampos con listas 'A | B | C', no metaobjetos)
- [x] Fase 4c: ap-final-cta (último llamado + barra fija; botones hacen clic en el botón real de Dawn). Videos de clientes con botón de play propio.
- Metacampos artpro.* creados vía conector de Shopify (graphql). GPS con contenido base; faltan: objecion_respuesta, videos, detalle_imagen, video_loop, specs ⚠️: secciones de contenido + último llamado + barra fija
- Nota: theme dev a veces sube la plantilla antes que la sección nueva → 'touch' a la sección y luego a la plantilla.
- [x] Fase 5: carrito lateral (cart-drawer.liquid + ap-cart.js: banner envío, selector de paquete, regla 1 línea por producto, resumen con ahorro, Finalizar por WhatsApp, pagos, complemento artpro.complemento)
- [x] Fase 6a: tarjeta de producto (sello, ahorro −$X, tipo), colección (etiqueta, botones ap-collection-chips, franja ap-trust-strip, sin filtros). Colecciones Tecnología/Hogar/Mascotas creadas y publicadas; menú principal actualizado.
- [x] Fase 6b: home (ap-hero-product, ap-trust-strip, ap-categories, ap-featured, ap-star-band, ap-why, ap-faq-general, ap-wa-cta)
- [ ] Fase 6c: páginas informativas, búsqueda, 404
- Nota: los nombres de sección (schema name) deben tener máx. 25 caracteres.
- [ ] Fase 7: apps, pruebas, publicación

## Datos pendientes
Número de WhatsApp, correo, specs del GPS (batería, agua, peso, app), mensualidad/SIM, transportadora, tiempo de envío de la guía, frase final de "Entrega garantizada".
