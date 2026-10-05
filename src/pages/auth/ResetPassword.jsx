import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { AuthShell, FormError, buttonClass, fieldClass } from "@/components/auth/AuthShell";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const resetToken = params.get("token") || params.get("reset_token") || "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (password !== confirm) return setError("Las contraseñas no coinciden");
    setError("");
    setLoading(true);
    try {
      await base44.auth.resetPassword({ resetToken, newPassword: password });
      navigate("/login", { replace: true });
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
        <FormError>{error || (!resetToken && "Falta el token del enlace")}</FormError>
        <button type="submit" disabled={loading || !resetToken} className={buttonClass}>
          {loading ? "Guardando…" : "Guardar contraseña"}
        </button>
      </form>
    </AuthShell>
  );
}
