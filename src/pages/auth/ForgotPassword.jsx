import { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { AuthShell, FormError, buttonClass, fieldClass } from "@/components/auth/AuthShell";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await base44.auth.resetPasswordRequest(email);
      setSent(true);
    } catch (err) {
      setError(err?.message || "No se ha podido enviar el email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Recupera tu contraseña"
      subtitle={sent ? "Revisa tu bandeja de entrada" : "Te enviaremos un enlace para crear una nueva"}
      footer={
        <Link to="/login" className="font-medium text-lima hover:underline">
          Volver a entrar
        </Link>
      }
    >
      {sent ? (
        <p className="text-sm text-muted-foreground">
          Si existe una cuenta con {email}, recibirás un enlace en unos minutos.
        </p>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <input type="email" required placeholder="Email" className={fieldClass} value={email} onChange={(e) => setEmail(e.target.value)} />
          <FormError>{error}</FormError>
          <button type="submit" disabled={loading} className={buttonClass}>
            {loading ? "Enviando…" : "Enviar enlace"}
          </button>
        </form>
      )}
    </AuthShell>
  );
}
