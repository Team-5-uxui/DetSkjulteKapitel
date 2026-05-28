"use strict";

async function hentAlleAfsnit() {
  const response = await fetch(
    "https://qbsufmwklabqmadwcgjp.supabase.co/rest/v1/afsnit?select=*&order=id.asc",

    {
      headers: {
        apikey: "sb_publishable_hJz8puxeXL-314yfgCnXOQ_O43qFTf7",
        Authorization: "Bearer sb_publishable_hJz8puxeXL-314yfgCnXOQ_O43qFTf7",
      },
    },
  );

  const afsnit = await response.json();
  visAfsnit(afsnit);
}

function visAfsnit(data) {
  const grid = document.querySelector("#afsnit");
  grid.innerHTML = "";

  data.forEach((afsnit) => {
    const kort = document.createElement("div");
    kort.classList.add("afsnit-kolonne");

    kort.innerHTML = `
    <section class=grid>
        <div class=afsnit-left>
          <img src="${afsnit.coverbillede}" alt="Afsnitcover ${afsnit.titel}" />
        </div>
        <div class=afsnit-info2>
          <h3>${afsnit.titel}</h3>
          <p>${afsnit.beskrivelse.substring(0, 50)}...</p>
          <p>${afsnit.laengde}</p>
        </div>
        <div class=PlayBtn2><a href="afsnitSingleview.html?id=${afsnit.id}"><img src="img/PlayBtn.svg" alt="" /></a></div>
    </section>
      `;

    grid.appendChild(kort);
  });
}

hentAlleAfsnit();
