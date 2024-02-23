import { Outlet } from "react-router-dom";
import Header from "./Header";
import BottomNavigation from "./BottomNavigation";
import Sidebar from "./Sidebar";

function AppLayout() {
	return (
		<div className="flex flex-col xl:flex-row">
			<Sidebar />
			<main className="w-full xl:ml-[230px]">
				<Header />
				<Outlet />
			</main>
			<BottomNavigation />
		</div>
	);
}

export default AppLayout;
