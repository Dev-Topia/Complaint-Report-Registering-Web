import Logo from "../assets/Logo.png";

function Sidebar() {
	return (
		<aside className="fixed h-screen top-0 left-0 bottom-0">
			<div className="w-[230px] p-4 md:p-10 h-screen hidden xl:flex flex-col gap-2">
				<div className="w-full flex justify-center">
					<img src={Logo} alt="Logo" className="w-28" />
				</div>
				<dix className="flex flex-col text-lg font-bold">
					<a>Home</a>
					<a>Report</a>
				</dix>
			</div>
		</aside>
	);
}

export default Sidebar;
