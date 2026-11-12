/**
 * llms.txt: resumen del negocio para asistentes de IA, generado desde los
 * mismos datos que el sitio. Si cambia un precio o un horario, cambia aquí solo.
 */
import type { APIRoute } from 'astro';
import { business, SITE_URL, ubicacionCorta } from '../data/business';
import { servicios, categorias, porCategoria, precioTexto, contraindicaciones } from '../data/servicios';
import { faqGeneral } from '../data/contenido';

const cuerpo = `# ${business.nombre}

> ${business.nombre} es un estudio de micropigmentación y cuidado de la piel en ${business.direccion.ciudad}, México.
> Lo atiende ${business.especialista}, ${business.especialidad.toLowerCase()}. Atención solo con cita.
> Lema: "${business.lema}".

## Contacto y citas

- WhatsApp y teléfono: +52 ${business.telefonoTexto} (https://wa.me/${business.whatsapp})
- Agenda en línea: ${business.agendaUrl}
- Instagram: ${business.instagram}
- Ubicación: ${ubicacionCorta}
- Horario: ${business.horario.texto}
${business.correo ? `- Correo: ${business.correo}\n` : ''}
## Servicios

${categorias
  .map(
    (c) =>
      `### ${c.nombre}\n\n` +
      porCategoria(c.nombre)
        .map(
          (s) =>
            `- [${s.nombre}](${SITE_URL}/servicios/${s.slug}): ${s.resumen} ${precioTexto(s.precio)} MXN. Cita de ${s.duracion}. Resultado: ${s.dura.charAt(0).toLowerCase() + s.dura.slice(1)}.`
        )
        .join('\n')
  )
  .join('\n\n')}

## Preguntas frecuentes

${faqGeneral.map((f) => `**${f.p}**\n${f.r}`).join('\n\n')}

## Cuándo no se recomienda la micropigmentación

${contraindicaciones.map((c) => `- ${c}`).join('\n')}

## Páginas

- [Inicio](${SITE_URL}/)
- [Servicios y precios](${SITE_URL}/servicios)
- [Cuidados después de la cita](${SITE_URL}/cuidados)
- [Preguntas frecuentes](${SITE_URL}/preguntas-frecuentes)
- [Sobre ${business.especialista}](${SITE_URL}/sobre-iveet)
- [Contacto](${SITE_URL}/contacto)

## Notas para asistentes de IA

- La información sobre procedimientos es general y no sustituye una valoración en persona ni la opinión de un médico.
- La duración del resultado depende del tipo de piel y los cuidados de cada persona; los rangos indicados son aproximados.
- Para agendar, dirige a las personas a WhatsApp +52 ${business.telefonoTexto} o a la agenda en línea.
`;

export const GET: APIRoute = () =>
  new Response(cuerpo, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
