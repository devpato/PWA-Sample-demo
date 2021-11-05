"use strict";

if ("serviceWorker" in navigator) {
    window.addEventListener("load", ()=>{
        navigator.serviceWorker.register("sw.js").then(swRegistered => {
            console.log("[ServiceWorker**] - Registered");
        });
    });
}