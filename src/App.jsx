import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SignUp from "./components/auth/SignUp/SignUp";
import Login from "./components/auth/Login/Login";

import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import UserProfile from "./pages/UserProfile/UserProfile";

import ManageUsers from "./pages/Admin/ManageUsers";
import ADMIN_ROUTES from "./config/adminRoutes";
import ROUTES from "./config/routes";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith(
    ADMIN_ROUTES.DASHBOARD
  );

  useEffect(() => {
    const openSignup = () => {
      setShowSignup(true);
      setShowLogin(false);
    };

    const openLogin = () => {
      setShowLogin(true);
      setShowSignup(false);
    };

    const closeAuth = () => {
      setShowSignup(false);
      setShowLogin(false);
    };

    window.addEventListener("open-signup", openSignup);
    window.addEventListener("open-login", openLogin);
    window.addEventListener("close-auth", closeAuth);

    return () => {
      window.removeEventListener("open-signup", openSignup);
      window.removeEventListener("open-login", openLogin);
      window.removeEventListener("close-auth", closeAuth);
    };
  }, []);

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route
          path={ROUTES.PRODUCTS}
          element={
            <ProtectedRoute role="user">
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.PRODUCT_DETAILS}
          element={
            <ProtectedRoute role="user">
              <ProductDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.CART}
          element={
            <ProtectedRoute role="user">
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoute role="user">
              <UserProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path={ADMIN_ROUTES.USERS}
          element={
            <ProtectedRoute role="admin">
              <ManageUsers />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!isAdminRoute && <Footer />}

      <SignUp
        isOpen={showSignup}
        onClose={() =>
          window.dispatchEvent(new Event("close-auth"))
        }
      />

      <Login
        isOpen={showLogin}
        onClose={() =>
          window.dispatchEvent(new Event("close-auth"))
        }
      />
    </>
  );
}

export default App;
