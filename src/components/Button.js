import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";

const STYLES = ["btn--primary", "btn--outline"];
const SIZES = ["btn--medium", "btn--large"];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  to,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  const onClick1 = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link to={to} className="btn-mobile">
      <button
        className={"btn ${checkButtonStyle} ${checkButtonSize}  sign-up-btn"}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </Link>
  );
};
