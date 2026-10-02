// Objectif : implémenter la frontière de décision métier propre au dépôt.
import { readFile } from "node:fs/promises";
export const DECISIONS = Object.freeze({
  "coherent_notice": "notice_coherente",
  "review_required": "revue_requise",
  "possible_inconsistency": "incoherence_possible",
  "no_notice": "aucune_notice_fournie"
});
const CRITERIA = Object.freeze({
  "coherent_notice": "notice coherente",
  "review_required": "revue requise",
  "possible_inconsistency": "incoherence possible",
  "no_notice": "aucune notice fournie"
});
export function museumNoticeCase(input) {
  if (!input?.id || !input?.text || !input?.source?.url || !input?.source?.date) throw new TypeError("Le dossier exige id, text, source.url et source.date");
  const date = new Date(input.source.date);
  if (Number.isNaN(date.valueOf())) throw new TypeError("source.date doit être une date ISO valide");
  return { ...input, id: String(input.id), text: String(input.text).trim(), source: { url: String(input.source.url), date: date.toISOString() } };
}
export async function assessMuseumNotice(input, provider) {
  const record = museumNoticeCase(input);
  if (Array.isArray(record.noticeFields) && record.noticeFields.length === 0) return { decision: "no_notice", label: DECISIONS["no_notice"], probability: 1, review: false, deterministic: true };
  const response = await provider.decide({
    state: record,
    questions: { decision: { type: "choice", instructions: "Analysez ce dossier à partir des seuls éléments sourcés. Évaluez la cohérence interne entre désignation, auteur, époque, matière, technique et description, sans inventer d’attribution. Choisissez la catégorie la plus prudente. N’inventez ni fait, ni règle applicable, ni garantie.", criteria: CRITERIA } },
  });
  const answer = response.answers.decision;
  return { decision: answer.choice, label: DECISIONS[answer.choice], probability: answer.probabilities[answer.choice], confidence: answer.confidence, review: answer.confidence < 0.8, deterministic: false, usage: response.usage };
}
export async function runCli(argv, io = console) {
  if (argv.length !== 1) throw new Error("Usage : jev-joconde-notice-review <dossier.json>");
  const dossier = museumNoticeCase(JSON.parse(await readFile(argv[0], "utf8")));
  io.log(JSON.stringify({ dossier, prochaineÉtape: "Transmettez ce dossier à assessMuseumNotice avec un fournisseur Jev configuré." }, null, 2));
}
