/**
 * Revisión de dist/ antes de publicar.
 *
 *   npm run revisar        → revisa y avisa
 *   npm run publicar       → build + revisión; FALLA si queda algo provisional
 *
 * Comprueba por página: título único y ≤ 65 caracteres, descripción única y
 * ≤ 160, un solo H1, canonical, og:image y JSON-LD válido. Y en el sitio:
 * enlaces internos existentes, robots.txt, sitemap, llms.txt, 404 y .htaccess.
 */
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const PROD = process.argv.includes('--produccion');
const DIST = 'dist';
const fallos = [];
const avisos = [];

if (!existsSync(DIST)) {
  console.error('No existe dist/. Ejecuta primero: npm run build');
  process.exit(1);
}

const archivos = [];
(function walk(d) {
  for (const e of readdirSync(d)) {
    const p = join(d, e);
    statSync(p).isDirectory() ? walk(p) : archivos.push(p);
  }
})(DIST);
const rel = (f) => '/' + relative(DIST, f).split('\\').join('/');
const existentes = new Set(archivos.map(rel));
const htmls = archivos.filter((f) => f.endsWith('.html'));

const existe = (ruta) => {
  const r = ruta.split('#')[0].split('?')[0];
  if (r === '/' || r === '') return existentes.has('/index.html');
  return existentes.has(r) || existentes.has(r + '.html') || existentes.has(r.replace(/\/$/, '') + '.html');
};

// ---------- datos provisionales -------------------------------------
const prov = readFileSync(join(DIST, 'index.html'), 'utf8').match(/name="ivy-provisional" content="([^"]*)"/);
if (prov) {
  const lista = prov[1].replaceAll('&quot;', '"').split(' | ');
  const msg = `Datos PROVISIONALES (inventados) en el sitio:\n     - ${lista.join('\n     - ')}\n     Confírmalos con Iveet y vacía la lista \`provisional\` en src/data/business.ts`;
  (PROD ? fallos : avisos).push(msg);
}

// ---------- SEO por página ------------------------------------------
const titulos = new Map();
const descs = new Map();
for (const f of htmls) {
  const r = rel(f);
  const h = readFileSync(f, 'utf8');
  const t = (h.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const d = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const h1 = (h.match(/<h1[\s>]/g) || []).length;
  const noindex = /name="robots" content="noindex/.test(h);
  if (!t) fallos.push(`${r}: sin <title>`);
  if (t.length > 65) avisos.push(`${r}: título de ${t.length} caracteres (Google corta ~60): «${t}»`);
  if (!d) fallos.push(`${r}: sin meta description`);
  if (d.length > 160) avisos.push(`${r}: descripción de ${d.length} caracteres`);
  if (h1 !== 1) fallos.push(`${r}: ${h1} etiquetas H1 (debe ser 1)`);
  if (!/rel="canonical"/.test(h)) fallos.push(`${r}: sin canonical`);
  if (!/property="og:image"/.test(h)) fallos.push(`${r}: sin og:image`);
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
    } catch {
      fallos.push(`${r}: JSON-LD inválido`);
    }
  }
  if (!noindex) {
    if (titulos.has(t)) fallos.push(`Título repetido en ${r} y ${titulos.get(t)}`);
    if (descs.has(d)) fallos.push(`Descripción repetida en ${r} y ${descs.get(d)}`);
    titulos.set(t, r);
    descs.set(d, r);
  }
  // enlaces internos
  for (const m of h.matchAll(/(?:href|src)="(\/[^"/][^"]*|\/)"/g)) {
    if (!existe(m[1])) fallos.push(`${r}: enlace roto ${m[1]}`);
  }
  if (/\[PENDIENTE\]|lorem ipsum/i.test(h)) fallos.push(`${r}: marcador de pendiente visible`);
}

// ---------- archivos del sitio --------------------------------------
for (const a of ['robots.txt', 'llms.txt', 'sitemap-index.xml', '404.html', '.htaccess', 'og.jpg', 'favicon.svg']) {
  if (!existsSync(join(DIST, a))) fallos.push(`Falta ${a}`);
}
const robots = existsSync(join(DIST, 'robots.txt')) ? readFileSync(join(DIST, 'robots.txt'), 'utf8') : '';
if (/^\s*Disallow:\s*\/\s*$/m.test(robots)) fallos.push('robots.txt bloquea todo el sitio');
if (!/^Sitemap:/m.test(robots)) fallos.push('robots.txt no declara el sitemap');

const urls = archivos
  .filter((f) => /sitemap-\d+\.xml$/.test(f))
  .flatMap((f) => [...readFileSync(f, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname));
for (const u of urls) if (!existe(u)) fallos.push(`El sitemap lista ${u}, que no existe`);

// ---------- resultado -----------------------------------------------
console.log(`\nRevisadas ${htmls.length} páginas, ${urls.length} URLs en el sitemap.\n`);
if (avisos.length) {
  console.log('AVISOS');
  avisos.forEach((a) => console.log('  · ' + a));
  console.log('');
}
if (fallos.length) {
  console.log('FALLOS');
  fallos.forEach((f) => console.log('  ✗ ' + f));
  console.log(PROD ? '\nNo se puede publicar todavía.\n' : '');
  process.exit(1);
}
console.log(PROD ? '✓ Listo para publicar: sube el contenido de dist/.\n' : '✓ Sin fallos.\n');
