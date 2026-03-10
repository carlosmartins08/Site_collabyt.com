# MANUTENÇÃO — Collaby.t Site

Este documento orienta a manutenção e tarefas recorrentes do projeto.

## Overview rápido
- Tech: React + TypeScript + Vite
- Roteamento: `react-router-dom` (client-side); prerender gera snapshots estáticos para SEO.
- i18n: simples arquivo `translations.ts` consumido por `LanguageContext`.
- SEO/SSG: `scripts/generate-sitemap.cjs` e `scripts/prerender.cjs` (Playwright).

## Primeiros passos (para mantenedor)
1. Clonar repositório
```bash
git clone <repo>
cd <repo>
npm install
```
2. Ativar hooks (se `prepare` rodar automaticamente após `npm install` você não precisa fazer nada):
```bash
npm run prepare
```

## Comandos úteis
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
- Prerender manual (após build):
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

Manteremos um único conjunto de documentação em `docs/` para evitar duplicação.

````
- `.husky/` — hooks; `pre-commit` e `pre-push` já configurados


