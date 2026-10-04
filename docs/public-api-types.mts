// Objectif : vérifier les types publiés depuis un projet consommateur.
import { museumNoticeCase, assessMuseumNotice, DECISIONS } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";
const dossier = museumNoticeCase({
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
});
void DECISIONS;
void assessMuseumNotice(dossier, createFakeProvider(() => ({ model: "jev-1.13.0", answers: { decision: { type: "choice", choice: "coherent_notice", probabilities: { "coherent_notice": 0.82, "review_required": 0.06, "possible_inconsistency": 0.06, "no_notice": 0.06 }, confidence: 0.82 } } })));

// Ces erreurs attendues protègent le contrat des consommateurs TypeScript.
// @ts-expect-error — un fournisseur doit retourner une réponse Jev complète.
createFakeProvider(() => ({}));
const result = await assessMuseumNotice(dossier, createFakeProvider(() => ({ model: "jev-1.13.0", answers: {} })));
const review: boolean = result.review;
void review;
// @ts-expect-error — la revue humaine est un booléen.
const incorrect: string = result.review;
void incorrect;
