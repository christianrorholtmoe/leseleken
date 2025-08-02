/*
 * Modulen alphabet.js inneholder datastrukturer og hjelpefunksjoner
 * relatert til alfabetet. Bokstavlisten dekker de 29 bokstavene i
 * det norske alfabetet, inkludert Æ, Ø og Å. Hver bokstav har et
 * tilhørende eksempelord som brukes i mini‑spillene.
 */

// Hver bokstav har nå et tilhørende emoji‑ikon for bruk i
// bildefunksjonen. Vi bruker kun store bokstaver i dette spillet.
export const letters = [
  { letter: 'A', word: 'Appelsin', emoji: '🍊' },
  { letter: 'B', word: 'Bil', emoji: '🚗' },
  { letter: 'C', word: 'Computer', emoji: '💻' },
  { letter: 'D', word: 'Drage', emoji: '🐉' },
  { letter: 'E', word: 'Elefant', emoji: '🐘' },
  { letter: 'F', word: 'Frosk', emoji: '🐸' },
  { letter: 'G', word: 'Gitar', emoji: '🎸' },
  { letter: 'H', word: 'Hus', emoji: '🏠' },
  { letter: 'I', word: 'Is', emoji: '🍦' },
  { letter: 'J', word: 'Jordbær', emoji: '🍓' },
  { letter: 'K', word: 'Katt', emoji: '🐱' },
  { letter: 'L', word: 'Løve', emoji: '🦁' },
  { letter: 'M', word: 'Måne', emoji: '🌙' },
  { letter: 'N', word: 'Nese', emoji: '👃' },
  { letter: 'O', word: 'Ost', emoji: '🧀' },
  { letter: 'P', word: 'Paraply', emoji: '☂️' },
  { letter: 'Q', word: 'Quiz', emoji: '❓' },
  { letter: 'R', word: 'Rev', emoji: '🦊' },
  { letter: 'S', word: 'Sol', emoji: '☀️' },
  { letter: 'T', word: 'Tiger', emoji: '🐯' },
  { letter: 'U', word: 'Ugle', emoji: '🦉' },
  { letter: 'V', word: 'Vann', emoji: '💧' },
  { letter: 'W', word: 'Wok', emoji: '🍳' },
  { letter: 'X', word: 'Xylofon', emoji: '🎵' },
  { letter: 'Y', word: 'Yoghurt', emoji: '🥣' },
  { letter: 'Z', word: 'Zebra', emoji: '🦓' },
  { letter: 'Æ', word: 'Ær', emoji: '🦆' },
  { letter: 'Ø', word: 'Ørn', emoji: '🦅' },
  { letter: 'Å', word: 'Ål', emoji: '🐟' }
];

/**
 * Returnerer en tilfeldig bokstav fra listen over bokstaver.
 * @returns {object} et objekt med egenskapene `letter` og `word`.
 */
export function getRandomLetter() {
  const index = Math.floor(Math.random() * letters.length);
  return letters[index];
}

/**
 * Fisher–Yates shuffling. Lager en kopi av arrayen og returnerer
 * elementene i tilfeldig rekkefølge. Brukes til å generere
 * tilfeldig rekkefølge på bokstaver eller kort.
 * @param {Array} array - listen som skal blandes
 * @returns {Array} en ny array med elementene i tilfeldig rekkefølge
 */
export function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Genererer et sett med alternativer for matchingsspillet. Funksjonen
 * tar inn et nåværende bokstavobjekt og et antall alternativer, og
 * returnerer en blandet liste som inneholder den korrekte bokstaven
 * sammen med tilfeldige avledninger. Dersom antall alternativer
 * overskrider antall tilgjengelige bokstaver, justeres det.
 *
 * @param {object} currentLetter - bokstavobjektet som er korrekt
 * @param {number} count - antall alternativer som skal genereres
 * @returns {Array<object>} en blandet liste av bokstavobjekter
 */
export function generateMatchingOptions(currentLetter, count) {
  // Lag en liste uten den aktuelle bokstaven
  const others = letters.filter((l) => l.letter !== currentLetter.letter);
  // Juster antall distraktorer dersom det er flere enn tilgjengelig
  const distractorCount = Math.min(count - 1, others.length);
  // Plukk ut tilfeldige distraktorer
  const distractors = shuffle(others).slice(0, distractorCount);
  // Legg til den korrekte bokstaven
  const options = [...distractors, currentLetter];
  return shuffle(options);
}
