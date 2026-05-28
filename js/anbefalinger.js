"use strict";
async function hentAlleBoeger() {
  const response = await fetch("https://qbsufmwklabqmadwcgjp.supabase.co/rest/v1/boeger?select=*", {
    headers: {
      apikey: "sb_publishable_hJz8puxeXL-314yfgCnXOQ_O43qFTf7",
      Authorization: "Bearer sb_publishable_hJz8puxeXL-314yfgCnXOQ_O43qFTf7",
    },
  });

  const boeger = await response.json();
  let aktivtFilter = {type: null, vaerdi: null};

  function visBoeger(data) {
    const grid = document.querySelector(".grid");
    grid.innerHTML = "";

    data.forEach((bog) => {
      const kort = document.createElement("div");
      kort.classList.add("AnbefalingCard");

      kort.innerHTML = `
        <div>
          <p class="IndividuelAnbefaling">${bog.anbefaler} anbefaler</p>
          <img src="${bog.billede}" alt="Forside af bogen ${bog.titel}" />
        </div>
        <div>
          <h3>${bog.titel}</h3>
          <p>${bog.beskrivelse.substring(0, 100)}...</p>
        </div>
        <div>
          <a href="anbefalingerSingleview.html?id=${bog.id}"><p>Læs mere</p></a>
        </div>
      `;

      grid.appendChild(kort);
    });
  }

  visBoeger(boeger);

  document.getElementById("filterToggle").addEventListener("click", () => {
    document.getElementById("filterPanel").classList.toggle("aktiv");
  });

  document.getElementById("filterLuk").addEventListener("click", () => {
    document.getElementById("filterPanel").classList.remove("aktiv");
  });

  document.querySelectorAll(".filter-alle").forEach((el) => {
    el.addEventListener("click", () => {
      aktivtFilter = {type: null, vaerdi: null};
      visBoeger(boeger);
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

  document.querySelectorAll("[data-filter]").forEach((el) => {
    el.addEventListener("click", () => {
      const type = el.dataset.type;
      const vaerdi = el.dataset.filter;

      if (vaerdi === "alle") return;

      if (aktivtFilter.type === type && aktivtFilter.vaerdi === vaerdi) {
        aktivtFilter = {type: null, vaerdi: null};
        visBoeger(boeger);
        document.querySelectorAll("[data-filter]").forEach((e) => e.classList.remove("valgt"));
      } else {
        aktivtFilter = {type, vaerdi};
        const filtreret = boeger.filter((bog) => bog[type] && bog[type].trim() === vaerdi);
        visBoeger(filtreret);
        document.querySelectorAll("[data-filter]").forEach((e) => e.classList.remove("valgt"));
        el.classList.add("valgt");
      }

      document.getElementById("filterPanel").classList.remove("aktiv");
    });
  });
}

// AnbefalingerSingleview
async function hentBog() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const response = await fetch(`https://qbsufmwklabqmadwcgjp.supabase.co/rest/v1/boeger?id=eq.${id}`, {
    headers: {
      apikey: "sb_publishable_hJz8puxeXL-314yfgCnXOQ_O43qFTf7",
      Authorization: "Bearer sb_publishable_hJz8puxeXL-314yfgCnXOQ_O43qFTf7",
    },
  });

  const data = await response.json();
  const bog = data[0];

  const sektion = document.getElementById("bogDetalje");

  sektion.innerHTML = `
  <div class="bogSingleview">  
    <div>
      <p class="IndividuelAnbefaling2">${bog.anbefaler} anbefaler</p> 
      <img src="${bog.billede}" alt="Forside af bogen ${bog.titel}" />
    </div>
    <div>
      <h1 class="h1">${bog.titel}</h1>
      <div class="OmBogen">
        <h3>${bog.forfatter}</h3>
        <p>${bog.beskrivelse}</p>
      </div>
    </div>
  </div>

  <div class="personligAnmeldelse">
    <div class="grid_1-1">
      <img src="img/FrejaRund.webp" alt="">
      <div>
        <h3>Freja</h3>
        <p>${bog.freja}</p>
      </div>
    </div>
    <div class="grid_1-1">
      <img src="img/DaniellaRund.webp" alt="">
      <div>
        <h3>Daniella</h3>
        <p>${bog.daniella}</p>
      </div>
    </div>
    <div class="grid_1-1">
      <img src="img/LauraRund.webp" alt="">
      <div>
        <h3>Laura</h3>
        <p>${bog.laura}</p>
      </div>
    </div>
  </div>
  `;
}

if (document.getElementById("filterToggle")) {
  hentAlleBoeger();
}

if (document.getElementById("bogDetalje")) {
  hentBog();
}
