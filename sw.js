// Fierro service worker: funciona sin conexión.
const CACHE = "fierro-v4.2.0";
const SHELL = ["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png", "icon-maskable-512.png"];

self.addEventListener("install", e => {
  // Si falta algún archivo no se cae la instalación: se guarda lo que exista.
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// Guarda la página nueva y, si cambió, avisa a la app abierta para que muestre "hay una versión nueva".
async function store(res) {
  const ca = await caches.open(CACHE);
  const old = await ca.match("index.html");
  const [nuevo, viejo] = await Promise.all([res.clone().text(), old ? old.text() : ""]);
  await ca.put("index.html", res);
  if (old && nuevo !== viejo) {
    await new Promise(r => setTimeout(r, 1500)); // la página recién abierta alcanza a escuchar
    (await self.clients.matchAll({ type: "window" })).forEach(c => c.postMessage("fierro-update"));
  }
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.hostname === "api.github.com") return; // la sincronización nunca se cachea

  // Página: abre al instante con la copia guardada y descarga la versión nueva en segundo plano
  // (se ve la próxima vez que abras la app). Sin copia guardada, va a la red.
  if (req.mode === "navigate") {
    const net = fetch(req).then(res => { if (res.ok) e.waitUntil(store(res.clone())); return res; });
    e.respondWith(caches.match("index.html").then(hit => hit || net).catch(() => net));
    e.waitUntil(net.then(() => null, () => null));
    return;
  }
  // Fuentes, librerías e imágenes de ejercicios: caché primero, se guardan la primera vez.
  if (/fonts\.(googleapis|gstatic)\.com|cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net/.test(url.hostname)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => { const c = res.clone(); caches.open(CACHE).then(ca => ca.put(req, c)); return res; })));
    return;
  }
  // Resto de archivos propios: caché primero.
  if (url.origin === location.origin) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
  }
});
