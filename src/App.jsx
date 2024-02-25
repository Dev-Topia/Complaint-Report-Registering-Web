import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/user/home/Home";
import RegisterForm from "./pages/user/form/RegisterForm";
import AdminLayout from "./ui/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminReport from "./pages/admin/Report";
// import AdminSingleReport from "./pages/admin/SingleReport";
import Authentication from "./pages/auth/Authentication";

function App() {
  const role = "admin";
  return (
    <Router>
      <Routes>
        {role === "admin" ? (
          <Route path="/" element={<AdminLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/report" element={<AdminReport />} />
            {/* <Route path={`/report/:reportId`} element={<AdminSingleReport />} /> */}
          </Route>
        ) : (
          <Route path="/" element={<AppLayout />}>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<RegisterForm />} />
          </Route>
        )}
        <Route path="/authentication" element={<Authentication />} />
      </Routes>
    </Router>
  );
}

export default App;
