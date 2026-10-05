import {
  Package as PackageIcon,
  Sparkles as SparklesIcon,
  ArrowRight as ArrowRightIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Producto() {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-5 py-16 text-center">
      <div className="animate-fade-in">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-fucsia/10">
          <PackageIcon className="h-8 w-8 text-fucsia" />
        </div>
        <span className="mt-5 inline-block rounded-full bg-fucsia/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-fucsia">
          Próximamente
        </span>
        <h1 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
          Crear Producto
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Este módulo llegará pronto y te servirá para crear tu producto digital
          directamente desde el Constructor: definir la idea, estructurar el
          contenido, ponerle precio y dejarlo listo para vender.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Mientras tanto, sigue con los 8 pasos y deja tu contenido y tu
          comunidad listas para cuando lo lances.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-lima px-5 py-3 text-sm font-semibold text-black hover:brightness-110"
        >
          <SparklesIcon className="h-4 w-4" />
          {" Volver al inicio "}
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
