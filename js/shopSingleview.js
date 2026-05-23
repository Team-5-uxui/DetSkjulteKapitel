"use strict";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const productContainer = document.querySelector("#product");
const købOgsåContainer = document.querySelector("#koeb-ogsaa");

const options = {
  headers: {
    apikey: "sb_publishable_hJz8puxeXL-314yfgCnXOQ_O43qFTf7",
  },
};

const enkeltUrl = `https://qbsufmwklabqmadwcgjp.supabase.co/rest/v1/produkter?id=eq.${id}`;
const alleUrl = "https://qbsufmwklabqmadwcgjp.supabase.co/rest/v1/produkter";

fetch(enkeltUrl, options).then((response) =>
  response.json().then((data) => {
    const product = data[0];
    showProduct(product);
  }),
);

fetch(alleUrl, options).then((response) =>
  response.json().then((data) => {
    const andreProdukter = data.filter((p) => p.id !== parseInt(id));
    const toStyk = andreProdukter.sort(() => Math.random() - 0.5).slice(0, 2);
    showKøbOgsaa(toStyk);
  }),
);

function showProduct(product) {
  productContainer.innerHTML = `
    <img src="${product.billede}" alt="${product.produktnavn}" />
    <h1>${product.produktnavn}</h1>
    <p class="beskrivelse">${product.beskrivelse}</p>
    <p class="pris">${product.pris} kr.</p>
    <p class="storrelse">Størrelse: ${product.storrelse}</p>
    <a href="" class="btn">Læg i kurv</a>
  `;
}

function showKøbOgsaa(produkter) {
  købOgsåContainer.innerHTML = "";
  produkter.forEach((product) => {
    købOgsåContainer.innerHTML += `
      <div class="product-card">
        <img src="${product.billede}" alt="${product.produktnavn}" />
        <h3>${product.produktnavn}</h3>
        <p>${product.pris} kr.</p>
        <a href="shopSingleview.html?id=${product.id}" class="btn">Se produkt</a>
      </div>`;
  });
}
