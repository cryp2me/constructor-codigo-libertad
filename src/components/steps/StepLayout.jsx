import {
  ExternalLink as ExternalLinkIcon,
  Clock as ClockIcon,
  Target as TargetIcon,
  Check as CheckIcon,
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
  Plus as PlusIcon,
} from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "@/api/client";
import { notifyProgressUpdated } from "@/hooks/useProgress";
import { getStep, STEPS } from "@/lib/steps";

function ExternalToolLink({ href: e, label: t }) {
  return (
    <a
      href={e}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-medium text-white transition-colors hover:border-lima/60 hover:bg-secondary"
    >
      <span>{t}</span>
      <ExternalLinkIcon className="h-3.5 w-3.5 text-muted-foreground" />
    </a>
  );
}
export function StepLayout({ stepNum: e, children: t }) {
  let n = getStep(e),
    [r, i] = useState(null),
    [a, o] = useState(true),
    [s, c] = useState(false),
    l = useCallback(async () => {
      try {
        let t = await api.entities.StepProgress.filter({
          paso: e,
        });
        if (t.length > 0) i(t[0]);
        else {
          let t = await api.entities.StepProgress.create({
            paso: e,
            tareas_completadas: [],
            completado: false,
          });
          i(t);
        }
      } catch (e) {
        console.error(e);
      } finally {
        o(false);
      }
    }, [e]);
  useEffect(() => {
    l();
  }, [l]);
  let u = async (e) => {
      if (!r || s) return;
      c(true);
      let t = r.tareas_completadas || [],
        a = t.includes(e) ? t.filter((t) => t !== e) : [...t, e],
        o = a.length >= n.checklist.length;
      try {
        let e = await api.entities.StepProgress.update(r.id, {
          tareas_completadas: a,
          completado: o,
        });
        (i(e), notifyProgressUpdated());
      } catch (e) {
        console.error(e);
      } finally {
        c(false);
      }
    },
    d = r ? (r.tareas_completadas || []).length : 0,
    f = n.checklist.length ? Math.round((d / n.checklist.length) * 100) : 0,
    p = STEPS.find((t) => t.num === e - 1),
    m = STEPS.find((t) => t.num === e + 1);
  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:px-12">
      <div className="animate-fade-in">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-lima">
          <span>
            {"Paso "}
            {e}
            {" de 8"}
          </span>
        </div>
        <h1 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
          {n.name}
        </h1>
        <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
          {n.objective}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon className="h-4 w-4" /> {n.time}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <TargetIcon className="h-4 w-4" /> {n.checklist.length}
            {" tareas"}
          </span>
        </div>
      </div>
      <section className="mt-8 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-heading text-lg font-semibold text-lima">
          Qué vas a conseguir
        </h2>
        <ul className="mt-3 space-y-2">
          {n.whatYouGet.map((e, t) => (
            <li
              className="flex items-start gap-2.5 text-sm text-white/90"
              key={t}
            >
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-lima" />
              <span>{e}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-6 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-heading text-lg font-semibold">Paso a paso</h2>
        <ol className="mt-4 space-y-3">
          {n.steps.map((e, t) => (
            <li
              className="flex items-start gap-3 text-sm text-white/90"
              key={t}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-lima">
                {t + 1}
              </span>
              <span className="pt-0.5">{e}</span>
            </li>
          ))}
        </ol>
      </section>
      <section className="mt-6 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-heading text-lg font-semibold">
          Herramienta del paso
        </h2>
        <div className="mt-4">{t}</div>
      </section>
      {n.externalTools.length > 0 && (
        <section className="mt-6 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-heading text-lg font-semibold">
            Herramientas externas
          </h2>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {n.externalTools.map((e) => (
              <ExternalToolLink href={e.url} label={e.label} key={e.label} />
            ))}
          </div>
        </section>
      )}
      <section className="mt-6 rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold">
            Checklist del paso
          </h2>
          <span className="text-sm font-semibold text-lima">
            {d}/{n.checklist.length}
          </span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-lima transition-all duration-500"
            style={{
              width: `${f}%`,
            }}
          />
        </div>
        <ul className="mt-4 space-y-2">
          {n.checklist.map((e) => {
            let t = (r?.tareas_completadas || []).includes(e);
            return (
              <li key={e}>
                <button
                  onClick={() => u(e)}
                  disabled={a || s}
                  className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition-colors hover:bg-secondary"
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${t ? `border-lima bg-lima text-black` : `border-muted-foreground/40`}`}
                  >
                    {t && <CheckIcon className="h-3.5 w-3.5" />}
                  </span>
                  <span
                    className={
                      t ? `text-muted-foreground line-through` : `text-white/90`
                    }
                  >
                    {e}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
      <div className="mt-8 flex items-center justify-between">
        {p ? (
          <Link
            to={`/${p.slug}`}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium hover:border-lima/50"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            {" Paso anterior"}
          </Link>
        ) : (
          <span />
        )}
        {m ? (
          <Link
            to={`/${m.slug}`}
            className="inline-flex items-center gap-2 rounded-lg bg-lima px-4 py-2.5 text-sm font-semibold text-black hover:brightness-110"
          >
            {"Siguiente paso "}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        ) : (
          <span />
        )}
      </div>
      <button
        onClick={async () => {
          let t = prompt(`Título de la nota rápida:`);
          if (!t) return;
          let n = prompt(`Contenido de la nota:`) || ``;
          try {
            (await api.entities.Resource.create({
              titulo: t,
              tipo: `nota`,
              contenido: n,
              etiquetas: [],
              paso_relacionado: String(e),
              favorito: false,
              es_del_sistema: false,
            }),
              alert(`Nota guardada en Mi Biblioteca.`));
          } catch {
            alert(`No se pudo guardar la nota.`);
          }
        }}
        className="fixed bottom-6 right-6 z-30 inline-flex items-center gap-2 rounded-full bg-fucsia px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-fucsia/20 transition-transform hover:scale-105"
      >
        <PlusIcon className="h-4 w-4" />
        {" Nota rápida"}
      </button>
    </div>
  );
}
