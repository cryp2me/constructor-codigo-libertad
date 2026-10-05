import {
  Settings as SettingsIcon,
  LogOut as LogOutIcon,
  Check as CheckIcon,
  Copy as CopyIcon,
  Archive as ArchiveIcon,
  ChevronDown as ChevronDownIcon,
  Trash2 as Trash2Icon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "@/api/client";
import { useAuth } from "@/lib/AuthContext";
import AiProviderSetting from "@/components/AiProviderSetting";
import { STEPS } from "@/lib/steps";

const MESES = [
  `Enero`,
  `Febrero`,
  `Marzo`,
  `Abril`,
  `Mayo`,
  `Junio`,
  `Julio`,
  `Agosto`,
  `Septiembre`,
  `Octubre`,
  `Noviembre`,
  `Diciembre`,
];
const ESTRUCTURA_DRIVE = `Código Libertad – Contenido/
├── Marca/ (logo, fotos, tipografías, plantillas)
└── 2026-10 Octubre/
    ├── 01 Referencias/ (capturas de carruseles y vídeos de referencia)
    ├── 02 Carruseles/ (P1, P2… cada carrusel en su carpeta)
    ├── 03 Vídeos/
    │   ├── B-roll genérico/
    │   ├── B-roll propio/
    │   ├── Clon/
    │   └── Avatar UGC-Pixar/
    └── 04 Publicado/`;
export default function Ajustes() {
  let { user: e, logout: t } = useAuth(),
    [n, r] = useState(``),
    [i, a] = useState(null),
    [o, s] = useState(false),
    [c, l] = useState([]),
    [u, d] = useState(null),
    [f, p] = useState(false),
    m = () => {
      api.entities.MonthlyArchive.list(`-created_date`, 10).then(l);
    };
  useEffect(() => {
    (api.entities.BrandProfile.list().then((e) => {
      e[0] && (a(e[0].id), r(e[0].enlace_drive || ``));
    }),
      m());
  }, []);
  let h = async () => {
      try {
        if (i)
          await api.entities.BrandProfile.update(i, {
            enlace_drive: n,
          });
        else {
          let e = await api.entities.BrandProfile.create({
            enlace_drive: n,
          });
          a(e.id);
        }
        alert(`Enlace guardado ✓`);
      } catch {
        alert(`No se pudo guardar.`);
      }
    },
    g = () => {
      (navigator.clipboard.writeText(ESTRUCTURA_DRIVE),
        s(true),
        setTimeout(() => s(false), 2e3));
    },
    v = async () => {
      if (c.length >= 3) {
        alert(`Ya tienes 3 meses archivados. Borra uno para archivar otro.`);
        return;
      }
      let e = new Date(),
        t = `${MESES[e.getMonth()]} ${e.getFullYear()}`;
      if (c.some((e) => e.mes === t)) {
        alert(`Ese mes ya está archivado.`);
        return;
      }
      if (
        confirm(
          `¿Archivar ${t}? Se guardará su progreso aquí y podrás consultarlo cuando quieras.`,
        )
      ) {
        p(true);
        try {
          let [e, n] = await Promise.all([
              api.entities.StepProgress.list(),
              api.entities.ContentPiece.list(),
            ]),
            r = STEPS.map((t) => {
              let n = e.find((e) => e.paso === t.num),
                r = n?.tareas_completadas || [];
              return {
                paso: t.num,
                nombre: t.name,
                completadas: r.length,
                total: t.checklist.length,
                completado: !!n?.completado,
              };
            }),
            i = {};
          (n.forEach((e) => {
            i[e.estado || `idea`] = (i[e.estado || `idea`] || 0) + 1;
          }),
            await api.entities.MonthlyArchive.create({
              mes: t,
              archivado_el: new Date().toISOString().slice(0, 10),
              resumen: {
                pasos: r,
                piezas: n.length,
                estados: i,
              },
            }),
            m(),
            confirm(
              `Mes archivado ✓ ¿Quieres desmarcar también los checklists para empezar el mes nuevo?`,
            ) &&
              (await api.entities.StepProgress.updateMany(
                {},
                {
                  $set: {
                    tareas_completadas: [],
                    completado: false,
                  },
                },
              ),
              window.dispatchEvent(new Event(`progress-updated`))));
        } catch {
          alert(`No se pudo archivar.`);
        } finally {
          p(false);
        }
      }
    },
    y = async (e) => {
      if (
        confirm(
          `¿Borrar el archivo de ${e.mes}? Esta acción no se puede deshacer.`,
        )
      )
        try {
          (await api.entities.MonthlyArchive.delete(e.id), m());
        } catch {
          alert(`No se pudo borrar.`);
        }
    };
  return (
    <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8 lg:px-12">
      <div className="animate-fade-in">
        <div className="inline-flex items-center gap-2 rounded-full bg-lima/10 px-3 py-1 text-xs font-semibold text-lima">
          <SettingsIcon className="h-3.5 w-3.5" />
          {" Ajustes"}
        </div>
        <h1 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
          Ajustes
        </h1>
      </div>
      <section className="mt-6 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-heading text-lg font-semibold">Perfil</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Nombre</label>
            <input
              value={e?.full_name || ``}
              disabled
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-muted-foreground"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Email</label>
            <input
              value={e?.email || ``}
              disabled
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-muted-foreground"
            />
          </div>
        </div>
        <button
          onClick={() => t()}
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary"
        >
          <LogOutIcon className="h-4 w-4" />
          {" Cerrar sesión"}
        </button>
      </section>
      <AiProviderSetting />
      <section className="mt-5 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-heading text-lg font-semibold">
          Carpeta de Google Drive
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Pega el enlace de tu carpeta principal de Drive. Lo usaremos en los
          botones externos.
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            value={n}
            onChange={(e) => r(e.target.value)}
            placeholder="https://drive.google.com/…"
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-lima/60 focus:outline-none"
          />
          <button
            onClick={h}
            className="rounded-lg bg-lima px-4 py-2.5 text-sm font-semibold text-black hover:brightness-110"
          >
            Guardar enlace
          </button>
        </div>
      </section>
      <section className="mt-5 rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold">
            Estructura de carpetas recomendada
          </h2>
          <button
            onClick={g}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-secondary"
          >
            {o ? (
              <>
                <CheckIcon className="h-3.5 w-3.5 text-lima" />
                {" Copiado"}
              </>
            ) : (
              <>
                <CopyIcon className="h-3.5 w-3.5" />
                {" Copiar"}
              </>
            )}
          </button>
        </div>
        <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-background p-4 text-xs leading-relaxed text-white/80 scrollbar-thin">
          {ESTRUCTURA_DRIVE}
        </pre>
      </section>
      <section className="mt-5 rounded-2xl border border-fucsia/30 bg-fucsia/5 p-6">
        <div className="flex items-start gap-3">
          <ArchiveIcon className="mt-0.5 h-5 w-5 shrink-0 text-fucsia" />
          <div className="flex-1">
            <h2 className="font-heading text-lg font-semibold">
              Archivo de meses
            </h2>
            <p className="mt-1 text-sm text-white/80">
              Al cerrar un mes, archiva aquí su progreso: pasos completados y
              piezas del mes. Se guardan los últimos 3 meses; tu marca y tu
              biblioteca nunca se borran.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={v}
                disabled={f}
                className="inline-flex items-center gap-2 rounded-lg border border-fucsia/40 bg-fucsia/10 px-4 py-2 text-sm font-semibold text-fucsia hover:bg-fucsia/20 disabled:opacity-50"
              >
                <ArchiveIcon className="h-4 w-4" />{" "}
                {f ? `Archivando…` : `Archivar mes actual`}
              </button>
              <span className="text-xs text-muted-foreground">
                {c.length}/3 meses archivados
              </span>
            </div>
            <div className="mt-4 space-y-2">
              {c.map((e) => (
                <div
                  className="rounded-xl border border-border bg-background p-4"
                  key={e.id}
                >
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => d(u === e.id ? null : e.id)}
                      className="flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-lima"
                    >
                      <ChevronDownIcon
                        className={`h-4 w-4 transition-transform ${u === e.id ? `rotate-180` : ``}`}
                      />
                      {e.mes}
                    </button>
                    <button
                      onClick={() => y(e)}
                      className="rounded-md p-1.5 hover:bg-secondary"
                    >
                      <Trash2Icon className="h-4 w-4 text-muted-foreground hover:text-fucsia" />
                    </button>
                  </div>
                  {e.resumen && (
                    <div className="mt-1.5 text-xs text-muted-foreground">
                      {e.resumen.piezas || 0}
                      {" piezas · "}
                      {e.resumen.pasos?.filter((e) => e.completado).length || 0}
                      {"/8 pasos completados · archivado el "}
                      {e.archivado_el}
                    </div>
                  )}
                  {u === e.id && e.resumen && (
                    <div className="mt-3 border-t border-border pt-3">
                      <ul className="space-y-1.5">
                        {(e.resumen.pasos || []).map((e) => (
                          <li
                            className="flex items-center justify-between text-xs"
                            key={e.paso}
                          >
                            <span className="text-white/80">
                              {"Paso "}
                              {e.paso}
                              {" · "}
                              {e.nombre}
                            </span>
                            <span
                              className={
                                e.completado
                                  ? `font-semibold text-lima`
                                  : `text-muted-foreground`
                              }
                            >
                              {e.completadas}/{e.total}
                            </span>
                          </li>
                        ))}
                      </ul>
                      {e.resumen.estados &&
                        Object.keys(e.resumen.estados).length > 0 && (
                          <div className="mt-2 text-xs text-muted-foreground">
                            {"Piezas por estado: "}
                            {Object.entries(e.resumen.estados)
                              .map(([e, t]) => `${e}: ${t}`)
                              .join(` · `)}
                          </div>
                        )}
                    </div>
                  )}
                </div>
              ))}
              {c.length === 0 && (
                <p className="text-xs text-muted-foreground">
                  Aún no hay meses archivados.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
