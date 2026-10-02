// Objectif : produire un rapport hors ligne comparant les trois chemins de décision.
import { assessMuseumNotice } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";
const principal = {
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
};
const limite = {
  "id": "limite-1",
  "text": "Cas synthétique traité par une règle déterministe avant toute analyse sémantique.",
  "source": {
    "url": "https://example.test/cas-limite",
    "date": "2026-10-01"
  },
  "noticeFields": []
};
const revue = {
  "id": "revue-1",
  "text": "La datation indique le XVIIe siècle tandis que la description mentionne une technique apparue plus tard, sans source ni historique de réattribution.",
  "source": {
    "url": "https://example.test/dossier-ambigu",
    "date": "2026-10-01"
  },
  "details": {
    "origine": "donnée synthétique",
    "signal": "informations incomplètes"
  }
};
const réponses = [{
  "model": "jev-1.13.0",
  "answers": {
    "decision": {
      "type": "choice",
      "choice": "coherent_notice",
      "probabilities": {
        "coherent_notice": 0.82,
        "review_required": 0.06,
        "possible_inconsistency": 0.06,
        "no_notice": 0.06
      },
      "confidence": 0.82
    }
  },
  "usage": {
    "input_tokens": 120,
    "output_tokens": 0
  }
}, {
  "model": "jev-1.13.0",
  "answers": {
    "decision": {
      "type": "choice",
      "choice": "review_required",
      "probabilities": {
        "coherent_notice": 0.1267,
        "review_required": 0.62,
        "possible_inconsistency": 0.1267,
        "no_notice": 0.1267
      },
      "confidence": 0.62
    }
  },
  "usage": {
    "input_tokens": 140,
    "output_tokens": 0
  }
}];
const provider = createFakeProvider(() => réponses.shift());
const résultats = [];
for (const [scénario, dossier] of [["principal", principal], ["limite déterministe", limite], ["revue humaine", revue]]) {
  const résultat = await assessMuseumNotice(dossier, provider);
  résultats.push({ scénario, décision: résultat.label, revueHumaine: résultat.review, déterministe: résultat.deterministic });
}
console.log(JSON.stringify({ dépôt: "jev-joconde-notice-review", résultats }, null, 2));
