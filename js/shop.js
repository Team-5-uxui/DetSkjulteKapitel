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
  if (productsarr.length === 0) {
    productsContainer.innerHTML = "<p>Ingen produkter matcher dit filter.</p>";
    return;
  }
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
  let filtrerede = alleProdukter;

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

document.getElementById("filterToggle").addEventListener("click", () => {
  document.getElementById("filterPanel").classList.toggle("aktiv");
});

document.getElementById("filterLuk").addEventListener("click", () => {
  document.getElementById("filterPanel").classList.remove("aktiv");
});

document.querySelectorAll(".filter-alle").forEach((el) => {
  el.addEventListener("click", () => {
    aktiveFiltre = {
      kategori: null,
      storrelse: null,
      farve: null,
    };
    showProducts(alleProdukter);
    document.querySelectorAll("[data-filter]").forEach((e) => e.classList.remove("valgt"));
    document.getElementById("filterPanel").classList.remove("aktiv");
  });
});

document.querySelectorAll(".filter-titel").forEach((titel) => {
  titel.addEventListener("click", () => {
    const targetId = titel.dataset.target;
    const valg = document.getElementById(targetId);

    document.querySelectorAll(".filter-valg").forEach((v) => {
      if (v.id !== targetId) v.classList.remove("aaben");
    });
    document.querySelectorAll(".filter-titel").forEach((t) => {
      if (t !== titel) t.classList.remove("aaben");
    });

    valg.classList.toggle("aaben");
    titel.classList.toggle("aaben");
  });
});

document.querySelectorAll(".filter-valg p").forEach((el) => {
  el.addEventListener("click", () => {
    const type = el.dataset.type;
    const vaerdi = el.dataset.filter;

    if (vaerdi === "alle") return;

    if (aktiveFiltre[type] === vaerdi) {
      aktiveFiltre[type] = null;
      el.classList.remove("valgt");
    } else {
      document.querySelectorAll(`[data-type="${type}"]`).forEach((e) => e.classList.remove("valgt"));
      aktiveFiltre[type] = vaerdi;
      el.classList.add("valgt");
    }

    filterProdukter();
    document.getElementById("filterPanel").classList.remove("aktiv");
  });
});
