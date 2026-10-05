import { Link, useLocation } from "react-router-dom";

export default function PageNotFound() {
  const { pathname } = useLocation();
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="text-center">
        <h1 className="font-heading text-7xl font-bold text-lima">404</h1>
        <p className="mt-4 text-muted-foreground">
          La página <span className="font-medium text-white">{pathname}</span> no existe.
        </p>
        <Link to="/" className="mt-6 inline-block rounded-lg bg-lima px-4 py-2 text-sm font-semibold text-black">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
