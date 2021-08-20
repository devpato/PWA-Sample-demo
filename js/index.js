"use strict";

let sw = null;
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("OneSignalSDKWorker.js").then(swRegistered => {
        console.log("[ServiceWorker**] - Registered");
        sw = swRegistered;
    });
}