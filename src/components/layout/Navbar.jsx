import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import ROUTES from "../../config/routes";

const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  /**
   * Utility to generate classNames conditionally
   * @param {boolean} condition
   * @param {string} truthyClass
   * @param {string} falsyClass
   * @param {string} defaultClass
   * @returns {string}
   */
  const getClassNames = (
    condition,
    truthyClass = "",
    falsyClass = "",
    defaultClass = ""
  ) => {
    return [
      defaultClass,
      condition ? truthyClass : falsyClass
    ].filter(Boolean).join(" ");
  };

  return (
    <header className="navbar">
      <div className="navbar__container container">
        {/* Logo */}
        <div className="navbar__logo">
          <NavLink to={ROUTES.HOME} className="logo-icon">
            🛒
          </NavLink>
          <NavLink to={ROUTES.HOME} className="logo-text">
            ShopEase
          </NavLink>
        </div>

        {/* Navigation Links */}
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
            end
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

          {/* Mobile only buttons */}
          <div className="navbar__mobile-buttons">
            <NavLink to={ROUTES.SIGNUP}>
              <button className="btn btn--outline">Sign Up</button>
            </NavLink>

            <NavLink to={ROUTES.LOGIN}>
              <button className="btn btn--primary">Login</button>
            </NavLink>
          </div>
        </nav>

        {/* Right Actions */}
        <div className="navbar__actions">
          <NavLink to={ROUTES.SIGNUP}>
            <button className="btn btn--outline navbar__desktop-btn">
              Sign Up
            </button>
          </NavLink>
          
          <NavLink to={ROUTES.LOGIN}>
            <button className="btn btn--primary navbar__desktop-btn">
              Login
            </button>
          </NavLink>

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
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
            aria-label="Toggle menu"
          >
            <span className="hamburger"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
