## Objectif

Aligner la palette des **rôles/départements dans la vue "Mon Planning"** (mobile et desktop) sur la charte centralisée déjà utilisée par les autres vues planning (Équipe du jour, Planning équipe, Éditeur, Congés).

## Incohérence détectée

La vue "Mon planning" (`EmployeeMobileView.tsx`) utilise une palette divergente :

| Rôle | Vues planning (charte officielle) | Mon Planning (actuel) |
|---|---|---|
| Responsable | 🔴 Rouge | 🟡 Ambre |
| Technique | 🟠 Orange | 🔵 Sky |
| Éditorial | 🟡 Jaune | 🟣 Violet |
| Stock | 🔵 Bleu | 🟢 Émeraude |
| Caisse | 🟢 Émeraude | 🌹 Rose |
| Stagiaire | 🌸 Rose | 🩵 Teal |

Résultat : un même collaborateur apparaît avec une couleur **différente** entre la vue admin et sa vue personnelle.

## Modifications

### 1. `src/components/employee/EmployeeMobileView.tsx`
- Supprimer la constante locale `ROLE_COLORS` et la fonction `getRoleColor`.
- Importer `getRoleColors` depuis `@/lib/role-colors`.
- Remplacer l'usage `roleColor.bar` / `roleColor.chip` / `roleColor.chipText` par les variantes centralisées (`bar`, `bgChip`).

### Hors périmètre (volontairement préservé)

- **`SHIFT_COLORS`** dans `EmployeeView.tsx` et `EmployeeMobileView.tsx` : palette dédiée aux **shifts récurrents** (différents créneaux horaires d'une semaine). Ce n'est pas une couleur de rôle, c'est un code visuel pour distinguer les blocs horaires identiques. À conserver intact.
- **`CONGE_COLORS`** dans `TeamWeekView.tsx` : couleurs des statuts d'absence (lime/cyan/rose…), hors périmètre puisque la demande concerne uniquement les rôles.
- Couleurs des **vacances scolaires**, **jours fériés** et **badges techniques** (SAV orange, semaines A/B bleu/violet) : sémantiques propres, à ne pas toucher.

## Détails techniques

- Aucune migration DB.
- Aucun changement d'API.
- Refactor purement visuel sur 1 fichier.
- Tailwind JIT : les classes finales sont déjà dans `role-colors.ts` (chaînes littérales), donc aucun ajout de safelist.

## Bénéfice

Un collaborateur identifie immédiatement son département avec **la même couleur** qu'il voit dans le planning collectif, l'éditeur admin et le calendrier des congés.