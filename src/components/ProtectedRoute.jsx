import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoadingAuth } = useAuth();
  const location = useLocation();

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-secondary border-t-lima" />
      </div>
    );
  }
  if (!isAuthenticated) {
    const back = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?returnTo=${back}`} replace />;
  }
  return <Outlet />;
}
