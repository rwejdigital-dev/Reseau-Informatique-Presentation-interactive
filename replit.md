# Réseau Informatique

Une présentation web interactive en français pour découvrir les réseaux informatiques, leurs équipements, les protocoles web et les bases de la sécurité.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/reseau-informatique/src/App.tsx` — page unique et interactions des cinq chapitres
- `artifacts/reseau-informatique/src/index.css` — thème visuel, typographies, textures et animations
- `artifacts/reseau-informatique/vite.config.ts` — configuration Vite et routage de l’artefact
- `artifacts/api-server/` — serveur partagé, non utilisé par cette présentation statique

## Architecture decisions

- La présentation est volontairement statique côté données : les interactions pédagogiques vivent dans l’état local React.
- Les cinq chapitres sont des ancres dans une seule page afin de conserver une lecture continue et un défilement fluide.
- Les images distantes Unsplash sont utilisées comme matière visuelle avec des superpositions et une palette dédiée pour préserver la lisibilité.

## Product

- Navigation fixe par chapitres avec indicateur de progression
- Introduction immersive avec CTA « Commencer »
- Cartes interactives LAN / MAN / WAN
- Sélecteur d’équipements : routeur, commutateur, fibre et RJ45
- Schéma interactif Client → Protocoles → Serveur pour IP, DNS et HTTP(S)
- Conclusion dédiée au pare-feu, au VPN et à la confiance
- Mise en page responsive avec menu mobile et bouton « Retour en haut »

## User preferences

 

## Gotchas

- Le serveur Vite attend `PORT` et `BASE_PATH` via le workflow géré de l’artefact.
- La page dépend d’images Unsplash distantes ; les overlays de la page maintiennent la lisibilité si elles chargent lentement.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
