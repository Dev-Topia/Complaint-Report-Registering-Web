import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";

function Header() {
  return (
    <header className="bg-white sticky top-0 left-0 z-40">
      <div className="max-w-7xl mx-auto p-4 xl:px-0 flex justify-between">
        <img src={Logo} alt="Logo" className="w-16" />
        <div className="flex items-center gap-4">
          <Link className="font-semibold">Your Report</Link>
          <div className="bg-[#d9d9d9] w-[50px] h-[50px] rounded-full"></div>
        </div>
      </div>
    </header>
  );
}

export default Header;
