import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/user/home/Home";
import RegisterForm from "./pages/user/form/RegisterForm";
import AdminLayout from "./ui/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Authentication from "./pages/auth/Authentication";

function App() {
  const role = "admin";
  return (
    <Router>
      <Routes>
        {role === "admin" ? (
          <Route path="/" element={<AdminLayout />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        ) : (
          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/registerform" element={<RegisterForm />} />
          </Route>
        )}
        <Route path="/authentication" element={<Authentication />} />
      </Routes>
    </Router>
  );
}

export default App;
