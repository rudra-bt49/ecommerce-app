// import Navbar from "./components/layout/Navbar";
// import Footer from "./components/layout/Footer";

// function App() {
//   return (
//     <>
//       <Navbar />
//       <h1>My E-Commerce App</h1>
//       <Footer />
//     </>
//   );
// }

// export default App;






import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SignUp from "./components/auth/SignUp/SignUp";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    if (location.pathname === "/register") {
      setShowSignup(true);
    } else {
      setShowSignup(false);
    }
  }, [location.pathname]);

  return (
    <>
      <Navbar onSignupClick={() => navigate("/register")} />

      <main className="container">
        <h1>My E-Commerce App</h1>
      </main>

      <Footer />

      <SignUp
        isOpen={showSignup}
        onClose={() => navigate("/")}
      />
    </>
  );
}

export default App;
