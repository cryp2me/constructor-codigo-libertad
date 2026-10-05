import {
  House as HouseIcon,
  BookOpen as BookOpenIcon,
  Brain as BrainIcon,
  CalendarRange as CalendarRangeIcon,
  Library as LibraryIcon,
  Rocket as RocketIcon,
  Menu as MenuIcon,
  X as XIcon,
  LayoutList as LayoutListIcon,
  ChevronDown as ChevronDownIcon,
  Search as SearchIcon,
  Package as PackageIcon,
  Settings as SettingsIcon,
} from "lucide-react";
import { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { useProgress } from "@/hooks/useProgress";
import { STEPS, STEP_ICONS } from "@/lib/steps";

const navItem = (e, t, n) => ({
  to: e,
  label: t,
  Icon: n,
});
const MAIN_NAV = [
  navItem(`/`, `Inicio`, HouseIcon),
  navItem(`/sistema`, `El Sistema`, BookOpenIcon),
  navItem(`/marca`, `Mi Marca`, BrainIcon),
];
const WORK_NAV = [
  navItem(`/plan`, `Mi Plan de Contenido`, CalendarRangeIcon),
  navItem(`/biblioteca`, `Mi Biblioteca`, LibraryIcon),
];
function StepDot({ step: e }) {
  return e.completado ? (
    <span className="h-2.5 w-2.5 rounded-full bg-lima" />
  ) : e.done > 0 ? (
    <span className="relative h-2.5 w-2.5 rounded-full border border-lima/60">
      <span
        className="absolute inset-0 rounded-full bg-lima"
        style={{
          clipPath: `inset(0 ${100 - (e.done / e.total) * 100}% 0 0)`,
        }}
      />
    </span>
  ) : (
    <span className="h-2.5 w-2.5 rounded-full border border-muted-foreground/40" />
  );
}
export function Sidebar() {
  let [e, t] = useState(false),
    [n, r] = useState(true),
    i = useLocation(),
    { percent: a, perStep: o, loading: s } = useProgress(),
    c = (e) => i.pathname === `/${e}`,
    l = ({ isActive: e }) =>
      `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${e ? `bg-lima/10 text-lima` : `text-muted-foreground hover:bg-secondary hover:text-white`}`;
  return (
    <>
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/90 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <RocketIcon className="h-5 w-5 text-lima" />
          <span className="font-heading text-base font-bold">
            Constructor CVM
          </span>
        </div>
        <button
          onClick={() => t(true)}
          className="rounded-lg p-2 hover:bg-secondary"
        >
          <MenuIcon className="h-5 w-5" />
        </button>
      </div>
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-border bg-[#0A0A0A] transition-transform lg:translate-x-0 ${e ? `translate-x-0` : `-translate-x-full`}`}
      >
        <div className="flex h-full flex-col">
          <div className="px-5 pt-6 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-lima text-black">
                  <RocketIcon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-heading text-sm font-bold leading-tight">
                    Constructor CVM
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    El método CVM · Código Libertad
                  </div>
                </div>
              </div>
              <button
                onClick={() => t(false)}
                className="rounded-lg p-1.5 hover:bg-secondary lg:hidden"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-5">
              <div className="mb-1.5 flex items-center justify-between text-[11px] uppercase tracking-wider text-muted-foreground">
                <span>Progreso global</span>
                <span className="font-semibold text-lima">
                  {s ? `—` : `${a}%`}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-lima transition-all duration-500"
                  style={{
                    width: `${a}%`,
                  }}
                />
              </div>
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 pb-4 scrollbar-thin">
            {MAIN_NAV.map((e) => (
              <NavLink
                to={e.to}
                end={e.to === `/`}
                className={l}
                onClick={() => t(false)}
                key={e.to}
              >
                <e.Icon className="h-4.5 w-4.5" />
                <span>{e.label}</span>
              </NavLink>
            ))}
            <button
              onClick={() => r((e) => !e)}
              className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-white"
            >
              <LayoutListIcon className="h-4.5 w-4.5" />
              <span>Los 8 pasos</span>
              <ChevronDownIcon
                className={`ml-auto h-4 w-4 transition-transform ${n ? `rotate-180` : ``}`}
              />
            </button>
            {n && (
              <div className="mt-1 space-y-0.5 pl-3">
                {STEPS.map((e) => {
                  let n = o[e.num] || {
                      done: 0,
                      total: e.checklist.length,
                      completado: false,
                    },
                    r = STEP_ICONS[e.icon] || SearchIcon;
                  return (
                    <NavLink
                      to={`/${e.slug}`}
                      onClick={() => t(false)}
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] transition-colors ${c(e.slug) ? `bg-lima/10 text-lima` : `text-muted-foreground hover:bg-secondary hover:text-white`}`}
                      key={e.slug}
                    >
                      <r className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">
                        {"Paso "}
                        {e.num}
                        {" · "}
                        {e.name}
                      </span>
                      <span className="ml-auto shrink-0">
                        <StepDot step={n} />
                      </span>
                    </NavLink>
                  );
                })}
              </div>
            )}
            <div className="my-2 border-t border-border" />
            {WORK_NAV.map((e) => (
              <NavLink
                to={e.to}
                className={l}
                onClick={() => t(false)}
                key={e.to}
              >
                <e.Icon className="h-4.5 w-4.5" />
                <span>{e.label}</span>
              </NavLink>
            ))}
            <NavLink to="/producto" className={l} onClick={() => t(false)}>
              <PackageIcon className="h-4.5 w-4.5" />
              <span>Crear Producto</span>
              <span className="ml-auto rounded-md bg-fucsia/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-fucsia">
                Próximamente
              </span>
            </NavLink>
            <NavLink to="/ajustes" className={l} onClick={() => t(false)}>
              <SettingsIcon className="h-4.5 w-4.5" />
              <span>Ajustes</span>
            </NavLink>
          </nav>
          <div className="border-t border-border px-5 py-3 text-[11px] text-muted-foreground">
            Tu mes de contenido · Crea, viraliza y monetiza
          </div>
        </div>
      </aside>
      {e && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => t(false)}
        />
      )}
    </>
  );
}
