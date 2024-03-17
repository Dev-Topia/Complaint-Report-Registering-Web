import { useEffect, useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../services/auth";
import AppContext from "../../contexts/AppContext";
import Cookies from "js-cookie";

function ProtectedRoute() {
  // const { dispatch } = useContext(AppContext);
  const { data } = useQuery({
    queryKey: ["getUserProfiles"],
    queryFn: getUserProfile,
  });
  // useEffect(() => {
  //   dispatch({ type: "SET_USER", payload: data });
  // }, [dispatch]);
  const token = Cookies.get("token");
  return token ? <Outlet /> : <Navigate to="/signin" />;
}

export default ProtectedRoute;
