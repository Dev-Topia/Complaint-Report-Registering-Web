import { NavLink } from "react-router-dom";
import { TbReportAnalytics } from "react-icons/tb";
import { MdDashboard } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

function BottomNavigation() {
  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-between xl:hidden bg-white border-t-2 px-4 py-2">
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
      <NavLink
        to="/setting"
        className={({ isActive }) => {
          return !isActive
            ? "font-semibold flex gap-2 items-center hover:text-white hover:bg-[#227F4B] p-2 rounded-lg"
            : "font-semibold flex gap-2 items-center text-white p-2 rounded-lg bg-[#227F4B]";
        }}
      >
        <IoSettingsOutline />
      </NavLink>
      <NavLink
        to="/user"
        className={({ isActive }) => {
          return !isActive
            ? "font-semibold flex gap-2 items-center hover:text-white hover:bg-[#227F4B] p-2 rounded-lg"
            : "font-semibold flex gap-2 items-center text-white p-2 rounded-lg bg-[#227F4B]";
        }}
      >
        <FaRegUser />
      </NavLink>
    </div>
  );
}

export default BottomNavigation;
