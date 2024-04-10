import { NavLink } from "react-router-dom";
import { TbReportAnalytics } from "react-icons/tb";
import { MdDashboard } from "react-icons/md";

function BottomNavigation() {
  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-evenly xl:hidden bg-white border-t-2 p-2">
      <NavLink
        to="/"
        className={({ isActive }) => {
          return !isActive
            ? "font-semibold flex gap-2 items-center hover:text-white hover:bg-[#227F4B] p-2 rounded-lg"
            : "font-semibold flex gap-2 items-center text-white p-2 rounded-lg bg-[#227F4B]";
        }}
      >
        <MdDashboard />
      </NavLink>
      <NavLink
        to="/report"
        className={({ isActive }) => {
          return !isActive
            ? "font-semibold flex gap-2 items-center hover:text-white hover:bg-[#227F4B] p-2 rounded-lg"
            : "font-semibold flex gap-2 items-center text-white p-2 rounded-lg bg-[#227F4B]";
        }}
      >
        <TbReportAnalytics />
      </NavLink>
    </div>
  );
}

export default BottomNavigation;
