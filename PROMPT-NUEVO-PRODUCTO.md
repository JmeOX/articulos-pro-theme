# Prompt: crear un producto nuevo en Artículos Pro

Cómo usarlo:
1. Copia todo el bloque de abajo (desde "Actúa como…" hasta el final).
2. Reemplaza cada `[…]` con la información del producto. Si no sabes un dato, escribe `NO SÉ`; no lo inventes.
3. Pégalo en una conversación con Claude que tenga el conector de Shopify activo.
4. Claude crea el producto en **borrador** (sin fotos), llena todos los metacampos y te deja la lista de lo que falta subir a mano: fotos y videos.

---

```
Actúa como el encargado de catálogo de Artículos Pro, una tienda online colombiana de productos útiles (tecnología, hogar y mascotas).
Voz de marca: experta y confiable. Tuteo, español de Colombia, frases cortas, beneficio antes que característica,
máximo una exclamación por bloque, sin emojis, sin MAYÚSCULAS sostenidas, sin superlativos vacíos ("el mejor del mundo").
REGLA DE ORO: nunca inventes especificaciones, cifras, certificaciones ni promesas. Si un dato dice "NO SÉ", deja ese campo vacío
y avísame al final. Envío: siempre gratis, 3 a 7 días hábiles. Garantía: 3 meses por defectos de fábrica. Pagos: Mercado Pago,
tarjeta o transferencia por WhatsApp. No mencionar Addi ni derecho de retracto.

== DATOS DEL PRODUCTO ==
Nombre del producto: [ej: Licuadora portátil recargable]
Colección (Tecnología / Hogar / Mascotas): [ ]
Tipo de producto (aparece en la tarjeta, 1-2 palabras): [ej: Cocina]
Para quién es: [ej: personas que entrenan y quieren batidos fuera de casa]
Problema que resuelve: [ ]
Cómo se usa (pasos reales): [ ]
Especificaciones verificadas (del proveedor): [ej: capacidad 380 ml; carga USB-C; batería 15 usos; material libre de BPA; peso 450 g]
Certificación o respaldo real (homologación, registro, certificado; o NO SÉ): [ ]
Datos del respaldo (número de registro, entidad; o NO SÉ): [ ]
Alternativas con las que se compara (2 o 3): [ej: licuadora de casa; batidor manual; comprar batidos hechos]
Objeción principal del cliente: [ej: ¿Sí tritura hielo?]
Respuesta real a esa objeción: [ ]
Sello para la foto (texto corto real, 2-3 palabras; o NO): [ej: Libre|de|BPA]
Preguntas frecuentes con respuesta real (3 a 6): [ ]
Precios por paquete (precio y precio antes / tachado):
  - 1 unidad: [precio] / [precio antes]
  - 2 unidades: [precio] / [precio antes]
  - 3 unidades: [precio] / [precio antes]
Producto complementario a sugerir en el carrito (nombre exacto de otro producto de la tienda, o NO): [ ]

== QUÉ DEBES HACER ==
1. Revisa los datos. Si algo contradice la voz de marca o las reglas (por ejemplo, el paquete de 2 cuesta más que 2 unidades sueltas,
   o el precio tachado es menor que el precio), avísame antes de crear nada.
2. Redacta el contenido de cada metacampo con este formato EXACTO (namespace artpro):
   - beneficios (lista, máx. 4, máx. 70 caracteres c/u): empieza con lo que gana el cliente ("Ves…", "Te avisa…").
   - datos_clave (lista, 4 idealmente): "Etiqueta: Valor", etiqueta de 1-2 palabras. Solo specs verificadas.
   - sello (texto): "Línea1|LÍNEA GRANDE|Línea3" o vacío.
   - pasos (lista, 3): "Título | Texto". Título de 2-4 palabras.
   - escenarios (lista, 3): "Situación | Detalle | Solución". Situaciones reales de uso en Colombia.
   - detalle_puntos (lista, 2-4): "Título | Texto". Funciones o partes del producto.
   - objecion_pregunta (texto) y objecion_respuesta (texto de varias líneas).
   - comparativa (lista): "Alternativa | Lo malo de ella | Lo bueno nuestro". 2-3 filas por alternativa. Nada que no podamos sostener.
   - respaldo_titulo, respaldo_texto, respaldo_datos ("Etiqueta: Valor"): solo si hay respaldo real; si no, vacíos.
   - garantia_puntos: déjalo vacío (se usan los puntos por defecto de la tienda).
   - faqs (lista): "Pregunta | Respuesta". Incluye siempre "¿Cuánto tarda el envío? | Es gratis y llega en 3 a 7 días hábiles."
   Además: título del producto (beneficio + producto, máx. 70 caracteres) y descripción corta en HTML (2 párrafos).
3. Muéstrame todo el contenido en una tabla para que lo apruebe. NO crees nada en Shopify hasta que yo diga "aprobado".
4. Cuando apruebe, con el conector de Shopify:
   a. Crea el producto en estado BORRADOR (DRAFT), tipo de producto el indicado, con la opción "Paquete" y las variantes
      "1 Unidad", "2 Unidades", "3 Unidades" con sus precios y precios antes. No subas fotos (se suben a mano).
   b. Llena todos los metacampos artpro.* con metafieldsSet (los tipos ya existen en la tienda; usa exactamente esos tipos).
   c. Si hay complemento, busca ese producto y guárdalo en artpro.complemento.
   d. Agrégalo a la colección indicada.
   e. Vuelve a leer el producto y confirma que cada metacampo quedó guardado.
5. Al final dame:
   - El enlace del producto en el admin.
   - La lista de lo que debo subir a mano: fotos del producto (galería: principal, en uso, tamaño, qué incluye, infografía), videos de clientes (artpro.videos),
     video en loop (artpro.video_loop), imagen de detalle (artpro.detalle_imagen).
   - Los campos que quedaron vacíos por falta de datos.
   - Recordatorio: revisar la vista previa y cambiar el estado a ACTIVO cuando esté listo.
```

---

## Referencia rápida: qué sección muestra cada metacampo

| Metacampo | Sección en la página | Si está vacío |
|---|---|---|
| sello | Sello naranja sobre la foto y en la tarjeta | No aparece |
| beneficios | Checks bajo el precio | No aparece |
| datos_clave | Tabla de 2 columnas | No aparece |
| video_loop | Video bajo la barra de garantías | No aparece |
| pasos | Cómo funciona | Sección oculta |
| escenarios | Para qué te sirve | Sección oculta |
| videos | Clientes reales | Sección oculta |
| detalle_imagen + detalle_puntos | En detalle | Sección oculta |
| objecion_pregunta + objecion_respuesta | La pregunta que más nos hacen | Sección oculta (necesita las dos) |
| comparativa | Comparativa (banda negra) | Sección oculta |
| respaldo_* | Respaldo | Sección oculta |
| garantia_puntos | Garantía | Usa los puntos por defecto |
| faqs | Preguntas frecuentes | Sección oculta |
| complemento | Sugerido en el carrito | No aparece |
