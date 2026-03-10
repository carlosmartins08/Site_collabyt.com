```markdown
# ARCHITECTURE �?" Visão Geral Técnica

Este documento descreve a arquitetura do front-end e pontos importantes para novos desenvolvimentos.

## Stack
- React 19 + TypeScript
- Vite como bundler/dev server
- TailwindCSS (via CDN config em `index.html`)
- Framer Motion para animações
- React Router para navegação client-side
- Playwright para prerender (SSG)

## Fluxo de dados e i18n
- `translations.ts` contém objetos `pt` e `en`. O `LanguageContext` lê `translations` e expõe `t(key)` que retorna valores por chave.
- Conteúdos dinâmicos (ex.: projetos) são armazenados em `translations.ts` e usados por `ProjectCatalog`.

## Rotas e SEO
- Aplicação principal é SPA com seções (`id` em `App.tsx`). `generate-sitemap.cjs` varre `App.tsx` por `id` e gera rotas de seção.
- Projetos em `translations.ts` geram `/projects/:id` automaticamente no sitemap.
- `components/Meta.tsx` + `react-helmet-async` atualizam o `<head>` dinamicamente.
- `scripts/prerender.cjs` usa Playwright para capturar snapshots HTML para cada rota listada em `sitemap.xml` e grava em `dist/<route>/index.html`.

## Estrutura de pastas relevante
- `/components` �?" UI components (Hero, ProjectCatalog, ProjectDetail, etc.)
- `/scripts` �?" utilitários de build: `generate-sitemap.cjs`, `prerender.cjs`
- `/public` (não obrigatório) �?" imagens estáticas; atualmente algumas imagens são URLs externas
- `index.html` �?" html base e importmap

## Padrões e práticas recomendadas
- Evitar acessar `window` sem checagem (SSR-safe) �?" a maioria do app é client-only, mas cuidamos do prerender.
- Tipar `translations` se for evoluir para CMS. Atualmente `t()` retorna `any` �?" considerar criar um `type Translations` para segurança.
- Usar chaves estáveis em listas; evitar `index` como key quando houver `id` disponível.

## CI / Deploy
- CI executa lint + typecheck + build (sem prerender) e salva `dist` como artifact.
- Para geração de HTML estático com prerender, rodar `npm run build` que dispara `postbuild` (generate sitemap + prerender).

## Onde estender
- Para adicionar rotas SSG completas (p.ex. `/blog/:slug`) considere migrar para Next.js/Astro ou adicionar uma etapa de geração de arquivos com dados externos.

## Dependências críticas (para manutenção)
- `scripts/generate-sitemap.cjs` �?" lógica de extração de ids e projetos
- `scripts/prerender.cjs` �?" fluxo de preview + Playwright
- `components/Meta.tsx` �?" central para SEO; atualizar se mudar estrutura de OpenGraph

```

