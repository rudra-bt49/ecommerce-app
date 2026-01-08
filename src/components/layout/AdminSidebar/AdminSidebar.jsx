import { NavLink, useNavigate } from "react-router-dom";
import ADMIN_ROUTES from "../../../config/adminRoutes";
import ROUTES from "../../../config/routes";
import getClassNames from "../../../utils/getClassNames";
import "./AdminSidebar.scss";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    navigate(ROUTES.HOME);
  };

  return (
    <aside className="admin-sidebar">
      <h1 className="admin-logo">Dashboard</h1>
      <nav className="admin-sidebar__nav">
        <NavLink
          to={ADMIN_ROUTES.USERS}
          className={({ isActive }) =>
            getClassNames(isActive, "active", "", "admin-nav-link")
          }
        >
          Users
        </NavLink>
        <NavLink
          to={ADMIN_ROUTES.PRODUCTS}
          className={({ isActive }) =>
            getClassNames(isActive, "active", "", "admin-nav-link")
          }
        >
          Products
        </NavLink>
        <button
          className="admin-logout"
          onClick={handleLogout}
        >
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;