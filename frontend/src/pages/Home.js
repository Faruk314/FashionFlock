import React from "react";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Featured from "../components/Featured";
import Navbar from "../components/Navbar";
import Brands from "../components/Brands";

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <Featured />
      <Brands />
      <Footer />
    </>
  );
};

export default Home;
