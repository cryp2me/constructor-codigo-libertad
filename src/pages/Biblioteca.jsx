import {
  X as XIcon,
  Library as LibraryIcon,
  Plus as PlusIcon,
  Search as SearchIcon,
  Star as StarIcon,
  Copy as CopyIcon,
  ExternalLink as ExternalLinkIcon,
  SquarePen as SquarePenIcon,
  Trash2 as Trash2Icon,
  Tag as TagIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

const TIPOS_RECURSO = [
  {
    value: `nota`,
    label: `Nota`,
  },
  {
    value: `prompt`,
    label: `Prompt`,
  },
  {
    value: `plantilla`,
    label: `Plantilla`,
  },
  {
    value: `enlace`,
    label: `Enlace`,
  },
];
function ResourceModal({ open: e, resource: t, onClose: n, onSave: r }) {
  let [i, a] = useState({
      titulo: ``,
      tipo: `nota`,
      contenido: ``,
      etiquetas: [],
      paso_relacionado: `general`,
      favorito: false,
    }),
    [o, s] = useState(``);
  return (
    useEffect(() => {
      t
        ? (a({
            titulo: t.titulo || ``,
            tipo: t.tipo || `nota`,
            contenido: t.contenido || ``,
            etiquetas: t.etiquetas || [],
            paso_relacionado: t.paso_relacionado || `general`,
            favorito: t.favorito || false,
          }),
          s((t.etiquetas || []).join(`, `)))
        : (a({
            titulo: ``,
            tipo: `nota`,
            contenido: ``,
            etiquetas: [],
            paso_relacionado: `general`,
            favorito: false,
          }),
          s(``));
    }, [t, e]),
    e ? (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/70" onClick={n} />
        <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg font-semibold">
              {t ? `Editar recurso` : `Nuevo recurso`}
            </h3>
            <button
              onClick={n}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-4 space-y-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Título</label>
              <input
                value={i.titulo}
                onChange={(e) =>
                  a({
                    ...i,
                    titulo: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-lima/60 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Tipo</label>
                <select
                  value={i.tipo}
                  onChange={(e) =>
                    a({
                      ...i,
                      tipo: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-lima/60 focus:outline-none"
                >
                  {TIPOS_RECURSO.map((e) => (
                    <option value={e.value} key={e.value}>
                      {e.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Paso relacionado
                </label>
                <select
                  value={i.paso_relacionado}
                  onChange={(e) =>
                    a({
                      ...i,
                      paso_relacionado: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-lima/60 focus:outline-none"
                >
                  <option value="general">General</option>
                  {Array.from(
                    {
                      length: 8,
                    },
                    (e, t) => t + 1,
                  ).map((e) => (
                    <option value={String(e)} key={e}>
                      {"Paso "}
                      {e}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Contenido
              </label>
              <textarea
                value={i.contenido}
                onChange={(e) =>
                  a({
                    ...i,
                    contenido: e.target.value,
                  })
                }
                rows={6}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-lima/60 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Etiquetas (separadas por comas)
              </label>
              <input
                value={o}
                onChange={(e) => s(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-lima/60 focus:outline-none"
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={i.favorito}
                onChange={(e) =>
                  a({
                    ...i,
                    favorito: e.target.checked,
                  })
                }
                className="accent-lima"
              />
              Marcar como favorito
            </label>
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <button
              onClick={n}
              className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                r({
                  ...i,
                  etiquetas: o
                    .split(`,`)
                    .map((e) => e.trim())
                    .filter(Boolean),
                });
              }}
              className="rounded-lg bg-lima px-4 py-2 text-sm font-semibold text-black hover:brightness-110"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    ) : null
  );
}
const FILTROS = [
  {
    key: `todo`,
    label: `Todo`,
  },
  {
    key: `nota`,
    label: `Notas`,
  },
  {
    key: `prompt`,
    label: `Prompts`,
  },
  {
    key: `plantilla`,
    label: `Plantillas`,
  },
  {
    key: `enlace`,
    label: `Enlaces`,
  },
  {
    key: `favoritos`,
    label: `Favoritos`,
  },
];
export default function Biblioteca() {
  let [e, t] = useState([]),
    [n, r] = useState(true),
    [i, a] = useState(`todo`),
    [o, s] = useState(``),
    [c, l] = useState(``),
    [u, d] = useState(false),
    [f, p] = useState(null),
    m = () => {
      (r(true),
        base44.entities.Resource.list(`-updated_date`, 200)
          .then(t)
          .finally(() => r(false)));
    };
  useEffect(() => {
    m();
  }, []);
  let h = e.filter((e) => {
      if (
        (i === `favoritos` && !e.favorito) ||
        ([`nota`, `prompt`, `plantilla`, `enlace`].includes(i) &&
          e.tipo !== i) ||
        (c && e.paso_relacionado !== c)
      )
        return false;
      if (o) {
        let t = o.toLowerCase();
        if (!(
          e.titulo?.toLowerCase().includes(t) ||
          e.contenido?.toLowerCase().includes(t) ||
          (e.etiquetas || []).join(` `).toLowerCase().includes(t)
        ))
          return false;
      }
      return true;
    }),
    g = () => {
      (p(null), d(true));
    },
    v = (e) => {
      (p(e), d(true));
    },
    y = async (e) => {
      try {
        (f
          ? await base44.entities.Resource.update(f.id, e)
          : await base44.entities.Resource.create({
              ...e,
              es_del_sistema: false,
            }),
          d(false),
          m());
      } catch {
        alert(`No se pudo guardar.`);
      }
    },
    b = async (e) => {
      try {
        (await base44.entities.Resource.create({
          titulo: e.titulo + ` (copia)`,
          tipo: e.tipo,
          contenido: e.contenido,
          etiquetas: e.etiquetas || [],
          paso_relacionado: e.paso_relacionado,
          favorito: false,
          es_del_sistema: false,
        }),
          m());
      } catch {
        alert(`No se pudo duplicar.`);
      }
    },
    x = async (e) => {
      if (confirm(`¿Borrar este recurso?`))
        try {
          (await base44.entities.Resource.delete(e.id), m());
        } catch {
          alert(`No se pudo borrar.`);
        }
    },
    S = async (e) => {
      try {
        (await base44.entities.Resource.update(e.id, {
          favorito: !e.favorito,
        }),
          m());
      } catch {}
    },
    C = (e) => {
      (navigator.clipboard.writeText(e.contenido || ``), alert(`Copiado ✓`));
    };
  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:px-12">
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-lima/10 px-3 py-1 text-xs font-semibold text-lima">
            <LibraryIcon className="h-3.5 w-3.5" />
            {" Mi Biblioteca"}
          </div>
          <h1 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
            Notas, prompts y plantillas
          </h1>
        </div>
        <button
          onClick={g}
          className="inline-flex items-center gap-2 rounded-lg bg-lima px-4 py-2.5 text-sm font-semibold text-black hover:brightness-110"
        >
          <PlusIcon className="h-4 w-4" />
          {" Nuevo"}
        </button>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {FILTROS.map((e) => (
          <button
            onClick={() => a(e.key)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${i === e.key ? `bg-lima text-black` : `bg-card text-muted-foreground hover:text-white`}`}
            key={e.key}
          >
            {e.label}
          </button>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={o}
            onChange={(e) => s(e.target.value)}
            placeholder="Buscar…"
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-3 text-sm focus:border-lima/60 focus:outline-none"
          />
        </div>
        <select
          value={c}
          onChange={(e) => l(e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm focus:border-lima/60 focus:outline-none"
        >
          <option value="">Todos los pasos</option>
          <option value="general">General</option>
          {Array.from(
            {
              length: 8,
            },
            (e, t) => t + 1,
          ).map((e) => (
            <option value={String(e)} key={e}>
              {"Paso "}
              {e}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-6 space-y-3">
        {n && <p className="text-sm text-muted-foreground">Cargando…</p>}
        {!n && h.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No hay recursos. Crea el primero con «Nuevo».
          </p>
        )}
        {h.map((e) => (
          <div
            className="rounded-2xl border border-border bg-card p-5"
            key={e.id}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white/80">
                  {e.tipo}
                </span>
                {e.es_del_sistema && (
                  <span className="rounded-md bg-lima/15 px-2 py-0.5 text-[11px] font-semibold text-lima">
                    Código Libertad
                  </span>
                )}
                {e.paso_relacionado && e.paso_relacionado !== `general` && (
                  <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground">
                    {"Paso "}
                    {e.paso_relacionado}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => S(e)}
                  className="rounded-md p-1.5 hover:bg-secondary"
                >
                  <StarIcon
                    className={`h-4 w-4 ${e.favorito ? `fill-lima text-lima` : `text-muted-foreground`}`}
                  />
                </button>
                {(e.tipo === `prompt` || e.tipo === `plantilla`) && (
                  <button
                    onClick={() => C(e)}
                    title="Copiar"
                    className="rounded-md p-1.5 hover:bg-secondary"
                  >
                    <CopyIcon className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
                {e.tipo === `enlace` && e.contenido && (
                  <a
                    href={e.contenido}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Abrir"
                    className="rounded-md p-1.5 hover:bg-secondary"
                  >
                    <ExternalLinkIcon className="h-4 w-4 text-muted-foreground" />
                  </a>
                )}
                {!e.es_del_sistema && (
                  <>
                    <button
                      onClick={() => v(e)}
                      title="Editar"
                      className="rounded-md p-1.5 hover:bg-secondary"
                    >
                      <SquarePenIcon className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => x(e)}
                      title="Borrar"
                      className="rounded-md p-1.5 hover:bg-secondary"
                    >
                      <Trash2Icon className="h-4 w-4 text-muted-foreground hover:text-fucsia" />
                    </button>
                  </>
                )}
                {e.es_del_sistema && (
                  <button
                    onClick={() => b(e)}
                    title="Duplicar para personalizar"
                    className="rounded-md p-1.5 hover:bg-secondary"
                  >
                    <CopyIcon className="h-4 w-4 text-lima" />
                  </button>
                )}
              </div>
            </div>
            <h3 className="mt-2 font-heading font-semibold">{e.titulo}</h3>
            {e.contenido && (
              <p className="mt-1.5 whitespace-pre-wrap line-clamp-4 text-sm text-muted-foreground">
                {e.contenido}
              </p>
            )}
            {e.etiquetas?.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {e.etiquetas.map((e) => (
                  <span
                    className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground"
                    key={e}
                  >
                    <TagIcon className="h-2.5 w-2.5" /> {e}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <ResourceModal
        open={u}
        resource={f}
        onClose={() => d(false)}
        onSave={y}
      />
    </div>
  );
}
