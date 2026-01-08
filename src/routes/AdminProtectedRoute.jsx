import { Navigate } from "react-router-dom";
import ADMIN_ROUTES from "../config/adminRoutes";
import ROUTES from "../config/routes";

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (!token || !isAdmin) {
    return <Navigate to={ROUTES.PRODUCTS} replace />;
  }

  return children;
};

export default AdminProtectedRoute;
