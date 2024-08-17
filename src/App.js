import React from "react";
//import AppRoutes from './routes';
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  //return <AppRoutes />;
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact />
      </Routes>
    </Router>
  );
}

export default App;
