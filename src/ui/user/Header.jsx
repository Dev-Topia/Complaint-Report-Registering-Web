import { useEffect, useState, useRef } from "react";
import { signOutAccount } from "../../services/auth";
import { useNavigate, Link } from "react-router-dom";
import Button from "../shared/Button";
import Logo from "../../assets/Logo.png";

function Header() {
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
    <header className="bg-white border-b-2 sticky top-0 left-0 z-40">
      <div className="max-w-7xl mx-auto p-4 xl:px-0 flex justify-between items-center">
        <img src={Logo} alt="Logo" className="w-16" />
        <div className="relative" ref={avatarRef}>
          <button
            className="bg-[#d9d9d9] w-[50px] h-[50px] rounded-full"
            onClick={toggleDropdown}
          ></button>
          {isOpen && (
            <div className="absolute w-[150px] right-[2px] top-14 bg-white border border-gray-200 shadow rounded-xl p-2 flex flex-col gap-2 items-center">
              <Link to="/profile" className="font-semibold hover:underline">
                To Profile
              </Link>
              <Button onClick={signOut}>Log Out</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
