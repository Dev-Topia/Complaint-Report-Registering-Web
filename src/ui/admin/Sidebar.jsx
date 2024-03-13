import { Link, useNavigate } from "react-router-dom";
import { signOutAccount } from "../../services/auth";
import Button from "../shared/Button";
import Logo from "../../assets/Logo.png";

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
            <Link to="/" className="font-semibold flex gap-2 items-center">
              Dashboard
            </Link>
            <Link
              to="/report"
              className="font-semibold flex gap-2 items-center"
            >
              Report
            </Link>
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
