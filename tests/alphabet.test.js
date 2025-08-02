/*
 * Enkle enhetstester for funksjonene i alphabet.js. Testene
 * kjøres med Node og bruker innebygget assert‑modul. For å kjøre
 * testene: `node tests/alphabet.test.js` fra prosjektmappen.
 */

const assert = require('assert');

async function runTests() {
  const mod = await import('../script/modules/alphabet.js');
  // Test at shuffle returnerer en ny array av samme lengde
  const original = mod.letters.slice(0, 5);
  const shuffled = mod.shuffle(original);
  assert.strictEqual(shuffled.length, original.length, 'Shuffle endrer ikke lengde');
  // Test at shuffle ikke alltid returnerer samme rekkefølge (statistisk sannsynlighet for lik rekkefølge er lav)
  const sameOrder = original.every((val, idx) => val === shuffled[idx]);
  // Dette kan av og til være true, men da prøver vi på nytt
  if (sameOrder) {
    const shuffled2 = mod.shuffle(original);
    const sameOrder2 = original.every((val, idx) => val === shuffled2[idx]);
    assert(!sameOrder2, 'Shuffle skal blande elementene');
  }
  // Test generateMatchingOptions gir korrekt antall alternativer og inneholder den riktige bokstaven
  const letterObj = mod.letters[0];
  const options = mod.generateMatchingOptions(letterObj, 3);
  assert.strictEqual(options.length, 3, 'Skal generere tre alternativer');
  assert(options.some((o) => o.letter === letterObj.letter), 'Riktig bokstav skal være med');
  // Alternativene skal være unike bokstaver
  const uniqueLetters = new Set(options.map((o) => o.letter));
  assert.strictEqual(uniqueLetters.size, options.length, 'Alternativer skal ikke inneholde duplikater');
  console.log('Alle tester passerte.');
}

runTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
