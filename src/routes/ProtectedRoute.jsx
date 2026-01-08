import { Navigate, useLocation } from "react-router-dom";
import ROUTES from "../config/routes";
import ADMIN_ROUTES from "../config/adminRoutes";

const ProtectedRoute = ({ children, role = "user" }) => {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const location = useLocation();

  //  public access for home, products page
  if (location.pathname === ROUTES.HOME && !token) {
    return children;
  }

  // not logged in
  if (!token) {
    window.dispatchEvent(new Event("open-login"));
    return <Navigate to={ROUTES.PRODUCTS} replace />;
  }

  // admin try to access user routes
  if (role === "user" && isAdmin) {
    return <Navigate to={ADMIN_ROUTES.USERS} replace />;
  }

  // user try to access admin routes
  if (role === "admin" && !isAdmin) {
    return <Navigate to={ROUTES.PRODUCTS} replace />;
  }

  return children;
};

export default ProtectedRoute;
