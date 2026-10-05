import {
  LoaderCircle as LoaderCircleIcon,
  Brain as BrainIcon,
  Info as InfoIcon,
  Save as SaveIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { AiButton } from "@/components/AiButton";
import { FileUploader } from "@/components/forms/FileUploader";
import { ListField } from "@/components/forms/ListField";
import { RepeaterField } from "@/components/forms/RepeaterField";
import { Modal } from "@/components/Modal";
import { useAuth } from "@/lib/AuthContext";

const EMPTY_BRAND = {
  nombre_marca: ``,
  nombre_personal: ``,
  nicho: ``,
  subnicho: ``,
  cliente_ideal_quien: ``,
  cliente_ideal_duele: ``,
  cliente_ideal_desea: ``,
  cliente_ideal_objeciones: ``,
  transformacion_de: ``,
  transformacion_a: ``,
  propuesta_valor: ``,
  historia_personal: ``,
  pilares_contenido: [],
  tono_voz: ``,
  nivel_formalidad: `cercano`,
  expresiones_que_uso: [],
  muletillas: [],
  palabras_prohibidas: [],
  ejemplos_como_hablo: ``,
  palabras_clave_nicho: [],
  productos: [],
  lead_magnets: [],
  ctas_favoritos: [],
  colores_marca: [],
  tipografias: [],
  archivos: [],
  enlace_drive: ``,
};
const CAMPOS_CEREBRO = [
  `nombre_marca`,
  `nicho`,
  `cliente_ideal_quien`,
  `cliente_ideal_desea`,
  `propuesta_valor`,
  `tono_voz`,
  `pilares_contenido`,
  `palabras_clave_nicho`,
];
function inputProps(e, t, n) {
  return {
    value: e || ``,
    onChange: (e) => t(e.target.value),
    placeholder: n,
    className: `w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-white placeholder:text-muted-foreground/60 focus:border-lima/60 focus:outline-none`,
  };
}
function Section({ title: e, children: t }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="font-heading text-lg font-semibold text-lima">{e}</h2>
      <div className="mt-4 space-y-4">{t}</div>
    </div>
  );
}
export default function Marca() {
  let { user: e } = useAuth(),
    [t, n] = useState(EMPTY_BRAND),
    [r, i] = useState(null),
    [a, o] = useState(true),
    [s, c] = useState(false),
    [l, u] = useState(false),
    [d, f] = useState(false),
    [p, m] = useState(false),
    [h, g] = useState(``),
    [v, y] = useState(``),
    b = (e) => (t) =>
      n((n) => ({
        ...n,
        [e]: t,
      }));
  useEffect(() => {
    base44.entities.BrandProfile.list()
      .then((e) => {
        e[0] &&
          (i(e[0].id),
          n({
            ...EMPTY_BRAND,
            ...e[0],
          }));
      })
      .finally(() => o(false));
  }, []);
  let x = async () => {
      c(true);
      try {
        if (r) await base44.entities.BrandProfile.update(r, t);
        else {
          let e = await base44.entities.BrandProfile.create(t);
          i(e.id);
        }
        alert(`Marca guardada ✓`);
      } catch {
        alert(`No se pudo guardar.`);
      } finally {
        c(false);
      }
    },
    S = Math.round(
      (CAMPOS_CEREBRO.filter((e) => {
        let n = t[e];
        return Array.isArray(n) ? n.length > 0 : n && String(n).trim();
      }).length /
        CAMPOS_CEREBRO.length) *
        100,
    ),
    C = async () => {
      m(true);
      try {
        let e = await base44.functions.invoke(`aiMarca`, {
            action: `voz`,
            ejemplos: h,
          }),
          t = e.data || e;
        (n((e) => ({
          ...e,
          tono_voz: t.tono_voz || e.tono_voz,
          expresiones_que_uso: t.expresiones_que_uso || e.expresiones_que_uso,
          muletillas: t.muletillas || e.muletillas,
          nivel_formalidad: t.nivel_formalidad || e.nivel_formalidad,
        })),
          u(false),
          alert(
            `Voz definida. Revisa los campos y guarda. ` +
              (t.resumen ? `\n\n${t.resumen}` : ``),
          ));
      } catch {
        alert(`La IA no pudo analizar los textos. Inténtalo de nuevo.`);
      } finally {
        m(false);
      }
    },
    w = async () => {
      m(true);
      try {
        let e = await base44.functions.invoke(`aiMarca`, {
            action: `cliente_ideal`,
            notas: v,
          }),
          t = e.data || e;
        (n((e) => ({
          ...e,
          cliente_ideal_quien: t.cliente_ideal_quien || e.cliente_ideal_quien,
          cliente_ideal_duele: t.cliente_ideal_duele || e.cliente_ideal_duele,
          cliente_ideal_desea: t.cliente_ideal_desea || e.cliente_ideal_desea,
          cliente_ideal_objeciones:
            t.cliente_ideal_objeciones || e.cliente_ideal_objeciones,
        })),
          f(false),
          alert(`Cliente ideal redactado. Revisa los campos y guarda.`));
      } catch {
        alert(`La IA no pudo redactar el cliente ideal. Inténtalo de nuevo.`);
      } finally {
        m(false);
      }
    };
  return a ? (
    <div className="flex h-full items-center justify-center">
      <LoaderCircleIcon className="h-6 w-6 animate-spin text-lima" />
    </div>
  ) : (
    <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 lg:px-12">
      <div className="animate-fade-in">
        <div className="inline-flex items-center gap-2 rounded-full bg-lima/10 px-3 py-1 text-xs font-semibold text-lima">
          <BrainIcon className="h-3.5 w-3.5" />
          {" Mi Marca"}
        </div>
        <h1 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
          El cerebro de tu IA
        </h1>
        <div className="mt-3 flex items-start gap-2 rounded-xl border border-fucsia/30 bg-fucsia/5 p-3.5 text-sm text-white/90">
          <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-fucsia" />
          <p>
            Todo lo que pongas aquí lo usa la IA del Constructor para escribir
            como tú. Cuanto más completo, mejores resultados.
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between rounded-xl border border-border bg-card p-4">
          <span className="text-sm font-medium">Cerebro completado</span>
          <div className="flex items-center gap-3">
            <div className="h-2 w-32 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-lima transition-all"
                style={{
                  width: `${S}%`,
                }}
              />
            </div>
            <span className="font-heading text-lg font-bold text-lima">
              {S}%
            </span>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <AiButton onClick={() => u(true)} disabled={p}>
          Ayúdame a definir mi voz
        </AiButton>
        <AiButton onClick={() => f(true)} disabled={p}>
          Ayúdame con mi cliente ideal
        </AiButton>
      </div>
      <div className="mt-6 space-y-5">
        <Section title="Identidad">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Nombre de marca
              </label>
              <input
                {...inputProps(
                  t.nombre_marca,
                  b(`nombre_marca`),
                  `Ej. Código Libertad`,
                )}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Nombre personal
              </label>
              <input
                {...inputProps(
                  t.nombre_personal,
                  b(`nombre_personal`),
                  `Tu nombre`,
                )}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Nicho</label>
              <input
                {...inputProps(t.nicho, b(`nicho`), `Ej. marketing digital`)}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Subnicho
              </label>
              <input
                {...inputProps(
                  t.subnicho,
                  b(`subnicho`),
                  `Ej. contenido para creadores`,
                )}
              />
            </div>
          </div>
        </Section>
        <Section title="Cliente ideal">
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              ¿Quién es?
            </label>
            <textarea
              {...inputProps(
                t.cliente_ideal_quien,
                b(`cliente_ideal_quien`),
                `Edad, situación, contexto…`,
              )}
              rows={2}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Qué le duele
              </label>
              <textarea
                {...inputProps(t.cliente_ideal_duele, b(`cliente_ideal_duele`))}
                rows={2}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Qué desea
              </label>
              <textarea
                {...inputProps(t.cliente_ideal_desea, b(`cliente_ideal_desea`))}
                rows={2}
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Objeciones que pone
            </label>
            <textarea
              {...inputProps(
                t.cliente_ideal_objeciones,
                b(`cliente_ideal_objeciones`),
              )}
              rows={2}
            />
          </div>
        </Section>
        <Section title="Transformación">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                De dónde viene
              </label>
              <textarea
                {...inputProps(t.transformacion_de, b(`transformacion_de`))}
                rows={2}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                A dónde lo llevas
              </label>
              <textarea
                {...inputProps(t.transformacion_a, b(`transformacion_a`))}
                rows={2}
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Propuesta de valor
            </label>
            <textarea
              {...inputProps(t.propuesta_valor, b(`propuesta_valor`))}
              rows={2}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Historia personal (breve)
            </label>
            <textarea
              {...inputProps(t.historia_personal, b(`historia_personal`))}
              rows={3}
            />
          </div>
        </Section>
        <Section title="Voz y estilo">
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Tono de voz
            </label>
            <textarea {...inputProps(t.tono_voz, b(`tono_voz`))} rows={2} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Nivel de formalidad
            </label>
            <select
              value={t.nivel_formalidad}
              onChange={(e) => b(`nivel_formalidad`)(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-lima/60 focus:outline-none"
            >
              {[`cercano`, `profesional`, `gamberro`, `inspirador`].map((e) => (
                <option value={e} key={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <ListField
              label="Expresiones que uso"
              value={t.expresiones_que_uso}
              onChange={b(`expresiones_que_uso`)}
            />
            <ListField
              label="Muletillas"
              value={t.muletillas}
              onChange={b(`muletillas`)}
            />
            <ListField
              label="Palabras prohibidas"
              value={t.palabras_prohibidas}
              onChange={b(`palabras_prohibidas`)}
            />
            <ListField
              label="CTAs favoritos"
              value={t.ctas_favoritos}
              onChange={b(`ctas_favoritos`)}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Ejemplos de cómo hablo (textos o transcripciones)
            </label>
            <textarea
              {...inputProps(
                t.ejemplos_como_hablo,
                b(`ejemplos_como_hablo`),
                `Pega aquí textos o transcripciones tuyos…`,
              )}
              rows={4}
            />
          </div>
        </Section>
        <Section title="Pilares y palabras clave">
          <ListField
            label="Pilares de contenido (3-5 temas)"
            value={t.pilares_contenido}
            onChange={b(`pilares_contenido`)}
          />
          <ListField
            label="Palabras clave del nicho (para hacking)"
            value={t.palabras_clave_nicho}
            onChange={b(`palabras_clave_nicho`)}
          />
        </Section>
        <Section title="Productos y lead magnets">
          <RepeaterField
            label="Productos"
            fields={[
              {
                key: `nombre`,
                label: `Nombre`,
              },
              {
                key: `precio`,
                label: `Precio`,
              },
              {
                key: `enlace`,
                label: `Enlace`,
              },
            ]}
            value={t.productos}
            onChange={b(`productos`)}
          />
          <RepeaterField
            label="Lead magnets"
            fields={[
              {
                key: `nombre`,
                label: `Nombre`,
              },
              {
                key: `descripcion`,
                label: `Descripción`,
              },
              {
                key: `enlace`,
                label: `Enlace`,
              },
            ]}
            value={t.lead_magnets}
            onChange={b(`lead_magnets`)}
          />
        </Section>
        <Section title="Identidad visual">
          <div className="grid gap-4 sm:grid-cols-2">
            <ListField
              label="Colores de marca (hex)"
              value={t.colores_marca}
              onChange={b(`colores_marca`)}
              placeholder="#C6FF00"
            />
            <ListField
              label="Tipografías"
              value={t.tipografias}
              onChange={b(`tipografias`)}
            />
          </div>
          <FileUploader value={t.archivos} onChange={b(`archivos`)} />
        </Section>
        <Section title="Drive">
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Enlace de tu carpeta de Google Drive
            </label>
            <input
              {...inputProps(
                t.enlace_drive,
                b(`enlace_drive`),
                `https://drive.google.com/…`,
              )}
            />
          </div>
        </Section>
      </div>
      <div className="mt-6 sticky bottom-4">
        <button
          onClick={x}
          disabled={s}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-lima px-5 py-3 font-semibold text-black transition-all hover:brightness-110 disabled:opacity-50"
        >
          {s ? (
            <LoaderCircleIcon className="h-4 w-4 animate-spin" />
          ) : (
            <SaveIcon className="h-4 w-4" />
          )}
          {s ? `Guardando…` : `Guardar marca`}
        </button>
      </div>
      <Modal open={l} onClose={() => u(false)} title="Ayúdame a definir mi voz">
        <p className="text-sm text-muted-foreground">
          Pega 3 a 5 textos o transcripciones tuyas. La IA extraerá tu tono,
          expresiones, muletillas y nivel de formalidad, y rellenará los campos
          de voz para que los revises.
        </p>
        <textarea
          value={h}
          onChange={(e) => g(e.target.value)}
          rows={8}
          placeholder="Pega aquí tus textos…"
          className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-lima/60 focus:outline-none"
        />
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => u(false)}
            className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary"
          >
            Cancelar
          </button>
          <AiButton onClick={C} loading={p}>
            Analizar mi voz
          </AiButton>
        </div>
      </Modal>
      <Modal
        open={d}
        onClose={() => f(false)}
        title="Ayúdame con mi cliente ideal"
      >
        <p className="text-sm text-muted-foreground">
          Cuéntale a la IA sobre tu cliente ideal (opcional). Usará tu marca y
          nicho para redactar el perfil.
        </p>
        <textarea
          value={v}
          onChange={(e) => y(e.target.value)}
          rows={5}
          placeholder="Notas sobre tu cliente ideal…"
          className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-lima/60 focus:outline-none"
        />
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => f(false)}
            className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary"
          >
            Cancelar
          </button>
          <AiButton onClick={w} loading={p}>
            Redactar cliente ideal
          </AiButton>
        </div>
      </Modal>
    </div>
  );
}
