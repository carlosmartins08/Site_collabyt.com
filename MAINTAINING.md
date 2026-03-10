# MANUTENÃ‡ÃƒO â€” Collaby.t Site

Este documento orienta a manutenÃ§Ã£o e tarefas recorrentes do projeto.

## Overview rÃ¡pido
- Tech: React + TypeScript + Vite
- Roteamento: `react-router-dom` (client-side); prerender gera snapshots estÃ¡ticos para SEO.
- i18n: simples arquivo `translations.ts` consumido por `LanguageContext`.
- SEO/SSG: `scripts/generate-sitemap.cjs` e `scripts/prerender.cjs` (Playwright).

## Primeiros passos (para mantenedor)
1. Clonar repositÃ³rio
```bash
git clone <repo>
cd <repo>
npm install
```
2. Ativar hooks (se `prepare` rodar automaticamente apÃ³s `npm install` vocÃª nÃ£o precisa fazer nada):
```bash
npm run prepare
```

## Comandos Ãºteis
- Desenvolvimento:
```bash
npm run dev
```
- Lint:
```bash
npm run lint
```
- Formatar:
```bash
npm run format
```
- Typecheck local:
```bash
npm run typecheck
```
- Gerar sitemap manual:
```bash
npm run generate:sitemap
```
- Prerender manual (apÃ³s build):
```bash
npm run prerender
```
- Build completo (gera sitemap + prerender):
```bash
npm run build
```

## Estrutura e arquivos chave
````markdown
Este arquivo foi movido para a pasta `docs/`.

Veja: [docs/MAINTAINING.md](docs/MAINTAINING.md)

Manteremos um Ãºnico conjunto de documentaÃ§Ã£o em `docs/` para evitar duplicaÃ§Ã£o.

````
- `.husky/` â€” hooks; `pre-commit` e `pre-push` jÃ¡ configurados

