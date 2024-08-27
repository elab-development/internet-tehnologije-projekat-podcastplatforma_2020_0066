import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import MyPage from "./pages/MyPage";
import Login from "./pages/Login";
import AddPod from "./pages/Add";
import Podcastp from "./pages/Showpod";
import { AuthProvider, useAuth } from "./components/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/explore" exact element={<Explore />} />
          <Route
            path="/mypage"
            exact
            element={
              <PrivateRoute>
                <MyPage />
              </PrivateRoute>
            }
          />
          <Route path="/sign-up" exact element={<Login />} />
          <Route path="/addpod" exact element={<AddPod />} />
          <Route path="/podcast" exact element={<Podcastp />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/sign-up" />;
};

export default App;
