

## Remplacer les champs date natifs par des calendriers avec semaine commençant le lundi

### Problème
Les champs `<input type="date">` natifs utilisent le format mm/dd/yyyy et démarrent la semaine le dimanche (selon le navigateur). L'utilisateur veut le format belge (dd/mm/yyyy) et les semaines commençant le lundi.

### Solution
Remplacer les deux `<input type="date">` (Début et Fin) par des **Popover + Calendar** (composants shadcn existants) avec `weekStartsOn: 1` (lundi) et affichage au format belge.

### Fichier modifié : `src/components/dashboard/CongesCalendar.tsx`

1. **Imports** : Ajouter `Popover`, `PopoverTrigger`, `PopoverContent`, `Calendar`, `CalendarIcon`, et `formatDateBE` / `formatLocalDate`.

2. **États** : Changer `formStart`/`formEnd` de `string` à `Date | undefined`.

3. **Champs Début/Fin** : Remplacer chaque `<input type="date">` par un `Popover` contenant un `Calendar` configuré avec :
   - `weekStartsOn={1}` (lundi)
   - `locale={fr}` (français) via `date-fns/locale`
   - Affichage du bouton au format `dd/mm/yyyy` via `formatDateBE`

4. **Mutation** : Adapter l'insertion pour convertir les `Date` en `YYYY-MM-DD` via `formatLocalDate`.

### Détails techniques
- Le composant `Calendar` de shadcn utilise `react-day-picker` qui supporte `weekStartsOn`.
- Import de `fr` depuis `date-fns/locale/fr` pour les noms de jours/mois en français.

