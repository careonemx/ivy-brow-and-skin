const { chromium } = require('playwright');
(async () => {

const B = process.env.BASE_URL || 'http://127.0.0.1:4399';
const RUTAS = ['/', '/servicios', '/servicios/microblading', '/servicios/microshading', '/servicios/cejas-combinadas', '/servicios/laminado-de-cejas', '/servicios/lifting-de-pestanas', '/servicios/delineado-permanente', '/servicios/micropigmentacion-de-labios', '/servicios/limpieza-facial-profunda', '/servicios/dermaplaning', '/cuidados', '/preguntas-frecuentes', '/sobre-iveet', '/contacto', '/aviso-de-privacidad', '/404'];
const ANCHOS = [
  { w: 320, h: 700, n: 'móvil 320' },
  { w: 390, h: 844, n: 'móvil 390' },
  { w: 430, h: 932, n: 'móvil 430' },
  { w: 768, h: 1024, n: 'tablet 768' },
  { w: 1024, h: 768, n: 'tablet 1024' },
  { w: 1440, h: 900, n: 'escritorio' },
];

const b = await chromium.launch();
const fallos = [];

for (const v of ANCHOS) {
  const ctx = await b.newContext({
    viewport: { width: v.w, height: v.h },
    isMobile: v.w < 768,
    hasTouch: v.w < 768,
    deviceScaleFactor: 1,
  });
  for (const ruta of RUTAS) {
    const p = await ctx.newPage();
    const errs = [];
    p.on('pageerror', (e) => errs.push(String(e).slice(0, 120)));
    await p.goto(B + ruta, { waitUntil: 'networkidle' });
    await p.waitForTimeout(700);
    await p.evaluate(() =>
      document
        .querySelectorAll('x-nada').forEach(() => {})
    );
    await p.waitForTimeout(250);

    const r = await p.evaluate((vw) => {
      const out = { overflow: null, desbordan: [], chicos: [], tapados: [], cortados: [] };

      // 1) scroll horizontal
      const de = document.documentElement;
      if (de.scrollWidth > vw + 1) out.overflow = de.scrollWidth;

      // 2) elementos que se salen del viewport
      document.querySelectorAll('body *').forEach((el) => {
        const cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden' || cs.position === 'fixed') return;
        if (parseFloat(cs.opacity) === 0) return;
        // fuera de pantalla a propósito: enlace de salto y láminas del índice
        if (el.closest('.skip-link, .ind__laminas, [aria-hidden="true"]')) return;
        if (el.classList.contains('skip-link')) return;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        if (r.left < -1000) return;
        if (r.right > vw + 2 || r.left < -2) {
          const id = el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(' ')[0] : '');
          if (out.desbordan.length < 6 && !out.desbordan.includes(id)) out.desbordan.push(id);
        }
      });

      // 3) áreas táctiles chicas (solo móvil)
      if (vw < 768) {
        document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
          const cs = getComputedStyle(el);
          if (cs.display === 'none' || cs.visibility === 'hidden') return;
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return;
          // ignoramos enlaces dentro de párrafos de texto corrido
          if (el.closest('p, li, dd, .migas, td, th')) return;
          if (r.height < 40) {
            const t = (el.textContent || '').trim().slice(0, 26);
            const e = `${Math.round(r.height)}px «${t}»`;
            if (out.chicos.length < 6 && !out.chicos.includes(e)) out.chicos.push(e);
          }
        });
      }

      // 4) texto cortado por overflow hidden
      document.querySelectorAll('h1, h2, h3, .btn').forEach((el) => {
        if (el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflow !== 'visible') {
          const t = (el.textContent || '').trim().slice(0, 26);
          if (out.cortados.length < 4) out.cortados.push(`«${t}»`);
        }
      });

      return out;
    }, v.w);

    const prob = [];
    if (r.overflow) prob.push(`scroll horizontal ${r.overflow}px`);
    if (r.desbordan.length) prob.push(`se salen: ${r.desbordan.join(', ')}`);
    if (r.chicos.length) prob.push(`táctil <40px: ${r.chicos.join(' | ')}`);
    if (r.cortados.length) prob.push(`texto cortado: ${r.cortados.join(' ')}`);
    if (errs.length) prob.push(`JS: ${errs.join(' ')}`);
    if (prob.length) fallos.push({ v: v.n, ruta, prob });
    await p.close();
  }
  await ctx.close();
  console.log(`· ${v.n} revisado`);
}
await b.close();

console.log('\n═══ RESULTADO ═══');
if (!fallos.length) {
  console.log(`Sin incidencias en ${RUTAS.length} páginas × ${ANCHOS.length} anchos.`);
} else {
  fallos.forEach((f) => {
    console.log(`\n✗ ${f.v}  ${f.ruta}`);
    f.prob.forEach((p) => console.log(`   ${p}`));
  });
  console.log(`\n${fallos.length} combinaciones con incidencias de ${RUTAS.length * ANCHOS.length}.`);
}
})();
