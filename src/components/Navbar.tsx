import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/navbar.css";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home"); // Default to home
  const location = useLocation();

  // Mock user data (replace this with actual authentication logic later)
  const user = null; // No user logged in
  // const user = { name: "John" }; // Logged in as a user

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
      setActiveSection(id); // Set active section on click as well
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      
      // Default to home if at top of page
      if (window.scrollY < 100) {
        setActiveSection("home");
        return;
      }
      
      let current = "";
      
      sections.forEach((section) => {
        const sectionId = section.getAttribute("id") || "";
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Adjust the offset for better detection
        if (window.scrollY >= sectionTop - 150 && 
            window.scrollY < sectionTop + sectionHeight - 150) {
          current = sectionId;
        }
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Initial call to set active section on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Check if we're on the login page or other pages
  const isLoginPage = location.pathname === "/login";
  const isHomePage = location.pathname === "/";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-lg">
      <div className="container">
        {/* Brand/Logo */}
        <Link to="/" className="navbar-brand">
          <span className="fw-bold food">Food Ordering App</span>
        </Link>

        {/* Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navbar Links */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* Home Link */}
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${isHomePage && activeSection === "home" ? "active" : ""}`} 
                onClick={() => scrollToSection("home")}
              >
                Home
              </Link>
            </li>

            {/* About Link */}
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${isHomePage && activeSection === "about" ? "active" : ""}`} 
                onClick={() => scrollToSection("about")}
              >
                About
              </Link>
            </li>

            {/* Foods Link */}
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${isHomePage && activeSection === "foods" ? "active" : ""}`} 
                onClick={() => scrollToSection("foods")}
              >
                Foods
              </Link>
            </li>

            {/* Contact Link */}
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${isHomePage && activeSection === "contact" ? "active" : ""}`} 
                onClick={() => scrollToSection("contact")}
              >
                Contact
              </Link>
            </li>

            {/* Conditional Links Based on User Authentication */}
            {user ? (
              <>
                {/* Display User Name */}
                <li className="nav-item">
                  <span className="nav-link text-primary">
                    Welcome, {user}!
                  </span>
                </li>

                {/* Logout Button */}
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link"
                    onClick={() => {
                      // Add logout logic here
                      setIsOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                {/* Login Link */}
                <li className="nav-item">
                  <Link
                    to="/login"
                    className={`nav-link ${isLoginPage ? "active" : ""}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;