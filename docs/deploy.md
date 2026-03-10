```markdown
Deploy / CI Recommendations

This project is optimized to produce a static `dist/` with prerendered pages via Playwright.

Simpler CI (fast, recommended):
- Run the `CI` workflow (already added) which:
  - installs dependencies, runs lint and typecheck,
  - generates `sitemap.xml`,
  - runs `npm run build:ci` (build without prerender), and saves `dist/` as an artifact.

Netlify / Vercel quick deploy (recommended for static hosting):
- Configure build command: `npm run build`
- Publish directory: `dist`
- Provide environment variable `SITE_URL` in the site settings.

If you want prerender in CI/Deploy (produces fully static HTML snapshots):
- Ensure `playwright` is installed and browsers are downloaded (happens on `npm install`).
- Use a runner that supports Playwright (GitHub Actions ubuntu-latest works).
- Use the command `npm run build` — `postbuild` will run `generate:sitemap` and `prerender`.

Notes:
- Playwright will download browsers on `npm install`, which increases install time.
- For large numbers of pages, prerendering can be slow; consider migrating to a framework with native SSG if performance becomes an issue.


```
