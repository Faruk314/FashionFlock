import React, { useState, useEffect } from "react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

import "react-slideshow-image/dist/styles.css";
import { Fade, Zoom, Slide } from "react-slideshow-image";

const slides = [
  {
    image: "/images/main.jpg",
    title: "New Arrivals",
    desc: " Get $30 off on all new arrivals!",
  },
  {
    image: "/images/summer.jpg",
    title: "Summer Collection",
    desc: "Stay cool and stylish with our summer collection.",
  },
  {
    image: "/images/autumn.jpg",
    title: "Fall Fashion",
    desc: "Get ready for fall with our latest fashion trends.",
  },
];

const Hero = () => {
  const scrollToPage = (id) => {
    const page = document.getElementById(id);
    page.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="slide-container">
      <Fade>
        {slides.map((slide, index) => (
          <div key={index} className="">
            <div
              style={{ backgroundImage: `url(${slide.image})` }}
              className={`flex flex-col items-center justify-center h-[50rem] bg-no-repeat bg-cover md:bg-[center_top_-2rem]`}
            >
              <div className="flex flex-col items-center">
                <h1 className="text-6xl font-bold tracking-wide text-center md:text-6xl sm:text-4xl text-cyan-600">
                  {slide.title}
                </h1>
                <p className="my-10 text-xl text-center md:text-3xl">
                  {slide.desc}
                </p>

                <button
                  onClick={() => scrollToPage("categories")}
                  className="px-6 py-2 text-lg font-bold transition-colors bg-white border-2 text-cyan-500 border-cyan-500 hover:bg-cyan-500 hover:text-white"
                >
                  SHOP NOW
                </button>
              </div>
            </div>
          </div>
        ))}
      </Fade>
    </section>
  );
};

export default Hero;
