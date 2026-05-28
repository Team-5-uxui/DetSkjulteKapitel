"use strict";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function hentAfsnit() {
  const response = await fetch(`https://qbsufmwklabqmadwcgjp.supabase.co/rest/v1/afsnit?id=eq.${id}&select=*`, {
    headers: {
      apikey: "sb_publishable_hJz8puxeXL-314yfgCnXOQ_O43qFTf7",
      Authorization: "Bearer sb_publishable_hJz8puxeXL-314yfgCnXOQ_O43qFTf7",
    },
  });

  const data = await response.json();

  visAfsnit(data[0]);
}

function visAfsnit(afsnit) {
  const container = document.querySelector("#singleview");

  container.innerHTML = ` 
  <h1>${afsnit.titel}</h1>
  <section class="single-afsnit">
      <div class=afsnit-left>
          <img src="${afsnit.coverbillede}" alt="Afsnitcover ${afsnit.titel}" />
        </div>
        <div class=afsnit-info1>
          <h3>${afsnit.titel}</h3>
          <p>${afsnit.udgivelsesdato}</p>
          <p>${afsnit.laengde}</p>
          <p class="afsnit-beskrivelse">${afsnit.beskrivelse}...</p>
        </div>
        <div class="afsnit-ikoner">
          <a href="https://open.spotify.com/show/3m8Jab1IPtWVq0r0YH2QnV"><img src="img/Spotify.svg" alt="" /></a>
          <a href="https://podcasts.apple.com/dk/podcast/det-skjulte-kapitel/id1886661915"><img class="apple" src="img/applepodcast.svg" alt="Apple Podcast" /></a>
          <a href="https://open.podimo.com/podcast/a7241b3f-1531-4056-aa6a-d502dbbe5295"><img src="img/Podimo.svg" alt="Podimo logo" /></a>
          
          <div class="PlayBtn2"> 
          <img id="playBtn" src="img/PlayBtn.svg" alt="Afspil teaser" />
          
          <audio id="audioPlayer">
          <source src="${afsnit.lydklip}">
          </audio>
          </div>
        </div>
        </div>
      </div>
    </section>
  `;

  const playBtn = document.querySelector("#playBtn");
  const audio = document.querySelector("#audioPlayer");

  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playBtn.src = "img/PauseBtn.svg";
    } else {
      audio.pause();
      playBtn.src = "img/PlayBtn.svg";
    }
  });
}

async function hentAlleAfsnit() {
  const response = await fetch("https://qbsufmwklabqmadwcgjp.supabase.co/rest/v1/afsnit?select=*&order=id.asc", {
    headers: {
      apikey: "sb_publishable_hJz8puxeXL-314yfgCnXOQ_O43qFTf7",
      Authorization: "Bearer sb_publishable_hJz8puxeXL-314yfgCnXOQ_O43qFTf7",
    },
  });

  const data = await response.json();

  visAlleAfsnit(data);
}

function visAlleAfsnit(data) {
  const container = document.querySelector("#alle-afsnit");

  container.innerHTML = "";

  data.forEach((afsnit) => {
    if (afsnit.id == id) return;

    container.innerHTML += `
  <div class="afsnit-kolonne"> 
    <section class=grid>
        <div class=afsnit-left2>
          <img src="${afsnit.coverbillede}" alt="Afsnitcover ${afsnit.titel}" />
        </div>
        <div class=afsnit-info2>
          <h3>${afsnit.titel}</h3>
          <p>${afsnit.beskrivelse.substring(0, 50)}...</p>
          <p>${afsnit.laengde}</p>
        </div>
        <div class=afspil><a href="afsnitSingleview.html?id=${afsnit.id}"><img src="img/PlayBtn.svg" alt="" /></a></div>
    </section>
   </div>
      `;
  });
}

hentAfsnit();
hentAlleAfsnit();
