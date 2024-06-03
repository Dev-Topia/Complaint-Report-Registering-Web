import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { signOutAccount } from "@/services/auth";
import { Users, LayoutDashboard, Bookmark, LandPlot } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import Logo from "../assets/Logo.png";
import AppContext from "@/contexts/AppContext";

function Sidebar() {
  const { dispatch } = useContext(AppContext);
  // const navigate = useNavigate();
  // const signOut = async () => {
  //   const res = await signOutAccount();
  //   if (res.status === 200) {
  //     dispatch({
  //       type: "SET_USER_DATA",
  //       payload: { userId: "", token: "", role: "" },
  //     });
  //     navigate("/signin");
  //   }
  // };
  const navigate = useNavigate();
  const handleSignOut = async () => {
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
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b justify-center p-10 lg:h-[60px]">
          <Link to="/" className="flex items-center gap-2">
            <img src={Logo} alt="logo" width={75} height={50} />
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-lg font-medium lg:px-4">
            <NavLink
              to="/"
              className={({ isActive }) => {
                return !isActive
                  ? "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:text-black"
                  : "bg-[#f5f5f5] flex items-center gap-3 rounded-lg px-3 py-2";
              }}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </NavLink>
            <NavLink
              to="/report"
              className={({ isActive }) => {
                return !isActive
                  ? "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:text-black"
                  : "bg-[#f5f5f5] flex items-center gap-3 rounded-lg px-3 py-2";
              }}
            >
              <LandPlot className="h-4 w-4" />
              Report
            </NavLink>
            <NavLink
              to="/user"
              className={({ isActive }) => {
                return !isActive
                  ? "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:text-black"
                  : "bg-[#f5f5f5] flex items-center gap-3 rounded-lg px-3 py-2";
              }}
            >
              <Bookmark className="h-4 w-4" />
              User
            </NavLink>
            <NavLink
              to="/setting"
              className={({ isActive }) => {
                return !isActive
                  ? "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:text-black"
                  : "bg-[#f5f5f5] flex items-center gap-3 rounded-lg px-3 py-2";
              }}
            >
              <Users className="h-4 w-4" />
              Setting
            </NavLink>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>Admin</CardTitle>
                  <CardDescription>Admin</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button
                size="sm"
                className="w-full bg-red-500 hover:bg-red-700"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
