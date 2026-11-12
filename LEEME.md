# Ivy Brow & Skin — sitio web

Astro + TypeScript, estático, sin backend. 17 páginas.

## Comandos

| Comando | Para qué |
|---|---|
| `npm install` | una sola vez, la primera vez |
| `npm run dev` | ver el sitio en http://localhost:4321 mientras se edita |
| `npm run build` | generar el sitio en `dist/` |
| `npm run revisar` | revisar SEO, enlaces y archivos de `dist/` |
| `npm run vista-previa` | build + `preview/` para GitHub Pages (bloqueado a Google) |
| `npm run publicar` | build + revisión estricta. **Se niega a terminar mientras haya datos provisionales** |

## Dónde se cambia cada cosa

- `src/data/business.ts` → teléfono, agenda, Instagram, horario, domicilio, formación, COFEPRIS,
  testimonios, GA4, dominio. **Lista `provisional`:** lo inventado para la vista previa.
- `src/data/servicios.ts` → los 9 servicios: precio, duración, qué incluye, pasos, preguntas, SEO.
  Cada servicio genera su página en `/servicios/<slug>`.
- `src/data/contenido.ts` → preguntas frecuentes generales y cuidados.
- `astro.config.mjs` → dominio (debe coincidir con `SITE_URL` de business.ts) y `lastmod` del sitemap.

## Secciones que aparecen solas al llenar el dato

- **Testimonios** (portada): `business.testimonios`. Solo reales, con permiso.
- **Formación** (Sobre Iveet): `business.formacion`. Solo cursos reales.
- **Correo**: `business.correo`.
- **Domicilio**: `business.direccion.calle`, `colonia`, `cp`.

## Indexación

- `robots.txt` y `llms.txt` se generan en el build desde los mismos datos (`src/pages/*.txt.ts`).
- JSON-LD: BeautySalon en todas las páginas, Service + FAQPage en cada servicio, FAQPage,
  HowTo (cuidados), BreadcrumbList.
- Hostinger: `public/.htaccess` sirve URLs limpias (`/servicios/microblading`) y el 404 propio.
- Nada de esto indexa por sí solo: al publicar, dar de alta el dominio en Search Console y
  enviar `sitemap-index.xml`.

## Formulario de contacto

No envía nada a un servidor: arma el mensaje y abre WhatsApp. No necesita configuración.

## Vista previa para el cliente (GitHub Pages)

`npm run vista-previa` genera `preview/` con rutas para `careonemx.github.io/ivy-brow-and-skin`,
todas las páginas en `noindex`, `robots.txt` que bloquea el rastreo y una franja que avisa que los
precios son provisionales. En GitHub lo hace solo `.github/workflows/vista-previa.yml` en cada push a
`main` (requisito: Settings → Pages → Source: "GitHub Actions").
Al publicar en el dominio real: desactivar Pages o borrar el repo público, para no tener dos copias.
