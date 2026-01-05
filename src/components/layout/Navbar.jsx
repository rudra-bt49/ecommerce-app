import { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.scss";
import ROUTES from "../../config/routes";

const Navbar = ({ onSignupClick, onLoginClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(token);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsAuthenticated(false);
    navigate(ROUTES.HOME);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const getClassNames = (
    condition,
    truthyClass = "",
    falsyClass = "",
    defaultClass = ""
  ) =>
    [defaultClass, condition ? truthyClass : falsyClass]
      .filter(Boolean)
      .join(" ");

  return (
    <header className="navbar">
      <div className="navbar__container container">
        {/* Logo */}
        <div className="navbar__logo">
          <NavLink to={ROUTES.HOME} className="logo-icon">🛒</NavLink>
          <NavLink to={ROUTES.HOME} className="logo-text">ShopEase</NavLink>
        </div>

        {/* Navigation */}
        <nav
          className={getClassNames(
            menuOpen,
            "navbar__nav--open",
            "",
            "navbar__nav"
          )}
        >
          <NavLink
            to={ROUTES.PRODUCTS}
            className={({ isActive }) =>
              getClassNames(isActive, "active", "", "nav-link")
            }
            onClick={() => setMenuOpen(false)}
          >
            Products
          </NavLink>

          <NavLink
            to={ROUTES.CART}
            className={({ isActive }) =>
              getClassNames(isActive, "active", "", "nav-link")
            }
            onClick={() => setMenuOpen(false)}
          >
            Cart
          </NavLink>

          {/* Mobile buttons */}
          <div className="navbar__mobile-buttons">
            {!isAuthenticated ? (
              <>
                <button
                  className="btn btn--outline"
                  onClick={() => {
                    onSignupClick();
                    setMenuOpen(false);
                  }}
                >
                  Sign Up
                </button>

                <button
                  className="btn btn--primary"
                  onClick={() => {
                    onLoginClick();
                    setMenuOpen(false);
                  }}
                >
                  Login
                </button>
              </>
            ) : (
              <button
                className="btn btn--danger"
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
              >
                Logout
              </button>
            )}
          </div>
        </nav>

        {/* Desktop actions */}
        <div className="navbar__actions">
          {!isAuthenticated ? (
            <>
              <button
                className="btn btn--outline navbar__desktop-btn"
                onClick={onSignupClick}
              >
                Sign Up
              </button>

              <button
                className="btn btn--primary navbar__desktop-btn"
                onClick={onLoginClick}
              >
                Login
              </button>
            </>
          ) : (
            <button
              className="btn btn--danger navbar__desktop-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <button
            className={getClassNames(
              menuOpen,
              "menu-toggle--open",
              "",
              "menu-toggle"
            )}
            onClick={toggleMenu}
          >
            <span className="hamburger"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
