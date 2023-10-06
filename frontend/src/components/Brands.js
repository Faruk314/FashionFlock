import React from "react";

const Brands = () => {
  const brands = [
    { id: 1, brand: "/images/northFace.png" },
    { id: 2, brand: "/images/polo.png" },
    { id: 3, brand: "/images/adidas.png" },
    { id: 4, brand: "/images/puma.png" },
    { id: 5, brand: "/images/lacoste.png" },
  ];

  return (
    <section
      id="brands"
      className="flex-col items-center justify-center hidden space-y-10 md:flex"
    >
      <span className="text-3xl font-bold">TRENDING BRANDS</span>
      <div className="w-full px-20 py-10 bg-cyan-600">
        <div className="grid items-center justify-center h-full grid-cols-2 mx-auto max-w-7xl md:grid-cols-3 lg:grid-cols-5">
          {brands.map((brand) => (
            <img
              key={brand.id}
              src={brand.brand}
              alt=""
              className="md:w-[10rem]"
            ></img>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
