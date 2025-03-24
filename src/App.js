import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Fav from "./pages/Fav";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/explore" exact element={<Explore />} />
        <Route path="/fav" exact element={<Fav />} />
        <Route path="/sign-up" exact element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
