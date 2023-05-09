import React, { useState, useEffect } from "react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import slide1 from "../images/hero-summer.webp";
import slide2 from "../images/palme.png";
import slide3 from "../images/northFace.png";

import "react-slideshow-image/dist/styles.css";
import { Fade, Zoom, Slide } from "react-slideshow-image";

const slides = [
  {
    image: slide1,
    title: "New Arrivals",
    desc: " Get $30 off on all new arrivals!",
  },
  {
    image: slide1,
    title: "Summer Collection",
    desc: "Stay cool and stylish with our summer collection.",
  },
  {
    image: slide1,
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
    // <section
    //   id="home"
    //   className="flex items-center justify-center bg-cover bg-center px-5 h-[50rem]"
    // >
    //   <div className="text-center">
    //     <h1 className="text-6xl font-bold tracking-wide md:text-6xl sm:text-5xl">
    //       FASHION FLOCK
    //     </h1>

    //     <p className="my-10 text-2xl md:text-3xl">
    //       Don't compromise on style! Get $30 off for new arrivals.
    //     </p>
    //     <button
    //       onClick={() => scrollToPage("categories")}
    //       className="px-6 py-2 text-lg font-bold text-cyan-500 transition-colors bg-white border-2 border-cyan-500 hover:bg-cyan-500 hover:text-white"
    //     >
    //       SHOP NOW
    //     </button>
    //   </div>
    // </section>

    <section className="slide-container">
      <Fade>
        {slides.map((slide, index) => (
          <div key={index} className="">
            <div className="flex flex-col items-center justify-center h-[50rem]">
              <div className="flex flex-col items-center">
                <h1 className="text-6xl font-bold tracking-wide md:text-6xl sm:text-5xl">
                  {slide.title}
                </h1>
                <p className="my-10 text-2xl md:text-3xl">{slide.desc}</p>

                <button
                  onClick={() => scrollToPage("categories")}
                  className="px-6 py-2 text-lg font-bold text-cyan-500 transition-colors bg-white border-2 border-cyan-500 hover:bg-cyan-500 hover:text-white"
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
