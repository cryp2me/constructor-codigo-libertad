// Modelos disponibles vía OpenRouter (mantener en sincronía con
// supabase/functions/_shared/models.ts). Precio orientativo por carrusel.
export const AI_MODELS = [
  { id: "anthropic/claude-opus-5.5", label: "Claude Opus 5.5", sub: "Máxima calidad de escritura", cost: "≈ 0,08 €" },
  { id: "anthropic/claude-sonnet-5.5", label: "Claude Sonnet 5.5", sub: "Muy buena calidad, más rápido", cost: "≈ 0,04 €" },
  { id: "openai/gpt-6.1-sol", label: "GPT-6.1 Sol", sub: "OpenAI", cost: "≈ 0,04 €" },
  { id: "google/gemini-3.8-flash", label: "Gemini 3.8 Flash", sub: "Google · rápido y barato", cost: "≈ 0,015 €" },
  { id: "x-ai/grok-4.7", label: "Grok 4.7", sub: "xAI", cost: "≈ 0,03 €" },
  { id: "deepseek/deepseek-v4.1-flash", label: "DeepSeek V4.1 Flash", sub: "El más económico", cost: "≈ 0,005 €" },
];

export const DEFAULT_AI_MODEL = AI_MODELS[0].id;
