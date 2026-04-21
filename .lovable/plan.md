

## Objectif
Centraliser **toutes les constantes de couleurs par rôle** dans un fichier unique `src/lib/role-colors.ts`, supprimer les duplications et corriger les **incohérences** détectées entre les vues.

## Incohérences actuelles à corriger

| Rôle | TeamWeekView / HourlyGrid / ScheduleEditor / QuarterView | TeamAndAccounts / ShareLinks / EmployeeManager |
|---|---|---|
| Responsable | 🔴 rouge | 🟠 orange |
| Technique | 🟠 orange | 🔵 bleu |
| Éditorial | 🟡 jaune | 🟣 violet |
| Stock | 🔵 bleu | 🟡 ambre |

→ On garde la palette **planning** (rouge/orange/jaune/bleu/vert/rose) qui est la référence visuelle dominante (planning jour, semaine, congés, éditeur).

## Fichier centralisé : `src/lib/role-colors.ts`

Exporte un objet typé `ROLE_COLORS` avec toutes les variantes nécessaires + helpers :

```ts
export const ROLE_KEYS = ["responsable", "technique", "editorial", "stock", "caisse", "stagiaire"] as const;
export type RoleKey = typeof ROLE_KEYS[number];

export const ROLE_COLORS: Record<RoleKey, {
  hue: string;          // ex: "red" — pour debug/extension
  dot: string;          // pastille pleine: bg-red-500
  bar: string;          // barre Gantt: bg-red-500
  barSoft: string;      // grille horaire: bg-red-500/80
  bgSoft: string;       // fond doux: bg-red-50 dark:bg-red-950/20
  bgChip: string;       // badge clair: bg-red-100 text-red-800
  bgChipDark: string;   // badge avec dark: bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400
  headerBg: string;     // en-tête de section Gantt: bg-red-100 dark:bg-red-900/40
  borderL: string;      // bordure gauche: border-l-red-500
  text: string;         // texte: text-red-800 dark:text-red-200
  editorBg: string;     // ScheduleEditor: bg-red-100 dark:bg-red-950/40
  congesHeaderBg: string; // QuarterView congés: bg-red-100 dark:bg-red-900/30
  congesBorderL: string;  // QuarterView congés: border-l-2 border-l-red-300 dark:border-l-red-700
}>;

export const ROLE_ORDER: RoleKey[] = [...ROLE_KEYS];

export function getRoleColors(role: string) {
  return ROLE_COLORS[role as RoleKey] ?? ROLE_COLORS.caisse;
}
```

Palette retenue (homogène, vive) :
- **responsable** → red-500 / red-100 / red-50
- **technique** → orange-500 / orange-100 / orange-50
- **editorial** → yellow-500 / yellow-100 / yellow-50
- **stock** → blue-500 / blue-100 / blue-50
- **caisse** → emerald-500 / emerald-100 / emerald-50
- **stagiaire** → pink-500 / pink-100 / pink-50

## Fichiers refactorés

1. `src/components/team-day/HourlyGrid.tsx` — supprime `ROLES`, `ROLE_BG`, `ROLE_BORDER_L` ; importe depuis `role-colors`. Garde `heure_de_table` localement (cas spécial transparent).
2. `src/pages/TeamWeekView.tsx` — supprime `ROLE_COLORS` local, importe depuis `role-colors`. `CONGE_COLORS` reste local (statuts ≠ rôles).
3. `src/components/dashboard/ScheduleEditor.tsx` — supprime `DEPT_COLORS`, utilise `editorBg` + `borderL`.
4. `src/components/dashboard/conges/QuarterView.tsx` — supprime `ROLE_COLUMNS`, utilise `congesHeaderBg` + `congesBorderL`. **Correction** : Caisse passe de green à emerald pour cohérence.
5. `src/components/dashboard/TeamAndAccounts.tsx` — utilise `bgChip`. **Correction visuelle** : passage à la palette planning (rouge/orange/jaune/bleu/vert/rose).
6. `src/components/dashboard/ShareLinks.tsx` — utilise `bgChipDark`. Même correction de palette.
7. `src/components/dashboard/EmployeeManager.tsx` — utilise `bgChip`. Même correction de palette.

## Hors périmètre
- `EmployeeMobileView.tsx` (palette amber/sky/violet propre à la vue mobile employé — différente intentionnellement, on ne la touche pas).
- `CONGE_COLORS` (TeamWeekView) et les couleurs de **statuts d'absence** (lime/cyan/rose…) — ce sont des statuts, pas des rôles.
- Couleurs des vacances scolaires (amber/sky) et jours fériés (emerald) — sémantiques calendrier.

## Détails techniques
- Aucun changement de schéma DB.
- Aucune migration.
- Tailwind safelist : toutes les classes utilisées sont écrites en littéral dans `role-colors.ts` (chaînes complètes, pas de concaténation dynamique) → JIT les détecte sans config supplémentaire.
- Mémoire à mettre à jour : `mem://style/couleurs-departements` pour pointer vers le fichier centralisé.

## Bénéfices
- **1 seul endroit** pour modifier la charte de couleurs.
- **Fin des incohérences** entre les vues admin et les vues planning.
- **Typage strict** des clés de rôle via `RoleKey`.
- Base saine pour ajouter facilement des variantes (ex: dark mode, mode print).

