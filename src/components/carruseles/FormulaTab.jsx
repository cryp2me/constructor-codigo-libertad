import {
  MousePointerClick as MousePointerClickIcon,
  Heart as HeartIcon,
  Send as SendIcon,
  TrendingUp as TrendingUpIcon,
  BookOpen as BookOpenIcon,
  Flame as FlameIcon,
  Repeat as RepeatIcon,
  Music as MusicIcon,
} from "lucide-react";

const PALANCAS_ALGORITMO = [
  {
    icon: MousePointerClickIcon,
    t: `Dwell time`,
    d: `El tiempo que alguien pasa en tu post. Con 10 slides bien construidas se multiplica: tiempo = valor para el algoritmo.`,
  },
  {
    icon: HeartIcon,
    t: `Guardados`,
    d: `La señal más potente: "esto tiene tanto valor que quiero volver". Instagram lo premia con más distribución.`,
  },
  {
    icon: SendIcon,
    t: `Envíos por DM`,
    d: `Pesan 3-5 veces más que un like. Diseña slides que apetezca mandárselas a alguien.`,
  },
  {
    icon: TrendingUpIcon,
    t: `Completion rate`,
    d: `El % que llega a la última slide. Si supera el 60%, el algoritmo entiende que nadie se va a mitad.`,
  },
];
const ESTRUCTURA_SLIDES = [
  [
    `Formato`,
    `4:5 vertical (1080×1350 px)`,
    `Ocupa 35% más de pantalla que el cuadrado`,
  ],
  [`Slides óptimo`, `8-10`, `Máximo dwell time sin perder completion rate`],
  [`Slides máximo`, `20`, `Solo para guías muy profundas`],
  [
    `Zona segura`,
    `Fuera del top/bottom 270 px`,
    `En el grid del perfil se corta el texto`,
  ],
  [`Música`, `SIEMPRE`, `1,4-1,9× más alcance`],
  [`Vídeos en carrusel`, `Máximo 60 s`, `Límite de la API de Instagram`],
];
const TIPOS_CARRUSEL = [
  [`Educativo`, `Enseña algo concreto, paso a paso.`],
  [`Lista`, `Recursos, herramientas o errores numerados.`],
  [`Storytelling`, `Tu historia con un giro y una moraleja.`],
  [`Problema-Solución`, `Dolor del cliente ideal y salida.`],
  [`Contrarian`, `Rompe una creencia común de tu nicho.`],
  [`Paso a paso`, `Un proceso deslizable de principio a fin.`],
  [`Antes-Después`, `La transformación de tu cliente ideal.`],
  [`Mito-Realidad`, `Desmonta lo que todos repiten.`],
  [`Checklist`, `Lista de verificación que se guarda.`],
  [`Caso de éxito`, `Un resultado real contado como prueba.`],
];
export function FormulaTab() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-lima/30 bg-lima/5 p-6">
        <div className="flex items-center gap-2">
          <BookOpenIcon className="h-5 w-5 text-lima" />
          <h3 className="font-heading text-xl font-bold">
            La fórmula del carrusel viral
          </h3>
        </div>
        <p className="mt-3 text-sm text-white/90">
          Un carrusel es una mini landing dentro del feed: cada swipe es un
          evento de engagement aparte. Y en 2026 Instagram re-serve: si alguien
          no interactúa, tu carrusel se vuelve a mostrar empezando por la slide
          2. Doble oportunidad de impacto.
        </p>
      </div>
      <div>
        <h4 className="font-heading font-semibold text-lima">
          Las 4 señales que el algoritmo premia
        </h4>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {PALANCAS_ALGORITMO.map((e) => (
            <div
              className="rounded-xl border border-border bg-card p-4"
              key={e.t}
            >
              <e.icon className="h-5 w-5 text-fucsia" />
              <h5 className="mt-2 font-heading font-semibold">{e.t}</h5>
              <p className="mt-1 text-sm text-muted-foreground">{e.d}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-heading font-semibold text-lima">
          Hook → Cuerpo → CTA
        </h4>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {[
            {
              t: `HOOK`,
              d: `Primera slide. No explica: provoca. Curiosidad, deseo, identificación, contraste o urgencia. Máximo 15 palabras.`,
            },
            {
              t: `CUERPO`,
              d: `Cumple la promesa del hook. Una idea por slide, frases cortas, y cada slide hace que tenga sentido continuar.`,
            },
            {
              t: `CTA`,
              d: `La última slide dice claramente qué hacer: guardar, comentar, seguirte, escribirte o comprar.`,
            },
          ].map((e) => (
            <div
              className="rounded-xl border border-border bg-card p-4"
              key={e.t}
            >
              <span className="font-heading text-xl font-bold text-fucsia">
                {e.t}
              </span>
              <p className="mt-2 text-sm text-muted-foreground">{e.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-white/90">
          <FlameIcon className="mr-1.5 inline h-4 w-4 text-lima" />
          No queremos slides bonitas: queremos que alguien llegue a la última
          slide y haga algo.
        </p>
      </div>
      <div>
        <h4 className="font-heading font-semibold text-lima">
          Tipos de carrusel
        </h4>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {TIPOS_CARRUSEL.map(([e, t]) => (
            <div
              className="flex items-start gap-2.5 rounded-lg border border-border bg-card px-3.5 py-2.5"
              key={e}
            >
              <RepeatIcon className="mt-0.5 h-4 w-4 shrink-0 text-lima" />
              <span className="text-sm">
                <strong className="text-white">{e}</strong>
                {" · "}
                <span className="text-muted-foreground">{t}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-heading font-semibold text-lima">
          Especificaciones técnicas
        </h4>
        <div className="mt-3 overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <tbody>
              {ESTRUCTURA_SLIDES.map(([e, t, n]) => (
                <TrendingUpIcon
                  className="border-b border-border last:border-0"
                  key={e}
                >
                  <td className="px-4 py-2.5 font-semibold">{e}</td>
                  <td className="px-4 py-2.5 text-lima">{t}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{n}</td>
                </TrendingUpIcon>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
        <MusicIcon className="mt-0.5 h-5 w-5 shrink-0 text-fucsia" />
        <p className="text-sm text-white/90">
          <strong>El truco de la música:</strong>
          {
            " cuando añades audio a un carrusel, Instagram lo incorpora al algoritmo de Reels. Alcance de Reel + profundidad de carrusel. No publiques un carrusel sin música."
          }
        </p>
      </div>
    </div>
  );
}
