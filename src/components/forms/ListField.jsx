export function ListField({
  label: e,
  value: t = [],
  onChange: n,
  placeholder: r = `Un elemento por línea`,
}) {
  let i = Array.isArray(t)
    ? t.join(`
`)
    : ``;
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-white/90">
        {e}
      </label>
      <textarea
        value={i}
        onChange={(e) =>
          n(
            e.target.value
              .split(
                `
`,
              )
              .map((e) => e.trim())
              .filter(Boolean),
          )
        }
        placeholder={r}
        rows={3}
        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-white placeholder:text-muted-foreground/60 focus:border-lima/60 focus:outline-none"
      />
    </div>
  );
}
