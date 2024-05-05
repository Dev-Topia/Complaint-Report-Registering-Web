import { Outlet } from "react-router-dom";
import Header from "./admin/Header";
import BottomNavigation from "./admin/BottomNavigation";
import Sidebar from "./admin/Sidebar";

function AdminLayout() {
  return (
    <div className="flex flex-col xl:flex-row">
      <Sidebar />
      <main className="w-full mb-[50px] xl:mb-0">
        <Header />
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
}

export default AdminLayout;
