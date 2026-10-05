import { useEffect, useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { supabase } from "@/api/client";

const PROVIDERS = [
  { id: "anthropic", label: "Claude", sub: "Anthropic" },
  { id: "openai", label: "ChatGPT", sub: "OpenAI" },
];

// Motor de IA que usan aiMarca y aiCarrusel para este usuario.
export default function AiProviderSetting() {
  const [provider, setProvider] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from("user_settings")
      .select("ai_provider")
      .maybeSingle()
      .then(({ data }) => setProvider(data?.ai_provider || "anthropic"));
  }, []);

  const choose = async (id) => {
    setSaving(true);
    const prev = provider;
    setProvider(id);
    const { error } = await supabase.from("user_settings").upsert({ ai_provider: id });
    if (error) {
      setProvider(prev);
      alert("No se pudo guardar el motor de IA.");
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
        {PROVIDERS.map((p) => (
          <button
            key={p.id}
            disabled={saving || provider === null}
            onClick={() => choose(p.id)}
            className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors ${
              provider === p.id ? "border-lima bg-lima/10" : "border-border hover:bg-secondary"
            }`}
          >
            <span>
              <span className="block text-sm font-semibold">{p.label}</span>
              <span className="block text-xs text-muted-foreground">{p.sub}</span>
            </span>
            {provider === p.id && <Check className="h-4 w-4 text-lima" />}
          </button>
        ))}
      </div>
    </section>
  );
}
