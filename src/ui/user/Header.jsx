import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { signOutAccount } from "../../services/auth";
import { getUserProfile } from "../../services/auth";
import { useNavigate, Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "../../assets/Logo.png";
import AppContext from "../../contexts/AppContext";

function Header() {
  const { dispatch, userId } = useContext(AppContext);
  const { data } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => getUserProfile(userId),
  });
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
    <header className="w-full bg-white border-b bg-muted/40 sticky top-0 left-0 z-40">
      <div className="max-w-7xl mx-auto p-4 md:px-10 flex justify-between items-center">
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-16" />
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage
                  src={
                    data?.imageUrl === null
                      ? "https://github.com/shadcn.png"
                      : data?.imageUrl
                  }
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link to="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                onClick={signOut}
                className="w-full rounded-lg"
                variant="destructive"
              >
                Sign Out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Header;
