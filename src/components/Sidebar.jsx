import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Users, LayoutDashboard, Bookmark, LandPlot } from "lucide-react";
import AppContext from "@/contexts/AppContext";
import Logo from "../assets/Logo.png";

function Sidebar() {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const signOut = async () => {
    const res = await signOutAccount();
    if (res.status === 200) {
      dispatch({
        type: "SET_USER_DATA",
        payload: { userId: "", token: "", role: "" },
      });
      navigate("/signin");
    }
  };
  return (
    <div className="hidden border-r bg-muted/40 md:block bg-white">
      <div className="flex h-full max-h-screen flex-col">
        <div className="flex h-14 items-center justify-center p-10 lg:h-[60px]">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <img src={Logo} alt="logo" width={75} height={50} />
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              to="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              to="/report"
              className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
            >
              <LandPlot className="h-4 w-4" />
              Report
            </Link>
            <Link
              to="/setting"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Bookmark className="h-4 w-4" />
              Setting
            </Link>
            <Link
              to="/user"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Users className="h-4 w-4" />
              User
            </Link>
          </nav>
        </div>
      </div>
    </div>
    // <aside className="hidden xl:block sticky h-screen top-0 left-0 bottom-0 bg-white border-r-2">
    //   <div className="w-[230px] p-4 h-screen flex flex-col justify-between">
    //     <div className="flex flex-col gap-4">
    //       <Link to="/" className="w-full flex justify-center">
    //         <img src={Logo} alt="Logo" className="w-28" />
    //       </Link>
    //       <div className="flex flex-col text-lg font-semibold gap-4">
    //         <NavLink
    //           to="/"
    //           className={({ isActive }) => {
    //             return !isActive
    //               ? "font-semibold flex gap-2 items-center hover:text-white hover:bg-[#227F4B] p-2 rounded-lg"
    //               : "font-semibold flex gap-2 items-center text-white p-2 rounded-lg bg-[#227F4B]";
    //           }}
    //         >
    //           <MdDashboard />
    //           Dashboard
    //         </NavLink>
    //         <NavLink
    //           to="/report"
    //           className={({ isActive }) => {
    //             return !isActive
    //               ? "font-semibold flex gap-2 items-center hover:text-white hover:bg-[#227F4B] p-2 rounded-lg"
    //               : "font-semibold flex gap-2 items-center text-white p-2 rounded-lg bg-[#227F4B]";
    //           }}
    //         >
    //           <TbReportAnalytics />
    //           Report
    //         </NavLink>
    //         <NavLink
    //           to="/user"
    //           className={({ isActive }) => {
    //             return !isActive
    //               ? "font-semibold flex gap-2 items-center hover:text-white hover:bg-[#227F4B] p-2 rounded-lg"
    //               : "font-semibold flex gap-2 items-center text-white p-2 rounded-lg bg-[#227F4B]";
    //           }}
    //         >
    //           <FaRegUser />
    //           User
    //         </NavLink>
    //         <NavLink
    //           to="/setting"
    //           className={({ isActive }) => {
    //             return !isActive
    //               ? "font-semibold flex gap-2 items-center hover:text-white hover:bg-[#227F4B] p-2 rounded-lg"
    //               : "font-semibold flex gap-2 items-center text-white p-2 rounded-lg bg-[#227F4B]";
    //           }}
    //         >
    //           <IoSettingsOutline />
    //           Setting
    //         </NavLink>
    //       </div>
    //     </div>
    //     <div>
    //       <Button customClass="md:w-full" onClick={signOut}>
    //         Sign Out
    //       </Button>
    //     </div>
    //   </div>
    // </aside>
  );
}

export default Sidebar;
