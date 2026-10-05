import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/lib/AuthContext";
import { Toaster } from "@/components/ui/Toaster";
import ProtectedRoute from "@/components/ProtectedRoute";
import ScrollToTop from "@/components/ScrollToTop";
import AppLayout from "@/components/layout/AppLayout";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import Home from "@/pages/Home";
import Sistema from "@/pages/Sistema";
import Marca from "@/pages/Marca";
import Plan from "@/pages/Plan";
import Biblioteca from "@/pages/Biblioteca";
import Producto from "@/pages/Producto";
import Ajustes from "@/pages/Ajustes";
import Paso1 from "@/pages/pasos/Paso1";
import Paso2 from "@/pages/pasos/Paso2";
import Paso3 from "@/pages/pasos/Paso3";
import Paso4 from "@/pages/pasos/Paso4";
import Paso5 from "@/pages/pasos/Paso5";
import Paso6 from "@/pages/pasos/Paso6";
import Paso7 from "@/pages/pasos/Paso7";
import Paso8 from "@/pages/pasos/Paso8";
import ConstructorCarruseles from "@/pages/ConstructorCarruseles";
import PageNotFound from "@/pages/PageNotFound";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } },
});

export default function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/sistema" element={<Sistema />} />
                <Route path="/marca" element={<Marca />} />
                <Route path="/plan" element={<Plan />} />
                <Route path="/biblioteca" element={<Biblioteca />} />
                <Route path="/producto" element={<Producto />} />
                <Route path="/ajustes" element={<Ajustes />} />
                <Route path="/paso-1" element={<Paso1 />} />
                <Route path="/paso-2" element={<Paso2 />} />
                <Route path="/paso-3" element={<Paso3 />} />
                <Route path="/paso-4" element={<Paso4 />} />
                <Route path="/paso-5" element={<Paso5 />} />
                <Route path="/constructor-carruseles" element={<ConstructorCarruseles />} />
                <Route path="/paso-6" element={<Paso6 />} />
                <Route path="/paso-7" element={<Paso7 />} />
                <Route path="/paso-8" element={<Paso8 />} />
              </Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}
