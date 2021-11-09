"use strict";

if ("serviceWorker" in navigator) {
    window.addEventListener("load", ()=>{
        navigator.serviceWorker.register("sw.js").then(swRegistered => {
            console.log("[ServiceWorker**] - Registered");
        });
    });
}

const getShoes = () => {
    fetch("https://store-api-a7c49-default-rtdb.firebaseio.com/shoes.json")
        .then(res => res.json())
        .then(data => {
            renderShoes(data);
        });
}

const renderShoes = (shoes) => {
    console.log("shoes", shoes);
    const gridItems = document.querySelector(".grid-items");
    
    for(let shoe of shoes) {
        gridItems.innerHTML += `
            <div class="grid-item">
                <img src="./assets/${shoe.img}" class="img" alt="${shoe.name}">
                <h3>"${shoe.name}"</h3>
                <button>Add To Cart</button>
            </div>`;
    }
}

getShoes();