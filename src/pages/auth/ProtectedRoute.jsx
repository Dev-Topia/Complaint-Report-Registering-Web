import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

function ProtectedRoute() {
  const token = Cookies.get("token");
  return token ? <Outlet /> : <Navigate to="/signin" />;
}

export default ProtectedRoute;
