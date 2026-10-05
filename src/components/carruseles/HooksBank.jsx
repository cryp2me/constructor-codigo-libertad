import {
  CopyCheck as CopyCheckIcon,
  Copy as CopyIcon,
  Target as TargetIcon,
} from "lucide-react";
import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { AiButton } from "@/components/AiButton";
import { HOOKS, HOOK_CATEGORIAS } from "@/components/carruseles/hooks-data";
import { useToast } from "@/components/ui/use-toast";

function HookCard({ hook: e }) {
  let { toast: t } = useToast(),
    [n, r] = useState(false),
    [i, a] = useState(false),
    [o, s] = useState(null),
    c = async (e) => {
      try {
        (await navigator.clipboard.writeText(e),
          r(true),
          t({
            description: `Hook copiado.`,
          }),
          setTimeout(() => r(false), 1500));
      } catch {
        t({
          description: `No se pudo copiar.`,
          variant: `destructive`,
        });
      }
    };
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold text-lima">
          {e.categoria}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => c(e.texto)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-white/80 hover:border-lima/50 hover:text-lima"
          >
            {n ? (
              <CopyCheckIcon className="h-3.5 w-3.5" />
            ) : (
              <CopyIcon className="h-3.5 w-3.5" />
            )}
            {" Copiar"}
          </button>
          <AiButton
            onClick={async () => {
              a(true);
              try {
                let t = await base44.functions.invoke(`aiCarrusel`, {
                  action: `adaptar_hook`,
                  hook: e.texto,
                  categoria: e.categoria,
                });
                if (t.data.error) throw Error(t.data.error);
                s(t.data);
              } catch (e) {
                t({
                  description: e.message || `No se pudo adaptar el hook.`,
                  variant: `destructive`,
                });
              } finally {
                a(false);
              }
            }}
            loading={i}
            className="!px-2.5 !py-1.5 text-xs"
          >
            Adaptar a mi marca
          </AiButton>
        </div>
      </div>
      <p className="mt-2.5 font-heading text-base font-semibold text-white">
        {e.texto}
      </p>
      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
        <TargetIcon className="h-3.5 w-3.5" /> {e.objetivo}
      </p>
      {o && (
        <div className="mt-3 rounded-lg border border-fucsia/40 bg-fucsia/5 p-3">
          <p className="text-sm text-white">{o.adaptado}</p>
          <p className="mt-1 text-xs text-muted-foreground">{o.explicacion}</p>
          <button
            onClick={() => c(o.adaptado)}
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-fucsia hover:underline"
          >
            <CopyIcon className="h-3.5 w-3.5" />
            {" Copiar adaptado"}
          </button>
        </div>
      )}
    </div>
  );
}
export function HooksBank() {
  let [e, t] = useState(`Todos`),
    n = e === `Todos` ? HOOKS : HOOKS.filter((t) => t.categoria === e);
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {HOOK_CATEGORIAS.map((n) => (
          <button
            onClick={() => t(n)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${e === n ? `bg-lima text-black` : `border border-border bg-card text-white/70 hover:text-lima`}`}
            key={n}
          >
            {n}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        {n.length}
        {
          " hooks pre-cargados. Copia el que encaje y adáptalo a tu nicho con IA."
        }
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {n.map((e) => (
          <HookCard hook={e} key={e.texto} />
        ))}
      </div>
    </div>
  );
}
