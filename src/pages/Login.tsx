import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff, MdPerson } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaTwitter } from "react-icons/fa";

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Image and Text Section */}
        <div className="login-image-section">
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Delicious Food"
              className="img-fluid rounded"
            />
            <h2 className="welcome-heading">Welcome to Food Ordering App</h2>
            <p className="welcome-text">Login to start ordering your favorite food!</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="login-form-section">
          <div className="form-container">
            {isLogin ? (
              <div className="login-form">
                <h1 className="form-title">Login</h1>
                <p className="form-subtitle">Login to your account.</p>
                <form>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <div className="input-group">
                      <span className="input-icon">
                        <MdEmail size={18} />
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="input-group">
                      <span className="input-icon">
                        <MdLock size={18} />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        placeholder="Password"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={togglePasswordVisibility}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                      </button>
                    </div>
                  </div>
                  <div className="form-options">
                    <div className="remember-me">
                      <input type="checkbox" id="remember" />
                      <label htmlFor="remember">Remember me</label>
                    </div>
                    <Link to="/forgot-password" className="forgot-password">
                      Forgot Password?
                    </Link>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    Login
                  </button>
                </form>
                <div className="social-login">
                  <p>Or login with</p>
                  <div className="social-buttons">
                    <button className="social-btn google">
                      <FcGoogle size={18} />
                    </button>
                    <button className="social-btn facebook">
                      <FaFacebookF size={18} />
                    </button>
                    <button className="social-btn twitter">
                      <FaTwitter size={18} />
                    </button>
                  </div>
                </div>
                <p className="form-switch">
                  Don't have an account?{" "}
                  <button className="switch-btn" onClick={toggleForm}>
                    Sign up
                  </button>
                </p>
              </div>
            ) : (
              <div className="signup-form">
                <h1 className="form-title">Sign Up</h1>
                <p className="form-subtitle">Create a new account.</p>
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <div className="input-group">
                      <span className="input-icon">
                        <MdPerson size={18} />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="signup-email">Email address</label>
                    <div className="input-group">
                      <span className="input-icon">
                        <MdEmail size={18} />
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        id="signup-email"
                        placeholder="Enter email"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="signup-password">Password</label>
                    <div className="input-group">
                      <span className="input-icon">
                        <MdLock size={18} />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="signup-password"
                        placeholder="Password"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={togglePasswordVisibility}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="input-group">
                      <span className="input-icon">
                        <MdLock size={18} />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={togglePasswordVisibility}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                      </button>
                    </div>
                  </div>
                  <div className="form-terms">
                    <input type="checkbox" id="terms" />
                    <label htmlFor="terms">
                      I agree to the <Link to="/terms">Terms and Conditions</Link>
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign Up
                  </button>
                </form>
                <div className="social-login">
                  <p>Or sign up with</p>
                  <div className="social-buttons">
                    <button className="social-btn google">
                      <FcGoogle size={18} />
                    </button>
                    <button className="social-btn facebook">
                      <FaFacebookF size={18} />
                    </button>
                    <button className="social-btn twitter">
                      <FaTwitter size={18} />
                    </button>
                  </div>
                </div>
                <p className="form-switch">
                  Already have an account?{" "}
                  <button className="switch-btn" onClick={toggleForm}>
                    Login
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;