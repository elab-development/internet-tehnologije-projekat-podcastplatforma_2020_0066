import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import MyPage from "./pages/Fav";
import Login from "./pages/Login";
import { AuthProvider, useAuth } from "./components/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/explore" exact element={<Explore />} />
          <Route path="/mypage" exact element={<MyPage />} />
          <Route path="/sign-up" exact element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
