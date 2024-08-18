import React from "react";
import "../App.css";
import HeroSection from "../components/HeroSection";
import Podcasts from "../components/Podcasts";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <HeroSection />
      <Podcasts />
      <Footer />
    </>
  );
}

export default Home;
