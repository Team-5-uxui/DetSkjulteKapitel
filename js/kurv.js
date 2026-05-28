"use strict";

const kurv = JSON.parse(localStorage.getItem("kurv")) || [];
const kurvalContainer = document.querySelector("#kurv-produkter");
const subtotalEl = document.querySelector("#subtotal");
const samletEl = document.querySelector("#samlet");
const fragt = 49;

function visKurv() {
  kurvalContainer.innerHTML = "";

  if (kurv.length === 0) {
    kurvalContainer.innerHTML = "<p>Din kurv er tom.</p>";
    subtotalEl.textContent = "0 kr.";
    samletEl.textContent = fragt + " kr.";
    return;
  }

  kurv.forEach((product, index) => {
    kurvalContainer.innerHTML += `
    <div class="kurv-produkt">
      <img src="${product.billede}" alt="${product.produktnavn}" />
      <div class="kurv-produkt-info">
        <h3>${product.produktnavn}</h3>
      </div>
      <span class="kurv-storrelse">${product.storrelse || "One size"}</span>
      <div class="antal-kontrol">
        <button onclick="ændreAntal(${index}, -1)">−</button>
        <span>${product.antal}</span>
        <button onclick="ændreAntal(${index}, 1)">+</button>
      </div>
      <p class="kurv-pris">${product.pris * product.antal} kr.</p>
    </div>`;
  });

  opdaterTotal();
}

function ændreAntal(index, ændring) {
  kurv[index].antal += ændring;

  if (kurv[index].antal <= 0) {
    kurv.splice(index, 1);
  }

  localStorage.setItem("kurv", JSON.stringify(kurv));
  visKurv();
}

function opdaterTotal() {
  const subtotal = kurv.reduce((sum, p) => sum + p.pris * p.antal, 0);
  subtotalEl.textContent = subtotal + " kr.";
  samletEl.textContent = subtotal + fragt + " kr.";
}

visKurv();
