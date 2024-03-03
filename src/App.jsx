import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import RegisterForm from "./pages/user/RegisterForm";
import Report from "./pages/user/Report";
import AdminLayout from "./ui/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminReport from "./pages/admin/AdminReport";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ForgetPassword from "./pages/auth/ForgetPassword";
import SingleReport from "./pages/user/SingleReport";

function App() {
  const role = "user";
  return (
    <Router>
      <Routes>
        {role === "admin" ? (
          <Route path="/" element={<AdminLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/report" element={<AdminReport />} />
          </Route>
        ) : (
          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<RegisterForm />} />
            <Route path="/report" element={<Report />} />
            <Route path="/report/:id" element={<SingleReport />} />
          </Route>
        )}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
