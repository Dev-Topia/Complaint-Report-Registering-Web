import { useState, useEffect, useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AppContext from "../../contexts/AppContext";
import Spinner from "../../ui/components/Spinner";

function ProtectedRoute() {
  const { token } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (token !== "") {
      setLoading(false);
    }
    setLoading(false);
  }, [token]);
  if (loading) {
    return <Spinner fullScreenSpinner={true} />;
  }
  return token ? <Outlet /> : <Navigate to="/signin" />;
}

export default ProtectedRoute;
