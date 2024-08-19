import React, { memo } from "react";
import { Button } from "./Button";
import "./HeroSection.css";
import "../App.css";

function HeroSection() {
  return (
    <div className="hero-container">
      <h1>LEADING PODCAST PLATFORM</h1>
      <p>What are you waiting for?</p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
          to="/sign-up"
          onClick={() => alert("Button Clicked!")}
        >
          GET STARTED
        </Button>
        <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
          onClick={() => console.log("hey")}
          to="/explore"
        >
          EXPLORE
          <i className="far fa-play-circle" />
        </Button>
      </div>
    </div>
  );
}
export default HeroSection;
