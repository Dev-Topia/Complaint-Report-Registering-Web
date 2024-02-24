import { Outlet } from "react-router-dom";
import Header from "./user/Header";
import Footer from "./user/Footer";

function AppLayout() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto h-[89vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default AppLayout;
