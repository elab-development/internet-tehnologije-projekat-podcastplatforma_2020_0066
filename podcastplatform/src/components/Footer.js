import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import "./Footer.css";
import axios from "./services/axios"; 

function Footer() {
  const isAuthenticated = !!localStorage.getItem("token");
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    if (isAuthenticated) {
      try {
        await axios.post("/logout");
        localStorage.removeItem("token"); 
        
      } catch (error) {
        console.error("Error logging out:", error);
      }
    }
  };

  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Make your own account to receive notifications from our best podcasts
        </p>
        <div className="input-areas">
          <Button
            buttonStyle="btn--outline"
            onClick={handleButtonClick}
            to="/sign-up"
          >
            {isAuthenticated ? "Log out" : "Sign up"}
          </Button>
        </div>
      </section>

      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>About Us</h2>
            <p className="footer-subscription-p">
              Discover and share your favorite podcasts effortlessly with our
              innovative platform, perfect for listeners and creators alike.
              Enjoy seamless integration and features that enhance both your
              listening experience and content creation.
            </p>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>Contact Us</h2>
            <p className="footer-subscription-p">email: pp@gmail.com</p>
            <p className="footer-subscription-p">phone: 069 123 123</p>
          </div>
        </div>
      </div>

      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to="/" className="social-logo">
              PODCAST PLATFORM
              <i className="fab fa-typo3" />
            </Link>
          </div>
          <div className="social-icons">
            <Link
              className="social-icon-link facebook"
              to="/"
              target="_blank"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f" />
            </Link>
            <Link
              className="social-icon-link instagram"
              to="/"
              target="_blank"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram" />
            </Link>
            <Link
              className="social-icon-link youtube"
              to="/"
              target="_blank"
              aria-label="Youtube"
            >
              <i className="fab fa-youtube" />
            </Link>
            <Link
              className="social-icon-link twitter"
              to="/"
              target="_blank"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter" />
            </Link>
            <Link
              className="social-icon-link twitter"
              to="/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
