import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import Cookies from "js-cookie";
import AppContext from "./contexts/AppContext";
import { useContext } from "react";
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
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import Profile from "./pages/user/Profile";
import Setting from "./pages/admin/Setting";
import User from "./pages/admin/User";

const queryClient = new QueryClient();

function App() {
  const { dispatch, role } = useContext(AppContext);
  const token = Cookies.get("token");
  const userRole = Cookies.get("role");
  const userId = Cookies.get("userId");
  useEffect(() => {
    dispatch({ type: "SET_USER_DATA", payload: { token, userRole, userId } });
  }, [dispatch, token]);
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route element={<ProtectedRoute />}>
            {role === "Admin" ? (
              <Route path="/" element={<AdminLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/report" element={<AdminReport />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="/user" element={<User />} />
              </Route>
            ) : (
              <Route path="/" element={<AppLayout />}>
                <Route path="/" element={<RegisterForm />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/report" element={<Report />} />
                <Route path="/report/:id" element={<SingleReport />} />
              </Route>
            )}
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
