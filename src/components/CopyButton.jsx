import { CopyCheck as CopyCheckIcon, Copy as CopyIcon } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export function CopyButton({ texto: e, label: t = `Copiar` }) {
  let { toast: n } = useToast(),
    [r, i] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          (await navigator.clipboard.writeText(e),
            i(true),
            n({
              description: `Copiado.`,
            }),
            setTimeout(() => i(false), 1500));
        } catch {
          n({
            description: `No se pudo copiar.`,
            variant: `destructive`,
          });
        }
      }}
      className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-white/80 hover:border-lima/50 hover:text-lima"
    >
      {r ? (
        <CopyCheckIcon className="h-3.5 w-3.5" />
      ) : (
        <CopyIcon className="h-3.5 w-3.5" />
      )}{" "}
      {r ? `Copiado` : t}
    </button>
  );
}
