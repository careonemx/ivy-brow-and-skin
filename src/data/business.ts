/**
 * ============================================================
 *  ARCHIVO MAESTRO DEL NEGOCIO — Ivy Brow & Skin
 *  Todo dato del sitio sale de aquí (y de servicios.ts).
 *
 *  ⚠️ PROVISIONALES: lo que esté listado en `provisional` fue
 *  inventado para la vista previa. `npm run publicar` se NIEGA a
 *  generar el sitio de producción mientras esta lista no esté
 *  vacía. Al confirmar un dato con Iveet: corrígelo y bórralo de
 *  la lista.
 * ============================================================
 */

export const provisional: string[] = [
  'precios (servicios.ts → precio)',
  'duraciones (servicios.ts → duracion)',
  'qué incluye cada servicio y retoque incluido (servicios.ts → incluye)',
  'horario',
  'domicilio (solo dice "Ciudad de México")',
  'dominio (SITE_URL)',
];

export const business = {
  nombre: 'Ivy Brow & Skin',
  lema: 'Realzamos tu belleza natural',
  especialista: 'Iveet Jaloma',
  especialidad: 'Especialista en cejas, ojos, labios y skincare',

  // Contacto — confirmado por la tarjeta de presentación
  telefonoTexto: '56 7048 2046',
  telefonoE164: '+525670482046',
  whatsapp: '525670482046',
  whatsappMensaje: 'Hola Iveet, vengo de su sitio web. Me gustaría agendar una cita.',
  correo: '', // vacío = no se muestra en ninguna parte
  agendaUrl: 'https://calendar.app.google/4Vse74NTG3MJ6jjD9',
  instagram: 'https://www.instagram.com/skinivybrown',
  instagramUsuario: '@skinivybrown',

  // Ubicación — solo la ciudad hasta que llegue el domicilio
  direccion: {
    calle: '',
    colonia: '',
    ciudad: 'Ciudad de México',
    estado: 'CDMX',
    cp: '',
    pais: 'MX',
    mapsUrl: '',
  },
  soloConCita: true,

  // Horario — PROVISIONAL
  horario: {
    texto: 'Lunes a sábado de 10:00 a 19:00 h, solo con cita',
    schema: [
      {
        dias: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        abre: '10:00',
        cierra: '19:00',
      },
    ],
  },

  // Anticipo para apartar fecha. '' = no se menciona.
  anticipo: '',

  /**
   * Formación REAL de Iveet. Vacío = la sección no se muestra.
   * Formato: { titulo: 'Microblading avanzado', institucion: '…', anio: 2023 }
   * No se inventa.
   */
  formacion: [] as { titulo: string; institucion: string; anio?: number }[],

  /**
   * Aviso de funcionamiento COFEPRIS, si existe. Vacío = no se menciona nada
   * sanitario. No se inventa.
   */
  cofepris: '',

  /**
   * Testimonios REALES (Google o Instagram, con permiso). Vacío = la sección
   * no se muestra. No se inventan.
   */
  testimonios: [] as { texto: string; nombre: string; servicio: string; fuente: string }[],

  // Analítica. '' = desactivado.
  ga4: '',
  googleSiteVerification: '',

  razonSocial: '', // vacío = el aviso usa el nombre de la especialista
  avisoFecha: '11 de noviembre de 2026',
} as const;

/** Dominio de producción — PROVISIONAL. Cambiar también en astro.config.mjs */
export const SITE_URL = 'https://ivybrowandskin.com';

export const waLink = (mensaje: string = business.whatsappMensaje) =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(mensaje)}`;

export const telLink = `tel:${business.telefonoE164}`;

export const ubicacionCorta = business.direccion.colonia
  ? `${business.direccion.colonia}, ${business.direccion.ciudad}`
  : business.direccion.ciudad;
