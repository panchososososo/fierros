# Fierro v2

App de entrenamiento personal, offline, instalable en Android.

## Subirla a GitHub Pages
1. En tu repo `fierro`, reemplaza `index.html`, `sw.js`, `manifest.json` y `icons/` por los de este zip.
2. Settings → Pages → rama `main`, carpeta `/ (root)` (si ya estaba activo, no toques nada).
3. Abre `https://TU-USUARIO.github.io/fierro/` en Chrome → menú ⋮ → **Instalar app**.

Si ya tenías instalada la v1, se actualiza sola al abrirla con internet (el `sw.js` cambió a `fierro-v2.0.0`) y conserva tus datos.

## Primer uso
- Ajustes → **Peso corporal**: anótalo para que dominadas y fondos calculen la carga real.
- Ajustes → **Barra y discos**: revisa que coincidan con tu gimnasio.

## Datos
Todo vive en el teléfono. Ajustes → **Descargar respaldo** cada tanto (la app te avisa si pasan 14 días). La sincronización con Gist es opcional y está apagada si no pones token.

## Actualizar la app
Cuando cambies `index.html`, sube también `sw.js` con el número de `CACHE` aumentado.
