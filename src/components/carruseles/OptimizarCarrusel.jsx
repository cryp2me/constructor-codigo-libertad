import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { AiButton } from "@/components/AiButton";
import { CarouselResult } from "@/components/carruseles/CarouselResult";

export function OptimizarCarrusel() {
  let [e, t] = useState({
      contenido: ``,
      objetivo: `alcance`,
    }),
    [n, r] = useState(false),
    [i, a] = useState(null),
    [o, s] = useState(false),
    [c, l] = useState(null),
    [u, d] = useState(false),
    [f, p] = useState(false),
    [m, h] = useState(false),
    [g, v] = useState(false),
    y = (e) => (n) =>
      t((t) => ({
        ...t,
        [e]: n.target.value,
      })),
    b = async () => {
      if (!(!e.contenido.trim() || n)) {
        (r(true), a(null), l(null), p(false), v(false));
        try {
          let t = await base44.functions.invoke(`aiCarrusel`, {
            action: `modelar`,
            contenido: e.contenido,
            objetivo: e.objetivo,
          });
          if (t.data.error) throw Error(t.data.error);
          a(t.data);
        } catch (e) {
          alert(e.message || `No se pudo modelar el carrusel.`);
        } finally {
          r(false);
        }
      }
    },
    x = (e) =>
      [
        `HOOK: ${e.hook}`,
        ...e.slides.map((e, t) => `Slide ${t + 1} — ${e.titulo}: ${e.texto}`),
        `CTA: ${e.cta}`,
      ].join(`
`);
  return (
    <div>
      <p className="text-sm text-muted-foreground">
        Pega el guion, transcripción o texto de un carrusel que ya funciona y lo
        reescribimos con tu voz, tu nicho y tu estructura de venta.
      </p>
      <div className="mt-4 space-y-3">
        <textarea
          value={e.contenido}
          onChange={y(`contenido`)}
          rows={7}
          placeholder="Pega aquí el contenido del carrusel a modelar: hook, diapositivas, caption…"
          className="w-full rounded-lg border border-input bg-secondary px-3 py-2.5 text-sm outline-none focus:border-lima"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">
              Objetivo
            </span>
            <select
              value={e.objetivo}
              onChange={y(`objetivo`)}
              className="w-full rounded-lg border border-input bg-secondary px-3 py-2.5 text-sm outline-none focus:border-lima"
            >
              <option value="alcance">Alcance</option>
              <option value="comunidad">Comunidad</option>
              <option value="venta">Venta</option>
            </select>
          </label>
        </div>
        <AiButton
          onClick={b}
          loading={n}
          disabled={!e.contenido.trim()}
          className="!px-5 !py-2.5 text-sm"
        >
          Modelar carrusel
        </AiButton>
      </div>
      <CarouselResult
        result={i}
        onSave={async () => {
          s(true);
          try {
            let t = await base44.entities.ContentPiece.create({
              hook: i.hook,
              guion_modelado: x(i),
              caption: i.caption,
              cta: i.cta,
              palabra_clave_cta: i.palabra_clave_cta,
              formato: `carrusel`,
              objetivo: e.objetivo,
              estado: `guion listo`,
              origen: `hacking`,
              notas: `Modelado en el Constructor · tipo: ${i.tipo_carrusel || `carrusel`}`,
            });
            l(t);
          } catch {
            alert(`No se pudo guardar la pieza.`);
          } finally {
            s(false);
          }
        }}
        saving={o}
        savedPiece={c}
        onGuardarBiblioteca={async () => {
          d(true);
          try {
            (await base44.entities.Resource.create({
              titulo: `Carrusel modelado: ${i.hook}`.slice(0, 80),
              tipo: `plantilla`,
              contenido:
                x(i) +
                `\n\nCAPTION:\n${i.caption}\n\nPROMPT DE DISEÑO:\n${i.prompt_diseno}`,
              etiquetas: [`carrusel`, `modelado`],
              paso_relacionado: `5`,
              favorito: false,
              es_del_sistema: false,
            }),
              p(true));
          } catch {
            alert(`No se pudo guardar en la biblioteca.`);
          } finally {
            d(false);
          }
        }}
        savingBib={u}
        bibliotecaGuardada={f}
        onDrive={async (e, t) => {
          h(true);
          try {
            (await base44.entities.ContentPiece.update(c.id, {
              enlace_drive: e.trim(),
              estado: `subido a Drive`,
            }),
              v(true),
              t({
                description: `Enlace de Drive guardado en la pieza.`,
              }));
          } catch {
            t({
              description: `No se pudo guardar el enlace.`,
              variant: `destructive`,
            });
          } finally {
            h(false);
          }
        }}
        savingDrive={m}
        driveGuardado={g}
      />
    </div>
  );
}
