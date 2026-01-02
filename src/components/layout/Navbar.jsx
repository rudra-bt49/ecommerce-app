import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";

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

  return (
    <header className="navbar">
      <div className="navbar__container container">
        {/* Logo */}
        <div className="navbar__logo">
          <span className="logo-icon">🛒</span>
          <span className="logo-text">ShopEase</span>
        </div>

        {/* Navigation Links */}
        <nav className={`navbar__nav ${menuOpen ? "navbar__nav--open" : ""}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
            onClick={() => setMenuOpen(false)}
          >
            Products
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
            onClick={() => setMenuOpen(false)}
          >
            Cart
          </NavLink>

          {/* Mobile only buttons */}
          <div className="navbar__mobile-buttons">
            <button className="btn btn--outline">Sign Up</button>
            <button className="btn btn--primary">Login</button>
          </div>
        </nav>

        {/* Right Actions */}
        <div className="navbar__actions">
          <button className="btn btn--outline navbar__desktop-btn">
            Sign Up
          </button>
          <button className="btn btn--primary navbar__desktop-btn">
            Login
          </button>

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <button
            className={`menu-toggle ${menuOpen ? "menu-toggle--open" : ""}`}
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
