````markdown
# Contributing to Collaby.t Site

Obrigado por contribuir! Este guia descreve convenções de commits, fluxo de PRs, e como usar os hooks e scripts do projeto.

## Convenções de commit
Usamos Conventional Commits para manter histórico claro e compatível com geração de changelogs.
Formato: `type(scope?): subject`
Exemplos:
- `feat(projects): add project detail page`
- `fix(nav): correct active section logic`
- `chore(deps): bump react version`

Tipos comuns: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`.

#### Regras rápidas
- Mensagem em inglês ou português é aceita, mas prefira inglês em commits de equipe internacional.
- Use `!` para breaking changes: `feat!: change API`.

## Pull Requests
- Crie um branch com nome claro: `feat/projects-detail` ou `fix/navbar-scroll`.
- Abra PR para `main` (ou branch de integração) com título seguindo Conventional Commits.
- Descreva: o que mudou, por que, e passos para testar localmente.
- Marque reviewers e adicione labels (feature/bug/docs) conforme aplicável.

## Testes e checks locais
- Antes de commitar, o Husky/`lint-staged` irá rodar ESLint + Prettier nos arquivos alterados.
- Scripts úteis:
  - `npm run lint` — roda ESLint em todo o projeto
  - `npm run format` — formata com Prettier
  - `npm run typecheck` — verifica TypeScript (pesado; executado no CI)

## Hooks e CI
- `pre-commit` (Husky) executa `lint-staged` automaticamente.
- `pre-push` executa `lint-staged` (checks rápidos). O `typecheck` pesado roda no CI.
- CI (GitHub Actions) roda: `npm ci`, `npm run lint`, `npm run typecheck`, `npm run generate:sitemap`, `npm run build:ci`.

## Como rodar e testar localmente
1. Instale dependências:
```bash
npm install
```
2. Ative husky hooks (após install `prepare` já roda automaticamente):
```bash
npm run prepare
```
3. Rodar em dev:
```bash
npm run dev
```
4. Build + prerender (gera sitemap + snapshots HTML):
```bash
npm run build
```

## Estilo de código
- TypeScript + React + Tailwind.
- Use Prettier e ESLint; formato e regras são aplicados via `lint-staged`.

## Pull request checklist
- [ ] Código segue as regras de lint
- [ ] Componentes testados localmente
- [ ] Mensagem de commit formatada (Conventional Commits)
- [ ] PR com descrição clara e passos de teste

## Contato
Se tiver dúvidas sobre o fluxo, abra uma issue ou marque um reviewer.

Obrigado por colaborar!
````
