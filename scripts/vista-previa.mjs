/**
 * Genera `preview/`: el sitio preparado para GitHub Pages, para que Iveet lo
 * vea antes de publicarlo en su dominio.
 *
 *   npm run vista-previa       (lo corre GitHub Actions en cada push)
 *
 * Sobre una copia de dist/:
 *   1. Reescribe las rutas para la subcarpeta /ivy-brow-and-skin/ de careonemx.github.io
 *   2. Marca todas las páginas noindex y deja un robots.txt que bloquea el rastreo:
 *      los precios y el horario son provisionales y no deben llegar a Google.
 *   3. Quita sitemap y llms.txt, y pone una franja que avisa que es vista previa.
 */
import { cpSync, readdirSync, statSync, readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const BASE = process.env.PREVIEW_BASE ?? '/ivy-brow-and-skin';
const SRC = 'dist';
const OUT = 'preview';

if (!existsSync(SRC)) {
  console.error('No existe dist/. Ejecuta primero: npm run build');
  process.exit(1);
}
rmSync(OUT, { recursive: true, force: true });
cpSync(SRC, OUT, { recursive: true });

const archivos = [];
(function walk(d) {
  for (const e of readdirSync(d)) {
    const p = join(d, e);
    statSync(p).isDirectory() ? walk(p) : archivos.push(p);
  }
})(OUT);

const conBase = (s) =>
  BASE
    ? s
        .replace(/(href|src|content)="\/(?!\/)([^"]*)"/g, (m, a, r) => `${a}="${BASE}/${r}"`)
        .replace(/url\(\/(?!\/)/g, `url(${BASE}/`)
    : s;

let paginas = 0;
for (const f of archivos) {
  if (f.endsWith('.css')) {
    writeFileSync(f, conBase(readFileSync(f, 'utf8')));
    continue;
  }
  if (!f.endsWith('.html')) continue;
  paginas++;
  let h = conBase(readFileSync(f, 'utf8'));
  h = h.replace(/<link rel="sitemap"[^>]*>/, '');
  h = h.replace(/<meta name="robots" content="[^"]*"\s*\/?>/, '<meta name="robots" content="noindex, nofollow">');
  h = h.replace(
    /<body([^>]*)>/,
    `<body$1><div style="background:#4e1a26;color:#f8f1ee;font:500 13px/1.4 Jost,system-ui,sans-serif;text-align:center;padding:8px 16px">Vista previa. Precios, duraciones y horario son provisionales.</div>`
  );
  writeFileSync(f, h);
}

writeFileSync(join(OUT, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
for (const f of ['sitemap-index.xml', 'sitemap-0.xml', 'llms.txt', '.htaccess']) rmSync(join(OUT, f), { force: true });
writeFileSync(join(OUT, '.nojekyll'), '');

console.log(`preview/ listo: ${paginas} páginas, base "${BASE || '/'}", noindex y robots bloqueado.`);
