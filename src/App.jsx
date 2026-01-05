import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SignUp from "./components/auth/SignUp/SignUp";
import Login from "./components/auth/Login/Login";

import ROUTES from "./config/routes";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    setShowSignup(location.pathname === ROUTES.SIGNUP);
    setShowLogin(location.pathname === ROUTES.LOGIN);
  }, [location.pathname]);

  return (
    <>
      <Navbar
        onSignupClick={() => navigate(ROUTES.SIGNUP)}
        onLoginClick={() => navigate(ROUTES.LOGIN)}
      />

      <main className="container">
        <h1>My E-Commerce App</h1>
      </main>

      <Footer />

      <SignUp
        isOpen={showSignup}
        onClose={() => navigate(ROUTES.HOME)}
      />

      <Login
        isOpen={showLogin}
        onClose={() => navigate(ROUTES.HOME)}
      />
    </>
  );
}

export default App;
