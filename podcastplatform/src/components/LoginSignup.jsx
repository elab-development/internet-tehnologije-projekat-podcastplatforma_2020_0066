/*import React, { useState } from "react";
import "./LoginSignup.css";
import { useNavigate } from "react-router-dom";
import axios from "./services/axios";
import { useAuth } from "./AuthContext"; //

function LoginSignup() {
  const [action, setAction] = useState("Login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); //

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    /*
    try {
      if (action === "Login") {
        console.log("Sending login request...");
        const response = await axios.post("/login", { email, password });
        console.log("Login response:", response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/mypage");
      } else {
        if (username === "" || email === "" || password === "") {
          setError("All fields are required for sign-up");
        } else {
          const response = await axios.post("/signup", {
            name: username,
            email,
            password,
            admin: isAdmin,
          });

          alert("Sign up successful!");
          setUsername("");
          setEmail("");
          setPassword("");
          setIsAdmin(false);
          navigate("/mypage");
        }
      }
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred");
    }////////////////////////////////////
    try {
      if (action === "Login") {
        const response = await axios.post("/login", { email, password });
        login({ ...response.data.user, token: response.data.token });
        navigate("/mypage");
      } else {
        if (username === "" || email === "" || password === "") {
          setError("All fields are required for sign-up");
        } else {
          await axios.post("/signup", {
            name: username,
            email,
            password,
            admin: isAdmin,
          });
          alert("Sign up successful!");
          setUsername("");
          setEmail("");
          setPassword("");
          setIsAdmin(false);
          navigate("/mypage");
        }
      }
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred");
    }
  };

  const handleActionChange = (newAction) => {
    setError("");
    setAction(newAction);
    setEmail("");
    setUsername("");
    setPassword("");
    setIsAdmin(false);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          {action !== "Login" && (
            <>
              <div className="input">
                <i className="fas fa-user" />
                <input
                  type="text"
                  placeholder="Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input checkbox-input">
                <input
                  type="checkbox"
                  id="adminCheckbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
                <label htmlFor="adminCheckbox">Admin</label>
              </div>
            </>
          )}
          <div className="input">
            <i className="fas fa-envelope" />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input">
            <i className="fas fa-lock" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {error && <div className="error">{error}</div>}
        {action === "Sign up" ? (
          <div></div>
        ) : (
          <div className="forgot-password">
            Forgot password? <span>Click here!</span>
          </div>
        )}

        <button type="submit" className="submit-button">
          {action === "Login" ? "Login" : "Sign Up"}
        </button>
        <div className="submit-container">
          <div
            className={action === "Login" ? "submit gray" : "submit"}
            onClick={() => handleActionChange("Sign up")}
          >
            Sign up page
          </div>
          <div
            className={action === "Sign up" ? "submit gray" : "submit"}
            onClick={() => handleActionChange("Login")}
          >
            Login page
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginSignup;
*/

import React, { useState } from "react";
import "./LoginSignup.css";
import { useNavigate } from "react-router-dom";
import axios from "./services/axios";

function LoginSignup() {
  const [action, setAction] = useState("Login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (action === "Login") {
        console.log("Sending login request...");
        const response = await axios.post("/login", { email, password });
        console.log("Login response:", response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/mypage");
      } else {
        if (username === "" || email === "" || password === "") {
          setError("All fields are required for sign-up");
        } else {
          const response = await axios.post("/signup", {
            name: username,
            email,
            password,
            admin: isAdmin,
          });

          alert("Sign up successful!");
          setUsername("");
          setEmail("");
          setPassword("");
          setIsAdmin(false);
          navigate("/mypage");
        }
      }
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred");
    }
  };

  const handleActionChange = (newAction) => {
    setError("");
    setAction(newAction);
    setEmail("");
    setUsername("");
    setPassword("");
    setIsAdmin(false);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          {action !== "Login" && (
            <>
              <div className="input">
                <i className="fas fa-user" />
                <input
                  type="text"
                  placeholder="Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input checkbox-input">
                <input
                  type="checkbox"
                  id="adminCheckbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
                <label htmlFor="adminCheckbox">Admin</label>
              </div>
            </>
          )}
          <div className="input">
            <i className="fas fa-envelope" />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input">
            <i className="fas fa-lock" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {error && <div className="error">{error}</div>}
        {action === "Sign up" ? (
          <div></div>
        ) : (
          <div className="forgot-password">
            Forgot password? <span>Click here!</span>
          </div>
        )}

        <button type="submit" className="submit-button">
          {action === "Login" ? "Login" : "Sign Up"}
        </button>
        <div className="submit-container">
          <div
            className={action === "Login" ? "submit gray" : "submit"}
            onClick={() => handleActionChange("Sign up")}
          >
            Sign up page
          </div>
          <div
            className={action === "Sign up" ? "submit gray" : "submit"}
            onClick={() => handleActionChange("Login")}
          >
            Login page
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginSignup;
