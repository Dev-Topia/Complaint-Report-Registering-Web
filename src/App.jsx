import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getUserDataFromToken, getUserProfile } from "./services/auth";
import AppContext from "./contexts/AppContext";
import AppLayout from "./components/AppLayout";
import RegisterForm from "./pages/user/RegisterForm";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Report from "./pages/admin/Report";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ForgetPassword from "./pages/auth/ForgetPassword";
import SingleReport from "./pages/user/SingleReport";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import Profile from "./pages/user/Profile";
import Setting from "./pages/admin/Setting";
import User from "./pages/admin/User";
import Spinner from "./components/Spinner";
import PendingVerification from "./pages/auth/PendingVerification";

const queryClient = new QueryClient();

function App() {
  const { dispatch, role } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      const userData = await getUserDataFromToken();
      if (userData.status !== 400) {
        dispatch({ type: "SET_USER_DATA", payload: { ...userData.data } });
        const response = await getUserProfile(userData.data.userId);
        dispatch({ type: "SET_USER", payload: response });
      }
      setLoading(false);
    };
    getUserData();
  }, []);
  if (loading) {
    return <Spinner fullScreenSpinner={true} />;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            {role === "Admin" ? (
              <Route path="/" element={<AdminLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/report" element={<Report />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="/user" element={<User />} />
              </Route>
            ) : (
              <Route path="/" element={<AppLayout />}>
                <Route path="/" element={<RegisterForm />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/report/:id" element={<SingleReport />} />
              </Route>
            )}
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route
            path="/pending-verification"
            element={<PendingVerification />}
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
