import { useEffect, useState } from "react";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SignUp from "./components/auth/SignUp/SignUp";
import Login from "./components/auth/Login/Login";

function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

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
      <Navbar />

      <main className="container">
        <h1>My E-Commerce App</h1>
      </main>

      <Footer />

      <SignUp
        isOpen={showSignup}
        onClose={() => window.dispatchEvent(new Event("close-auth"))}
      />

      <Login
        isOpen={showLogin}
        onClose={() => window.dispatchEvent(new Event("close-auth"))}
      />
    </>
  );
}

export default App;
