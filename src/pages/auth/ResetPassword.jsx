import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/api/client";
import { AuthShell, FormError, buttonClass, fieldClass } from "@/components/auth/AuthShell";

// Se llega aquí desde el enlace del email de recuperación: supabase-js
// detecta el token en la URL y abre una sesión temporal de recuperación.
export default function ResetPassword() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setReady(!!data.session));
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) setReady(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (password !== confirm) return setError("Las contraseñas no coinciden");
    setError("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      navigate("/", { replace: true });
    } catch (err) {
      setError(err?.message || "El enlace no es válido o ha caducado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Nueva contraseña"
      footer={
        <Link to="/login" className="font-medium text-lima hover:underline">
          Volver a entrar
        </Link>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <input type="password" required minLength={8} placeholder="Nueva contraseña" className={fieldClass} value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" required minLength={8} placeholder="Repite la contraseña" className={fieldClass} value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        <FormError>{error || (!ready && "Abre esta página desde el enlace del email de recuperación")}</FormError>
        <button type="submit" disabled={loading || !ready} className={buttonClass}>
          {loading ? "Guardando…" : "Guardar contraseña"}
        </button>
      </form>
    </AuthShell>
  );
}
