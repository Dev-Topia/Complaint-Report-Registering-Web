import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import AppLayout from "./ui/AppLayout";
import Authentication from "./pages/auth/Authentication";
import RegisterForm from "./pages/form/RegisterForm";
import Report from "./pages/report/report";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<AppLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/registerForm" element={<RegisterForm />} />
					<Route path="/report-page" element={<Report />} />
				</Route>
				<Route path="/Authentication" element={<Authentication />} />
			</Routes>
		</Router>
	);
}

export default App;
