import { useContext } from "react";
import { useLocation, useNavigate, Link, NavLink } from "react-router-dom";
import { signOutAccount } from "@/services/auth";
import { Users, LayoutDashboard, Bookmark, LandPlot, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "../assets/Logo.png";
import AppContext from "@/contexts/AppContext";

function Header() {
  const { dispatch } = useContext(AppContext);
  const location = useLocation();
  let routeName = location.pathname.substring(1);
  routeName = routeName.charAt(0).toUpperCase() + routeName.slice(1);
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
    <header className="flex md:hidden h-14 items-center gap-4 border-b bg-muted/40 p-4 lg:h-[60px] bg-white">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col max-w-[250px] sm:w-[250px]"
        >
          <div className="mx-auto">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <img src={Logo} alt="logo" width={75} height={50} />
              <span className="sr-only">Tarang</span>
            </Link>
          </div>
          <nav className="grid gap-2 text-lg font-medium">
            <NavLink
              to="/"
              className={({ isActive }) => {
                return !isActive
                  ? "mx-[-0.65refm] flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:text-black"
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
                  ? "mx-[-0.65refm] flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:text-black"
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
                  ? "mx-[-0.65refm] flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:text-black"
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
                  ? "mx-[-0.65refm] flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:text-black"
                  : "bg-[#f5f5f5] flex items-center gap-3 rounded-lg px-3 py-2";
              }}
            >
              <Users className="h-4 w-4" />
              Setting
            </NavLink>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <h1 className="text-lg font-medium">
          {routeName === "" ? "Dashboard" : routeName}
        </h1>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>
            <Button onClick={signOut} className="w-full" variant="destructive">
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

export default Header;
