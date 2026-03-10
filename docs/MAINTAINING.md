````markdown
# MANUTEN�?�fO �?" Collaby.t Site

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
- `index.html` �?" head e importmap
- `index.tsx` �?" entry; contém `HelmetProvider`, `BrowserRouter`, rotas
- `App.tsx` �?" layout principal, seções identificadas por `id` (usadas pelo sitemap)
- `components/Meta.tsx` �?" componente central para metas dinâmicas (OG/Twitter)
- `translations.ts` �?" textos/estrutura de projetos e conteúdo multilíngue
- `scripts/generate-sitemap.cjs` �?" cria `sitemap.xml` a partir de `App.tsx` e `translations.ts`
- `scripts/prerender.cjs` �?" prerender via Playwright para capturar HTML final
- `sitemap.xml`, `sitemap-external.txt` �?" saídas do gerador de sitemap
- `.husky/` �?" hooks; `pre-commit` e `pre-push` já configurados
- `.github/workflows/ci.yml` �?" CI: lint, typecheck, generate sitemap e build (sem prerender)

## Como adicionar um novo projeto ao catálogo
1. Abrir `translations.ts` e adicionar novo item em `projects.items` com `id` único.
2. Opcional: se quiser rota interna, o `scripts/generate-sitemap.cjs` incluirá `/projects/:id` automaticamente.
3. Atualizar `ProjectCatalog.tsx` se precisar de campos adicionais na UI.

## Como atualizar metas / SEO
- `components/Meta.tsx` contém defaults �?" alterar conforme necessário.
- Para metas por seção, `App.tsx` contém mapeamento `sectionMeta` usado pelo componente `Meta`.

## Troubleshooting
- `404 /index.css`: verifique se o arquivo `index.css` existe na raiz (fornecido pelo projeto).
- `prebuild/prerender` falhando: garantir que `PRERENDER_PORT` esteja livre ou ajuste `PRERENDER_PORT` em `.env`.
- Playwright erros: certifique-se que navegadores foram baixados (`npm install` baixa automaticamente).

## Checklist de manutenção periódica
- Atualizar dependências com `npm outdated` e revisar breaking changes.
- Rodar `npm run lint` e `npm run typecheck` antes de merges.
- Regenerar sitemaps quando adicionar/remover rotas públicas.

## Contato
Abrir issue ou mencionar mantenedor principal no PR para dúvidas de arquitetura.

````

