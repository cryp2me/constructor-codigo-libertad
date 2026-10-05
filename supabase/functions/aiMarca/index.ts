// aiMarca: rellena el "cerebro" de marca a partir de material en bruto.
//   action "voz"           -> { ejemplos: string[] | string }  => tono, expresiones, muletillas…
//   action "cliente_ideal" -> { notas: string }                => quién, dolores, deseos, objeciones
import { corsHeaders, json } from "../_shared/cors.ts";
import { brandBlock, userContext } from "../_shared/context.ts";
import { generateJson, obj, str, strArr } from "../_shared/llm.ts";

const BASE =
  "Eres estratega de marca personal y copywriter senior del método CVM de Código Libertad " +
  "(Crea, Viraliza, Monetiza). Escribes en español de España, concreto y sin relleno. " +
  "Nunca inventas datos que el usuario no haya dado; si falta información, deduces lo razonable del nicho.";

const VOZ_SCHEMA = obj({
  tono_voz: str,
  expresiones_que_uso: strArr,
  muletillas: strArr,
  nivel_formalidad: { type: "string", enum: ["muy cercano", "cercano", "neutro", "formal"] },
  resumen: str,
});

const CLIENTE_SCHEMA = obj({
  cliente_ideal_quien: str,
  cliente_ideal_duele: str,
  cliente_ideal_desea: str,
  cliente_ideal_objeciones: str,
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const ctx = await userContext(req);
    if (!ctx) return json({ error: "Inicia sesión para usar la IA." }, 401);
    const body = await req.json();
    const marca = brandBlock(ctx.brand);

    if (body.action === "voz") {
      const ejemplos = Array.isArray(body.ejemplos) ? body.ejemplos.join("\n---\n") : String(body.ejemplos ?? "");
      if (!ejemplos.trim()) return json({ error: "Pega al menos un texto tuyo." }, 400);
      const out = await generateJson(ctx.provider, {
        schemaName: "voz_marca",
        schema: VOZ_SCHEMA,
        system: BASE,
        user:
          `${marca}\n\nTEXTOS REALES DEL CREADOR\n${ejemplos}\n\n` +
          "Analiza cómo habla esta persona y define su voz para que la IA del Constructor escriba como ella:\n" +
          "- tono_voz: 2-3 frases sobre registro, ritmo y actitud.\n" +
          "- expresiones_que_uso: 4-8 expresiones o giros característicos, tomados o inferidos de los textos.\n" +
          "- muletillas: palabras o coletillas que repite (literal, cortas).\n" +
          "- nivel_formalidad: uno de los valores permitidos.\n" +
          "- resumen: una frase que defina la voz.",
      });
      return json(out);
    }

    if (body.action === "cliente_ideal") {
      const notas = String(body.notas ?? "");
      if (!notas.trim()) return json({ error: "Escribe unas notas sobre tu cliente." }, 400);
      const out = await generateJson(ctx.provider, {
        schemaName: "cliente_ideal",
        schema: CLIENTE_SCHEMA,
        system: BASE,
        user:
          `${marca}\n\nNOTAS SUELTAS DEL CREADOR SOBRE SU CLIENTE\n${notas}\n\n` +
          "Redacta el perfil de cliente ideal hablándole de tú, con detalles concretos (edad, situación, cifras si las hay):\n" +
          "- cliente_ideal_quien: quién es y en qué momento está.\n" +
          "- cliente_ideal_duele: lo que le frustra hoy, en sus palabras.\n" +
          "- cliente_ideal_desea: el resultado que quiere conseguir.\n" +
          "- cliente_ideal_objeciones: 3-4 objeciones típicas separadas por punto y coma.",
      });
      return json(out);
    }

    return json({ error: "Acción no válida" }, 400);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Error inesperado" }, 500);
  }
});
