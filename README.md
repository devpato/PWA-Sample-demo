# PWA-Sample-App
<p>
  <a href="https://github.com/devpato/PWA-Sample-demo/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://twitter.com/devpato" target="_blank">
    <img alt="Twitter: devpato" src="https://img.shields.io/twitter/follow/devpato?style=social" />
  </a>
</p>

This is a sample app to get you started creating your first progressive web application using only HTML, CSS, and JavaScript.

## Manifest.json

The `manifest.json` is a file that has all the information about how our progresive web application is going to look like in the device you are installing the app to give it a native app look and feel.

```json
{
    "short_name": "My PWAS",
    "name": "My PWAS",
    "icons": [
        {
            "src": "assets/icons/icon.png",
            "type": "image/png",
            "sizes": "192x192"
        }
    ],
    "start_url": "/",
    "background_color": "#f1f1f1",
    "display": "standalone",
    "scope": "/",
    "theme_color": "#000"
}
```

## Index.js
This is your normal JavaScript file. In this file, you are going to register the Service Worker.

### Registering the Service Worker
In the following code, I'm checking if the navigator(browser) supports Service Workers. If the browser supports Service Workers, the app will wait to be fully loaded before registering the Service Worker.

```javascript
if ("serviceWorker" in navigator) {
    window.addEventListener("load", ()=>{
        navigator.serviceWorker.register("sw.js").then(swRegistered => {
            console.log("[ServiceWorker**] - Registered");
        });
    });
}
```

## SW.js (Service Worker file)

This is your Service Worker file. In this file you will find the basic lifecycles of a Service Worker.

### Installing the Service Worker
In the code below. You will find the `install` lifecycle event of a Service Worker. In this lifecycle, I'm creating a new cache with the name of "my-pwa-shell-v1.0" and I'm passing the array of `filesToCache` that has all the assets I want to cache in my new cache.

```javascript
const cacheName = "my-pwa-shell-v1.0";
const filesToCache = [
    "/",
    "index.html",
    "./js/index.js",
    "./styles/styles.css",
    '/manifest.json',
    './assets/icons/icon.png',
    './assets/nike1.jpeg'
];

self.addEventListener("install", e => {
    console.log("[ServiceWorker] - Install");
    e.waitUntil((async () => {
            const cache = await caches.open(cacheName);
            console.log("[ServiceWorker] - Caching app shell");
            await cache.addAll(filesToCache);
        })());
});
```
### Activating the Service Worker
This is one of the most important lifecycles of a Service Worker. In this lifecycle, you can perform operations before you `activate` the Service Worker. In the example below, I'm getting rid of the old cache and leaving the new cache. This will help your application free up space in your cache.

```javascript
self.addEventListener("activate", e => {
    e.waitUntil((async () => {
        const keyList = await caches.keys();
        await Promise.all(
            keyList.map(key => {
                /*E.g if key has a value of "cache-v1.0" and cacheName has a value of "cache-v2.0",
                we are removing the "cache-v1.0".
                */
                if (key !== cacheName) {
                    console.log("[ServiceWorker] - Removing old cache", key);
                    return caches.delete(key);
                }
            })
        );
    })());
    e.waitUntil(self.clients.claim());
});
```

### Intercepting network call with the Fetch event
In this example, I'm doing the "Cache first, falling back to network" strategy. Using my Service Worker, I'm intercepting the request, looking for that request inside of my cache, and if the request already exists inside of my cache then I will return it. Otherwise, I will fetch the request from the network and return the value from that request.

```javascript
self.addEventListener('fetch', e => {
    e.respondWith((async () => {
        const resource = await caches.match(e.request);
        
        return resource || fetch(e.request);
    })());
});
```

If you found this sample app helpful, don't forget to give it a star ⭐.
