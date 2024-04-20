import { Link, NavLink, useNavigate } from "react-router-dom";
import { signOutAccount } from "../../services/auth";
import Button from "../shared/Button";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import Logo from "../../assets/Logo.png";
import { TbReportAnalytics } from "react-icons/tb";

function Sidebar() {
  const navigate = useNavigate();
  const signOut = async () => {
    const res = await signOutAccount();
    if (res.status === 200) {
      navigate("/signin");
    }
  };
  return (
    <aside className="hidden xl:block sticky h-screen top-0 left-0 bottom-0 bg-white border-r-2">
      <div className="w-[230px] p-4 h-screen flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          <Link to="/" className="w-full flex justify-center">
            <img src={Logo} alt="Logo" className="w-28" />
          </Link>
          <div className="flex flex-col text-lg font-semibold gap-4">
          <NavLink
            to="/"
            className={({ isActive }) => {
              return !isActive
                ? "font-semibold flex gap-2 items-center hover:text-white hover:bg-[#227F4B] p-2 rounded-lg"
                : "font-semibold flex gap-2 items-center text-white p-2 rounded-lg bg-[#227F4B]";
            }}
          >
            <MdDashboard />
            Dashboard
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
            Report
          </NavLink>
          <NavLink
            to="/user"
            className={({ isActive }) => {
              return !isActive
                ? "font-semibold flex gap-2 items-center hover:text-white hover:bg-[#227F4B] p-2 rounded-lg"
                : "font-semibold flex gap-2 items-center text-white p-2 rounded-lg bg-[#227F4B]";
            }}
          >
           <FaUser />
            User
          </NavLink>
          </div>
        </div>
        <div>
          <Button customClass="md:w-full" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
