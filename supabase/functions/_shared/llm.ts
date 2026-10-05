// Capa única de IA: el mismo prompt y el mismo JSON Schema funcionan con
// Claude (Anthropic) o ChatGPT (OpenAI). El proveedor se elige por usuario
// (tabla user_settings) con AI_PROVIDER como valor por defecto.
import Anthropic from "npm:@anthropic-ai/sdk";
import OpenAI from "npm:openai";

export type Provider = "anthropic" | "openai";

export interface JsonTask {
  system: string;
  user: string;
  schemaName: string;
  schema: Record<string, unknown>;
}

const ANTHROPIC_MODEL = Deno.env.get("ANTHROPIC_MODEL") ?? "claude-opus-5-5";
const OPENAI_MODEL = Deno.env.get("OPENAI_MODEL") ?? "gpt-4o";

export function defaultProvider(): Provider {
  return Deno.env.get("AI_PROVIDER") === "openai" ? "openai" : "anthropic";
}

export async function generateJson<T>(provider: Provider, task: JsonTask): Promise<T> {
  return provider === "openai" ? await viaOpenAI<T>(task) : await viaAnthropic<T>(task);
}

async function viaAnthropic<T>(task: JsonTask): Promise<T> {
  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) throw new Error("Falta ANTHROPIC_API_KEY en los secretos de Supabase.");
  const client = new Anthropic({ apiKey });

  const response = await client.beta.messages.create({
    model: ANTHROPIC_MODEL,
    max_tokens: 16000,
    // Si el modelo rechaza la petición, el servidor la reintenta con otro modelo.
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: {
      effort: "medium",
      format: { type: "json_schema", schema: task.schema },
    },
    system: task.system,
    messages: [{ role: "user", content: task.user }],
  });

  if (response.stop_reason === "refusal") {
    throw new Error("La IA ha rechazado esta petición. Reformúlala e inténtalo de nuevo.");
  }
  if (response.stop_reason === "max_tokens") {
    throw new Error("La respuesta de la IA se ha cortado. Inténtalo de nuevo.");
  }
  const text = response.content.find((b) => b.type === "text");
  if (!text || text.type !== "text") throw new Error("La IA no ha devuelto contenido.");
  return JSON.parse(text.text) as T;
}

async function viaOpenAI<T>(task: JsonTask): Promise<T> {
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) throw new Error("Falta OPENAI_API_KEY en los secretos de Supabase.");
  const client = new OpenAI({ apiKey });

  const completion = await client.chat.completions.create({
    model: OPENAI_MODEL,
    response_format: {
      type: "json_schema",
      json_schema: { name: task.schemaName, schema: task.schema, strict: true },
    },
    messages: [
      { role: "system", content: task.system },
      { role: "user", content: task.user },
    ],
  });

  const choice = completion.choices[0];
  if (choice?.message?.refusal) throw new Error("La IA ha rechazado esta petición.");
  if (!choice?.message?.content) throw new Error("La IA no ha devuelto contenido.");
  return JSON.parse(choice.message.content) as T;
}

// Helpers de JSON Schema estricto (ambos proveedores exigen
// additionalProperties:false y todos los campos en required).
export const str = { type: "string" };
export const strArr = { type: "array", items: { type: "string" } };
export function obj(properties: Record<string, unknown>) {
  return { type: "object", properties, required: Object.keys(properties), additionalProperties: false };
}
