// Objectif : effectuer un appel Jev synthétique uniquement sur demande explicite.
import { createJevClient } from "../src/jev.mjs";
import { assessMuseumNotice } from "../src/index.mjs";
const client = createJevClient();
const résultat = await assessMuseumNotice({
  "id": "exemple-1",
  "text": "Notice synthétique : désignation, matière, technique, datation et description convergent vers un même type d’objet du XIXe siècle.",
  "source": {
    "url": "https://example.test/source-publique",
    "date": "2026-10-01"
  },
  "details": {
    "territoire": "France — cas synthétique",
    "origine": "donnée synthétique"
  }
}, client);
console.log(JSON.stringify({ décision: résultat.decision, confiance: résultat.confidence, usage: résultat.usage }, null, 2));
