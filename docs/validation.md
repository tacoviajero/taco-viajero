# Validación proporcional

Esta guía define comprobaciones futuras; no representa una batería ejecutada ni una certificación del sitio. Arquitectura, rutas y pendientes: [PROJECT.md](../PROJECT.md). Reglas de desarrollo: [AGENTS.md](../AGENTS.md).

## Elegir alcance y cierre

Aplicar la [política global de esfuerzo y validación](https://github.com/tacoviajero/engineering-standards/blob/HEAD/policies/effort-validation.md), consultada el 19 de noviembre de 2026, y las reglas operativas resumidas en [AGENTS.md](../AGENTS.md). Esta guía adapta la selección de evidencia a las funcionalidades existentes.

Antes de actuar, definir brevemente componente o comportamiento, nivel de riesgo, comprobaciones necesarias y condición de cierre. Clasificar por impacto:

| Nivel | Aplicación en este sitio | Validación |
| --- | --- | --- |
| 1: bajo | Documentación, texto o presentación aislada sin dependencias significativas | Comprobaciones directamente relacionadas |
| 2: moderado | Carrusel, menú, formularios o navegación con interacciones existentes | Flujo específico e integraciones afectadas |
| 3: alto | Seguridad, operaciones destructivas o cambios de arquitectura compartida con impacto amplio | Riesgos explícitos y verificaciones de integración y regresión pertinentes; revisión completa si el impacto o una obligación de integración lo exige |

Un cambio pequeño puede ser de riesgo alto. Compartir un archivo tampoco impone por sí solo una revisión total: identificar sus consumidores y el impacto real. Respetar cualquier comprobación obligatoria del repositorio o CI vigente; actualmente no se ha identificado una suite definida para este sitio.

Empezar por la comprobación específica y ampliar por dependencias, fallos o incertidumbre concreta. Reutilizar resultados disponibles y verificables cuando código, dependencias y condiciones relevantes sean equivalentes y no exista obligación de repetirlos. Documentar versión, alcance y resultado al transferir evidencia entre chats.

Si falla una comprobación, determinar su relación con los cambios y repetir sólo lo invalidado por la corrección focalizada. Tras dos intentos fallidos de corregir el mismo problema, detenerse y presentar diagnóstico. Registrar problemas ajenos al alcance. Terminar cuando se cumplan los criterios y comprobaciones necesarias, no haya fallos relacionados que impidan completar la tarea y se documenten las limitaciones. Una ampliación sustancial o decisión funcional no autorizada requiere decisión del propietario.

| Cambio | Evidencia suficiente de inicio | Cuándo ampliar |
| --- | --- | --- |
| Sólo documentación | Contrastar con archivos reales, revisar enlaces documentales y diff | Si revela una afirmación incorrecta, documentar el pendiente; corregir código requiere alcance autorizado |
| Texto o enlace de una página | Revisar destino y fragmento, idioma y equivalente traducido; navegador si altera composición | Si cambia navegación común o longitud que afecta otras variantes |
| Imagen o recurso | Existencia, ruta, extensión/capitalización, referencias y visualización en página afectada | Si se comparte con galería, fondo, favicon u otras páginas |
| CSS localizado | Página afectada en escritorio y móvil/tablet | Si el selector, token o breakpoint tiene consumidores adicionales |
| CSS o JS compartido | Sintaxis del JS modificado y flujos consumidores representativos en ES/EN | Si afecta header, layout global o rutas, cubrir las familias de página relevantes |
| Navegación o rutas | Destinos reales, IDs, idioma, regreso y enlaces directos | Si cambia una ruta pública, revisar enlaces entrantes, canonical, hreflang y redirecciones |
| Formulario | Casos inválidos, preparación del correo y destino de retorno por idioma | Si cambia el manejador común, cubrir contacto y cotización en ES/EN |
| Publicación autorizada | Archivos públicos afectados, recursos servidos y versión de caché | Si hay rutas o reglas de servidor, comprobar respuestas reales del hosting |

Una revisión amplia puede corresponder a cambios de estilos globales, estructura de navegación, rutas, lógica compartida o publicación general cuando sus dependencias o fallos lo justifiquen. Cubrir entonces landing, artículo, CV, proyectos, Beep Beep, contacto, HomeTours360 y demo según el impacto identificado. No ejecutar suites completas por defecto ni introducir dependencias para estas comprobaciones.

## Comprobaciones aplicables

### Enlaces y español/inglés

Comprobar `href`, `src`, IDs de fragmentos y rutas relativas desde el directorio real de cada página. Revisar los `data-src` del carrusel y `url(...)` del CSS cuando se cambien recursos. Windows puede ocultar diferencias de mayúsculas que sí importan en hosting.

Recorrer selector ES/EN, regreso mediante la marca y CTAs afectados. Usar la tabla de rutas de `PROJECT.md`: los nombres no siempre coinciden entre idiomas. Verificar `lang`, canonical, hreflang recíproco y `x-default` si cambia la identidad o ubicación de una página. Una comprobación de existencia de archivo no valida el fragmento ni la posición de llegada.

Registrar los defectos preexistentes por separado; los fragmentos ausentes inventariados en `PROJECT.md` siguen pendientes hasta una corrección verificada.

### Responsive, header y teclado

Para cambios visuales, revisar anchos representativos como 390px, 768px y 1440px. Si se cambia el breakpoint principal, incluir 900px y 901px; si se cambia el ajuste pequeño, incluir 620px y 621px. Revisar también alturas desktop reducidas cuando cambien hero o tarjeta de contacto.

Comprobar desbordamiento, legibilidad, orden de contenido, tamaño de miniaturas y botones, títulos y CTA dentro del viewport previsto. Verificar glass inicial y transición a blanco al desplazar. En móvil/tablet comprobar hamburguesa, apertura, cierre, enlaces, `aria-expanded`, Escape y foco; verificar teclado y foco visible en el flujo afectado. Revisar movimiento reducido si cambia desplazamiento o animación. Si se investiga un problema de iOS, probar allí o declarar esa limitación.

### Carrusel

Verificar que las imágenes existan, principal y leyenda correspondan a la miniatura activa, anterior/siguiente recorran circularmente y flechas de teclado funcionen con foco en el carrusel. Recargar para comprobar el barajado sin exigir un orden diferente en cada intento: el azar permite repeticiones. Confirmar miniaturas compactas y ausencia de imágenes rotas en móvil y escritorio.

### Contacto y cotización

Probar nombre vacío, de un carácter y de dos o más; email inválido y válido; mensaje vacío o sólo espacios. En HomeTours360 revisar también los campos adicionales marcados `required`, mensajes y selecciones. Usar datos ficticios.

Verificar destinatario `juan@tacoviajero.com`, asunto y cuerpo codificados, apertura del cliente de correo y retorno al home del idioma correcto. El código navega al home tras 900ms: comprobar ese comportamiento sin describirlo como confirmación de envío. Si se prueba sólo la construcción de la URL, declarar que no se abrió el cliente; abrirlo no acredita entrega. Enviar un mensaje real requiere autorización específica.

### Tours y redirecciones

HomeTours360 debe incrustar `/tours/demo-01/` y permitir abrirlo directamente. El contenido actual es un placeholder español; no validar hotspots ni render de panoramas como funciones existentes.

Para cambios en rutas antiguas revisar `/es/hospitality-management/` y `/en/hospitality-management/`, su destino del mismo idioma y HTML de respaldo. El servidor local contempla rutas con y sin barra final; Apache sólo puede acreditarse mediante respuesta real del hosting. Comprobar código HTTP y `Location` sin confundir una redirección HTML con un 301.

## Comandos existentes

Ejecutar desde la raíz en PowerShell, sólo cuando corresponda al archivo modificado:

```powershell
node --check js/main.js
node --check dev-server.mjs
```

Son validaciones sintácticas, no pruebas de navegador. Para revisión visual o funcional usar el servidor `node dev-server.mjs`, reutilizando uno existente de esta carpeta. No hay comandos npm de build/lint/test definidos.

Para trabajo documental bastan lectura, contraste de referencias y revisión del diff. `git diff` sólo muestra documentos seguidos; comprobar también existencia y seguimiento con `git ls-files -- AGENTS.md PROJECT.md docs/validation.md`. Las reglas de `.gitignore` excluyen documentación por defecto, pero estos tres archivos se incorporan explícitamente a Git por autorización del propietario. Coordinar la inclusión de otros documentos con el responsable de Git.

## Registro al cerrar

Informar archivos modificados, comprobaciones efectivamente realizadas, resultado y cobertura (páginas, idiomas, tamaños y entorno), pendientes descubiertos y límites. Separar revisión estática, sintaxis, interacción en navegador y hosting. Un informe histórico, un HTTP 200 o un chequeo sintáctico aislado no acreditan toda la experiencia.
