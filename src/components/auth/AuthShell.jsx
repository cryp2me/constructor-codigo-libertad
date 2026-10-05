import { Rocket } from "lucide-react";

export const fieldClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-white placeholder:text-muted-foreground/60 focus:border-lima focus:outline-none";
export const buttonClass =
  "flex w-full items-center justify-center gap-2 rounded-lg bg-lima px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-lima/90 disabled:opacity-50";

export function AuthShell({ title, subtitle, footer, children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-lima text-black">
            <Rocket className="h-7 w-7" />
          </div>
          <h1 className="font-heading text-3xl font-bold">{title}</h1>
          {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="rounded-2xl border border-border bg-card p-8">{children}</div>
        {footer && <p className="mt-6 text-center text-sm text-muted-foreground">{footer}</p>}
      </div>
    </div>
  );
}

export function FormError({ children }) {
  if (!children) return null;
  return <p className="rounded-lg bg-destructive/15 px-3 py-2 text-sm text-red-300">{children}</p>;
}

export function returnTo() {
  const raw = new URLSearchParams(window.location.search).get("returnTo");
  if (!raw) return "/";
  try {
    const url = new URL(raw, window.location.origin);
    if (url.origin !== window.location.origin) return "/";
    return url.pathname + url.search;
  } catch {
    return "/";
  }
}
