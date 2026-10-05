import { X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function Toaster() {
  const { toasts, dismiss } = useToast();
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`animate-fade-in rounded-xl border p-4 shadow-2xl ${
            t.variant === "destructive"
              ? "border-destructive/50 bg-destructive text-white"
              : "border-border bg-card text-white"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-1">
              {t.title && <div className="text-sm font-semibold">{t.title}</div>}
              {t.description && (
                <div className="mt-0.5 text-sm text-muted-foreground">{t.description}</div>
              )}
            </div>
            <button onClick={() => dismiss(t.id)} className="opacity-60 hover:opacity-100">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
