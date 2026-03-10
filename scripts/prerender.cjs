const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const PLAYWRIGHT = (() => {
  try {
    return require('playwright');
  } catch (error) {
    return null;
  }
})();

if (!PLAYWRIGHT) {
  console.error('Playwright is not installed. Run `npm install` to install dependencies.');
  process.exit(1);
}

const { chromium } = PLAYWRIGHT;
const PORT = process.env.PRERENDER_PORT || 5174;
const DIST = path.join(process.cwd(), 'dist');
const BASE = (process.env.SITE_URL || `http://localhost:${PORT}`).replace(/\/$/, '');

function waitForServer(url, timeout = 20000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      http
        .get(url, () => resolve())
        .on('error', () => {
          if (Date.now() - start > timeout) {
            reject(new Error('Preview server did not start in time'));
            return;
          }
          setTimeout(check, 250);
        });
    };
    check();
  });
}

function readSitemapPages() {
  const candidates = [
    path.join(process.cwd(), 'public', 'sitemap.xml'),
    path.join(process.cwd(), 'sitemap.xml'),
  ];
  const sitemapPath = candidates.find((candidate) => fs.existsSync(candidate));

  if (!sitemapPath) return ['/'];

  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const locRegex = /<loc>(.*?)<\/loc>/g;
  const pages = new Set();
  let match;

  while ((match = locRegex.exec(xml)) !== null) {
    try {
      const url = new URL(match[1]);
      pages.add(url.pathname + (url.search || ''));
    } catch {
      // ignore invalid loc
    }
  }

  return pages.size ? Array.from(pages) : ['/'];
}

function writePrerenderedContent(routePath, html) {
  if (routePath === '/' || routePath === '') {
    fs.writeFileSync(path.join(DIST, 'index.html'), html, 'utf8');
    return;
  }

  const cleanPath = routePath.replace(/^\//, '').replace(/\/$/, '');
  const outputDir = path.join(DIST, cleanPath);
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, 'index.html'), html, 'utf8');
}

(async () => {
  console.log('Starting prerender process...');

  let preview;
  try {
    preview = spawn('npm', ['run', 'preview', '--', '--port', String(PORT)], {
      stdio: 'inherit',
      env: { ...process.env },
      shell: process.platform === 'win32',
    });
  } catch (error) {
    console.warn('Skipping prerender: could not start preview server process.', error.message);
    process.exit(0);
  }

  try {
    await waitForServer(`${BASE}/`);
    const pages = readSitemapPages();
    console.log('Prerendering routes:', pages.join(', '));

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    for (const routePath of pages) {
      const targetUrl = `${BASE}${routePath}`;
      try {
        await page.goto(targetUrl, { waitUntil: 'networkidle' });
        const content = await page.content();
        writePrerenderedContent(routePath, content);
        console.log('Wrote prerendered route:', routePath);
      } catch (error) {
        console.warn('Failed to prerender route:', routePath, error.message);
      }
    }

    await browser.close();
    console.log('Prerender finished.');
  } catch (error) {
    const message = error && error.message ? error.message : String(error);
    if (message.includes('Executable doesn\'t exist') || message.includes('browserType.launch')) {
      console.warn('Skipping prerender: Playwright browser is not installed.');
      process.exitCode = 0;
    } else {
      console.error('Prerender failed:', message);
      process.exitCode = 1;
    }
  } finally {
    if (preview && !preview.killed) {
      preview.kill();
    }
  }
})();
