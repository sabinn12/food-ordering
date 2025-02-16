import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for the toggle button
import "../styles/navbar.css";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage the mobile menu

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
    }
  };

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
              <Link to="/" className="nav-link" onClick={() => scrollToSection("home")}>
                Home
              </Link>
            </li>

            {/* About Link */}
            <li className="nav-item">
              <a
                href="#about"
                className="nav-link"
                onClick={() => scrollToSection("about")}
              >
                About
              </a>
            </li>

            {/* Foods Link */}
            <li className="nav-item">
              <a
                href="#foods"
                className="nav-link"
                onClick={() => scrollToSection("foods")}
              >
                Foods
              </a>
            </li>

            {/* Contact Link */}
            <li className="nav-item">
              <a
                href="#contact"
                className="nav-link"
                onClick={() => scrollToSection("contact")}
              >
                Contact
              </a>
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
                    className="nav-link"
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