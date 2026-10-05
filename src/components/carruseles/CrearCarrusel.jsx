import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { AiButton } from "@/components/AiButton";
import { CarouselResult } from "@/components/carruseles/CarouselResult";

const TIPOS_GUION = [
  [`educativo`, `Educativo`],
  [`lista`, `Lista`],
  [`storytelling`, `Storytelling`],
  [`problema-solución`, `Problema-Solución`],
  [`contrarian`, `Contrarian`],
  [`paso a paso`, `Paso a paso`],
  [`antes-después`, `Antes-Después`],
  [`mito-realidad`, `Mito-Realidad`],
  [`checklist`, `Checklist`],
  [`caso de éxito`, `Caso de éxito`],
];
export function CrearCarrusel() {
  let [e, t] = useState({
      idea: ``,
      tipo: `educativo`,
      objetivo: `alcance`,
      num: `auto`,
      tono: `auto`,
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
      if (!(!e.idea.trim() || n)) {
        (r(true), a(null), l(null), p(false), v(false));
        try {
          let t = await base44.functions.invoke(`aiCarrusel`, {
            action: `generar`,
            idea: e.idea,
            tipo: e.tipo,
            objetivo: e.objetivo,
            num_slides: e.num === `auto` ? 8 : Number(e.num),
            tono: e.tono,
          });
          if (t.data.error) throw Error(t.data.error);
          a(t.data);
        } catch (e) {
          alert(e.message || `No se pudo generar el carrusel.`);
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
`),
    S = async () => {
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
          origen: `idea propia`,
          notas: `Generado en Paso 5 · tipo: ${i.tipo_carrusel || e.tipo}`,
        });
        l(t);
      } catch {
        alert(`No se pudo guardar la pieza.`);
      } finally {
        s(false);
      }
    },
    C = async () => {
      d(true);
      try {
        (await base44.entities.Resource.create({
          titulo: `Carrusel: ${i.hook}`.slice(0, 80),
          tipo: `plantilla`,
          contenido:
            x(i) +
            `\n\nCAPTION:\n${i.caption}\n\nPROMPT DE DISEÑO:\n${i.prompt_diseno}`,
          etiquetas: [`carrusel`],
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
    },
    w = async (e, t) => {
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
    },
    T = `w-full rounded-lg border border-input bg-secondary px-3 py-2.5 text-sm outline-none focus:border-lima`;
  return (
    <div>
      <p className="text-sm text-muted-foreground">
        Danos una idea y construimos el carrusel completo con tu voz de marca:
        hook, diapositivas, caption, CTA y prompt de diseño.
      </p>
      <div className="mt-4 space-y-3">
        <textarea
          value={e.idea}
          onChange={y(`idea`)}
          rows={3}
          placeholder="¿Sobre qué quieres crear tu carrusel? Ej: los 3 errores que cometen mis clientes al empezar"
          className="w-full rounded-lg border border-input bg-secondary px-3 py-2.5 text-sm outline-none focus:border-lima"
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">
              Tipo de carrusel
            </span>
            <select value={e.tipo} onChange={y(`tipo`)} className={T}>
              {TIPOS_GUION.map(([e, t]) => (
                <option value={e} key={e}>
                  {t}
                </option>
              ))}
              <option value="auto">Que decida la IA</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">
              Objetivo
            </span>
            <select value={e.objetivo} onChange={y(`objetivo`)} className={T}>
              <option value="alcance">Alcance</option>
              <option value="comunidad">Comunidad</option>
              <option value="venta">Venta</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">
              Nº de slides
            </span>
            <select value={e.num} onChange={y(`num`)} className={T}>
              <option value="auto">Automático</option>
              <option value="5">5</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="10">10</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">
              Tono
            </span>
            <select value={e.tono} onChange={y(`tono`)} className={T}>
              <option value="auto">El de mi marca</option>
              <option value="cercano">Cercano</option>
              <option value="profesional">Profesional</option>
              <option value="gamberro">Gamberro</option>
              <option value="inspirador">Inspirador</option>
            </select>
          </label>
        </div>
        <AiButton
          onClick={b}
          loading={n}
          disabled={!e.idea.trim()}
          className="!px-5 !py-2.5 text-sm"
        >
          Generar carrusel
        </AiButton>
      </div>
      <CarouselResult
        result={i}
        onSave={S}
        saving={o}
        savedPiece={c}
        onGuardarBiblioteca={C}
        savingBib={u}
        bibliotecaGuardada={f}
        onDrive={w}
        savingDrive={m}
        driveGuardado={g}
      />
    </div>
  );
}
