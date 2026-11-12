/**
 * Catálogo de servicios. Cada servicio genera su propia página en /servicios/<slug>.
 *
 * ⚠️ `precio`, `duracion` e `incluye` son PROVISIONALES (ver business.ts → provisional).
 * Los datos técnicos (cuánto dura el resultado, cicatrización, retoque) son los rangos
 * habituales de cada técnica, redactados sin promesas: dependen de la piel de cada persona.
 */

export type Categoria = 'Cejas' | 'Ojos' | 'Labios' | 'Piel';

export interface Servicio {
  slug: string;
  nombre: string;
  categoria: Categoria;
  /** Una frase: qué es, en palabras de clienta. */
  resumen: string;
  /** Precio desde, en pesos. PROVISIONAL. */
  precio: number;
  /** Duración de la cita. PROVISIONAL. */
  duracion: string;
  /** Cuánto dura el resultado. */
  dura: string;
  incluye: string[];
  paraQuien: string[];
  /** Pasos de la cita, en orden. */
  pasos: string[];
  cicatrizacion?: { cuando: string; que: string }[];
  /** Cuándo NO conviene o hay que consultarlo antes. */
  antes: string[];
  faq: { p: string; r: string }[];
  seo: { titulo: string; descripcion: string; h1: string };
}

export const categorias: { nombre: Categoria; frase: string }[] = [
  { nombre: 'Cejas', frase: 'Forma, densidad y color que se ven tuyos.' },
  { nombre: 'Ojos', frase: 'Mirada definida sin maquillaje diario.' },
  { nombre: 'Labios', frase: 'Color y contorno parejos, en un tono natural.' },
  { nombre: 'Piel', frase: 'Piel limpia y luminosa, sin procedimientos agresivos.' },
];

/** Contraindicaciones comunes a toda micropigmentación (cejas, ojos, labios). */
export const contraindicaciones = [
  'Embarazo o lactancia: se pospone el procedimiento.',
  'Tratamiento con isotretinoína (para el acné): hay que esperar a que tu dermatólogo indique que la piel ya se recuperó.',
  'Anticoagulantes, diabetes no controlada, quimioterapia o problemas de cicatrización (queloides): se necesita autorización de tu médico.',
  'Irritación, infección, granos o quemadura de sol en la zona: se espera a que la piel esté sana.',
  'Bótox o rellenos recientes en la zona: conviene dejar pasar al menos dos semanas.',
];

const cicatrizacionCejas = [
  { cuando: 'Días 1 a 3', que: 'El color se ve más oscuro e intenso de lo que quedará. Es normal.' },
  { cuando: 'Días 4 a 10', que: 'La piel se descama poco a poco. No se rasca ni se arrancan las costras.' },
  { cuando: 'Días 10 a 20', que: 'Puede parecer que el color "desapareció". Está debajo de la piel nueva y vuelve a aparecer.' },
  { cuando: 'Semanas 4 a 8', que: 'Cita de retoque: se corrigen huecos y se ajusta el tono ya cicatrizado.' },
];

export const servicios: Servicio[] = [
  {
    slug: 'microblading',
    nombre: 'Microblading',
    categoria: 'Cejas',
    resumen: 'Trazos finos hechos a mano que imitan el pelo natural de la ceja.',
    precio: 3500,
    duracion: '2 h 30 min',
    dura: 'De 12 a 18 meses, según tu tipo de piel',
    incluye: ['Diseño de la ceja medido sobre tu rostro', 'Procedimiento', 'Un retoque entre las semanas 4 y 8'],
    paraQuien: [
      'Cejas escasas, con huecos o que se depilaron de más.',
      'Piel normal o seca, con poro fino.',
      'Quien quiere un resultado muy natural, "como si fueran tus cejas".',
    ],
    pasos: [
      'Platicamos qué te gustaría cambiar y revisamos tu piel.',
      'Se mide y dibuja la forma sobre tu rostro. No se trabaja nada hasta que tú la apruebas en el espejo.',
      'Se elige el tono del pigmento según tu color de pelo y de piel.',
      'Se aplica anestésico en crema y se trazan los pelos uno por uno con una herramienta manual de microagujas estéril y desechable.',
      'Te llevas por escrito los cuidados de los primeros días.',
    ],
    cicatrizacion: cicatrizacionCejas,
    antes: [
      'Si tu piel es muy grasa o de poro abierto, los trazos tienden a difuminarse con el tiempo. En ese caso conviene más el microshading o las cejas combinadas.',
      'No te depiles ni tiñas las cejas la semana anterior: así se ve tu forma real.',
    ],
    faq: [
      {
        p: '¿El microblading se ve natural?',
        r: 'Sí, cuando el diseño respeta tu rostro y los trazos siguen la dirección de tu pelo. Por eso la forma se aprueba frente al espejo antes de empezar.',
      },
      {
        p: '¿Por qué hace falta un retoque?',
        r: 'Cada piel retiene el pigmento distinto. Al cicatrizar pueden quedar trazos más tenues; en el retoque se completan y se ajusta el tono.',
      },
      {
        p: '¿Qué diferencia hay con un tatuaje de cejas tradicional?',
        r: 'El tatuaje tradicional se hace con máquina, más profundo y en bloque sólido; con los años suele virar a gris o azul. El microblading es superficial, se hace pelo por pelo y se va aclarando de forma gradual.',
      },
    ],
    seo: {
      titulo: 'Microblading de cejas en CDMX | Ivy Brow & Skin',
      descripcion:
        'Microblading en Ciudad de México: diseño medido sobre tu rostro, trazos hechos a mano y retoque incluido. Cuánto dura, cuidados y precio.',
      h1: 'Microblading de cejas en CDMX',
    },
  },
  {
    slug: 'microshading',
    nombre: 'Microshading',
    categoria: 'Cejas',
    resumen: 'Sombreado de puntos muy finos que da un efecto de ceja maquillada con polvo.',
    precio: 3800,
    duracion: '2 h 30 min',
    dura: 'De 18 a 30 meses, según tu tipo de piel',
    incluye: ['Diseño de la ceja medido sobre tu rostro', 'Procedimiento', 'Un retoque entre las semanas 4 y 8'],
    paraQuien: [
      'Piel grasa, mixta o de poro abierto.',
      'Quien se maquilla las cejas a diario y quiere ese mismo efecto sin hacerlo.',
      'Cejas con poco pelo en las que el pelo por pelo no alcanza a dar densidad.',
    ],
    pasos: [
      'Revisamos tu piel y cómo te maquillas hoy las cejas.',
      'Se dibuja y aprueba la forma frente al espejo.',
      'Se elige el tono del pigmento.',
      'Con dermógrafo (equipo de micropigmentación) se depositan puntos diminutos, más suaves al inicio de la ceja y más definidos hacia la cola.',
      'Te llevas los cuidados por escrito.',
    ],
    cicatrizacion: cicatrizacionCejas,
    antes: ['No te depiles ni tiñas las cejas la semana anterior.'],
    faq: [
      {
        p: '¿Microblading o microshading?',
        r: 'Si tu piel es seca o normal y quieres un efecto de pelo, microblading. Si es grasa o quieres efecto de maquillaje, microshading. Si quieres las dos cosas, cejas combinadas.',
      },
      {
        p: '¿Se ve como un bloque pintado?',
        r: 'No debería. El sombreado se trabaja en degradado: tenue al inicio de la ceja y más intenso hacia la cola, que es como se ve una ceja maquillada a mano.',
      },
    ],
    seo: {
      titulo: 'Microshading de cejas en CDMX, efecto polvo | Ivy Brow & Skin',
      descripcion:
        'Microshading o powder brows en Ciudad de México: ideal para piel grasa. Cómo se hace, cuánto dura, cicatrización día por día y precio.',
      h1: 'Microshading de cejas en CDMX',
    },
  },
  {
    slug: 'cejas-combinadas',
    nombre: 'Cejas combinadas',
    categoria: 'Cejas',
    resumen: 'Pelo por pelo al inicio de la ceja y sombreado hacia la cola, en una sola sesión.',
    precio: 4200,
    duracion: '3 h',
    dura: 'De 18 a 24 meses, según tu tipo de piel',
    incluye: ['Diseño de la ceja medido sobre tu rostro', 'Procedimiento', 'Un retoque entre las semanas 4 y 8'],
    paraQuien: [
      'Quien quiere la naturalidad del pelo por pelo con la definición del sombreado.',
      'Cejas con huecos al inicio y poca densidad en la cola.',
    ],
    pasos: [
      'Revisamos tu piel y la forma que buscas.',
      'Se dibuja y aprueba la forma frente al espejo.',
      'Se trazan pelos a mano en el inicio de la ceja.',
      'Se sombrea con dermógrafo el cuerpo y la cola para dar densidad.',
      'Te llevas los cuidados por escrito.',
    ],
    cicatrizacion: cicatrizacionCejas,
    antes: ['No te depiles ni tiñas las cejas la semana anterior.'],
    faq: [
      {
        p: '¿Las cejas combinadas son para mí?',
        r: 'Suelen ser la mejor opción si tienes pocos pelos en general y quieres que de cerca se vea pelo y de lejos se vea una ceja llena.',
      },
    ],
    seo: {
      titulo: 'Cejas combinadas (híbridas) en CDMX | Ivy Brow & Skin',
      descripcion:
        'Cejas combinadas en Ciudad de México: pelo por pelo más sombreado en una sola sesión. Para quién son, cómo se hacen y cuánto duran.',
      h1: 'Cejas combinadas en CDMX',
    },
  },
  {
    slug: 'laminado-de-cejas',
    nombre: 'Laminado de cejas',
    categoria: 'Cejas',
    resumen: 'Peina y fija tus propios pelos hacia arriba para que la ceja se vea más llena. Sin pigmento en la piel.',
    precio: 650,
    duracion: '1 h',
    dura: 'De 6 a 8 semanas',
    incluye: ['Diseño y limpieza de la ceja', 'Laminado', 'Tinte del pelo si lo necesitas'],
    paraQuien: [
      'Cejas con pelo suficiente pero rebelde o que crece hacia abajo.',
      'Quien quiere probar un cambio sin nada semipermanente.',
    ],
    pasos: [
      'Se limpia la ceja y se revisa la dirección del pelo.',
      'Se aplica una solución que suaviza el pelo y se peina en la forma elegida.',
      'Se fija con una segunda solución y, si hace falta, se tiñe el pelo.',
      'Se nutre la ceja para cerrar el proceso.',
    ],
    antes: [
      'No se recomienda en embarazo ni si hay irritación en la zona.',
      'Las primeras 24 horas no se moja ni se maquilla la ceja.',
    ],
    faq: [
      {
        p: '¿El laminado sirve si tengo huecos?',
        r: 'Ayuda a disimularlos peinando el pelo que sí tienes, pero no crea pelo donde no hay. Para huecos marcados conviene microblading.',
      },
    ],
    seo: {
      titulo: 'Laminado de cejas en CDMX | Ivy Brow & Skin',
      descripcion:
        'Laminado de cejas en Ciudad de México: cejas peinadas y más llenas por 6 a 8 semanas, sin pigmento. Cómo se hace, cuidados y precio.',
      h1: 'Laminado de cejas en CDMX',
    },
  },
  {
    slug: 'lifting-de-pestanas',
    nombre: 'Lifting de pestañas',
    categoria: 'Ojos',
    resumen: 'Eleva y curva tus pestañas naturales desde la raíz. Sin extensiones.',
    precio: 600,
    duracion: '1 h',
    dura: 'De 6 a 8 semanas',
    incluye: ['Lifting', 'Tinte de pestañas', 'Nutrición final'],
    paraQuien: [
      'Pestañas rectas o que apuntan hacia abajo.',
      'Quien usa rizador todos los días.',
      'Quien no quiere el mantenimiento de las extensiones.',
    ],
    pasos: [
      'Se limpian las pestañas y se protege la piel del párpado.',
      'Se colocan moldes de silicón según el largo de tus pestañas.',
      'Se aplica la solución que les da la curva y después la que la fija.',
      'Se tiñen para que se vean más oscuras y se nutren.',
    ],
    antes: [
      'No se recomienda con infección o irritación en los ojos, ni en embarazo.',
      'Las primeras 24 horas no se mojan ni se usa rímel.',
    ],
    faq: [
      {
        p: '¿El lifting daña las pestañas?',
        r: 'Bien hecho y con su tiempo entre sesiones, no. Lo que las maltrata es repetirlo muy seguido o usar moldes del tamaño equivocado.',
      },
    ],
    seo: {
      titulo: 'Lifting de pestañas en CDMX | Ivy Brow & Skin',
      descripcion:
        'Lifting de pestañas con tinte en Ciudad de México: tus pestañas naturales curvadas por 6 a 8 semanas, sin extensiones. Cuidados y precio.',
      h1: 'Lifting de pestañas en CDMX',
    },
  },
  {
    slug: 'delineado-permanente',
    nombre: 'Delineado permanente',
    categoria: 'Ojos',
    resumen: 'Línea de pigmento pegada a las pestañas que define la mirada sin maquillaje.',
    precio: 3000,
    duracion: '2 h',
    dura: 'De 2 a 3 años, según tu tipo de piel',
    incluye: ['Diseño de la línea', 'Procedimiento', 'Un retoque entre las semanas 4 y 8'],
    paraQuien: [
      'Quien se delinea a diario o no logra una línea pareja.',
      'Pestañas claras que se pierden sin maquillaje.',
      'Quien no puede maquillarse por alergia al delineador.',
    ],
    pasos: [
      'Elegimos el grosor: desde una línea entre las pestañas, casi invisible, hasta un delineado más marcado.',
      'Se aplica anestésico en crema en el párpado.',
      'Se pigmenta con dermógrafo en la base de las pestañas.',
      'Te llevas los cuidados por escrito.',
    ],
    cicatrizacion: [
      { cuando: 'Días 1 y 2', que: 'Puede haber inflamación ligera en el párpado.' },
      { cuando: 'Días 3 a 7', que: 'La línea se descama. No se talla ni se maquilla la zona.' },
      { cuando: 'Semanas 4 a 8', que: 'Retoque para emparejar la línea.' },
    ],
    antes: [
      'Si usas lentes de contacto, llega con lentes de armazón: no podrás usarlos unos días.',
      'Si usas extensiones o tuviste cirugía de párpado reciente, avísanos antes de agendar.',
    ],
    faq: [
      {
        p: '¿Se puede hacer si uso extensiones de pestañas?',
        r: 'Hay que retirarlas antes del procedimiento y esperar a que la línea cicatrice para volver a ponerlas.',
      },
    ],
    seo: {
      titulo: 'Delineado permanente de ojos en CDMX | Ivy Brow & Skin',
      descripcion:
        'Delineado permanente en Ciudad de México: desde una línea casi invisible entre las pestañas hasta un delineado definido. Cuidados y precio.',
      h1: 'Delineado permanente de ojos en CDMX',
    },
  },
  {
    slug: 'micropigmentacion-de-labios',
    nombre: 'Micropigmentación de labios',
    categoria: 'Labios',
    resumen: 'Color suave en todo el labio que empareja el tono y define el contorno.',
    precio: 4000,
    duracion: '2 h 30 min',
    dura: 'De 2 a 3 años, según tu tipo de piel',
    incluye: ['Elección del tono', 'Procedimiento', 'Un retoque entre las semanas 4 y 8'],
    paraQuien: [
      'Labios pálidos, con tono disparejo o contorno poco definido.',
      'Quien quiere verse con un color natural sin labial.',
    ],
    pasos: [
      'Elegimos el tono: desde un rosado parecido a tu labio hasta un color más vivo.',
      'Se dibuja el contorno y se aprueba frente al espejo.',
      'Se aplica anestésico en crema.',
      'Se pigmenta en capas con dermógrafo, del contorno hacia el centro.',
      'Te llevas los cuidados por escrito.',
    ],
    cicatrizacion: [
      { cuando: 'Días 1 a 3', que: 'El labio se inflama un poco y el color se ve muy intenso.' },
      { cuando: 'Días 4 a 7', que: 'Se descama. El color baja y puede verse disparejo por unos días.' },
      { cuando: 'Semanas 4 a 6', que: 'El tono real aparece; en el retoque se empareja.' },
    ],
    antes: [
      'Si alguna vez te ha dado herpes labial, consúltalo con tu médico antes de la cita: el procedimiento puede activarlo.',
      'Hidrata tus labios la semana anterior para que la piel esté en buen estado.',
    ],
    faq: [
      {
        p: '¿Los labios quedan del color del primer día?',
        r: 'No. Los primeros días el color se ve mucho más intenso; al cicatrizar baja bastante y queda un tono más natural.',
      },
    ],
    seo: {
      titulo: 'Micropigmentación de labios en CDMX | Ivy Brow & Skin',
      descripcion:
        'Micropigmentación de labios en Ciudad de México: color natural y contorno definido. Cómo se hace, cicatrización, cuidados y precio.',
      h1: 'Micropigmentación de labios en CDMX',
    },
  },
  {
    slug: 'limpieza-facial-profunda',
    nombre: 'Limpieza facial profunda',
    categoria: 'Piel',
    resumen: 'Limpieza, exfoliación, extracción de puntos negros e hidratación según tu tipo de piel.',
    precio: 850,
    duracion: '1 h 15 min',
    dura: 'Se recomienda cada 4 a 6 semanas',
    incluye: ['Valoración de tu piel', 'Limpieza completa', 'Recomendación de rutina en casa'],
    paraQuien: [
      'Puntos negros, poros saturados o piel opaca.',
      'Quien quiere preparar la piel antes de un evento.',
    ],
    pasos: [
      'Desmaquillado y limpieza.',
      'Exfoliación según tu tipo de piel.',
      'Vapor y extracción de puntos negros.',
      'Mascarilla e hidratación.',
      'Protector solar y recomendaciones para casa.',
    ],
    antes: [
      'Con acné inflamado o en tratamiento dermatológico activo, avísanos: puede convenir otro protocolo.',
      'Evita exfoliantes fuertes o retinol los tres días anteriores.',
    ],
    faq: [
      {
        p: '¿Queda la cara roja después?',
        r: 'Puede quedar un poco enrojecida por la extracción; suele bajar en unas horas. Por eso no se recomienda justo antes de un evento el mismo día.',
      },
    ],
    seo: {
      titulo: 'Limpieza facial profunda en CDMX | Ivy Brow & Skin',
      descripcion:
        'Limpieza facial profunda en Ciudad de México: extracción de puntos negros, exfoliación e hidratación según tu piel. Qué incluye y precio.',
      h1: 'Limpieza facial profunda en CDMX',
    },
  },
  {
    slug: 'dermaplaning',
    nombre: 'Dermaplaning',
    categoria: 'Piel',
    resumen: 'Exfoliación con bisturí que retira piel muerta y vello fino. La piel queda lisa y el maquillaje se asienta mejor.',
    precio: 700,
    duracion: '45 min',
    dura: 'Se recomienda cada 4 semanas',
    incluye: ['Limpieza', 'Dermaplaning', 'Hidratación y protector solar'],
    paraQuien: [
      'Piel opaca o con textura irregular.',
      'Vello facial fino que se nota con el maquillaje.',
    ],
    pasos: [
      'Limpieza y secado de la piel.',
      'Se desliza un bisturí estéril en ángulo sobre la piel tensada, en zonas pequeñas.',
      'Hidratación y protector solar.',
    ],
    antes: [
      'No se hace sobre acné inflamado, herpes activo ni heridas.',
      'Evita el sol directo y usa protector solar la semana siguiente.',
    ],
    faq: [
      {
        p: '¿El vello vuelve a salir más grueso?',
        r: 'No. El vello fino del rostro vuelve a crecer igual de fino; cortar el pelo no cambia su grosor.',
      },
    ],
    seo: {
      titulo: 'Dermaplaning en CDMX | Ivy Brow & Skin',
      descripcion:
        'Dermaplaning en Ciudad de México: exfoliación que retira piel muerta y vello fino para una piel lisa. Para quién es, cuidados y precio.',
      h1: 'Dermaplaning en CDMX',
    },
  },
];

export const precioTexto = (n: number) => `Desde $${n.toLocaleString('es-MX')}`;

export const porCategoria = (c: Categoria) => servicios.filter((s) => s.categoria === c);
