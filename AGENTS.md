# Taco Viajero: guía de trabajo para Codex

## Proyecto y fuentes

Sitio estático bilingüe de Taco Viajero: HTML, CSS y JavaScript nativo. Node.js se usa para el servidor de desarrollo. Existe repositorio Git con remoto `https://github.com/tacoviajero/taco-viajero.git`. No hay `package.json` ni comandos npm de compilación o pruebas definidos.

- `PROJECT.md`: mapa operativo del código actual, rutas, publicación y pendientes conocidos.
- `docs/validation.md`: comprobaciones proporcionales y límites de la evidencia.
- `PRODUCT.md`: propósito, público, restricciones de contenido y marca.
- `DESIGN.md`: sistema visual y tokens; contrastar con el CSS vigente antes de modificar estilos.
- `manifest.md`: arquitectura, servicios y decisiones de contenido.
- `PORTAFOLIO_PROYECTOS_DIGITALES.md`: información de proyectos reales.
- `session-notes.md` y `AUDIT.md`: antecedentes históricos. Algunas decisiones difieren entre documentos; comprobar el código vigente y la instrucción actual del usuario antes de restaurar comportamientos antiguos. Una auditoría histórica describe su cobertura y fecha, no acredita el estado actual.

Leer únicamente las fuentes relevantes para la tarea. Mantener esta guía breve y enlazar la documentación existente.

## Estructura y ejecución

- `index.html`: entrada con redirección al sitio español.
- `es/` y `en/`: páginas por idioma, con rutas que pueden tener nombres diferentes.
- `css/styles.css` y `js/main.js`: estilos y comportamiento compartidos.
- `assets/`: imágenes y recursos; `tours/`: recorridos independientes.
- `.htaccess`: redirecciones de producción en Apache.

Ejecutar desde la raíz del proyecto en PowerShell:

```powershell
node dev-server.mjs
```

URL local: `http://127.0.0.1:5500/es/`; inglés: `http://127.0.0.1:5500/en/`. Para otro puerto:

```powershell
$env:PORT = '5501'
node dev-server.mjs
```

Reutilizar un servidor existente si corresponde a esta carpeta. El servidor local enlaza a `127.0.0.1`. El sitio se publica como archivos estáticos, sin compilación.

## Implementación

Conservar HTML semántico, CSS nativo y JavaScript vanilla. Proponer nuevas dependencias o una migración de tecnología cuando la tarea lo requiera y explicar su impacto antes de incorporarlas.

Usar PowerShell y UTF-8 conforme a las instrucciones globales. Mantener los cambios dentro del alcance solicitado y preservar decisiones aprobadas en las demás páginas y tamaños de pantalla.

En cambios compartidos, revisar el equivalente español e inglés, sus enlaces, canonical y hreflang cuando corresponda. Preservar el contenido editorial proporcionado por el usuario; confirmar el alcance de cualquier reescritura o traducción. Usar datos verificables para proyectos, precios y contacto.

Preservar los selectores y atributos `data-*` que enlazan HTML y JavaScript, los IDs usados por navegación, las rutas públicas y la correspondencia de idiomas. Revisar consumidores antes de cambiar CSS o JS compartido. El comportamiento móvil/tablet corresponde a `max-width: 900px`, escritorio a `min-width: 901px`; `620px` es un ajuste adicional para pantallas pequeñas.

Conservar el icono transparente, las fotografías y los tokens vigentes. Antes de renombrar, eliminar o sustituir un recurso, localizar todas sus referencias en HTML, CSS y atributos de galería (`data-src`). Respetar mayúsculas y extensiones para hosting sensible a su capitalización. Mantener rutas relativas correctas desde cada nivel y revisar los parámetros de versión de CSS/JS al publicar cambios compartidos. Los estilos y scripts están principalmente externalizados; la entrada, las redirecciones antiguas y el placeholder del tour contienen código inline existente.

## Seguridad y límites

Mantener secretos, credenciales, datos privados y archivos internos fuera de los recursos públicos. Evitar insertar texto del usuario con `innerHTML`; el formulario actual valida en cliente y abre el gestor de correo mediante `mailto:`, sin backend ni confirmación de entrega. Una integración de envío o almacenamiento requiere alcance explícito y revisión de privacidad y seguridad.

El servidor de desarrollo sirve archivos desde la carpeta de ejecución y sólo debe utilizarse localmente. Para publicar, seleccionar los archivos públicos indicados abajo. No convertir toda la raíz del proyecto en contenido público.

Informar problemas descubiertos fuera del alcance antes de corregirlos. Preservar cambios ajenos. Commit, push y despliegue corresponden a una autorización expresa; respetar la coordinación con el chat de control de versiones. La política actual de `.gitignore` excluye documentación de raíz y `docs/`: señalarlo cuando se solicite versionar estos documentos, sin modificar esa política incidentalmente.

Mantener coherentes las redirecciones de `hospitality-management` a `hometours360` en `dev-server.mjs` y `.htaccess` cuando se modifiquen esas rutas. Comprobar el comportamiento de Apache en el hosting para acreditar su funcionamiento en producción.

## Skills e integraciones

- Usar `$task-observer` en trabajo sustantivo y leer primero su memoria global según las instrucciones globales.
- Usar `impeccable` para tareas de interfaz y diseño; leer su `SKILL.md` y las referencias aplicables.
- Usar 21st cuando ayude a buscar referencias o componentes. Buscar devuelve metadatos; obtener código consume el cupo del servicio según el plan. Considerar ese consumo al elegir qué componentes recuperar.
- Los componentes React/shadcn de 21st requieren evaluar compatibilidad con este sitio vanilla. Adaptar el componente al proyecto y al sistema visual; una referencia visual puede bastar sin importar su código.

## Verificación proporcional

Aplicar la [política global de esfuerzo y validación](https://github.com/tacoviajero/engineering-standards/blob/HEAD/policies/effort-validation.md), consultada el 19 de noviembre de 2026. La estrategia específica del sitio está en [docs/validation.md](docs/validation.md); conservar allí los procedimientos detallados y consultar la fuente global vigente al normalizar estas reglas.

- Antes de actuar, identificar brevemente componente, nivel de riesgo (1 bajo, 2 moderado, 3 alto), comprobaciones necesarias y condición de cierre. El riesgo depende del impacto, no del tamaño del diff.
- Empezar por la comprobación más específica; ampliar sólo por evidencia o dependencia técnica concreta. Administrar tiempo, tokens y recursos; respetar comprobaciones obligatorias del repositorio o CI que existan, proponiendo por separado cualquier cambio de esa obligación.
- Reutilizar evidencia disponible y verificable sólo si código, dependencias y condiciones relevantes siguen siendo equivalentes y no hay obligación de repetirla. Una afirmación de otro chat sin evidencia no basta.
- Ante un fallo, diagnosticar su relación con el cambio, corregir dentro del alcance y repetir sólo las comprobaciones invalidadas. Después de dos intentos fallidos sobre el mismo problema, detenerse y presentar el diagnóstico antes de continuar.
- Completar operaciones rutinarias autorizadas; solicitar decisión cuando se necesite ampliar sustancialmente el alcance, incorporar dependencias importantes o cambiar arquitectura. Registrar y reportar problemas ajenos a la tarea.
- Terminar al cumplir aceptación y comprobaciones necesarias, sin fallos relacionados que impidan cerrar y con limitaciones documentadas. Detenerse también ante decisiones funcionales no autorizadas, límite de reintentos o una verificación necesaria bloqueada que requiera decisión del propietario.

Al cerrar, comunicar cambios, comprobaciones y resultados, aspectos sin verificar y su motivo, y bloqueos. Distinguir revisión estática, sintaxis, navegador y hosting. Los resultados históricos de `AUDIT.md` no sustituyen evidencia actual verificable.

## Publicación

Archivos públicos: `.htaccess`, `index.html`, `css/`, `js/`, `assets/`, `es/`, `en/` y `tours/`.

Mantener las instrucciones de agentes, documentación interna, `info/` y `dev-server.mjs` fuera del paquete público. Publicar requiere una solicitud que autorice el despliegue.
