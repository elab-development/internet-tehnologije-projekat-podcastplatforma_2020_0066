import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { Button } from "./Button.js";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 950) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton(); // Initial check when component mounts
    window.addEventListener("resize", showButton);

    // Cleanup the event listener when the component unmounts
    return () => window.removeEventListener("resize", showButton);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Podcast Platform <i className="fab fa-typo3" />
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/explore" className="nav-links" onClick={closeMobileMenu}>
              Explore
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/fav" className="nav-links" onClick={closeMobileMenu}>
              Favorites
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
        {button && <Button buttonStyle="btn--outline">SIGN UP</Button>}
      </div>
    </nav>
  );
}

export default Navbar;
