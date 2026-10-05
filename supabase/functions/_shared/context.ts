import { createClient, type SupabaseClient } from "npm:@supabase/supabase-js@2";
import { resolveModel } from "./models.ts";

// Cliente con el JWT del usuario: RLS garantiza que solo lee sus filas.
export async function userContext(req: Request) {
  const supabase: SupabaseClient = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } } },
  );
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const [{ data: brand }, { data: settings }] = await Promise.all([
    supabase.from("brand_profiles").select("*").order("created_date").limit(1).maybeSingle(),
    supabase.from("user_settings").select("ai_model").maybeSingle(),
  ]);

  return { user, brand: brand ?? null, model: resolveModel(settings?.ai_model) };
}

const list = (v: unknown) =>
  Array.isArray(v)
    ? v.map((x) => (typeof x === "object" && x ? (x as { nombre?: string }).nombre ?? JSON.stringify(x) : String(x)))
        .filter(Boolean).join(", ")
    : "";

// Convierte el perfil de marca en el bloque de contexto que se inyecta en
// cada prompt. Solo incluye los campos rellenos.
export function brandBlock(brand: Record<string, unknown> | null): string {
  if (!brand) return "No hay perfil de marca: escribe con un tono cercano y directo, en español de España.";
  const fields: [string, unknown][] = [
    ["Marca", brand.nombre_marca],
    ["Creador", brand.nombre_personal],
    ["Nicho", brand.nicho],
    ["Subnicho", brand.subnicho],
    ["Propuesta de valor", brand.propuesta_valor],
    ["Cliente ideal", brand.cliente_ideal_quien],
    ["Dolores", brand.cliente_ideal_duele],
    ["Deseos", brand.cliente_ideal_desea],
    ["Objeciones", brand.cliente_ideal_objeciones],
    ["Transformación", brand.transformacion_de && brand.transformacion_a ? `de ${brand.transformacion_de} a ${brand.transformacion_a}` : ""],
    ["Historia personal", brand.historia_personal],
    ["Pilares de contenido", list(brand.pilares_contenido)],
    ["Tono de voz", brand.tono_voz],
    ["Formalidad", brand.nivel_formalidad],
    ["Expresiones que usa", list(brand.expresiones_que_uso)],
    ["Muletillas", list(brand.muletillas)],
    ["Ejemplo de cómo habla", brand.ejemplos_como_hablo],
    ["Palabras PROHIBIDAS (no usarlas nunca)", list(brand.palabras_prohibidas)],
    ["Palabras clave del nicho", list(brand.palabras_clave_nicho)],
    ["CTAs favoritos", list(brand.ctas_favoritos)],
    ["Productos", list(brand.productos)],
    ["Lead magnets", list(brand.lead_magnets)],
    ["Colores de marca", list(brand.colores_marca)],
    ["Tipografías", list(brand.tipografias)],
  ];
  const lines = fields.filter(([, v]) => v && String(v).trim()).map(([k, v]) => `- ${k}: ${v}`);
  return lines.length ? `PERFIL DE MARCA\n${lines.join("\n")}` : brandBlock(null);
}
