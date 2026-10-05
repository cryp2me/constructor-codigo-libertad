// Modelos permitidos (IDs de OpenRouter). El servidor rechaza cualquier otro
// para que nadie pueda elegir un modelo desorbitado desde el navegador.
// Mantener en sincronía con src/lib/aiModels.js.
export const MODELS = [
  "anthropic/claude-opus-5.5",
  "anthropic/claude-sonnet-5.5",
  "openai/gpt-6.1-sol",
  "google/gemini-3.8-flash",
  "x-ai/grok-4.7",
  "deepseek/deepseek-v4.1-flash",
] as const;

export const DEFAULT_MODEL = Deno.env.get("OPENROUTER_MODEL") ?? "anthropic/claude-opus-5.5";

export function resolveModel(requested?: string | null): string {
  return requested && (MODELS as readonly string[]).includes(requested) ? requested : DEFAULT_MODEL;
}
