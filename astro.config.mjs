import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Dominio de producción — PROVISIONAL. Debe coincidir con SITE_URL en src/data/business.ts
export const SITE_URL = 'https://ivybrowandskin.com';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      filter: (p) => !p.includes('/aviso-de-privacidad') && !p.includes('/404'),
      changefreq: 'monthly',
      // Fecha del último cambio real de contenido. Actualizar a mano al publicar.
      lastmod: new Date('2026-11-11'),
    }),
  ],
});
