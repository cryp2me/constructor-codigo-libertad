import {
  BookOpen as BookOpenIcon,
  Zap as ZapIcon,
  WandSparkles as WandSparklesIcon,
  Rocket as RocketIcon,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CrearCarrusel } from "@/components/carruseles/CrearCarrusel";
import { FormulaTab } from "@/components/carruseles/FormulaTab";
import { HooksBank } from "@/components/carruseles/HooksBank";
import { StepLayout } from "@/components/steps/StepLayout";

const PASO5_TABS = [
  {
    id: `aprender`,
    label: `Aprende la fórmula`,
    icon: BookOpenIcon,
    comp: FormulaTab,
  },
  {
    id: `hooks`,
    label: `Banco de hooks`,
    icon: ZapIcon,
    comp: HooksBank,
  },
  {
    id: `crear`,
    label: `Crea tu carrusel`,
    icon: WandSparklesIcon,
    comp: CrearCarrusel,
  },
];
export default function Paso5() {
  let e = useNavigate(),
    [t, n] = useState(`aprender`),
    r = PASO5_TABS.find((e) => e.id === t).comp;
  return (
    <StepLayout stepNum={5}>
      <button
        onClick={() => e(`/constructor-carruseles`)}
        className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-lima/30 bg-lima/5 p-5 text-left transition-colors hover:bg-lima/10"
      >
        <span className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lima text-black">
            <RocketIcon className="h-5 w-5" />
          </span>
          <span>
            <span className="block font-heading text-lg font-bold text-lima">
              Constructor de carruseles
            </span>
            <span className="block text-sm text-muted-foreground">
              Crea un carrusel desde cero o modela uno que ya funcione, con tu
              voz de marca.
            </span>
          </span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-lima px-4 py-2.5 text-sm font-semibold text-black transition-transform group-hover:scale-105">
          {"Abrir constructor "}
          <WandSparklesIcon className="h-4 w-4" />
        </span>
      </button>
      <div className="mt-6 flex flex-wrap gap-2">
        {PASO5_TABS.map((e) => (
          <button
            onClick={() => n(e.id)}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${t === e.id ? `bg-lima text-black` : `border border-border bg-card text-white/80 hover:border-lima/50 hover:text-lima`}`}
            key={e.id}
          >
            <e.icon className="h-4 w-4" /> {e.label}
          </button>
        ))}
      </div>
      <div className="mt-6">
        <r />
      </div>
    </StepLayout>
  );
}
