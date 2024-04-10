import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  let routeName = location.pathname.substring(1);
  routeName = routeName.charAt(0).toUpperCase() + routeName.slice(1);
  return (
    <header className="flex justify-between items-center p-6 sticky top-0 left-0 z-40 h-[10vh] bg-white border-b-2">
      <h1 className="font-bold text-2xl">
        {routeName === "" ? "Dashboard" : routeName}
      </h1>
      <div>
        <div className="bg-[#d9d9d9] w-[50px] h-[50px] rounded-full relative">
          {/* <div className="absolute right-[2px] top-14 bg-white border border-gray-200 shadow rounded-xl p-2">
            <Button>Log Out</Button>
          </div> */}
        </div>
      </div>
    </header>
  );
}

export default Header;
