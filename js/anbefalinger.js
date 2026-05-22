async function hentAlleBoeger() {
  const response = await fetch(
    "https://qbsufmwklabqmadwcgjp.supabase.co/rest/v1/boeger?select=*",
    {
      headers: {
        apikey: "sb_publishable_hJz8puxeXL-314yfgCnXOQ_O43qFTf7",
        Authorization: "Bearer sb_publishable_hJz8puxeXL-314yfgCnXOQ_O43qFTf7",
      },
    }
  );

  const boeger = await response.json();
  let aktivtFilter = { type: null, vaerdi: null };

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
          <a href="afsnitSingeview.html"><p>Læs mere</p></a>
        </div>
      `;

      grid.appendChild(kort);
    });
  }

  visBoeger(boeger);

  // Åbn/luk filter panel
  document.getElementById("filterToggle").addEventListener("click", () => {
    document.getElementById("filterPanel").classList.toggle("aktiv");
  });

  document.getElementById("filterLuk").addEventListener("click", () => {
    document.getElementById("filterPanel").classList.remove("aktiv");
  });

  // Åbn/luk hver kategori
  document.querySelectorAll(".filter-titel").forEach((titel) => {
    titel.addEventListener("click", () => {
      const targetId = titel.dataset.target;
      const valg = document.getElementById(targetId);

      // Luk alle andre
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

  // Filtrer
  document.querySelectorAll("[data-filter]").forEach((el) => {
    el.addEventListener("click", () => {
      const type = el.dataset.type;
      const vaerdi = el.dataset.filter;

      if (aktivtFilter.type === type && aktivtFilter.vaerdi === vaerdi) {
        aktivtFilter = { type: null, vaerdi: null };
        visBoeger(boeger);
        document.querySelectorAll("[data-filter]").forEach(e => e.classList.remove("valgt"));
      } else {
        aktivtFilter = { type, vaerdi };
        const filtreret = boeger.filter(bog => bog[type] && bog[type].trim() === vaerdi);
        visBoeger(filtreret);
        document.querySelectorAll("[data-filter]").forEach(e => e.classList.remove("valgt"));
        el.classList.add("valgt");
      }

      document.getElementById("filterPanel").classList.remove("aktiv");
    });
  });
}

hentAlleBoeger();