import { useEffect, useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { supabase } from "@/api/client";
import { AI_MODELS, DEFAULT_AI_MODEL } from "@/lib/aiModels";

// Modelo de IA (vía OpenRouter) que usan aiMarca y aiCarrusel para este usuario.
export default function AiProviderSetting() {
  const [model, setModel] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from("user_settings")
      .select("ai_model")
      .maybeSingle()
      .then(({ data }) => setModel(data?.ai_model || DEFAULT_AI_MODEL));
  }, []);

  const choose = async (id) => {
    setSaving(true);
    const prev = model;
    setModel(id);
    const { error } = await supabase.from("user_settings").upsert({ ai_model: id });
    if (error) {
      setModel(prev);
      alert("No se pudo guardar el modelo de IA.");
    }
    setSaving(false);
  };

  return (
    <section className="mt-5 rounded-2xl border border-border bg-card p-6">
      <h2 className="flex items-center gap-2 font-heading text-lg font-semibold">
        <Sparkles className="h-4 w-4 text-lima" /> Motor de IA
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Elige qué IA escribe tus carruseles y define tu marca. Puedes cambiarlo cuando quieras.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {AI_MODELS.map((m) => (
          <button
            key={m.id}
            disabled={saving || model === null}
            onClick={() => choose(m.id)}
            className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors ${
              model === m.id ? "border-lima bg-lima/10" : "border-border hover:bg-secondary"
            }`}
          >
            <span>
              <span className="block text-sm font-semibold">{m.label}</span>
              <span className="block text-xs text-muted-foreground">
                {m.sub} · {m.cost}/carrusel
              </span>
            </span>
            {model === m.id && <Check className="h-4 w-4 shrink-0 text-lima" />}
          </button>
        ))}
      </div>
    </section>
  );
}
