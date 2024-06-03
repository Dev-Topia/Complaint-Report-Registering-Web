import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/AdminHeader";

function AdminLayout() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <main className="flex flex-col">
        <Header />
        <Outlet className="flex-grow" />
      </main>
    </div>
  );
}

export default AdminLayout;
