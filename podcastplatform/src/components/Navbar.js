import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { Button } from "./Button.js";
import axios from "./services/axios";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setClick(false);
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener("resize", showButton);

    return () => window.removeEventListener("resize", showButton);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "/logout",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          Podcast Platform <i className="fab fa-typo3" />
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/explore" className="nav-links" onClick={closeMobileMenu}>
              Explore
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/mypage" className="nav-links" onClick={closeMobileMenu}>
              My Page
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/sign-up"
              className="nav-links-mobile"
              onClick={closeMobileMenu}
            >
              Sign up
            </Link>
          </li>
        </ul>
        {button &&
          (!isAuthenticated ? (
            <Button buttonStyle="btn--outline" to="/sign-up">
              SIGN UP
            </Button>
          ) : (
            <>
              <Button
                buttonStyle="btn--outline"
                onClick={handleLogout}
                to="/sign-up"
              >
                LOG OUT
              </Button>
            </>
          ))}
      </div>
    </nav>
  );
}

export default Navbar;
