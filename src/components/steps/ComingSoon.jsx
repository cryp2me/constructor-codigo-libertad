import { Sparkles as SparklesIcon } from "lucide-react";

export function ComingSoon({ title: e, children: t }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-background/40 p-6">
      <div className="flex items-center gap-2 text-fucsia">
        <SparklesIcon className="h-4 w-4" />
        <span className="text-sm font-semibold">
          {e || `Herramienta en desarrollo`}
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{t}</p>
    </div>
  );
}
