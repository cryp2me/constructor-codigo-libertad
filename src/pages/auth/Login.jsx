import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/api/client";
import { useAuth } from "@/lib/AuthContext";
import { AuthShell, FormError, buttonClass, fieldClass, returnTo } from "@/components/auth/AuthShell";

export default function Login() {
  const navigate = useNavigate();
  const { checkUserAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      await checkUserAuth();
      navigate(returnTo(), { replace: true });
    } catch (err) {
      setError(err?.message || "Email o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Bienvenido de nuevo"
      subtitle="Entra en tu Constructor CVM"
      footer={
        <>
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="font-medium text-lima hover:underline">
            Regístrate
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <input type="email" required placeholder="Email" className={fieldClass} value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" required placeholder="Contraseña" className={fieldClass} value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="text-right">
          <Link to="/forgot-password" className="text-xs text-muted-foreground hover:text-lima">
            ¿Has olvidado la contraseña?
          </Link>
        </div>
        <FormError>{error}</FormError>
        <button type="submit" disabled={loading} className={buttonClass}>
          {loading ? "Entrando…" : "Entrar"}
        </button>
        <button
          type="button"
          onClick={() =>
            supabase.auth.signInWithOAuth({
              provider: "google",
              options: { redirectTo: window.location.origin + returnTo() },
            })
          }
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-secondary"
        >
          Continuar con Google
        </button>
      </form>
    </AuthShell>
  );
}
