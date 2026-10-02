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
void assessMuseumNotice(dossier, createFakeProvider(() => ({})));
