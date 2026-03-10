````markdown
Prerender, Sitemap e SEO

Este projeto inclui um fluxo mÃ­nimo para melhorar SEO produzindo snapshots estÃ¡ticos (SSG) para as rotas principais.

Comandos principais adicionais:

```bash
# gerar sitemap manualmente
npm run generate:sitemap

# executar prerender (usa Playwright + vite preview)
npm run prerender

# build completo (gera sitemap + prerender via postbuild)
npm run build
```

VariÃ¡veis de ambiente Ãºteis (ex.: `.env` ou em CI):

- `SITE_URL` â€” URL base do site (ex.: `https://collabyt.com`). Usado ao gerar `sitemap.xml`.
- `PRERENDER_PORT` â€” porta usada temporariamente pelo `vite preview` durante o prerender (padrÃ£o `5174`).

ObservaÃ§Ãµes:

- O script `scripts/generate-sitemap.cjs` varre `id="..."` em `App.tsx` e os projetos em `translations.ts` para montar as rotas do sitemap.
- `scripts/prerender.cjs` sobe `vite preview`, carrega as rotas do `sitemap.xml` com Chromium headless (Playwright), captura o HTML final e grava snapshots em `dist/<route>/index.html`.
- `playwright` Ã© um devDependency e farÃ¡ download de navegadores na primeira instalaÃ§Ã£o.

Arquivos relacionados a SEO/SSG:

- `scripts/generate-sitemap.cjs` â€” gera `sitemap.xml` dinamicamente.
- `scripts/prerender.cjs` â€” prerender via Playwright.
- `sitemap.xml`, `sitemap-external.txt` â€” saÃ­das do script de sitemap.
- `robots.txt` â€” arquivo de regras para crawlers.


````
