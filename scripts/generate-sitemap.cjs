const fs = require('fs');
const path = require('path');

const baseUrl = (process.env.SITE_URL || 'https://collabyt.com').replace(/\/$/, '');
const now = new Date().toISOString();
const locales = ['pt-br', 'en'];

const staticRoutes = [
  '',
  'solutions',
  'methodology',
  'projects',
  'startups',
  'industries',
  'retail',
  'healthcare',
  'tech-lab',
  'about',
  'about/team',
  'tech',
  'faq',
  'contact',
  'privacy-policy',
  'terms',
];

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function extractProjectIdsFromTranslations() {
  const translationsPath = path.join(process.cwd(), 'translations.ts');
  if (!fs.existsSync(translationsPath)) return [];

  const content = fs.readFileSync(translationsPath, 'utf8');
  const idRegex = /id\s*:\s*(\d+)/g;
  const ids = new Set();
  let match;

  while ((match = idRegex.exec(content)) !== null) {
    ids.add(match[1]);
  }

  return Array.from(ids).sort((a, b) => Number(a) - Number(b));
}

function buildPaths() {
  const paths = new Set(['/']);
  const projectIds = extractProjectIdsFromTranslations();

  locales.forEach((locale) => {
    staticRoutes.forEach((route) => {
      const suffix = route ? `/${route}` : '';
      paths.add(`/${locale}${suffix}`);
    });

    projectIds.forEach((id) => {
      paths.add(`/${locale}/projects/${id}`);
    });
  });

  return Array.from(paths);
}

function getPriority(routePath) {
  if (routePath === '/') return '0.5';
  if (routePath === '/pt-br' || routePath === '/en') return '1.0';
  if (routePath.includes('/projects/')) return '0.8';
  if (routePath.endsWith('/contact')) return '0.9';
  return '0.7';
}

function buildXml(paths) {
  const urls = paths
    .sort((a, b) => a.localeCompare(b))
    .map((routePath) => {
      return [
        '  <url>',
        `    <loc>${baseUrl}${routePath}</loc>`,
        `    <lastmod>${now}</lastmod>`,
        '    <changefreq>weekly</changefreq>',
        `    <priority>${getPriority(routePath)}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
}

const paths = buildPaths();
const sitemapXml = buildXml(paths);

const rootSitemapPath = path.join(process.cwd(), 'sitemap.xml');
const publicSitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
writeFile(rootSitemapPath, sitemapXml);
writeFile(publicSitemapPath, sitemapXml);

const robotsContent = `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`;
const rootRobotsPath = path.join(process.cwd(), 'robots.txt');
const publicRobotsPath = path.join(process.cwd(), 'public', 'robots.txt');
writeFile(rootRobotsPath, robotsContent);
writeFile(publicRobotsPath, robotsContent);

console.log('SEO artifacts generated:');
console.log('-', rootSitemapPath);
console.log('-', publicSitemapPath);
console.log('-', rootRobotsPath);
console.log('-', publicRobotsPath);
console.log('Total URLs in sitemap:', paths.length);
