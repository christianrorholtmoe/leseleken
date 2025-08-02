/*
 * Hovedskriptet for alfabet‑spillet. Dette modulbaserte skriptet
 * håndterer navigering mellom de ulike mini‑spillene, genererer
 * dynamisk HTML‑innhold og reagerer på brukerens interaksjoner. Vi
 * importerer data og hjelpefunksjoner fra alphabet.js og bygger
 * spillene uten eksterne rammeverk.
 */

/*
 * Data og hjelpefunksjoner legges her i stedet for å importere via ES
 * moduler. Dette gjør at applikasjonen kan kjøres direkte fra
 * file:// uten CORS‑problemer. Funktionen brukes også av
 * testfilene via modulen alphabet.js, men her deklareres de på nytt
 * for nettleseren.
 */

// Bokstavlisten: hver bokstav har flere ord med tilhørende emoji. Vi
// velger ord som passer for et barn som lærer å lese. Dette gir
// variasjon i spillene og forsterker forbindelsen mellom bokstav og
// ulike ord.
const letters = [
  {
    letter: 'A',
    words: [
      { word: 'Appelsin', emoji: '🍊' },
      { word: 'Ape', emoji: '🐵' },
      { word: 'And', emoji: '🦆' }
    ]
  },
  {
    letter: 'B',
    words: [
      { word: 'Bil', emoji: '🚗' },
      { word: 'Ball', emoji: '⚽' },
      { word: 'Båt', emoji: '🚤' }
    ]
  },
  {
    letter: 'C',
    words: [
      { word: 'Computer', emoji: '💻' },
      { word: 'Cactus', emoji: '🌵' },
      { word: 'Curry', emoji: '🍛' }
    ]
  },
  {
    letter: 'D',
    words: [
      { word: 'Drage', emoji: '🐉' },
      { word: 'Dør', emoji: '🚪' },
      { word: 'Dukke', emoji: '🧸' }
    ]
  },
  {
    letter: 'E',
    words: [
      { word: 'Elefant', emoji: '🐘' },
      { word: 'Eple', emoji: '🍎' },
      { word: 'Ekorn', emoji: '🐿️' }
    ]
  },
  {
    letter: 'F',
    words: [
      { word: 'Frosk', emoji: '🐸' },
      { word: 'Fisk', emoji: '🐟' },
      { word: 'Fugl', emoji: '🐦' }
    ]
  },
  {
    letter: 'G',
    words: [
      { word: 'Gitar', emoji: '🎸' },
      { word: 'Gull', emoji: '🪙' },
      { word: 'Gås', emoji: '🦢' }
    ]
  },
  {
    letter: 'H',
    words: [
      { word: 'Hus', emoji: '🏠' },
      { word: 'Hatt', emoji: '🎩' },
      { word: 'Hest', emoji: '🐴' }
    ]
  },
  {
    letter: 'I',
    words: [
      { word: 'Is', emoji: '🍦' },
      { word: 'Insekt', emoji: '🐞' },
      { word: 'Isbjørn', emoji: '🐻‍❄️' }
    ]
  },
  {
    letter: 'J',
    words: [
      { word: 'Jordbær', emoji: '🍓' },
      { word: 'Juice', emoji: '🧃' },
      { word: 'Juvel', emoji: '💎' }
    ]
  },
  {
    letter: 'K',
    words: [
      { word: 'Katt', emoji: '🐱' },
      { word: 'Kake', emoji: '🍰' },
      { word: 'Kopp', emoji: '☕' }
    ]
  },
  {
    letter: 'L',
    words: [
      { word: 'Løve', emoji: '🦁' },
      { word: 'Lam', emoji: '🐑' },
      { word: 'Lego', emoji: '🧱' }
    ]
  },
  {
    letter: 'M',
    words: [
      { word: 'Måne', emoji: '🌙' },
      { word: 'Mus', emoji: '🐭' },
      { word: 'Melk', emoji: '🥛' }
    ]
  },
  {
    letter: 'N',
    words: [
      { word: 'Nese', emoji: '👃' },
      { word: 'Nøkkel', emoji: '🔑' },
      { word: 'Nesehorn', emoji: '🦏' }
    ]
  },
  {
    letter: 'O',
    words: [
      { word: 'Ost', emoji: '🧀' },
      { word: 'Omelett', emoji: '🍳' },
      { word: 'Olje', emoji: '🛢️' }
    ]
  },
  {
    letter: 'P',
    words: [
      { word: 'Paraply', emoji: '☂️' },
      { word: 'Panda', emoji: '🐼' },
      { word: 'Perle', emoji: '📿' }
    ]
  },
  {
    letter: 'Q',
    words: [
      { word: 'Quiz', emoji: '❓' },
      { word: 'Quilt', emoji: '🪢' },
      { word: 'Quesadilla', emoji: '🌮' }
    ]
  },
  {
    letter: 'R',
    words: [
      { word: 'Rev', emoji: '🦊' },
      { word: 'Robot', emoji: '🤖' },
      { word: 'Ring', emoji: '💍' }
    ]
  },
  {
    letter: 'S',
    words: [
      { word: 'Sol', emoji: '☀️' },
      { word: 'Sko', emoji: '👟' },
      { word: 'Sau', emoji: '🐑' }
    ]
  },
  {
    letter: 'T',
    words: [
      { word: 'Tiger', emoji: '🐯' },
      { word: 'Tog', emoji: '🚂' },
      { word: 'Tre', emoji: '🌳' }
    ]
  },
  {
    letter: 'U',
    words: [
      { word: 'Ugle', emoji: '🦉' },
      { word: 'Ur', emoji: '⌚' },
      { word: 'Ufo', emoji: '🛸' }
    ]
  },
  {
    letter: 'V',
    words: [
      { word: 'Vann', emoji: '💧' },
      { word: 'Veske', emoji: '👜' },
      { word: 'Vase', emoji: '🏺' }
    ]
  },
  {
    letter: 'W',
    words: [
      { word: 'Wok', emoji: '🍳' },
      { word: 'Web', emoji: '🕸️' },
      { word: 'Wifi', emoji: '📶' }
    ]
  },
  {
    letter: 'X',
    words: [
      { word: 'Xylofon', emoji: '🎵' }
    ]
  },
  {
    letter: 'Y',
    words: [
      { word: 'Yoghurt', emoji: '🥣' },
      { word: 'Yoyo', emoji: '🪀' },
      { word: 'Yacht', emoji: '⛵' }
    ]
  },
  {
    letter: 'Z',
    words: [
      { word: 'Zebra', emoji: '🦓' },
      { word: 'Zucchini', emoji: '🥒' }
    ]
  },
  {
    letter: 'Æ',
    words: [
      { word: 'Ær', emoji: '🦆' }
    ]
  },
  {
    letter: 'Ø',
    words: [
      { word: 'Ørn', emoji: '🦅' },
      { word: 'Øre', emoji: '👂' },
      { word: 'Øy', emoji: '🏝️' }
    ]
  },
  {
    letter: 'Å',
    words: [
      { word: 'Ål', emoji: '🐟' },
      { word: 'Ås', emoji: '⛰️' }
    ]
  }
];

/*
 * Lydfiler for riktig og galt svar. Vi oppretter to Audio‑objekter
 * som spilles av når barnet velger et svar i spill med poeng. Lydene
 * lagres i assets‑mappen som correct.wav og wrong.wav. For å sikre
 * at lyden alltid spiller fra start, tilbakestiller vi currentTime
 * før avspilling.
 */
// Vi bruker en mer engasjerende applauslyd når barnet svarer riktig.
// I stedet for det korte pipet erstattes correctAudio med en MP3‑fil
// (applause‑01.mp3) som ligger i assets‑mappen. For galt svar
// genererer vi nå en lyd med AudioContext som lager en kort
// “wah‑wah”‑lignende effekt uten behov for en ekstern lydfil. Dette
// gjør at spillet føles mer levende og engasjerende på tvers av
// nettlesere.
const correctAudio = new Audio('assets/correct.mp3');
function playCorrectSound() {
  if (!correctAudio) return;
  correctAudio.currentTime = 0;
  correctAudio.play().catch(() => {});
}
function playWrongSound() {
  // Lag en kort lyd med oscillator for å signalisere feil. Vi
  // bruker en enkel vibrato ved å modulere frekvensen litt over
  // tiden, som gir en mer interessant lyd enn et vanlig pip.
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    // Sweep frekvensen ned litt for en "sad trombone"‑følelse
    osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.4);
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
    osc.onended = () => ctx.close();
  } catch (e) {
    // Fallback: hvis Web Audio API ikke støttes, spill av den gamle
    // wrong.wav (den ligger fortsatt i assets). Denne banen brukes
    // bare hvis AudioContext kaster feil, noe som er sjeldent i
    // moderne nettlesere.
    const fallback = new Audio('assets/wrong.wav');
    fallback.play().catch(() => {});
  }
}

/**
 * Viser en midlertidig tilbakemeldingsmelding til barnet. Meldingen
 * dukker opp øverst på siden og forsvinner etter kort tid. Dette
 * gir positive (eller korrigerende) tilbakemeldinger uten å
 * avbryte spillets flyt.
 * @param {string} message Teksten som skal vises
 */
function showFeedbackMessage(message) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'feedback-message';
  msgDiv.textContent = message;
  document.body.appendChild(msgDiv);
  // Start fade‑out etter 800 ms, fjern når animasjonen er ferdig
  setTimeout(() => {
    msgDiv.classList.add('fade-out');
    msgDiv.addEventListener('transitionend', () => {
      msgDiv.remove();
    });
  }, 800);
}

/**
 * Viser en liten stjerne som flyr opp fra elementet, som en ekstra
 * visuell belønning når barnet svarer riktig. Stjernen fjernes fra
 * DOM‑en når animasjonen er fullført.
 * @param {HTMLElement} element Kortet eller containeren hvor stjernen skal vises
 */
function showStarAnimation(element) {
  const star = document.createElement('span');
  star.className = 'star-animation';
  star.textContent = '⭐';
  element.appendChild(star);
  star.addEventListener('animationend', () => {
    star.remove();
  });
}

/**
 * Genererer en visuell poeng‑/scorebar basert på en resultatliste.
 * Hver runde vises som en liten sirkel som er grå før den spilles,
 * grønn når barnet svarer riktig og rød når barnet svarer feil.
 * Dette gir en intuitiv, barnevennlig fremstilling av fremdrift
 * og poeng uten å måtte lese tekst. Vi returnerer HTML som kan
 * settes direkte inn i DOM.
 * @param {Array<boolean|null>} results Liste med true (riktig),
 * false (feil) eller null (ikke spilt ennå) for hver runde
 */
function renderScoreBar(results) {
  return `<div class="score-bar">${results
    .map((r) => {
      let color = '#ccc';
      if (r === true) color = '#4caf50';
      else if (r === false) color = '#e57373';
      return `<div class="score-unit" style="background-color:${color}"></div>`;
    })
    .join('')}</div>`;
}

/**
 * Leser opp en instruksjon på norsk ved hjelp av talesyntese. Dette
 * brukes for å gi barna verbale instruksjoner i starten av hvert
 * spill, slik at de ikke trenger å lese teksten selv.
 * @param {string} text Instruksjonen som skal leses opp
 */
function speakInstruction(text) {
  if ('speechSynthesis' in window) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'nb-NO';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }
}

// Variabel som lagrer om bakgrunnsmusikken er slått på eller av. Dette
// tillater barnet eller forelderen å skru av musikken. Vi viser en
// liten knapp i hovedmenyen for å endre denne.
// Bakgrunnsmusikken er deaktivert som standard. Brukeren kan slå den
// på via knappen i hovedmenyen dersom ønskelig.
let musicEnabled = false;

/*
 * Vis et skjermbilde for å velge hvor mange runder man vil spille i et
 * poengbasert spill. Dette gir barna (og foreldrene) mulighet til å
 * tilpasse lengden på økten etter oppmerksomhetsspennet. Når et valg
 * gjøres, kalles callback‑funksjonen med det valgte antallet. Vi bruker
 * store knapper som er enkle å trykke på.
 * @param {function(number)} onChoose
 */
function chooseRounds(onChoose) {
  root.innerHTML = `
    ${createHomeOverlay()}
    <h2>Velg lengde på runden</h2>
    <p style="text-align:center;">Hvor mange runder vil du spille?</p>
    <div class="options-grid round-select">
      <div class="round-option" data-rounds="5">5 runder</div>
      <div class="round-option" data-rounds="10">10 runder</div>
    </div>
  `;
  const overlayBtn = document.getElementById('home-btn-overlay');
  if (overlayBtn) overlayBtn.onclick = renderHome;
  document.querySelectorAll('.round-option').forEach((opt) => {
    opt.addEventListener('click', () => {
      const num = parseInt(opt.getAttribute('data-rounds'));
      onChoose(num);
    });
  });
}

/*
 * Genererer en rad med stjerner basert på poengsummen. Barn liker
 * visuelle belønninger【694885474704520†L244-L253】, så ved å vise
 * gullstjerner for riktige svar og tomme stjerner for resterende,
 * gir vi en intuitiv tilbakemelding. Returnerer HTML‑streng.
 * @param {number} score Antall riktige svar
 * @param {number} total Totalt antall runder
 */
function getStarRow(score, total) {
  let stars = '';
  for (let i = 0; i < total; i++) {
    stars += i < score ? '⭐' : '☆';
  }
  return `<div class="star-row">${stars}</div>`;
}

/*
 * Bakgrunnsmusikk for hovedmenyen. Vi benytter et lokalt lydklipp
 * (menu_music.wav) for å gi en behagelig stemning. Musikken spilles
 * i løkke når menyen vises og stoppes når barnet går til et spill.
 */
let bgAudio = null;
function startMusic() {
  // Spill ikke bakgrunnsmusikk hvis den er deaktivert
  if (!musicEnabled) return;
  if (bgAudio) {
    // Spill videre hvis allerede initiert
    bgAudio.play().catch(() => {});
    return;
  }
  // Bruk MP3‑filen som bakgrunnsmusikk. MP3 støttes i moderne nettlesere og
  // gir en fin opplevelse. Dersom du ønsker annen format kan du legge til .ogg/.wav.
  bgAudio = new Audio('assets/menu_music.mp3');
  bgAudio.loop = true;
  bgAudio.volume = 0.4;
  bgAudio.play().catch(() => {});
}

function stopMusic() {
  if (!bgAudio) return;
  bgAudio.pause();
}

/**
 * Genererer HTML for en flytende hjemknapp som vises øverst til høyre.
 * Denne brukes på spillskjermene for å gjøre det enkelt å gå
 * tilbake til hovedmenyen. Knappen legges inn i hver spillside og
 * får event‑listener i etterkant.
 * @returns {string} HTML for hjemknappen
 */
function createHomeOverlay() {
  return '<button class="overlay-home-btn" id="home-btn-overlay">🏠</button>';
}
/**
 * Fisher–Yates shuffling. Returnerer en ny array med elementene i
 * tilfeldig rekkefølge.
 * @param {Array} array
 */
function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Genererer alternativer for matchingsspillet. Returnerer en blandet
 * liste med den korrekte bokstaven og et gitt antall distraktorer.
 * @param {object} currentLetter
 * @param {number} count
 */
function generateMatchingOptions(currentLetter, count) {
  const others = letters.filter((l) => l.letter !== currentLetter.letter);
  const distractorCount = Math.min(count - 1, others.length);
  const distractors = shuffle(others).slice(0, distractorCount);
  const options = [...distractors, currentLetter];
  return shuffle(options);
}

/**
 * Velger et tilfeldig ordobjekt for en bokstav. Hvis bokstaven har
 * flere ord, returneres ett av dem. Brukes i spillene for å gi
 * variasjon. Returnerer objekt med egenskapene word og emoji.
 * @param {object} letterObj
 */
function getRandomWord(letterObj) {
  if (!letterObj || !letterObj.words || letterObj.words.length === 0) {
    return { word: '', emoji: '' };
  }
  const idx = Math.floor(Math.random() * letterObj.words.length);
  return letterObj.words[idx];
}

const root = document.getElementById('root');

/**
 * Rydder root‑elementet og skriver startsiden. Startsiden viser
 * fire fliser som leder til hvert av mini‑spillene.
 */
function renderHome() {
  // Start bakgrunnsmusikken når hovedmenyen vises
  startMusic();
  root.innerHTML = `
    <img src="assets/leseleken_logo.png" alt="Leseleken-logo" class="header-img" />
    <div class="home-header">
      <!-- Fjern headingen "Leseleken" fra hovedmenyen siden logoen allerede viser navnet -->
      <button id="music-toggle" class="music-btn">${musicEnabled ? '🔈' : '🔇'}</button>
    </div>
    <p style="text-align:center; margin-bottom: 10px;">Velg et spill for å øve på bokstavene.</p>
    <div class="game-grid">
      <div class="tile" id="tile-pronunciation">
        <div class="tile-icon">🔊</div>
        <div>Bokstavkort</div>
      </div>
      <div class="tile" id="tile-matching">
        <div class="tile-icon">🧩</div>
        <div>Match ord</div>
      </div>
      <div class="tile" id="tile-memory">
        <div class="tile-icon">🧠</div>
        <div>Huske‑spill</div>
      </div>
      <div class="tile" id="tile-writing">
        <div class="tile-icon">✍️</div>
        <div>Skriv ordet</div>
      </div>
      <div class="tile" id="tile-picture">
        <div class="tile-icon">🖼️</div>
        <div>Velg ord fra bilde</div>
      </div>
      <div class="tile" id="tile-reading">
        <div class="tile-icon">📖</div>
        <div>Les ord</div>
      </div>
    </div>
  `;
  document
    .getElementById('tile-pronunciation')
    .addEventListener('click', renderAlphabetCardsGame);
  document
    .getElementById('tile-matching')
    .addEventListener('click', renderMatchingGame);
  document
    .getElementById('tile-memory')
    .addEventListener('click', renderMemoryGame);
  // Skriv ordet spill erstatter sporingsspillet
  document
    .getElementById('tile-writing')
    .addEventListener('click', renderWritingGame);

  // Nytt spill – bildegjettingsspill
  document
    .getElementById('tile-picture')
    .addEventListener('click', renderPictureGame);
  // Les ord spill
  document
    .getElementById('tile-reading')
    .addEventListener('click', renderReadingGame);

  // Musikk‑toggle
  const musicBtn = document.getElementById('music-toggle');
  musicBtn.addEventListener('click', () => {
    musicEnabled = !musicEnabled;
    musicBtn.textContent = musicEnabled ? '🔈' : '🔇';
    if (musicEnabled) {
      startMusic();
    } else {
      stopMusic();
    }
  });

  // Gi en kort verbal instruksjon for startsiden slik at barnet vet hva det skal gjøre
  speakInstruction('Velg et spill for å øve på bokstavene.');
}

/**
 * Spillet «Bokstavlyder» viser én bokstav av gangen sammen med et
 * eksempelord. Barnet kan spille av bokstavens lyd ved hjelp av
 * nettleserens tale­syntese og gå videre til neste bokstav. Når
 * listen er fullført returneres man til startsiden.
 */
function renderPronunciationGame() {
  // Stopp bakgrunnsmusikken når man forlater hovedmenyen
  stopMusic();
  let index = 0;
  const order = shuffle(letters);
  function show() {
    const letterObj = order[index];
    // Plukk ut et ordobjekt fra listen (bruk første om ingen eller tilfeldig)
    const wordObj = letterObj.words && letterObj.words.length > 0 ? letterObj.words[0] : { word: '', emoji: '' };
    root.innerHTML = `
      ${createHomeOverlay()}
      <h2>Bokstavlyder</h2>
      <div class="emoji-display">${wordObj.emoji}</div>
      <div class="letter-display">${letterObj.letter}</div>
      <div class="word-display">${wordObj.word}</div>
      <div class="controls">
        <button class="button" id="play-sound">Spill lyd</button>
        <button class="button" id="next-btn">${
          index < order.length - 1 ? 'Neste' : 'Ferdig'
        }</button>
      </div>
    `;
    // Spill av lyd når brukeren trykker på knappen. Vi bruker
    // Web Speech API og setter språk til norsk dersom tilgjengelig.
    document.getElementById('play-sound').onclick = () => {
      if ('speechSynthesis' in window) {
        const utterLetter = new SpeechSynthesisUtterance(letterObj.letter);
        const utterWord = new SpeechSynthesisUtterance(wordObj.word);
        utterLetter.lang = 'nb-NO';
        utterWord.lang = 'nb-NO';
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterLetter);
        setTimeout(() => {
          window.speechSynthesis.speak(utterWord);
        }, 500);
      } else {
        alert('Talesyntese er ikke støttet i denne nettleseren.');
      }
    };
    // Navigering
    const overlayBtn = document.getElementById('home-btn-overlay');
    if (overlayBtn) overlayBtn.onclick = renderHome;
    document.getElementById('next-btn').onclick = () => {
      if (index < order.length - 1) {
        index++;
        show();
      } else {
        // Gå tilbake til hovedmenyen når alle bokstavene er besøkt
        renderHome();
      }
    };
  }
  show();
}

/**
 * Spillet «Match ord» gir barnet en bokstav og tre ordalternativer.
 * Barnet skal velge ordet som begynner på den viste bokstaven. Etter
 * ti runder vises en oppsummering med antall riktige svar.
 */
function renderMatchingGame() {
  // Stopp bakgrunnsmusikken når man forlater hovedmenyen
  stopMusic();
  // Barn og foreldre kan velge hvor mange runder de vil spille
  chooseRounds((numRounds) => {
    let round = 0;
    let score = 0;
    const totalRounds = numRounds;
    const order = shuffle(letters).slice(0, totalRounds);
    // Les instruksjonen høyt én gang i starten
    speakInstruction('Hvilket ord starter på bokstaven du ser? Trykk på riktig bilde.');
    function showRound() {
      if (round >= totalRounds) {
        // Oppsummering med stjerner og morsom figur
        root.innerHTML = `
          ${createHomeOverlay()}
          <h2>Match ord – resultat</h2>
          <div class="summary-figure">🥳</div>
          <p class="word-display">Du fikk ${score} av ${totalRounds} riktig!</p>
          ${getStarRow(score, totalRounds)}
          <p class="encouragement">Flott jobbet! Prøv igjen for å få enda flere poeng.</p>
          <div class="controls">
            <button class="button" id="play-again">🔁 Spill igjen</button>
          </div>
        `;
        document.getElementById('play-again').onclick = renderMatchingGame;
        const overlayBtn = document.getElementById('home-btn-overlay');
        if (overlayBtn) overlayBtn.onclick = renderHome;
        return;
      }
      const letterObj = order[round];
      // Velg et ordobjekt for den riktige bokstaven
      const correctWord = getRandomWord(letterObj);
      const options = generateMatchingOptions(letterObj, 3);
      root.innerHTML = `
        ${createHomeOverlay()}
        <h2>Hvilket ord starter på bokstaven?</h2>
        <div class="letter-display">${letterObj.letter}</div>
        <div class="score-board">Runde ${round + 1} av ${totalRounds} – Poeng: ${score}</div>
        <div class="options-grid">
          ${options
            .map((opt) => {
              const wordObj = opt.letter === letterObj.letter ? correctWord : getRandomWord(opt);
              return `<div class="option-card" data-letter="${opt.letter}">
                  <span class="option-emoji">${wordObj.emoji}</span>
                </div>`;
            })
            .join('')}
        </div>
      `;
      const overlayBtn = document.getElementById('home-btn-overlay');
      if (overlayBtn) overlayBtn.onclick = renderHome;
      // Les bokstaven høyt når man klikker på den
      document.querySelector('.letter-display').addEventListener('click', () => {
        if ('speechSynthesis' in window) {
          const utter = new SpeechSynthesisUtterance(letterObj.letter);
          utter.lang = 'nb-NO';
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(utter);
        }
      });
      document.querySelectorAll('.option-card').forEach((card) => {
        card.addEventListener('click', () => {
          const chosen = card.getAttribute('data-letter');
          // Vis visuell tilbakemelding og spill lyd
          if (chosen === letterObj.letter) {
            score++;
            card.style.backgroundColor = '#4caf50';
            card.innerHTML += '<span class="feedback-icon">✔️</span>';
            playCorrectSound();
          } else {
            card.style.backgroundColor = '#e57373';
            card.innerHTML += '<span class="feedback-icon">❌</span>';
            playWrongSound();
          }
          // deaktiver alle kort etter valg
          document.querySelectorAll('.option-card').forEach((c) => {
            c.style.pointerEvents = 'none';
          });
          setTimeout(() => {
            round++;
            showRound();
          }, 800);
        });
      });
    }
    showRound();
  });
}

/**
 * Huske‑spill hvor barnet matcher store og små bokstaver. Det
 * genereres åtte unike bokstaver som danner seksten kort.
 */
function renderMemoryGame() {
  // Stopp bakgrunnsmusikken når man forlater hovedmenyen
  stopMusic();
  // Velg åtte bokstaver tilfeldig
  const selected = shuffle(letters).slice(0, 8);
  // Lag kort – hver bokstav får to identiske kort. Hvert kort får også et
  // emoji‑ikon som representerer et ord som starter på bokstaven. Vi velger
  // et av ordene tilfeldig og bruker samme emoji for begge kortene i paret.
  let cards = [];
  selected.forEach((l) => {
    // Velg en av ordene for denne bokstaven for å vise på kortet
    const randomWord = l.words[Math.floor(Math.random() * l.words.length)];
    const emoji = randomWord.emoji;
    // To kort per bokstav, begge deler samme bokstav og emoji
    cards.push({ display: l.letter, emoji: emoji, value: l.letter, matched: false, revealed: false });
    cards.push({ display: l.letter, emoji: emoji, value: l.letter, matched: false, revealed: false });
  });
  cards = shuffle(cards);
  let revealedIndices = [];
  let matchedCount = 0;

  // Les instruksjon høyt slik at barnet forstår oppgaven
  speakInstruction('Finn par av like bokstaver ved å klikke på kortene.');

  function drawBoard() {
    // Sjekk om alt er matched
    if (matchedCount === cards.length) {
      root.innerHTML = `
        ${createHomeOverlay()}
        <h2>Finn par av like bokstaver</h2>
        <p class="word-display">Gratulerer! Du fant alle parene.</p>
        <div class="controls">
          <button class="button" id="restart">🔁 Spill igjen</button>
        </div>
      `;
      document.getElementById('restart').onclick = renderMemoryGame;
      const overlayBtn = document.getElementById('home-btn-overlay');
      if (overlayBtn) overlayBtn.onclick = renderHome;
      return;
    }
    // Tegn selve brettet
    root.innerHTML = `
      ${createHomeOverlay()}
      <h2>Finn par av like bokstaver</h2>
      <p style="text-align:center;">Trykk på to kort for å finne et par.</p>
      <div class="card-grid">
        ${cards
          .map((card, idx) => {
            const classes = ['memory-card'];
            if (card.revealed || card.matched) classes.push('revealed');
            // Når kortet er avslørt eller matchet viser vi både bokstaven og emojien
            const content = card.revealed || card.matched
              ? `<div class="card-content"><span class="letter">${card.display}</span><br><span class="emoji">${card.emoji}</span></div>`
              : '';
            return `<div class="${classes.join(' ')}" data-index="${idx}">${content}</div>`;
          })
          .join('')}
      </div>
    `;
    const overlayBtn = document.getElementById('home-btn-overlay');
    if (overlayBtn) overlayBtn.onclick = renderHome;
    document.querySelectorAll('.memory-card').forEach((div) => {
      div.addEventListener('click', () => {
        const idx = parseInt(div.getAttribute('data-index')); 
        const card = cards[idx];
        // Ignorer klikking på allerede matched eller allerede avslørt kort
        if (card.matched || card.revealed) return;
        // Vis kortet
        card.revealed = true;
        drawBoard();
        revealedIndices.push(idx);
        if (revealedIndices.length === 2) {
          const [i1, i2] = revealedIndices;
          const card1 = cards[i1];
          const card2 = cards[i2];
          if (card1.value === card2.value && i1 !== i2) {
            // match
            card1.matched = true;
            card2.matched = true;
            matchedCount += 2;
            revealedIndices = [];
            // kall drawBoard for å vise oppdatert status
            setTimeout(drawBoard, 400);
          } else {
            // Ikke match: skjul igjen etter kort tid
            setTimeout(() => {
              card1.revealed = false;
              card2.revealed = false;
              revealedIndices = [];
              drawBoard();
            }, 800);
          }
        }
      });
    });
  }
  drawBoard();
}

/**
 * Spillet «Spor bokstaven» lar barnet tegne bokstaven på et lerret.
 * Den valgte bokstaven vises bakgrunn som en lys farge, og barnet
 * tegner med musepekeren eller fingeren over den. Barnet kan velge
 * hvilken bokstav som skal spores.
 */
function renderTracingGame() {
  // Stopp bakgrunnsmusikken når man forlater hovedmenyen
  stopMusic();
  root.innerHTML = `
    ${createHomeOverlay()}
    <h2>Spor bokstaven</h2>
    <div class="controls">
      <label for="select-letter">Velg bokstav:</label>
      <select id="select-letter" class="select-letter">
        ${letters.map((l) => `<option value="${l.letter}">${l.letter}</option>`).join('')}
      </select>
    </div>
    <div class="canvas-container">
      <canvas id="traceCanvas" width="400" height="400"></canvas>
    </div>
    <div class="controls">
      <button class="button" id="clear-btn">Tøm</button>
    </div>
  `;
  const canvas = document.getElementById('traceCanvas');
  const ctx = canvas.getContext('2d');
  // Gjeldende bokstav å spore
  let currentLetter = letters[0].letter;
  // Tegn bokstaven i bakgrunnen
  function drawGuide() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '240px Arial';
    ctx.fillStyle = 'rgba(189, 189, 189, 0.3)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(currentLetter, canvas.width / 2, canvas.height / 2 + 40);
  }
  drawGuide();
  // Tegnefarge og strekbredde
  ctx.strokeStyle = '#ff7043';
  ctx.lineWidth = 8;
  let drawing = false;
  function startDraw(evt) {
    drawing = true;
    ctx.beginPath();
    const rect = canvas.getBoundingClientRect();
    ctx.moveTo(evt.clientX - rect.left, evt.clientY - rect.top);
  }
  function draw(evt) {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(evt.clientX - rect.left, evt.clientY - rect.top);
    ctx.stroke();
  }
  function endDraw() {
    drawing = false;
  }
  // Legg til event‑lyttere
  canvas.addEventListener('pointerdown', startDraw);
  canvas.addEventListener('pointermove', draw);
  canvas.addEventListener('pointerup', endDraw);
  canvas.addEventListener('pointerleave', endDraw);
  // Endre bokstav
  document.getElementById('select-letter').onchange = (e) => {
    currentLetter = e.target.value;
    drawGuide();
  };
  document.getElementById('clear-btn').onclick = () => {
    drawGuide();
  };
  const overlayBtn = document.getElementById('home-btn-overlay');
  if (overlayBtn) overlayBtn.onclick = renderHome;

  // Les instruksjon høyt slik at barnet forstår hvordan spillet fungerer
  speakInstruction('Velg en bokstav fra menyen og spor den med fingeren eller musepekeren.');
}

/**
 * Spillet «Skriv ordet» erstatter den gamle sporingsfunksjonen. Her
 * får barnet se et bilde/emoji samt ordet skrevet med store
 * bokstaver på lerretet. Barnet kan tegne over bokstavene for å
 * øve håndskrift. Når barnet er klar, kan de trykke «Neste ord» for
 * å gå videre. Spillet velger ord med maks 5 bokstaver for å gjøre
 * skriveprosessen overkommelig for små hender. Etter alle rundene
 * vises en oppsummering med stjerner. Vi bruker samme scorebar som
 * i de andre spillene for å vise progresjonen, selv om alle svar
 * regnes som riktige.
 */
function renderWritingGame() {
  // Stopp bakgrunnsmusikk
  stopMusic();
  chooseRounds((numRounds) => {
    let round = 0;
    const totalRounds = numRounds;
    // Samle alle ord med lengde <= 5 bokstaver
    const shortWords = [];
    letters.forEach((l) => {
      l.words.forEach((w) => {
        // Fjern mellomrom og spesialtegn før vi teller bokstaver
        const sanitized = w.word.replace(/[^A-Za-zÅÆØæøå]/g, '');
        if (sanitized.length <= 5) {
          shortWords.push({ word: w.word, emoji: w.emoji });
        }
      });
    });
    // Bland ordene og velg så mange vi trenger. Dersom det finnes
    // færre enn numRounds ord, tillat gjenbruk ved å sykle gjennom
    // listen.
    const shuffled = shuffle(shortWords);
    const chosen = [];
    for (let i = 0; i < totalRounds; i++) {
      chosen.push(shuffled[i % shuffled.length]);
    }
    // Hold orden på progresjonen: true etter hvert ord skrives.
    const progress = Array(totalRounds).fill(null);
    function showRound() {
      if (round >= totalRounds) {
        // Ferdig: vis oppsummering
        root.innerHTML = `
          ${createHomeOverlay()}
          <div class="summary-figure">🎉</div>
          <p class="word-display">Du skrev ${totalRounds} ord!</p>
          ${getStarRow(totalRounds, totalRounds)}
          <p class="encouragement">Flott jobbet! Øv gjerne mer for å bli en skriveekspert.</p>
          <div class="controls">
            <button class="button" id="play-again-writing">🔁 Spill igjen</button>
          </div>
        `;
        document.getElementById('play-again-writing').onclick = renderWritingGame;
        const overlayBtn = document.getElementById('home-btn-overlay');
        if (overlayBtn) overlayBtn.onclick = renderHome;
        return;
      }
      const item = chosen[round];
      // Generer scorebar HTML basert på progresjon
      const scoreBarHtml = progress
        .map((p) => {
          let color = '#ccc';
          if (p === true) color = '#4caf50';
          return `<div class="score-unit" style="background-color:${color}"></div>`;
        })
        .join('');
      root.innerHTML = `
        ${createHomeOverlay()}
        <h2>Skriv ordet</h2>
        <div class="picture-display">${item.emoji}</div>
        <p class="word-display">${item.word.toUpperCase()}</p>
        <div class="score-bar">${scoreBarHtml}</div>
        <div class="canvas-container">
          <canvas id="writeCanvas" width="500" height="200"></canvas>
        </div>
        <div class="controls">
          <button class="button" id="next-btn">Neste ord</button>
        </div>
      `;
      // Tegn ordet i bakgrunnen på canvas
      const canvas = document.getElementById('writeCanvas');
      const ctx = canvas.getContext('2d');
      function drawGuide() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '120px Arial';
        ctx.fillStyle = 'rgba(189, 189, 189, 0.3)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.word.toUpperCase(), canvas.width / 2, canvas.height / 2 + 30);
      }
      drawGuide();
      ctx.strokeStyle = '#ff7043';
      ctx.lineWidth = 8;
      let drawing = false;
      function startDraw(evt) {
        drawing = true;
        ctx.beginPath();
        const rect = canvas.getBoundingClientRect();
        ctx.moveTo(evt.clientX - rect.left, evt.clientY - rect.top);
      }
      function draw(evt) {
        if (!drawing) return;
        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(evt.clientX - rect.left, evt.clientY - rect.top);
        ctx.stroke();
      }
      function endDraw() {
        drawing = false;
      }
      canvas.addEventListener('pointerdown', startDraw);
      canvas.addEventListener('pointermove', draw);
      canvas.addEventListener('pointerup', endDraw);
      canvas.addEventListener('pointerleave', endDraw);
      // Neste knapp
      document.getElementById('next-btn').onclick = () => {
        progress[round] = true;
        round++;
        // Spill en liten korrekt lyd for å motivere
        playCorrectSound();
        showRound();
      };
      // Hjemknapp
      const overlayBtn = document.getElementById('home-btn-overlay');
      if (overlayBtn) overlayBtn.onclick = renderHome;
      // Instruksjon
      speakInstruction('Tegn over bokstavene for å skrive ordet. Når du er ferdig, trykk på knappen for neste ord.');
    }
    showRound();
  });
}

/**
 * Nytt spill: Bokstavkort. Viser en grid med alle de 29 store
 * bokstavene og tilhørende emoji. Når et kort trykkes, leses først
 * bokstaven og deretter ordet høyt via talesyntese. Barnet kan
 * returnere til hovedmenyen med en knapp.
 */
function renderAlphabetCardsGame() {
  // Stopp bakgrunnsmusikken når man forlater hovedmenyen
  stopMusic();
  // Bygg alfabetkortene med en valgt emoji/ord som lagres i data-attributter.
  const cardsHtml = letters
    .map((l) => {
      const first = getRandomWord(l) || { word: '', emoji: '' };
      // Lag et kort med både bokstav og tilhørende ord i data-atributter
      return `<div class="alphabet-card" data-letter="${l.letter}" data-word="${first.word}">
          ${first.emoji}
          <div class="alphabet-letter">${l.letter}</div>
        </div>`;
    })
    .join('');
  // Render HTML inkludert hjemknappen øverst til høyre
  root.innerHTML = `
    ${createHomeOverlay()}
    <h2>Velg en bokstav</h2>
    <p style="text-align:center;">Trykk på en bokstav for å høre bokstaven og et ord.</p>
    <div class="alphabet-grid">
      ${cardsHtml}
    </div>
  `;
  // Legg til talesyntese ved klikk. Bruk ordet lagret i data-atributtet slik at riktig ord leses.
  document.querySelectorAll('.alphabet-card').forEach((card) => {
    card.addEventListener('click', () => {
      const letter = card.getAttribute('data-letter');
      const word = card.getAttribute('data-word');
      if ('speechSynthesis' in window) {
        const utterLetter = new SpeechSynthesisUtterance(letter);
        const utterWord = new SpeechSynthesisUtterance(word);
        utterLetter.lang = 'nb-NO';
        utterWord.lang = 'nb-NO';
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterLetter);
        setTimeout(() => {
          window.speechSynthesis.speak(utterWord);
        }, 500);
      }
    });
  });
  // Hjemknappen i overlegg
  const overlayBtn = document.getElementById('home-btn-overlay');
  if (overlayBtn) overlayBtn.onclick = renderHome;
  // Les instruksjonen høyt slik at barnet forstår oppgaven
  speakInstruction('Trykk på et kort for å høre bokstaven og ordet.');
}

/**
 * Bilde‑til‑ord spill: viser et bilde/emoji og tre ordalternativer.
 * Barnet skal velge ordet som beskriver bildet. Etter et gitt antall
 * runder vises poengsummen. Dette spillet bruker kun store bokstaver
 * fra listen, men ordalternativene vises som de står i datasettet.
 */
function renderPictureGame() {
  // Stopp bakgrunnsmusikken når man forlater hovedmenyen
  stopMusic();
  // La barnet velge antall runder (5 eller 10)
  chooseRounds((numRounds) => {
    let round = 0;
    let score = 0;
    const totalRounds = numRounds;
    const order = shuffle(letters).slice(0, totalRounds);
    // Lag en resultatliste for scorebaren. Den vil inneholde
    // null for ikke‑spillte runder, true for riktige og false for feil.
    const results = Array(totalRounds).fill(null);
    // Les instruksjon høyt
    speakInstruction('Se på bildet og trykk på ordet som passer.');
    function showRound() {
      if (round >= totalRounds) {
        // Oppsummering med stjerner og figur
        root.innerHTML = `
          ${createHomeOverlay()}
          <div class="summary-figure">🎉</div>
          <p class="word-display">Du fikk ${score} av ${totalRounds} riktig!</p>
          ${getStarRow(score, totalRounds)}
          <p class="encouragement">Supert! Øv mer for å bli en ordmester.</p>
          <div class="controls">
            <button class="button" id="play-again">🔁 Spill igjen</button>
          </div>
        `;
        document.getElementById('play-again').onclick = renderPictureGame;
        const overlayBtn = document.getElementById('home-btn-overlay');
        if (overlayBtn) overlayBtn.onclick = renderHome;
        return;
      }
      const letterObj = order[round];
      const correctWord = getRandomWord(letterObj);
      const options = generateMatchingOptions(letterObj, 3);
      root.innerHTML = `
        ${createHomeOverlay()}
        <h2>Hvilket ord passer til bildet?</h2>
        <div class="picture-display">${correctWord.emoji}</div>
        ${renderScoreBar(results)}
        <div class="options-grid">
          ${options
            .map((opt) => {
              const w = opt.letter === letterObj.letter ? correctWord : getRandomWord(opt);
              return `<div class="option-card" data-letter="${opt.letter}">
                    <span>${w.word.toUpperCase()}</span>
                  </div>`;
            })
            .join('')}
        </div>
      `;
      const overlayBtn = document.getElementById('home-btn-overlay');
      if (overlayBtn) overlayBtn.onclick = renderHome;
      // Les ordet høyt når bildet klikkes
      document.querySelector('.picture-display').addEventListener('click', () => {
        if ('speechSynthesis' in window) {
          const utter = new SpeechSynthesisUtterance(correctWord.word);
          utter.lang = 'nb-NO';
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(utter);
        }
      });
      // Legg til klikk på alternativene
      document.querySelectorAll('.option-card').forEach((card) => {
        card.addEventListener('click', () => {
          const chosen = card.getAttribute('data-letter');
          if (chosen === letterObj.letter) {
            score++;
            card.style.backgroundColor = '#4caf50';
            card.innerHTML += '<span class="feedback-icon">✔️</span>';
            playCorrectSound();
            showFeedbackMessage('Bra jobbet!');
            results[round] = true;
            // Stjerneanimasjon
            showStarAnimation(card);
          } else {
            card.style.backgroundColor = '#e57373';
            card.innerHTML += '<span class="feedback-icon">❌</span>';
            playWrongSound();
            showFeedbackMessage('Prøv igjen!');
            results[round] = false;
          }
          document.querySelectorAll('.option-card').forEach((c) => {
            c.style.pointerEvents = 'none';
          });
          setTimeout(() => {
            round++;
            showRound();
          }, 800);
        });
      });
    }
    showRound();
  });
}

/**
 * Nytt spill: Les ord. Barnet får se et ord skrevet med store bokstaver
 * og tre emoji‑alternativer. Barnet skal velge bildet som matcher ordet.
 * Etter ti runder vises en oppsummering med poengsum og en morsom
 * figur som oppmuntrer barnet til å fortsette å øve. Vi bruker de
 * samme datastrukturene som for de andre spillene.
 */
function renderReadingGame() {
  // Stopp bakgrunnsmusikken når man forlater hovedmenyen
  stopMusic();
  // La barnet velge antall runder
  chooseRounds((numRounds) => {
    let round = 0;
    let score = 0;
    const totalRounds = numRounds;
    const order = shuffle(letters).slice(0, totalRounds);
    // Resultatliste for scorebar: true, false eller null
    const results = Array(totalRounds).fill(null);
    // Les instruksjon høyt
    speakInstruction('Les ordet og trykk på bildet som passer.');
    function showRound() {
      if (round >= totalRounds) {
        root.innerHTML = `
          ${createHomeOverlay()}
          <h2>Les ord – resultat</h2>
          <div class="summary-figure">🎈</div>
          <p class="word-display">Du fikk ${score} av ${totalRounds} riktig!</p>
          ${getStarRow(score, totalRounds)}
          <p class="encouragement">Fantastisk! Fortsett å lese og øv mer.</p>
          <div class="controls">
            <button class="button" id="play-again">🔁 Spill igjen</button>
          </div>
        `;
        document.getElementById('play-again').onclick = renderReadingGame;
        const overlayBtn = document.getElementById('home-btn-overlay');
        if (overlayBtn) overlayBtn.onclick = renderHome;
        return;
      }
      const letterObj = order[round];
      const correctWord = getRandomWord(letterObj);
      const options = generateMatchingOptions(letterObj, 3);
      root.innerHTML = `
        ${createHomeOverlay()}
        <h2>Hvilket bilde passer til ordet?</h2>
        <div class="letter-display" style="font-size:4rem;">${correctWord.word.toUpperCase()}</div>
        ${renderScoreBar(results)}
        <div class="options-grid">
          ${options
            .map((opt) => {
              // For hvert alternativ: hvis det er bokstaven vi leter etter, bruk
              // correctWord, ellers velg et annet tilfeldig ord for den bokstaven.
              const w = opt.letter === letterObj.letter ? correctWord : getRandomWord(opt);
              return `<div class="option-card" data-letter="${opt.letter}" data-word="${w.word}">
                <span class="option-emoji">${w.emoji}</span>
              </div>`;
            })
            .join('')}
        </div>
      `;
      const overlayBtn = document.getElementById('home-btn-overlay');
      if (overlayBtn) overlayBtn.onclick = renderHome;
      // Fjern å lese ordet ved klikking på ordet. I stedet kan barnet lese ordet selv.

      // Legg til lesing ved hover på bildene (emoji‑ene). Når musen holdes over et
      // alternativ uttales ordet som hører til alternativet. Dette gjør
      // det enkelt å høre uttalen før man velger.
      document.querySelectorAll('.option-card').forEach((card) => {
        const wordForCard = card.getAttribute('data-word');
        card.addEventListener('mouseenter', () => {
          if ('speechSynthesis' in window && wordForCard) {
            const utter = new SpeechSynthesisUtterance(wordForCard);
            utter.lang = 'nb-NO';
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utter);
          }
        });
      });
      document.querySelectorAll('.option-card').forEach((card) => {
        card.addEventListener('click', () => {
          const chosen = card.getAttribute('data-letter');
          if (chosen === letterObj.letter) {
            score++;
            card.style.backgroundColor = '#4caf50';
            card.innerHTML += '<span class="feedback-icon">✔️</span>';
            playCorrectSound();
            showFeedbackMessage('Bra jobbet!');
            results[round] = true;
            // Stjerneanimasjon
            showStarAnimation(card);
          } else {
            card.style.backgroundColor = '#e57373';
            card.innerHTML += '<span class="feedback-icon">❌</span>';
            playWrongSound();
            showFeedbackMessage('Prøv igjen!');
            results[round] = false;
          }
          document.querySelectorAll('.option-card').forEach((c) => {
            c.style.pointerEvents = 'none';
          });
          setTimeout(() => {
            round++;
            showRound();
          }, 800);
        });
      });
    }
    showRound();
  });
}

// Start applikasjonen når dokumentet er klar
document.addEventListener('DOMContentLoaded', () => {
  renderHome();
});

// Fallback: dersom DOMContentLoaded allerede har kjørt før skriptet
// lastes, renderes startsiden umiddelbart. Dette er nyttig når man
// laster via file:// hvor enkelte nettlesere kan håndtere events
// annerledes.
if (document.readyState !== 'loading') {
  renderHome();
}
