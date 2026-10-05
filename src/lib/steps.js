import {
  Search as SearchIcon,
  FileText as FileTextIcon,
  WandSparkles as WandSparklesIcon,
  CalendarDays as CalendarDaysIcon,
  Video as VideoIcon,
  Send as SendIcon,
  Bot as BotIcon,
} from "lucide-react";

export const STEPS = [
  {
    num: 1,
    slug: `paso-1`,
    name: `Análisis y Hacking`,
    icon: `Search`,
    objective: `Encontrar qué contenido ya funciona, tanto el tuyo como el de tu nicho, para no empezar nunca desde cero.`,
    time: `45 min`,
    whatYouGet: [
      `Tu top 5 de contenidos propios listos para modelar.`,
      `Una lista de 25-30 referencias virales de tu nicho.`,
      `Tus palabras clave de búsqueda definidas.`,
    ],
    steps: [
      `Conecta Windsor.ai a Claude y analiza tus mejores contenidos (pestaña A).`,
      `Define tus palabras clave de búsqueda (se cargan de Mi Marca y puedes añadir más).`,
      `Busca cada palabra clave en Instagram y en TikTok.`,
      `Quédate solo con los contenidos que cumplan el criterio viral: +10.000 visualizaciones, +500 comentarios y +100 guardados.`,
      `Guarda cada enlace que te guste hasta reunir 25-30 referencias (pestaña B).`,
    ],
    externalTools: [
      {
        label: `Windsor.ai`,
        url: `https://windsor.ai`,
      },
      {
        label: `Claude`,
        url: `https://claude.ai`,
      },
      {
        label: `Instagram`,
        url: `https://www.instagram.com`,
      },
      {
        label: `TikTok`,
        url: `https://www.tiktok.com`,
      },
    ],
    checklist: [
      `Windsor.ai conectado a Claude`,
      `Análisis de mis contenidos hecho`,
      `Top 5 propios añadidos al plan`,
      `Palabras clave definidas`,
      `25 referencias virales guardadas`,
    ],
  },
  {
    num: 2,
    slug: `paso-2`,
    name: `Transcripción`,
    icon: `FileText`,
    objective: `Tener el texto literal de cada referencia para poder modelarlo.`,
    time: `30 min`,
    whatYouGet: [
      `Todas tus referencias con su transcripción lista.`,
      `Textos de carruseles extraídos automáticamente con IA.`,
    ],
    steps: [
      `Vídeos: usa un actor gratuito de Apify para transcribir reels de Instagram o vídeos de TikTok.`,
      `Pega el enlace del vídeo, ejecuta el actor y copia la transcripción aquí.`,
      `Carruseles: haz capturas de las diapositivas y súbelas aquí; la IA extrae el texto de cada una.`,
    ],
    externalTools: [
      {
        label: `Apify`,
        url: `https://apify.com`,
      },
    ],
    checklist: [
      `Cuenta en Apify creada`,
      `Vídeos transcritos`,
      `Carruseles transcritos`,
      `Todas las referencias en estado transcrita`,
    ],
  },
  {
    num: 3,
    slug: `paso-3`,
    name: `Modelaje y formato`,
    icon: `Wand2`,
    objective: `Convertir cada referencia en un guion con tu forma de hablar y elegir su formato.`,
    time: `45 min`,
    whatYouGet: [
      `3 hooks y un guion modelado a tu voz para cada referencia.`,
      `Formato y CTA sugeridos para cada pieza.`,
      `Unas 30 piezas con guion listo para crear.`,
    ],
    steps: [
      `Elige una referencia transcrita en la columna izquierda.`,
      `Elige formato, objetivo y pilar en la columna derecha.`,
      `Pulsa 'Modelar con mi voz' y revisa el resultado.`,
      `Edita, pide variantes ('Otra versión', 'Más corto'...) y guarda en tu plan.`,
    ],
    externalTools: [
      {
        label: `Claude`,
        url: `https://claude.ai`,
      },
      {
        label: `ChatGPT`,
        url: `https://chatgpt.com`,
      },
    ],
    checklist: [
      `Referencias modeladas`,
      `Formato elegido para cada pieza`,
      `Mezcla de formatos equilibrada`,
      `Unas 30 piezas con guion listo`,
    ],
  },
  {
    num: 4,
    slug: `paso-4`,
    name: `Calendarios del mes`,
    icon: `CalendarDays`,
    objective: `Tener el mes entero ordenado: qué publicas cada día y todo el material de cada pieza en un solo sitio.`,
    time: `30 min`,
    whatYouGet: [
      `Excel con todas tus piezas en una sola vista.`,
      `Calendario visual del mes con arrastrar y soltar.`,
      `Captions generados con IA para cada pieza.`,
    ],
    steps: [
      `Revisa tu Excel de contenido en la pestaña A.`,
      `Genera captions con IA para cada pieza.`,
      `Arrastra las piezas a los días del calendario (pestaña B).`,
      `Exporta a Excel o CSV cuando lo tengas listo.`,
    ],
    externalTools: [],
    checklist: [
      `Todas las piezas tienen fecha`,
      `Captions generados`,
      `Calendario revisado`,
      `Excel exportado (opcional)`,
    ],
  },
  {
    num: 5,
    slug: `paso-5`,
    name: `Creación de carruseles`,
    icon: `LayoutGrid`,
    objective: `Dejar todos los carruseles del mes diseñados y guardados en tu Drive.`,
    time: `45 min`,
    whatYouGet: [
      `Guiones de carrusel optimizados diapositiva a diapositiva.`,
      `Prompts de diseño listos para pegar en ChatGPT, Gemini o Claude.`,
      `Carruseles subidos a Drive y enlazados en tu plan.`,
    ],
    steps: [
      `Elige un carrusel de tu plan.`,
      `Optimiza el guion con la IA (una idea por diapositiva).`,
      `Genera el prompt de diseño y cópialo.`,
      `Diseña el carrusel en ChatGPT, Gemini o Claude con tus colores de marca.`,
      `Sube las imágenes a tu Drive y pega el enlace aquí.`,
    ],
    externalTools: [
      {
        label: `ChatGPT`,
        url: `https://chatgpt.com`,
      },
      {
        label: `Gemini`,
        url: `https://gemini.google.com`,
      },
      {
        label: `Claude`,
        url: `https://claude.ai`,
      },
      {
        label: `Google Drive`,
        url: `https://drive.google.com`,
      },
    ],
    checklist: [
      `Guiones de carrusel optimizados`,
      `Carruseles diseñados`,
      `Todos subidos a Drive`,
      `Enlaces de Drive añadidos en el plan`,
    ],
  },
  {
    num: 6,
    slug: `paso-6`,
    name: `Creación de vídeos`,
    icon: `Video`,
    objective: `Crear todos los vídeos del mes, aunque no quieras salir en cámara, y guardarlos en tu Drive.`,
    time: `1 h 30 min`,
    whatYouGet: [
      `Vídeos en los 4 formatos: B-roll genérico, B-roll propio, clon y avatar.`,
      `Prompts de escenas y personajes generados con IA.`,
      `Todos los vídeos subidos a Drive y enlazados en tu plan.`,
    ],
    steps: [
      `Elige el formato de vídeo según la pieza (pestañas por formato).`,
      `Sigue el paso a paso de cada formato.`,
      `Usa la IA de apoyo para prompts y guion.`,
      `Genera el vídeo, descárgalo y súbelo a tu Drive.`,
      `Pega el enlace de Drive en la pieza.`,
    ],
    externalTools: [
      {
        label: `Grok`,
        url: `https://grok.com`,
      },
      {
        label: `Magnific`,
        url: `https://magnific.ai`,
      },
      {
        label: `HeyGen`,
        url: `https://www.heygen.com`,
      },
    ],
    checklist: [
      `B-roll genéricos creados`,
      `B-roll propios grabados y editados`,
      `Vídeos con clon generados`,
      `Vídeos con avatar generados`,
      `Todos los vídeos subidos a Drive`,
    ],
  },
  {
    num: 7,
    slug: `paso-7`,
    name: `Planificación y publicación`,
    icon: `Send`,
    objective: `Dejar todo programado, probar los reels con Trial Reels y detectar los ganadores.`,
    time: `30 min de planificación y 5 min al día`,
    whatYouGet: [
      `Vídeos subidos como Trial Reels.`,
      `Resultados de 24 h anotados y ganadores marcados.`,
      `Carruseles programados en Metricool.`,
    ],
    steps: [
      `Sube cada vídeo a Instagram como Trial Reel (pestaña A).`,
      `Espera 24 h y anota los resultados; marca los ganadores.`,
      `Cada día, según tu calendario, comparte con todos el Trial Reel que toca.`,
      `Programa los carruseles en Metricool (pestaña B).`,
    ],
    externalTools: [
      {
        label: `Metricool`,
        url: `https://metricool.com`,
      },
      {
        label: `Instagram`,
        url: `https://www.instagram.com`,
      },
    ],
    checklist: [
      `Vídeos subidos como Trial Reels`,
      `Resultados de las primeras 24 h anotados`,
      `Ganadores marcados`,
      `Carruseles programados en Metricool`,
      `Rutina diaria de Compartir con todos activa`,
    ],
  },
  {
    num: 8,
    slug: `paso-8`,
    name: `Automatización`,
    icon: `Bot`,
    objective: `Que cada CTA convierta a quien comenta en un lead, de forma automática o manual pero sin improvisar.`,
    time: `30 min`,
    whatYouGet: [
      `Respuestas públicas, mensajes directos y seguimientos generados con IA.`,
      `Plantillas de flujos ManyChat precargadas.`,
      `Todo guardado en tu Excel de contenido.`,
    ],
    steps: [
      `Revisa todas las piezas con CTA y palabra clave.`,
      `Decide ManyChat o manual para cada una.`,
      `Crea las automatizaciones en ManyChat o prepara las respuestas manuales.`,
      `Prueba comentando desde otra cuenta.`,
    ],
    externalTools: [
      {
        label: `ManyChat`,
        url: `https://manychat.com`,
      },
    ],
    checklist: [
      `Palabras clave definidas en todas las piezas con CTA`,
      `Automatizaciones creadas en ManyChat`,
      `Respuestas manuales preparadas en el Excel`,
      `Prueba hecha comentando desde otra cuenta`,
    ],
  },
];
export const TOTAL_TASKS = STEPS.reduce((e, t) => e + t.checklist.length, 0);
export const getStep = (e) => STEPS.find((t) => t.num === e);
export const STEP_ICONS = {
  Search: SearchIcon,
  FileText: FileTextIcon,
  Wand2: WandSparklesIcon,
  CalendarDays: CalendarDaysIcon,
  Video: VideoIcon,
  Send: SendIcon,
  Bot: BotIcon,
};
