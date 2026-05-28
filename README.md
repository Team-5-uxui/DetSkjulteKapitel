# DetSkjulteKapitel

# Teknisk dokumentation for Tema 10 eksamensprojekt

Når man er flere der bidrager til en kodebase, lærer man hurtigt, at ens sædvanlige måder at gøre tingene på ikke nødvendigvis er logisk for alle.

Skriv derfor jeres fælles retningslinjer for punkterne herunder(tilføj gerne flere selv), sådan som det giver bedst mening for jer som gruppe. Dokumentationen sikre, at jeres fælles kodebase forbliver overskuelig, er let at arbejde med og til at forstå for alle, og at I undgå konflikter, og har nemmere ved at hjælpe hinanden undervejs.

## Projektstruktur:

- Vi inddelerer billeder, fonte og andre ressourcer i seperate mapper, for at det er let at overskue og finde rundt i projektet.

- CSS- og JavaScript-filer placeres i mapper, hhv. "css" og "js". Derudover er der lavet seperate CSS-filer til hver HTML side, for at man kan arbejde i filen og den tilhørende HTML uden konfliter git. Det samme gælder for JavaScript-filer, her er der umiddelbart oprettet en fil til hver feature, men det er ikke strengs nødvendigt at de har hver sin. Alle filer er navngivet så de passer med navnet på den tilhørende HTML-fil.

## Navngivning:

- Vi navngiver alle CSS-, HTML- og JavaScript-filer med CamelCase, for at sikre en ensartet struktur, for nemt at kunne gennemskue hvilke filer der passer sammen.

## Link til scripts:

- Alle script referencer er placeret sidst i <body>, og dette er gældende for alle HTML-filer.

## Git branches:

- Eftersom vi gennem Trello har aftalt hvem der har lavet hvilke dele, er branches navngivet efter hvad der arbejdes på.

## Arbejdsflow:

- Vi fordeler arbejdet på forhånd, så alle har nogle seperate CSS-, HTML- og JavaScript-filer at arbejde i.
- Alle commit beskeder er formuleret, så det beskriver hvad der tilføjes eller rettes f.eks. med ordet add, tilføj eller slet.
- Vi kommunikerer gennem messenger for at sikre at alle ved når en ny feature er blevet tilføjet eller rettet. Derved ved alle at der er noget nyt der skal hives ned i main, før der kan laves en ny branch.

## Kode:

- Når vi skriver funktioner i JavaScript benytter vi både function keyword og arrow function, alt efter om funktionen skal kaldes igen eller den bare skal kaldes med det samme.

- Umiddelbart bruges både id og classes som CSS selector, men primært bruger vi classes når vi styler specifikke componenter i CSS, hvor id bruges mest til JavaScript.

- Vi benytter korte kommentarer i CSS-filer til nemt at strukturere og opdele i koden i forskellige views og størrelser. Derudover er custom CSS-filen også opdelt efter farver, og hvor de bruges, og fonte med tilhørende mobil og desktop størrelser.

# Funktionalitet

- Vi henter produkter, bøger og afsnit fra tre forskellige API'er vi har lavet i SupaBase.

- Vi filtrerer på bøger og produkter, så brugeren nemt kan finde det de leder efter ved hjælp af filtreringen.

- Vi benytter dynamisk visning af bøger, afsnit og produkter, for det nemt kan ændres når der fx. kommer et nyt afsnit ud, uden at skulle ændre i koden.

# API endpoints

- Bøger API: https://qbsufmwklabqmadwcgjp.supabase.co/rest/v1/boeger

- Produkter API: https://qbsufmwklabqmadwcgjp.supabase.co/rest/v1/produkter

- Afsnit API: https://qbsufmwklabqmadwcgjp.supabase.co/rest/v1/afsnit

# Dokumentation af Funktion

- Funktionen viser hvis der ikke er nogen produkter i kurven, der med står der at din kurv er tom. Hvis den opdager at der er nogen produkter der er blevet tilføjet til kurven, indsætter den produktet med billede, navn, størrelse og antal og regner prisen ud. Inde på single view siden af produktet, gør kanppen "læg i kurv" at produktet kommer ind i et array på Local Storage på Google. Dette opfanger funktionen (visKurv) og derfor kan produktet vises på kurv siden.

- Funktionen opfanger parametre så som titel på produktet, billede, størrelse og pris.

- Funktionen returnerer en værdi, da den sender værdier fra produktet med over i kurven.

<!-- Funktionens kode -->

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

<!-- Ny funktion, hvor funktionen også bliver kaldt -->

function ændreAntal(index, ændring) {
kurv[index].antal += ændring;

if (kurv[index].antal <= 0) {
kurv.splice(index, 1);
}

localStorage.setItem("kurv", JSON.stringify(kurv));
visKurv();
}

function opdaterTotal() {
const subtotal = kurv.reduce((sum, p) => sum + p.pris \* p.antal, 0);
subtotalEl.textContent = subtotal + " kr.";
samletEl.textContent = subtotal + fragt + " kr.";
}

<!-- Funktionen bliver kaldt -->

visKurv();
