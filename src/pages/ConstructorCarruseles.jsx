import {
  WandSparkles as WandSparklesIcon,
  GitCompareArrows as GitCompareArrowsIcon,
  ArrowLeft as ArrowLeftIcon,
  Sparkles as SparklesIcon,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CrearCarrusel } from "@/components/carruseles/CrearCarrusel";
import { OptimizarCarrusel } from "@/components/carruseles/OptimizarCarrusel";

const CONSTRUCTOR_MODOS = [
  {
    id: `crear`,
    label: `Crear`,
    sub: `Desde una idea, de cero`,
    icon: WandSparklesIcon,
    comp: CrearCarrusel,
  },
  {
    id: `modelar`,
    label: `Modelar`,
    sub: `Desde un carrusel que ya funciona`,
    icon: GitCompareArrowsIcon,
    comp: OptimizarCarrusel,
  },
];
export default function ConstructorCarruseles() {
  let [e, t] = useState(`crear`),
    n = CONSTRUCTOR_MODOS.find((t) => t.id === e).comp;
  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:px-12">
      <Link
        to="/paso-5"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-lima"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        {" Volver al paso 5"}
      </Link>
      <div className="mt-4 animate-fade-in">
        <div className="inline-flex items-center gap-2 rounded-full bg-fucsia/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-fucsia">
          <SparklesIcon className="h-3.5 w-3.5" />
          {" Constructor de carruseles"}
        </div>
        <h1 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
          Crea o modela tu carrusel
        </h1>
        <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
          Dos caminos, el mismo resultado: un guion completo con tu voz de
          marca, listo para diseñar y publicar.
        </p>
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {CONSTRUCTOR_MODOS.map((n) => (
          <button
            onClick={() => t(n.id)}
            className={`flex items-start gap-3 rounded-2xl border p-5 text-left transition-colors ${e === n.id ? `border-lima bg-lima/10` : `border-border bg-card hover:border-lima/50`}`}
            key={n.id}
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${e === n.id ? `bg-lima text-black` : `bg-secondary text-lima`}`}
            >
              <n.icon className="h-5 w-5" />
            </span>
            <span>
              <span
                className={`block font-heading text-lg font-bold ${e === n.id ? `text-lima` : ``}`}
              >
                {n.label}
              </span>
              <span className="block text-sm text-muted-foreground">
                {n.sub}
              </span>
            </span>
          </button>
        ))}
      </div>
      <section className="mt-6 rounded-2xl border border-border bg-card p-6">
        <n />
      </section>
    </div>
  );
}
