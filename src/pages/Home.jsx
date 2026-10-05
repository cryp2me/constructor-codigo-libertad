import {
  ArrowRight as ArrowRightIcon,
  CircleAlert as CircleAlertIcon,
  Rocket as RocketIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "@/api/client";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/lib/AuthContext";
import { FORMATOS, ESTADOS } from "@/lib/constants";
import { STEPS } from "@/lib/steps";

function StepCard({ step: e, status: t }) {
  let n = t?.done || 0,
    r = e.checklist.length,
    i = r ? Math.round((n / r) * 100) : 0,
    a = t?.completado;
  return (
    <Link
      to={`/${e.slug}`}
      className="group rounded-2xl border border-border bg-card p-5 transition-all hover:border-lima/40 hover:bg-secondary"
    >
      <div className="flex items-start justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-sm font-bold text-lima">
          {e.num}
        </span>
        {a ? (
          <span className="rounded-full bg-lima/15 px-2 py-0.5 text-[11px] font-semibold text-lima">
            Completado
          </span>
        ) : n > 0 ? (
          <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold text-white/80">
            {i}%
          </span>
        ) : (
          <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
            Sin empezar
          </span>
        )}
      </div>
      <h3 className="mt-3 font-heading text-base font-semibold">{e.name}</h3>
      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
        {e.objective}
      </p>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-lima transition-all duration-500"
          style={{
            width: `${i}%`,
          }}
        />
      </div>
      <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
        <span>
          {n}/{r}
          {" tareas"}
        </span>
        <span className="inline-flex items-center gap-1 text-lima opacity-0 transition-opacity group-hover:opacity-100">
          {"Abrir "}
          <ArrowRightIcon className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}
export default function Home() {
  let { user: e } = useAuth(),
    {
      percent: t,
      perStep: n,
      completedTasks: r,
      totalTasks: i,
    } = useProgress(),
    [a, o] = useState([]),
    [s, c] = useState(null),
    [l, u] = useState(true);
  useEffect(() => {
    Promise.all([
      api.entities.ContentPiece.list().catch(() => []),
      api.entities.BrandProfile.list().catch(() => []),
    ]).then(([e, t]) => {
      (o(e), c(t[0] || null), u(false));
    });
  }, []);
  let d = e?.full_name || (e?.email ? e.email.split(`@`)[0] : `alumno`),
    f = (() => {
      if (!s) return 0;
      let e = [
          `nombre_marca`,
          `nicho`,
          `cliente_ideal_quien`,
          `propuesta_valor`,
          `tono_voz`,
          `pilares_contenido`,
        ],
        t = e.filter((e) => {
          let t = s[e];
          return Array.isArray(t) ? t.length > 0 : t && String(t).trim();
        }).length;
      return Math.round((t / e.length) * 100);
    })(),
    p = STEPS.find((e) => !n[e.num]?.completado),
    m = FORMATOS.map((e) => ({
      f: e,
      n: a.filter((t) => t.formato === e).length,
    })),
    h = ESTADOS.map((e) => ({
      e,
      n: a.filter((t) => t.estado === e).length,
    }));
  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-12">
      <div className="animate-fade-in">
        <p className="text-sm text-muted-foreground">Bienvenido de nuevo,</p>
        <h1 className="font-heading text-3xl font-bold capitalize sm:text-4xl">
          {d}
          {" 👋"}
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Tu mes de contenido a un clic. Sigue el sistema, completa los pasos y
          tendrás 30 piezas listas en unas 5 horas.
        </p>
      </div>
      {f < 100 && (
        <Link
          to="/marca"
          className="mt-6 flex items-center gap-3 rounded-xl border border-fucsia/40 bg-fucsia/10 p-4 transition-colors hover:bg-fucsia/15"
        >
          <CircleAlertIcon className="h-5 w-5 shrink-0 text-fucsia" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-fucsia">
              Completa tu marca para que la IA escriba como tú
            </p>
            <p className="text-xs text-white/70">
              {
                "Tu perfil de marca es el cerebro de toda la IA del Constructor. Cerebro completado: "
              }
              {f}%.
            </p>
          </div>
          <ArrowRightIcon className="h-4 w-4 text-fucsia" />
        </Link>
      )}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 sm:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold">
              Progreso global
            </h2>
            <span className="font-heading text-2xl font-bold text-lima">
              {t}%
            </span>
          </div>
          <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-lima transition-all duration-500"
              style={{
                width: `${t}%`,
              }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {r}
            {" de "}
            {i}
            {" tareas completadas en todo el sistema."}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-heading text-lg font-semibold">
            Continúa donde lo dejaste
          </h2>
          {p ? (
            <Link
              to={`/${p.slug}`}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-lima px-4 py-2.5 text-sm font-semibold text-black hover:brightness-110"
            >
              {"Paso "}
              {p.num}
              {" · "}
              {p.name} <ArrowRightIcon className="h-4 w-4" />
            </Link>
          ) : (
            <p className="mt-3 text-sm text-lima">¡Sistema completado! 🎉</p>
          )}
        </div>
      </div>
      <div className="mt-6 rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold">Piezas del mes</h2>
          <span className="font-heading text-xl font-bold text-lima">
            {l ? `—` : `${a.length} / 30`}
          </span>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
              Por formato
            </p>
            <div className="space-y-1.5">
              {m.map(({ f: e, n: t }) => (
                <div
                  className="flex items-center justify-between text-xs"
                  key={e}
                >
                  <span className="text-white/80">{e}</span>
                  <span className="font-semibold text-white/90">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
              Por estado
            </p>
            <div className="space-y-1.5">
              {h.map(({ e, n: t }) => (
                <div
                  className="flex items-center justify-between text-xs"
                  key={e}
                >
                  <span className="text-white/80">{e}</span>
                  <span className="font-semibold text-white/90">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <h2 className="mt-8 font-heading text-xl font-semibold">Los 8 pasos</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((e) => (
          <StepCard step={e} status={n[e.num]} key={e.num} />
        ))}
      </div>
      <div className="mt-8 flex items-center gap-2 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
        <RocketIcon className="h-4 w-4 text-lima" />
        {"Consejo: completa primero "}
        <Link to="/marca" className="font-semibold text-lima hover:underline">
          Mi Marca
        </Link>
        {" para que la IA escriba como tú."}
      </div>
    </div>
  );
}
