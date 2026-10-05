import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-white">
      <Sidebar />
      <div className="lg:pl-64">
        <main className="min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
