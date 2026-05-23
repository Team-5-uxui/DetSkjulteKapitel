"use strict";

const productsContainer = document.querySelector("#products");

const options = {
  headers: {
    apikey: "sb_publishable_hJz8puxeXL-314yfgCnXOQ_O43qFTf7",
  },
};
const url = "https://qbsufmwklabqmadwcgjp.supabase.co/rest/v1/produkter";

let alleProdukter = [];
let aktiveFiltre = {
  kategori: null,
  storrelse: null,
  farve: null,
};

fetch(url, options).then((response) =>
  response.json().then((data) => {
    alleProdukter = data;
    showProducts(data);
  }),
);

function showProducts(productsarr) {
  productsContainer.innerHTML = "";
  productsarr.forEach((product) => {
    productsContainer.innerHTML += `<div class="product">
        <img src="${product.billede}" alt="${product.produktnavn}" />
        <h3>${product.produktnavn}</h3>
        <p>${product.pris} kr.</p>
        <a href="shopSingleview.html?id=${product.id}" class="btn">Se produkt</a>
      </div>`;
  });
}

function filterProdukter() {
  let filtrerede = alleeProdukter;

  if (aktiveFiltre.kategori) {
    filtrerede = filtrerede.filter((p) => p.kategori === aktiveFiltre.kategori);
  }
  if (aktiveFiltre.storrelse) {
    filtrerede = filtrerede.filter((p) => p.storrelse === aktiveFiltre.storrelse);
  }
  if (aktiveFiltre.farve) {
    filtrerede = filtrerede.filter((p) => p.farve === aktiveFiltre.farve);
  }

  showProducts(filtrerede);
}

const filterToggle = document.querySelector("#filterToggle");
const filterPanel = document.querySelector("#filterPanel");
const filterLuk = document.querySelector("#filterLuk");

filterToggle.addEventListener("click", () => {
  filterPanel.classList.toggle("aktiv");
});

filterLuk.addEventListener("click", () => {
  filterPanel.classList.remove("aktiv");
});

const filterTitler = document.querySelectorAll(".filter-titel");

filterTitler.forEach((titel) => {
  titel.addEventListener("click", () => {
    const targetId = titel.dataset.target;
    const valg = document.querySelector("#" + targetId);
    titel.classList.toggle("aaben");
    valg.classList.toggle("aaben");
  });
});

const filterValg = document.querySelectorAll(".filter-valg p");

filterValg.forEach((valg) => {
  valg.addEventListener("click", () => {
    const type = valg.dataset.type;
    const filter = valg.dataset.filter;

    if (aktiveFiltre[type] === filter) {
      aktiveFiltre[type] = null;
      valg.classList.remove("valgt");
    } else {
      document.querySelectorAll(`[data-type="${type}"]`).forEach((el) => el.classList.remove("valgt"));

      aktiveFiltre[type] = filter;
      valg.classList.add("valgt");
    }

    filterProdukter();
  });
});

getProducts();
