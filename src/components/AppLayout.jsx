import { Outlet } from "react-router-dom";
import Header from "@/ui/user/Header";

function AppLayout() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto">
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
