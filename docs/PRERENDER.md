````markdown
Prerender, Sitemap e SEO

Este projeto inclui um fluxo mínimo para melhorar SEO produzindo snapshots estáticos (SSG) para as rotas principais.

Comandos principais adicionais:

```bash
# gerar sitemap manualmente
npm run generate:sitemap

# executar prerender (usa Playwright + vite preview)
npm run prerender

# build completo (gera sitemap + prerender via postbuild)
npm run build
```

Variáveis de ambiente úteis (ex.: `.env` ou em CI):

- `SITE_URL` �?" URL base do site (ex.: `https://collabyt.com`). Usado ao gerar `sitemap.xml`.
- `PRERENDER_PORT` �?" porta usada temporariamente pelo `vite preview` durante o prerender (padrão `5174`).

Observações:

- O script `scripts/generate-sitemap.cjs` varre `id="..."` em `App.tsx` e os projetos em `translations.ts` para montar as rotas do sitemap.
- `scripts/prerender.cjs` sobe `vite preview`, carrega as rotas do `sitemap.xml` com Chromium headless (Playwright), captura o HTML final e grava snapshots em `dist/<route>/index.html`.
- `playwright` é um devDependency e fará download de navegadores na primeira instalação.

Arquivos relacionados a SEO/SSG:

- `scripts/generate-sitemap.cjs` �?" gera `sitemap.xml` dinamicamente.
- `scripts/prerender.cjs` �?" prerender via Playwright.
- `sitemap.xml`, `sitemap-external.txt` �?" saídas do script de sitemap.
- `robots.txt` �?" arquivo de regras para crawlers.


````
