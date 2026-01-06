import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import "./Navbar.scss";
import ROUTES from "../../config/routes";
import getClassNames from "../../utils/getClassNames";

const Navbar = () => {
  const navigate = useNavigate();

  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  /* 🔁 Sync auth state globally */
  useEffect(() => {
    const syncAuthState = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("auth-changed", syncAuthState);

    return () => {
      window.removeEventListener("auth-changed", syncAuthState);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("auth-changed"));
    navigate(ROUTES.HOME);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const openSignup = () => {
    window.dispatchEvent(new Event("open-signup"));
    setMenuOpen(false);
  };

  const openLogin = () => {
    window.dispatchEvent(new Event("open-login"));
    setMenuOpen(false);
  };

  const renderAuthButtons = () => (
    <div className="auth-buttons">
      {!isAuthenticated ? (
        <>
          <button className="btn btn--outline" onClick={openSignup}>
            Sign Up
          </button>
          <button className="btn btn--primary" onClick={openLogin}>
            Login
          </button>
        </>
      ) : (
        <button className="btn btn--danger" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );

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

        {/* Navigation */}
        <nav
          className={getClassNames(
            menuOpen,
            "navbar__nav--open",
            "",
            "navbar__nav"
          )}
        >
          <NavLink to={ROUTES.PRODUCTS} className="nav-link">
            Products
          </NavLink>

          <NavLink to={ROUTES.CART} className="nav-link nav-link--cart">
            <ShoppingCart size={20}/>
            <span>{` My Cart`}</span>
          </NavLink>

          {/* Mobile auth */}
          <div className="navbar__auth--mobile">
            {renderAuthButtons()}
          </div>
        </nav>

        {/* Actions */}
        <div className="navbar__actions">
          {/* Desktop auth */}
          <div className="navbar__auth--desktop">
            {renderAuthButtons()}
          </div>

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
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="hamburger"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
