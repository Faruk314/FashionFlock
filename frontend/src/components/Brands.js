import React from "react";
import addidas from "../images/adidas.png";
import northFace from "../images/northFace.png";
import lacoste from "../images/lacoste.png";
import puma from "../images/puma.png";
import polo from "../images/polo.png";

const Brands = () => {
  const brands = [
    { id: 2, brand: northFace },
    { id: 4, brand: polo },
    { id: 1, brand: addidas },
    { id: 5, brand: puma },
    { id: 3, brand: lacoste },
  ];

  return (
    <section
      id="brands"
      className="hidden md:flex flex-col items-center justify-center space-y-10"
    >
      <span className="font-bold text-3xl">TRENDING BRANDS</span>
      <div className="py-10 px-20 bg-cyan-600 w-full">
        <div className="h-full max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center items-center">
          {brands.map((brand) => (
            <img src={brand.brand} alt="" className="md:w-[10rem]"></img>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
