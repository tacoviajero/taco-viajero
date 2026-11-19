# Website TacoViajero

Estado documentado: 19 de noviembre de 2026, a partir de la copia local cuyo remoto `origin` es `https://github.com/tacoviajero/taco-viajero.git`. Esta revisión no acredita paridad con la rama remota ni con el hosting.

## Propósito y fuentes

Sitio de marca personal de Juan Antonio Nuñez: presenta su trabajo en software, operaciones, servicios web, recorridos 360, movilidad local y trayectoria personal y profesional. Atiende a posibles clientes, colaboradores, visitantes de CDMX y reclutadores.

Consultar [PRODUCT.md](PRODUCT.md) para público y contenido, [DESIGN.md](DESIGN.md) para identidad visual y [PORTAFOLIO_PROYECTOS_DIGITALES.md](PORTAFOLIO_PROYECTOS_DIGITALES.md) para los proyectos descritos. [manifest.md](manifest.md), [session-notes.md](session-notes.md) y [AUDIT.md](AUDIT.md) contienen decisiones e historia; algunas ya difieren del código vigente. Este documento concentra la operación actual sin reemplazar esas fuentes.

La operación se rige por [AGENTS.md](AGENTS.md), que aplica la [política global de esfuerzo y validación](https://github.com/tacoviajero/engineering-standards/blob/HEAD/policies/effort-validation.md). [docs/validation.md](docs/validation.md) concreta su aplicación al sitio. Las comprobaciones históricas descritas más adelante conservan su fecha y alcance; esta normalización documental no las reejecuta.

## Arquitectura y tecnologías

HTML estático, CSS nativo y JavaScript vanilla compartido. Las páginas se editan directamente y duplican su marcado de navegación y footer; no hay motor de plantillas. No se encontró `package.json`, framework de aplicación, base de datos, backend de correo, proceso de compilación ni suite de pruebas del sitio. Las tecnologías mencionadas en las descripciones de El Tizón, Fútbol o 360Tours Studio corresponden a esos productos, no a dependencias de este website.

| Ubicación | Responsabilidad |
| --- | --- |
| `index.html` | Entrada `noindex`, redirección HTML inmediata a `es/` y enlace alternativo manual |
| `es/`, `en/` | Páginas independientes por idioma |
| `css/styles.css` | Tokens, componentes, variantes de página, responsive y movimiento reducido |
| `js/main.js` | Header, menú móvil, anclas, carrusel y formularios |
| `assets/` | Icono, fotografías, fondos y referencias de paleta |
| `tours/demo-01/index.html` | Placeholder independiente, incrustado desde HomeTours360 |
| `.htaccess` | Redirecciones 301 antiguas para Apache |
| `dev-server.mjs` | Servidor HTTP local con módulos nativos de Node.js |

Fuentes externas: Google Fonts carga Inter y Playfair Display. Hay enlaces a redes sociales. Los recursos gráficos principales se sirven localmente; no existe descubrimiento automático de imágenes de galería.

## Páginas e idiomas

| Contenido | Español | Inglés |
| --- | --- | --- |
| Landing | `/es/` | `/en/` |
| Artículo personal | `/es/conoceme/` | `/en/about-me/` |
| Contacto | `/es/contact-me/` | `/en/contact-me/` |
| Trayectoria | `/es/cv-experiencia/` | `/en/cv-work-experience/` |
| Proyectos digitales | `/es/proyectos-digitales/` | `/en/digital-projects/` |
| Trusted driver | `/es/beep-beep/` | `/en/beep-beep/` |
| Servicio de tours | `/es/hometours360/` | `/en/hometours360/` |
| Ruta antigua | `/es/hospitality-management/` | `/en/hospitality-management/` |

Las rutas antiguas redirigen a HomeTours360 del mismo idioma mediante reglas del servidor y páginas HTML de respaldo. La demo `/tours/demo-01/` es compartida y su texto actual está en español.

La landing actual presenta hero, sistemas (El Tizón, Fútbol y 360Tours Studio), servicios, galería, Beep Beep, presentación personal, acceso al CV y contacto. Su menú tiene Sistemas, Servicios y Sobre mí. Otras páginas conservan menús más extensos o navegación interna propia; HomeTours360 ofrece Servicios, Demo, Cómo funciona, Precios y Contacto, con CTA Cotizar y regreso mediante la marca.

## Funcionalidades existentes

- Header fijo con glass inicial y clase `is-scrolled` después de 24px de desplazamiento. Menú móvil con `hidden`, `aria-expanded`, cierre al elegir enlace y Escape con retorno del foco.
- Carrusel de la landing con orden barajado en cada carga, imagen principal, leyenda, miniaturas, botones anterior/siguiente y flechas de teclado. El HTML enumera las imágenes manualmente.
- Navegación de anclas: algunos enlaces desktop terminados en `-anchor` descuentan la altura del header. HomeTours360 aplica a sus anclas internas un margen adicional de 28px y actualiza el hash.
- Formularios de contacto y cotización HomeTours360: nombre de al menos dos caracteres, correo con validación de formato, mensaje obligatorio y revisión de los campos adicionales requeridos. Preparan `mailto:juan@tacoviajero.com` y regresan al home configurado tras 900ms. No comprueban que el correo se haya enviado; dependen del cliente de correo del visitante.
- HomeTours360: servicios, iframe y enlace a demo, timeline, factores de cotización y formulario ampliado. La demo aún no es un recorrido real.
- Páginas editoriales con fotografías, CV y presentación de proyectos. Selector ES/EN y metadatos `lang`, canonical y hreflang; conviven URLs relativas y absolutas.

El breakpoint principal es 900px: hasta ese ancho se aplica móvil/tablet, desde 901px escritorio; existen ajustes adicionales a 620px y para ciertos anchos desktop. La presencia de reglas de accesibilidad o metadatos no certifica su cumplimiento integral.

## Desarrollo y publicación

Desde la raíz, en PowerShell, ejecutar `node dev-server.mjs`. Escucha en `127.0.0.1:5500`; permite otro puerto mediante `$env:PORT = '5501'`. Reutilizar sólo un servidor que corresponda a esta carpeta. Es una herramienta local que sirve la raíz de ejecución, sin compilación ni filtrado específico de documentación interna.

El paquete público contiene `.htaccess`, `index.html`, `css/`, `js/`, `assets/`, `es/`, `en/` y `tours/`. Mantener documentación, instrucciones, `info/`, configuraciones de agentes y servidor local fuera del paquete. `.htaccess` requiere Apache con soporte para esas reglas; el servidor Node reproduce las redirecciones antiguas, pero no demuestra su funcionamiento en producción. No se encontró configuración versionada de despliegue automatizado. La transferencia al hosting y las comprobaciones de producción requieren autorización y acceso correspondientes.

La política de `.gitignore` admite principalmente archivos públicos y excluye por defecto la documentación operativa y `dev-server.mjs`. `AGENTS.md`, `PROJECT.md` y `docs/validation.md` se incorporan explícitamente al seguimiento de Git por autorización del propietario. Los demás documentos de referencia permanecen locales; sus enlaces relativos requieren esa copia local. Existencia local, seguimiento por Git y publicación en el hosting son estados diferentes.

## Pendientes y discrepancias observados

Detectados mediante lectura y comprobación estática de referencias el 19 de noviembre de 2026; sin correcciones de código en esta tarea:

- Las landing enlazan a `proyectos-digitales/#tizon`, `#futbol`, `#360tours` y sus equivalentes ingleses. Esos IDs no existen en las páginas de destino; la sección destacada de El Tizón usa `el-tizon`.
- Los headers de Beep Beep, artículo personal, contacto y CV en ambos idiomas enlazan a fragmentos retirados de la landing: `#proyectos`/`#projects`, `#hometours360-anchor` y `#hometours360`. Esto impide llegar a la sección pretendida.
- El script compartido cambia la etiqueta accesible del menú a español también en páginas inglesas.
- La demo es un placeholder; los formularios sólo preparan el correo. Las demos privadas de sistemas conducen al contacto.
- Existen diferencias entre documentación histórica y código, y entre menús, años de copyright y versiones de assets de distintas páginas. Requieren alcance explícito antes de armonizarlos.

La comprobación estática de atributos `href`/`src` de los HTML no encontró archivos locales ausentes. No cubrió URLs de CSS, comportamiento visual, entrega de correo, recursos externos ni hosting. Para elegir validación futura consultar [docs/validation.md](docs/validation.md).
