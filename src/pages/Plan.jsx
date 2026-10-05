import {
  CalendarRange as CalendarRangeIcon,
  Table as TableIcon,
  ArrowRight as ArrowRightIcon,
  CalendarDays as CalendarDaysIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Plan() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8 lg:px-12">
      <div className="animate-fade-in">
        <div className="inline-flex items-center gap-2 rounded-full bg-lima/10 px-3 py-1 text-xs font-semibold text-lima">
          <CalendarRangeIcon className="h-3.5 w-3.5" />
          {" Mi Plan de Contenido"}
        </div>
        <h1 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
          Tu plan del mes
        </h1>
        <p className="mt-2 text-muted-foreground">
          El Excel de contenido y el calendario visual viven en el Paso 4. Aquí
          tendrás acceso directo cuando estén listos.
        </p>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link
          to="/paso-4"
          className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-lima/40"
        >
          <TableIcon className="h-6 w-6 text-lima" />
          <h2 className="mt-3 font-heading text-lg font-semibold">
            Excel de contenido
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Todas tus piezas en una sola tabla editable.
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-lima">
            {"Ir al Paso 4 "}
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </Link>
        <Link
          to="/paso-4"
          className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-lima/40"
        >
          <CalendarDaysIcon className="h-6 w-6 text-lima" />
          <h2 className="mt-3 font-heading text-lg font-semibold">
            Calendario visual
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Arrastra y suelta tus piezas en el mes.
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-lima">
            {"Ir al Paso 4 "}
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </div>
  );
}
