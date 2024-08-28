import React, { useState } from "react";
import "./LoginSignup.css";
//import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../axios"; 

function LoginSignup() {
  const [action, setAction] = useState("Login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  //const { login, setCurrentUser, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (action === "Login") {
        const response = await axios.post("/login", { email, password });
        localStorage.setItem("token", response.data.token);
        // Optionally store user details
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
/*
    if (action === "Login") {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      console.log("Users from localStorage:", users);
      const loggedInUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (loggedInUser) {
        alert("Login successful!");
        console.log("Logged in user:", loggedInUser);
        login(loggedInUser);
        setCurrentUser(loggedInUser);
        console.log("current user: ", currentUser);
        navigate("/mypage");
      } else {
        setError("Invalid email or password");
      }
    } else {
      if (username === "" || email === "" || password === "") {
        setError("All fields are required for sign-up");
      } else {
        const newUser = {
          username,
          email,
          password,
          isAdmin,
        };
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        console.log("New user added:", newUser);
        login(newUser);
        setCurrentUser(newUser);

        alert("Sign up successful for ${username}");
        setUsername("");
        setEmail("");
        setPassword("");
        setIsAdmin(false);
        setError("");
        navigate("/mypage");
      }
    }
  };*/
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
            onClick={() => {
              handleActionChange("Sign up");
            }}
          >
            Sign up page
          </div>
          <div
            className={action === "Sign up" ? "submit gray" : "submit"}
            onClick={() => {
              handleActionChange("Login");
            }}
          >
            Login page
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginSignup;
