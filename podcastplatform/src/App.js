import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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
import EditPodcast from "./pages/EditPodcast.js";
import { AuthProvider, useAuth } from "./components/AuthContext";

function App() {
  /*const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const updateAuthState = () => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  };

  useEffect(() => {
    const handleStorageChange = () => {
      updateAuthState();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);*/

  return (
    //<AuthProvider>
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
        <Route path="/podcast/:podcastId" exact element={<Podcastp />} />
        <Route path="/edit-podcast/:podcastId" element={<EditPodcast />} />
      </Routes>
      <Footer />
    </Router>
    //</AuthProvider>
  );
}

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/sign-up" />;
  /*const { isAuthenticated } = React.useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/sign-up" />;
*/
  /*const { user } = useAuth();
  return user ? children : <Navigate to="/sign-up" />;
*/
};

export default App;
