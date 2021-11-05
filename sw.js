// Service Worker
const cacheName = "my-pwa-shell-v1.0";
const filesToCache = [
    "/",
    "index.html",
    "./js/index.js",
    "./styles/styles.css",
    '/manifest.json',
    './assets/icons/icon.png',
    './assets/nike1.jpeg',
    './assets/nike2.jpeg',
    './assets/nike3.jpeg',
    './assets/nike4.jpeg',
    './assets/nike5.jpeg',
    './assets/nike6.jpeg'
];

self.addEventListener("install", e => {
    console.log("[ServiceWorker**] - Install");
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            console.log("[ServiceWorker**] - Caching app shell");
            cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith((async () => {
        const resource = await caches.match(e.request);
        console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
        
        if (resource) { 
          return resource;
        }

        const response = await fetch(e.request);
        return response;
    })());
});

self.addEventListener("activate", event => {
    caches.keys().then(keyList => {
        return Promise.all(
            keyList.map(key => {
                console.log(key);
                if (key !== cacheName) {
                    console.log("[ServiceWorker] - Removing old cache", key);
                    return caches.delete(key);
                }
            })
        );
    });
    event.waitUntil(self.clients.claim());
});