import {
  Eye as EyeIcon,
  Users as UsersIcon,
  TrendingUp as TrendingUpIcon,
  DollarSign as DollarSignIcon,
  Clock as ClockIcon,
  Globe as GlobeIcon,
  BookOpen as BookOpenIcon,
  Target as TargetIcon,
  Rocket as RocketIcon,
  LayoutGrid as LayoutGridIcon,
  Map as MapIcon,
  ArrowRight as ArrowRightIcon,
  Sparkles as SparklesIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { STEPS } from "@/lib/steps";

const OBJETIVOS = [
  {
    icon: EyeIcon,
    title: `Visibilidad y autoridad`,
    text: `Que te conozcan, te reconozcan y te tengan en cuenta cuando piensen en tu tema.`,
  },
  {
    icon: UsersIcon,
    title: `Atraer clientes sin perseguirlos`,
    text: `El contenido trabaja por ti: los interesados llegan solos.`,
  },
  {
    icon: TrendingUpIcon,
    title: `Construir comunidad`,
    text: `Una audiencia que confía en ti es tu mejor activo a largo plazo.`,
  },
  {
    icon: DollarSignIcon,
    title: `Vender sin publicidad`,
    text: `Dejas de depender de pagar anuncios para tener ventas.`,
  },
  {
    icon: ClockIcon,
    title: `Un activo 24/7`,
    text: `Tus publicaciones trabajan mientras tú haces otra cosa.`,
  },
  {
    icon: GlobeIcon,
    title: `Libertad de tiempo y ubicación`,
    text: `Trabajas desde donde quieras, en los horarios que decidas.`,
  },
];
const SISTEMA_BLOQUES = [
  {
    nombre: `Carrusel`,
    que: `Varias imágenes deslizables con texto.`,
    cuando: `Para educar, listados y pasos.`,
    camara: `No necesitas salir en cámara.`,
  },
  {
    nombre: `B-roll genérico`,
    que: `Clips visuales de recurso o generados con IA con texto y voz encima.`,
    cuando: `Para mensajes directos sin grabarte.`,
    camara: `No sales en cámara.`,
  },
  {
    nombre: `B-roll propio`,
    que: `Planos de tu día a día con texto encima.`,
    cuando: `Para mostrar tu vida y proceso sin hablar a cámara.`,
    camara: `Apareces, pero no hablas.`,
  },
  {
    nombre: `Vídeo con clon`,
    que: `Tu clon digital dice el guion por ti.`,
    cuando: `Para vídeos hablados sin grabarte cada vez.`,
    camara: `Solo grabas el clon una vez.`,
  },
  {
    nombre: `Vídeo con avatar UGC o Pixar`,
    que: `Un avatar o personaje cuenta tu mensaje.`,
    cuando: `Para variedad y para probar estilos.`,
    camara: `No sales en cámara.`,
  },
];
export default function Sistema() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 lg:px-12">
      <div className="animate-fade-in">
        <div className="inline-flex items-center gap-2 rounded-full bg-lima/10 px-3 py-1 text-xs font-semibold text-lima">
          <BookOpenIcon className="h-3.5 w-3.5" />
          {" El Sistema"}
        </div>
        <h1 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
          El método Código Libertad
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Crea, viraliza y monetiza. Un sistema propio y validado para hacer un
          mes de contenido en 5 horas.
        </p>
      </div>
      <section className="mt-10">
        <h2 className="font-heading text-2xl font-bold">
          ¿Por qué crear contenido?
        </h2>
        <p className="mt-2 text-muted-foreground">
          Crear contenido no es un hobby: es la forma más rentable de conseguir
          clientes hoy.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {OBJETIVOS.map((e) => (
            <div
              className="rounded-2xl border border-border bg-card p-5"
              key={e.title}
            >
              <e.icon className="h-5 w-5 text-lima" />
              <h3 className="mt-3 font-heading font-semibold">{e.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{e.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-10 rounded-2xl border border-lima/30 bg-lima/5 p-6">
        <div className="flex items-center gap-2">
          <TargetIcon className="h-5 w-5 text-lima" />
          <h2 className="font-heading text-2xl font-bold">
            El objetivo del sistema
          </h2>
        </div>
        <p className="mt-3 text-white/90">
          {"Crear un "}
          <strong>mes entero de contenido en unas 5 horas</strong>, sin
          procrastinar, sin quedarte sin ideas y aunque te dé miedo salir en
          cámara. Un sistema claro que se repite cada mes y que cualquier
          persona puede seguir paso a paso.
        </p>
      </section>
      <section className="mt-10">
        <div className="flex items-center gap-2">
          <RocketIcon className="h-5 w-5 text-fucsia" />
          <h2 className="font-heading text-2xl font-bold">
            Crea, Viraliza y Monetiza
          </h2>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            {
              t: `Crea`,
              d: `Partimos de lo que ya funciona (tus mejores contenidos y los virales de tu nicho) y lo modelamos a tu voz.`,
              c: `lima`,
            },
            {
              t: `Viraliza`,
              d: `Probamos con Trial Reels, detectamos los ganadores y los repetimos.`,
              c: `fucsia`,
            },
            {
              t: `Monetiza`,
              d: `Cada pieza lleva un CTA y una automatización que convierte la atención en leads y ventas.`,
              c: `lima`,
            },
          ].map((e) => (
            <div
              className="rounded-2xl border border-border bg-card p-5"
              key={e.t}
            >
              <span
                className={`font-heading text-2xl font-bold ${e.c === `lima` ? `text-lima` : `text-fucsia`}`}
              >
                {e.t}
              </span>
              <p className="mt-2 text-sm text-muted-foreground">{e.d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-10">
        <div className="flex items-center gap-2">
          <LayoutGridIcon className="h-5 w-5 text-lima" />
          <h2 className="font-heading text-2xl font-bold">Los 5 formatos</h2>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {SISTEMA_BLOQUES.map((e) => (
            <div
              className="rounded-2xl border border-border bg-card p-5"
              key={e.nombre}
            >
              <h3 className="font-heading text-lg font-semibold">{e.nombre}</h3>
              <p className="mt-1.5 text-sm text-white/90">{e.que}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                <span className="text-white/70">Cuándo:</span> {e.cuando}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                <span className="text-white/70">Cámara:</span> {e.camara}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-10">
        <div className="flex items-center gap-2">
          <MapIcon className="h-5 w-5 text-lima" />
          <h2 className="font-heading text-2xl font-bold">
            El mapa de los 8 pasos
          </h2>
        </div>
        <div className="mt-5 space-y-2">
          {STEPS.map((e) => (
            <Link
              to={`/${e.slug}`}
              className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-lima/40 hover:bg-secondary"
              key={e.num}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-sm font-bold text-lima">
                {e.num}
              </span>
              <div className="flex-1">
                <div className="font-heading font-semibold">{e.name}</div>
                <div className="text-xs text-muted-foreground">
                  {e.objective}
                </div>
              </div>
              <ArrowRightIcon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-lima" />
            </Link>
          ))}
        </div>
      </section>
      <section className="mt-10 rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-2">
          <SparklesIcon className="h-5 w-5 text-fucsia" />
          <h2 className="font-heading text-2xl font-bold">
            Cómo usar el Constructor
          </h2>
        </div>
        <ol className="mt-4 space-y-3 text-sm text-white/90">
          {[
            `Primero completa Mi Marca: es el cerebro de toda la IA del Constructor.`,
            `Después sigue los pasos en orden, aunque puedes saltar libremente entre ellos.`,
            `Guarda todo lo que te sea útil en Mi Biblioteca.`,
            `Sube el material creado a tu carpeta de Google Drive (mira la estructura recomendada en Ajustes).`,
          ].map((e, t) => (
            <li className="flex items-start gap-3" key={t}>
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-lima">
                {t + 1}
              </span>
              <span className="pt-0.5">{e}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
