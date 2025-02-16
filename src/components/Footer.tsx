import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"; // Import social icons
import "../styles/Footer.css"; // Import custom styles

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container text-center">
        {/* Quick Links Section */}
        <ul className="footer-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/foods">Food</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        {/* Social Media Icons */}
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        </div>

        {/* Copyright */}
        <p className="footer-text">&copy;  2025 Food Ordering App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
