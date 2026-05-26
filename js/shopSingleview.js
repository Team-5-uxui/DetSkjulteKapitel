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
    const treStyk = andreProdukter.sort(() => Math.random() - 0.5).slice(0, 3);
    showKøbOgsaa(treStyk);
  }),
);

function showProduct(product) {
  productContainer.innerHTML = `
    <img src="${product.billede}" alt="${product.produktnavn}" />
    <div class="product-info">
    <h1>${product.produktnavn}</h1>
    <p class="beskrivelse">${product.beskrivelse}</p>
    <p class="pris">${product.pris} kr.</p>
    <p class="storrelse">Størrelse: ${product.storrelse}</p>
    <button class="btn btn-singleview" id="tilKurvBtn">Læg i kurv</button>
    </div>
  `;

  document.querySelector("#tilKurvBtn").addEventListener("click", () => {
    tilføjTilKurv(product);
  });
}

function getKurv() {
  return JSON.parse(localStorage.getItem("kurv")) || [];
}

function tilføjTilKurv(product) {
  const kurv = getKurv();

  const eksisterende = kurv.find((p) => p.id === product.id);

  if (eksisterende) {
    eksisterende.antal++;
  } else {
    kurv.push({ ...product, antal: 1 });
  }

  localStorage.setItem("kurv", JSON.stringify(kurv));

  const knap = document.querySelector("#tilKurvBtn");
  knap.textContent = "Tilføjet! ✓";
  setTimeout(() => {
    knap.textContent = "Læg i kurv";
  }, 1500);
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
