import { Sparkles as SparklesIcon } from "lucide-react";

export function AiButton({
  children: e,
  onClick: t,
  disabled: n,
  loading: r,
  className: i = ``,
}) {
  return (
    <button
      type="button"
      onClick={t}
      disabled={n}
      className={`inline-flex items-center gap-2 rounded-lg border border-fucsia/40 bg-fucsia/10 px-3.5 py-2 text-sm font-semibold text-fucsia transition-all hover:bg-fucsia/20 disabled:opacity-50 disabled:cursor-not-allowed ${i}`}
    >
      <SparklesIcon className={`h-4 w-4 ${r ? `animate-pulse` : ``}`} />
      {r ? `Pensando…` : e}
    </button>
  );
}
