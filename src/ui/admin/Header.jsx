import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signOutAccount } from "../../services/auth";
import Button from "../shared/Button";

function Header() {
  const location = useLocation();
  let routeName = location.pathname.substring(1);
  routeName = routeName.charAt(0).toUpperCase() + routeName.slice(1);
  const [isOpen, setIsOpen] = useState(false);
  const avatarRef = useRef();
  useEffect(() => {
    const handler = (e) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const signOut = async () => {
    const res = await signOutAccount();
    if (res.status === 200) {
      navigate("/signin");
    }
  };
  return (
    <header className="flex justify-between items-center p-6 sticky top-0 left-0 z-40 h-[10vh] bg-white border-b-2">
      <h1 className="font-bold text-2xl md:text-4xl">
        {routeName === "" ? "Dashboard" : routeName}
      </h1>
      <div className="relative flex items-center" ref={avatarRef}>
        <button className="rounded-full" onClick={toggleDropdown}>
          <img
            src={
              "https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
            }
            alt="avatar"
            className="rounded-full w-12 h-12 object-cover"
          />
        </button>
        {isOpen && (
          <div className="absolute w-[150px] right-[2px] top-14 bg-white border border-gray-200 shadow rounded-xl p-2 flex flex-col gap-2 items-center">
            <Button onClick={signOut}>Log Out</Button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
