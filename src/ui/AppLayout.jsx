import { Outlet } from "react-router-dom";
import Header from "./user/Header";

function AppLayout() {
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto">
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
