export function Modal({ open: e, onClose: t, title: n, children: r }) {
  return e ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={t} />
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-lg font-semibold text-fucsia">
            {n}
          </h3>
          <button
            onClick={t}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary"
          >
            ✕
          </button>
        </div>
        <div className="mt-4">{r}</div>
      </div>
    </div>
  ) : null;
}
