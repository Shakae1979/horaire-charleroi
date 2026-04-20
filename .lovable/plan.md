

## Objectif
Rendre les couleurs des rôles dans la **grille horaire interactive** (`HourlyGrid.tsx`) plus vives et lisibles, tout en gardant le mapping couleur ↔ département identique (Responsable=rouge, Technique=orange, Éditorial=jaune, Stock=bleu, Caisse=vert, Stagiaire=rose).

## Proposition : passer de 30% d'opacité à 60% + nuance plus saturée

Actuellement les cellules utilisent `bg-{color}-500/30` (très transparent). Je propose de passer à `bg-{color}-400/70` qui donne des couleurs franches mais qui restent lisibles avec le texte.

| Rôle | Avant (délavé) | Après (tranché) |
|---|---|---|
| Responsable | `bg-red-500/30` | `bg-red-400/70` |
| Technique | `bg-orange-500/30` | `bg-orange-400/75` |
| Éditorial | `bg-yellow-500/30` | `bg-yellow-300/80` |
| Stock | `bg-blue-500/30` | `bg-blue-400/70` |
| Caisse | `bg-emerald-500/30` | `bg-emerald-400/70` |
| Stagiaire | `bg-pink-500/30` | `bg-pink-400/70` |
| Heure de table | transparent (rayé) | transparent (rayé) — inchangé |

Les pastilles de légende (`dot`) restent identiques (nuance 500 pleine).

## Fichier modifié
- `src/components/team-day/HourlyGrid.tsx` — uniquement la constante `ROLES` (lignes 26-34).

## Note
Le code couleur des **autres vues** (planning hebdo, congés, badges employés) qui utilisent des bordures 500 + fonds 100 est conservé tel quel — il est déjà plus tranché. Cette modification cible uniquement la grille horaire du jour qui était la plus pâle.

Si après aperçu vous trouvez les couleurs encore trop pâles ou au contraire trop saturées, on pourra ajuster facilement (par ex. passer en `/85` ou repasser à `bg-{color}-500/60`).

