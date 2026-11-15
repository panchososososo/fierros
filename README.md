# Fierro v3.0

App de entrenamiento personal, offline, instalable en Android.

## Subirla a GitHub Pages
1. En tu repo `fierro`, reemplaza `index.html`, `sw.js`, `manifest.json` y `icons/` por los de este zip.
2. Settings → Pages → rama `main`, carpeta `/ (root)` (si ya estaba activo, no toques nada).
3. Abre `https://TU-USUARIO.github.io/fierro/` en Chrome → menú ⋮ → **Instalar app**.

Si ya tenías instalada la v1, se actualiza sola al abrirla con internet (el `sw.js` cambió a `fierro-v2.1.0`) y conserva tus datos.

## Primer uso
- Ajustes → **Peso corporal**: anótalo para que dominadas y fondos calculen la carga real.
- Ajustes → **Barra y discos**: revisa que coincidan con tu gimnasio.

## Datos
Todo vive en el teléfono. Ajustes → **Descargar respaldo** cada tanto (la app te avisa si pasan 14 días). La sincronización con Gist es opcional y está apagada si no pones token.

## Novedades v3.0
- Hoy: semana con los días de la rutina, meta en números grandes y el motivo en una línea (toca para verlo entero).
- Sesión: menú ··· por ejercicio (reemplazar, subir, bajar, nota fija, historial, quitar con «Deshacer»), botones ±kg/±rep y RIR en un toque para la serie en foco, tocar «Anterior» copia esa serie, rampa de calentamiento en el ejercicio principal, el descanso dice qué viene y la barra de pestañas se esconde.
- Explorador de ejercicios con búsqueda en español o inglés y filtros por músculo y equipo. Se usa para agregar, reemplazar, elegir variantes en Rutina y elegir ejercicio en Progreso.
- Ficha de ejercicio: gráfico, récords, últimas sesiones, nota fija y «Unir con otro ejercicio» para juntar nombres duplicados. Unir no reescribe tus sesiones y se puede separar.
- Resumen al terminar con duración, series, tonelaje, récords y comparación con la última sesión del mismo día.
- La app abre al instante desde la copia guardada aunque no haya señal; la versión nueva se descarga en segundo plano y avisa.
- Ajustes pasa al botón de engranaje arriba a la derecha.

Tus datos no cambian de formato: las notas y los nombres unidos se guardan en `exMeta`, que ya existía y se sincroniza con el Gist.

## Actualizar la app
Cuando cambies `index.html`, sube también `sw.js` con el número de `CACHE` aumentado. Desde la v3 la app abre con la copia guardada: el cambio se ve la segunda vez que la abres (la primera muestra el aviso «Hay una versión nueva»).
