# Comment la décision est prise

Relit les notices des musées de France et signale les incohérences documentaires à soumettre à un spécialiste.

Le code normalise la source et applique d’abord le cas déterministe documenté dans `src/index.mjs`. Pour les autres dossiers, Jev choisit la catégorie la plus prudente selon la cohérence interne entre désignation, auteur, époque, matière, technique et description, sans inventer d’attribution. Une confiance inférieure à `0.8` marque le résultat pour revue humaine.

Les identifiants, vocabulaires contrôlés et règles de format restent validés par le code.

Les démonstrations ne contiennent que des probabilités synthétiques. Constituez un corpus français annoté, mesurez les erreurs par catégorie et fixez vos propres seuils avant un usage opérationnel.
