# Alfabet-spill for barn

Dette prosjektet er et web‑basert spill som hjelper barn med å lære det
norske alfabetet på en morsom og engasjerende måte. Appen bruker
store fargerike bilder/illustrasjoner for å gjøre læringen mer
visuell. Applikasjonen er fullstendig klientside (ingen server
nødvendig) og består av flere mini‑spill:

* **Bokstavkort** – viser hele alfabetet som kort på én side. Hvert
  kort viser en stor bokstav og en illustrerende emoji for et ord som
  starter med bokstaven. Når barnet trykker på et kort, leses først
  bokstaven og deretter ordet høyt via talesyntese. Dette erstatter
  det tidligere bokstavlydspillet.
* **Match ord** – gir barnet en bokstav og flere ordalternativer. Målet
  er å velge ordet som begynner på den viste bokstaven. Spillet
  belønner riktige valg og viser en oppsummering etter siste runde.
  I denne utgaven vises bare et bilde/emoji i hvert alternativ – barnet
  må selv huske hvilket ord som passer til bokstaven.
* **Huske‑spill** – et klassisk memory‑spill hvor barnet matcher
  identiske store bokstavpar. Spillet velger åtte bokstaver tilfeldig
  og lager et brett med seksten kort (to av hver store variant). Kortene
  blandes tilfeldig hver gang.
* **Spor bokstaven** – lar barnet øve på å skrive en bokstav ved å
  tegne på et lerret. Den riktige bokstaven vises semitransparent i
  bakgrunnen slik at barnet kan følge formen. Barnet kan starte på
  nytt eller gå videre til en annen bokstav.

* **Bilde → ord** – et nytt spill hvor barnet ser et bilde (emoji)
  og tre ordalternativer. Målet er å velge ordet som beskriver
  bildet. I denne utgaven vises bare ordene (i store bokstaver) – ingen
  bilde/emoji i alternativene – slik at barnet øver på å lese ordet.
  Spillet går over ti runder og viser en oppsummering til slutt. Dette
  hjelper barnet å knytte visuelle bilder til ord og styrker
  ordforrådet.

## Kjøring av spillet

Spillet kan kjøres direkte i nettleseren uten å installere ekstra
avhengigheter:

1. Åpne `index.html` i en moderne nettleser (Chrome, Firefox eller
   Edge). Nettleseren må støtte JavaScript‑moduler og Web Speech API.
2. Velg et av mini‑spillene fra startsiden.
3. Kos deg med læringen!

### Bakgrunnsmusikk

Hovedmenyen spiller en enkel, repeterende melodi generert med Web Audio API.
Hvis du ønsker å deaktivere musikken mens du spiller et spill, er den
programmert til å stoppe automatisk når du åpner et spill og starte
igjen når du returnerer til hovedmenyen.

### Testing

Enkelte logiske funksjoner (slik som tilfeldig bokstavvalg og blanding
av kort) er testet ved hjelp av Node sin innebygde `assert`‑modul.
Testene kan kjøres i terminalen slik:

```bash
node tests/alphabet.test.js
```

Disse testene verifiserer at funksjonene returnerer forventede
resultater, men dekker ikke hele brukergrensesnittet.
