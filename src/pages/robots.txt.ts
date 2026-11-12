/**
 * robots.txt generado en el build. Todo abierto: buscadores tradicionales y
 * rastreadores de IA, listados por nombre para que quede explícito y auditable.
 */
import type { APIRoute } from 'astro';
import { SITE_URL } from '../data/business';

const RASTREADORES = [
  ['Googlebot', 'Google'],
  ['Bingbot', 'Bing (también alimenta a Copilot y ChatGPT)'],
  ['DuckDuckBot', 'DuckDuckGo'],
  ['Applebot', 'Apple / Siri'],
  ['Google-Extended', 'Gemini y respuestas generativas de Google'],
  ['Applebot-Extended', 'Apple Intelligence'],
  ['OAI-SearchBot', 'búsqueda de ChatGPT'],
  ['ChatGPT-User', 'ChatGPT cuando alguien abre el enlace'],
  ['GPTBot', 'OpenAI'],
  ['ClaudeBot', 'Anthropic'],
  ['Claude-User', 'Claude cuando alguien abre el enlace'],
  ['Claude-SearchBot', 'búsqueda de Claude'],
  ['PerplexityBot', 'Perplexity'],
  ['Perplexity-User', 'Perplexity cuando alguien abre el enlace'],
  ['Meta-ExternalAgent', 'Meta AI'],
  ['Amazonbot', 'Alexa'],
  ['MistralAI-User', 'Le Chat de Mistral'],
  ['CCBot', 'Common Crawl'],
] as const;

const cuerpo = `# ${SITE_URL}
# Sitio abierto a buscadores y a asistentes de IA.

User-agent: *
Allow: /

${RASTREADORES.map(([bot, quien]) => `# ${quien}\nUser-agent: ${bot}\nAllow: /`).join('\n\n')}

# Resumen del negocio en texto plano para modelos de lenguaje:
# ${SITE_URL}/llms.txt

Sitemap: ${SITE_URL}/sitemap-index.xml
`;

export const GET: APIRoute = () =>
  new Response(cuerpo, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
