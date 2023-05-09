import React from "react";

const Brands = () => {
  const brands = [
    { id: 2, brand: "/images/northFace.png" },
    { id: 4, brand: "/images/polo.png" },
    { id: 1, brand: "/images/adidas.png" },
    { id: 5, brand: "/images/puma.png" },
    { id: 3, brand: "/images/lacoste.png" },
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
