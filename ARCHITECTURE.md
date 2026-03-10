# ARCHITECTURE â€” VisÃ£o Geral TÃ©cnica

Este documento descreve a arquitetura do front-end e pontos importantes para novos desenvolvimentos.

## Stack
- React 19 + TypeScript
- Vite como bundler/dev server
- TailwindCSS (via CDN config em `index.html`)
- Framer Motion para animaÃ§Ãµes
- React Router para navegaÃ§Ã£o client-side
- Playwright para prerender (SSG)

## Fluxo de dados e i18n
- `translations.ts` contÃ©m objetos `pt` e `en`. O `LanguageContext` lÃª `translations` e expÃµe `t(key)` que retorna valores por chave.
- ConteÃºdos dinÃ¢micos (ex.: projetos) sÃ£o armazenados em `translations.ts` e usados por `ProjectCatalog`.

## Rotas e SEO
- AplicaÃ§Ã£o principal Ã© SPA com seÃ§Ãµes (`id` em `App.tsx`). `generate-sitemap.cjs` varre `App.tsx` por `id` e gera rotas de seÃ§Ã£o.
- Projetos em `translations.ts` geram `/projects/:id` automaticamente no sitemap.
- `components/Meta.tsx` + `react-helmet-async` atualizam o `<head>` dinamicamente.
- `scripts/prerender.cjs` usa Playwright para capturar snapshots HTML para cada rota listada em `sitemap.xml` e grava em `dist/<route>/index.html`.

## Estrutura de pastas relevante
- `/components` â€” UI components (Hero, ProjectCatalog, ProjectDetail, etc.)
- `/scripts` â€” utilitÃ¡rios de build: `generate-sitemap.cjs`, `prerender.cjs`
- `/public` (nÃ£o obrigatÃ³rio) â€” imagens estÃ¡ticas; atualmente algumas imagens sÃ£o URLs externas
- `index.html` â€” html base e importmap

## PadrÃµes e prÃ¡ticas recomendadas
- Evitar acessar `window` sem checagem (SSR-safe) â€” a maioria do app Ã© client-only, mas cuidamos do prerender.
- Tipar `translations` se for evoluir para CMS. Atualmente `t()` retorna `any` â€” considerar criar um `type Translations` para seguranÃ§a.
- Usar chaves estÃ¡veis em listas; evitar `index` como key quando houver `id` disponÃ­vel.

## CI / Deploy
- CI executa lint + typecheck + build (sem prerender) e salva `dist` como artifact.
- Para geraÃ§Ã£o de HTML estÃ¡tico com prerender, rodar `npm run build` que dispara `postbuild` (generate sitemap + prerender).

## Onde estender
- Para adicionar rotas SSG completas (p.ex. `/blog/:slug`) considere migrar para Next.js/Astro ou adicionar uma etapa de geraÃ§Ã£o de arquivos com dados externos.

## DependÃªncias crÃ­ticas (para manutenÃ§Ã£o)
- `scripts/generate-sitemap.cjs` â€” lÃ³gica de extraÃ§Ã£o de ids e projetos
- `scripts/prerender.cjs` â€” fluxo de preview + Playwright
- `components/Meta.tsx` â€” central para SEO; atualizar se mudar estrutura de OpenGraph


