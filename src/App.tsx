import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import UsersDashboard from "./pages/usersDashboard";
import OrderDashboard from "./pages/orderDashboard";
import ClientDashboard from "./pages/clientDashboard";


const AppContent: React.FC = () => {
  const location = useLocation();
  const hideNavbarAndFooter = location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/usersDashboard") || location.pathname.startsWith("/orderDashboard") || location.pathname.startsWith("/clientDashboard");

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {!hideNavbarAndFooter && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/usersDashboard" element={<UsersDashboard />} />
          <Route path="/orderDashboard" element={<OrderDashboard />} />
          <Route path="/clientDashboard" element={<ClientDashboard />} />
        </Routes>
      </main>
      {!hideNavbarAndFooter && <Footer />}
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
