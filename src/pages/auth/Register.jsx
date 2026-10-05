import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { AuthShell, FormError, buttonClass, fieldClass } from "@/components/auth/AuthShell";

export default function Register() {
  const navigate = useNavigate();
  const { checkUserAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [needsOtp, setNeedsOtp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await base44.auth.register({ email, password });
      setNeedsOtp(true);
    } catch (err) {
      setError(err?.message || "No se ha podido crear la cuenta");
    } finally {
      setLoading(false);
    }
  };

  const verify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await base44.auth.verifyOtp({ email, otpCode: otp });
      await base44.auth.loginViaEmailPassword(email, password);
      await checkUserAuth();
      navigate("/", { replace: true });
    } catch (err) {
      setError(err?.message || "Código incorrecto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title={needsOtp ? "Verifica tu email" : "Crea tu cuenta"}
      subtitle={needsOtp ? `Te hemos enviado un código a ${email}` : "Empieza tu mes de contenido"}
      footer={
        <>
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="font-medium text-lima hover:underline">
            Entra
          </Link>
        </>
      }
    >
      {needsOtp ? (
        <form onSubmit={verify} className="space-y-4">
          <input required inputMode="numeric" placeholder="Código de verificación" className={fieldClass} value={otp} onChange={(e) => setOtp(e.target.value)} />
          <FormError>{error}</FormError>
          <button type="submit" disabled={loading} className={buttonClass}>
            {loading ? "Verificando…" : "Verificar"}
          </button>
        </form>
      ) : (
        <form onSubmit={register} className="space-y-4">
          <input type="email" required placeholder="Email" className={fieldClass} value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" required minLength={8} placeholder="Contraseña (mín. 8 caracteres)" className={fieldClass} value={password} onChange={(e) => setPassword(e.target.value)} />
          <FormError>{error}</FormError>
          <button type="submit" disabled={loading} className={buttonClass}>
            {loading ? "Creando…" : "Crear cuenta"}
          </button>
        </form>
      )}
    </AuthShell>
  );
}
