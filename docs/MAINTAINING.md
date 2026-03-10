````markdown
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
- `index.html` â€” head e importmap
- `index.tsx` â€” entry; contÃ©m `HelmetProvider`, `BrowserRouter`, rotas
- `App.tsx` â€” layout principal, seÃ§Ãµes identificadas por `id` (usadas pelo sitemap)
- `components/Meta.tsx` â€” componente central para metas dinÃ¢micas (OG/Twitter)
- `translations.ts` â€” textos/estrutura de projetos e conteÃºdo multilÃ­ngue
- `scripts/generate-sitemap.cjs` â€” cria `sitemap.xml` a partir de `App.tsx` e `translations.ts`
- `scripts/prerender.cjs` â€” prerender via Playwright para capturar HTML final
- `sitemap.xml`, `sitemap-external.txt` â€” saÃ­das do gerador de sitemap
- `.husky/` â€” hooks; `pre-commit` e `pre-push` jÃ¡ configurados
- `.github/workflows/ci.yml` â€” CI: lint, typecheck, generate sitemap e build (sem prerender)

## Como adicionar um novo projeto ao catÃ¡logo
1. Abrir `translations.ts` e adicionar novo item em `projects.items` com `id` Ãºnico.
2. Opcional: se quiser rota interna, o `scripts/generate-sitemap.cjs` incluirÃ¡ `/projects/:id` automaticamente.
3. Atualizar `ProjectCatalog.tsx` se precisar de campos adicionais na UI.

## Como atualizar metas / SEO
- `components/Meta.tsx` contÃ©m defaults â€” alterar conforme necessÃ¡rio.
- Para metas por seÃ§Ã£o, `App.tsx` contÃ©m mapeamento `sectionMeta` usado pelo componente `Meta`.

## Troubleshooting
- `404 /index.css`: verifique se o arquivo `index.css` existe na raiz (fornecido pelo projeto).
- `prebuild/prerender` falhando: garantir que `PRERENDER_PORT` esteja livre ou ajuste `PRERENDER_PORT` em `.env`.
- Playwright erros: certifique-se que navegadores foram baixados (`npm install` baixa automaticamente).

## Checklist de manutenÃ§Ã£o periÃ³dica
- Atualizar dependÃªncias com `npm outdated` e revisar breaking changes.
- Rodar `npm run lint` e `npm run typecheck` antes de merges.
- Regenerar sitemaps quando adicionar/remover rotas pÃºblicas.

## Contato
Abrir issue ou mencionar mantenedor principal no PR para dÃºvidas de arquitetura.

````

