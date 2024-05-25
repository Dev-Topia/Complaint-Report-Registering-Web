import { useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
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
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 p-4 lg:h-[60px] bg-white">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <img src={Logo} alt="logo" width={150} height={50} />
              <span className="sr-only">Tarang</span>
            </Link>
            <Link
              to="/"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              to="/report"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
            >
              <LandPlot className="h-5 w-5" />
              Report
            </Link>
            <Link
              to="/setting"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Bookmark className="h-5 w-5" />
              Setting
            </Link>
            <Link
              to="/user"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Users className="h-5 w-5" />
              User
            </Link>
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
