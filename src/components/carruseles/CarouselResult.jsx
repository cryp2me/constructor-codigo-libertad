import {
  Sparkles as SparklesIcon,
  Save as SaveIcon,
  BookMarked as BookMarkedIcon,
  FolderUp as FolderUpIcon,
} from "lucide-react";
import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useToast } from "@/components/ui/use-toast";

export function CarouselResult({
  result: e,
  onSave: t,
  saving: n,
  savedPiece: r,
  onGuardarBiblioteca: i,
  savingBib: a,
  bibliotecaGuardada: o,
  onDrive: s,
  savingDrive: c,
  driveGuardado: l,
}) {
  let [u, d] = useState(``),
    { toast: f } = useToast();
  if (!e) return null;
  let p = [
    `HOOK: ${e.hook}`,
    ...e.slides.map((e, t) => `Slide ${t + 1} — ${e.titulo}: ${e.texto}`),
    `CTA: ${e.cta}`,
  ].join(`
`);
  return (
    <div className="mt-8 animate-fade-in space-y-6">
      <div className="rounded-2xl border border-fucsia/40 bg-fucsia/5 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-fucsia">
            Hook · slide 1
          </span>
          <CopyButton texto={e.hook} />
        </div>
        <p className="mt-2 font-heading text-xl font-bold">{e.hook}</p>
      </div>
      <div>
        <h4 className="font-heading font-semibold text-lima">
          Diapositivas ({e.slides.length})
        </h4>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {e.slides.map((e, t) => (
            <div
              className="rounded-xl border border-border bg-card p-4"
              key={t}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-secondary text-xs font-bold text-lima">
                  {t + 1}
                </span>
                <CopyButton
                  texto={`${e.titulo}\n${e.texto}`}
                  label="Copiar slide"
                />
              </div>
              <p className="mt-2 font-heading font-semibold">{e.titulo}</p>
              <p className="mt-1 text-sm text-muted-foreground">{e.texto}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-heading font-semibold text-lima">Caption</h4>
            <CopyButton texto={e.caption} />
          </div>
          <p className="mt-2 whitespace-pre-line text-sm text-white/90">
            {e.caption}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-heading font-semibold text-lima">
              CTA · palabra clave
            </h4>
            <CopyButton
              texto={`${e.cta}\nPalabra clave: ${e.palabra_clave_cta}`}
            />
          </div>
          <p className="mt-2 text-sm text-white/90">{e.cta}</p>
          <p className="mt-2 inline-block rounded-lg bg-lima/10 px-2.5 py-1 text-sm font-bold text-lima">
            {e.palabra_clave_cta}
          </p>
        </div>
      </div>
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-heading font-semibold text-lima">
            Prompt de diseño (para ChatGPT, Gemini o Claude)
          </h4>
          <CopyButton texto={e.prompt_diseno} />
        </div>
        <pre className="mt-2 max-h-60 overflow-auto whitespace-pre-wrap rounded-lg bg-secondary p-3 text-xs text-white/90 scrollbar-thin">
          {e.prompt_diseno}
        </pre>
        {e.notas && (
          <p className="mt-3 text-xs text-muted-foreground">
            <SparklesIcon className="mr-1 inline h-3.5 w-3.5 text-fucsia" />
            {e.notas}
          </p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <CopyButton texto={p} label="Copiar guion completo" />
        <button
          onClick={t}
          disabled={n || !!r}
          className="inline-flex items-center gap-2 rounded-lg bg-lima px-4 py-2.5 text-sm font-semibold text-black hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SaveIcon className="h-4 w-4" />{" "}
          {r
            ? `Guardada en tu plan ✓`
            : n
              ? `Guardando…`
              : `Guardar en mi plan`}
        </button>
        <button
          onClick={i}
          disabled={a || o}
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-white/80 hover:border-lima/50 hover:text-lima disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <BookMarkedIcon className="h-4 w-4" />{" "}
          {o
            ? `En tu biblioteca ✓`
            : a
              ? `Guardando…`
              : `Guardar en Mi Biblioteca`}
        </button>
      </div>
      {r && (
        <div className="rounded-2xl border border-border bg-card p-5">
          <h4 className="font-heading font-semibold text-lima">
            Sube las imágenes a tu Drive
          </h4>
          <p className="mt-1 text-sm text-muted-foreground">
            Diseña el carrusel con el prompt, sube las imágenes a tu Drive y
            pega aquí el enlace.
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <input
              value={u}
              onChange={(e) => d(e.target.value)}
              placeholder="https://drive.google.com/..."
              className="flex-1 rounded-lg border border-input bg-secondary px-3 py-2.5 text-sm outline-none focus:border-lima"
            />
            <button
              onClick={() => s(u, f)}
              disabled={c || !u.trim() || l}
              className="inline-flex items-center gap-2 rounded-lg bg-fucsia px-4 py-2.5 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FolderUpIcon className="h-4 w-4" />{" "}
              {l ? `Enlazado ✓` : c ? `Guardando…` : `Guardar enlace`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
