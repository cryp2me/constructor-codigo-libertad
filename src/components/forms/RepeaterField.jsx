import { Trash2 as Trash2Icon, Plus as PlusIcon } from "lucide-react";

export function RepeaterField({
  label: e,
  fields: t,
  value: n = [],
  onChange: r,
}) {
  let i = () =>
      r([
        ...n,
        t.reduce(
          (e, t) => ({
            ...e,
            [t.key]: ``,
          }),
          {},
        ),
      ]),
    a = (e) => r(n.filter((t, n) => n !== e)),
    o = (e, t, i) =>
      r(
        n.map((n, r) =>
          r === e
            ? {
                ...n,
                [t]: i,
              }
            : n,
        ),
      );
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-white/90">
        {e}
      </label>
      <div className="space-y-2">
        {n.map((e, n) => (
          <div
            className="flex flex-wrap items-start gap-2 rounded-lg border border-border bg-background p-2.5"
            key={n}
          >
            {t.map((t) => (
              <input
                value={e[t.key] || ``}
                onChange={(e) => o(n, t.key, e.target.value)}
                placeholder={t.label}
                className="min-w-[120px] flex-1 rounded-md border border-border bg-card px-2.5 py-2 text-sm placeholder:text-muted-foreground/60 focus:border-lima/60 focus:outline-none"
                key={t.key}
              />
            ))}
            <button
              onClick={() => a(n)}
              className="rounded-md p-2 text-muted-foreground hover:text-fucsia"
            >
              <Trash2Icon className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={i}
        className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-dashed border-border px-3 py-1.5 text-sm text-muted-foreground hover:border-lima/50 hover:text-lima"
      >
        <PlusIcon className="h-3.5 w-3.5" />
        {" Añadir"}
      </button>
    </div>
  );
}
