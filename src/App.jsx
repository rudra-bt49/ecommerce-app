import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SignUp from "./components/auth/SignUp/SignUp";
import ROUTES from "./config/routes";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    if (location.pathname === ROUTES.SIGNUP) {
      setShowSignup(true);
    } else {
      setShowSignup(false);
    }
  }, [location.pathname]);

  return (
    <>
      <Navbar onSignupClick={() => navigate(ROUTES.SIGNUP)} />

      <main className="container">
        <h1>My E-Commerce App</h1>
      </main>

      <Footer />

      <SignUp
        isOpen={showSignup}
        onClose={() => navigate(ROUTES.HOME)}
      />
    </>
  );
}

export default App;
