import { Navigate } from "react-router-dom";
import ROUTES from "../config/routes";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.dispatchEvent(new Event("open-login"));

    return <Navigate to={ROUTES.PRODUCTS} replace />;
  }

  return children;
};

export default ProtectedRoute;
