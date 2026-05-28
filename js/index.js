"use strict";
async function hentAnbefalinger() {
  const response = await fetch("https://qbsufmwklabqmadwcgjp.supabase.co/rest/v1/boeger?select=*&id=in.(12,7,10)&order=id.asc", {
    headers: {
      apikey: "sb_publishable_hJz8puxeXL-314yfgCnXOQ_O43qFTf7",
      Authorization: "Bearer sb_publishable_hJz8puxeXL-314yfgCnXOQ_O43qFTf7",
    },
  });

  const boeger = await response.json();
  const raekkefoelge = [12, 7, 10];
  const sorteret = raekkefoelge.map((id) => boeger.find((bog) => bog.id === id));
  const grid = document.querySelector(".grid");

  console.log("Grid element:", grid);

  grid.innerHTML = "";

  sorteret.forEach((bog) => {
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

hentAnbefalinger();
