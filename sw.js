// Fierro service worker: funciona sin conexión.
const CACHE = "fierro-v2.1.2";
const SHELL = ["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png", "icon-maskable-512.png"];

self.addEventListener("install", e => {
  // Si falta algún archivo no se cae la instalación: se guarda lo que exista.
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

function timeout(ms) { return new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms)); }

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.hostname === "api.github.com") return; // la sincronización nunca se cachea

  // Página: red primero (con límite de 3 s) para recibir actualizaciones; si no hay señal, la copia guardada.
  if (req.mode === "navigate") {
    e.respondWith(
      Promise.race([fetch(req), timeout(3000)])
        .then(res => { const c = res.clone(); caches.open(CACHE).then(ca => ca.put("index.html", c)); return res; })
        .catch(() => caches.match("index.html"))
    );
    return;
  }
  // Fuentes y librerías externas: caché primero, se guardan la primera vez.
  if (/fonts\.(googleapis|gstatic)\.com|cdnjs\.cloudflare\.com/.test(url.hostname)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => { const c = res.clone(); caches.open(CACHE).then(ca => ca.put(req, c)); return res; })));
    return;
  }
  // Resto de archivos propios: caché primero.
  if (url.origin === location.origin) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
  }
});
