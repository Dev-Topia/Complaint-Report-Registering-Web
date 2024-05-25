import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/AdminHeader";

function AdminLayout() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <main>
        <Header />
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
