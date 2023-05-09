import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

const Featured = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const getFeaturedProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/getFeaturedProducts`
        );

        setFeatured(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getFeaturedProducts();
  }, []);

  return (
    <section
      id="featured"
      className="px-10 text-center flex flex-col items-center justify-center py-20"
    >
      <span className="font-bold text-3xl">OUR FAVOURITES</span>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 my-10">
        {featured.map((prod) => (
          <ProductCard key={prod._id} id={prod._id} image={prod.image} />
        ))}
      </div>
    </section>
  );
};

export default Featured;
