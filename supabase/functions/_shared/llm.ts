// Capa única de IA vía OpenRouter: una sola API (compatible con OpenAI) da
// acceso a Claude, GPT, Gemini, Grok y DeepSeek con el mismo prompt y el
// mismo JSON Schema. El modelo lo elige cada usuario en Ajustes.
import OpenAI from "npm:openai";

export interface JsonTask {
  system: string;
  user: string;
  schemaName: string;
  schema: Record<string, unknown>;
}

// Hoy la clave es la del proyecto. Para que cada usuario pague su uso
// (OAuth de OpenRouter) basta con devolver aquí su clave guardada.
function apiKeyFor(_userId: string): string {
  const key = Deno.env.get("OPENROUTER_API_KEY");
  if (!key) throw new Error("Falta OPENROUTER_API_KEY en los secretos de Supabase.");
  return key;
}

export async function generateJson<T>(userId: string, model: string, task: JsonTask): Promise<T> {
  const client = new OpenAI({
    apiKey: apiKeyFor(userId),
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: { "HTTP-Referer": "https://constructor-cvm.app", "X-Title": "Constructor CVM" },
  });

  const required = (task.schema.required as string[]) ?? [];
  let lastError = "";

  // Un reintento si el JSON llega mal formado o incompleto.
  for (let attempt = 0; attempt < 2; attempt++) {
    const completion = await client.chat.completions.create({
      model,
      max_tokens: 16000,
      response_format: {
        type: "json_schema",
        json_schema: { name: task.schemaName, schema: task.schema, strict: true },
      },
      // Solo proveedores que respeten response_format.
      // @ts-expect-error parámetro específico de OpenRouter
      provider: { require_parameters: true },
      messages: [
        { role: "system", content: task.system },
        { role: "user", content: task.user },
      ],
    });

    const choice = completion.choices[0];
    if (choice?.message?.refusal) throw new Error("La IA ha rechazado esta petición. Reformúlala e inténtalo de nuevo.");
    if (choice?.finish_reason === "length") {
      lastError = "La respuesta de la IA se ha cortado.";
      continue;
    }
    try {
      const raw = (choice?.message?.content ?? "").replace(/^```(?:json)?\s*|\s*```$/g, "");
      const parsed = JSON.parse(raw);
      const missing = required.filter((k) => !(k in parsed));
      if (missing.length) throw new Error(`faltan campos: ${missing.join(", ")}`);
      return parsed as T;
    } catch (e) {
      lastError = `La IA devolvió un formato no válido (${e instanceof Error ? e.message : e}).`;
    }
  }
  throw new Error(`${lastError} Inténtalo de nuevo.`);
}

// Helpers de JSON Schema estricto (additionalProperties:false y todos los
// campos en required, como exigen los modos estrictos).
export const str = { type: "string" };
export const strArr = { type: "array", items: { type: "string" } };
export function obj(properties: Record<string, unknown>) {
  return { type: "object", properties, required: Object.keys(properties), additionalProperties: false };
}
